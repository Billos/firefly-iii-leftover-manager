import { TransactionSplit, TransactionsService } from "../../types"

export type MessageType = "BudgetMessageId" | "CategoryMessageId"

export interface TransactionHandler {
  // Function about transactions
  getMessageId: (type: MessageType, transactionId: string) => Promise<string>
  // Generic function about messages
  sendMessage: (type: MessageType, content: string, transactionId: string) => Promise<string>
  updateMessage: (type: MessageType, id: string, content: string, transactionId: string) => Promise<void>
  deleteMessage: (type: MessageType, id: string, transactionId: string) => Promise<void>
  // Functions about messages, implemented by the child class
  sendMessageImpl: (type: MessageType, message: string, transactionId: string) => Promise<string>
  updateMessageImpl: (type: MessageType, id: string, content: string, transactionId: string) => Promise<void>
  deleteMessageImpl: (type: MessageType, id: string, transactionId: string) => Promise<void>
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

  public async getMessageId(type: MessageType, transactionId: string): Promise<string> {
    const transaction = await this.getTransaction(transactionId)
    const regex = new RegExp(`${type}: (\\d+)`)
    const match = (transaction.notes || "").match(regex)
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

  private async setMessageId(type: MessageType, transactionId: string, messageId: string): Promise<void> {
    const transaction = await this.getTransaction(transactionId)
    // Notes might not include the HandlerMessageId yet
    let notes = transaction.notes || ""
    if (!notes.includes(type)) {
      notes += `\n${type}: ${messageId}\n`
    } else {
      notes = (transaction.notes || "").replace(new RegExp(`${type}: (\\d+)`), `${type}: ${messageId}`)
    }
    await this.setNotes(transactionId, notes)
  }

  private async unsetMessageId(type: MessageType, transactionId: string): Promise<void> {
    const transaction = await this.getTransaction(transactionId)
    const notes = transaction.notes.replace(new RegExp(`${type}: (\\d+)`), "")
    await this.setNotes(transactionId, notes)
  }

  public async sendMessage(type: MessageType, content: string, transactionId: string): Promise<string> {
    const messageId = await this.sendMessageImpl(type, content, transactionId)
    await this.setMessageId(type, transactionId, messageId)
    return messageId
  }

  public async updateMessage(type: MessageType, id: string, content: string, transactionId: string): Promise<void> {
    return this.updateMessageImpl(type, id, content, transactionId)
  }

  public async deleteMessage(type: MessageType, id: string, transactionId: string): Promise<void> {
    await this.unsetMessageId(type, transactionId)
    return this.deleteMessageImpl(type, id, transactionId)
  }

  abstract sendMessageImpl(type: MessageType, content: string, transactionId: string): Promise<string>

  abstract updateMessageImpl(type: MessageType, id: string, content: string, transactionId: string): Promise<void>

  abstract deleteMessageImpl(type: MessageType, id: string, transactionId: string): Promise<void>
}
