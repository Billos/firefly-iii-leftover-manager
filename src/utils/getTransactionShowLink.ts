import { env } from "../config"

export function getTransactionShowLink(transactionId: string): string {
  return `${env.fireflyUrl}/transactions/show/${transactionId}`
}
