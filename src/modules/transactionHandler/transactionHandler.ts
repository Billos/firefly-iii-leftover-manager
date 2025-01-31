import { TransactionSplit, TransactionsService } from "../../types"

export interface TransactionHandler {
  // Function about transactions
  getMessageId(transactionId: string): Promise<string>
  // Generic function about messages
  sendMessage: (content: string, transactionId: string) => Promise<string>
  updateMessage(id: string, content: string, transactionId: string): Promise<void>
  deleteMessage(id: string, transactionId: string): Promise<void>
  // Functions about messages, implemented by the child class
  sendMessageImpl: (message: string, transactionId: string) => Promise<string>
  updateMessageImpl: (id: string, content: string, transactionId: string) => Promise<void>
  deleteMessageImpl: (id: string, transactionId: string) => Promise<void>
}

export abstract class AbstractTransactionHandler implements TransactionHandler {
  private async getTransaction(transactionId: string): Promise<TransactionSplit> {
    const {
      data: {
        attributes: {
          transactions: [transaction],
        },
      },
    } = await TransactionsService.getTransaction(transactionId)
    return transaction
  }

  public async getMessageId(transactionId: string): Promise<string> {
    const { notes } = await this.getTransaction(transactionId)
    // The notes should include (HandlerMessageId: <messageId>)
    const regex = /HandlerMessageId: (\d+)/
    const match = (notes || "").match(regex)
    if (match) {
      return match[1]
    }
    return null
  }

  private async setNotes(transactionId: string, notes: string): Promise<void> {
    await TransactionsService.updateTransaction(transactionId, {
      apply_rules: false,
      fire_webhooks: false,
      transactions: [{ notes }],
    })
  }

  private async setMessageId(transactionId: string, messageId: string): Promise<void> {
    const transaction = await this.getTransaction(transactionId)
    // Notes might not include the HandlerMessageId yet
    let notes = transaction.notes || ""
    if (!notes.includes("HandlerMessageId")) {
      notes += `\nHandlerMessageId: ${messageId}\n`
    } else {
      notes = (transaction.notes || "").replace(/HandlerMessageId: (\d+)/, `HandlerMessageId: ${messageId}`)
    }
    await this.setNotes(transactionId, notes)
  }

  private async unsetMessageId(transactionId: string): Promise<void> {
    const transaction = await this.getTransaction(transactionId)
    const notes = transaction.notes.replace(/HandlerMessageId: (\d+)/, "")
    await this.setNotes(transactionId, notes)
  }

  public async sendMessage(content: string, transactionId: string): Promise<string> {
    const messageId = await this.sendMessageImpl(content, transactionId)
    await this.setMessageId(transactionId, messageId)
    return messageId
  }

  public async updateMessage(id: string, content: string, transactionId: string): Promise<void> {
    return this.updateMessageImpl(id, content, transactionId)
  }

  public async deleteMessage(id: string, transactionId: string): Promise<void> {
    await this.unsetMessageId(transactionId)
    return this.deleteMessageImpl(id, transactionId)
  }

  abstract sendMessageImpl(content: string, transactionId: string): Promise<string>

  abstract updateMessageImpl(id: string, content: string, transactionId: string): Promise<void>

  abstract deleteMessageImpl(id: string, transactionId: string): Promise<void>
}
