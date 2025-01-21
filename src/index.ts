import express from "express"
import { DateTime } from "luxon"

import { env } from "./config"
import { checkUnbudgetedTransactions, deleteDiscordMessage } from "./controllers/checkUnbudgetedTransactions"
import { updateBillsBudgetLimit } from "./controllers/updateBillsBudgetLimit"
import { updateLeftoversBudget } from "./controllers/updateLeftoversBudget"
import { BudgetsService, TransactionsService } from "./types"
import { sleep } from "./utils/sleep"

const app = express()

app.listen(env.port, () => {
  console.log("Server is running on http://localhost:3000")
})

async function trigger(_req: express.Request, res: express.Response) {
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

  // Check unbudgeted transactions
  if (env.discordWebhook) {
    await checkUnbudgetedTransactions(startDate, endDate)
  }

  if (res) {
    res.send("<script>window.close()</script>")
  }

  console.log("=========================================== Finished ===========================================")
}

// At start trigger the endpoint
app.get("/", trigger)
app.post("/", trigger)
app.get("/transaction/:transactionId/budget/:budgetId/:message", async (req, res) => {
  console.log(
    "=========================================== Setting budget for transaction ===========================================",
  )
  console.log("Delete message")
  await deleteDiscordMessage(req.params.message)
  console.log("Update transaction")
  try {
    TransactionsService.updateTransaction(req.params.transactionId, {
      apply_rules: true,
      fire_webhooks: true,
      transactions: [{ budget_id: req.params.budgetId }],
    })
  } catch (error) {
    console.log("Error updating transaction", error)
  }
  await sleep(500)
  console.log("Transaction updated")
  return trigger(req, res)
})

trigger(null, null)
