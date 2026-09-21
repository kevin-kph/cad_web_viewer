import { IPoint3, core } from '@ts3d-hoops/web-viewer';
import { IExplodeService } from './types';
export default class ExplodeService extends EventTarget implements IExplodeService {
    readonly serviceName: "ExplodeService";
    private _webviewer?;
    get webViewer(): core.IWebViewer | undefined;
    set webViewer(value: core.IWebViewer | undefined);
    /**
     * Resets the explode service, clearing any active operations.
     */
    reset(): void;
    /**
     * Starts an explode operation. This will cancel any currently active explode operation.
     * @param nodeIds an array of node Ids for the parts that should be exploded. If this parameter is omitted or is an empty array, the entire model will be considered for explosion.
     * @param explosionVector the vector to use for the center of the explosion.
     * @returns a promise that resolves when this operation is complete.
     */
    start(nodeIds?: number[], explosionVector?: IPoint3): Promise<void>;
    /**
     * Sets the explosion magnitude if there is an active explosion operation.
     * A value of 1.0 indicates that the distance between a part's exploded center, and exploded center will be double.
     * @param magnitude the magnitude for the explosion.
     * @returns a promise that resolves when this operation is complete.
     */
    setMagnitude(magnitude: number): Promise<void>;
    /**
     * Terminates any active explode operation.
     * @returns a promise that resolves when this operation is complete.
     */
    stop(): Promise<void>;
    /**
     * Gets the current explode magnitude. This will always return 0 when there is no active explode operation.
     * @returns the current explode magnitude.
     */
    getMagnitude(): number;
    /**
     * Indicates whether there is a currently active explode operation.
     * @returns boolean value indicating if there is an active explode operation.
     */
    getActive(): boolean;
}
