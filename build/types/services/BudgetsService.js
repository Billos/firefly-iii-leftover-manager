"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class BudgetsService {
    /**
     * List all transactions by a budget limit ID.
     * List all the transactions within one budget limit. The start and end date are dictated by the budget limit.
     * @param id The ID of the budget. The budget limit MUST be associated to the budget ID.
     * @param limitId The ID of the budget limit. The budget limit MUST be associated to the budget ID.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param type Optional filter on the transaction type(s) returned
     * @returns TransactionArray A list of transactions.
     * @throws ApiError
     */
    static listTransactionByBudgetLimit(id, limitId, xTraceId, limit, page, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/budgets/{id}/limits/{limitId}/transactions',
            path: {
                'id': id,
                'limitId': limitId,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'limit': limit,
                'page': page,
                'type': type,
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
     * Get all limits for a budget.
     * Get all budget limits for this budget and the money spent, and money left. You can limit the list by submitting a date range as well. The "spent" array for each budget limit is NOT influenced by the start and end date of your query, but by the start and end date of the budget limit itself.
     *
     * @param id The ID of the requested budget.
     * @param xTraceId Unique identifier associated with this request.
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @returns BudgetLimitArray A list of budget limits applicable to this budget.
     * @throws ApiError
     */
    static listBudgetLimitByBudget(id, xTraceId, start, end) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/budgets/{id}/limits',
            path: {
                'id': id,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
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
     * Store new budget limit.
     * Store a new budget limit under this budget.
     * @param id The ID of the budget.
     * @param requestBody JSON array or key=value pairs with the necessary budget information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns BudgetLimitSingle New budget limit stored, result in response.
     * @throws ApiError
     */
    static storeBudgetLimit(id, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/budgets/{id}/limits',
            path: {
                'id': id,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthenticated`,
                404: `Page not found`,
                422: `Validation error. The body will have the exact details.`,
                500: `Internal exception`,
            },
        });
    }
    /**
     * Get single budget limit.
     * @param id The ID of the budget. The budget limit MUST be associated to the budget ID.
     * @param limitId The ID of the budget limit. The budget limit MUST be associated to the budget ID.
     * @param xTraceId Unique identifier associated with this request.
     * @returns BudgetLimitSingle The requested budget limit
     * @throws ApiError
     */
    static getBudgetLimit(id, limitId, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/budgets/{id}/limits/{limitId}',
            path: {
                'id': id,
                'limitId': limitId,
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
    /**
     * Update existing budget limit.
     * Update existing budget limit.
     * @param id The ID of the budget. The budget limit MUST be associated to the budget ID.
     * @param limitId The ID of the budget limit. The budget limit MUST be associated to the budget ID.
     * @param requestBody JSON array with updated budget limit information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns BudgetLimitSingle Updated budget limit stored, result in response
     * @throws ApiError
     */
    static updateBudgetLimit(id, limitId, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/budgets/{id}/limits/{limitId}',
            path: {
                'id': id,
                'limitId': limitId,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthenticated`,
                404: `Page not found`,
                422: `Validation error. The body will have the exact details.`,
                500: `Internal exception`,
            },
        });
    }
    /**
     * Delete a budget limit.
     * Delete a budget limit.
     * @param id The ID of the budget. The budget limit MUST be associated to the budget ID.
     * @param limitId The ID of the budget limit. The budget limit MUST be associated to the budget ID.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteBudgetLimit(id, limitId, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/budgets/{id}/limits/{limitId}',
            path: {
                'id': id,
                'limitId': limitId,
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
    /**
     * Get list of budget limits by date
     * Get all budget limits for for this date range.
     *
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @returns BudgetLimitArray A list of budget limits.
     * @throws ApiError
     */
    static listBudgetLimit(start, end, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/budget-limits',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
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
     * All transactions to a budget.
     * Get all transactions linked to a budget, possibly limited by start and end
     * @param id The ID of the budget.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @param type Optional filter on the transaction type(s) returned
     * @returns TransactionArray A list of transactions.
     * @throws ApiError
     */
    static listTransactionByBudget(id, xTraceId, limit, page, start, end, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/budgets/{id}/transactions',
            path: {
                'id': id,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'limit': limit,
                'page': page,
                'start': start,
                'end': end,
                'type': type,
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
     * Lists all attachments of a budget.
     * Lists all attachments.
     * @param id The ID of the budget.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns AttachmentArray A list of attachments
     * @throws ApiError
     */
    static listAttachmentByBudget(id, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/budgets/{id}/attachments',
            path: {
                'id': id,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'limit': limit,
                'page': page,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthenticated`,
                404: `Page not found`,
                422: `Validation error. The body will have the exact details.`,
                500: `Internal exception`,
            },
        });
    }
    /**
     * All transactions without a budget.
     * Get all transactions NOT linked to a budget, possibly limited by start and end
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @returns TransactionArray A list of transactions.
     * @throws ApiError
     */
    static listTransactionWithoutBudget(xTraceId, limit, page, start, end) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/budgets/transactions-without-budget',
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
                422: `Validation error. The body will have the exact details.`,
                500: `Internal exception`,
            },
        });
    }
    /**
     * List all budgets.
     * List all the budgets the user has made. If the start date and end date are submitted as well, the "spent" array will be updated accordingly.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start A date formatted YYYY-MM-DD, to get info on how much the user has spent. You must submit both start and end.
     *
     * @param end A date formatted YYYY-MM-DD, to get info on how much the user has spent. You must submit both start and end.
     *
     * @returns BudgetArray A list of budgets.
     * @throws ApiError
     */
    static listBudget(xTraceId, limit, page, start, end) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/budgets',
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
     * Store a new budget
     * Creates a new budget. The data required can be submitted as a JSON body or as a list of parameters.
     * @param requestBody JSON array or key=value pairs with the necessary budget information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns BudgetSingle New budget stored, result in response.
     * @throws ApiError
     */
    static storeBudget(requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/budgets',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthenticated`,
                404: `Page not found`,
                422: `Validation error. The body will have the exact details.`,
                500: `Internal exception`,
            },
        });
    }
    /**
     * Get a single budget.
     * Get a single budget. If the start date and end date are submitted as well, the "spent" array will be updated accordingly.
     * @param id The ID of the requested budget.
     * @param xTraceId Unique identifier associated with this request.
     * @param start A date formatted YYYY-MM-DD, to get info on how much the user has spent.
     *
     * @param end A date formatted YYYY-MM-DD, to get info on how much the user has spent.
     *
     * @returns BudgetSingle The requested budget
     * @throws ApiError
     */
    static getBudget(id, xTraceId, start, end) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/budgets/{id}',
            path: {
                'id': id,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
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
     * Update existing budget.
     * Update existing budget. This endpoint cannot be used to set budget amount limits.
     * @param id The ID of the budget.
     * @param requestBody JSON array with updated budget information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns BudgetSingle Updated budget stored, result in response
     * @throws ApiError
     */
    static updateBudget(id, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/budgets/{id}',
            path: {
                'id': id,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthenticated`,
                404: `Page not found`,
                422: `Validation error. The body will have the exact details.`,
                500: `Internal exception`,
            },
        });
    }
    /**
     * Delete a budget.
     * Delete a budget. Transactions will not be deleted.
     * @param id The ID of the budget.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteBudget(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/budgets/{id}',
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
exports.BudgetsService = BudgetsService;
//# sourceMappingURL=BudgetsService.js.map