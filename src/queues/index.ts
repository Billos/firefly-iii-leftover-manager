import { Queue, Worker } from "bullmq"
import { DateTime } from "luxon"
import pino from "pino"

import { env } from "../config"
import { transactionHandler } from "../modules/transactionHandler"
import { JobIds } from "./constants"
import * as LinkPaypalTransactions from "./jobs/linkPaypalTransactions"
import * as UnbudgetedTransactions from "./jobs/unbudgetedTransactions"
import * as UncategorizedTransactions from "./jobs/uncategorizedTransactions"
import * as UpdateAutomaticBudgets from "./jobs/updateAutomaticBudgets"
import { QueueArgs } from "./queueArgs"

const logger = pino()
type TransactionJobDefinition = {
  id: JobIds
  job: (transactionId: string) => Promise<void>
  init?: () => Promise<void>
}
type JobDefinition = { id: JobIds; job: () => Promise<void>; init?: () => Promise<void> }

const startedAt = new Map<string, DateTime>()

const jobDefinitions: JobDefinition[] = [
  UpdateAutomaticBudgets,
  LinkPaypalTransactions,
]

const transactionJobDefinitions: TransactionJobDefinition[] = [
  UnbudgetedTransactions,
  UncategorizedTransactions,
]

let queue: Queue<QueueArgs> | null = null
let worker: Worker<QueueArgs> | null = null

async function getQueue(): Promise<Queue<QueueArgs>> {
  if (queue) {
    return queue
  }

  queue = new Queue("manager", { connection: env.redisConnection })
  return queue
}

function logJobDuration(success: boolean, jobId: string, name: string) {
  const startTime = startedAt.get(jobId)
  const successStr = success ? "completed" : "failed"
  const endTime = DateTime.now()
  if (startTime) {
    const duration = endTime.diff(startTime, "seconds").seconds
    logger.info("Job(%s) %s %s in %d seconds", jobId, name, successStr, duration)
    startedAt.delete(jobId)
  } else {
    logger.info("Job(%s) %s %s", jobId, name, successStr)
  }
  logger.info("**********************************************************************")
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

  const jobs: Record<string, (transactionId?: string) => Promise<void>> = {}

  worker = new Worker<QueueArgs>(
    "manager",
    async ({ data: { job, transactionId } }) => {
      await jobs[job](transactionId)
    },
    {
      connection: env.redisConnection,
      concurrency: 1,
      removeOnComplete: { count: 5000 },
      removeOnFail: { count: 5000 },
    },
  )

  worker.on("active", ({ id, name }) => {
    logger.info("**********************************************************************")
    logger.info("Job(%s) %s started", id, name)
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

  for (const { job, id, init } of jobDefinitions) {
    jobs[id] = job
    if (init) {
      await init()
    }
  }
  for (const { job, id, init } of transactionJobDefinitions) {
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

export { getQueue, initializeWorker, jobDefinitions, transactionJobDefinitions }
