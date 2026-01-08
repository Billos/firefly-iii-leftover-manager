"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.queues = void 0;
exports.getQueue = getQueue;
const bullmq_1 = require("bullmq");
const config_1 = require("../config");
const transactionHandler_1 = require("../modules/transactionHandler");
const UnbudgetedTransactions = __importStar(require("./unbudgetedTransactions"));
const UncategorizedTransactions = __importStar(require("./uncategorizedTransactions"));
const UpdateAutomaticBudgets = __importStar(require("./updateAutomaticBudgets"));
const jobDefinitions = [
    UnbudgetedTransactions,
    UncategorizedTransactions,
    UpdateAutomaticBudgets,
];
exports.queues = jobDefinitions;
let queue = null;
async function getQueue() {
    if (queue) {
        return queue;
    }
    queue = new bullmq_1.Queue("manager", { connection: config_1.env.redisConnection });
    queue.setGlobalConcurrency(1);
    await queue.pause();
    await queue.clean(200, 0, "active");
    await queue.obliterate({ force: true });
    const jobs = {};
    const worker = new bullmq_1.Worker("manager", async ({ data: { job, transactionId } }) => jobs[job](transactionId), {
        connection: config_1.env.redisConnection,
        concurrency: 1,
        removeOnComplete: { count: 5000 },
        removeOnFail: { count: 5000 },
    });
    worker.on("failed", (job, err) => {
        console.error(`Job ${job.id} failed with error ${err.message}`);
        transactionHandler_1.transactionHandler.sendMessageImpl("Job Failed", `Job ${job.id} failed with error ${err.message} and data ${JSON.stringify(job.data)}`);
    });
    for (const { job, id, init } of jobDefinitions) {
        jobs[id] = job;
        if (init) {
            await init(queue);
        }
    }
    return queue;
}
async function processExit() {
    if (queue) {
        await queue.clean(200, 0, "active");
    }
}
process.on("SIGTERM", processExit);
process.on("SIGINT", processExit);
//# sourceMappingURL=index.js.map