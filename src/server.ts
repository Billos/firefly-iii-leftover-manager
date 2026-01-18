import express from "express"

import { env } from "./config"
import { settingBudgetForTransaction } from "./endpoints/settingBudgetForTransaction"
import { settingCategoryForTransaction } from "./endpoints/settingCategoryForTransaction"
import { updateAutomaticBudgets } from "./endpoints/updateAutomaticBudgets"
import { webhook } from "./endpoints/webhook"
import { transactionHandler } from "./modules/transactionHandler"

const app = express()

app.use(express.json())

app.get("/", updateAutomaticBudgets)
app.post("/", updateAutomaticBudgets)
app.get("/transaction/:transactionId/budget/:budget_id", settingBudgetForTransaction)
app.get("/transaction/:transactionId/category/:category_id", settingCategoryForTransaction)
app.post("/transaction", webhook)

async function startServer() {
  try {
    // Delete all messages at startup
    transactionHandler.deleteAllMessages()

    app.listen(env.port, () => {
      console.log(`Server is running on http://localhost:${env.port}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
