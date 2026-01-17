export enum JobIds {
  UPDATE_AUTOMATIC_BUDGETS = "update-automatic-budgets",
  UNBUDGETED_TRANSACTIONS = "unbudgeted-transactions",
  UNCATEGORIZED_TRANSACTIONS = "uncategorized-transactions",
}

const JOB_DELAYS: Record<JobIds, number> = {
  [JobIds.UPDATE_AUTOMATIC_BUDGETS]: 20,
  [JobIds.UNBUDGETED_TRANSACTIONS]: 15,
  [JobIds.UNCATEGORIZED_TRANSACTIONS]: 10,
}

export function getJobDelay(jobId: JobIds, withDelta: boolean = true): number {
  const delay = JOB_DELAYS[jobId] * 1000
  // Random delay between 0 and 30 seconds
  const delta = withDelta ? Math.floor(Math.random() * 30 * 1000) : 0
  return delay + delta
}
