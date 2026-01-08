"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTransactionHandler = void 0;
const types_1 = require("../../types");
class AbstractTransactionHandler {
    getTitle(type) {
        switch (type) {
            case "CategoryMessageId":
                return "Uncategorized Transaction";
            case "BudgetMessageId":
                return "Unbudgeted Transaction";
            default:
                throw new Error(`Unknown message type: ${type}`);
        }
    }
    async getTransaction(transactionId) {
        const { data: { attributes: { transactions: [transaction], }, }, } = await types_1.TransactionsService.getTransaction(transactionId);
        return transaction;
    }
    async getMessageId(type, transactionId) {
        const transaction = await this.getTransaction(transactionId);
        const regex = new RegExp(`${type}: (\\d+)`);
        const match = (transaction.notes || "").match(regex);
        if (match) {
            return match[1];
        }
        return null;
    }
    async notify(title, message) {
        await this.notifyImpl(title, message);
    }
    async setNotes(transactionId, notes) {
        await types_1.TransactionsService.updateTransaction(transactionId, { apply_rules: false, fire_webhooks: false, transactions: [{ notes }] });
    }
    async setMessageId(type, transactionId, messageId) {
        const transaction = await this.getTransaction(transactionId);
        // Notes might not include the HandlerMessageId yet
        let notes = transaction.notes || "";
        if (!notes.includes(type)) {
            notes += `\n${type}: ${messageId}\n`;
        }
        else {
            notes = (transaction.notes || "").replace(new RegExp(`${type}: (\\d+)`), `${type}: ${messageId}`);
        }
        await this.setNotes(transactionId, notes);
    }
    async unsetMessageId(type, transactionId) {
        const transaction = await this.getTransaction(transactionId);
        const notes = transaction.notes.replace(new RegExp(`${type}: (\\d+)`), "");
        await this.setNotes(transactionId, notes);
    }
    async sendMessage(type, content, transactionId) {
        const messageId = await this.sendMessageImpl(this.getTitle(type), content);
        await this.setMessageId(type, transactionId, messageId);
        return messageId;
    }
    async deleteMessage(type, id, transactionId) {
        try {
            await this.unsetMessageId(type, transactionId);
        }
        catch (error) {
            console.log(`Could not unset message ID for type ${type} and transaction ${transactionId}:`, error.message);
            return;
        }
        try {
            await this.deleteMessageImpl(id, transactionId);
        }
        catch (error) {
            console.log(`Could not delete message for type ${type} and transaction ${transactionId}:`, error.message);
        }
    }
    async deleteAllMessages() {
        await this.deleteAllMessagesImpl();
    }
}
exports.AbstractTransactionHandler = AbstractTransactionHandler;
//# sourceMappingURL=transactionHandler.js.map