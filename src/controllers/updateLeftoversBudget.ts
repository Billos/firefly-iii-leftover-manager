import { env } from "../config"
import { AccountsService, BudgetLimit, BudgetRead, BudgetsService } from "../types"

export async function updateLeftoversBudget(leftoversBudget: BudgetRead, startDate: string, endDate: string) {
  console.log("================ Updating Leftovers Budget Limit =================")

  const assetAccount = await AccountsService.getAccount(env.assetAccountId)
  if (!assetAccount) {
    console.log("Asset account not found")
    return
  }

  let leftoverAmount = Number.parseFloat(assetAccount.data.attributes.current_balance)

  const allLimits = await BudgetsService.listBudgetLimit(startDate, endDate)
  const limitsWithoutLeftovers = allLimits.data.filter(({ attributes: { budget_id } }) => budget_id !== leftoversBudget.id)
  const leftOverLimit = allLimits.data.find(({ attributes: { budget_id } }) => budget_id === leftoversBudget.id)

  for (const limit of limitsWithoutLeftovers) {
    leftoverAmount -= parseFloat(limit.attributes.amount)
  }

  if (leftoverAmount < 0) {
    console.log("Leftover amount is negative, not updating")
    return
  }

  console.log("Leftover amount", leftoverAmount)
  const params: BudgetLimit = {
    amount: leftoverAmount.toString(),
    budget_id: leftOverLimit.attributes.budget_id,
    start: leftOverLimit.attributes.start,
    end: leftOverLimit.attributes.end,
  }
  await BudgetsService.updateBudgetLimit(leftoversBudget.id, leftOverLimit.id, params)
  console.log("Leftovers budget limit updated")
}
