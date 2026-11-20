"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProperties = listProperties;
const auth_js_1 = require("../auth.js");
/**
 * Lists every Search Console property the authenticated identity can open,
 * so callers can pick a valid site_url for the per-property tools.
 */
async function listProperties() {
    const client = await (0, auth_js_1.getSearchConsoleClient)();
    const { siteUrl: defaultProperty } = (0, auth_js_1.getConfig)();
    const response = await client.sites.list();
    const properties = (response.data.siteEntry || [])
        .filter((s) => s.siteUrl)
        .map((s) => ({
        siteUrl: s.siteUrl,
        permissionLevel: s.permissionLevel || "unknown",
        isDefault: s.siteUrl === defaultProperty,
    }))
        .sort((a, b) => a.siteUrl.localeCompare(b.siteUrl));
    return {
        defaultProperty,
        properties,
        note: "Pass any siteUrl above as the site_url argument of another tool to run it on that property. " +
            "siteUnverifiedUser means no data access. Sitemap submission needs siteFullUser or siteOwner; " +
            "submit_url/submit_batch (Indexing API) need siteOwner.",
    };
}
