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

  override async sendMessageImpl(type: MessageType, message: string): Promise<string> {
    const title = type === "CategoryMessageId" ? "Uncategorized Transaction" : "Unbudgeted Transaction"
    const result = await this.request.post<{ id: number }>("/message", {
      title,
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
    await this.deleteMessage(type, id, transactionId)
    await this.sendMessage(type, content, transactionId)
  }

  override async deleteMessageImpl(_type: MessageType, id: string): Promise<void> {
    await this.request.delete(`/message/${id}?token=${env.gotifyUserToken}`)
  }
}
