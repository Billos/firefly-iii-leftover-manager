"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectGroupsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ObjectGroupsService {
    /**
     * List all piggy banks related to the object group.
     * This endpoint returns a list of all the piggy banks connected to the object group.
     *
     * @param id The ID of the account.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns PiggyBankArray A list of piggy banks
     * @throws ApiError
     */
    static listPiggyBankByObjectGroup(id, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/object-groups/{id}/piggy-banks',
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
     * List all bills with this object group.
     * List all bills with this object group.
     * @param id The ID of the account.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns BillArray A list of bills.
     * @throws ApiError
     */
    static listBillByObjectGroup(id, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/object-groups/{id}/bills',
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
     * List all object groups.
     * List all object groups.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns ObjectGroupArray A list of object groups
     * @throws ApiError
     */
    static listObjectGroups(xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/object-groups',
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
     * Get a single object group.
     * Get a single object group.
     * @param id The ID of the object group.
     * @param xTraceId Unique identifier associated with this request.
     * @returns ObjectGroupSingle The requested object group
     * @throws ApiError
     */
    static getObjectGroup(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/object-groups/{id}',
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
     * Update existing object group.
     * Update existing object group.
     * @param id The ID of the object group
     * @param requestBody JSON array with updated piggy bank information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns ObjectGroupSingle Updated object group stored, result in response
     * @throws ApiError
     */
    static updateObjectGroup(id, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/object-groups/{id}',
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
     * Delete a object group.
     * Delete a object group.
     * @param id The ID of the object group.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteObjectGroup(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/object-groups/{id}',
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
exports.ObjectGroupsService = ObjectGroupsService;
//# sourceMappingURL=ObjectGroupsService.js.map