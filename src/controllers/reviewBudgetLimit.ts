import pino from "pino"

import { transactionHandler } from "../modules/transactionHandler"
import { BudgetLimitStore, BudgetRead, BudgetsService } from "../types"

const logger = pino()

export async function reviewBudgetLimit(budget: BudgetRead, start: string, end: string) {
  logger.info("================= Reviewing budget limit for %s =================", budget.attributes.name)
  const spent = -parseFloat(budget.attributes.spent[0]?.sum || "0")
  const currencySymbol = budget.attributes.currency_code === "EUR" ? "€" : "$"

  const {
    data: [existingLimits],
  } = await BudgetsService.listBudgetLimitByBudget(budget.id, null, start, end)

  const limit = parseFloat(existingLimits?.attributes.amount) || 0

  if (spent > limit) {
    logger.info("Budget is overspent! Spent: %d, Limit: %d", spent, limit)
    // Setting the limit to spent and sending a notification
    const params: BudgetLimitStore = { amount: spent.toString(), budget_id: budget.id, start, end, fire_webhooks: false }

    if (!existingLimits) {
      logger.info("No existing limits found, creating a new one")
      await BudgetsService.storeBudgetLimit(budget.id, params)
    } else {
      await BudgetsService.updateBudgetLimit(budget.id, existingLimits.id, params)
    }

    const title = "Warning"
    const message = `Budget **${budget.attributes.name}** is overspent!
    \nSpent: \`${spent} ${currencySymbol}\` 
    \nLimit: \`${limit} ${currencySymbol}\` 
    \nNew limit set to \`${spent} ${currencySymbol}\``
    await transactionHandler.notify(title, message)
    return
  }

  logger.info("Budget is within limit. Spent: %d, Limit: %d", spent, limit)
}
