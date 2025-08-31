import { env } from "../config"
import { AccountsService, BudgetLimitStore, BudgetRead, BudgetsService, InsightGroup, InsightService } from "../types"

export async function updateLeftoversBudget(leftoversBudget: BudgetRead, startDate: string, endDate: string) {
  console.log("================ Updating Leftovers Budget Limit =================")

  const assetAccount = await AccountsService.getAccount(env.assetAccountId)
  if (!assetAccount) {
    console.log("Asset account not found")
    return
  }

  let leftoverAmount = Number.parseFloat(assetAccount.data.attributes.current_balance)
  console.log("Current balance", leftoverAmount)

  const allLimits = await BudgetsService.listBudgetLimit(startDate, endDate)
  const limitsWithoutLeftovers = allLimits.data.filter(({ attributes: { budget_id } }) => budget_id !== leftoversBudget.id)
  const leftOverLimit = allLimits.data.find(({ attributes: { budget_id } }) => budget_id === leftoversBudget.id)
  const budgetsIds = limitsWithoutLeftovers.map(({ attributes: { budget_id } }) => Number(budget_id))

  const insightsRaw = await InsightService.insightExpenseBudget(startDate, endDate, null, budgetsIds)
  const insights: Record<number, InsightGroup> = insightsRaw.reduce((acc, insight) => ({ ...acc, [Number(insight.id)]: insight }), {})

  for (const limit of limitsWithoutLeftovers) {
    const {
      // attributes: { spent, budget_id, amount },
      attributes: { budget_id, amount },
    } = limit
    const insight = insights[Number(budget_id)]

    let spentValue = "0"
    const budget = await BudgetsService.getBudget(budget_id)
    const { name } = budget.data.attributes

    if (insight && insight[0]) {
      spentValue = insight[0].difference
    }

    // const { data: budget } = await BudgetsService.getBudget(budget_id)
    // const spentValue = spent[0].sum || "0"
    // const name = budget.attributes.name
    const budgetLeftover = parseFloat(amount) + parseFloat(spentValue)
    console.log(`Subtracting ${name} - limit of ${amount} - spent ${spentValue} - Budget leftover ${budgetLeftover}`)
    // A budget leftover might be negative, if the budget is overspent, this means it will be added to the leftover amount
    leftoverAmount -= Math.abs(budgetLeftover)
  }

  if (leftoverAmount < 0) {
    console.log("Leftover amount is negative, setting to 0.1")
    leftoverAmount = 0.1
  }

  const currentLeftOverBudget = await BudgetsService.getBudget(leftoversBudget.id, null, startDate, endDate)
  const [spent] = currentLeftOverBudget.data.attributes.spent

  if (!spent) {
    console.log("No spent amount found, setting it to 0")
  }
  const sum = spent?.sum || "0"

  const amount = `${-parseFloat(sum) + leftoverAmount}`

  console.log("Leftover amount", leftoverAmount)
  console.log("Leftover spent", sum)
  console.log("Budget limit should be", amount)

  if (parseFloat(amount) < 0) {
    console.log("Amount is negative, stopping")
    return
  }

  const params: BudgetLimitStore = { amount, budget_id: leftoversBudget.id, start: startDate, end: endDate }

  if (!leftOverLimit) {
    console.log("No leftovers budget limit found, creating budget limit")
    await BudgetsService.storeBudgetLimit(leftoversBudget.id, params)
    return
  }
  await BudgetsService.updateBudgetLimit(leftoversBudget.id, leftOverLimit.id, params)
  console.log("Leftovers budget limit updated")
}
