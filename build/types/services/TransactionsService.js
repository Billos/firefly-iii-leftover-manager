"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class TransactionsService {
    /**
     * Lists all the transaction links for an individual journal (individual split).
     * Lists all the transaction links for an individual journal (a split). Don't use the group ID, you need the actual underlying journal (the split).
     * @param id The ID of the transaction journal / the split.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns TransactionLinkArray A list of transaction links.
     * @throws ApiError
     */
    static listLinksByJournal(id, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/transaction-journals/{id}/links',
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
                500: `Internal exception`,
            },
        });
    }
    /**
     * Get a single transaction, based on one of the underlying transaction journals (transaction splits).
     * Get a single transaction by underlying journal (split).
     * @param id The ID of the transaction journal (split).
     * @param xTraceId Unique identifier associated with this request.
     * @returns TransactionSingle The requested transaction.
     * @throws ApiError
     */
    static getTransactionByJournal(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/transaction-journals/{id}',
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
     * Delete split from transaction
     * Delete an individual journal (split) from a transaction.
     * @param id The ID of the transaction journal (the split) you wish to delete.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteTransactionJournal(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/transaction-journals/{id}',
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
     * Lists all attachments.
     * Lists all attachments.
     * @param id The ID of the transaction.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns AttachmentArray A list of attachments
     * @throws ApiError
     */
    static listAttachmentByTransaction(id, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/transactions/{id}/attachments',
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
                500: `Internal exception`,
            },
        });
    }
    /**
     * Lists all piggy bank events.
     * Lists all piggy bank events.
     * @param id The ID of the transaction.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns PiggyBankEventArray A list of piggy bank events.
     * @throws ApiError
     */
    static listEventByTransaction(id, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/transactions/{id}/piggy-bank-events',
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
                500: `Internal exception`,
            },
        });
    }
    /**
     * List all the user's transactions.
     *
     * List all the user's transactions.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start A date formatted YYYY-MM-DD. This is the start date of the selected range (inclusive).
     *
     * @param end A date formatted YYYY-MM-DD. This is the end date of the selected range (inclusive).
     *
     * @param type Optional filter on the transaction type(s) returned.
     * @returns TransactionArray A list of transactions.
     * @throws ApiError
     */
    static listTransaction(xTraceId, limit, page, start, end, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/transactions',
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
     * Store a new transaction
     * Creates a new transaction. The data required can be submitted as a JSON body or as a list of parameters.
     * @param requestBody JSON array or key=value pairs with the necessary transaction information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns TransactionSingle New transaction stored(s), result in response.
     * @throws ApiError
     */
    static storeTransaction(requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/transactions',
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
     * Get a single transaction.
     * Get a single transaction.
     * @param id The ID of the transaction.
     * @param xTraceId Unique identifier associated with this request.
     * @returns TransactionSingle The requested transaction.
     * @throws ApiError
     */
    static getTransaction(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/transactions/{id}',
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
     * Update existing transaction. For more information, see https://docs.firefly-iii.org/references/firefly-iii/api/specials/
     * Update an existing transaction.
     * @param id The ID of the transaction.
     * @param requestBody JSON array with updated transaction information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns TransactionSingle Updated transaction stored, result in response
     * @throws ApiError
     */
    static updateTransaction(id, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/transactions/{id}',
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
     * Delete a transaction.
     * Delete a transaction.
     * @param id The ID of the transaction.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteTransaction(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/transactions/{id}',
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
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=TransactionsService.js.map