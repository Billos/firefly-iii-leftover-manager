"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBillsBudgetLimit = updateBillsBudgetLimit;
const types_1 = require("../types");
async function getTotalAmountOfBills(startDate, endDate) {
    const allBills = await types_1.BillsService.listBill(null, 50, 1, startDate, endDate);
    // Filtering inactive bills
    const bills = allBills.data.filter(({ attributes }) => attributes.active);
    const paidBills = bills.filter(({ attributes: { paid_dates } }) => paid_dates.length > 0);
    const unpaidBills = bills
        .filter(({ attributes: { paid_dates } }) => paid_dates.length === 0)
        .filter(({ attributes: { next_expected_match } }) => !!next_expected_match);
    const maximumUnpaidBill = unpaidBills.reduce((acc, bill) => acc + parseFloat(bill.attributes.amount_max), 0);
    let paidBillsValue = 0;
    for (const bill of paidBills) {
        const { data: transactions } = await types_1.BillsService.listTransactionByBill(bill.id, null, 50, 1, startDate, endDate);
        for (const { attributes } of transactions) {
            for (const { amount } of attributes.transactions) {
                paidBillsValue += parseFloat(amount);
            }
        }
    }
    const total = paidBillsValue + maximumUnpaidBill;
    console.log("You have paid", paidBillsValue, "in bills");
    console.log("You have at most", maximumUnpaidBill, "in unpaid bills");
    console.log("Total bills value is at most", total);
    return total;
}
async function updateBillsBudgetLimit(billsBudget, startDate, endDate) {
    console.log("================ Updating Bills Budget Limit ================");
    const total = await getTotalAmountOfBills(startDate, endDate);
    const existingLimits = await types_1.BudgetsService.listBudgetLimitByBudget(billsBudget.id, null, startDate, endDate);
    if (existingLimits.data.length > 1) {
        throw new Error("There are more than one limit for the bills budget");
    }
    const params = {
        amount: total.toString(),
        budget_id: billsBudget.id,
        start: startDate,
        end: endDate,
        fire_webhooks: false,
    };
    if (existingLimits.data.length === 0) {
        console.log("There are no limits for the bills budget, creating budget limit");
        await types_1.BudgetsService.storeBudgetLimit(billsBudget.id, params);
        return;
    }
    if (existingLimits.data[0].attributes.amount === params.amount) {
        console.log("The bills budget limit is already up to date, no changes needed");
        return;
    }
    const [limit] = existingLimits.data;
    try {
        await types_1.BudgetsService.updateBudgetLimit(billsBudget.id, limit.id, params);
    }
    catch (error) {
        console.error("Error updating bills budget limit:", error);
    }
    console.log("Bills budget limit updated");
}
//# sourceMappingURL=updateBillsBudgetLimit.js.map