import { env } from "../../config"
import { DiscordNotifier } from "./discord"
import { GotifyNotifier } from "./gotify"
import { Notifier } from "./notifier"

let notifier: Notifier

if (env.discordWebhook) {
  notifier = new DiscordNotifier()
} else if (env.gotifyUrl && env.gotifyToken && env.gotifyUserToken) {
  notifier = new GotifyNotifier()
}

export { notifier }
