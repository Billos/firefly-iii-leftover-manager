import { DateTime } from "luxon"

import { TransactionsService as PaypalTransactionsService } from "../paypalTypes"
import { TransactionsService } from "../types"

export async function linkPaypalTransactions() {
  console.log("================ Link Paypal Transactions =================")

  // StartDate and EndDate are today - 20 days to today
  const startDate = DateTime.now().minus({ days: 10 }).toISODate()
  const endDate = DateTime.now().toISODate()

  // This function will retrieve the Paypal transactions that do not have the tag "Linked"
  const { data } = await PaypalTransactionsService.listTransaction(null, 50, 1, startDate, endDate)
  const unlinkedPaypalTransactions = data.filter(({ attributes: { transactions } }) => !transactions[0].tags.includes("Linked"))

  const { data: ffData } = await TransactionsService.listTransaction(null, 50, 1, startDate, endDate)
  const unlinkedFFTransactions = ffData.filter(({ attributes: { transactions } }) => !transactions[0].tags.includes("Linked"))

  console.log("Found Unlinked Paypal transactions", unlinkedPaypalTransactions.length)
  console.log("Found Unlinked Firefly III transactions", unlinkedFFTransactions.length)

  for (const paypalTransaction of unlinkedPaypalTransactions) {
    const [transaction] = paypalTransaction.attributes.transactions
    // It will retrieve the transactions that do not have the tag "Linked"
    if (transaction.tags.includes("Linked")) {
      continue
    }
    console.log(`Checking Paypal transaction ${paypalTransaction.id}`)
    // Getting the transactions from Firefly III each time to avoid having outdated data
    // Then it will try to find match the transaction with the Paypal transaction
    for (const {
      id,
      attributes: {
        transactions: [ffTransaction],
      },
    } of unlinkedFFTransactions) {
      //  - Description should include Paypal
      if (!ffTransaction.description.includes("PayPal")) {
        continue
      }

      //  - Tags should not include Linked
      if (ffTransaction.tags.includes("Linked")) {
        continue
      }

      //  - Amount should match
      if (ffTransaction.amount !== transaction.amount) {
        continue
      }

      // Date difference should be less than 5 days
      const ffTransactionDate = DateTime.fromISO(ffTransaction.date)
      const paypalTransactionDate = DateTime.fromISO(transaction.date)
      if (ffTransactionDate.diff(paypalTransactionDate, "days").days > 5) {
        continue
      }

      // Add Linked tag to both transactions
      // Add the destination_name of the Paypal transaction to the Firefly III transaction Notes
      console.log(`Linking paypal ${transaction.destination_name} to Firefly III ${ffTransaction.description}`)
      await PaypalTransactionsService.updateTransaction(paypalTransaction.id, {
        apply_rules: false,
        fire_webhooks: false,
        transactions: [{ tags: [...transaction.tags, "Linked"] }],
      })
      await TransactionsService.updateTransaction(id, {
        apply_rules: true,
        fire_webhooks: false,
        transactions: [{ tags: [...ffTransaction.tags, "Linked"], notes: transaction.destination_name }],
      })
    }
  }
}
