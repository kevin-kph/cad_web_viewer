import { Point2 } from '@ts3d-hoops/common';
import { Camera } from '../Camera';
import { NodeId, OverlayIndex, OverlayAnchor, OverlayUnit } from '../types';
import { OverlayUnitPoint } from './OverlayUnitPoint';
import { IModel } from '../core/IModel';
import { IView } from '../core/IView';
import { IScEngine } from '../core/IScEngine';
import { ICallbackManager } from '../core/ICallbackManager';
/**
 * The OverlayManager exposes functionality for creating overlays that are layered on top of the 3d scene. More
 * information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/scene_attributes/overlays.html).
 * An overlay defines a viewport on the screen with an associated camera.
 * These overlays are useful for creating axis triads, navigational cubes, or similar elements.
 * The overlays are not designed to create multiple views of a model. Therefore, inserting large amounts of
 * geometry into overlays isn't recommended. Add directly additional views from the webviewer instead.
 */
export declare class OverlayManager {
    private readonly _view;
    private readonly _model;
    private readonly _callbackManager;
    private readonly _engine;
    private _viewports;
    /** @hidden */
    constructor(view: IView, model: IModel, callbackManager: ICallbackManager, engine: IScEngine);
    /**
     * Gets the maximum index value that can be used for indexing overlays.
     * @returns the maximum index value.
     */
    maxIndex(): OverlayIndex;
    /**
     * Creates an overlay or updates an existing one.
     * @param index the index of the overlay. This value may be any number between 1 and maxIndex(). If No overlay exists for this index one will be created.
     * @param anchor the anchor point for the viewport.
     * @param x the x value of the viewport location.
     * @param xUnit the unit type of the x parameter.
     * @param y the y value of the viewport location.
     * @param yUnit the unit type of the y parameter.
     * @param width the width of the viewport.
     * @param widthUnit the unit type of the width parameter.
     * @param height the height of the viewport.
     * @param heightUnit the unit type of the height parameter.
     */
    setViewport(index: OverlayIndex, anchor: OverlayAnchor, x: number, xUnit: OverlayUnit, y: number, yUnit: OverlayUnit, width: number, widthUnit: OverlayUnit, height: number, heightUnit: OverlayUnit): Promise<void>;
    /**
     * @hidden
     * Gets the position of a viewport as it was defined with OverlayUnits
     * @param index Index to get position of
     * @returns OverlayUnitPoint expressing overlay's position
     */
    _getViewportPosition(index: OverlayIndex): OverlayUnitPoint | null;
    /**
     * Gets position in pixels of the viewport with the supplied index, or `null` if none has been set.
     * Note: This does not take the anchor point into account
     * @param index The index of the overlay to get the position of.
     */
    getViewportPixelPosition(index: OverlayIndex): Point2 | null;
    /**
     * Gets the calculated position of the upper-left corner of the viewport with the supplied index, or `null`
     * if none has been set.
     * @param index The index of the overlay to get the offset of
     */
    getViewportPixelOffsetInCanvas(index: OverlayIndex): Point2 | null;
    /**
     * @hidden
     * Gets the size of a viewport as it was defined with OverlayUnits
     * @param index Index to get size of
     * @returns OverlayUnitPoint expressing overlay's size
     */
    _getViewportSize(index: OverlayIndex): OverlayUnitPoint | null;
    /**
     * Gets size in pixels of the viewport with the supplied index, or `null` if none has been set.
     * @param index The index of the overlay to get the size of.
     */
    getViewportPixelSize(index: OverlayIndex): Point2 | null;
    /**
     * Get the anchor point of the viewport with the supplied index, or `null` if none has been set.
     * @param index The index of the overlay to get the anchor of.
     */
    getViewportAnchor(index: OverlayIndex): OverlayAnchor | null;
    /**
     * Sets the visibility state for the given viewport.
     * @param index the overlay index.
     * @param visibility boolean value indicating whether the overlay should be rendered.
     */
    setVisibility(index: OverlayIndex, visibility: boolean): Promise<void>;
    /**
     * Removes an overlay from the system. All nodes that have been assigned to this overlay will be returned to the default view.
     * @param index the index of the overlay to destroy.
     */
    destroy(index: OverlayIndex): Promise<void>;
    /**
     * Adds nodes into the overlay at the given index. They will no longer be rendered in the main window or any other overlay.
     * This method should not be called before the model structure ready callback has been triggered.
     * @param index the overlay index to add nodes into.
     * @param nodes the nodes to add into the overlay.
     */
    addNodes(index: OverlayIndex, nodes: NodeId[]): Promise<void>;
    /**
     * Sets the camera for the given index.
     * @param index
     * @param camera
     */
    setCamera(index: OverlayIndex, camera: Camera): Promise<void>;
    /** @hidden */
    _getOverlayOffset(anchor: OverlayAnchor, viewportPixelSize: Point2): Point2;
    /**
     * @hidden
     * Converts an OverlayUnitPoint to a pixel defined Point2 using the viewer's current dimensions
     * @param unitPoint Point defined with [[OverlayUnit]]s to convert
     * @returns point expressed in pixels based on viewer's current size
     */
    _toPixelPoint(unitPoint: OverlayUnitPoint): Point2;
    private _validateUnit;
}
