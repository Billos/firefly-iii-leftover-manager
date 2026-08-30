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

export function isTransactionJob(job: BaseJob<unknown>): job is TransactionJob<unknown> {
  return job instanceof TransactionJob
}

export function isBudgetJob(job: BaseJob<unknown>): job is BudgetJob<unknown> {
  return job instanceof BudgetJob
}

export function isEndpointJob(job: BaseJob<unknown>): job is EndpointJob<unknown> {
  return job instanceof EndpointJob
}

export type QueueArgs = TransactionJobArgs | BudgetJobArgs | EndpointJobArgs | JobArgs | NextMonthJobArgs
