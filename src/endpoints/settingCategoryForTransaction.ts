import { Request, Response } from "express"

import { transactionHandler } from "../modules/transactionHandler"
import { TransactionsService } from "../types"
import { getTransactionShowLink } from "../utils/getTransactionShowLink"

export async function settingCategoryForTransaction(req: Request, res: Response) {
  console.log("=================================== Setting category for transaction ===================================")
  const { transactionId, category_id } = req.params
  try {
    const messageId = await transactionHandler.getMessageId("CategoryMessageId", transactionId)
    await transactionHandler.deleteMessage("CategoryMessageId", messageId, transactionId)
  } catch (error) {
    // Could not delete message. Ignore
    console.log("Could not delete message", error)
    res.send("<script>window.close()</script>")
    return
  }

  console.log("Update transaction")
  await TransactionsService.updateTransaction(transactionId, {
    apply_rules: true,
    fire_webhooks: false,
    transactions: [{ category_id }],
  })
  console.log("Transaction updated")
  // Redirect to the transaction link
  const transaction = await TransactionsService.getTransaction(transactionId)
  if (transaction) {
    console.log("Transaction found, redirecting to show link")
    return res.redirect(getTransactionShowLink(transactionId))
  } else {
    res.send("<script>window.close()</script>")
  }
}
