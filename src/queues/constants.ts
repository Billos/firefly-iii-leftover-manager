export enum JobIds {
  UPDATE_AUTOMATIC_BUDGETS = "update-automatic-budgets",
  UNBUDGETED_TRANSACTIONS = "unbudgeted-transactions",
  UNCATEGORIZED_TRANSACTIONS = "uncategorized-transactions",
  LINK_PAYPAL_TRANSACTIONS = "link-paypal-transactions",
}

export const JOB_DELAYS: Record<JobIds, number> = {
  [JobIds.UPDATE_AUTOMATIC_BUDGETS]: 30,
  [JobIds.UNBUDGETED_TRANSACTIONS]: 20,
  [JobIds.UNCATEGORIZED_TRANSACTIONS]: 10,
  [JobIds.LINK_PAYPAL_TRANSACTIONS]: 25,
}

export const ASAP_JOB_DELAY = 2000 // 2 seconds
