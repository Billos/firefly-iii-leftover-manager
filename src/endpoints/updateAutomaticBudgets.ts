import { Request, Response } from "express"

import { getQueue } from "../queues"
import { getJobDelay } from "../queues/delay"
import { id } from "../queues/updateAutomaticBudgets"

export async function updateAutomaticBudgets(_req: Request, res: Response) {
  // Get all budgets
  const queue = await getQueue()
  queue.add(
    id,
    { job: id, transactionId: null },
    {
      removeOnComplete: true,
      removeOnFail: true,
      delay: getJobDelay(id, false),
    },
  )
  if (res) {
    res.send("<script>window.close()</script>")
  }
}
