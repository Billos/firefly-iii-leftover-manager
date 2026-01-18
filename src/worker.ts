import { initializeWorker } from "./queues"

async function startWorker() {
  try {
    console.log("Starting worker...")
    await initializeWorker()
    console.log("Worker is running and waiting for jobs")
  } catch (error) {
    console.error("Failed to start worker:", error)
    process.exit(1)
  }
}

startWorker()
