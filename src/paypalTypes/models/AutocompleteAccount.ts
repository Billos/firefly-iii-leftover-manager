/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AutocompleteAccount = {
    id: string;
    /**
     * Name of the account found by an auto-complete search.
     */
    name: string;
    /**
     * Asset accounts and liabilities have a second field with the given date's account balance in the account currency or native currency.
     */
    name_with_balance: string;
    /**
     * Account type of the account found by the auto-complete search.
     */
    type: string;
    /**
     * ID for the currency used by this account. If the user prefers amounts converted to their native currency, this native currency is used instead.
     */
    currency_id: string;
    /**
     * Currency name for the currency used by this account. If the user prefers amounts converted to their native currency, this native currency is used instead.
     */
    currency_name: string;
    /**
     * Currency code for the currency used by this account. If the user prefers amounts converted to their native currency, this native currency is used instead.
     */
    currency_code: string;
    /**
     * Currency symbol for the currency used by this account. If the user prefers amounts converted to their native currency, this native currency is used instead.
     */
    currency_symbol: string;
    /**
     * Number of decimal places for the currency used by this account. If the user prefers amounts converted to their native currency, this native currency is used instead.
     */
    currency_decimal_places: number;
};

