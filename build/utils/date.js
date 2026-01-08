"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateNow = getDateNow;
const luxon_1 = require("luxon");
function getDateNow() {
    // Returns the current date in ISO format without time
    const date = luxon_1.DateTime.now();
    if (process.env.TZ) {
        // If a timezone is set, return the date in that timezone
        date.setZone(process.env.TZ);
    }
    console.log("Current time is ", date.toISO());
    return date;
}
//# sourceMappingURL=date.js.map