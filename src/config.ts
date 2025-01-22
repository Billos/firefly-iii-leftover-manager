const env = {
  port: process.env.PORT || 3000,
  fireflyUrl: process.env.FIREFLY_III_URL,
  fireflyToken: process.env.FIREFLY_III_TOKEN,
  fireflyPaypalAccountToken: process.env.FIREFLY_III_PAYPAL_ACCOUNT_TOKEN,
  billsBudget: process.env.BILLS_BUDGET,
  leftoversBudget: process.env.LEFTOVERS_BUDGET,
  paypalBudget: process.env.PAYPAL_BUDGET,
  discordWebhook: process.env.DISCORD_WEBHOOK,
  serviceUrl: process.env.SERVICE_URL,
}

export { env }
