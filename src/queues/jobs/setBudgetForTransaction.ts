import { TransactionsService, TransactionUpdateWritable } from "@billos/firefly-iii-sdk"
import pino from "pino"

import { client } from "../../client"
import { getNotifier } from "../../modules/notifiers"
import { unbindTransactionToNotification } from "../../utils/notification"
import { EndpointJob } from "./BaseJob"

const logger = pino()

interface SetBudgetJobData {
  budget_id: string
}

interface SetBudgetForTransactionJobArgs {
  transactionId: string
  data: SetBudgetJobData
}

export class SetBudgetForTransactionJob extends EndpointJob<SetBudgetForTransactionJobArgs> {
  readonly id = "set-budget-for-transaction"

  async run({ transactionId: id, data }: SetBudgetForTransactionJobArgs): Promise<void> {
    const { budget_id } = data
    logger.info("Setting budget %s for transaction %s", budget_id, id)

    const notifier = await getNotifier()
    if (notifier) {
      try {
        logger.info("Deleting notifier message")
        const messageId = await notifier.getMessageId("BudgetMessageId", id)
        await unbindTransactionToNotification(id, "BudgetMessageId", messageId)
        await notifier.deleteMessage(messageId)
      } catch {
        logger.error("No notifier message to delete for transaction %s", id)
      }
    } else {
      logger.warn("No notifier configured, skipping message removal for transaction %s", id)
    }

    logger.info("Update transaction")

    const body: TransactionUpdateWritable = {
      apply_rules: true,
      fire_webhooks: true,
      transactions: [{ budget_id }],
    }
    await TransactionsService.updateTransaction({ client, path: { id }, body })
  }
}
