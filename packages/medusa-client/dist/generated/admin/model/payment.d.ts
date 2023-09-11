/**
 * Generated by orval v6.7.1 🍺
 * Do not edit manually.
 * Medusa Admin API
 * OpenAPI spec version: 1.0.0
 */
import type { PaymentData } from "./paymentData";
import type { PaymentMetadata } from "./paymentMetadata";
/**
 * Payments represent an amount authorized with a given payment method, Payments can be captured, canceled or refunded.
 */
export interface Payment {
    /** The id of the Payment. This value will be prefixed with `pay_`. */
    id?: string;
    /** The id of the Swap that the Payment is used for. */
    swap_id?: string;
    /** The id of the Order that the Payment is used for. */
    order_id?: string;
    /** The id of the Cart that the Payment Session is created for. */
    cart_id?: string;
    /** The amount that the Payment has been authorized for. */
    amount?: number;
    /** The 3 character ISO currency code that the Payment is completed in. */
    currency_code?: string;
    /** The amount of the original Payment amount that has been refunded back to the Customer. */
    amount_refunded?: number;
    /** The id of the Payment Provider that is responsible for the Payment */
    provider_id?: string;
    /** The data required for the Payment Provider to identify, modify and process the Payment. Typically this will be an object that holds an id to the external payment session, but can be an empty object if the Payment Provider doesn't hold any state. */
    data?: PaymentData;
    /** The date with timezone at which the Payment was captured. */
    captured_at?: string;
    /** The date with timezone at which the Payment was canceled. */
    canceled_at?: string;
    /** The date with timezone at which the resource was created. */
    created_at?: string;
    /** The date with timezone at which the resource was last updated. */
    updated_at?: string;
    /** An optional key-value map with additional information. */
    metadata?: PaymentMetadata;
}
