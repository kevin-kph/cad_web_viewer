export declare class BCFSnapshot {
    private readonly _filename;
    private readonly _data;
    constructor(filename: string, data: Uint8Array);
    /**
     * Creates a BCF Snapshot from an HTMLImageElement.
     * @param filename
     * @param image
     */
    static createFromImage(filename: string, image: HTMLImageElement): BCFSnapshot;
    /**
     * Gets the filename.
     */
    getFilename(): string;
    /**
     * Gets png data.
     */
    getData(): Uint8Array;
    /**
     * Gets a url for images corresponding to viewpoints.
     */
    getUrl(): string;
    /**
     * Gets image data as a Uint8Array from an HTMLImageElement.
     * @param img
     */
    static snapshotDataFromImage(img: HTMLImageElement): Uint8Array;
    private static _convertDataURIToBinary;
}
