import express from "express"

import { env } from "./config"
import { settingBudgetForTransaction } from "./endpoints/settingBudgetForTransaction"
import { updateAutomaticBudgets } from "./endpoints/updateAutomaticBudgets"
import { webhook } from "./endpoints/webhook"

const app = express()

app.listen(env.port, () => {
  console.log("Server is running on http://localhost:3000")
})

app.use(express.json())

// At start trigger the endpoint
app.get("/", updateAutomaticBudgets)
app.post("/", updateAutomaticBudgets)
app.get("/transaction/:transactionId/budget/:budget_id", settingBudgetForTransaction)
app.post("/transaction", webhook)

updateAutomaticBudgets(null, null)
