/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChartLine } from '../models/ChartLine';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChartsService {
    /**
     * Dashboard chart with asset account balance information.
     * This endpoint returns the data required to generate a chart with basic asset account balance information. This is used on the dashboard.
     *
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @returns ChartLine Line chart oriented chart information. Check out the model for more details. Each entry is a line (or bar) in the chart.
     * @throws ApiError
     */
    public static getChartAccountOverview(
        start: string,
        end: string,
        xTraceId?: string,
    ): CancelablePromise<ChartLine> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/chart/account/overview',
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
                422: `Validation error. The body will have the exact details.`,
                500: `Internal exception`,
            },
        });
    }
    /**
     * Dashboard chart with balance information.
     * This endpoint returns the data required to generate a chart with balance information.
     *
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @returns ChartLine Line chart oriented chart information. Check out the model for more details. Each entry is a line (or bar) in the chart.
     * @throws ApiError
     */
    public static getChartBalance(
        start: string,
        end: string,
        xTraceId?: string,
    ): CancelablePromise<ChartLine> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/chart/balance/balance',
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
                422: `Validation error. The body will have the exact details.`,
                500: `Internal exception`,
            },
        });
    }
    /**
     * Dashboard chart with budget information.
     * This endpoint returns the data required to generate a chart with basic budget information.
     *
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @returns ChartLine Bar chart oriented chart information. Check out the model for more details. Each entry is a line (or bar) in the chart.
     * @throws ApiError
     */
    public static getChartBudgetOverview(
        start: string,
        end: string,
        xTraceId?: string,
    ): CancelablePromise<ChartLine> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/chart/budget/overview',
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
                422: `Validation error. The body will have the exact details.`,
                500: `Internal exception`,
            },
        });
    }
    /**
     * Dashboard chart with category information.
     * This endpoint returns the data required to generate a chart with basic category information.
     *
     * @param start A date formatted YYYY-MM-DD.
     *
     * @param end A date formatted YYYY-MM-DD.
     *
     * @param xTraceId Unique identifier associated with this request.
     * @returns ChartLine Line chart oriented chart information. Check out the model for more details. Each entry is a line (or bar) in the chart.
     * @throws ApiError
     */
    public static getChartCategoryOverview(
        start: string,
        end: string,
        xTraceId?: string,
    ): CancelablePromise<ChartLine> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/chart/category/overview',
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
                422: `Validation error. The body will have the exact details.`,
                500: `Internal exception`,
            },
        });
    }
}
