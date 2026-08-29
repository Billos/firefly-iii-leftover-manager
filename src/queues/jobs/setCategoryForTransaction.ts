import { TransactionsService, TransactionUpdateWritable } from "@billos/firefly-iii-sdk"
import pino from "pino"

import { client } from "../../client"
import { getNotifier } from "../../modules/notifiers"
import { unbindTransactionToNotification } from "../../utils/notification"
import { EndpointJob } from "./BaseJob"

const logger = pino()

interface SetCategoryJobData {
  category_id: string
}

interface SetCategoryForTransactionJobArgs {
  transactionId: string
  data: SetCategoryJobData
}

export class SetCategoryForTransactionJob extends EndpointJob<SetCategoryForTransactionJobArgs> {
  readonly id = "set-category-for-transaction"

  async run({ transactionId: id, data }: SetCategoryForTransactionJobArgs): Promise<void> {
    const { category_id } = data
    logger.info("Setting category %s for transaction %s", category_id, id)

    const notifier = await getNotifier()
    if (notifier) {
      try {
        logger.info("Deleting notifier message")
        const messageId = await notifier.getMessageId("CategoryMessageId", id)
        await unbindTransactionToNotification(id, "CategoryMessageId", messageId)
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
      fire_webhooks: false,
      transactions: [{ category_id }],
    }
    await TransactionsService.updateTransaction({ client, path: { id }, body })
  }
}
