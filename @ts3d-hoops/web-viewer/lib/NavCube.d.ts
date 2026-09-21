import { Point2 } from '@ts3d-hoops/common';
import { OverlayAnchor, OverlayIndex } from './types';
import { SelectionItem } from './selection/SelectionItem';
import { OverlayUnitPoint } from './overlay';
import { IView } from './core/IView';
import { IWebViewer } from './core/IWebViewer';
/**
 * This class provides an interface to the navigational cube which is enabled by default. The default functionality changes the camera's view orientation based on the location the user clicks on the cube.
 * This cube is initialized and associated with an overlay when the view is created. For additional information on overlays please refer to the [[OverlayManager]].
 *
 * More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/scene_attributes/axis-triad-and-navcube.html).
 */
export declare class NavCube {
    private readonly _viewer;
    private _view?;
    private _position;
    private _viewportSize;
    private _anchor;
    private _dimension;
    private _fieldSize;
    private readonly _instanceKeys;
    private _enabled;
    private _textImageId;
    private _fontInfo;
    private _fontSize;
    private _textureSize;
    private readonly _selectionFaceColor;
    private readonly _outlineColor;
    private readonly _lastSelectedNodes;
    private readonly _nodeIds;
    private readonly _adjacentFaces;
    private _preserveModelUp;
    private _cameraRotation;
    private _lastOrientation;
    private _lastCamera;
    private _lastFaceIndex;
    private readonly _textWidths;
    private static readonly _faceTexts;
    private readonly _sceneReady;
    private readonly _assemblyTreeReady;
    private readonly _navcubeReadyToInit;
    private _texturesReady;
    private _geometryCreated;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /**
     * Sets the anchor position for the NavCube.
     * @param anchor the anchor position.
     */
    setAnchor(anchor: OverlayAnchor): Promise<void>;
    /**
     * Gets the anchor position for the NavCube. Default position is in the UpperRightCorner, see [[OverlayAnchor]] for more details.
     */
    getAnchor(): OverlayAnchor;
    /**
     * Enables the NavCube.
     */
    enable(): Promise<void>;
    /**
     * Disables the NavCube.
     */
    disable(): Promise<void>;
    /**
     * Determines if model up or camera up will the preserved when navigating with the NavCube.
     * If model up is preserved, navigation with the NavCube will keep the model upright all the time.
     * If camera up is preserved, navigation with the NavCube will attempt to preserve the current up direction of
     * the camera as much as possible.
     * Defaults to `true`.
     * @param preserve If true, model up is preserved. Otherwise, camera up is preserved.
     */
    setPreserveModelUp(preserve: boolean): void;
    /**
     * Gets the NavCube preserveModelUp state.
     * @returns true if model up is preserved, false if camera up is preserved.
     */
    getPreserveModelUp(): boolean;
    /**
     * Sets the visibility for the NavCube based on the enabled and textures state.
     */
    private _updateVisibility;
    /**
     * Hides the overlay window
     */
    private _hideOverlay;
    /**
     * Shows the overlay window
     */
    private _showOverlay;
    /**
     * Gets whether the NavCube is currently enabled.
     */
    getEnabled(): boolean;
    /**
     * Gets the associated overlay id.
     */
    getOverlayId(): OverlayIndex;
    private _setTextures;
    private _updateViewport;
    private _createViewport;
    private _onViewportSet;
    private _createGeometry;
    private _createTexture;
    /** @hidden */
    _geometryHasBeenCreated(): boolean;
    /**
     * Determines whether or not a point is inside the NavCube overlay.
     * @param mousePos
     * @returns Boolean indicating whether the provided point is inside the NavCube overlay
     */
    insideOverlay(mousePos: Point2): boolean;
    /** @hidden */
    _getOverlayOffset(): Point2;
    /** @hidden */
    _getViewportSize(): OverlayUnitPoint;
    /** @hidden */
    _getViewportPixelSize(): Point2;
    /** @hidden */
    _onNoSelection(): void;
    /**
     * Called when the NavCube is clicked. Realigns the view to the side/edge/corner
     * selected by `selection`, or rotates the view 90 degrees if the selection matches
     * the current view orientation, or does nothing if no side is selected.
     * @param selection
     */
    onClickSelection(selection: SelectionItem | null): Promise<void>;
    /**
     * Called when the NavCube is "moused over". Displays face/edge/corner that will be selected.
     * @param selection
     */
    onMoveSelection(selection: SelectionItem | null): void;
    /**
     * Returns the corresponding view orientation for each node index.
     * If the node indexes change in the future, this will need to be updated.
     */
    private _getViewOrientationFromFaceIndex;
    private _setViewOrientation;
    private _getScEngine;
    private _createInstance;
    private _createCube;
    private _onCameraUpdate;
    private _updateOrientationMatrices;
    private _createSelectionFace;
    private _createQuad;
    private _makeRotationMatrixX;
    private _makeRotationMatrixY;
    private _makeRotationMatrixZ;
    private _getFaceIndexFromNodeId;
    private _getNodeIdFromFaceIndex;
    private _isSameEdge;
    private _initializeTextures;
}
