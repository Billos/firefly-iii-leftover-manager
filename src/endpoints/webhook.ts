import { Request, Response } from "express"

import { unbudgetedTransactions } from "../controllers/checkUnbudgetedTransaction"
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
  console.log("Pushing unbudgeted transaction to task list")
  unbudgetedTransactions.set(`${body.content.id}`, true)
  res.send("<script>window.close()</script>")
}
