import axios, { AxiosInstance } from "axios"

import { env } from "../../config"
import { AbstractTransactionHandler, MessageType } from "./transactionHandler"

export class GotifyTransactionHandler extends AbstractTransactionHandler {
  private request: AxiosInstance = axios.create({
    baseURL: env.gotifyUrl,
    headers: {
      "X-Gotify-Key": env.gotifyToken,
    },
  })

  constructor() {
    super()
  }

  private getTitle(type: MessageType): string {
    switch (type) {
      case "CategoryMessageId":
        return "Uncategorized Transaction"
      case "BudgetMessageId":
        return "Unbudgeted Transaction"
      default:
        throw new Error(`Unknown message type: ${type}`)
    }
  }

  override async sendMessageImpl(type: MessageType, message: string): Promise<string> {
    const result = await this.request.post<{ id: number }>("/message", {
      title: this.getTitle(type),
      message,
      extras: {
        "client::display": {
          contentType: "text/markdown",
        },
      },
    })
    return `${result.data.id}`
  }

  override async updateMessageImpl(type: MessageType, id: string, content: string, transactionId: string): Promise<void> {
    try {
      await this.deleteMessage(type, id, transactionId)
    } catch (error) {
      console.error(`Error deleting message of type ${type} with id ${id}:`)
      // Ignore the error, as it might not exist
    }
    await this.sendMessage(type, content, transactionId)
  }

  override async deleteMessageImpl(_type: MessageType, id: string): Promise<void> {
    await this.request.delete(`/message/${id}?token=${env.gotifyUserToken}`)
  }

  override async deleteAllMessagesImpl(): Promise<void> {
    await this.request.delete(`/application/${env.gotifyApplicationId}/message?token=${env.gotifyUserToken}`)
  }
}
