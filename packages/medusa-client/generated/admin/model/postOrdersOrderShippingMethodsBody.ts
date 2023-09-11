/**
 * Generated by orval v6.7.1 🍺
 * Do not edit manually.
 * Medusa Admin API
 * OpenAPI spec version: 1.0.0
 */
import type { PostOrdersOrderShippingMethodsBodyData } from "./postOrdersOrderShippingMethodsBodyData"

export type PostOrdersOrderShippingMethodsBody = {
  /** The price (excluding VAT) that should be charged for the Shipping Method */
  price: number
  /** The id of the Shipping Option to create the Shipping Method from. */
  option_id: string
  /** The data required for the Shipping Option to create a Shipping Method. This will depend on the Fulfillment Provider. */
  data: PostOrdersOrderShippingMethodsBodyData
}
