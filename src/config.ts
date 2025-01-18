const env = {
  port: process.env.PORT || 3000,
  fireflyUrl: process.env.FIREFLY_III_URL,
  fireflyToken: process.env.FIREFLY_III_TOKEN,
  billsBudget: process.env.BILLS_BUDGET,
  leftoversBudget: process.env.LEFTOVERS_BUDGET,
  discordWebhook: process.env.DISCORD_WEBHOOK,
}

export { env }
