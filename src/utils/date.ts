import { DateTime } from "luxon"

// import pino from "pino"

// const logger = pino()

export function getDateNow(): DateTime {
  // Returns the current date in ISO format without time
  const date = DateTime.now()
  if (process.env.TZ) {
    // If a timezone is set, return the date in that timezone
    date.setZone(process.env.TZ)
  }

  // logger.info("Current time is %s", date.toISO())
  return date
}
