import pino from "pino"

import { env } from "../../config"
import { updateBillsBudgetLimit } from "../../controllers/updateBillsBudgetLimit"
import { updateLeftoversBudget } from "../../controllers/updateLeftoversBudget"
import { BudgetsService } from "../../types"
import { getDateNow } from "../../utils/date"
import { JobIds } from "../constants"
import { addJobToQueue } from "../jobs"

const id = JobIds.UPDATE_AUTOMATIC_BUDGETS

const logger = pino()
async function job() {
  logger.info("Running updateAutomaticBudgets job")
  // Get all budgets
  const startDate = getDateNow().startOf("month").toISODate()
  const endDate = getDateNow().endOf("month").toISODate()

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
}

async function init() {
  await addJobToQueue(id)
}

export { job, init, id }
