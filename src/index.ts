import express from "express"
import { DateTime } from "luxon"

import { env } from "./config"
import { checkUnbudgetedTransaction, getTransactionShowLink } from "./controllers/checkUnbudgetedTransaction"
import { linkPaypalTransactions } from "./controllers/linkPaypalTransactions"
import { updateBillsBudgetLimit } from "./controllers/updateBillsBudgetLimit"
import { updateLeftoversBudget } from "./controllers/updateLeftoversBudget"
import { transactionHandler } from "./modules/transactionHandler"
import { BudgetsService, TransactionsService } from "./types"
import { WebhookTransactionBody } from "./webhooks"

const app = express()

app.listen(env.port, () => {
  console.log("Server is running on http://localhost:3000")
})

app.use(express.json())

async function updateAutoBudgets(_req: express.Request, res: express.Response) {
  console.log("=========================================== Triggered ===========================================")
  // Get all budgets
  const startDate = DateTime.now().startOf("month").toISODate()
  const endDate = DateTime.now().endOf("month").toISODate()

  const { data: budgets } = await BudgetsService.listBudget(null, 50, 1, startDate, endDate)
  // Get Bills Budget
  const billsBudget = budgets.find(({ attributes: { name } }) => name === env.billsBudget)
  // Get Leftovers Budget
  const leftoversBudget = budgets.find(({ attributes: { name } }) => name === env.leftoversBudget)

  // If bills budget is found
  if (billsBudget) {
    await updateBillsBudgetLimit(billsBudget, startDate, endDate)
  }

  // If leftovers budget is found
  if (leftoversBudget) {
    await updateLeftoversBudget(leftoversBudget, startDate, endDate)
  }

  if (env.fireflyPaypalAccountToken) {
    await linkPaypalTransactions()
  }

  if (res) {
    res.send("<script>window.close()</script>")
  }

  console.log("=========================================== Finished ===========================================")
}

// At start trigger the endpoint
app.get("/", updateAutoBudgets)
app.post("/", updateAutoBudgets)
app.get("/transaction/:transactionId/budget/:budget_id", async (req, res) => {
  console.log("=================================== Setting budget for transaction ===================================")
  console.log("Delete message")
  const { transactionId, budget_id } = req.params

  const messageId = await transactionHandler.getMessageId(transactionId)
  await transactionHandler.deleteMessage(messageId, transactionId)
  console.log("Update transaction")
  await TransactionsService.updateTransaction(transactionId, {
    apply_rules: true,
    fire_webhooks: true,
    transactions: [{ budget_id }],
  })
  console.log("Transaction updated")
  // Redirect to the transaction link
  const transaction = await TransactionsService.getTransaction(transactionId)
  if (transaction) {
    return res.redirect(getTransactionShowLink(transactionId))
  }
  res.send("<script>window.close()</script>")
})

// Add a task list for unbudgeted transactions
// Those tasks will be checked every 10 seconds
const unbudgetedTransactions: Map<string, boolean> = new Map()
// Check unbudgeted transactions every 10 seconds
setInterval(async () => {
  console.log("Checking unbudgeted transactions")
  const { value: transaction } = unbudgetedTransactions.entries().next()

  if (!transaction) {
    console.log("No unbudgeted transactions")
    return
  }
  if (transactionHandler && transaction) {
    const [key] = transaction
    console.log(`Checking unbudgeted transaction with key ${key}`)
    await checkUnbudgetedTransaction(key)
    unbudgetedTransactions.delete(key)
  }
}, 10000 * 1)

app.post("/transaction", async (req, res) => {
  console.log("=================================== Transaction webhook ===================================")
  // Print raw request
  const body: WebhookTransactionBody = req.body as WebhookTransactionBody
  // Check unbudgeted transactions
  console.log("Pushing unbudgeted transaction to task list")
  unbudgetedTransactions.set(`${body.content.id}`, true)
  res.send("<script>window.close()</script>")
})

// Every hour check the unbudgeted transactions
setInterval(
  async () => {
    console.log("=================================== Checking unbudgeted transactions ===================================")
    updateAutoBudgets(null, null)
    console.log("================ Checking the no-budget transactions =================")
    if (transactionHandler) {
      const { data } = await BudgetsService.listTransactionWithoutBudget(null, 50, 1)
      for (const { id } of data) {
        const hasHandlerMessageId = await transactionHandler.getMessageId(id)
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
