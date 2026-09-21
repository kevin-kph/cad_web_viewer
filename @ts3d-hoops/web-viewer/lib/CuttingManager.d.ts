import { Point3, Color, Box } from '@ts3d-hoops/common';
import { Axis, NodeId } from './types';
import { AbstractCuttingManager, AbstractCuttingSection } from './internal/tree/AbstractCore';
import { IModel } from './core/IModel';
import { IWebViewer } from './core/IWebViewer';
import { IScEngine } from './core/IScEngine';
import { ICallbackManager } from './core/ICallbackManager';
import { ICuttingSection } from './core';
/**
 * Main interface into the cutting functionality of the viewer. The object manages a number of individual CuttingSections which can be activated individually.
 */
export declare class CuttingManager implements AbstractCuttingManager {
    readonly viewer: IWebViewer;
    private readonly _model;
    private readonly _callbackManager;
    private readonly _engine;
    private readonly _cuttingSections;
    private _cuttingLimits?;
    private _isInit;
    private _standinGeometryPickable;
    private _cappingFaceColor;
    private _cappingLineColor;
    private _cappingIdleCallbackEnabled;
    private _cappingIdlePromise;
    private _conservativeIsCappingIdle;
    /** @hidden */
    constructor(viewer: IWebViewer, model: IModel, callbackManager: ICallbackManager, engine: IScEngine);
    /**
     * generates reference geometry for a cutting plane.
     * @param axis axis for reference geometry.
     * @param modelBounding modelBounding for geometry size.
     */
    createReferenceGeometryFromAxis(axis: Axis, modelBounding: Box): Point3[];
    /**
     * Uses a selection normal and position to create reference geometry for a cutting plane.
     * @param normal face normal.
     * @param position face position.
     * @param modelBounding model bounding for geometry size.
     */
    createReferenceGeometryFromFaceNormal(normal: Point3, position: Point3, modelBounding: Box): Point3[];
    /**
     * Activates all cutting sections, and restores any planes contained to the scene.
     */
    activateCuttingSections(): Promise<void>;
    /**
     * Deactivates all cutting sections.
     * Cutting planes are not removed from section and can be restored using [[activateCuttingSections]]
     */
    deactivateAllCuttingSections(): Promise<void>;
    /**
     * Clears all cutting sections.
     * This causes all cutting sections to be deactivated and all their cutting planes removed.
     */
    clearAllCuttingSections(): Promise<void>;
    /**
     * Sets the color for all cutting plane reference geometry.
     * @param color
     */
    setCuttingPlaneColor(color: Color): Promise<void>;
    /**
     * Sets the color to be used for capping geometry faces. If null is passed in as the color object, no capping face will be shown.
     * @param color color to use for capping geometry faces.
     */
    setCappingFaceColor(color: Color | null): Promise<void>;
    /**
     * Gets the color used for capping geometry faces.
     * @returns color used for capping geometry faces.
     */
    getCappingFaceColor(): Color | null;
    /**
     * Sets the color to be used for capping geometry lines. If null is passed in as the color object, no capping line will be shown.
     * @param color color to use for capping geometry lines.
     */
    setCappingLineColor(color: Color | null): Promise<void>;
    /**
     * Gets the color used for capping geometry lines.
     * @returns color used for capping geometry lines.
     */
    getCappingLineColor(): Color | null;
    /**
     * Gets a cutting section by index. Cutting sections are created automatically by the system and may be queried at any point during or after the sceneReady callback has been triggered.
     * @returns the cutting section for the given index.
     */
    getCuttingSection(index: number): AbstractCuttingSection | null;
    /**
     * Gets the total number of planes supported by each cutting section.
     * Cutting planes contained in the same cutting section will work together (an object is only cut if all cutting planes in a section would cut it).
     * Cutting planes in separate cutting sections do not work together when cutting (an object is cut if any one of the cutting sections would cut it).
     * @returns the number of planes each cutting section may contain.
     */
    getCuttingSectionCapacity(): number;
    /**
     * Gets the total number of cutting sections supported by the system.
     * @returns the number of cutting sections supported by the system.
     */
    getCuttingSectionCount(): number;
    /**
     * Gets the cutting section containing the cutting plane with the given node ID. If the supplied node ID is not contained by any cutting section null will be returned.
     * @param nodeId a node ID for cutting plane stand-in geometry.
     * @returns the ICuttingSection that contains the plane with the given node id or null if none contain it.
     */
    getCuttingSectionFromNodeId(nodeId: NodeId | null): ICuttingSection | null;
    /**
     * Gets all nodes that have capping drawn for them.
     * @returns an array of node IDs that have capping drawn for them
     */
    getNodesWithCapping(): Promise<NodeId[]>;
    /**
     * Sets whether stand-in geometry for cutting sections should be pickable.
     * If this option is set to false, picking rays will pass though stand-in geometry for cutting planes.
     * The default value is not pickable.
     * @param pickable boolean value indicating whether stand-in geometry should be pickable in the scene.
     */
    setStandinGeometryPickable(pickable: boolean): Promise<void>;
    /**
     * Gets whether stand-in geometry for cutting sections is pickable.
     * @returns boolean value indicating whether stand-in geometry for cutting sections is pickable.
     */
    getStandinGeometryPickable(): boolean;
    /** @hidden */
    _setStandinGeometryVisible(visible: boolean): void;
    /**
     * Sets the delay used by delayCapping() in milliseconds.
     * @param delayInMilliseconds The delay amount.
     */
    setCappingDelay(delayInMilliseconds: number): void;
    /**
     * Delays capping processing by a fixed time interval.
     */
    delayCapping(): void;
    /**
     * Enables or disables activation of "cappingIdle" callback event.
     * @param enable Enables or disables activation of "cappingIdle" callback event.
     * @returns A promise returning whether or not capping generation was idle when this call resolves.
     */
    enableCappingIdleCallback(enable: boolean): Promise<boolean>;
    waitForCappingIdle(): Promise<void>;
    /**
     * Sets whether capping geometry will show.
     * The default value is true.
     * @param cappingGeometryVisibility
     */
    setCappingGeometryVisibility(cappingGeometryVisibility: boolean): Promise<void>;
    /**
     * Gets whether capping geometry will show
     * @returns boolean value indicating whether capping geometry will show
     */
    getCappingGeometryVisibility(): boolean;
    /**
     * @returns the number of active cutting sections.
     */
    getActiveCuttingSectionCount(): number;
    /** @hidden */
    _init(): void;
    /** @hidden */
    _isInitialized(): boolean;
    /**
     * Updates all cutting plane geometry.
     */
    refreshPlaneGeometry(): Promise<void>;
    /**
     * @returns true if there is an active cutting section.
     */
    hasActiveCuttingSection(): boolean;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Removes any cutting planes in the scene, and restores cutting planes from a json object.
     * @param json
     */
    fromJson(json: any): Promise<void>;
    private _gatherStandinGeometryIds;
}
