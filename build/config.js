"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const env = {
    port: process.env.PORT || 3000,
    fireflyUrl: process.env.FIREFLY_III_URL,
    fireflyToken: process.env.FIREFLY_III_TOKEN,
    fireflyPaypalAccountToken: process.env.FIREFLY_III_PAYPAL_ACCOUNT_TOKEN,
    assetAccountId: process.env.ASSET_ACCOUNT_ID,
    billsBudget: process.env.BILLS_BUDGET,
    leftoversBudget: process.env.LEFTOVERS_BUDGET,
    discordWebhook: process.env.DISCORD_WEBHOOK,
    gotifyUrl: process.env.GOTIFY_URL,
    gotifyApplicationId: process.env.GOTIFY_APPLICATION_ID,
    gotifyUserToken: process.env.GOTIFY_USER_TOKEN,
    gotifyToken: process.env.GOTIFY_TOKEN,
    serviceUrl: process.env.SERVICE_URL,
    redisConnection: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379", 10),
        db: parseInt(process.env.REDIS_DB || "0", 10),
        password: process.env.REDIS_PASSWORD,
    },
};
exports.env = env;
//# sourceMappingURL=config.js.map