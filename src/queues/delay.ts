import { ASAP_JOB_DELAY, JOB_DELAYS, JobIds } from "./constants"

export function getJobDelay(jobId: JobIds, withDelta: boolean, asap: boolean = false): number {
  if (asap) {
    return ASAP_JOB_DELAY
  }
  const delay = JOB_DELAYS[jobId]
  // Random delay between 0 and 30 seconds
  const delta = withDelta ? Math.floor(Math.random() * 30) : 0
  return (delay + delta) * 1000
}
