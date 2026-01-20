import { Queue } from "bullmq"
import pino from "pino"

import { env } from "../config"
import { transactionHandler } from "../modules/transactionHandler"
import { CategoriesService, CategoryRead, TransactionRead, TransactionsService, TransactionTypeProperty } from "../types"
import { getDateNow } from "../utils/date"
import { getTransactionShowLink } from "../utils/getTransactionShowLink"
import { JobIds } from "./constants"
import { getJobDelay } from "./delay"
import { QueueArgs } from "./queueArgs"

const id = JobIds.UNCATEGORIZED_TRANSACTIONS

const logger = pino()

async function getUncategorizedTransactions(startDate?: string, endDate?: string): Promise<TransactionRead[]> {
  const transactions: TransactionRead[] = []
  const {
    meta: {
      pagination: { total_pages },
    },
  } = await TransactionsService.listTransaction(null, 200, 1, startDate, endDate)

  for (let page = 1; page <= total_pages; page++) {
    const { data } = await TransactionsService.listTransaction(null, 200, page, startDate, endDate)
    const filteredData = data.filter(
      (transaction) =>
        !transaction.attributes.transactions[0].category_id &&
        transaction.attributes.transactions[0].type === TransactionTypeProperty.WITHDRAWAL,
    )
    transactions.push(...filteredData)
  }
  return transactions
}

function generateMarkdownApiCalls(categories: CategoryRead[], transactionId: string): String[] {
  const ret = []
  for (const { id, attributes } of categories) {
    const url = new URL(`/transaction/${transactionId}/category/${id}`, env.serviceUrl)
    url.searchParams.append("api_token", env.apiToken)
    ret.push(`[\`${attributes.name}\`](<${url.toString()}>)`)
  }
  return ret
}

async function job(transactionId: string) {
  logger.info("Creating a new message for uncategorized transaction with key %s", transactionId)
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

  if (transaction.category_id) {
    logger.info("Transaction %s already categorized", transactionId)
    return
  }

  const { data: allCategories } = await CategoriesService.listCategory(null, 50, 1)
  const categories = allCategories.filter(({ attributes: { name } }) => !(env.billsBudget && name === env.billsBudget))

  const apis = generateMarkdownApiCalls(categories, transactionId)
  const link = `[Link](<${getTransactionShowLink(transactionId)}>)`
  const msg = `\`${parseFloat(amount).toFixed(currency_decimal_places)} ${currency_symbol}\` ${description} \n${apis.join(" | ")} - ${link}`
  await transactionHandler.sendMessage("CategoryMessageId", msg, transactionId)
}

async function init(queue: Queue<QueueArgs>) {
  if (transactionHandler) {
    const startDate = getDateNow().startOf("month").toISODate()
    const endDate = getDateNow().toISODate()
    const uncategorizedTransactionsList = await getUncategorizedTransactions(startDate, endDate)
    for (const { id: transactionId } of uncategorizedTransactionsList) {
      logger.info("Adding uncategorized transaction with id %s", transactionId)
      const jobId = `${id}-${transactionId}`
      const delay = getJobDelay(id, false)
      queue.add(
        transactionId,
        { job: id, transactionId: transactionId },
        { 
          jobId,
          removeOnComplete: true, 
          removeOnFail: true, 
          delay,
          deduplication: {
            id: jobId,
            ttl: delay + 60000, // Debounce window: delay + 1 minute
          }
        },
      )
    }
  }
}

export { job, init, id }
