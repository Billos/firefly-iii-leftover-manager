import express from "express"

import { env } from "./config"

const app = express()

app.listen(env.port, () => {
  console.log("Server is running on http://localhost:3000")
})

app.get("/trigger", (req, res) => {})
