import pino from "pino"

import { env } from "../config"
import { linkPaypalTransactions } from "../controllers/linkPaypalTransactions"
import { JobIds } from "./constants"
import { addJobToQueue } from "./jobs"

const id = JobIds.LINK_PAYPAL_TRANSACTIONS

const logger = pino()

async function job() {
  logger.info("Running linkPaypalTransactions job")
  await linkPaypalTransactions()
}

async function init() {
  if (env.fireflyPaypalAccountToken) {
    await addJobToQueue(id)
  }
}

export { job, init, id }
