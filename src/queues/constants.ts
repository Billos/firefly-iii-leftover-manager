export enum JobIds {
  UPDATE_AUTOMATIC_BUDGETS = "update-automatic-budgets",
  UNBUDGETED_TRANSACTIONS = "unbudgeted-transactions",
  UNCATEGORIZED_TRANSACTIONS = "uncategorized-transactions",
}

export const JOB_DELAYS: Record<JobIds, number> = {
  [JobIds.UPDATE_AUTOMATIC_BUDGETS]: 30,
  [JobIds.UNBUDGETED_TRANSACTIONS]: 20,
  [JobIds.UNCATEGORIZED_TRANSACTIONS]: 10,
}
