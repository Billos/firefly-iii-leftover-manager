import { Queue, Worker } from "bullmq"

import { env } from "../config"
import { QueueArgs } from "./queueArgs"
import * as UnbudgetedTransactions from "./unbudgetedTransactions"
import * as UncategorizedTransactions from "./uncategorizedTransactions"
import * as UpdateAutomaticBudgets from "./updateAutomaticBudgets"

type JobDefinition = { id: string; job: (transactionId: string) => Promise<void>; init?: (queue: Queue<QueueArgs>) => Promise<void> }

const jobDefinitions: JobDefinition[] = [
  UnbudgetedTransactions,
  UncategorizedTransactions,
  UpdateAutomaticBudgets,
]

let queue: Queue = null

async function getQueue(): Promise<Queue> {
  if (queue) {
    return queue
  }

  queue = new Queue("manager", { connection: env.redisConnection })
  queue.setGlobalConcurrency(1)
  await queue.clean(200, 0, "active")
  await queue.obliterate()
  const jobs: Record<string, (transactionId: string) => Promise<void>> = {}

  new Worker<QueueArgs>("manager", async ({ data: { job, transactionId } }) => jobs[job](transactionId), {
    connection: env.redisConnection,
    concurrency: 1,
    removeOnComplete: { count: 5000 },
    removeOnFail: { count: 5000 },
  })

  for (const { job, id, init } of jobDefinitions) {
    jobs[id] = job
    if (init) {
      await init(queue)
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

export { getQueue, jobDefinitions as queues }
