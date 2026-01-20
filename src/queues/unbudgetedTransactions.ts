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
    const url = new URL(`/transaction/${transactionId}/budget/${id}`, env.serviceUrl)
    url.searchParams.append("api_token", env.apiToken)
    ret.push(`[\`${attributes.name}\`](<${url.toString()}>)`)
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
  await transactionHandler.sendMessage("BudgetMessageId", msg, transactionId)
}

async function init(queue: Queue<QueueArgs>) {
  if (transactionHandler) {
    const { data } = await BudgetsService.listTransactionWithoutBudget(null, 50, 1)
    for (const { id: transactionId } of data) {
      logger.info("Adding unbudgeted transaction with id %s", transactionId)
      const jobId = `${id}-${transactionId}`
      const delay = getJobDelay(id, false)
      queue.add(transactionId, { job: id, transactionId }, { 
        jobId,
        removeOnComplete: true, 
        removeOnFail: true, 
        delay,
        deduplication: {
          id: jobId,
          ttl: delay + 60000, // Debounce window: delay + 1 minute
          extend: true, // Extend TTL on duplicate attempts (debounce behavior)
        }
      })
    }
  }
}

export { job, init, id }
