/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RuleArray } from '../models/RuleArray';
import type { RuleGroupArray } from '../models/RuleGroupArray';
import type { RuleGroupSingle } from '../models/RuleGroupSingle';
import type { RuleGroupStore } from '../models/RuleGroupStore';
import type { RuleGroupUpdate } from '../models/RuleGroupUpdate';
import type { TransactionArray } from '../models/TransactionArray';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RuleGroupsService {
    /**
     * List rules in this rule group.
     * List rules in this rule group.
     * @param id The ID of the rule group.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns RuleArray A list of rules.
     * @throws ApiError
     */
    public static listRuleByGroup(
        id: string,
        xTraceId?: string,
        limit?: number,
        page?: number,
    ): CancelablePromise<RuleArray> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/rule-groups/{id}/rules',
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
     * Test which transactions would be hit by the rule group. No changes will be made.
     * Test which transactions would be hit by the rule group. No changes will be made. Limit the result if you want to.
     * @param id The ID of the rule group.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start A date formatted YYYY-MM-DD, to limit the transactions the test will be applied to. Both the start date and the end date must be present.
     *
     * @param end A date formatted YYYY-MM-DD, to limit the transactions the test will be applied to. Both the start date and the end date must be present.
     *
     * @param searchLimit Maximum number of transactions Firefly III will try. Don't set this too high, or it will take Firefly III very long to run the test. I suggest a max of 200.
     *
     * @param triggeredLimit Maximum number of transactions the rule group can actually trigger on, before Firefly III stops. I would suggest setting this to 10 or 15. Don't go above the user's page size, because browsing to page 2 or 3 of a test result would fire the test again, making any navigation efforts very slow.
     *
     * @param accountsArray Limit the testing of the rule group to these asset accounts or liabilities. Only asset accounts and liabilities will be accepted. Other types will be silently dropped.
     *
     * @returns TransactionArray A list of transactions that would be changed by any of the rules of the rule group. No changes will be made.
     * @throws ApiError
     */
    public static testRuleGroup(
        id: string,
        xTraceId?: string,
        limit?: number,
        page?: number,
        start?: string,
        end?: string,
        searchLimit?: number,
        triggeredLimit?: number,
        accountsArray?: Array<number>,
    ): CancelablePromise<TransactionArray> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/rule-groups/{id}/test',
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
                'search_limit': searchLimit,
                'triggered_limit': triggeredLimit,
                'accounts[]': accountsArray,
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
     * Fire the rule group on your transactions.
     * Fire the rule group on your transactions. Changes will be made by the rules in the rule group! Limit the result if you want to.
     * @param id The ID of the rule group.
     * @param xTraceId Unique identifier associated with this request.
     * @param start A date formatted YYYY-MM-DD, to limit the transactions the actions will be applied to. Both the start date and the end date must be present.
     *
     * @param end A date formatted YYYY-MM-DD, to limit the transactions the actions will be applied to. Both the start date and the end date must be present.
     *
     * @param accountsArray Limit the triggering of the rule group to these asset accounts or liabilities. Only asset accounts and liabilities will be accepted. Other types will be silently dropped.
     *
     * @returns void
     * @throws ApiError
     */
    public static fireRuleGroup(
        id: string,
        xTraceId?: string,
        start?: string,
        end?: string,
        accountsArray?: Array<number>,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/rule-groups/{id}/trigger',
            path: {
                'id': id,
            },
            headers: {
                'X-Trace-Id': xTraceId,
            },
            query: {
                'start': start,
                'end': end,
                'accounts[]': accountsArray,
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
     * List all rule groups.
     * List all rule groups.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns RuleGroupArray A list of rule groups.
     * @throws ApiError
     */
    public static listRuleGroup(
        xTraceId?: string,
        limit?: number,
        page?: number,
    ): CancelablePromise<RuleGroupArray> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/rule-groups',
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
     * Store a new rule group.
     * Creates a new rule group. The data required can be submitted as a JSON body or as a list of parameters.
     * @param requestBody JSON array or key=value pairs with the necessary rule group information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns RuleGroupSingle New rule group stored, result in response.
     * @throws ApiError
     */
    public static storeRuleGroup(
        requestBody: RuleGroupStore,
        xTraceId?: string,
    ): CancelablePromise<RuleGroupSingle> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/rule-groups',
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
     * Get a single rule group.
     * Get a single rule group. This does not include the rules. For that, see below.
     * @param id The ID of the rule group.
     * @param xTraceId Unique identifier associated with this request.
     * @returns RuleGroupSingle The requested rule group
     * @throws ApiError
     */
    public static getRuleGroup(
        id: string,
        xTraceId?: string,
    ): CancelablePromise<RuleGroupSingle> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/rule-groups/{id}',
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
     * Update existing rule group.
     * Update existing rule group.
     * @param id The ID of the rule group.
     * @param requestBody JSON array with updated rule group information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns RuleGroupSingle Updated rule group stored, result in response
     * @throws ApiError
     */
    public static updateRuleGroup(
        id: string,
        requestBody: RuleGroupUpdate,
        xTraceId?: string,
    ): CancelablePromise<RuleGroupSingle> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/rule-groups/{id}',
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
     * Delete a rule group.
     * Delete a rule group.
     * @param id The ID of the rule group.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    public static deleteRuleGroup(
        id: string,
        xTraceId?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/rule-groups/{id}',
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
