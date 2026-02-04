import { Request, Response } from "express"
import pino from "pino"

import { transactionHandler } from "../modules/transactionHandler"
import { TransactionsService } from "../types"
import { getTransactionShowLink } from "../utils/getTransactionShowLink"
import { withLock } from "../utils/redisLock"

const logger = pino()

export async function settingBudgetForTransaction(req: Request<{ transactionId: string; budget_id: string }>, res: Response) {
  logger.info("=================================== Setting budget for transaction ===================================")
  const { transactionId, budget_id } = req.params

  try {
    await withLock(`transaction:${transactionId}`, async () => {
      try {
        const messageId = await transactionHandler.getMessageId("BudgetMessageId", transactionId)
        await transactionHandler.deleteMessage("BudgetMessageId", messageId, transactionId)
      } catch (err) {
        // Could not delete message. Ignore
        logger.error({ err }, "Could not delete message")
      }

      logger.info("Update transaction")
      await TransactionsService.updateTransaction(transactionId, {
        apply_rules: true,
        fire_webhooks: true,
        transactions: [{ budget_id }],
      })
      logger.info("Transaction updated")
    })

    // Redirect to the transaction link
    // Note: Transaction is fetched outside the lock as this is just for display purposes.
    // If the transaction was modified after the lock, we'll just show the latest version.
    const transaction = await TransactionsService.getTransaction(transactionId)
    if (transaction) {
      return res.redirect(getTransactionShowLink(transactionId))
    } else {
      res.send("<script>window.close()</script>")
    }
  } catch (err) {
    logger.error({ err }, "Failed to update transaction with lock")
    res.send("<script>window.close()</script>")
  }
}
