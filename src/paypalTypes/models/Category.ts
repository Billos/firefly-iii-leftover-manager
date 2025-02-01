/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryEarned } from './CategoryEarned';
import type { CategorySpent } from './CategorySpent';
export type Category = {
    readonly created_at?: string;
    readonly updated_at?: string;
    name: string;
    notes?: string | null;
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
    readonly spent?: Array<CategorySpent>;
    readonly earned?: Array<CategoryEarned>;
};

