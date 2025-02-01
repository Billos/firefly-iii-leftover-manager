/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserGroupReadMembers } from './UserGroupReadMembers';
export type UserGroupReadAttributes = {
    readonly created_at?: string;
    readonly updated_at?: string;
    /**
     * Is this user group ('financial administration') currently the active administration?
     */
    readonly in_use?: boolean;
    /**
     * Can the current user see the members of this user group?
     */
    readonly can_see_members?: boolean;
    /**
     * Title of the user group. By default, it is the same as the user's email address.
     */
    title?: string;
    /**
     * Returns the native currency ID of the user group.
     */
    readonly native_currency_id?: string;
    /**
     * Returns the native currency code of the user group.
     */
    native_currency_code?: string;
    /**
     * Returns the native currency symbol of the user group.
     */
    readonly native_currency_symbol?: string;
    /**
     * Returns the native currency decimal places of the user group.
     */
    readonly native_currency_decimal_places?: number;
    members?: Array<UserGroupReadMembers>;
};

