import axios, { AxiosInstance } from "axios"

import { env } from "../../config"
import { AbstractTransactionHandler } from "./transactionHandler"

export class DiscordTransactionHandler extends AbstractTransactionHandler {
  private request: AxiosInstance = axios.create({})

  constructor() {
    super()
  }

  override async notifyImpl(_title: string, content: string): Promise<void> {
    await this.request.post<{ id: number }>(`${env.discordWebhook}?wait=true`, { content })
  }

  override async sendMessageImpl(content: string): Promise<string> {
    const result = await this.request.post<{ id: number }>(`${env.discordWebhook}?wait=true`, { content })
    return `${result.data.id}`
  }

  override async deleteMessageImpl(id: string): Promise<void> {
    await this.request.delete(`${env.discordWebhook}/messages/${id}`)
  }

  override async deleteAllMessagesImpl(): Promise<void> {
    throw new Error("Bulk deletion of messages is not supported by Discord webhooks.")
  }
}
