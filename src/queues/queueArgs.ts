import { BaseJob, BudgetJob, EndpointJob, TransactionJob } from "./jobs/BaseJob"

type JobArgs = { job: string; delayedMessageId?: string; retryCount?: number }

export type EndpointJobArgs = { transactionId: string; data: unknown } & JobArgs

export type TransactionJobArgs = { transactionId: string } & JobArgs

export type BudgetJobArgs = { budgetId: string } & JobArgs

export type NextMonthJobArgs = { data: { nextMonth?: boolean } } & JobArgs

// Run method parameter types (single object for each job type)
export type TransactionJobRunArgs = { transactionId: string }

export type BudgetJobRunArgs = { budgetId: string }

export type EndpointJobRunArgs = { transactionId: string; data: unknown }

export type SimpleJobRunArgs = { data?: { nextMonth?: boolean } }

export function isTransactionJob(job: BaseJob): job is TransactionJob {
  return job instanceof TransactionJob
}

export function isBudgetJob(job: BaseJob): job is BudgetJob {
  return job instanceof BudgetJob
}

export function isEndpointJob(job: BaseJob): job is EndpointJob {
  return job instanceof EndpointJob
}

export type QueueArgs = TransactionJobArgs | BudgetJobArgs | EndpointJobArgs | JobArgs | NextMonthJobArgs
