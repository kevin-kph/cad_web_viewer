import { IWebViewer } from '../core/IWebViewer';
import { BCFData } from './BcfData';
import { BCFName } from './types';
/**
 * This class provides an interface to the BIM Collaboration Format related features of the viewer.
 */
export declare class BCFManager {
    private readonly _viewer;
    private _id;
    private _bcfMap;
    constructor(viewer: IWebViewer);
    private _getId;
    /**
     * Gets a map containing BCF data correlated with the BCF filename.
     */
    getBCFMap(): Map<number, BCFData>;
    /**
     * Gets the parsed BCF data for a BCF file.
     * @param id corresponding to the BCF file.
     */
    getBCFData(id: number): BCFData | null;
    /**
     * Removes the parsed BCF data for a BCF file.
     * @param id corresponding to the BCF file.
     */
    removeBCFData(id: number): void;
    /**
     * Creates a BCF file.
     * @param filename
     */
    createBCFData(filename: BCFName): BCFData;
    /**
     * Imports BCF data from a BCF file.
     * @param filename
     */
    addBCFFromFile(filename: BCFName): Promise<void>;
    /**
     * Imports BCF data from a buffer.
     * @param buffer
     * @param filename
     */
    addBCFFromBuffer(buffer: ArrayBuffer, filename: BCFName): Promise<void>;
    private _getVersion;
    private _loadBCFData;
    private _getDocument;
    private _getFileType;
}
