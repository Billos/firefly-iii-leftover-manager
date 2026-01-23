import pino from "pino"

import { env } from "../../config"
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
  // Get Leftovers Budget
  const leftoversBudget = budgets.find(({ attributes: { name } }) => name === env.leftoversBudget)

  // If leftovers budget is found
  if (leftoversBudget) {
    await updateLeftoversBudget(leftoversBudget, startDate, endDate)
  }
}

async function init() {
  await addJobToQueue(id)
}

export { job, init, id }
