import { Request, Response } from "express"

import { getQueue, queues } from "../queues"
import { Transaction } from "../types"

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
  // Check unbudgeted transactions
  const queue = await getQueue()
  for (const { id } of queues) {
    queue.add(id, { job: id, transactionId: `${body.content.id}` })
  }
  res.send("<script>window.close()</script>")
}
