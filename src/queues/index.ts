import { Queue, Worker } from "bullmq"
import { DateTime } from "luxon"
import pino from "pino"

import { env } from "../config"
import { transactionHandler } from "../modules/transactionHandler"
import { JobIds } from "./constants"
import * as CheckBudgetLimit from "./jobs/checkBudgetLimit"
import * as LinkPaypalTransactions from "./jobs/linkPaypalTransactions"
import * as UnbudgetedTransactions from "./jobs/unbudgetedTransactions"
import * as UncategorizedTransactions from "./jobs/uncategorizedTransactions"
import * as UpdateBillsBudgetLimit from "./jobs/updateBillsBudgetLimit"
import * as UpdateLeftoversBudgetLimit from "./jobs/updateLeftoverBudgetLimit"
import { isBudgetJobArgs, isTransactionJobArgs, QueueArgs } from "./queueArgs"

const logger = pino()
type AbstractJobDefinition = {
  id: JobIds
  init?: () => Promise<void>
}
type TransactionJobDefinition = AbstractJobDefinition & {
  job: (transactionId: string) => Promise<void>
}
type JobDefinition = AbstractJobDefinition & {
  job: () => Promise<void>
}
type BudgetJobDefinition = AbstractJobDefinition & {
  job: (budgetId: string) => Promise<void>
}

const startedAt = new Map<string, DateTime>()

const jobDefinitions: JobDefinition[] = [
  UpdateLeftoversBudgetLimit,
  UpdateBillsBudgetLimit,
  LinkPaypalTransactions,
]

const transactionJobDefinitions: TransactionJobDefinition[] = [
  UnbudgetedTransactions,
  UncategorizedTransactions,
]

const budgetJobDefinitions: BudgetJobDefinition[] = [
  CheckBudgetLimit,
]

let queue: Queue<QueueArgs> | null = null
let worker: Worker<QueueArgs> | null = null

function getRedisRetryStrategy() {
  return (times: number) => {
    if (times > 10) {
      logger.error("Redis connection failed after 10 retries, giving up")
      return null
    }
    const delay = Math.min(times * 1000, 10000)
    logger.warn("Redis connection attempt %d failed, retrying in %dms", times, delay)
    return delay
  }
}

async function getQueue(): Promise<Queue<QueueArgs>> {
  if (queue) {
    return queue
  }

  queue = new Queue("manager", { 
    connection: {
      ...env.redisConnection,
      maxRetriesPerRequest: 3,
      retryStrategy: getRedisRetryStrategy(),
    }
  })

  queue.on("error", (error) => {
    logger.error({ err: error }, "Redis Queue error: %s", error.message)
  })

  return queue
}

function logJobDuration(success: boolean, jobId: string, name: string) {
  const startTime = startedAt.get(jobId)
  const successStr = success ? "completed" : "failed"
  const endTime = DateTime.now()
  if (startTime) {
    const duration = endTime.diff(startTime, "seconds").seconds
    logger.info(
      "******************************************************************************** Job(%s) %s %s in %d seconds",
      jobId,
      name,
      successStr,
      duration,
    )
    startedAt.delete(jobId)
  } else {
    logger.info("******************************************************************************** Job(%s) %s %s", jobId, name, successStr)
  }
}

async function initializeWorker(): Promise<Worker<QueueArgs>> {
  if (worker) {
    return worker
  }

  const queue = await getQueue()

  // Clean up any stale jobs from previous runs
  queue.setGlobalConcurrency(1)
  await queue.pause()
  await queue.resume()

  const jobs: Record<string, (parameter?: string) => Promise<void>> = {}

  worker = new Worker<QueueArgs>(
    "manager",
    async ({ data }) => {
      if (isTransactionJobArgs(data)) {
        await jobs[data.job](data.transactionId)
      } else if (isBudgetJobArgs(data)) {
        await jobs[data.job](data.budgetId)
      } else {
        await jobs[data.job]()
      }
    },
    {
      connection: {
        ...env.redisConnection,
        maxRetriesPerRequest: 3,
        retryStrategy: getRedisRetryStrategy(),
      },
      concurrency: 1,
      removeOnComplete: { count: 5000 },
      removeOnFail: { count: 5000 },
    },
  )

  worker.on("active", ({ id, name }) => {
    logger.info("******************************************************************************** Job(%s) %s started", id, name)
    startedAt.set(id, DateTime.now())
  })
  worker.on("completed", ({ id, name }) => {
    logJobDuration(true, id, name)
  })

  worker.on("failed", (job, err) => {
    logger.error({ err }, "Job %s failed with error %s", job.id, err.message)
    transactionHandler.sendMessageImpl("Job Failed", `Job ${job.id} failed with error ${err.message} and data ${JSON.stringify(job.data)}`)

    logJobDuration(false, job.id, job.name)
  })

  worker.on("error", (error) => {
    logger.error({ err: error }, "Redis Worker error: %s", error.message)
  })

  worker.on("ioredis:close", () => {
    logger.warn("Redis connection closed")
  })

  worker.on("ioredis:reconnecting", () => {
    logger.info("Reconnecting to Redis...")
  })

  for (const { job, id, init } of [...jobDefinitions, ...budgetJobDefinitions, ...transactionJobDefinitions]) {
    jobs[id] = job
    if (init) {
      await init()
    }
  }

  return worker
}

async function processExit() {
  if (worker) {
    await worker.close()
  }
}

process.on("SIGTERM", processExit)
process.on("SIGINT", processExit)

export { getQueue, initializeWorker, jobDefinitions, transactionJobDefinitions, budgetJobDefinitions }
