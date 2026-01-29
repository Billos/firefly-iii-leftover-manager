import pino from "pino"

import { env } from "./config"
import { AboutService } from "./types/services/AboutService"

const logger = pino()

/**
 * Performs a health check to ensure the Firefly III service is accessible
 * and all required configuration is present before starting any jobs.
 *
 * @returns Promise that resolves if health check passes, rejects otherwise
 * @throws Error if Firefly III is not accessible or configuration is invalid
 */
export async function checkFireflyHealth(): Promise<void> {
  logger.info("Performing Firefly III health check...")

  // Check required environment variables
  if (!env.fireflyUrl) {
    throw new Error("FIREFLY_III_URL environment variable is not set")
  }

  if (!env.fireflyToken) {
    throw new Error("FIREFLY_III_TOKEN environment variable is not set")
  }

  // Attempt to connect to Firefly III API
  try {
    const systemInfo = await AboutService.getAbout()
    logger.info(
      {
        version: systemInfo.data.version,
        apiVersion: systemInfo.data.api_version,
        os: systemInfo.data.os,
      },
      "✓ Firefly III service is healthy",
    )
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to connect to Firefly III: ${error.message}`)
    }
    throw new Error("Failed to connect to Firefly III: Unknown error")
  }
}
