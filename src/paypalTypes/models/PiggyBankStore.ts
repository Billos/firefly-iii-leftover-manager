/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PiggyBankAccountStore } from './PiggyBankAccountStore';
export type PiggyBankStore = {
    name: string;
    accounts?: Array<PiggyBankAccountStore>;
    target_amount: string | null;
    current_amount?: string;
    /**
     * The date you started with this piggy bank.
     */
    start_date?: string;
    /**
     * The date you intend to finish saving money.
     */
    target_date?: string | null;
    order?: number;
    readonly active?: boolean;
    notes?: string | null;
    /**
     * The group ID of the group this object is part of. NULL if no group.
     */
    object_group_id?: string | null;
    /**
     * The name of the group. NULL if no group.
     */
    object_group_title?: string | null;
};

