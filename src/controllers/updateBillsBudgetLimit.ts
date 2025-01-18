import {
  BillArray,
  BillsService,
  BudgetLimit,
  BudgetLimitArray,
  BudgetRead,
  BudgetsService,
  TransactionArray,
} from "../types"

export async function updateBillsBudgetLimit(billsBudget: BudgetRead, startDate: string, endDate: string) {
  console.log("================ Updating Bills Budget Limit ================")
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
