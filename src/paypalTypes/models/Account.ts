/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountRoleProperty } from "./AccountRoleProperty"
import type { CreditCardTypeProperty } from "./CreditCardTypeProperty"
import type { InterestPeriodProperty } from "./InterestPeriodProperty"
import type { LiabilityDirectionProperty } from "./LiabilityDirectionProperty"
import type { LiabilityTypeProperty } from "./LiabilityTypeProperty"
import type { ShortAccountTypeProperty } from "./ShortAccountTypeProperty"

export type Account = {
  readonly created_at?: string
  readonly updated_at?: string
  /**
   * If omitted, defaults to true.
   */
  active?: boolean
  /**
   * Order of the account. Is NULL if account is not asset or liability.
   */
  order?: number | null
  name: string
  type: ShortAccountTypeProperty
  account_role?: AccountRoleProperty
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   */
  currency_id?: string
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   */
  currency_code?: string
  readonly currency_symbol?: string
  readonly currency_decimal_places?: number
  readonly current_balance?: string
  /**
   * The timestamp for this date is always 23:59:59, to indicate it's the balance at the very END of that particular day.
   */
  readonly current_balance_date?: string
  iban?: string | null
  bic?: string | null
  account_number?: string | null
  /**
   * Represents the opening balance, the initial amount this account holds.
   */
  opening_balance?: string
  /**
   * Represents the current debt for liabilities.
   */
  current_debt?: string | null
  /**
   * Represents the date of the opening balance.
   */
  opening_balance_date?: string | null
  virtual_balance?: string
  /**
   * If omitted, defaults to true.
   */
  include_net_worth?: boolean
  credit_card_type?: CreditCardTypeProperty
  /**
   * Mandatory when the account_role is ccAsset. Moment at which CC payment installments are asked for by the bank.
   */
  monthly_payment_date?: string | null
  liability_type?: LiabilityTypeProperty
  liability_direction?: LiabilityDirectionProperty
  /**
   * Mandatory when type is liability. Interest percentage.
   */
  interest?: string | null
  interest_period?: InterestPeriodProperty
  notes?: string | null
  /**
   * Latitude of the accounts's location, if applicable. Can be used to draw a map.
   */
  latitude?: number | null
  /**
   * Latitude of the accounts's location, if applicable. Can be used to draw a map.
   */
  longitude?: number | null
  /**
   * Zoom level for the map, if drawn. This to set the box right. Unfortunately this is a proprietary value because each map provider has different zoom levels.
   */
  zoom_level?: number | null
}
