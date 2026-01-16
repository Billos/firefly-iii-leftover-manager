export const UPDATE_AUTOMATIC_BUDGETS_DELAY_MS = 15000

export const UNBUDGETED_TRANSACTIONS_DELAY_MS = 15000

export const UNCATEGORIZED_TRANSACTIONS_DELAY_MS = 15000

// Mapping of job IDs to their respective delays
export const JOB_DELAYS: Record<string, number> = {
  "update-automatic-budgets": UPDATE_AUTOMATIC_BUDGETS_DELAY_MS,
  "unbudgeted-transactions": UNBUDGETED_TRANSACTIONS_DELAY_MS,
  "uncategorized-transactions": UNCATEGORIZED_TRANSACTIONS_DELAY_MS,
}
