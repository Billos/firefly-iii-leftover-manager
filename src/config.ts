const env = {
  port: process.env.PORT || 3000,
  fireflyUrl: process.env.FIREFLY_III_URL,
  fireflyToken: process.env.FIREFLY_III_TOKEN,
  fireflyPaypalAccountToken: process.env.FIREFLY_III_PAYPAL_ACCOUNT_TOKEN,
  assetAccountId: process.env.ASSET_ACCOUNT_ID,
  billsBudget: process.env.BILLS_BUDGET,
  leftoversBudget: process.env.LEFTOVERS_BUDGET,
  discordWebhook: process.env.DISCORD_WEBHOOK,
  gotifyUrl: process.env.GOTIFY_URL,
  gotifyUserToken: process.env.GOTIFY_USER_TOKEN,
  gotifyToken: process.env.GOTIFY_TOKEN,
  serviceUrl: process.env.SERVICE_URL,
}

export { env }
