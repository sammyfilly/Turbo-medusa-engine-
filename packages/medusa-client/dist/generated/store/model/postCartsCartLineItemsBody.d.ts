/**
 * Generated by orval v6.7.1 🍺
 * Do not edit manually.
 * Medusa Storefront API
 * OpenAPI spec version: 1.0.0
 */
import type { PostCartsCartLineItemsBodyMetadata } from "./postCartsCartLineItemsBodyMetadata";
export declare type PostCartsCartLineItemsBody = {
    /** The id of the Product Variant to generate the Line Item from. */
    variant_id: string;
    /** The quantity of the Product Variant to add to the Line Item. */
    quantity: number;
    /** An optional key-value map with additional details about the Line Item. */
    metadata?: PostCartsCartLineItemsBodyMetadata;
};
