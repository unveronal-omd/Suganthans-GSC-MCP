interface CtrBenchmarkResult {
    page: string;
    clicks: number;
    impressions: number;
    actualCtr: number;
    position: number;
    benchmarkCtr: number;
    gap: number;
    verdict: string;
}
export declare function ctrVsBenchmark(days?: number, minImpressions?: number, siteUrl?: string): Promise<CtrBenchmarkResult[]>;
export {};
