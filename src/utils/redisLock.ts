import { Redis } from "ioredis"
import pino from "pino"

import { env } from "../config"

const logger = pino()

// Create a Redis client for locking
let redisClient: Redis | null = null

function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis({
      host: env.redisConnection.host,
      port: env.redisConnection.port,
      db: env.redisConnection.db,
      password: env.redisConnection.password,
    })
  }
  return redisClient
}

/**
 * Acquire a lock for a given key
 * @param key - The key to lock
 * @param ttl - Time to live in milliseconds (default 30 seconds)
 * @param retryDelay - Delay between retries in milliseconds (default 100ms)
 * @param maxRetries - Maximum number of retries (default 100, total 10 seconds)
 * @returns A unique lock token if successful, null if failed to acquire
 */
export async function acquireLock(
  key: string,
  ttl: number = 30000,
  retryDelay: number = 100,
  maxRetries: number = 100,
): Promise<string | null> {
  const redis = getRedisClient()
  const lockKey = `lock:${key}`
  const lockValue = `${Date.now()}-${Math.random()}`

  for (let i = 0; i < maxRetries; i++) {
    try {
      // Use SET with NX (only set if not exists) and PX (expiry in milliseconds)
      const result = await redis.set(lockKey, lockValue, "PX", ttl, "NX")
      if (result === "OK") {
        logger.debug(`Lock acquired for key: ${key}`)
        return lockValue
      }
    } catch (err) {
      logger.error({ err }, `Error acquiring lock for key: ${key}`)
      throw err
    }

    // Wait before retrying
    await new Promise((resolve) => setTimeout(resolve, retryDelay))
  }

  logger.warn(`Failed to acquire lock for key: ${key} after ${maxRetries} retries`)
  return null
}

/**
 * Release a lock for a given key
 * @param key - The key to unlock
 * @param lockValue - The lock token returned by acquireLock
 * @returns true if successfully released, false otherwise
 */
export async function releaseLock(key: string, lockValue: string): Promise<boolean> {
  const redis = getRedisClient()
  const lockKey = `lock:${key}`

  try {
    // Use Lua script to ensure we only delete if the value matches (atomic operation)
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `
    const result = await redis.eval(script, 1, lockKey, lockValue)
    const released = result === 1
    if (released) {
      logger.debug(`Lock released for key: ${key}`)
    } else {
      logger.warn(`Failed to release lock for key: ${key} - lock value mismatch or already expired`)
    }
    return released
  } catch (err) {
    logger.error({ err }, `Error releasing lock for key: ${key}`)
    return false
  }
}

/**
 * Execute a function with a lock
 * @param key - The key to lock
 * @param fn - The function to execute while holding the lock
 * @param ttl - Time to live in milliseconds (default 30 seconds)
 * @returns The result of the function
 */
export async function withLock<T>(key: string, fn: () => Promise<T>, ttl: number = 30000): Promise<T> {
  const lockValue = await acquireLock(key, ttl)
  if (!lockValue) {
    throw new Error(`Failed to acquire lock for key: ${key}`)
  }

  try {
    return await fn()
  } finally {
    await releaseLock(key, lockValue)
  }
}
