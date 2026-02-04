import pino from "pino"

const logger = pino()

// In-memory lock storage
const locks: Record<string, Promise<void>> = {}

/**
 * Execute a function with a lock on the given key
 * Uses an in-memory Record to track active locks per key
 * @param key - The key to lock
 * @param fn - The function to execute while holding the lock
 * @returns The result of the function
 */
export async function withLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
  // Wait for any existing lock on this key
  while (locks[key]) {
    logger.debug(`Waiting for lock on key: ${key}`)
    await locks[key]
  }

  // Create a new lock promise
  let releaseLock: () => void
  locks[key] = new Promise<void>((resolve) => {
    releaseLock = resolve
  })

  logger.debug(`Lock acquired for key: ${key}`)

  try {
    return await fn()
  } finally {
    // Release the lock
    releaseLock!()
    delete locks[key]
    logger.debug(`Lock released for key: ${key}`)
  }
}

/**
 * Execute a function with multiple locks acquired in deterministic order
 * This prevents deadlocks by ensuring locks are always acquired in the same order
 * @param keys - Array of keys to lock
 * @param fn - The function to execute while holding all locks
 * @returns The result of the function
 */
export async function withMultipleLocks<T>(keys: string[], fn: () => Promise<T>): Promise<T> {
  // Sort keys to ensure deterministic lock ordering
  const sortedKeys = [...keys].sort()

  // Recursive function to acquire locks in order
  const acquireLocks = async (remainingKeys: string[]): Promise<T> => {
    if (remainingKeys.length === 0) {
      return await fn()
    }

    const [currentKey, ...rest] = remainingKeys
    return await withLock(currentKey, () => acquireLocks(rest))
  }

  return await acquireLocks(sortedKeys)
}
