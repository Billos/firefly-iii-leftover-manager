import axios, { AxiosInstance } from "axios"

import { env } from "../../config"
import { AbstractTransactionHandler } from "./transactionHandler"

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

  override async sendMessageImpl(message: string): Promise<string> {
    const result = await this.request.post<{ id: number }>("/message", {
      title: "Unbudgeted Transaction",
      message,
      extras: {
        "client::display": {
          contentType: "text/markdown",
        },
      },
    })
    return `${result.data.id}`
  }

  override async updateMessageImpl(id: string, content: string, transactionId: string): Promise<void> {
    await this.deleteMessage(id, transactionId)
    await this.sendMessage(content, transactionId)
  }

  override async deleteMessageImpl(id: string): Promise<void> {
    await this.request.delete(`/message/${id}?token=${env.gotifyUserToken}`)
  }
}
