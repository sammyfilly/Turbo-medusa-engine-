/**
 * Generated by orval v6.7.1 🍺
 * Do not edit manually.
 * Medusa Admin API
 * OpenAPI spec version: 1.0.0
 */
import type { PostDraftOrdersBodyShippingMethodsItemData } from "./postDraftOrdersBodyShippingMethodsItemData";
export declare type PostDraftOrdersBodyShippingMethodsItem = {
    /** The id of the shipping option in use */
    option_id?: string;
    /** The optional additional data needed for the shipping method */
    data?: PostDraftOrdersBodyShippingMethodsItemData;
    /** The potential custom price of the shipping */
    price?: number;
};
