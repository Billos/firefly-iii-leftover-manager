import { initializeWorker } from "./queues"

async function startWorker() {
  console.log("Starting worker...")
  await initializeWorker()
  console.log("Worker is running and waiting for jobs")
}

startWorker()
