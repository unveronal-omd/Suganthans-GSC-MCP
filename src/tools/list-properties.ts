import { getSearchConsoleClient, getConfig } from "../auth.js";

interface PropertyEntry {
  siteUrl: string;
  permissionLevel: string;
  isDefault: boolean;
}

interface ListPropertiesResult {
  defaultProperty: string;
  properties: PropertyEntry[];
  note: string;
}

/**
 * Lists every Search Console property the authenticated identity can open,
 * so callers can pick a valid site_url for the per-property tools.
 */
export async function listProperties(): Promise<ListPropertiesResult> {
  const client = await getSearchConsoleClient();
  const { siteUrl: defaultProperty } = getConfig();

  const response = await client.sites.list();
  const properties = (response.data.siteEntry || [])
    .filter((s) => s.siteUrl)
    .map((s) => ({
      siteUrl: s.siteUrl!,
      permissionLevel: s.permissionLevel || "unknown",
      isDefault: s.siteUrl === defaultProperty,
    }))
    .sort((a, b) => a.siteUrl.localeCompare(b.siteUrl));

  return {
    defaultProperty,
    properties,
    note:
      "Pass any siteUrl above as the site_url argument of another tool to run it on that property. " +
      "siteUnverifiedUser means no data access. Sitemap submission needs siteFullUser or siteOwner; " +
      "submit_url/submit_batch (Indexing API) need siteOwner.",
  };
}
