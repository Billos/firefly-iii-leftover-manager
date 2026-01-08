"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrenciesService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class CurrenciesService {
    /**
     * List all accounts with this currency.
     * List all accounts with this currency.
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param date A date formatted YYYY-MM-DD. When added to the request, Firefly III will show the account's balance on that day.
     *
     * @param type Optional filter on the account type(s) returned
     * @returns AccountArray A list of accounts
     * @throws ApiError
     */
    static listAccountByCurrency(code, xTraceId, limit, page, date, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/currencies/{code}/accounts',
            path: {
                'code': code,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'limit': limit,
                'page': page,
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
     * List all available budgets with this currency.
     * List all available budgets with this currency.
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns AvailableBudgetArray A list of available budgets
     * @throws ApiError
     */
    static listAvailableBudgetByCurrency(code, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/currencies/{code}/available-budgets',
            path: {
                'code': code,
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
     * List all bills with this currency.
     * List all bills with this currency.
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns BillArray A list of bills.
     * @throws ApiError
     */
    static listBillByCurrency(code, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/currencies/{code}/bills',
            path: {
                'code': code,
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
     * List all budget limits with this currency
     * List all budget limits with this currency
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start Start date for the budget limit list.
     * @param end End date for the budget limit list.
     * @returns BudgetLimitArray A list of budget limits.
     * @throws ApiError
     */
    static listBudgetLimitByCurrency(code, xTraceId, limit, page, start, end) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/currencies/{code}/budget-limits',
            path: {
                'code': code,
            },
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
     * List all recurring transactions with this currency.
     * List all recurring transactions with this currency.
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns RecurrenceArray A list of recurring transactions
     * @throws ApiError
     */
    static listRecurrenceByCurrency(code, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/currencies/{code}/recurrences',
            path: {
                'code': code,
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
     * List all rules with this currency.
     * List all rules with this currency.
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns RuleArray A list of rules
     * @throws ApiError
     */
    static listRuleByCurrency(code, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/currencies/{code}/rules',
            path: {
                'code': code,
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
     * List all transactions with this currency.
     * List all transactions with this currency.
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start A date formatted YYYY-MM-DD, to limit the list of transactions.
     *
     * @param end A date formatted YYYY-MM-DD, to limit the list of transactions.
     *
     * @param type Optional filter on the transaction type(s) returned
     * @returns TransactionArray A list of transactions.
     * @throws ApiError
     */
    static listTransactionByCurrency(code, xTraceId, limit, page, start, end, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/currencies/{code}/transactions',
            path: {
                'code': code,
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
     * List all currencies.
     * List all currencies.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns CurrencyArray A list of currencies.
     * @throws ApiError
     */
    static listCurrency(xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/currencies',
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
     * Store a new currency
     * Creates a new currency. The data required can be submitted as a JSON body or as a list of parameters.
     * @param requestBody JSON array or key=value pairs with the necessary currency information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns CurrencySingle New currency stored, result in response.
     * @throws ApiError
     */
    static storeCurrency(requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/currencies',
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
     * Enable a single currency.
     * Enable a single currency.
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static enableCurrency(code, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/currencies/{code}/enable',
            path: {
                'code': code,
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
     * Disable a currency.
     * Disable a currency.
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static disableCurrency(code, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/currencies/{code}/disable',
            path: {
                'code': code,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthenticated`,
                404: `Page not found`,
                409: `Currency cannot be disabled, because it is still in use.`,
                500: `Internal exception`,
            },
        });
    }
    /**
     * Make currency primary currency.
     * Make this currency the primary currency for the current financial administration. If the currency is not enabled, it will be enabled as well.
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static primaryCurrency(code, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/currencies/{code}/primary',
            path: {
                'code': code,
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
     * Get a single currency.
     * Get a single currency.
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @returns CurrencySingle The requested currency
     * @throws ApiError
     */
    static getCurrency(code, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/currencies/{code}',
            path: {
                'code': code,
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
     * Update existing currency.
     * Update existing currency.
     * @param code The currency code.
     * @param formData JSON array with updated currency information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns CurrencySingle Updated currency stored, result in response
     * @throws ApiError
     */
    static updateCurrency(code, formData, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/currencies/{code}',
            path: {
                'code': code,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
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
     * Delete a currency.
     * Delete a currency.
     * @param code The currency code.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteCurrency(code, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/currencies/{code}',
            path: {
                'code': code,
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
     * Get the primary currency of the current administration.
     * Get the primary currency of the current administration. This replaces what was called "the user's default currency" although they are essentially the same.
     * @param xTraceId Unique identifier associated with this request.
     * @returns CurrencySingle The primary currency
     * @throws ApiError
     */
    static getPrimaryCurrency(xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/currencies/primary',
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
exports.CurrenciesService = CurrenciesService;
//# sourceMappingURL=CurrenciesService.js.map