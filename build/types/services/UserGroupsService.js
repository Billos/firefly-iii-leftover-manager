"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroupsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class UserGroupsService {
    /**
     * List all the user groups available to this user.
     *
     * List all the user groups available to this user. These are essentially the 'financial administrations' that Firefly III supports.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns UserGroupArray A list of user groups.
     * @throws ApiError
     */
    static listUserGroups(xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/user-groups',
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
     * Get a single user group.
     * Returns a single user group by its ID.
     *
     * @param id The ID of the user group.
     * @param xTraceId Unique identifier associated with this request.
     * @returns UserGroupSingle The requested user group
     * @throws ApiError
     */
    static getUserGroup(id, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/user-groups/{id}',
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
     * Update an existing user group.
     * Used to update a single user group. The available fields are still limited.
     *
     * @param id The ID of the account.
     * @param requestBody JSON array or form-data with new user group information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns UserGroupSingle Updated user group is stored, result is in the response
     * @throws ApiError
     */
    static updateUserGroup(id, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/user-groups/{id}',
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
}
exports.UserGroupsService = UserGroupsService;
//# sourceMappingURL=UserGroupsService.js.map