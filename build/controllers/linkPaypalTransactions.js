"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkPaypalTransactions = linkPaypalTransactions;
const luxon_1 = require("luxon");
const paypalTypes_1 = require("../paypalTypes");
const types_1 = require("../types");
const date_1 = require("../utils/date");
async function linkPaypalTransactions() {
    console.log("================ Link Paypal Transactions =================");
    // StartDate and EndDate are today - 20 days to today
    const startDate = (0, date_1.getDateNow)().minus({ days: 20 }).toISODate();
    const endDate = (0, date_1.getDateNow)().toISODate();
    // This function will retrieve the Paypal transactions that do not have the tag "Linked"
    const { data } = await paypalTypes_1.TransactionsService.listTransaction(null, 50, 1, startDate, endDate);
    const unlinkedPaypalTransactions = data.filter(({ attributes: { transactions } }) => !transactions[0].tags.includes("Linked") && transactions[0].type === paypalTypes_1.TransactionTypeProperty.WITHDRAWAL);
    const { data: ffData } = await types_1.TransactionsService.listTransaction(null, 50, 1, startDate, endDate);
    // Filtering Firefly III transactions to only include those that do not have the tag "Linked" and have "PayPal" in the description
    const unlinkedFFTransactions = ffData.filter(({ attributes: { transactions } }) => !transactions[0].tags.includes("Linked") && transactions[0].description.includes("PAYPAL"));
    console.log("Found Unlinked Paypal transactions", unlinkedPaypalTransactions.length);
    console.log("Found Unlinked Firefly III transactions", unlinkedFFTransactions.length);
    for (const paypalTransaction of unlinkedPaypalTransactions) {
        const [transaction] = paypalTransaction.attributes.transactions;
        // It will retrieve the transactions that do not have the tag "Linked"
        if (transaction.tags.includes("Linked")) {
            continue;
        }
        console.log(`Checking unlinked Paypal transaction ${paypalTransaction.id} - type: ${transaction.type} - ${transaction.amount}`);
        // Getting the transactions from Firefly III each time to avoid having outdated data
        // Then it will try to find match the transaction with the Paypal transaction
        for (const { id, attributes: { transactions: [ffTransaction], }, } of unlinkedFFTransactions) {
            //  - Amount should match
            if (ffTransaction.amount !== transaction.amount) {
                continue;
            }
            // Date difference should be less than 5 days
            const ffTransactionDate = luxon_1.DateTime.fromISO(ffTransaction.date);
            const paypalTransactionDate = luxon_1.DateTime.fromISO(transaction.date);
            if (ffTransactionDate.diff(paypalTransactionDate, "days").days > 5) {
                continue;
            }
            // Add Linked tag to both transactions
            // Add the destination_name of the Paypal transaction to the Firefly III transaction Notes
            console.log(`Linking paypal ${transaction.destination_name} to Firefly III ${ffTransaction.description}`);
            await paypalTypes_1.TransactionsService.updateTransaction(paypalTransaction.id, {
                apply_rules: false,
                fire_webhooks: false,
                transactions: [{ tags: [...transaction.tags, "Linked"] }],
            });
            await types_1.TransactionsService.updateTransaction(id, {
                apply_rules: true,
                fire_webhooks: false,
                transactions: [{ tags: [...ffTransaction.tags, "Linked"], notes: transaction.destination_name }],
            });
        }
    }
}
//# sourceMappingURL=linkPaypalTransactions.js.map