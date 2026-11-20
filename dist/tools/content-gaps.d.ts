interface ContentGap {
    query: string;
    impressions: number;
    clicks: number;
    position: number;
}
export declare function contentGaps(days?: number, minImpressions?: number, minPosition?: number, siteUrl?: string): Promise<ContentGap[]>;
export {};
