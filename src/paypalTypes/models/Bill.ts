/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillRepeatFrequency } from './BillRepeatFrequency';
export type Bill = {
    readonly created_at?: string;
    readonly updated_at?: string;
    /**
     * Use either currency_id or currency_code
     */
    currency_id?: string;
    /**
     * Use either currency_id or currency_code
     */
    currency_code?: string;
    readonly currency_symbol?: string;
    readonly currency_decimal_places?: number;
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
    name: string;
    amount_min: string;
    amount_max: string;
    /**
     * The max amount of this bill in the user's native currency, if the original amount is in a different currency.
     */
    readonly native_amount_min?: string | null;
    /**
     * The min amount of this bill in the user's native currency, if the original amount is in a different currency.
     */
    readonly native_amount_max?: string | null;
    date: string;
    /**
     * The date after which this bill is no longer valid or applicable
     */
    end_date?: string | null;
    /**
     * The date before which the bill must be renewed (or cancelled)
     */
    extension_date?: string | null;
    repeat_freq: BillRepeatFrequency;
    /**
     * How often the bill must be skipped. 1 means a bi-monthly bill.
     */
    skip?: number;
    /**
     * If the bill is active.
     */
    active?: boolean;
    /**
     * Order of the bill.
     */
    order?: number;
    notes?: string | null;
    /**
     * When the bill is expected to be due.
     */
    readonly next_expected_match?: string | null;
    /**
     * Formatted (locally) when the bill is due.
     */
    readonly next_expected_match_diff?: string | null;
    /**
     * The group ID of the group this object is part of. NULL if no group.
     */
    object_group_id?: string | null;
    /**
     * The order of the group. At least 1, for the highest sorting.
     */
    readonly object_group_order?: number | null;
    /**
     * The name of the group. NULL if no group.
     */
    object_group_title?: string | null;
    /**
     * Array of future dates when the bill is expected to be paid. Autogenerated.
     */
    readonly pay_dates?: Array<string>;
    /**
     * Array of past transactions when the bill was paid.
     */
    readonly paid_dates?: Array<{
        /**
         * Transaction group ID of the paid bill.
         */
        readonly transaction_group_id?: string;
        /**
         * Transaction journal ID of the paid bill.
         */
        readonly transaction_journal_id?: string;
        /**
         * Date the bill was paid.
         */
        readonly date?: string;
    }>;
};

