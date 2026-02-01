type JobArgs = { job: string; delayedMessageId?: string }
type TransactionJobArgs = { transactionId: string } & JobArgs
type BudgetJobArgs = { budgetId: string } & JobArgs
export function isTransactionJobArgs(args: QueueArgs): args is TransactionJobArgs {
  return (args as TransactionJobArgs).transactionId !== undefined
}

export function isBudgetJobArgs(args: QueueArgs): args is BudgetJobArgs {
  return (args as BudgetJobArgs).budgetId !== undefined
}

export type QueueArgs = TransactionJobArgs | BudgetJobArgs | JobArgs
