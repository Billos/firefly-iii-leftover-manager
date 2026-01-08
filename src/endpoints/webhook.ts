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
    for (const { id: job } of transactionJobDefinitions) {
      queue.add(job, { job, transactionId }, { removeOnComplete: true, removeOnFail: true })
    }
  }
  for (const { id: job } of jobDefinitions) {
    queue.add(job, { job }, { removeOnComplete: true, removeOnFail: true })
  }
  res.send("<script>window.close()</script>")
}
