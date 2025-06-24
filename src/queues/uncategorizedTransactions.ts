import { Queue } from "bullmq"
import { DateTime } from "luxon"

import { env } from "../config"
import { transactionHandler } from "../modules/transactionHandler"
import { CategoriesService, CategoryRead, TransactionRead, TransactionsService, TransactionTypeProperty } from "../types"
import { getTransactionShowLink } from "../utils/getTransactionShowLink"
import { QueueArgs } from "./queueArgs"

const id = "uncategorized-transactions"

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
  for (const {
    id,
    attributes: { name },
  } of categories) {
    ret.push(`[\`${name}\`](<${env.serviceUrl}transaction/${transactionId}/category/${id}>)`)
  }
  return ret
}

async function job(transactionId: string) {
  console.log(`Creating a new message for uncategorized transaction with key ${transactionId}`)
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
    console.log(`Transaction ${transactionId} is not a withdrawal`)
    return
  }
  if (!transaction) {
    console.log(`Transaction ${transactionId} not found`)
    return
  }

  if (transaction.category_id) {
    console.log(`Transaction ${transactionId} already categorized`)
    return
  }

  const { data: allCategories } = await CategoriesService.listCategory(null, 50, 1)
  const categories = allCategories.filter(({ attributes: { name } }) => !(env.billsBudget && name === env.billsBudget))

  const apis = generateMarkdownApiCalls(categories, transactionId)
  const link = `[Link](<${getTransactionShowLink(transactionId)}>)`
  const msg = `\`${parseFloat(amount).toFixed(currency_decimal_places)} ${currency_symbol}\` ${description} \n${apis.join(" | ")} - ${link}`
  const messageId = await transactionHandler.getMessageId("CategoryMessageId", transactionId)
  if (messageId) {
    await transactionHandler.deleteMessage("CategoryMessageId", messageId, transactionId)
  }
  await transactionHandler.sendMessage("CategoryMessageId", msg, transactionId)
}

async function init(queue: Queue<QueueArgs>) {
  if (transactionHandler) {
    const startDate = DateTime.now().startOf("month").toISODate()
    const endDate = DateTime.now().toISODate()
    const uncategorizedTransactionsList = await getUncategorizedTransactions(startDate, endDate)
    for (const { id: transactionId } of uncategorizedTransactionsList) {
      console.log(`Adding uncategorized transaction with id ${transactionId}`)
      queue.add(transactionId, { job: id, transactionId: transactionId })
    }
  }
}

export { job, init, id }
