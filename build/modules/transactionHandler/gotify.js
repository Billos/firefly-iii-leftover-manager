"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GotifyTransactionHandler = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
const transactionHandler_1 = require("./transactionHandler");
class GotifyTransactionHandler extends transactionHandler_1.AbstractTransactionHandler {
    request = axios_1.default.create({ baseURL: config_1.env.gotifyUrl, headers: { "X-Gotify-Key": config_1.env.gotifyToken } });
    constructor() {
        super();
    }
    async notifyImpl(title, message) {
        await this.request.post("/message", { title, message, extras: { "client::display": { contentType: "text/markdown" } } });
    }
    async sendMessageImpl(title, message) {
        const result = await this.request.post("/message", {
            title,
            message,
            extras: { "client::display": { contentType: "text/markdown" } },
        });
        return `${result.data.id}`;
    }
    async deleteMessageImpl(id) {
        await this.request.delete(`/message/${id}?token=${config_1.env.gotifyUserToken}`);
    }
    async deleteAllMessagesImpl() {
        await this.request.delete(`/application/${config_1.env.gotifyApplicationId}/message?token=${config_1.env.gotifyUserToken}`);
    }
}
exports.GotifyTransactionHandler = GotifyTransactionHandler;
//# sourceMappingURL=gotify.js.map