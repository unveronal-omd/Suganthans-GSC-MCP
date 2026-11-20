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
export declare function listProperties(): Promise<ListPropertiesResult>;
export {};
