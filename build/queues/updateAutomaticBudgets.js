"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = void 0;
exports.job = job;
exports.init = init;
const config_1 = require("../config");
const linkPaypalTransactions_1 = require("../controllers/linkPaypalTransactions");
const reviewBudgetLimit_1 = require("../controllers/reviewBudgetLimit");
const updateBillsBudgetLimit_1 = require("../controllers/updateBillsBudgetLimit");
const updateLeftoversBudget_1 = require("../controllers/updateLeftoversBudget");
const types_1 = require("../types");
const date_1 = require("../utils/date");
const id = "update-automatic-budgets";
exports.id = id;
async function job() {
    console.log("Running updateAutomaticBudgets job");
    // Get all budgets
    const startDate = (0, date_1.getDateNow)().startOf("month").toISODate();
    const endDate = (0, date_1.getDateNow)().endOf("month").toISODate();
    const { data: budgets } = await types_1.BudgetsService.listBudget(null, 50, 1, startDate, endDate);
    // Get Bills Budget
    const billsBudget = budgets.find(({ attributes: { name } }) => name === config_1.env.billsBudget);
    // Get Leftovers Budget
    const leftoversBudget = budgets.find(({ attributes: { name } }) => name === config_1.env.leftoversBudget);
    // Get all other budgets
    const otherBudgets = budgets.filter(({ attributes: { name } }) => name !== config_1.env.billsBudget && name !== config_1.env.leftoversBudget);
    // Check if the budgets aren't underbudgeted
    // Not checking billsBudget, nor leftoversBudget
    for (const budget of otherBudgets) {
        await (0, reviewBudgetLimit_1.reviewBudgetLimit)(budget, startDate, endDate);
    }
    // If bills budget is found
    if (billsBudget) {
        await (0, updateBillsBudgetLimit_1.updateBillsBudgetLimit)(billsBudget, startDate, endDate);
    }
    // If leftovers budget is found
    if (leftoversBudget) {
        await (0, updateLeftoversBudget_1.updateLeftoversBudget)(leftoversBudget, startDate, endDate);
    }
    if (config_1.env.fireflyPaypalAccountToken) {
        await (0, linkPaypalTransactions_1.linkPaypalTransactions)();
    }
}
async function init(queue) {
    queue.add(id, { job: id, transactionId: null }, { removeOnComplete: true, removeOnFail: true });
}
//# sourceMappingURL=updateAutomaticBudgets.js.map