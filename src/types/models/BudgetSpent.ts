/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BudgetSpent = {
    /**
     * The amount spent. This is in the administration's native currency, if the conversion is turned on.
     */
    sum?: string;
    currency_id?: string;
    currency_code?: string;
    currency_symbol?: string;
    /**
     * Number of decimals supported by the currency
     */
    currency_decimal_places?: number;
};

