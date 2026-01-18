import express from "express"
import pino from "pino"

import { env } from "./config"
import { settingBudgetForTransaction } from "./endpoints/settingBudgetForTransaction"
import { settingCategoryForTransaction } from "./endpoints/settingCategoryForTransaction"
import { updateAutomaticBudgets } from "./endpoints/updateAutomaticBudgets"
import { webhook } from "./endpoints/webhook"
import { transactionHandler } from "./modules/transactionHandler"
import { ParseBodyMiddleware } from "./utils/middleware"
import { verifyWebhookMiddleware } from "./utils/webhookSecret"

const logger = pino()
const app = express()

app.use(ParseBodyMiddleware)

app.get("/", updateAutomaticBudgets)
app.post("/", updateAutomaticBudgets)
app.get("/transaction/:transactionId/budget/:budget_id", settingBudgetForTransaction)
app.get("/transaction/:transactionId/category/:category_id", settingCategoryForTransaction)
app.post("/transaction", verifyWebhookMiddleware, webhook)

async function startServer() {
  try {
    // Delete all messages at startup
    transactionHandler.deleteAllMessages()

    app.listen(env.port, () => {
      logger.info("Server is running on http://localhost:%s", env.port)
    })
  } catch (err) {
    logger.error({ err }, "Failed to start server:")
    process.exit(1)
  }
}

startServer()
