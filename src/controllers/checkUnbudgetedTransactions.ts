import axios from "axios"

import { env } from "../config"
import { BudgetsService, TransactionSplit, TransactionsService, TransactionTypeFilter } from "../types"
import { sleep } from "../utils/sleep"

async function sendDiscordMessage(content: string): Promise<string> {
  const botInstance = axios.create({})
  const result = await botInstance.post<{ id: number }>(`${env.discordWebhook}?wait=true`, { content })
  return `${result.data.id}`
}

async function updateDiscordMessage(id: string, content: string) {
  const botInstance = axios.create({})
  await botInstance.patch(`${env.discordWebhook}/messages/${id}`, { content })
}

export async function deleteDiscordMessage(id: string) {
  const botInstance = axios.create({})
  console.log("Deleting message url is", `${env.discordWebhook}/messages/${id}`)
  await botInstance.delete(`${env.discordWebhook}/messages/${id}`)
  await unsetMessageId(id)
}

async function countPagesToFetch(amount: number, startDate: string, endDate: string): Promise<number> {
  const { meta } = await TransactionsService.listTransaction(
    null,
    amount,
    1,
    startDate,
    endDate,
    TransactionTypeFilter.WITHDRAWAL,
  )
  return meta.pagination.total_pages
}

async function getTransaction(transactionId: string): Promise<TransactionSplit> {
  const {
    data: {
      attributes: {
        transactions: [transaction],
      },
    },
  } = await TransactionsService.getTransaction(transactionId)
  return transaction
}

async function getMessageId(transactionId: string): Promise<string> {
  const { notes } = await getTransaction(transactionId)
  // The notes should include (discordMessageId: <messageId>)
  const regex = /discordMessageId: (\d+)/
  const match = (notes || "").match(regex)
  if (match) {
    return match[1]
  }
  return null
}

async function setNotes(transactionId: string, notes: string): Promise<void> {
  await TransactionsService.updateTransaction(transactionId, {
    apply_rules: false,
    fire_webhooks: false,
    transactions: [{ notes }],
  })
}

async function setMessageId(transactionId: string, messageId: string): Promise<void> {
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

export async function checkUnbudgetedTransactions(startDate: string, endDate: string) {
  console.log("================ Checking the no-budget transactions =================")
  const amountPerPage = 50
  const totalPages = await countPagesToFetch(amountPerPage, startDate, endDate)
  const unbudgetedTransactions: TransactionSplit[] = []

  for (let page = 1; page <= totalPages; page++) {
    const { data: transactions } = await TransactionsService.listTransaction(
      null,
      amountPerPage,
      page,
      startDate,
      endDate,
      TransactionTypeFilter.WITHDRAWAL,
    )
    for (const {
      attributes: {
        transactions: [transaction],
      },
    } of transactions) {
      if (!transaction.budget_id) {
        unbudgetedTransactions.push(transaction)
      }
    }
  }
  console.log(`Found ${unbudgetedTransactions.length} unbudgeted transactions`)

  const padAmount = Math.max(
    ...unbudgetedTransactions.map(
      (transaction) => parseFloat(transaction.amount).toFixed(transaction.currency_decimal_places).length,
    ),
  )

  const { data: allBbudgets } = await BudgetsService.listBudget(null, 50, 1, startDate, endDate)
  const budgets = allBbudgets.filter(({ attributes: { name } }) => !(env.billsBudget && name === env.billsBudget))

  if (unbudgetedTransactions.length === 0) {
    console.log("No unbudgeted transactions")
    return
  }

  for (const {
    amount,
    currency_decimal_places,
    currency_symbol,
    description,
    transaction_journal_id,
  } of unbudgetedTransactions) {
    let messageId = await getMessageId(transaction_journal_id)
    if (!messageId) {
      messageId = await sendDiscordMessage("Checking unbudgeted transactions")
      await setMessageId(transaction_journal_id, messageId)
    }
    const apis = []
    for (const {
      id,
      attributes: { name },
    } of budgets) {
      apis.push(`[\`${name}\`](<${env.serviceUrl}transaction/${transaction_journal_id}/budget/${id}/${messageId}/>)`)
    }
    const msg = `\`${parseFloat(amount).toFixed(currency_decimal_places).padStart(padAmount)} ${currency_symbol}\` ${description} \n${apis.join(" ")}`
    try {
    await updateDiscordMessage(messageId, msg)
    // Limit to 5 messages every 2 seconds
    await sleep(500)
    } catch (error) {
      console.error("Error updating message", error)
    }
  }

  console.log("Discord message sent")
}
