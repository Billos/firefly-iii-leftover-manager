import pino from "pino"

import { BillsService, BudgetLimitStore, BudgetRead, BudgetsService } from "../types"

const logger = pino()

async function getTotalAmountOfBills(startDate: string, endDate: string): Promise<number> {
  const allBills = await BillsService.listBill(null, 50, 1, startDate, endDate)
  // Filtering inactive bills
  const bills = allBills.data.filter(({ attributes }) => attributes.active)
  const paidBills = bills.filter(({ attributes: { paid_dates } }) => paid_dates.length > 0)
  const unpaidBills = bills
    .filter(({ attributes: { paid_dates } }) => paid_dates.length === 0)
    .filter(({ attributes: { next_expected_match } }) => !!next_expected_match)

  const maximumUnpaidBill = unpaidBills.reduce((acc, bill) => acc + parseFloat(bill.attributes.amount_max), 0)
  let paidBillsValue = 0
  for (const bill of paidBills) {
    const { data: transactions } = await BillsService.listTransactionByBill(bill.id, null, 50, 1, startDate, endDate)
    for (const { attributes } of transactions) {
      for (const { amount } of attributes.transactions) {
        paidBillsValue += parseFloat(amount)
      }
    }
  }
  const total = paidBillsValue + maximumUnpaidBill
  logger.info("You have paid %d in bills", paidBillsValue)
  logger.info("You have at most %d in unpaid bills", maximumUnpaidBill)
  logger.info("Total bills value is at most %d", total)
  return total
}

export async function updateBillsBudgetLimit(billsBudget: BudgetRead, startDate: string, endDate: string) {
  logger.info("================ Updating Bills Budget Limit ================")
  const total = await getTotalAmountOfBills(startDate, endDate)

  const existingLimits = await BudgetsService.listBudgetLimitByBudget(billsBudget.id, null, startDate, endDate)

  if (existingLimits.data.length > 1) {
    throw new Error("There are more than one limit for the bills budget")
  }

  const params: BudgetLimitStore = {
    amount: total.toString(),
    budget_id: billsBudget.id,
    start: startDate,
    end: endDate,
    fire_webhooks: false,
  }

  if (existingLimits.data.length === 0) {
    logger.info("There are no limits for the bills budget, creating budget limit")
    await BudgetsService.storeBudgetLimit(billsBudget.id, params)
    return
  }

  if (existingLimits.data[0].attributes.amount === params.amount) {
    logger.info("The bills budget limit is already up to date, no changes needed")
    return
  }

  const [limit] = existingLimits.data
  try {
    await BudgetsService.updateBudgetLimit(billsBudget.id, limit.id, params)
  } catch (err) {
    logger.error({ err }, "Error updating bills budget limit:")
  }
  logger.info("Bills budget limit updated")
}
