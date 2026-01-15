import { Request, Response } from "express"

import { getQueue, jobDefinitions, transactionJobDefinitions } from "../queues"
import { Transaction, WebhookTrigger } from "../types"

type WebhookTransactionBody = {
  uuid: string
  user_id: number
  trigger: WebhookTrigger
  response: string
  url: string
  version: string
  content: Transaction & { id: number }
}

const transactionTriggers = [
  WebhookTrigger.ANY,
  WebhookTrigger.STORE_TRANSACTION,
  WebhookTrigger.UPDATE_TRANSACTION,
  WebhookTrigger.DESTROY_TRANSACTION,
]

export async function webhook(req: Request, res: Response) {
  console.log("=================================== Transaction webhook ===================================")
  const body: WebhookTransactionBody = req.body as WebhookTransactionBody
  const isTransactionTrigger = transactionTriggers.includes(body.trigger)
  const queue = await getQueue()
  if (isTransactionTrigger) {
    const transactionId = `${body.content.id}`
    // Query existing jobs once to avoid multiple API calls
    const existingJobs = await queue.getJobs(["waiting", "active", "delayed"])
    
    for (const { id: job } of transactionJobDefinitions) {
      // Check if job with the same [job, transactionId] tuple already exists in the queue
      const isDuplicate = existingJobs.some(
        (existingJob) => existingJob.data.job === job && existingJob.data.transactionId === transactionId,
      )
      
      if (isDuplicate) {
        console.log("Job already exists in queue:", job, "for transactionId:", transactionId)
      } else {
        console.log("Adding job to queue:", job, "for transactionId:", transactionId)
        queue.add(job, { job, transactionId }, { removeOnComplete: true, removeOnFail: true })
      }
    }
  }
  for (const { id: job } of jobDefinitions) {
    console.log("Adding job to queue:", job)
    queue.add(job, { job }, { removeOnComplete: true, removeOnFail: true })
  }
  res.send("<script>window.close()</script>")
}
