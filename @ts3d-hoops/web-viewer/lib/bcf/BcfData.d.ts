import { BCFTopic } from './BcfTopic';
import { BCFName, BCFTopicId, BCFVersion } from './types';
/**
 * This class contains data corresponding to the BCF file format.
 */
export declare class BCFData {
    private readonly _bcfFileName;
    private readonly _id;
    private _version;
    private _topicsMap;
    constructor(bcfFileName: BCFName, id: number);
    /**
     * Exports BCF data to a file. Prompts the user to save it on their device.
     * @param filename Filename BCF data will be exported as
     */
    exportBCF(filename: BCFName): Promise<void>;
    /**
     * Creates a BCFZIP blob. The resulting blob is importable using `BcfManager.addBCFFromBuffer`.
     */
    toBcfZipBlob(): Promise<Blob>;
    /**
     * Adds a BCF topic.
     * @param topicId
     * @param topic
     */
    addTopic(topicId: BCFTopicId, topic: BCFTopic): void;
    /**
     * @returns A map associating BCF topic ids to BCF topic data.
     */
    getTopics(): Map<BCFTopicId, BCFTopic>;
    /**
     * Gets a BCF topic.
     * @param topicId
     */
    getTopic(topicId: BCFTopicId): BCFTopic | null;
    /**
     * Gets the BCF version.
     */
    getVersion(): BCFVersion;
    /**
     * Sets the BCF version.
     * @param version
     */
    setVersion(version: BCFVersion): void;
    /**
     * Gets the BCF filename.
     */
    getFilename(): BCFName;
    /**
     * Identifier used to keep track of loaded BCF data.
     */
    getId(): number;
}
