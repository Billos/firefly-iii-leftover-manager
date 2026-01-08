"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class TagsService {
    /**
     * Lists all attachments.
     * Lists all attachments.
     * @param tag Either the tag itself or the tag ID.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns AttachmentArray A list of attachments
     * @throws ApiError
     */
    static listAttachmentByTag(tag, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/tags/{tag}/attachments',
            path: {
                'tag': tag,
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
     * List all transactions with this tag.
     * List all transactions with this tag.
     * @param tag Either the tag itself or the tag ID.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @param start A date formatted YYYY-MM-DD. This is the start date of the selected range (inclusive).
     *
     * @param end A date formatted YYYY-MM-DD. This is the end date of the selected range (inclusive).
     *
     * @param type Optional filter on the transaction type(s) returned.
     * @returns TransactionArray A list of transactions.
     * @throws ApiError
     */
    static listTransactionByTag(tag, xTraceId, limit, page, start, end, type) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/tags/{tag}/transactions',
            path: {
                'tag': tag,
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
     * List all tags.
     * List all of the user's tags.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns TagArray A list of tags
     * @throws ApiError
     */
    static listTag(xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/tags',
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
     * Store a new tag
     * Creates a new tag. The data required can be submitted as a JSON body or as a list of parameters.
     * @param requestBody JSON array or key=value pairs with the necessary tag information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns TagSingle New tag stored, result in response.
     * @throws ApiError
     */
    static storeTag(requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/tags',
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
     * Get a single tag.
     * Get a single tag.
     * @param tag Either the tag itself or the tag ID. If you use the tag itself, and it contains international (non-ASCII) characters, your mileage may vary.
     * @param xTraceId Unique identifier associated with this request.
     * @param limit Number of items per page. The default pagination is per 50 items.
     * @param page Page number. The default pagination is per 50 items.
     * @returns TagSingle The requested tag
     * @throws ApiError
     */
    static getTag(tag, xTraceId, limit, page) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/tags/{tag}',
            path: {
                'tag': tag,
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
     * Update existing tag.
     * Update existing tag.
     * @param tag Either the tag itself or the tag ID. If you use the tag itself, and it contains international (non-ASCII) characters, your mileage may vary.
     * @param requestBody JSON array with updated tag information. See the model for the exact specifications.
     * @param xTraceId Unique identifier associated with this request.
     * @returns TagSingle Updated tag stored, result in response
     * @throws ApiError
     */
    static updateTag(tag, requestBody, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/tags/{tag}',
            path: {
                'tag': tag,
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
     * Delete an tag.
     * Delete an tag.
     * @param tag Either the tag itself or the tag ID. If you use the tag itself, and it contains international (non-ASCII) characters, your mileage may vary.
     * @param xTraceId Unique identifier associated with this request.
     * @returns void
     * @throws ApiError
     */
    static deleteTag(tag, xTraceId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/tags/{tag}',
            path: {
                'tag': tag,
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
exports.TagsService = TagsService;
//# sourceMappingURL=TagsService.js.map