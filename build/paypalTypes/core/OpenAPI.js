"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAPI = void 0;
/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
const config_1 = require("../../config");
exports.OpenAPI = {
    BASE: `${config_1.env.fireflyUrl}/api`,
    VERSION: '6.4.8',
    WITH_CREDENTIALS: false,
    CREDENTIALS: 'include',
    TOKEN: undefined,
    USERNAME: undefined,
    PASSWORD: undefined,
    HEADERS: {
        Authorization: `Bearer ${config_1.env.fireflyPaypalAccountToken}`,
    },
    ENCODE_PATH: undefined,
};
//# sourceMappingURL=OpenAPI.js.map