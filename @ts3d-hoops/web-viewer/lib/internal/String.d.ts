export interface WindowWithEscape extends Window {
    escape(s: string): string;
}
export declare function utf8ArrayToStr(bytes: Uint8Array): string;
export declare function isBase10Number(s: string): boolean;
export declare function compressUint(n: number): string;
export declare function zeroPadHex32(n: number): string;
