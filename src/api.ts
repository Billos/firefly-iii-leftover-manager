import axios from "axios"

import { env } from "./config"

const instance = axios.create({
  baseURL: env.fireflyUrl,
  headers: {
    Authorization: `Bearer ${env.fireflyToken}`,
    "Content-Type": "application/json",
    accept: "application/json",
  },
})
