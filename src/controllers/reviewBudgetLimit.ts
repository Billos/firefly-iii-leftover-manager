import { transactionHandler } from "../modules/transactionHandler"
import { BudgetLimitStore, BudgetRead, BudgetsService } from "../types"

export async function reviewBudgetLimit(budget: BudgetRead, start: string, end: string) {
  console.log(`================= Reviewing budget limit for ${budget.attributes.name} =================`)
  const spent = -parseFloat(budget.attributes.spent[0]?.sum || "0")
  const currencySymbol = budget.attributes.currency_code === "EUR" ? "€" : "$"

  const {
    data: [existingLimits],
  } = await BudgetsService.listBudgetLimitByBudget(budget.id, null, start, end)

  const limit = parseFloat(existingLimits?.attributes.amount) || 0

  if (spent > limit) {
    console.log(`Budget is overspent! Spent: ${spent}, Limit: ${limit}`)
    // Setting the limit to spent and sending a notification
    const params: BudgetLimitStore = { amount: spent.toString(), budget_id: budget.id, start, end }

    if (!existingLimits) {
      console.log("No existing limits found, creating a new one")
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

  console.log(`Budget is within limit. Spent: ${spent}, Limit: ${limit}`)
}
