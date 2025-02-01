/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BudgetSpent } from './BudgetSpent';
export type AvailableBudget = {
    readonly created_at?: string;
    readonly updated_at?: string;
    /**
     * Use either currency_id or currency_code.
     */
    currency_id?: string;
    /**
     * Use either currency_id or currency_code.
     */
    currency_code?: string;
    readonly currency_symbol?: string;
    readonly currency_decimal_places?: number;
    /**
     * The currency ID of the administration's native currency.
     */
    readonly native_currency_id?: string;
    /**
     * The currency code of the administration's native currency.
     */
    readonly native_currency_code?: string;
    /**
     * The currency symbol of the administration's native currency.
     */
    readonly native_currency_symbol?: string;
    /**
     * The currency decimal places of the administration's native currency.
     */
    readonly native_currency_decimal_places?: number;
    amount: string;
    /**
     * The amount of this available budget in the native currency of this administration.
     */
    native_amount?: string;
    /**
     * Start date of the available budget.
     */
    start: string;
    /**
     * End date of the available budget.
     */
    end: string;
    readonly spent_in_budgets?: Array<BudgetSpent>;
    readonly spent_outside_budget?: Array<BudgetSpent>;
};

