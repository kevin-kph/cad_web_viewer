import { Point3 } from '@ts3d-hoops/common';
import { NodeId } from './types';
import { IModel } from './core/IModel';
import { IScEngine } from './core/IScEngine';
import { ICallbackManager } from './core/ICallbackManager';
/**
 * This class provides an interface to the explode related features of the viewer. More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/scene_attributes/explode.html).
 */
export declare class ExplodeManager {
    private readonly _model;
    private readonly _engine;
    private _explodeActive;
    private _explodeMagnitude;
    /** @hidden */
    constructor(model: IModel, engine: IScEngine, callbackManager: ICallbackManager);
    /**
     * Starts an explode operation. This will cancel any currently active explode operation.
     * @param nodeIds an array of NodeId for the parts that should be exploded. If this parameter is omitted or is an empty array, the entire model will be considered for explosion.
     * @param explosionVector the vector to use for the center of the explosion.
     * @returns a promise that resolves when this operation is complete.
     */
    start(nodeIds?: NodeId[], explosionVector?: Point3): Promise<void>;
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
    private _doExplode;
}
