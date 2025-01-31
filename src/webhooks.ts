import { Transaction } from "./types"

export type WebhookTransactionBody = {
  uuid: string
  user_id: number
  trigger: string
  response: string
  url: string
  version: string
  content: Transaction & { id: number }
}
