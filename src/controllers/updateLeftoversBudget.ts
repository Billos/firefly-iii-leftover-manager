import { BudgetLimit, BudgetLimitArray, BudgetRead, BudgetsService, InsightService } from "../types"

export async function updateLeftoversBudget(leftoversBudget: BudgetRead, startDate: string, endDate: string) {
  console.log("================ Updating Leftovers Budget Limit =================")

  const revenues = await InsightService.insightIncomeRevenue(startDate, endDate)
  const totalRevenue = revenues.reduce((acc, { difference_float }) => acc + difference_float, 0)
  let leftoverAmount = totalRevenue

  const allLimits = JSON.parse((await BudgetsService.listBudgetLimit(startDate, endDate)) as any) as BudgetLimitArray
  const limitsWithoutLeftovers = allLimits.data.filter(
    ({ attributes: { budget_id } }) => budget_id !== leftoversBudget.id,
  )
  const leftOverLimit = allLimits.data.find(({ attributes: { budget_id } }) => budget_id === leftoversBudget.id)

  for (const limit of limitsWithoutLeftovers) {
    leftoverAmount -= parseFloat(limit.attributes.amount)
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
