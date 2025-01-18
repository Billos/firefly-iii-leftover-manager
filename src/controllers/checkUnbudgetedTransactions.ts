import axios from "axios"

import { env } from "../config"
import { BudgetsService, TransactionSplit, TransactionsService, TransactionTypeFilter } from "../types"

async function sendDiscordMessage(content: string): Promise<number> {
  const botInstance = axios.create({})
  const result = await botInstance.post<{ id: number }>(`${env.discordWebhook}?wait=true`, { content })
  return result.data.id
}

async function updateDiscordMessage(id: number, content: string) {
  const botInstance = axios.create({})
  await botInstance.patch(`${env.discordWebhook}/messages/${id}`, { content })
}

export async function deleteDiscordMessage(id: string) {
  const botInstance = axios.create({})
  console.log("Deleting message url is", `${env.discordWebhook}/messages/${id}`)
  await botInstance.delete(`${env.discordWebhook}/messages/${id}`)
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
  const padDescription = Math.max(...unbudgetedTransactions.map(({ description }) => description.length))

  const { data: budgets } = await BudgetsService.listBudget(null, 50, 1, startDate, endDate)
  // Create the message

  if (unbudgetedTransactions.length === 0) {
    console.log("No unbudgeted transactions")
    return
  }

  const messageId = await sendDiscordMessage("Checking unbudgeted transactions")

  let msg = `You have ${unbudgetedTransactions.length} unbudgeted transaction${unbudgetedTransactions.length > 1 ? "s" : ""}:`

  for (const {
    amount,
    currency_decimal_places,
    currency_symbol,
    description,
    transaction_journal_id,
  } of unbudgetedTransactions) {
    const apis = []
    for (const {
      id,
      attributes: { name },
    } of budgets) {
      apis.push(`[\`${name}\`](<${env.serviceUrl}transaction/${transaction_journal_id}/budget/${id}/${messageId}/>)`)
    }
    let str = `\n - \`${parseFloat(amount).toFixed(currency_decimal_places).padStart(padAmount)} ${currency_symbol} - ${description.padEnd(padDescription)}\` ${apis.join(" ")}`
    msg += str
  }
  await updateDiscordMessage(messageId, msg)

  console.log("Discord message sent")
}
