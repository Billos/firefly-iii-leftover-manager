import { Queue } from "bullmq"
import pino from "pino"

import { env } from "../config"
import { linkPaypalTransactions } from "../controllers/linkPaypalTransactions"
import { JobIds } from "./constants"
import { getJobDelay } from "./delay"
import { QueueArgs } from "./queueArgs"

const id = JobIds.LINK_PAYPAL_TRANSACTIONS

const logger = pino()

async function job() {
  logger.info("Running linkPaypalTransactions job")
  await linkPaypalTransactions()
}

async function init(queue: Queue<QueueArgs>) {
  if (env.fireflyPaypalAccountToken) {
    queue.add(id, { job: id, transactionId: null }, { removeOnComplete: true, removeOnFail: true, delay: getJobDelay(id, false) })
  }
}

export { job, init, id }
