"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewBudgetLimit = reviewBudgetLimit;
const transactionHandler_1 = require("../modules/transactionHandler");
const types_1 = require("../types");
async function reviewBudgetLimit(budget, start, end) {
    console.log(`================= Reviewing budget limit for ${budget.attributes.name} =================`);
    const spent = -parseFloat(budget.attributes.spent[0]?.sum || "0");
    const currencySymbol = budget.attributes.currency_code === "EUR" ? "€" : "$";
    const { data: [existingLimits], } = await types_1.BudgetsService.listBudgetLimitByBudget(budget.id, null, start, end);
    const limit = parseFloat(existingLimits?.attributes.amount) || 0;
    if (spent > limit) {
        console.log(`Budget is overspent! Spent: ${spent}, Limit: ${limit}`);
        // Setting the limit to spent and sending a notification
        const params = { amount: spent.toString(), budget_id: budget.id, start, end, fire_webhooks: false };
        if (!existingLimits) {
            console.log("No existing limits found, creating a new one");
            await types_1.BudgetsService.storeBudgetLimit(budget.id, params);
        }
        else {
            await types_1.BudgetsService.updateBudgetLimit(budget.id, existingLimits.id, params);
        }
        const title = "Warning";
        const message = `Budget **${budget.attributes.name}** is overspent!
    \nSpent: \`${spent} ${currencySymbol}\` 
    \nLimit: \`${limit} ${currencySymbol}\` 
    \nNew limit set to \`${spent} ${currencySymbol}\``;
        await transactionHandler_1.transactionHandler.notify(title, message);
        return;
    }
    console.log(`Budget is within limit. Spent: ${spent}, Limit: ${limit}`);
}
//# sourceMappingURL=reviewBudgetLimit.js.map