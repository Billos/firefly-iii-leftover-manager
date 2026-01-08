import { Request, Response } from "express"

import { getQueue, queues } from "../queues"
import { Transaction, WebhookTrigger } from "../types"

type WebhookTransactionBody = {
  uuid: string
  user_id: number
  trigger: string
  response: string
  url: string
  version: string
  content: Transaction & { id: number }
}

export async function webhook(req: Request, res: Response) {
  console.log("=================================== Transaction webhook ===================================")
  // Print raw request
  const body: WebhookTransactionBody = req.body as WebhookTransactionBody
  
  // Only process transaction-related webhooks
  const transactionTriggers = [
    WebhookTrigger.STORE_TRANSACTION,
    WebhookTrigger.UPDATE_TRANSACTION,
    WebhookTrigger.DESTROY_TRANSACTION,
  ]
  
  if (!transactionTriggers.includes(body.trigger as WebhookTrigger)) {
    console.log(`Ignoring non-transaction webhook trigger: ${body.trigger}`)
    res.send("<script>window.close()</script>")
    return
  }
  
  // Check unbudgeted transactions
  const queue = await getQueue()
  for (const { id } of queues) {
    queue.add(id, { job: id, transactionId: `${body.content.id}` }, { removeOnComplete: true, removeOnFail: true })
  }
  res.send("<script>window.close()</script>")
}
