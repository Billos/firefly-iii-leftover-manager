import { Request, Response } from "express"
import pino from "pino"

import { transactionHandler } from "../modules/transactionHandler"
import { TransactionsService } from "../types"
import { getTransactionShowLink } from "../utils/getTransactionShowLink"

const logger = pino()
export async function settingCategoryForTransaction(req: Request, res: Response) {
  logger.info("=================================== Setting category for transaction ===================================")
  const { transactionId, category_id } = req.params
  try {
    const messageId = await transactionHandler.getMessageId("CategoryMessageId", transactionId)
    await transactionHandler.deleteMessage("CategoryMessageId", messageId, transactionId)
  } catch (err) {
    // Could not delete message. Ignore
    logger.error({ err }, "Could not delete message")
    res.send("<script>window.close()</script>")
    return
  }

  logger.info("Update transaction")
  await TransactionsService.updateTransaction(transactionId, {
    apply_rules: true,
    fire_webhooks: false,
    transactions: [{ category_id }],
  })
  logger.info("Transaction updated")
  // Redirect to the transaction link
  const transaction = await TransactionsService.getTransaction(transactionId)
  if (transaction) {
    logger.info("Transaction found, redirecting to show link")
    return res.redirect(getTransactionShowLink(transactionId))
  } else {
    res.send("<script>window.close()</script>")
  }
}
