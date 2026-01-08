"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class DataService {
    /**
     * Bulk update transaction properties. For more information, see https://docs.firefly-iii.org/references/firefly-iii/api/specials/
     * Allows you to update transactions in bulk.
     *
     * @param query The JSON query.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static bulkUpdateTransactions(query, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/data/bulk/transactions',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
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
     * Endpoint to destroy user data
     * A call to this endpoint deletes the requested data type. Use it with care and always with user permission.
     * The demo user is incapable of using this endpoint.
     *
     * @param objects The type of data that you wish to destroy. You can only use one at a time.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static destroyData(objects, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/data/destroy',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'objects': objects,
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
     * Export account data from Firefly III
     * This endpoint allows you to export your accounts from Firefly III into a file. Currently supports CSV exports only.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param type The file type the export file (CSV is currently the only option).
     * @returns binary The exported transaction in a file.
     * @throws ApiError
     */
    static exportAccounts(xTraceId, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/data/export/accounts',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'type': type,
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
     * Export bills from Firefly III
     * This endpoint allows you to export your bills from Firefly III into a file. Currently supports CSV exports only.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param type The file type the export file (CSV is currently the only option).
     * @returns binary The exported transaction in a file.
     * @throws ApiError
     */
    static exportBills(xTraceId, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/data/export/bills',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
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
     * Export budgets and budget amount data from Firefly III
     * This endpoint allows you to export your budgets and associated budget data from Firefly III into a file. Currently supports CSV exports only.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param type The file type the export file (CSV is currently the only option).
     * @returns binary The exported transaction in a file.
     * @throws ApiError
     */
    static exportBudgets(xTraceId, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/data/export/budgets',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
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
     * Export category data from Firefly III
     * This endpoint allows you to export your categories from Firefly III into a file. Currently supports CSV exports only.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param type The file type the export file (CSV is currently the only option).
     * @returns binary The exported transaction in a file.
     * @throws ApiError
     */
    static exportCategories(xTraceId, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/data/export/categories',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
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
     * Export piggy banks from Firefly III
     * This endpoint allows you to export your piggy banks from Firefly III into a file. Currently supports CSV exports only.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param type The file type the export file (CSV is currently the only option).
     * @returns binary The exported transaction in a file.
     * @throws ApiError
     */
    static exportPiggies(xTraceId, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/data/export/piggy-banks',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
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
     * Export recurring transaction data from Firefly III
     * This endpoint allows you to export your recurring transactions from Firefly III into a file. Currently supports CSV exports only.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param type The file type the export file (CSV is currently the only option).
     * @returns binary The exported transaction in a file.
     * @throws ApiError
     */
    static exportRecurring(xTraceId, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/data/export/recurring',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
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
     * Export rule groups and rule data from Firefly III
     * This endpoint allows you to export your rules and rule groups from Firefly III into a file. Currently supports CSV exports only.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param type The file type the export file (CSV is currently the only option).
     * @returns binary The exported transaction in a file.
     * @throws ApiError
     */
    static exportRules(xTraceId, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/data/export/rules',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
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
     * Export tag data from Firefly III
     * This endpoint allows you to export your tags from Firefly III into a file. Currently supports CSV exports only.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param type The file type the export file (CSV is currently the only option).
     * @returns binary The exported transaction in a file.
     * @throws ApiError
     */
    static exportTags(xTraceId, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/data/export/tags',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
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
     * Export transaction data from Firefly III
     * This endpoint allows you to export transactions from Firefly III into a file. Currently supports CSV exports only.
     *
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @param accounts Limit the export of transactions to these accounts only. Only asset accounts will be accepted. Other types will be silently dropped.
     *
     * @param type The file type the export file (CSV is currently the only option).
     * @returns binary The exported transaction in a file.
     * @throws ApiError
     */
    static exportTransactions(start, end, xTraceId, accounts, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/data/export/transactions',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'start': start,
                'end': end,
                'accounts': accounts,
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
     * Endpoint to purge user data
     * A call to this endpoint purges all previously deleted data. Use it with care and always with user permission.
     * The demo user is incapable of using this endpoint.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static purgeData(xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/data/purge',
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
exports.DataService = DataService;
//# sourceMappingURL=DataService.js.map