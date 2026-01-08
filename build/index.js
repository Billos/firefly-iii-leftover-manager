"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const settingBudgetForTransaction_1 = require("./endpoints/settingBudgetForTransaction");
const settingCategoryForTransaction_1 = require("./endpoints/settingCategoryForTransaction");
const updateAutomaticBudgets_1 = require("./endpoints/updateAutomaticBudgets");
const webhook_1 = require("./endpoints/webhook");
const transactionHandler_1 = require("./modules/transactionHandler");
const queues_1 = require("./queues");
const app = (0, express_1.default)();
app.listen(config_1.env.port, () => {
    console.log("Server is running on http://localhost:3000");
});
app.use(express_1.default.json());
// At start trigger the endpoint
app.get("/", updateAutomaticBudgets_1.updateAutomaticBudgets);
app.post("/", updateAutomaticBudgets_1.updateAutomaticBudgets);
app.get("/transaction/:transactionId/budget/:budget_id", settingBudgetForTransaction_1.settingBudgetForTransaction);
app.get("/transaction/:transactionId/category/:category_id", settingCategoryForTransaction_1.settingCategoryForTransaction);
app.post("/transaction", webhook_1.webhook);
transactionHandler_1.transactionHandler.deleteAllMessages();
(0, queues_1.getQueue)();
//# sourceMappingURL=index.js.map