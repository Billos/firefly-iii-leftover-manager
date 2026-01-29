import pino from "pino"

import { checkFireflyHealth } from "./healthCheck"
import { initializeWorker } from "./queues"

const logger = pino()
async function startWorker() {
  try {
    logger.info("Starting worker...")
    
    // Ensure Firefly III service is healthy before starting jobs
    await checkFireflyHealth()
    
    await initializeWorker()
    logger.info("Worker is running and waiting for jobs")
  } catch (err) {
    logger.error({ err: err }, "Failed to start worker:")
    process.exit(1)
  }
}

startWorker()
