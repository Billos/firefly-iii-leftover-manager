"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class AccountsService {
    /**
     * List all transactions related to the account.
     * This endpoint returns a list of all the transactions connected to the account.
     *
     * @param id The ID of the account.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @param type Optional filter on the transaction type(s) returned.
     * @returns TransactionArray A list of transactions
     * @throws ApiError
     */
    static listTransactionByAccount(id, xTraceId, limit, page, start, end, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/accounts/{id}/transactions',
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
     * Lists all attachments.
     * Lists all attachments.
     * @param id The ID of the account.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns AttachmentArray A list of attachments
     * @throws ApiError
     */
    static listAttachmentByAccount(id, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/accounts/{id}/attachments',
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
     * List all piggy banks related to the account.
     * This endpoint returns a list of all the piggy banks connected to the account.
     *
     * @param id The ID of the account.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns PiggyBankArray A list of piggy banks
     * @throws ApiError
     */
    static listPiggyBankByAccount(id, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/accounts/{id}/piggy-banks',
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
     * List all accounts.
     * This endpoint returns a list of all the accounts owned by the authenticated user.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start A date formatted YYYY-MM-DD. May be omitted.
     *
     * @param end A date formatted YYYY-MM-DD. Must be after "start". Can not be the same as "start". May be omitted.
     *
     * @param date A date formatted YYYY-MM-DD. When added to the request, Firefly III will show the account's balance on that day.
     *
     * @param type Optional filter on the account type(s) returned
     * @returns AccountArray A list of accounts
     * @throws ApiError
     */
    static listAccount(xTraceId, limit, page, start, end, date, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/accounts',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'limit': limit,
                'page': page,
                'start': start,
                'end': end,
                'date': date,
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
     * Create new account.
     * Creates a new account. The data required can be submitted as a JSON body or as a list of parameters (in key=value pairs, like a webform).
     * @param requestBody JSON array with the necessary account information or key=value pairs. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns AccountSingle New account stored, result in response.
     * @throws ApiError
     */
    static storeAccount(requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/accounts',
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
     * Get single account.
     * Returns a single account by its ID.
     *
     * @param id The ID of the account.
     * @param xTraceId Unique identifier associated with this request.
     * @param start A date formatted YYYY-MM-DD. May be omitted.
     *
     * @param end A date formatted YYYY-MM-DD. Must be after "start". Can not be the same as "start". May be omitted.
     *
     * @param date A date formatted YYYY-MM-DD. When added to the request, Firefly III will show the account's balance on that day.
     *
     * @returns AccountSingle The requested account
     * @throws ApiError
     */
    static getAccount(id, xTraceId, start, end, date) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/accounts/{id}',
            path: {
                'id': id,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'start': start,
                'end': end,
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
    /**
     * Update existing account.
     * Used to update a single account. All fields that are not submitted will be cleared (set to NULL). The model will tell you which fields are mandatory.
     *
     * @param id The ID of the account.
     * @param requestBody JSON array or form-data with updated account information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns AccountSingle Updated account stored, result in response
     * @throws ApiError
     */
    static updateAccount(id, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/accounts/{id}',
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
     * Permanently delete account.
     * Will permanently delete an account. Any associated transactions and piggy banks are ALSO deleted. Cannot be recovered from.
     *
     * @param id The ID of the account.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteAccount(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/accounts/{id}',
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
exports.AccountsService = AccountsService;
//# sourceMappingURL=AccountsService.js.map