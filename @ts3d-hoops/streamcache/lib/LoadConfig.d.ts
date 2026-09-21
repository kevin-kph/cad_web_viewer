export interface LoadConfig {
    uri?: string;
    buffer?: Uint8Array;
    empty?: boolean;
    model?: string;
    sessionToken?: string;
    limitMiB?: number;
    meshLevel?: number;
    streamCutoffScale?: number;
    serverSideRendering?: boolean;
    streamCulled?: boolean;
    streamMetaDataOnIdle?: boolean;
    streamNoLimit?: boolean;
    streamInstancesOnDemand?: boolean;
    streamAggressiveCompression?: boolean;
    streamModelBoundingPreviews?: boolean;
    streamInstanceBoundingPreviews?: boolean;
    streamOnlyInterestingBoundingPreviews?: boolean;
    streamEjectedBoundingPreviews?: boolean;
    XHRonprogress?: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => unknown;
    XHRonerror?: (this: XMLHttpRequestEventTarget, ev: ErrorEvent) => unknown;
    XHRonloadend?: (this: unknown, ev: ProgressEvent, status: number, uri: string) => unknown;
}
