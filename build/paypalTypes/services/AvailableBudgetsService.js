"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableBudgetsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class AvailableBudgetsService {
    /**
     * List all available budget amounts.
     * Firefly III calculates the total amount of money budgeted in so-called "available budgets". This endpoint returns all of these amounts and the periods for which they are calculated.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @returns AvailableBudgetArray A list of available budget amounts.
     * @throws ApiError
     */
    static listAvailableBudgets(xTraceId, limit, page, start, end) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/available-budgets',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'limit': limit,
                'page': page,
                'start': start,
                'end': end,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthenticated`,
                404: `Page not found`,
                500: `Internal exception`,
            },
        });
    }
    /**
     * Get a single available budget.
     * Get a single available budget, by ID.
     * @param id The ID of the available budget.
     * @param xTraceId Unique identifier associated with this request.
     * @returns AvailableBudgetSingle The requested available budget
     * @throws ApiError
     */
    static getAvailableBudget(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/available-budgets/{id}',
            path: {
                'id': id,
            },
            headers: {
                'X-Trace-Id': xTraceId,
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
exports.AvailableBudgetsService = AvailableBudgetsService;
//# sourceMappingURL=AvailableBudgetsService.js.map