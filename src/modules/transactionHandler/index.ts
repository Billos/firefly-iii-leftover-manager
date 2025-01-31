import { env } from "../../config"
import { DiscordTransactionHandler } from "./discord"
import { TransactionHandler } from "./transactionHandler"

let transactionHandler: TransactionHandler

if (env.discordWebhook) {
  transactionHandler = new DiscordTransactionHandler()
}

export { transactionHandler }
