export declare class FetchApi {
    static _enabled: boolean;
    static isSupported(): boolean;
    static request(url: string): Promise<Response>;
}
