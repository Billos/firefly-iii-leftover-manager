import { TransactionSplit, TransactionsService } from "../../types"

export type MessageType = "BudgetMessageId" | "CategoryMessageId"

export interface TransactionHandler {
  // Function about transactions
  getMessageId: (type: MessageType, transactionId: string) => Promise<string>
  // Generic function about messages
  sendMessage: (type: MessageType, content: string, transactionId: string) => Promise<string>
  deleteMessage: (type: MessageType, id: string, transactionId: string) => Promise<void>
  deleteAllMessages: () => Promise<void>
  // Functions about messages, implemented by the child class
  sendMessageImpl: (title: string, message: string, transactionId: string) => Promise<string>
  deleteMessageImpl: (id: string, transactionId: string) => Promise<void>
  deleteAllMessagesImpl: () => Promise<void>
}

export abstract class AbstractTransactionHandler implements TransactionHandler {
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
    const messageId = await this.sendMessageImpl(this.getTitle(type), content, transactionId)
    await this.setMessageId(type, transactionId, messageId)
    return messageId
  }

  public async deleteMessage(type: MessageType, id: string, transactionId: string): Promise<void> {
    try {
      await this.unsetMessageId(type, transactionId)
    } catch (error) {
      console.log(`Could not unset message ID for type ${type} and transaction ${transactionId}:`, error.message)
      return
    }
    try {
      await this.deleteMessageImpl(id, transactionId)
    } catch (error) {
      console.log(`Could not delete message for type ${type} and transaction ${transactionId}:`, error.message)
    }
  }

  public async deleteAllMessages(): Promise<void> {
    await this.deleteAllMessagesImpl()
  }

  abstract sendMessageImpl(title: string, content: string, transactionId: string): Promise<string>

  abstract deleteMessageImpl(id: string, transactionId: string): Promise<void>

  abstract deleteAllMessagesImpl(): Promise<void>
}
