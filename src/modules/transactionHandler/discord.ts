import axios, { AxiosInstance } from "axios"

import { env } from "../../config"
import { AbstractTransactionHandler, MessageType } from "./transactionHandler"

export class DiscordTransactionHandler extends AbstractTransactionHandler {
  private request: AxiosInstance = axios.create({})

  constructor() {
    super()
  }

  override async sendMessageImpl(_type: MessageType, content: string): Promise<string> {
    const result = await this.request.post<{ id: number }>(`${env.discordWebhook}?wait=true`, { content })
    return `${result.data.id}`
  }

  override async updateMessageImpl(_type: MessageType, id: string, content: string): Promise<void> {
    await this.request.patch(`${env.discordWebhook}/messages/${id}`, { content })
  }

  override async deleteMessageImpl(_type: MessageType, id: string): Promise<void> {
    await this.request.delete(`${env.discordWebhook}/messages/${id}`)
  }

  override async deleteAllMessagesImpl(): Promise<void> {
    throw new Error("Bulk deletion of messages is not supported by Discord webhooks.")
  }
}
