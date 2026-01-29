import pino from "pino"

import { budgetJobDefinitions, jobDefinitions, transactionJobDefinitions } from ".."
import { JobIds } from "../constants"

const id = JobIds.INIT

const logger = pino()
const jobs: Record<string, (parameter?: string) => Promise<void>> = {}

async function job() {
  logger.info("Initializing job definitions")
  for (const { job, id, init } of [...jobDefinitions, ...budgetJobDefinitions, ...transactionJobDefinitions]) {
    jobs[id] = job
    if (init) {
      await init()
    }
  }
}

async function init() {}

export { job, init, id }
