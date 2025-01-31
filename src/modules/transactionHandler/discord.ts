import axios from "axios"

import { env } from "../../config"
import { AbstractTransactionHandler } from "./transactionHandler"

export class DiscordTransactionHandler extends AbstractTransactionHandler {
  constructor() {
    super()
  }

  override async sendMessageImpl(content: string): Promise<string> {
    const botInstance = axios.create({})
    const result = await botInstance.post<{ id: number }>(`${env.discordWebhook}?wait=true`, { content })
    return `${result.data.id}`
  }

  override async updateMessageImpl(id: string, content: string): Promise<void> {
    const botInstance = axios.create({})
    await botInstance.patch(`${env.discordWebhook}/messages/${id}`, { content })
  }

  override async deleteMessageImpl(id: string): Promise<void> {
    const botInstance = axios.create({})
    console.log("Deleting message url is", `${env.discordWebhook}/messages/${id}`)
    await botInstance.delete(`${env.discordWebhook}/messages/${id}`)
  }
}
