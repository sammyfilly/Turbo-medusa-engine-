/**
 * Generated by orval v6.7.1 🍺
 * Do not edit manually.
 * Medusa Admin API
 * OpenAPI spec version: 1.0.0
 */
import type { Product } from "./product"

export type GetProducts200 = {
  /** The number of Products. */
  count?: number
  /** The offset of the Product query. */
  offset?: number
  /** The limit of the Product query. */
  limit?: number
  products?: Product[]
}
