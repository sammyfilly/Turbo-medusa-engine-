/**
 * Generated by orval v6.7.1 🍺
 * Do not edit manually.
 * Medusa Storefront API
 * OpenAPI spec version: 1.0.0
 */
import type { DiscountConditionProductMetadata } from "./discountConditionProductMetadata"

/**
 * Associates a discount condition with a product
 */
export interface DiscountConditionProduct {
  /** The id of the Product */
  product_id?: string
  /** The id of the Discount Condition */
  condition_id?: string
  /** The date with timezone at which the resource was created. */
  created_at?: string
  /** The date with timezone at which the resource was last updated. */
  updated_at?: string
  /** The date with timezone at which the resource was deleted. */
  deleted_at?: string
  /** An optional key-value map with additional information. */
  metadata?: DiscountConditionProductMetadata
}
