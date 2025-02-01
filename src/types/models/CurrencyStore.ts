/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CurrencyStore = {
    /**
     * Defaults to true
     */
    enabled?: boolean;
    /**
     * Make this currency the default currency. You can set this value to FALSE, in which case nothing will change to the default currency. If you set it to TRUE, the current default currency will no longer be the default currency.
     */
    default?: boolean;
    code: string;
    name: string;
    symbol: string;
    /**
     * Supports 0-16 decimals.
     */
    decimal_places?: number;
};

