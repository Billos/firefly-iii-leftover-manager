"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutocompleteService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class AutocompleteService {
    /**
     * Returns all accounts of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @param date If the account is an asset account or a liability, the autocomplete will also return the balance of the account on this date.
     * @param types Optional filter on the account type(s) used in the autocomplete.
     * @returns AutocompleteAccountArray A list of accounts with very basic information.
     * @throws ApiError
     */
    static getAccountsAc(xTraceId, query, limit, date, types) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/accounts',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
                'date': date,
                'types': types,
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
     * Returns all bills of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteBillArray A list of bills with very basic information.
     * @throws ApiError
     */
    static getBillsAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/bills',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all budgets of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteBudgetArray A list of budgets with very basic information.
     * @throws ApiError
     */
    static getBudgetsAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/budgets',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all categories of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteCategoryArray A list of categories with very basic information.
     * @throws ApiError
     */
    static getCategoriesAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/categories',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all currencies of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteCurrencyArray A list of currencies with very basic information.
     * @throws ApiError
     */
    static getCurrenciesAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/currencies',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all currencies of the user returned in a basic auto-complete array. This endpoint is DEPRECATED and I suggest you DO NOT use it.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteCurrencyCodeArray A list of currencies with very basic information and the currency code between brackets. This endpoint is DEPRECATED and I suggest you DO NOT use it.
     * @throws ApiError
     */
    static getCurrenciesCodeAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/currencies-with-code',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all object groups of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteObjectGroupArray A list of object groups with very basic information.
     * @throws ApiError
     */
    static getObjectGroupsAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/object-groups',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all piggy banks of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompletePiggyArray A list of piggy banks with very basic information.
     * @throws ApiError
     */
    static getPiggiesAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/piggy-banks',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all piggy banks of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompletePiggyBalanceArray A list of piggy banks with very basic balance information.
     * @throws ApiError
     */
    static getPiggiesBalanceAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/piggy-banks-with-balance',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all recurring transactions of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteRecurrenceArray A list of recurring transactions with very basic information.
     * @throws ApiError
     */
    static getRecurringAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/recurring',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all rule groups of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteRuleGroupArray A list of rule groups with very basic information.
     * @throws ApiError
     */
    static getRuleGroupsAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/rule-groups',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all rules of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteRuleArray A list of rules with very basic information.
     * @throws ApiError
     */
    static getRulesAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/rules',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all subscriptions of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteBillArray A list of subscriptions with very basic information.
     * @throws ApiError
     */
    static getSubscriptionsAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/subscriptions',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all tags of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteTagArray A list of tags with very basic information.
     * @throws ApiError
     */
    static getTagAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/tags',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all transaction types returned in a basic auto-complete array. English only.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteTransactionTypeArray A list of transaction types with very basic information.
     * @throws ApiError
     */
    static getTransactionTypesAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/transaction-types',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all transaction descriptions of the user returned in a basic auto-complete array.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteTransactionArray A list of transaction descriptions with very basic information.
     * @throws ApiError
     */
    static getTransactionsAc(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/transactions',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
     * Returns all transactions, complemented with their ID, of the user returned in a basic auto-complete array. This endpoint is DEPRECATED and I suggest you DO NOT use it.
     * @param xTraceId Unique identifier associated with this request.
     * @param query The autocomplete search query.
     * @param limit The number of items returned.
     * @returns AutocompleteTransactionIDArray A list of transactions with very basic information. This endpoint is DEPRECATED and I suggest you DO NOT use it.
     * @throws ApiError
     */
    static getTransactionsIdac(xTraceId, query, limit) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/autocomplete/transactions-with-id',
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'query': query,
                'limit': limit,
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
}
exports.AutocompleteService = AutocompleteService;
//# sourceMappingURL=AutocompleteService.js.map