"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrencesService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class RecurrencesService {
    /**
     * List all transactions created by a recurring transaction.
     * List all transactions created by a recurring transaction, optionally limited to the date ranges specified.
     * @param id The ID of the recurring transaction.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start A date formatted YYYY-MM-DD. Both the start and end date must be present.
     *
     * @param end A date formatted YYYY-MM-DD. Both the start and end date must be present.
     *
     * @param type Optional filter on the transaction type(s) returned
     * @returns TransactionArray A list of transactions
     * @throws ApiError
     */
    static listTransactionByRecurrence(id, xTraceId, limit, page, start, end, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/recurrences/{id}/transactions',
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
     * List all recurring transactions.
     * List all recurring transactions.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns RecurrenceArray A list of recurring transactions.
     * @throws ApiError
     */
    static listRecurrence(xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/recurrences',
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
                500: `Internal exception`,
            },
        });
    }
    /**
     * Store a new recurring transaction
     * Creates a new recurring transaction. The data required can be submitted as a JSON body or as a list of parameters.
     * @param requestBody JSON array or key=value pairs with the necessary recurring transaction information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns RecurrenceSingle New recurring transaction stored, result in response.
     * @throws ApiError
     */
    static storeRecurrence(requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/recurrences',
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
     * Get a single recurring transaction.
     * Get a single recurring transaction.
     * @param id The ID of the recurring transaction.
     * @param xTraceId Unique identifier associated with this request.
     * @returns RecurrenceSingle The requested recurring transaction
     * @throws ApiError
     */
    static getRecurrence(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/recurrences/{id}',
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
    /**
     * Update existing recurring transaction.
     * Update existing recurring transaction.
     * @param id The ID of the recurring transaction.
     * @param requestBody JSON array with updated recurring transaction information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns RecurrenceSingle Updated recurring transaction stored, result in response
     * @throws ApiError
     */
    static updateRecurrence(id, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/recurrences/{id}',
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
     * Delete a recurring transaction.
     * Delete a recurring transaction. Transactions created by the recurring transaction will not be deleted.
     * @param id The ID of the recurring transaction.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteRecurrence(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/recurrences/{id}',
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
    /**
     * Trigger the creation of a transaction for a specific recurring transaction
     * Trigger the creation of a transaction for a specific recurring transaction. All recurrences have a set of future occurrences. For those moments, you can trigger the creation of the transaction. That means the transaction will be created NOW, instead of on the indicated date. The transaction will be dated to _today_.
     *
     * So, if you recurring transaction that occurs every Monday, you can trigger the creation of a transaction for Monday in two weeks, today. On that Monday two weeks from now, no transaction will be created. Instead, the transaction is created right now, and dated _today_.
     *
     * @param id The ID of the recurring transaction.
     * @param date A date formatted YYYY-MM-DD. This is the date for which you want the recurrence to fire. You can take the date from the list of occurrences in the recurring transaction.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @returns TransactionArray A list of transactions (always just 1) created by the recurrence, or a list of zero (0) when there is nothing to create for this date.
     * @throws ApiError
     */
    static triggerRecurrenceRecurrence(id, date, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/recurrences/{id}/trigger',
            path: {
                'id': id,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'date': date,
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
exports.RecurrencesService = RecurrencesService;
//# sourceMappingURL=RecurrencesService.js.map