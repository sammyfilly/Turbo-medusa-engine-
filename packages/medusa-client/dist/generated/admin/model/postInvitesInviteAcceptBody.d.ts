/**
 * Generated by orval v6.7.1 🍺
 * Do not edit manually.
 * Medusa Admin API
 * OpenAPI spec version: 1.0.0
 */
import type { PostInvitesInviteAcceptBodyUser } from "./postInvitesInviteAcceptBodyUser";
export declare type PostInvitesInviteAcceptBody = {
    /** The invite token provided by the admin. */
    token: string;
    /** The User to create. */
    user: PostInvitesInviteAcceptBodyUser;
};
