import { Request, Response } from "express"
import { DateTime } from "luxon"

import { env } from "../config"
import { linkPaypalTransactions } from "../controllers/linkPaypalTransactions"
import { updateBillsBudgetLimit } from "../controllers/updateBillsBudgetLimit"
import { updateLeftoversBudget } from "../controllers/updateLeftoversBudget"
import { BudgetsService } from "../types"

export async function updateAutomaticBudgets(_req: Request, res: Response) {
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

  if (env.fireflyPaypalAccountToken) {
    await linkPaypalTransactions()
  }

  if (res) {
    res.send("<script>window.close()</script>")
  }

  console.log("=========================================== Finished ===========================================")
}
