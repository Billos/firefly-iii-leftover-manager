import { Queue, Worker } from "bullmq"

import { env } from "../config"
import { transactionHandler } from "../modules/transactionHandler"
import { JobIds } from "./constants"
import { QueueArgs } from "./queueArgs"
import * as UnbudgetedTransactions from "./unbudgetedTransactions"
import * as UncategorizedTransactions from "./uncategorizedTransactions"
import * as UpdateAutomaticBudgets from "./updateAutomaticBudgets"

type TransactionJobDefinition = {
  id: JobIds
  job: (transactionId: string) => Promise<void>
  init?: (queue: Queue<QueueArgs>) => Promise<void>
}
type JobDefinition = { id: JobIds; job: () => Promise<void>; init?: (queue: Queue<QueueArgs>) => Promise<void> }

const jobDefinitions: JobDefinition[] = [
  UpdateAutomaticBudgets,
]

const transactionJobDefinitions: TransactionJobDefinition[] = [
  UnbudgetedTransactions,
  UncategorizedTransactions,
]

let queue: Queue<QueueArgs> | null = null
let worker: Worker<QueueArgs> | null = null

async function getQueue(): Promise<Queue> {
  if (queue) {
    return queue
  }

  queue = new Queue("manager", { connection: env.redisConnection })
  return queue
}

async function initializeWorker(): Promise<Worker<QueueArgs>> {
  if (worker) {
    return worker
  }

  const queue = await getQueue()

  // Clean up any stale jobs from previous runs
  queue.setGlobalConcurrency(1)
  await queue.pause()
  await queue.clean(200, 0, "active")
  await queue.obliterate({ force: true })
  await queue.resume()

  const jobs: Record<string, (transactionId?: string) => Promise<void>> = {}

  worker = new Worker<QueueArgs>(
    "manager",
    async ({ data: { job, transactionId } }) => {
      jobs[job](transactionId)
    },
    {
      connection: env.redisConnection,
      concurrency: 1,
      removeOnComplete: { count: 5000 },
      removeOnFail: { count: 5000 },
    },
  )

  worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error ${err.message}`)
    transactionHandler.sendMessageImpl("Job Failed", `Job ${job.id} failed with error ${err.message} and data ${JSON.stringify(job.data)}`)
  })

  for (const { job, id, init } of jobDefinitions) {
    jobs[id] = job
    if (init) {
      await init(queue)
    }
  }
  for (const { job, id, init } of transactionJobDefinitions) {
    jobs[id] = job
    if (init) {
      await init(queue)
    }
  }

  return worker
}

async function processExit() {
  if (queue) {
    await queue.clean(200, 0, "active")
  }
  if (worker) {
    await worker.close()
  }
}

process.on("SIGTERM", processExit)
process.on("SIGINT", processExit)

export { getQueue, initializeWorker, jobDefinitions, transactionJobDefinitions }
