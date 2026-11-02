/**
 * Sanity project for the Valencia Dentistry site.
 *
 * The project ID is pinned on purpose: this environment sets
 * NEXT_PUBLIC_SANITY_PROJECT_ID for a different site, and that value must
 * never redirect this one. Replace PROJECT_ID with the practice's project ID
 * (sanity.io/manage). While it is "pending", the site serves the built-in
 * content (content/*) and the Studio at /cms shows a configuration notice.
 */
export const projectId = "pending";
export const dataset = process.env.NEXT_PUBLIC_VSE_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";
export const cmsConfigured = /^[a-z0-9]{8}$/.test(projectId);
