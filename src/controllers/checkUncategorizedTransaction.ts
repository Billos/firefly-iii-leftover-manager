import { DateTime } from "luxon"

import { env } from "../config"
import { transactionHandler } from "../modules/transactionHandler"
import { CategoriesService, CategoryRead, TransactionRead, TransactionsService, TransactionTypeProperty } from "../types"
import { getTransactionShowLink } from "../utils/getTransactionShowLink"
import { sleep } from "../utils/sleep"

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

async function getCategories(): Promise<CategoryRead[]> {
  const { data: allCategories } = await CategoriesService.listCategory(null, 50, 1)
  const categories = allCategories.filter(({ attributes: { name } }) => !(env.billsBudget && name === env.billsBudget))
  return categories
}

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

async function checkUncategorizedTransaction(transactionId: string): Promise<void> {
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

  const categories = await getCategories()

  const apis = generateMarkdownApiCalls(categories, transactionId)
  const link = `[Link](<${getTransactionShowLink(transactionId)}>)`
  const msg = `\`${parseFloat(amount).toFixed(currency_decimal_places)} ${currency_symbol}\` ${description} \n${apis.join(" | ")} - ${link}`
  try {
    const messageId = await transactionHandler.getMessageId("CategoryMessageId", transactionId)
    if (messageId) {
      await transactionHandler.updateMessage("CategoryMessageId", messageId, msg, transactionId)
    } else {
      await transactionHandler.sendMessage("CategoryMessageId", msg, transactionId)
    }
    // Limit to 5 messages every 2 seconds
    await sleep(500)
  } catch (error) {
    console.error("Error updating message", error)
  }
}

// Those tasks will be checked every 10 seconds
// Check uncategorized transactions every 10 seconds
const uncategorizedTransactions: Map<string, boolean> = new Map()

// Every hour check the unbudgeted transactions

async function initUncategorizedTransactions() {
  if (transactionHandler) {
    const startDate = DateTime.now().startOf("month").toISODate()
    const endDate = DateTime.now().toISODate()
    const uncategorizedTransactionsList = await getUncategorizedTransactions(startDate, endDate)
    for (const { id } of uncategorizedTransactionsList) {
      console.log(`Adding uncategorized transaction with id ${id}`)
      uncategorizedTransactions.set(`${id}`, true)
    }
  }
}

async function consumeUncategorizedTransactions() {
  const { value: transaction } = uncategorizedTransactions.entries().next()
  if (transactionHandler && transaction) {
    const [key] = transaction
    console.log(`Checking uncategorized transaction with key ${key}`)
    await checkUncategorizedTransaction(key)
    uncategorizedTransactions.delete(key)
  }
}

setInterval(async () => initUncategorizedTransactions(), 1000 * 60 * 60)

initUncategorizedTransactions()

setInterval(async () => consumeUncategorizedTransactions(), 10000 * 1)

export { uncategorizedTransactions }
