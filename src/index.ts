import express from "express"
import { DateTime } from "luxon"

import { env } from "./config"
import {
  BillArray,
  BillsService,
  BudgetArray,
  BudgetLimit,
  BudgetLimitArray,
  BudgetsService,
  InsightService,
  TransactionArray,
} from "./types"

const app = express()

app.listen(env.port, () => {
  console.log("Server is running on http://localhost:3000")
})

async function trigger(_req: express.Request, res: express.Response) {
  // Get all budgets
  const startDate = DateTime.now().startOf("month").toISODate()
  const endDate = DateTime.now().endOf("month").toISODate()

  const raw = await BudgetsService.listBudget(null, 50, 1, startDate, endDate)
  const { data: budgets } = JSON.parse(raw as any) as BudgetArray
  // Get Bills Budget
  const billsBudget = budgets.find(({ attributes: { name } }) => name === env.billsBudget)
  // Get Leftovers Budget
  const leftoversBudget = budgets.find(({ attributes: { name } }) => name === env.leftoversBudget)

  // If bills budget is found
  if (billsBudget) {
    // Updating Bills auto_budget_amount to be the sum of all paid bills value + the maximum value of the unpaid bills
    const bills = JSON.parse((await BillsService.listBill(null, 50, 1, startDate, endDate)) as any) as BillArray
    const paidBills = bills.data.filter(({ attributes: { paid_dates } }) => paid_dates.length > 0)
    const unpaidBills = bills.data.filter(({ attributes: { paid_dates } }) => paid_dates.length === 0)

    const maximumUnpaidBill = unpaidBills.reduce((acc, bill) => acc + parseFloat(bill.attributes.amount_max), 0)
    let paidBillsValue = 0
    for (const bill of paidBills) {
      const { data: transactions } = JSON.parse(
        (await BillsService.listTransactionByBill(bill.id, null, 50, 1, startDate, endDate)) as any,
      ) as TransactionArray
      for (const { attributes } of transactions) {
        for (const { amount } of attributes.transactions) {
          paidBillsValue += parseFloat(amount)
        }
      }
    }
    const total = paidBillsValue + maximumUnpaidBill
    console.log("You have paid", paidBillsValue, "in bills")
    console.log("You have at most", maximumUnpaidBill, "in unpaid bills")
    console.log("Total bills value is at most", total)

    const existingLimits = JSON.parse(
      (await BudgetsService.listBudgetLimitByBudget(billsBudget.id, null, startDate, endDate)) as any,
    ) as BudgetLimitArray

    if (existingLimits.data.length > 1) {
      throw new Error("There are more than one limit for the bills budget")
    }

    if (existingLimits.data.length === 0) {
      throw new Error("There are no limit for the bills budget")
    }

    const [limit] = existingLimits.data
    const params: BudgetLimit = {
      amount: total.toString(),
      budget_id: limit.attributes.budget_id,
      start: limit.attributes.start,
      end: limit.attributes.end,
    }
    await BudgetsService.updateBudgetLimit(billsBudget.id, limit.id, params)
    console.log("Bills budget limit updated")
  }

  // If leftovers budget is found
  if (leftoversBudget) {
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

  if (res) {
    res.send(200)
  }
}

// At start trigger the endpoint
app.get("/", trigger)
app.post("/", trigger)
