import express from "express"
import { DateTime } from "luxon"

import { env } from "./config"
import { checkUnbudgetedTransactions } from "./controllers/checkUnbudgetedTransactions"
import { updateBillsBudgetLimit } from "./controllers/updateBillsBudgetLimit"
import { updateLeftoversBudget } from "./controllers/updateLeftoversBudget"
import { BudgetArray, BudgetsService, TransactionsService } from "./types"

const app = express()

app.listen(env.port, () => {
  console.log("Server is running on http://localhost:3000")
})

async function trigger(_req: express.Request, res: express.Response) {
  console.log("=========================================== Triggered ===========================================")
  // Get all budgets
  const startDate = DateTime.now().startOf("month").toISODate()
  const endDate = DateTime.now().endOf("month").toISODate()

  const raw = await BudgetsService.listBudget(null, 50, 1, startDate, endDate)
  const { data: budgets } = JSON.parse(raw as any) as BudgetArray
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

  // Check unbudgeted transactions
  if (env.discordWebhook) {
    await checkUnbudgetedTransactions(startDate, endDate)
  }

  if (res) {
    res.send(200)
  }

  console.log("=========================================== Finished ===========================================")
}

// At start trigger the endpoint
app.get("/", trigger)
app.post("/", trigger)
app.get("/transaction/:transactionId/budget/:budgetId", async (_req, res) => {
  console.log(
    "=========================================== Setting budget for transaction ===========================================",
  )

  console.log("Transaction ID", _req.params.transactionId)
  console.log("Budget ID", _req.params.budgetId)

  await TransactionsService.updateTransaction(_req.params.transactionId, {
    apply_rules: true,
    fire_webhooks: true,
    transactions: [
      {
        budget_id: _req.params.budgetId,
      },
    ],
  })
  res.send(200)
})

trigger(null, null)
