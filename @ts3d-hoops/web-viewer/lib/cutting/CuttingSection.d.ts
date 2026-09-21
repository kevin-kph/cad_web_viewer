import { Plane, Point3, Matrix, Color, IColor } from '@ts3d-hoops/common';
import { NodeId } from '../types';
import { CuttingPlane } from './CuttingPlane';
import { IModel } from '../core/IModel';
import { IWebViewer } from '../core/IWebViewer';
import { IScEngine } from '../core/IScEngine';
import { ICuttingManager } from '../core/ICuttingManager';
import { ICuttingSection } from '../core/ICuttingSection';
/**
 * Object representing an individual cutting section, more information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/scene_attributes/cutting-planes.html).
 * A cutting section groups up to 6 cutting planes together and behaves independently of other cutting sections.
 */
export declare class CuttingSection implements ICuttingSection {
    private readonly _viewer;
    private readonly _model;
    private readonly _cuttingManager;
    private readonly _engine;
    private readonly _cuttingPlanes;
    private _isActive;
    /** @hidden */
    constructor(viewer: IWebViewer, model: IModel, cuttingManager: ICuttingManager, engine: IScEngine);
    /**
     * Adds a plane to the cutting section.
     * @param plane The plane to be used for cutting.
     * @param referenceGeometry An optional list of four points representing a quad to be used as reference geometry for the cutting plane. Pass null to use no reference geometry for this cutting plane.
     * @param options Optional parameters for the cutting plane.
     * @param options.color The color of the cutting plane.
     * @param options.lineColor The color of the cutting plane's lines.
     * @param options.opacity The opacity of the cutting plane.
     * @returns A promise that resolves to true if the plane was added successfully, or false if the maximum number of cutting planes has been reached.
     */
    addPlane(plane: Plane, referenceGeometry?: Point3[] | null, options?: {
        color?: IColor;
        lineColor?: IColor;
        opacity?: number;
    }): Promise<boolean>;
    /**
     * Sets a plane currently in the cutting section at a given index.
     * @param index The index of the cutting plane to replace.
     * @param plane The plane to be used for cutting.
     * @param referenceGeometry a list of four points representing a quad to be used as reference geometry for the cutting plane. Pass null to use no reference geometry for this cutting plane.
     * @param options Optional parameters for the cutting plane.
     * @param options.color The color of the cutting plane.
     * @param options.lineColor The color of the cutting plane's lines.
     * @param options.opacity The opacity of the cutting plane.
     * @returns A promise that resolves when the operation has completed.
     */
    setPlane(index: number, plane: Plane, referenceGeometry?: Point3[] | null, options?: {
        color?: IColor;
        lineColor?: IColor;
        opacity?: number;
    }): Promise<void>;
    /**
     * Updates the position of a cutting plane and stand-in geometry if present.
     * @param index The index of the cutting plane.
     * @param plane The plane to use for cutting.
     * @param geometryMatrix A matrix that is multiplied by the previous position matrix to update the geometry position.
     * @param finalizePosition If true, sets the result of the geometry matrix multiplication as the new position matrix.
     * @param resetTranslation If true, uses the provided geometry matrix for the geometry position.
     */
    updatePlane(index: number, plane: Plane, geometryMatrix?: Matrix, finalizePosition?: boolean, resetTranslation?: boolean): Promise<void>;
    /**
     * Removes the cutting plane at the specified index.
     * @param index The index of the cutting plane to remove.
     */
    removePlane(index: number): Promise<void>;
    /**
     * Gets the plane for the item at the given index. In the case of an invalid index, null will be returned.
     * @param index The index of the cutting plane.
     * @returns Plane that is used for cutting at the given index or null.
     */
    getPlane(index: number): Plane | null;
    /**
     * Gets the [[NodeId]] for the reference geometry for the cutting plane at the given index.
     * In the case of an invalid index or a cutting plane with no reference geometry, null will be returned.
     * @param index the index of the cutting plane.
     * @returns [[NodeId]] of the reference geometry for the cutting plane at the given index or null.
     */
    getNodeId(index: number): NodeId | null;
    /**
     * Gets the reference geometry for the item at the given index. In the case of an invalid index, null will be returned
     * @param index The index of the cutting plane.
     * @returns A list of four points representing a quad to be used as reference geometry for the cutting plane, or null if there is no reference geometry.
     */
    getReferenceGeometry(index: number): Point3[] | null;
    /**
     * Gets the index of a plane for the corresponding node id. In the case of an invalid id, null will be returned.
     * @param id The [[NodeId]] for the plane reference geometry.
     * @returns The index of a plane associated with the provided [[NodeId]], or null if no plane is found.
     */
    getPlaneIndexByNodeId(id: NodeId): number | null;
    /**
     * Gets the opacity for the plane at the given index.
     * @param index The index of the cutting plane.
     */
    getPlaneOpacity(index: number): number | undefined;
    /**
     * Sets the opacity for the plane at the given index.
     *
     * Equivalent to `section.applyPlaneOpacity(index, opacity)`
     *
     * @param index The index of the cutting plane.
     * @param opacity A number between 0 and 1.
     */
    setPlaneOpacity(index: number, opacity: number): void;
    /**
     * Apply the opacity factor to the plane.
     *
     * @param index The index of the cutting plane.
     * @param opacity The value used to change the opacity if needed
     */
    applyPlaneOpacity(index: number, opacity?: number): void;
    /**
     * Reapply the opacity of the cutting planes to the engine
     * This function must be explicitly called after _resetOpacity has been emitted by the engine
     */
    resetPlanesOpacity(): void;
    /**
     * Sets the color for all planes in the cutting section
     * @param color Color to set
     * @returns Promise that resolves when the operation has completed.
     */
    setColor(color: Color): Promise<void>;
    /**
     * Sets the opacity for all planes in the cutting section
     * @param opacity opacity to set
     */
    setOpacity(opacity: number): void;
    /**
     * Gets the line color for all planes in the cutting section
     * @param index Index of the color to get
     * @returns The color of the cutting plane.
     */
    getPlaneColor(index: number): Color | undefined;
    /**
     * Sets the color for the plane at the given index.
     * @param index The index of the cutting plane.
     * @param color The color to set.
     */
    setPlaneColor(index: number, color: Color): void;
    /**
     * Sets the line color for the plane at the given index.
     * @param index The index of the cutting plane.
     * @returns The color of the cutting plane's line.
     */
    getPlaneLineColor(index: number): Color | undefined;
    /**
     * Sets the line color for the plane at the given index.
     * @param index The index of the cutting plane.
     * @param color The color to set.
     */
    setPlaneLineColor(index: number, color: Color): void;
    /**
     * Gets the cutting planes for this cutting section.
     * @returns the cutting planes for this cutting
     */
    getCuttingPlanes(): CuttingPlane[];
    /**
     * Gets the number of planes in this cutting secton.
     * @returns the number of planes in this cutting section
     */
    getCount(): number;
    /**
     * Removes all planes from this cutting section. This will also deactivate the cutting section.
     */
    clear(): Promise<void>;
    /**
     * Activates a cutting section for use. A cutting section must have at least one plane to be activated.
     * @returns a promise if the cutting section was activated.
     */
    activate(): Promise<void>;
    /**
     * Removes a cutting section from use.
     */
    deactivate(): Promise<void>;
    /**
     * Gets whether a cutting section is active
     * @returns boolean value indicating whether this cutting section is active
     */
    isActive(): boolean;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    fromJson(json: object): Promise<void>;
    private _initCuttingPlanesByNodeId;
    private _destroyGeometry;
    /** @hidden */
    _getInstanceNodeIds(): NodeId[];
    private _resetCuttingPlane;
    private _createInstanceGeometry;
    private _destroyMeshes;
    private _createCuttingPlaneGeometry;
}
