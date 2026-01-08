"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyExchangeRatesService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class CurrencyExchangeRatesService {
    /**
     * List all exchange rates that Firefly III knows.
     * List exchange rates that Firefly III knows.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns CurrencyExchangeRateArray A list of all available currency exchange rates.
     * @throws ApiError
     */
    static listCurrencyExchangeRates(xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/exchange-rates',
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
     * Store a new currency exchange rate.
     * Stores a new exchange rate. The data required can be submitted as a JSON body or as a list of parameters.
     * @param requestBody JSON array or key=value pairs with the necessary exchange rate information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns CurrencyExchangeRateSingle New exchange stored, result in response. If a rate already exists for this currency pair and date, it will be updated.
     * @throws ApiError
     */
    static storeCurrencyExchangeRate(requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/exchange-rates',
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
     * List a single specific exchange rate.
     * List a single specific exchange rate by its ID.
     * @param id The ID of the requested currency exchange rate.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns CurrencyExchangeRateSingle The exchange rate requested.
     * @throws ApiError
     */
    static listSpecificCurrencyExchangeRate(id, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/exchange-rates/{id}',
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
     * Delete a specific currency exchange rate.
     * Delete a specific currency exchange rate by its internal ID.
     * @param id The ID of the requested currency exchange rate.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteSpecificCurrencyExchangeRate(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/exchange-rates/{id}',
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
     * Update existing currency exchange rate.
     * Used to update a single currency exchange rate by its ID. Including the from/to currency is optional.
     *
     * @param id The ID of the currency exchange rate.
     * @param requestBody JSON array or form-data with updated exchange rate information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns CurrencyExchangeRateSingle Updated exchange rate stored, result in response
     * @throws ApiError
     */
    static updateCurrencyExchangeRate(id, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/exchange-rates/{id}',
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
            },
        });
    }
    /**
     * List all exchange rates from/to the mentioned currencies.
     * List all exchange rates from/to the mentioned currencies.
     * @param from The currency code of the 'from' currency.
     * @param to The currency code of the 'to' currency.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns CurrencyExchangeRateArray A list of currency exchange rates.
     * @throws ApiError
     */
    static listSpecificCurrencyExchangeRates(from, to, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/exchange-rates/{from}/{to}',
            path: {
                'from': from,
                'to': to,
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
     * Deletes ALL currency exchange rates from 'from' to 'to'.
     * Deletes ALL currency exchange rates from 'from' to 'to'. It's important to know that the reverse exchange rates (from 'to' to 'from') will not be deleted and Firefly III will still be able to infer the correct exchange rate from the reverse one.
     * @param from The currency code of the 'from' currency.
     * @param to The currency code of the 'to' currency.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteSpecificCurrencyExchangeRates(from, to, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/exchange-rates/{from}/{to}',
            path: {
                'from': from,
                'to': to,
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
     * List the exchange rate for the from and to-currency on the requested date.
     * List the exchange rate for the from and to-currency on the requested date.
     * @param from The currency code of the 'from' currency.
     * @param to The currency code of the 'to' currency.
     * @param date
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns CurrencyExchangeRateArray A list of currency exchange rates.
     * @throws ApiError
     */
    static listSpecificCurrencyExchangeRateOnDate(from, to, date, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/exchange-rates/{from}/{to}/{date}',
            path: {
                'from': from,
                'to': to,
                'date': date,
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
     * Delete the currency exchange rate from 'from' to 'to' on the specified date.
     * Delete the currency exchange rate from 'from' to 'to' on the specified date.  It's important to know that the reverse exchange rate (from 'to' to 'from') will not be deleted and Firefly III will still be able to infer the correct exchange rate from the reverse one.
     * @param from The currency code of the 'from' currency.
     * @param to The currency code of the 'to' currency.
     * @param date
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteSpecificCurrencyExchangeRateOnDate(from, to, date, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/exchange-rates/{from}/{to}/{date}',
            path: {
                'from': from,
                'to': to,
                'date': date,
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
     * Update existing currency exchange rate.
     * Used to update a single currency exchange rate by its currency codes and date
     *
     * @param from The currency code of the 'from' currency.
     * @param to The currency code of the 'to' currency.
     * @param date
     * @param requestBody JSON array or form-data with updated exchange rate information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns CurrencyExchangeRateSingle Updated exchange rate stored, result in response
     * @throws ApiError
     */
    static updateCurrencyExchangeRateByDate(from, to, date, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/exchange-rates/{from}/{to}/{date}',
            path: {
                'from': from,
                'to': to,
                'date': date,
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
            },
        });
    }
    /**
     * Store new currency exchange rates under this date
     * Stores a new set of exchange rates. The date is fixed (in the URL parameter) and the data required can be submitted as a JSON body.
     * @param date
     * @param requestBody JSON array with the necessary currency exchange rate information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns CurrencyExchangeRateArray New exchange rates stored, result in response. If a rate already existed for any submitted entry, it will be updated.
     * @throws ApiError
     */
    static storeCurrencyExchangeRatesByDate(date, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/exchange-rates/by-date/{date}',
            path: {
                'date': date,
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
     * Store new currency exchange rates under this from/to pair.
     * Stores a new set of exchange rates for this pair. The date is variable, and the data required can be submitted as a JSON body.
     * @param from The currency code of the 'from' currency.
     * @param to The currency code of the 'to' currency.
     * @param requestBody JSON array with the necessary currency exchange rate information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns CurrencyExchangeRateArray New exchange rates stored, result in response. If a rate already existed for any submitted entry, it will be updated.
     * @throws ApiError
     */
    static storeCurrencyExchangeRatesByPair(from, to, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/exchange-rates/by-currencies/{from}/{to}',
            path: {
                'from': from,
                'to': to,
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
}
exports.CurrencyExchangeRatesService = CurrencyExchangeRatesService;
//# sourceMappingURL=CurrencyExchangeRatesService.js.map