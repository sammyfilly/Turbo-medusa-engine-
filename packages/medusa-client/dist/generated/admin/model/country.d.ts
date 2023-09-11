/**
 * Generated by orval v6.7.1 🍺
 * Do not edit manually.
 * Medusa Admin API
 * OpenAPI spec version: 1.0.0
 */
/**
 * Country details
 */
export interface Country {
    /** The database id of the country */
    id?: number;
    /** The 2 character ISO code for the country. */
    iso_2?: string;
    /** The 3 character ISO code for the country. */
    iso_3?: string;
    /** The numerical ISO code for the country. */
    num_code?: string;
    /** The normalized country name; in upper case. */
    name?: string;
    /** The country name appropriate for display. */
    display_name?: string;
}
