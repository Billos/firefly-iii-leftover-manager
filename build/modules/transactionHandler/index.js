"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionHandler = void 0;
const config_1 = require("../../config");
const discord_1 = require("./discord");
const gotify_1 = require("./gotify");
let transactionHandler;
if (config_1.env.discordWebhook) {
    exports.transactionHandler = transactionHandler = new discord_1.DiscordTransactionHandler();
}
else if (config_1.env.gotifyUrl && config_1.env.gotifyToken && config_1.env.gotifyUserToken) {
    exports.transactionHandler = transactionHandler = new gotify_1.GotifyTransactionHandler();
}
//# sourceMappingURL=index.js.map