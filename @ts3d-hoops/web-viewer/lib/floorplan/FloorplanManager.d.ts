import { Point2, Color } from '@ts3d-hoops/common';
import { FloorplanOrientation, OverlayAnchor, OverlayUnit, NodeId } from '../types';
import { FloorplanConfig } from './FloorplanConfig';
import { FloorplanAutoActivation } from './types';
import { OverlayManager } from '../overlay/OverlayManager';
import { IModel } from '../core/IModel';
import { IWebViewer } from '../core/IWebViewer';
import { IScEngine } from '../core/IScEngine';
/**
 * Main interface into the 2D floorplan functionality for the viewer.
 * Can show a 2-dimensional floorplan of a BIM-enabled model. The floorplan display will
 * include an avatar that represents the camera position of the 3D view.
 */
export declare class FloorplanManager {
    private readonly _viewer;
    private readonly _model;
    private readonly _engine;
    private readonly _overlayManager;
    private _active;
    private _isSceneReady;
    private _isModelLoaded;
    private _isOverlayVisible;
    private _isCallbacksSet;
    private _onCameraUpdateFunc;
    private _onFrameDrawnFunc;
    private _floorplanNode;
    private _currentFloorInfo;
    private _config;
    private _floorLock;
    private _tightBoundings;
    private readonly _genericStoreyType;
    /** key is floor node */
    private readonly _floorInfos;
    /** This will hold the floorInfos redundantly to _floorInfos. This is really only to support
     *  simple iteration of the floorInfos with early exit ability. (ie. not calling .forEach())
     *  If we move to ES6 output, we can remove this and just  properly iterate the _floorInfos
     *  with for...of
     */
    private readonly _floorInfosArray;
    private _avatarNode;
    private _avatarDirty;
    private _borderNode;
    private _borderDirty;
    private _backgroundNode;
    private _backgroundDirty;
    /** We need to watch for the viewer size changing so we can redo the overlay geometry. */
    private _canvasSize;
    /** The sync queue is used to synchronize the activate/deactivate processes. While we can reasonably expect our users to
     *  properly call activate/deactivate with 'await', we always have the possibility of callbacks happening concurrently. To
     *  best ensure no problems, calls related to activation are thus synchronized */
    private _sync;
    /** Dedicated sync queue for setting the floorplan. This will skip any intervening changes in favor of the most recent */
    private _setFloorplanSync;
    private static readonly _genericStoreyType;
    private static readonly _ifcFloorTypes;
    private static readonly _ifcSpaceTypes;
    /** IFC types that will be used in floorplan mesh generation */
    private static readonly _ifcFloorplanCreationTypes;
    private static readonly _backgroundZ;
    private static readonly _avatarZ;
    private static readonly _borderZ;
    /** @hidden */
    constructor(viewer: IWebViewer, model: IModel, overlayManager: OverlayManager, engine: IScEngine, config: FloorplanConfig);
    /** Sets a custom avatar. See [[FloorplanConfig.customAvatar]] for detailed information. */
    setCustomAvatar(customAvatarNodeId: NodeId | null): Promise<void>;
    /** Sets the size of the floorplan overlay window. See [[FloorplanConfig.overlaySize]] for detailed information. */
    setOverlaySize(size: Point2, widthUnits: OverlayUnit, heightUnits: OverlayUnit): Promise<void>;
    /** Sets the anchor position of the floorplan overlay window. See [[FloorplanConfig.overlayAnchor]] for detailed information. */
    setOverlayAnchor(anchor: OverlayAnchor): Promise<void>;
    /** Sets the offset position of the floorplan overlay window. See [[FloorplanConfig.overlayOffset]] for detailed information. */
    setOverlayOffset(offset: Point2): Promise<void>;
    /** Sets the overlay scaling. See [[FloorplanConfig.overlayFeetPerPixel]] for detailed information. */
    setOverlayFeetPerPixel(feetPerPixel: number): Promise<void>;
    /** Sets the overlay zoom level. See [[FloorplanConfig.zoomLevel]] for detailed information. */
    setZoomLevel(zoomLevel: number): Promise<void>;
    /** Sets the overlay background color. See [[FloorplanConfig.backgroundColor]] for detailed information. */
    setBackgroundColor(color: Color): Promise<void>;
    /** Sets the overlay background opacity. See [[FloorplanConfig.backgroundOpacity]] for detailed information. */
    setBackgroundOpacity(opacity: number): Promise<void>;
    /** Sets the overlay border color. See [[FloorplanConfig.borderColor]] for detailed information. */
    setBorderColor(color: Color): Promise<void>;
    /** Sets the overlay border opacity. See [[FloorplanConfig.borderOpacity]] for detailed information. */
    setBorderOpacity(opacity: number): Promise<void>;
    /** Sets the avatar primary color. See [[FloorplanConfig.avatarColor]] for detailed information. */
    setAvatarColor(color: Color): Promise<void>;
    /** Sets the avatar outline color. See [[FloorplanConfig.avatarOutlineColor]] for detailed information. */
    setAvatarOutlineColor(color: Color): Promise<void>;
    /** Sets the avatar opacity. See [[FloorplanConfig.avatarOpacity]] for detailed information. */
    setAvatarOpacity(opacity: number): Promise<void>;
    /** Sets the avatar scale. See [[FloorplanConfig.avatarScale]] for detailed information. */
    setAvatarScale(scale: number): Promise<void>;
    /** Sets the avatar size to fixed scale. See [[FloorplanConfig.fixedAvatarScale]] for detailed information. */
    setFixedAvatarScale(fixedScale: boolean): Promise<void>;
    /** Sets the floorplan tracking mode. See [[FloorplanConfig.trackCameraEnabled]] for detailed information. */
    setTrackCameraEnabled(enabled: boolean): Promise<void>;
    /** Sets the floorplan display orientation. See [[FloorplanConfig.floorplanOrientation]] for detailed information. */
    setFloorplanOrientation(orientation: FloorplanOrientation): Promise<void>;
    /** Sets the auto-activate capability for any models loaded after this call. See [[FloorplanConfig.autoActivate]] for detailed information. */
    setAutoActivate(autoActivate: FloorplanAutoActivation): Promise<void>;
    /** Locks floorplan to current floor such that changing floors will not change the displayed floorplan. */
    setFloorLock(lock: boolean): Promise<void>;
    /** Returns `true` if displayed floor has been locked with [[setFloorLock]]. */
    getFloorLock(): boolean;
    /**
     * Makes floorplans use tight boundings during creation which can result in a better fit for the overlay.
     * This involves recreating any already existing floorplans.
     * This can be significantly more time consuming than using loose boundings if your floors are complex.
     * Defaults to `false`.
     */
    setUseTightBoundings(tightBoundings: boolean): Promise<void>;
    /**
     * Updates the floorplan to use the given configuration. This function allows
     * the user to set all configuration values with a single operation. There are
     * also `set<config-value>()` functions for easily setting individual configuration
     * values.
     *
     * Note that when using this function, all settings in the given configuration are
     * used and thus overwrite any individual settings changed with a prior
     * `set<config-value>()` call.
     *
     * All values from the passed configuration will be copied as part of this operation.
     */
    setConfiguration(config: FloorplanConfig): Promise<void>;
    /** Returns a copy of the current floorplan configuration. */
    getConfiguration(): FloorplanConfig;
    /** Gets the [[NodeId]] of the current storey. */
    getCurrentFloorNodeId(): NodeId | null;
    /** Gets the [[NodeId]] of the floorplan avatar. */
    getAvatarNodeId(): NodeId | null;
    /** Returns `true` if the given point is inside the floorplan overlay and `false` otherwise. */
    insideOverlay(point: Point2): boolean;
    /**
     *  Activate the floorplan overlay.
     */
    activate(): Promise<void>;
    /**
     *  Deactivate the floorplan overlay. Once explicitly deactivated via this call, auto-activation
     *  will be suppressed for any new model that is loaded. Auto-activation can be reenabled by
     *  calling [[setAutoActivate]].
     */
    deactivate(): Promise<void>;
    /**
     * The avatar node needs to be deleted any time we are making changes to the mesh,
     * such as switching to a custom avatar or fixed avatar scale.
     */
    private _deleteAvatarNode;
    /** Perform the steps needed to set a custom avatar. */
    private _doSetCustomAvatar;
    /** Call after something in the configuration has changed. Will update all visuals accordingly */
    private _onConfigurationChanged;
    /** Sets the best floorplan for the given world position */
    private _setFloorplanFromPosition;
    /** Sets what floor the floorplan displays based on position */
    private _doSetFloorplanFromPosition;
    /** This function performs a downward selection and sorts the results by the top of their boundings */
    private _performDownwardSelection;
    /**
     *  Will set the active state appropriately and kick off activation processing
     */
    private _activate;
    /**
     *  Deactivation will remove camera callbacks, hide the overlay, delete floornodes, and any other necessary cleanup
     */
    private _deactivate;
    /**  This will be called anytime a model has loaded... first model, second model, etc. */
    private _onModelLoaded;
    /**
     * When a model is loaded, the active state will be examined and possibly modified here based on the incoming model.
     */
    private _doOnModelLoaded;
    /**
     *  This will activate the floorplan visuals if conditions allow.
     */
    private _doUpdateActivation;
    /**
     *  Deletes all floorplan infos including generated nodes
     */
    private _deleteAllFloorplans;
    /** Hides the currently active floorplan */
    private _hideActiveFloorplan;
    /**
     *  Call when IFC information is available from the model tree. Note that this call can happen multiple
     *  times within a session, thus it must be tolerant of existing data vs new data.
     */
    private _onProcessIfc;
    /**
     */
    private _hasFloorInfo;
    /**
     */
    private _getFloorInfo;
    /**
     * Creates floorplan related information from a floor node
     */
    private _createFloorInfo;
    /**
     *  Find the root floor nodes within the model.
     */
    private _gatherFloorInfos;
    /**
     * Gathers all descendent nodes that have IFC types matching the given IFC types
     */
    private _gatherDescendentIfcNodes;
    /**
     * Creates a floorplan mesh from a FloorInfo object and returns the NodeId of the resulting mesh.
     * Note: This does not attach the created floorplan mesh to the FloorInfo param. That must be done after.
     */
    private _createFloorplanFromFloorInfo;
    /** We need to handle a canvas size updates, so use the frame-drawn callback */
    private _onFrameDrawn;
    /** Updates the overlay camera based on current state */
    private _doCameraUpdate;
    /**
     * Returns `true` if the [[FloorplanManager]] is fully active.
     */
    isActive(): boolean;
    /** Call anytime something in the floorplan overlay might need to change. */
    private _updateOverlay;
    /**
     * Call anytime something in the floorplan overlay might need to change.
     */
    private _updateOverlayNodes;
    /**
     * Moves the camera such that the avatar will appear at the provided point on the overlay.
     * This is only available when the floorplan is not tracking the camera.
     * @param point Point in canvas within overlay
     */
    snapAvatarToPoint(point: Point2): void;
    /** Figure out the pixel size of the overlay window */
    private _getOverlaySizeInPixels;
    /** Get overlay offset in pixels */
    private _getOverlayOffsetInPixels;
    private _getFixedCameraSize;
    /** Updates the camera settings for the overlay. Only update if the floorplan has changed?  */
    private _updateOverlayCamera;
    /**
     * Sets the current floorplan based on the floorNode.
     *
     * @param floorNode A IFC Story node.
     */
    private _setFloorplanFromFloorNode;
    /**
     *  Creates the floorplan overlay
     */
    private _setupOverlay;
    /** Nodes within the the overlay displays aren't honoring their visibility settings. This is a workaround
     *  until that problem is fixed. Since the floorplan is a top-down view, we can just move "hidden" nodes
     *  far enough out of the camera view so they aren't rendered.
     */
    private _hideOverlayNode;
    /** See _hideOverlayNode for workaround description */
    private _showOverlayNode;
    /** Creates a simple node to show the camera-position as an avatar on the overlay */
    private _createAvatar;
    /** Create a 2d line based box. Used for the overlay border & background */
    private _create2dBox;
}
