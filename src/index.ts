import express from "express"
import { DateTime } from "luxon"

import { env } from "./config"
import { checkUnbudgetedTransaction, checkUnbudgetedTransactions } from "./controllers/checkUnbudgetedTransactions"
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
  res.send("<script>window.close()</script>")
})

app.post("/transaction", async (req, res) => {
  console.log("=================================== Transaction webhook ===================================")
  // Print raw request
  const body: WebhookTransactionBody = req.body as WebhookTransactionBody
  // Check unbudgeted transactions
  if (transactionHandler) {
    await checkUnbudgetedTransaction(`${body.content.id}`)
  }

  await updateAutoBudgets(req, res)
})

updateAutoBudgets(null, null)
if (transactionHandler) {
  checkUnbudgetedTransactions()
}
