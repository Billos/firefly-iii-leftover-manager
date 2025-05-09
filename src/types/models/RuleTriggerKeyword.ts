/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The type of thing this trigger responds to. A limited set is possible
 */
export enum RuleTriggerKeyword {
    FROM_ACCOUNT_STARTS = 'from_account_starts',
    FROM_ACCOUNT_ENDS = 'from_account_ends',
    FROM_ACCOUNT_IS = 'from_account_is',
    FROM_ACCOUNT_CONTAINS = 'from_account_contains',
    TO_ACCOUNT_STARTS = 'to_account_starts',
    TO_ACCOUNT_ENDS = 'to_account_ends',
    TO_ACCOUNT_IS = 'to_account_is',
    TO_ACCOUNT_CONTAINS = 'to_account_contains',
    AMOUNT_LESS = 'amount_less',
    AMOUNT_EXACTLY = 'amount_exactly',
    AMOUNT_MORE = 'amount_more',
    DESCRIPTION_STARTS = 'description_starts',
    DESCRIPTION_ENDS = 'description_ends',
    DESCRIPTION_CONTAINS = 'description_contains',
    DESCRIPTION_IS = 'description_is',
    TRANSACTION_TYPE = 'transaction_type',
    CATEGORY_IS = 'category_is',
    BUDGET_IS = 'budget_is',
    TAG_IS = 'tag_is',
    CURRENCY_IS = 'currency_is',
    HAS_ATTACHMENTS = 'has_attachments',
    HAS_NO_CATEGORY = 'has_no_category',
    HAS_ANY_CATEGORY = 'has_any_category',
    HAS_NO_BUDGET = 'has_no_budget',
    HAS_ANY_BUDGET = 'has_any_budget',
    HAS_NO_TAG = 'has_no_tag',
    HAS_ANY_TAG = 'has_any_tag',
    NOTES_CONTAINS = 'notes_contains',
    NOTES_START = 'notes_start',
    NOTES_END = 'notes_end',
    NOTES_ARE = 'notes_are',
    NO_NOTES = 'no_notes',
    ANY_NOTES = 'any_notes',
    SOURCE_ACCOUNT_IS = 'source_account_is',
    DESTINATION_ACCOUNT_IS = 'destination_account_is',
    SOURCE_ACCOUNT_STARTS = 'source_account_starts',
}
