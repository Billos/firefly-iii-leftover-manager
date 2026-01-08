"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class SummaryService {
    /**
     * Returns basic sums of the users data.
     * Returns basic sums of the users data, like the net worth, spent and earned amounts. It is multi-currency, and is used in Firefly III to populate the dashboard.
     *
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param currencyCode A currency code like EUR or USD, to filter the result.
     *
     * @returns BasicSummary An array of sums. It depends on the user what you can expect to get back, so please try this out on the demo site.
     * @throws ApiError
     */
    static getBasicSummary(start, end, xTraceId, currencyCode) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/summary/basic',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'start': start,
                'end': end,
                'currency_code': currencyCode,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthenticated`,
                404: `Page not found`,
                500: `Internal exception`,
            },
        });
    }
}
exports.SummaryService = SummaryService;
//# sourceMappingURL=SummaryService.js.map