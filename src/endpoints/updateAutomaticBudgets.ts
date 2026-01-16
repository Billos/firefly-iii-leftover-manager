import { Request, Response } from "express"

import { UPDATE_AUTOMATIC_BUDGETS_DELAY_MS } from "../queues/constants"
import { getQueue } from "../queues"
import { id } from "../queues/updateAutomaticBudgets"

export async function updateAutomaticBudgets(_req: Request, res: Response) {
  // Get all budgets
  const queue = await getQueue()
  queue.add(id, { job: id, transactionId: null }, { removeOnComplete: true, removeOnFail: true, delay: UPDATE_AUTOMATIC_BUDGETS_DELAY_MS })
  if (res) {
    res.send("<script>window.close()</script>")
  }
}
