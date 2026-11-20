interface ReportResult {
    filePath: string;
    sectionsIncluded: string[];
    summary: string;
}
export declare function generateReport(outputPath?: string, days?: number, includeSections?: string[], siteUrlOverride?: string): Promise<ReportResult>;
export {};
