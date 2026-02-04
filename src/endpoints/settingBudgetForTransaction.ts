import { NextFunction, Request, Response } from "express"
import pino from "pino"

import { notifier } from "../modules/notifiers"
import { TransactionsService } from "../types"

const logger = pino()

export async function settingBudgetForTransaction(
  req: Request<{ transactionId: string; budget_id: string }>,
  res: Response,
  next: NextFunction,
) {
  logger.info("=================================== Setting budget for transaction ===================================")
  const { transactionId, budget_id } = req.params
  try {
    const messageId = await notifier.getMessageId("BudgetMessageId", transactionId)
    await notifier.deleteMessage("BudgetMessageId", messageId, transactionId)
  } catch (err) {
    // Could not delete message. Ignore
    logger.error({ err }, "Could not delete message")
    res.send("<script>window.close()</script>")
    return
  }

  logger.info("Update transaction")
  await TransactionsService.updateTransaction(transactionId, {
    apply_rules: true,
    fire_webhooks: true,
    transactions: [{ budget_id }],
  })
  logger.info("Transaction updated")
  next()
}
