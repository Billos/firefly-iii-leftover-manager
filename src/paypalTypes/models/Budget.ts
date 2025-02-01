/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AutoBudgetPeriod } from './AutoBudgetPeriod';
import type { AutoBudgetType } from './AutoBudgetType';
import type { BudgetSpent } from './BudgetSpent';
export type Budget = {
    readonly created_at?: string;
    readonly updated_at?: string;
    name: string;
    active?: boolean;
    notes?: string | null;
    readonly order?: number;
    auto_budget_type?: AutoBudgetType;
    /**
     * The currency ID that is part of the budget's auto-budget settings, if any.
     */
    currency_id?: string | null;
    /**
     * The currency code that is part of the budget's auto-budget settings, if any.
     */
    currency_code?: string | null;
    /**
     * The currency symbol that is part of the budget's auto-budget settings, if any.
     */
    readonly currency_symbol?: string | null;
    /**
     * The currency decimal places that is part of the budget's auto-budget settings, if any.
     */
    readonly currency_decimal_places?: number | null;
    /**
     * The administration's native currency ID.
     */
    readonly native_currency_id?: string;
    /**
     * The administration's native currency code.
     */
    readonly native_currency_code?: string;
    /**
     * The administration's native currency symbol.
     */
    readonly native_currency_symbol?: string;
    /**
     * The administration's native currency decimal places.
     */
    readonly native_currency_decimal_places?: number;
    /**
     * The amount for the auto-budget, if set.
     */
    auto_budget_amount?: string | null;
    /**
     * The native amount for the auto-budget, if set.
     */
    native_auto_budget_amount?: string | null;
    auto_budget_period?: AutoBudgetPeriod;
    /**
     * Information on how much was spent in this budget. Is only filled in when the start and end date are submitted.
     */
    readonly spent?: Array<BudgetSpent>;
};

