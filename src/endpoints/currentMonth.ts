import { Request, Response } from "express"
import pino from "pino"

import { LinkPaypalTransactionsJob } from "../queues/jobs/linkPaypalTransactions"
import { UpdateBillsBudgetLimitJob } from "../queues/jobs/updateBillsBudgetLimit"
import { UpdateLeftoverBudgetLimitJob } from "../queues/jobs/updateLeftoverBudgetLimit"
import { addJobToQueue } from "../queues/utils"

const logger = pino()

export async function currentMonth(_req: Request, res: Response) {
  logger.info("=================================== Current Month ===================================")

  await addJobToQueue(new UpdateLeftoverBudgetLimitJob(), {}, true)
  await addJobToQueue(new UpdateBillsBudgetLimitJob(), {}, true)
  await addJobToQueue(new LinkPaypalTransactionsJob(), {})
  res.send("<script>window.close()</script>")
}
