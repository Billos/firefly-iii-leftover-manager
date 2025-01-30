import { env } from "../config"
import { getTransaction, sendDiscordMessage, setMessageId, updateDiscordMessage } from "../modules/discord"
import { BudgetsService, TransactionArray, TransactionSplit, TransactionsService, TransactionTypeFilter } from "../types"
import { sleep } from "../utils/sleep"

async function getTransactions(amout: number, page: number, startDate: string, endDate: string): Promise<TransactionArray> {
  return TransactionsService.listTransaction(null, amout, page, startDate, endDate, TransactionTypeFilter.WITHDRAWAL)
}

async function countPagesToFetch(amount: number, startDate: string, endDate: string): Promise<number> {
  const { meta } = await getTransactions(amount, 1, startDate, endDate)
  return meta.pagination.total_pages
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
    ...unbudgetedTransactions.map((transaction) => parseFloat(transaction.amount).toFixed(transaction.currency_decimal_places).length),
  )

  const { data: allBbudgets } = await BudgetsService.listBudget(null, 50, 1, startDate, endDate)
  const budgets = allBbudgets.filter(({ attributes: { name } }) => !(env.billsBudget && name === env.billsBudget))

  if (unbudgetedTransactions.length === 0) {
    console.log("No unbudgeted transactions")
    return
  }

  for (const { amount, currency_decimal_places, currency_symbol, description, transaction_journal_id } of unbudgetedTransactions) {
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
