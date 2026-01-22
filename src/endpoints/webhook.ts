import { Request, Response } from "express"
import pino from "pino"

import { jobDefinitions, transactionJobDefinitions } from "../queues"
import { addJobToQueue, addTransactionJobToQueue } from "../queues/jobs"
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
  if (isTransactionTrigger) {
    const transactionId = String(body.content.id)

    for (const { id: job } of transactionJobDefinitions) {
      await addTransactionJobToQueue(job, transactionId)
    }
  }
  for (const { id: job } of jobDefinitions) {
    await addJobToQueue(job, !isTransactionTrigger)
  }
  res.send("<script>window.close()</script>")
}
