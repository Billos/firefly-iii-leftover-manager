type TransactionJobArgs = { job: string; transactionId: string }
type BudgetJobArgs = { job: string; budgetId: string }
type SimpleJobArgs = { job: string }

export function isTransactionJobArgs(args: QueueArgs): args is TransactionJobArgs {
  return (args as TransactionJobArgs).transactionId !== undefined
}

export function isBudgetJobArgs(args: QueueArgs): args is BudgetJobArgs {
  return (args as BudgetJobArgs).budgetId !== undefined
}

export type QueueArgs = TransactionJobArgs | BudgetJobArgs | SimpleJobArgs
