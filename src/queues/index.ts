import { Queue, Worker } from "bullmq"

import { env } from "../config"
import { transactionHandler } from "../modules/transactionHandler"
import { QueueArgs } from "./queueArgs"
import * as UnbudgetedTransactions from "./unbudgetedTransactions"
import * as UncategorizedTransactions from "./uncategorizedTransactions"
import * as UpdateAutomaticBudgets from "./updateAutomaticBudgets"

type TransactionJobDefinition = {
  id: string
  job: (transactionId: string) => Promise<void>
  init?: (queue: Queue<QueueArgs>) => Promise<void>
}
type JobDefinition = { id: string; job: () => Promise<void>; init?: (queue: Queue<QueueArgs>) => Promise<void> }

const jobDefinitions: JobDefinition[] = [
  UpdateAutomaticBudgets,
]

const transactionJobDefinitions: TransactionJobDefinition[] = [
  UnbudgetedTransactions,
  UncategorizedTransactions,
]

let queue: Queue = null

async function getQueue(): Promise<Queue> {
  if (queue) {
    return queue
  }

  queue = new Queue("manager", { connection: env.redisConnection })
  queue.setGlobalConcurrency(1)
  await queue.pause()
  await queue.clean(200, 0, "active")
  await queue.obliterate({ force: true })
  const jobs: Record<string, (transactionId?: string) => Promise<void>> = {}

  const worker = new Worker<QueueArgs>(
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
      console.log(`Delaying job creation for ${id} by 15 seconds`)
      setTimeout(() => {
        init(queue)
      }, 15000)
    }
  }
  for (const { job, id, init } of transactionJobDefinitions) {
    jobs[id] = job
    if (init) {
      console.log(`Delaying job creation for ${id} by 15 seconds`)
      setTimeout(() => {
        init(queue)
      }, 15000)
    }
  }
  return queue
}

async function processExit() {
  if (queue) {
    await queue.clean(200, 0, "active")
  }
}

process.on("SIGTERM", processExit)
process.on("SIGINT", processExit)

export { getQueue, jobDefinitions, transactionJobDefinitions }
