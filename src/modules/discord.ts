import axios from "axios"

import { env } from "../config"
import { TransactionSplit, TransactionsService } from "../types"

export async function getTransaction(transactionId: string): Promise<TransactionSplit> {
  const {
    data: {
      attributes: {
        transactions: [transaction],
      },
    },
  } = await TransactionsService.getTransaction(transactionId)
  return transaction
}

async function setNotes(transactionId: string, notes: string): Promise<void> {
  await TransactionsService.updateTransaction(transactionId, {
    apply_rules: false,
    fire_webhooks: false,
    transactions: [{ notes }],
  })
}

export async function setMessageId(transactionId: string, messageId: string): Promise<void> {
  const transaction = await getTransaction(transactionId)
  // Notes might not include the discordMessageId yet
  let notes = transaction.notes || ""
  if (!notes.includes("discordMessageId")) {
    notes += `\ndiscordMessageId: ${messageId}\n`
  } else {
    notes = (transaction.notes || "").replace(/discordMessageId: (\d+)/, `discordMessageId: ${messageId}`)
  }
  await setNotes(transactionId, notes)
}

export async function unsetMessageId(transactionId: string): Promise<void> {
  const transaction = await getTransaction(transactionId)
  const notes = transaction.notes.replace(/discordMessageId: (\d+)/, "")
  await setNotes(transactionId, notes)
}

export async function sendDiscordMessage(content: string): Promise<string> {
  const botInstance = axios.create({})
  const result = await botInstance.post<{ id: number }>(`${env.discordWebhook}?wait=true`, { content })
  return `${result.data.id}`
}

export async function updateDiscordMessage(id: string, content: string) {
  const botInstance = axios.create({})
  await botInstance.patch(`${env.discordWebhook}/messages/${id}`, { content })
}

export async function deleteDiscordMessage(id: string, transactionId: string) {
  const botInstance = axios.create({})
  console.log("Deleting message url is", `${env.discordWebhook}/messages/${id}`)
  await botInstance.delete(`${env.discordWebhook}/messages/${id}`)
  await unsetMessageId(transactionId)
}
