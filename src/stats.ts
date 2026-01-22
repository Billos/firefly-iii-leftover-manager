import { Queue } from "bullmq"
import { DateTime } from "luxon"
import pino from "pino"

import { env } from "./config"

const logger = pino()

interface JobStatistics {
  jobId: string
  name: string
  completedCount: number
  failedCount: number
  totalJobs: number
  avgDurationMs: number
  minDurationMs: number
  maxDurationMs: number
  totalDurationMs: number
}

async function getJobStatistics(): Promise<void> {
  const queue = new Queue("manager", { connection: env.redisConnection })

  try {
    logger.info("Connecting to Redis and retrieving job statistics...")
    logger.info("Redis connection: %s:%d (db: %d)", env.redisConnection.host, env.redisConnection.port, env.redisConnection.db)

    // Get completed jobs
    const completedJobs = await queue.getCompleted(0, -1)
    const failedJobs = await queue.getFailed(0, -1)

    logger.info("Found %d completed jobs and %d failed jobs", completedJobs.length, failedJobs.length)

    // Group jobs by name for statistics
    const jobStats = new Map<
      string,
      {
        durations: number[]
        completed: number
        failed: number
      }
    >()

    // Process completed jobs
    for (const job of completedJobs) {
      const { name, finishedOn, processedOn } = job

      if (!jobStats.has(name)) {
        jobStats.set(name, { durations: [], completed: 0, failed: 0 })
      }

      const stats = jobStats.get(name)!
      stats.completed++

      // Calculate duration if timestamps are available
      if (finishedOn && processedOn) {
        const duration = finishedOn - processedOn
        stats.durations.push(duration)
      }
    }

    // Process failed jobs
    for (const job of failedJobs) {
      const { name } = job

      if (!jobStats.has(name)) {
        jobStats.set(name, { durations: [], completed: 0, failed: 0 })
      }

      const stats = jobStats.get(name)!
      stats.failed++
    }

    // Calculate and display statistics
    const statistics: JobStatistics[] = []

    for (const [jobId, stats] of jobStats.entries()) {
      const { durations, completed, failed } = stats
      const totalJobs = completed + failed

      let avgDurationMs = 0
      let minDurationMs = 0
      let maxDurationMs = 0
      let totalDurationMs = 0

      if (durations.length > 0) {
        totalDurationMs = durations.reduce((sum, d) => sum + d, 0)
        avgDurationMs = totalDurationMs / durations.length
        minDurationMs = Math.min(...durations)
        maxDurationMs = Math.max(...durations)
      }

      statistics.push({
        jobId,
        name: jobId,
        completedCount: completed,
        failedCount: failed,
        totalJobs,
        avgDurationMs: Math.round(avgDurationMs),
        minDurationMs: Math.round(minDurationMs),
        maxDurationMs: Math.round(maxDurationMs),
        totalDurationMs: Math.round(totalDurationMs),
      })
    }

    // Sort by total jobs descending
    statistics.sort((a, b) => b.totalJobs - a.totalJobs)

    // Display statistics
    logger.info("=".repeat(100))
    logger.info("JOB STATISTICS SUMMARY")
    logger.info("=".repeat(100))
    logger.info("Timestamp: %s", DateTime.now().toISO())
    logger.info("")

    if (statistics.length === 0) {
      logger.info("No job statistics available yet.")
    } else {
      for (const stat of statistics) {
        logger.info("-".repeat(100))
        logger.info("Job Name: %s", stat.name)
        logger.info("  Total Jobs:     %d (Completed: %d, Failed: %d)", stat.totalJobs, stat.completedCount, stat.failedCount)

        if (stat.completedCount > 0 && stat.avgDurationMs > 0) {
          logger.info("  Avg Duration:   %s ms (%s seconds)", stat.avgDurationMs, (stat.avgDurationMs / 1000).toFixed(2))
          logger.info("  Min Duration:   %s ms (%s seconds)", stat.minDurationMs, (stat.minDurationMs / 1000).toFixed(2))
          logger.info("  Max Duration:   %s ms (%s seconds)", stat.maxDurationMs, (stat.maxDurationMs / 1000).toFixed(2))
          logger.info("  Total Duration: %s ms (%s seconds)", stat.totalDurationMs, (stat.totalDurationMs / 1000).toFixed(2))
        }
      }
    }

    logger.info("=".repeat(100))

    // Overall summary
    const totalCompleted = statistics.reduce((sum, s) => sum + s.completedCount, 0)
    const totalFailed = statistics.reduce((sum, s) => sum + s.failedCount, 0)
    const totalProcessed = totalCompleted + totalFailed

    logger.info("")
    logger.info("OVERALL SUMMARY")
    logger.info("  Total Processed: %d", totalProcessed)
    logger.info(
      "  Total Completed: %s (%s%%)",
      totalCompleted,
      totalProcessed > 0 ? ((totalCompleted / totalProcessed) * 100).toFixed(2) : "0.00",
    )
    logger.info(
      "  Total Failed:    %s (%s%%)",
      totalFailed,
      totalProcessed > 0 ? ((totalFailed / totalProcessed) * 100).toFixed(2) : "0.00",
    )
    logger.info("=".repeat(100))

    await queue.close()
    logger.info("Statistics retrieval completed successfully")
  } catch (error) {
    logger.error({ err: error }, "Failed to retrieve job statistics")
    try {
      await queue.close()
    } catch (closeError) {
      // Ignore errors when closing queue as we're already handling an error
    }
    process.exit(1)
  }
}

getJobStatistics()
