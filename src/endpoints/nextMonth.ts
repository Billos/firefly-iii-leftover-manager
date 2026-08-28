import { Request, Response } from "express"
import pino from "pino"

import { LinkPaypalTransactionsJob } from "../queues/jobs/linkPaypalTransactions"
import { UpdateBillsBudgetLimitJob } from "../queues/jobs/updateBillsBudgetLimit"
import { UpdateLeftoverBudgetLimitJob } from "../queues/jobs/updateLeftoverBudgetLimit"
import { addJobToQueue } from "../queues/utils"

const logger = pino()

export async function nextMonth(_req: Request, res: Response) {
  logger.info("=================================== Next Month ===================================")

  await addJobToQueue(new UpdateLeftoverBudgetLimitJob(), { nextMonth: true }, true)
  await addJobToQueue(new UpdateBillsBudgetLimitJob(), { nextMonth: true }, true)
  await addJobToQueue(new LinkPaypalTransactionsJob(), {})
  res.send("<script>window.close()</script>")
}
