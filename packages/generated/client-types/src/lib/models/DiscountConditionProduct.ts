/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRelation, Merge } from "../core/ModelUtils"

import type { DiscountCondition } from "./DiscountCondition"
import type { Product } from "./Product"

/**
 * Associates a discount condition with a product
 */
export interface DiscountConditionProduct {
  /**
   * The ID of the Product Tag
   */
  product_id: string
  /**
   * The ID of the Discount Condition
   */
  condition_id: string
  /**
   * Available if the relation `product` is expanded.
   */
  product?: Product | null
  /**
   * Available if the relation `discount_condition` is expanded.
   */
  discount_condition?: DiscountCondition | null
  /**
   * The date with timezone at which the resource was created.
   */
  created_at: string
  /**
   * The date with timezone at which the resource was updated.
   */
  updated_at: string
  /**
   * An optional key-value map with additional details
   */
  metadata: Record<string, any> | null
}
