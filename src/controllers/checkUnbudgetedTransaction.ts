import { env } from "../config"
import { updateAutomaticBudgets } from "../endpoints/updateAutomaticBudgets"
import { transactionHandler } from "../modules/transactionHandler"
import { BudgetRead, BudgetsService, TransactionsService, TransactionTypeProperty } from "../types"
import { sleep } from "../utils/sleep"

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

export function getTransactionShowLink(transactionId: string): string {
  return `${env.fireflyUrl}/transactions/show/${transactionId}`
}

async function checkUnbudgetedTransaction(transactionId: string): Promise<void> {
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

  if (transaction.budget_id) {
    console.log(`Transaction ${transactionId} already budgeted`)
    return
  }

  const budgets = await getBudgetsByTransactionId()

  const apis = generateMarkdownApiCalls(budgets, transactionId)
  const link = `[Link](<${getTransactionShowLink(transactionId)}>)`
  const msg = `\`${parseFloat(amount).toFixed(currency_decimal_places)} ${currency_symbol}\` ${description} \n${apis.join(" | ")} - ${link}`
  try {
    const messageId = await transactionHandler.getMessageId("BudgetMessageId", transactionId)
    if (messageId) {
      await transactionHandler.updateMessage("BudgetMessageId", messageId, msg, transactionId)
    } else {
      await transactionHandler.sendMessage("BudgetMessageId", msg, transactionId)
    }
    // Limit to 5 messages every 2 seconds
    await sleep(500)
  } catch (error) {
    console.error("Error updating message", error)
  }
}

// Those tasks will be checked every 10 seconds
// Check unbudgeted transactions every 10 seconds
const unbudgetedTransactions: Map<string, boolean> = new Map()

// Every hour check the unbudgeted transactions
setInterval(
  async () => {
    console.log("=================================== Checking unbudgeted transactions ===================================")
    updateAutomaticBudgets(null, null)
    console.log("================ Checking the no-budget transactions =================")
    if (transactionHandler) {
      const { data } = await BudgetsService.listTransactionWithoutBudget(null, 50, 1)
      for (const { id } of data) {
        const hasHandlerMessageId = await transactionHandler.getMessageId("BudgetMessageId", id)
        if (!hasHandlerMessageId) {
          unbudgetedTransactions.set(`${id}`, true)
        } else {
          console.log(`Transaction ${id} already has a handler message id`)
        }
      }
    }
  },
  1000 * 60 * 60,
)

setInterval(async () => {
  console.log("=================================== Checking unbudgeted transactions ===================================")
  const { value: transaction } = unbudgetedTransactions.entries().next()

  if (!transaction) {
    return
  }
  if (transactionHandler && transaction) {
    const [key] = transaction
    console.log(`Checking unbudgeted transaction with key ${key}`)
    await checkUnbudgetedTransaction(key)
    unbudgetedTransactions.delete(key)
  }
}, 10000 * 1)

export { unbudgetedTransactions }
