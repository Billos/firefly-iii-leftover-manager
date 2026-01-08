"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionShowLink = getTransactionShowLink;
const config_1 = require("../config");
function getTransactionShowLink(transactionId) {
    return `${config_1.env.fireflyUrl}/transactions/show/${transactionId}`;
}
//# sourceMappingURL=getTransactionShowLink.js.map