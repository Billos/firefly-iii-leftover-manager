import pino from "pino"

import { initializeWorker } from "./queues"

const logger = pino()

async function startWorker() {
  try {
    logger.info("Starting worker...")
    await initializeWorker()
    logger.info("Worker is running and waiting for jobs")
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("EHOSTUNREACH") || err.message.includes("ECONNREFUSED") || err.message.includes("Redis")) {
        logger.error({ err: err }, "Failed to connect to Redis. Please check your Redis configuration and ensure Redis is running at the configured host and port.")
      } else {
        logger.error({ err: err }, "Failed to start worker: %s", err.message)
      }
    } else {
      logger.error({ err: err }, "Failed to start worker with unknown error")
    }
    process.exit(1)
  }
}

// Handle uncaught errors
process.on("uncaughtException", (err) => {
  if (err.message.includes("EHOSTUNREACH") || err.message.includes("ECONNREFUSED") || err.message.includes("Redis")) {
    logger.error({ err }, "Uncaught Redis connection error: %s", err.message)
  } else {
    logger.error({ err }, "Uncaught exception: %s", err.message)
  }
})

process.on("unhandledRejection", (reason, promise) => {
  logger.error({ reason, promise }, "Unhandled promise rejection")
})

startWorker()
