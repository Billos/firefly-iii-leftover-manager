import pino from "pino"

import { initializeWorker } from "./queues"

const logger = pino()

const REDIS_CONNECTION_ERROR_CODES = ["EHOSTUNREACH", "ECONNREFUSED", "ETIMEDOUT", "ENOTFOUND"]

/**
 * Checks if an error is related to Redis connection failures
 * @param err - The error to check
 * @returns true if the error is a Redis connection error
 */
function isRedisConnectionError(err: Error): boolean {
  // Check if error message contains known Redis connection error codes
  if (REDIS_CONNECTION_ERROR_CODES.some((code) => err.message.includes(code))) {
    return true
  }
  
  // Check if error object has a code property with known connection error codes
  if ("code" in err && typeof err.code === "string" && REDIS_CONNECTION_ERROR_CODES.includes(err.code)) {
    return true
  }
  
  return false
}

async function startWorker() {
  try {
    logger.info("Starting worker...")
    await initializeWorker()
    logger.info("Worker is running and waiting for jobs")
  } catch (err) {
    if (err instanceof Error) {
      if (isRedisConnectionError(err)) {
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
  if (isRedisConnectionError(err)) {
    logger.error({ err }, "Uncaught Redis connection error: %s", err.message)
  } else {
    logger.error({ err }, "Uncaught exception: %s", err.message)
  }
  process.exit(1)
})

process.on("unhandledRejection", (reason, promise) => {
  logger.error({ reason, promise }, "Unhandled promise rejection")
  process.exit(1)
})

startWorker()
