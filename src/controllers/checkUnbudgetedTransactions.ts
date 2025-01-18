import axios from "axios"

import { env } from "../config"
import {
  BudgetArray,
  BudgetsService,
  TransactionArray,
  TransactionSplit,
  TransactionsService,
  TransactionTypeFilter,
} from "../types"

async function sendDiscordMessage(content: string): Promise<void> {
  const botInstance = axios.create({})
  await botInstance.post(`${env.discordWebhook}?wait=true`, { content })
}

async function countPagesToFetch(amount: number, startDate: string, endDate: string): Promise<number> {
  const response = await TransactionsService.listTransaction(
    null,
    amount,
    1,
    startDate,
    endDate,
    TransactionTypeFilter.WITHDRAWAL,
  )
  const { meta } = JSON.parse(response as any) as TransactionArray
  return meta.pagination.total_pages
}

export async function checkUnbudgetedTransactions(startDate: string, endDate: string) {
  console.log("================ Checking the no-budget transactions =================")
  const amountPerPage = 50
  const totalPages = await countPagesToFetch(amountPerPage, startDate, endDate)
  const unbudgetedTransactions: TransactionSplit[] = []

  for (let page = 1; page <= totalPages; page++) {
    const response = await TransactionsService.listTransaction(
      null,
      amountPerPage,
      page,
      startDate,
      endDate,
      TransactionTypeFilter.WITHDRAWAL,
    )
    const { data: transactions } = JSON.parse(response as any) as TransactionArray
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

  const raw = await BudgetsService.listBudget(null, 50, 1, startDate, endDate)
  const { data: budgets } = JSON.parse(raw as any) as BudgetArray

  let msg = `You have ${unbudgetedTransactions.length} unbudgeted transactions:`
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
      apis.push(`[\`${name}\`](<${env.serviceUrl}transaction/${transaction_journal_id}/budget/${id}>)`)
    }
    let str = `\n - \`${parseFloat(amount).toFixed(currency_decimal_places).padStart(padAmount)} ${currency_symbol} - ${description.padEnd(padDescription)}\` ${apis.join(" ")}`

    msg += str
  }

  await sendDiscordMessage(msg)
  console.log("Discord message sent")
}
