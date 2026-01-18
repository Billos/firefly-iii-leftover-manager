import { Queue } from "bullmq"
import pino from "pino"

import { env } from "../config"
import { transactionHandler } from "../modules/transactionHandler"
import { BudgetRead, BudgetsService, TransactionsService, TransactionTypeProperty } from "../types"
import { getTransactionShowLink } from "../utils/getTransactionShowLink"
import { JobIds } from "./constants"
import { getJobDelay } from "./delay"
import { QueueArgs } from "./queueArgs"

const id = JobIds.UNBUDGETED_TRANSACTIONS

const logger = pino()
function generateMarkdownApiCalls(budgets: BudgetRead[], transactionId: string): String[] {
  const ret = []
  for (const { id, attributes } of budgets) {
    ret.push(`[\`${attributes.name}\`](<${env.serviceUrl}transaction/${transactionId}/budget/${id}>)`)
  }
  return ret
}

async function job(transactionId: string) {
  logger.info("Creating a new message for unbudgeted transaction with key %s", transactionId)
  const {
    data: {
      attributes: {
        transactions: [transaction],
      },
    },
  } = await TransactionsService.getTransaction(transactionId)

  // Ensure the transaction is a withdrawal
  const { type, amount, currency_decimal_places, currency_symbol, description } = transaction
  if (type !== TransactionTypeProperty.WITHDRAWAL) {
    logger.info("Transaction %s is not a withdrawal", transactionId)
    return
  }
  if (!transaction) {
    logger.info("Transaction %s not found", transactionId)
    return
  }

  if (transaction.budget_id) {
    logger.info("Transaction %s already budgeted", transactionId)
    return
  }

  const { data: allBudgets } = await BudgetsService.listBudget(null, 50, 1)
  const budgets = allBudgets.filter(({ attributes: { name } }) => !(env.billsBudget && name === env.billsBudget))

  const apis = generateMarkdownApiCalls(budgets, transactionId)
  const link = `[Link](<${getTransactionShowLink(transactionId)}>)`
  const msg = `\`${parseFloat(amount).toFixed(currency_decimal_places)} ${currency_symbol}\` ${description} \n${apis.join(" | ")} - ${link}`
  const messageId = await transactionHandler.getMessageId("BudgetMessageId", transactionId)
  if (!messageId) {
    await transactionHandler.sendMessage("BudgetMessageId", msg, transactionId)
    // Trying not to delete the message here, as it might be needed for future reference
    // await transactionHandler.deleteMessage("BudgetMessageId", messageId, transactionId)
  }
}

async function init(queue: Queue<QueueArgs>) {
  if (transactionHandler) {
    const { data } = await BudgetsService.listTransactionWithoutBudget(null, 50, 1)
    for (const { id: transactionId } of data) {
      logger.info("Adding unbudgeted transaction with id %s", transactionId)
      queue.add(transactionId, { job: id, transactionId }, { removeOnComplete: true, removeOnFail: true, delay: getJobDelay(id, false) })
    }
  }
}

export { job, init, id }
