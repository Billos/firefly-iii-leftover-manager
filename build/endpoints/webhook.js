"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = webhook;
const queues_1 = require("../queues");
const types_1 = require("../types");
async function webhook(req, res) {
    console.log("=================================== Transaction webhook ===================================");
    // Print raw request
    const body = req.body;
    // Only process transaction-related webhooks
    const transactionTriggers = [
        types_1.WebhookTrigger.STORE_TRANSACTION,
        types_1.WebhookTrigger.UPDATE_TRANSACTION,
        types_1.WebhookTrigger.DESTROY_TRANSACTION,
    ];
    if (!transactionTriggers.includes(body.trigger)) {
        console.log(`Ignoring non-transaction webhook trigger: ${body.trigger}`);
        res.send("<script>window.close()</script>");
        return;
    }
    // Check unbudgeted transactions
    const queue = await (0, queues_1.getQueue)();
    for (const { id } of queues_1.queues) {
        queue.add(id, { job: id, transactionId: `${body.content.id}` }, { removeOnComplete: true, removeOnFail: true });
    }
    res.send("<script>window.close()</script>");
}
//# sourceMappingURL=webhook.js.map