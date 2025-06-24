import { Request, Response } from "express"

import { transactionHandler } from "../modules/transactionHandler"
import { TransactionsService } from "../types"
import { getTransactionShowLink } from "../utils/getTransactionShowLink"

export async function settingBudgetForTransaction(req: Request, res: Response) {
  console.log("=================================== Setting budget for transaction ===================================")
  const { transactionId, budget_id } = req.params
  try {
    const messageId = await transactionHandler.getMessageId("BudgetMessageId", transactionId)
    await transactionHandler.deleteMessage("BudgetMessageId", messageId, transactionId)
  } catch (error) {
    // Could not delete message. Ignore
    console.log("Could not delete message", error)
    res.send("<script>window.close()</script>")
    return
  }

  console.log("Update transaction")
  await TransactionsService.updateTransaction(transactionId, {
    apply_rules: true,
    fire_webhooks: true,
    transactions: [{ budget_id }],
  })
  console.log("Transaction updated")
  // Redirect to the transaction link
  const transaction = await TransactionsService.getTransaction(transactionId)
  if (transaction) {
    return res.redirect(getTransactionShowLink(transactionId))
  } else {
    res.send("<script>window.close()</script>")
  }
}
