/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrencyExchangeRateArray } from '../models/CurrencyExchangeRateArray';
import type { CurrencyExchangeRateSingle } from '../models/CurrencyExchangeRateSingle';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CurrencyExchangeRatesService {
    /**
     * List all exchange rates.
     * List exchange rates.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns CurrencyExchangeRateArray A list of all available currency exchange rates.
     * @throws ApiError
     */
    public static listCurrencyExchangeRates(
        xTraceId?: string,
        limit?: number,
        page?: number,
    ): CancelablePromise<CurrencyExchangeRateArray> {
        return __request(OpenAPI, {
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
     * List a single specific exchange rate.
     * List a single specific exchange rate
     * @param id The ID of the requested currency exchange rate.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns CurrencyExchangeRateSingle A list of currency exchange rates.
     * @throws ApiError
     */
    public static listSpecificCurrencyExchangeRate(
        id: string,
        xTraceId?: string,
        limit?: number,
        page?: number,
    ): CancelablePromise<CurrencyExchangeRateSingle> {
        return __request(OpenAPI, {
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
     * Delete a specific currency exchange rate.
     * @param id The ID of the requested currency exchange rate.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    public static deleteSpecificCurrencyExchangeRate(
        id: string,
        xTraceId?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
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
     * List all exchange rate from/to the mentioned currencies.
     * List all exchange rate from/to the mentioned currencies.
     * @param from The currency code of the 'from' currency.
     * @param to The currency code of the 'to' currency.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns CurrencyExchangeRateArray A list of currency exchange rates.
     * @throws ApiError
     */
    public static listSpecificCurrencyExchangeRates(
        from: string,
        to: string,
        xTraceId?: string,
        limit?: number,
        page?: number,
    ): CancelablePromise<CurrencyExchangeRateArray> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/exchange-rates/rates/{from}/{to}',
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
     * Delete all currency exchange rates from 'from' to 'to'.
     * Delete all currency exchange rates from 'from' to 'to' on a specific date or today.
     * @param from The currency code of the 'from' currency.
     * @param to The currency code of the 'to' currency.
     * @param xTraceId Unique identifier associated with this request.
     * @param date A date formatted YYYY-MM-DD. Defaults to today.
     *
     * @returns void
     * @throws ApiError
     */
    public static deleteSpecificCurrencyExchangeRates(
        from: string,
        to: string,
        xTraceId?: string,
        date?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/exchange-rates/rates/{from}/{to}',
            path: {
                'from': from,
                'to': to,
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
