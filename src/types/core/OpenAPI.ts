/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import { env } from "../../config"
import type { ApiRequestOptions } from "./ApiRequestOptions"

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>
type Headers = Record<string, string>

export type OpenAPIConfig = {
  BASE: string
  VERSION: string
  WITH_CREDENTIALS: boolean
  CREDENTIALS: "include" | "omit" | "same-origin"
  TOKEN?: string | Resolver<string> | undefined
  USERNAME?: string | Resolver<string> | undefined
  PASSWORD?: string | Resolver<string> | undefined
  HEADERS?: Headers | Resolver<Headers> | undefined
  ENCODE_PATH?: ((path: string) => string) | undefined
}

export const OpenAPI: OpenAPIConfig = {
  BASE: env.fireflyUrl,
  VERSION: "6.1.24",
  WITH_CREDENTIALS: false,
  CREDENTIALS: "include",
  TOKEN: undefined,
  HEADERS: {
    Authorization: `Bearer ${env.fireflyToken}`,
  },
  ENCODE_PATH: undefined,
}
