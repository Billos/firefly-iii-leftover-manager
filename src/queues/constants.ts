export enum JobIds {
  CHECK_BUDGET_LIMIT = "check-budget-limit",
  UPDATE_AUTOMATIC_BUDGETS = "update-automatic-budgets",
  UNBUDGETED_TRANSACTIONS = "unbudgeted-transactions",
  UNCATEGORIZED_TRANSACTIONS = "uncategorized-transactions",
  LINK_PAYPAL_TRANSACTIONS = "link-paypal-transactions",
}

export const JOB_DELAYS: Record<JobIds, number> = {
  [JobIds.CHECK_BUDGET_LIMIT]: 5,
  [JobIds.UPDATE_AUTOMATIC_BUDGETS]: 25,
  [JobIds.UNBUDGETED_TRANSACTIONS]: 8,
  [JobIds.UNCATEGORIZED_TRANSACTIONS]: 15,
  [JobIds.LINK_PAYPAL_TRANSACTIONS]: 30,
}

export const ASAP_JOB_DELAY = 2000 // 2 seconds
