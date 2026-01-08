"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = void 0;
exports.job = job;
exports.init = init;
const config_1 = require("../config");
const transactionHandler_1 = require("../modules/transactionHandler");
const types_1 = require("../types");
const getTransactionShowLink_1 = require("../utils/getTransactionShowLink");
const id = "unbudgeted-transactions";
exports.id = id;
function generateMarkdownApiCalls(budgets, transactionId) {
    const ret = [];
    for (const { id, attributes } of budgets) {
        ret.push(`[\`${attributes.name}\`](<${config_1.env.serviceUrl}transaction/${transactionId}/budget/${id}>)`);
    }
    return ret;
}
async function job(transactionId) {
    console.log(`Creating a new message for unbudgeted transaction with key ${transactionId}`);
    const { data: { attributes: { transactions: [transaction], }, }, } = await types_1.TransactionsService.getTransaction(transactionId);
    // Ensure the transaction is a withdrawal
    const { type, amount, currency_decimal_places, currency_symbol, description } = transaction;
    if (type !== types_1.TransactionTypeProperty.WITHDRAWAL) {
        console.log(`Transaction ${transactionId} is not a withdrawal`);
        return;
    }
    if (!transaction) {
        console.log(`Transaction ${transactionId} not found`);
        return;
    }
    if (transaction.budget_id) {
        console.log(`Transaction ${transactionId} already budgeted`);
        return;
    }
    const { data: allBudgets } = await types_1.BudgetsService.listBudget(null, 50, 1);
    const budgets = allBudgets.filter(({ attributes: { name } }) => !(config_1.env.billsBudget && name === config_1.env.billsBudget));
    const apis = generateMarkdownApiCalls(budgets, transactionId);
    const link = `[Link](<${(0, getTransactionShowLink_1.getTransactionShowLink)(transactionId)}>)`;
    const msg = `\`${parseFloat(amount).toFixed(currency_decimal_places)} ${currency_symbol}\` ${description} \n${apis.join(" | ")} - ${link}`;
    const messageId = await transactionHandler_1.transactionHandler.getMessageId("BudgetMessageId", transactionId);
    if (!messageId) {
        await transactionHandler_1.transactionHandler.sendMessage("BudgetMessageId", msg, transactionId);
        // Trying not to delete the message here, as it might be needed for future reference
        // await transactionHandler.deleteMessage("BudgetMessageId", messageId, transactionId)
    }
}
async function init(queue) {
    if (transactionHandler_1.transactionHandler) {
        const { data } = await types_1.BudgetsService.listTransactionWithoutBudget(null, 50, 1);
        for (const { id: transactionId } of data) {
            console.log(`Adding unbudgeted transaction with id ${transactionId}`);
            queue.add(transactionId, { job: id, transactionId }, { removeOnComplete: true, removeOnFail: true });
            setTimeout(async () => {
                queue.add(transactionId, { job: id, transactionId }, { removeOnComplete: true, removeOnFail: true });
            }, 8000);
        }
    }
}
//# sourceMappingURL=unbudgetedTransactions.js.map