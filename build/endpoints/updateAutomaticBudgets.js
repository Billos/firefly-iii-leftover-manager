"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAutomaticBudgets = updateAutomaticBudgets;
const queues_1 = require("../queues");
const updateAutomaticBudgets_1 = require("../queues/updateAutomaticBudgets");
async function updateAutomaticBudgets(_req, res) {
    // Get all budgets
    const queue = await (0, queues_1.getQueue)();
    queue.add(updateAutomaticBudgets_1.id, { job: updateAutomaticBudgets_1.id, transactionId: null }, { removeOnComplete: true, removeOnFail: true });
    if (res) {
        res.send("<script>window.close()</script>");
    }
}
//# sourceMappingURL=updateAutomaticBudgets.js.map