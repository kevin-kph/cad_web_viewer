import { DataKey } from '@ts3d-hoops/streamcache';
import { FileType } from './types';
import { VersionNumber } from '../utils';
export type AssemblyDataHeaderVersion = number;
export declare class AssemblyDataHeader {
    readonly headerVersion: AssemblyDataHeaderVersion;
    private readonly _rootAssemblyDataKey;
    readonly isDrawing: boolean;
    readonly isMeasurable: boolean;
    readonly originalFileName: string;
    readonly originalFileType: FileType;
    readonly doublePrecisionMatrices: boolean;
    readonly assemblyDataVersion: VersionNumber;
    private constructor();
    supportsAttributeBits(): boolean;
    rootAssemblyDataKey(): DataKey;
    /**
     * This mirrors C++ `AssemblyTreeHeader::MaxVersion`.
     */
    private static readonly _maxHeaderVersion;
    static readonly dynamic: AssemblyDataHeader;
    static parseBinary(data: Uint8Array): AssemblyDataHeader | null;
}
export declare class AssemblyData {
    constructor(header: AssemblyDataHeader | null, bytes: Uint8Array);
    readonly header: AssemblyDataHeader | null;
    readonly bytes: Uint8Array;
}
