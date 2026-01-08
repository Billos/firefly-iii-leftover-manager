"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordTransactionHandler = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
const transactionHandler_1 = require("./transactionHandler");
class DiscordTransactionHandler extends transactionHandler_1.AbstractTransactionHandler {
    request = axios_1.default.create({});
    constructor() {
        super();
    }
    async notifyImpl(_title, content) {
        await this.request.post(`${config_1.env.discordWebhook}?wait=true`, { content });
    }
    async sendMessageImpl(content) {
        const result = await this.request.post(`${config_1.env.discordWebhook}?wait=true`, { content });
        return `${result.data.id}`;
    }
    async deleteMessageImpl(id) {
        await this.request.delete(`${config_1.env.discordWebhook}/messages/${id}`);
    }
    async deleteAllMessagesImpl() {
        throw new Error("Bulk deletion of messages is not supported by Discord webhooks.");
    }
}
exports.DiscordTransactionHandler = DiscordTransactionHandler;
//# sourceMappingURL=discord.js.map