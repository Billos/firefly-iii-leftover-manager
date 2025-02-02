import { env } from "../config"
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

export async function checkUnbudgetedTransaction(transactionId: string): Promise<void> {
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
  const link = `[Link](${env.fireflyUrl}/transactions/show/${transactionId})`
  const msg = `\`${parseFloat(amount).toFixed(currency_decimal_places)} ${currency_symbol}\` ${description} \n${apis.join(" ")} - ${link}`
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

export async function checkUnbudgetedTransactions() {
  console.log("================ Checking the no-budget transactions =================")
  const { data } = await BudgetsService.listTransactionWithoutBudget(null, 50, 1)
  // Send a message to discord for each unbudgeted transaction
  for (const { id } of data) {
    await checkUnbudgetedTransaction(id)
  }
}
