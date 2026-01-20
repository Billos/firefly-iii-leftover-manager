import { Request, Response } from "express"
import pino from "pino"

import { getQueue, jobDefinitions, transactionJobDefinitions } from "../queues"
import { getJobDelay } from "../queues/delay"
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

const logger = pino()

export async function webhook(req: Request, res: Response) {
  logger.info("=================================== Transaction webhook ===================================")
  const body: WebhookTransactionBody = req.body as WebhookTransactionBody
  const isTransactionTrigger = transactionTriggers.includes(body.trigger)
  const queue = await getQueue()
  if (isTransactionTrigger) {
    const transactionId = String(body.content.id)

    for (const { id: job } of transactionJobDefinitions) {
      const delay = getJobDelay(job, false)
      const jobId = `${job}-${transactionId}`
      logger.info("Adding job to queue: %s for transactionId: %s with delay: %d seconds", job, transactionId, delay / 1000)
      queue.add(job, { job, transactionId }, { 
        jobId,
        removeOnComplete: true, 
        removeOnFail: true, 
        delay,
        deduplication: {
          id: jobId,
          ttl: delay + 60000, // Debounce window: delay + 1 minute
        }
      })
    }
  }
  for (const { id: job } of jobDefinitions) {
    const delay = getJobDelay(job, false, !isTransactionTrigger)
    logger.info("Adding job to queue: %s with delay: %d seconds", job, delay / 1000)
    queue.add(job, { job }, { removeOnComplete: true, removeOnFail: true, delay })
  }
  res.send("<script>window.close()</script>")
}
