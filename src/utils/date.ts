import { DateTime } from "luxon"

export function getDateNow(): DateTime {
  // Returns the current date in ISO format without time
  const date = DateTime.now()

  if (process.env.TZ) {
    // If a timezone is set, return the date in that timezone
    return date.setZone(process.env.TZ)
  }

  return date
}
