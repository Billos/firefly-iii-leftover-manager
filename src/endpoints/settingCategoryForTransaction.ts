import { NextFunction, Request, Response } from "express"
import pino from "pino"

import { notifier } from "../modules/notifiers"
import { TransactionsService } from "../types"

const logger = pino()
export async function settingCategoryForTransaction(
  req: Request<{ transactionId: string; category_id: string }>,
  res: Response,
  next: NextFunction,
) {
  logger.info("=================================== Setting category for transaction ===================================")
  const { transactionId, category_id } = req.params
  try {
    const messageId = await notifier.getMessageId("CategoryMessageId", transactionId)
    await notifier.deleteMessage("CategoryMessageId", messageId, transactionId)
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
  next()
}
