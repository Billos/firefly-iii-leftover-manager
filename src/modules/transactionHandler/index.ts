import { env } from "../../config"
import { DiscordTransactionHandler } from "./discord"
import { GotifyTransactionHandler } from "./gotify"
import { TransactionHandler } from "./transactionHandler"

let transactionHandler: TransactionHandler

if (env.discordWebhook) {
  transactionHandler = new DiscordTransactionHandler()
} else if (env.gotifyUrl && env.gotifyToken && env.gotifyUserToken) {
  transactionHandler = new GotifyTransactionHandler()
}

export { transactionHandler }
