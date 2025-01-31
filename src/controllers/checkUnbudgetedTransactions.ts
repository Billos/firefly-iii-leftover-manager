import { env } from "../config"
import { transactionHandler } from "../modules/transactionHandler"
import { BudgetRead, BudgetsService, TransactionArray, TransactionSplit, TransactionsService, TransactionTypeFilter } from "../types"
import { sleep } from "../utils/sleep"

async function getTransactions(amout: number, page: number, startDate: string, endDate: string): Promise<TransactionArray> {
  return TransactionsService.listTransaction(null, amout, page, startDate, endDate, TransactionTypeFilter.WITHDRAWAL)
}

async function countPagesToFetch(amount: number, startDate: string, endDate: string): Promise<number> {
  const { meta } = await getTransactions(amount, 1, startDate, endDate)
  return meta.pagination.total_pages
}

async function getUnbudgetedTransactions(startDate: string, endDate: string): Promise<TransactionSplit[]> {
  console.log("================ Getting the unbudgeted =================")
  const amountPerPage = 50
  const totalPages = await countPagesToFetch(amountPerPage, startDate, endDate)
  const unbudgetedTransactions: TransactionSplit[] = []

  for (let page = 1; page <= totalPages; page++) {
    const { data: transactions } = await getTransactions(amountPerPage, page, startDate, endDate)
    for (const transactionItem of transactions) {
      const {
        attributes: {
          transactions: [transaction],
        },
      } = transactionItem
      if (!transaction.budget_id) {
        unbudgetedTransactions.push(transaction)
      }
    }
  }
  console.log(`Found ${unbudgetedTransactions.length} unbudgeted transactions`)
  return unbudgetedTransactions
}

function generateMarkdownApiCalls(budgets: BudgetRead[], transactionId: string): String[] {
  const ret = []
  for (const budget of budgets) {
    const {
      id,
      attributes: { name },
    } = budget
    ret.push(`[\`${name}\`](<${env.serviceUrl}transaction/${transactionId}/budget/${id}>)`)
  }
  return ret
}

async function getBudgetsByTransactionId(startDate?: string, endDate?: string): Promise<BudgetRead[]> {
  const { data: allBbudgets } = await BudgetsService.listBudget(null, 50, 1, startDate, endDate)
  const budgets = allBbudgets.filter(({ attributes: { name } }) => !(env.billsBudget && name === env.billsBudget))
  return budgets
}

export async function checkUnbudgetedTransaction(transactionId: string): Promise<void> {
  const {
    data: {
      attributes: {
        transactions: [transaction],
      },
    },
  } = await TransactionsService.getTransaction(transactionId)
  const { amount, currency_decimal_places, currency_symbol, description } = transaction
  if (!transaction) {
    console.log(`Transaction ${transactionId} not found`)
    return
  }

  if (transaction.budget_id) {
    console.log(`Transaction ${transactionId} already budgeted`)
    return
  }

  const budgets = await getBudgetsByTransactionId()

  const apis = generateMarkdownApiCalls(budgets, transactionId)
  const msg = `\`${parseFloat(amount).toFixed(currency_decimal_places)} ${currency_symbol}\` ${description} \n${apis.join(" ")}`
  try {
    const messageId = await transactionHandler.getMessageId(transactionId)
    if (messageId) {
      await transactionHandler.updateMessage(messageId, msg, transactionId)
    } else {
      await transactionHandler.sendMessage(msg, transactionId)
    }
    // Limit to 5 messages every 2 seconds
    await sleep(500)
  } catch (error) {
    console.error("Error updating message", error)
  }
}

export async function checkUnbudgetedTransactions(startDate: string, endDate: string) {
  console.log("================ Checking the no-budget transactions =================")
  const unbudgetedTransactions = await getUnbudgetedTransactions(startDate, endDate)

  // Send a message to discord for each unbudgeted transaction
  for (const transaction of unbudgetedTransactions) {
    await checkUnbudgetedTransaction(transaction.transaction_journal_id)
  }
}
