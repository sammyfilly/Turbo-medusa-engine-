/**
 * Generated by orval v6.7.1 🍺
 * Do not edit manually.
 * Medusa Admin API
 * OpenAPI spec version: 1.0.0
 */
/**
 * Indicates the status of the Payment Session. Will default to `pending`, and will eventually become `authorized`. Payment Sessions may have the status of `requires_more` to indicate that further actions are to be completed by the Customer.
 */
export declare type PaymentSessionStatus = "authorized" | "pending" | "requires_more" | "error" | "canceled";
export declare const PaymentSessionStatus: {
    authorized: PaymentSessionStatus;
    pending: PaymentSessionStatus;
    requires_more: PaymentSessionStatus;
    error: PaymentSessionStatus;
    canceled: PaymentSessionStatus;
};
