"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = void 0;
exports.job = job;
exports.init = init;
const config_1 = require("../config");
const transactionHandler_1 = require("../modules/transactionHandler");
const types_1 = require("../types");
const date_1 = require("../utils/date");
const getTransactionShowLink_1 = require("../utils/getTransactionShowLink");
const id = "uncategorized-transactions";
exports.id = id;
async function getUncategorizedTransactions(startDate, endDate) {
    const transactions = [];
    const { meta: { pagination: { total_pages }, }, } = await types_1.TransactionsService.listTransaction(null, 200, 1, startDate, endDate);
    for (let page = 1; page <= total_pages; page++) {
        const { data } = await types_1.TransactionsService.listTransaction(null, 200, page, startDate, endDate);
        const filteredData = data.filter((transaction) => !transaction.attributes.transactions[0].category_id &&
            transaction.attributes.transactions[0].type === types_1.TransactionTypeProperty.WITHDRAWAL);
        transactions.push(...filteredData);
    }
    return transactions;
}
function generateMarkdownApiCalls(categories, transactionId) {
    const ret = [];
    for (const { id, attributes } of categories) {
        ret.push(`[\`${attributes.name}\`](<${config_1.env.serviceUrl}transaction/${transactionId}/category/${id}>)`);
    }
    return ret;
}
async function job(transactionId) {
    console.log(`Creating a new message for uncategorized transaction with key ${transactionId}`);
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
    if (transaction.category_id) {
        console.log(`Transaction ${transactionId} already categorized`);
        return;
    }
    const { data: allCategories } = await types_1.CategoriesService.listCategory(null, 50, 1);
    const categories = allCategories.filter(({ attributes: { name } }) => !(config_1.env.billsBudget && name === config_1.env.billsBudget));
    const apis = generateMarkdownApiCalls(categories, transactionId);
    const link = `[Link](<${(0, getTransactionShowLink_1.getTransactionShowLink)(transactionId)}>)`;
    const msg = `\`${parseFloat(amount).toFixed(currency_decimal_places)} ${currency_symbol}\` ${description} \n${apis.join(" | ")} - ${link}`;
    const messageId = await transactionHandler_1.transactionHandler.getMessageId("CategoryMessageId", transactionId);
    if (!messageId) {
        await transactionHandler_1.transactionHandler.sendMessage("CategoryMessageId", msg, transactionId);
        // Trying not to delete the message here, as it might be needed for future reference
        // await transactionHandler.deleteMessage("CategoryMessageId", messageId, transactionId)
    }
}
async function init(queue) {
    if (transactionHandler_1.transactionHandler) {
        const startDate = (0, date_1.getDateNow)().startOf("month").toISODate();
        const endDate = (0, date_1.getDateNow)().toISODate();
        const uncategorizedTransactionsList = await getUncategorizedTransactions(startDate, endDate);
        for (const { id: transactionId } of uncategorizedTransactionsList) {
            console.log(`Adding uncategorized transaction with id ${transactionId}`);
            queue.add(transactionId, { job: id, transactionId: transactionId }, { removeOnComplete: true, removeOnFail: true });
        }
    }
}
//# sourceMappingURL=uncategorizedTransactions.js.map