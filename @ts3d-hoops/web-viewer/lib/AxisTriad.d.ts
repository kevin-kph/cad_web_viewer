import { Point2, Color } from '@ts3d-hoops/common';
import { Axis, OverlayAnchor, OverlayIndex } from './types';
import { SelectionItem } from './selection/SelectionItem';
import { OverlayUnitPoint } from './overlay';
import { IView } from './core/IView';
import { IWebViewer } from './core/IWebViewer';
/**
 * This class provides an interface to the axis triad which is enabled by default.
 * The default functionality orients the camera based on the axis that is clicked.
 * This triad is initialized and associated with an overlay when the view is created.
 * For additional information on overlays please refer to the [[OverlayManager]].
 *
 * More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/scene_attributes/axis-triad-and-navcube.html).
 */
export declare class AxisTriad {
    private readonly _viewer;
    private _view?;
    private _position;
    private _viewportSize;
    private _anchor;
    private readonly _instanceKeys;
    private _enabled;
    private readonly _sceneReady;
    private readonly _assemblyTreeReady;
    private readonly _axisTriadReadyToInit;
    private _geometryCreated;
    private static readonly _xRotMatrix;
    private static readonly _yRotMatrix;
    private static readonly _zRotMatrix;
    private static readonly _xColor;
    private static readonly _yColor;
    private static readonly _zColor;
    private static readonly _fieldSize;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /**
     * Sets the color of one axis on this [[AxisTriad]]
     * @param axis The axis that will change color
     * @param color The color to set
     */
    setAxisColor(axis: Axis, color: Color): Promise<void>;
    /**
     * Sets the anchor position for this [[AxisTriad]].
     * @param anchor The anchor position.
     * @returns A promise that resolves on completion.
     */
    setAnchor(anchor: OverlayAnchor): Promise<void>;
    /**
     * Gets the anchor position for this [[AxisTriad]].
     * Default position is in the lower left corner.
     * @returns The overlay anchor value of the triad.
     */
    getAnchor(): OverlayAnchor;
    /**
     * Enables this [[AxisTriad]].
     * @returns A promise that resolves on completion.
     */
    enable(): Promise<void>;
    /**
     * Disables this [[AxisTriad]].
     * @returns A promise that resolves on completion.
     */
    disable(): Promise<void>;
    /**
     * Updates the visibility of this [[AxisTriad]] based on the enabled status.
     * @returns A promise that resolves on completion.
     */
    private _updateVisibility;
    /**
     * Hides the overlay window.
     * @returns A promise that resolves on completion.
     */
    private _hideOverlay;
    /**
     * Shows the overlay window.
     * @returns A promise that resolves on completion.
     */
    private _showOverlay;
    /**
     * Gets the current state of this [[AxisTriad]].
     * @returns `true` if enabled and `false` otherwise.
     */
    getEnabled(): boolean;
    /**
     * Gets the overlay id. This id should be considered reserved and not be used by client applications.
     * @returns The overlay id used by this [[AxisTriad]].
     */
    getOverlayId(): OverlayIndex;
    private _updateViewport;
    private _createViewport;
    private _onViewportSet;
    private _createGeometry;
    private _createGeomCallbacks;
    /** @hidden */
    _geometryHasBeenCreated(): boolean;
    /**
     * Determines whether or not a point is inside the axis triad overlay
     * @param mousePos
     * @returns Boolean indicating whether the provided point is inside the axis triad overlay
     */
    insideOverlay(mousePos: Point2): boolean;
    /** @hidden */
    _getOverlayOffset(): Point2;
    /** @hidden */
    _getViewportSize(): OverlayUnitPoint;
    /** @hidden */
    _getViewportPixelSize(): Point2;
    /**
     * Checks if a selection is part of the axis triad, and return the corresponding axis.
     * @param selectionItem selection item to check.
     * @returns Axis if selected, null otherwise.
     */
    getSelectionAxis(selectionItem: SelectionItem | null): Axis | null;
    /**
     * Called when the axis triad is clicked. Realigns the view along the axis selected by `selection`
     * or does nothing if no axis is selected.
     * @param selection
     */
    onClickSelection(selection: SelectionItem | null): Promise<void>;
    private _getScEngine;
    private _createInstance;
    private _createAxis;
    private _createAxisLabel;
    private _onCameraUpdate;
    private _alignedFitBounding;
}
