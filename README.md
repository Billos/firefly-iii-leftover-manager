# Firefly iii Leftover Manager

/!\ Read the state of the project section before using this project /!\

This project is a quick draft to handle 2 things:

- Updating a budget used to list the bills : Sum of paid bills + sum of maximum amounts of unpaid bills
- Updating a budget used for what is left in the account : Sum of all revenues - sum of all budgets (excluding the leftovers budget obviously)

Names of the budget are defined in the environment variables, so you can use any name you want.

## Running

Easist way to run the project is to use the provided `docker-compose.yml` file.
Provide the following environment variables in a `.env` file, in the stack.env in portainer, or in the docker-compose file itself.

```shell
# The URL of the firefly iii instance including /api
FIREFLY_III_URL=
# The token to use to authenticate to the firefly iii instance
FIREFLY_III_TOKEN=
# The name of the bills budget
BILLS_BUDGET=
# The name of the leftovers budget
LEFTOVERS_BUDGET=
# The Discord webhook to send the results
DISCORD_WEBHOOK=
# The URL of the service, used to generate the links in the discord message
SERVICE_URL=
```

The budgets should already exist in the firefly iii, with a basic limit set.

I might work late on something that will create the budgets / update the limits, but for now, you have to do it manually.

## State of the project

The results I have right now, match what I am expecting, but I'm quite new with Fireflyy-iii, and I might have missed some edge cases.

I'm only updating the amount field of the budgets, or changing the budget of a transaction, so I'm quite confident that I'm not breaking anything.
However, keep in mind that this project is a draft, and that I'm not responsible for any loss of data or money.

## Roadmap

Link a paypal transaction to a transaction in another account, update the transaction in main account, and run the rules to link the transaction to the budgets and bills.

Using the transaction update API should remove the related message in the discord webhook.
