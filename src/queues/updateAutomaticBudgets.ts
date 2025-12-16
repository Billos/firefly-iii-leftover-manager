import { Queue } from "bullmq"

import { env } from "../config"
import { linkPaypalTransactions } from "../controllers/linkPaypalTransactions"
import { reviewBudgetLimit } from "../controllers/reviewBudgetLimit"
import { updateBillsBudgetLimit } from "../controllers/updateBillsBudgetLimit"
import { updateLeftoversBudget } from "../controllers/updateLeftoversBudget"
import { BudgetsService } from "../types"
import { getDateNow } from "../utils/date"
import { QueueArgs } from "./queueArgs"

const id = "update-automatic-budgets"

async function job() {
  console.log("Running updateAutomaticBudgets job")
  // Get all budgets
  const startDate = getDateNow().startOf("month").toISODate()
  const endDate = getDateNow().endOf("month").toISODate()

  const { data: budgets } = await BudgetsService.listBudget(null, 50, 1, startDate, endDate)
  // Get Bills Budget
  const billsBudget = budgets.find(({ attributes: { name } }) => name === env.billsBudget)
  // Get Leftovers Budget
  const leftoversBudget = budgets.find(({ attributes: { name } }) => name === env.leftoversBudget)

  // Get all other budgets
  const otherBudgets = budgets.filter(({ attributes: { name } }) => name !== env.billsBudget && name !== env.leftoversBudget)

  // Check if the budgets aren't underbudgeted
  // Not checking billsBudget, nor leftoversBudget
  for (const budget of otherBudgets) {
    await reviewBudgetLimit(budget, startDate, endDate)
  }

  // If bills budget is found
  if (billsBudget) {
    await updateBillsBudgetLimit(billsBudget, startDate, endDate)
  }

  // If leftovers budget is found
  if (leftoversBudget) {
    await updateLeftoversBudget(leftoversBudget, startDate, endDate)
  }

  if (env.fireflyPaypalAccountToken) {
    await linkPaypalTransactions()
  }
}

async function init(queue: Queue<QueueArgs>) {
  queue.add(id, { job: id, transactionId: null }, { removeOnComplete: true, removeOnFail: true })
}

export { job, init, id }
