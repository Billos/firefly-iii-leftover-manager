/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PiggyBankAccountRead = {
    /**
     * The ID of the account.
     */
    readonly id: string;
    readonly name: string;
    current_amount: string;
    /**
     * If convertToNative is on, this will show the amount in the native currency.
     */
    native_current_amount: string;
};

