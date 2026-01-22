import { DeduplicationOptions, Job, JobsOptions } from "bullmq"
import { pino } from "pino"

import { getQueue } from "."
import { JobIds } from "./constants"
import { getJobDelay } from "./delay"

const logger = pino()

function getDebounce(id: JobIds, transactionId?: string): DeduplicationOptions {
  return {
    id: transactionId ? `${id}-${transactionId}` : id,
    ttl: getJobDelay(id, false),
    extend: true,
    replace: true,
  }
}

function queueConfig(job: JobIds, transactionId?: string): JobsOptions {
  return {
    removeOnComplete: true,
    removeOnFail: true,
    delay: getJobDelay(job, false),
    deduplication: getDebounce(job, transactionId),
  }
}

export async function addTransactionJobToQueue(job: JobIds, transactionId: string): Promise<Job> {
  const queue = await getQueue()
  const delay = getJobDelay(job, false)
  logger.info("Adding job to queue: %s for transactionId: %s with delay: %d seconds", job, transactionId, delay / 1000)
  return queue.add(job, { job, transactionId }, queueConfig(job, transactionId))
}

export async function addJobToQueue(job: JobIds, asap?: boolean): Promise<Job> {
  const queue = await getQueue()
  const delay = getJobDelay(job, false, asap)
  logger.info("Adding job to queue: %s with delay: %d seconds", job, delay / 1000)
  return queue.add(job, { job }, queueConfig(job))
}
