"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingCategoryForTransaction = settingCategoryForTransaction;
const transactionHandler_1 = require("../modules/transactionHandler");
const types_1 = require("../types");
const getTransactionShowLink_1 = require("../utils/getTransactionShowLink");
async function settingCategoryForTransaction(req, res) {
    console.log("=================================== Setting category for transaction ===================================");
    const { transactionId, category_id } = req.params;
    try {
        const messageId = await transactionHandler_1.transactionHandler.getMessageId("CategoryMessageId", transactionId);
        await transactionHandler_1.transactionHandler.deleteMessage("CategoryMessageId", messageId, transactionId);
    }
    catch (error) {
        // Could not delete message. Ignore
        console.log("Could not delete message", error);
        res.send("<script>window.close()</script>");
        return;
    }
    console.log("Update transaction");
    await types_1.TransactionsService.updateTransaction(transactionId, {
        apply_rules: true,
        fire_webhooks: false,
        transactions: [{ category_id }],
    });
    console.log("Transaction updated");
    // Redirect to the transaction link
    const transaction = await types_1.TransactionsService.getTransaction(transactionId);
    if (transaction) {
        console.log("Transaction found, redirecting to show link");
        return res.redirect((0, getTransactionShowLink_1.getTransactionShowLink)(transactionId));
    }
    else {
        res.send("<script>window.close()</script>");
    }
}
//# sourceMappingURL=settingCategoryForTransaction.js.map