import { Point2, Matrix, Plane, Point3, Ray, Color, Box } from '@ts3d-hoops/common';
import { AxisTriad } from './AxisTriad';
import { Camera } from './Camera';
import { AntiAliasingMode, BloomLayerInfo, BlurIntervalUnit, ComparisonConfig, DrawMode, DrawStrategy, ElementType, GroundPlane, ImageBasedLightingOrientation, PointShape, PointSizeUnit, Projection, SimpleReflectionAttenuationUnit, TransparencyMode, ViewOrientation, XRayGroup, XRayTransparencyMode, NodeId, DrawModeName } from './types';
import { NavCube } from './NavCube';
import { LightKey } from '@ts3d-hoops/streamcache';
import { CompositeSelectionItem } from './selection/CompositeSelectionItem';
import { IncrementalSelectionId } from './selection/IncrementalSelectionId';
import { SelectionItem } from './selection/SelectionItem';
import { NodeEntitySelectionItem, NodeSelectionItem } from './selection/types';
import { VerticalGradient } from './VerticalGradient';
import { InterpolationManager } from './internal/interpolation/InterpolationManager';
import { HiddenLineSettings } from './settings/HiddenLineSettings';
import { IncrementalPickConfig, PickConfig } from './PickConfig';
import { Light } from './Light';
import { DomElements } from './internal/DomElements';
import { OverlayManager } from './overlay';
import { FloorplanManager } from './floorplan';
import { InputMonitor } from './internal/InputMonitor';
import { TimeoutMonitor } from './internal/TimeoutMonitor';
import { OperatorManager } from './OperatorManager';
import { IWebViewer } from './core/IWebViewer';
import { IScEngine } from './core/IScEngine';
import { ICallbackManager } from './core/ICallbackManager';
import { IView } from './core';
export declare class View implements IView {
    private _id;
    private readonly _statistics;
    readonly domElements: DomElements;
    private readonly _viewer;
    private readonly _engine;
    readonly overlayManager: OverlayManager;
    readonly floorplanManager: FloorplanManager;
    readonly operatorManager: OperatorManager;
    private readonly _callbackManager;
    private readonly _inputMonitor;
    private readonly _model;
    private readonly _interpolationManager;
    private readonly _eventDispatcher;
    private _backfacesVisible;
    private _initialCamera;
    private _lineVisibility;
    private _faceVisibility;
    private _boundingCalculationIgnoresInvisible;
    private _backgroundColorTop;
    private _backgroundColorBottom;
    private _drawMode;
    private _ambientOcclusionEnabled;
    private _ambientOcclusionRadius;
    private _antiAliasingMode;
    private _lightingEnabled;
    private _ambientLightColor;
    private _massageExtremeCameras;
    private _bloomEnabled;
    private _bloomThreshold;
    private _bloomThresholdRampWidth;
    private _bloomIntensityScale;
    private _bloomLayers;
    private _goochBlue;
    private _goochYellow;
    private _goochBaseColorProminence;
    private _goochLuminanceShiftStrength;
    private _toonBandCount;
    private _toonSpecularFactor;
    private _groundPlane;
    private _simpleShadowEnabled;
    private _simpleShadowColor;
    private _simpleShadowOpacity;
    private _simpleShadowResolution;
    private _simpleShadowBlurSamples;
    private _simpleShadowBlurInterval;
    private _simpleShadowInteractiveUpdateEnabled;
    private _simpleReflectionEnabled;
    private _simpleReflectionBlurInterval;
    private _simpleReflectionBlurSamples;
    private _simpleReflectionFadeAngle;
    private _simpleReflectionOpacity;
    private _simpleReflectionAttenuation;
    private _silhouetteEnabled;
    private _silhouetteColor;
    private _silhouetteOpacity;
    private _silhouetteThreshold;
    private _silhouetteThresholdRampWidth;
    private _hardEdgesEnabled;
    private _hardEdgeColor;
    private _hardEdgeOpacity;
    private _hardEdgeThreshold;
    private _hardEdgeThresholdRampWidth;
    private _imageBasedLightingEnabled;
    private _imageBasedLightingIntensity;
    private _imageBasedLightingOrientation;
    private _lineJitterEnabled;
    private _lineJitterInstanceCount;
    private _lineJitterRadius;
    private _lineJitterFrequency;
    private readonly _determineInitialAxes;
    private readonly _hiddenLineSettings;
    private _projectionMode;
    private _drawStrategy;
    private _navCube;
    private _axisTriad;
    /** @hidden */
    constructor(viewer: IWebViewer, engine: IScEngine, callbackManager: ICallbackManager, timeoutMonitor: TimeoutMonitor, interpolationManager: InterpolationManager, options: {
        id: number;
        domElements: DomElements;
    });
    get id(): number;
    get inputMonitor(): InputMonitor;
    private _initEvents;
    private _initEffects;
    private _initEventDispatcher;
    /** hidden */
    injectViewOrientationChangeEvent(): void;
    private _massageInitialCamera;
    /**
     * Sets the line visibility for the view.
     * @param lineVisibility indicates whether to draw lines.
     */
    setLineVisibility(lineVisibility: boolean): Promise<void>;
    private _setLineVisibility;
    /**
     * Gets the line visibility for the view.
     * @returns whether lines are currently being drawn.
     */
    getLineVisibility(): boolean;
    /**
     * Sets the face visibility for the view.
     * @param faceVisibility indicates whether to draw faces.
     */
    setFaceVisibility(faceVisibility: boolean): Promise<void>;
    private _setFaceVisibility;
    /**
     * Gets the face visibility for the view.
     * @returns whether faces are currently being drawn.
     */
    getFaceVisibility(): boolean;
    /**
     * Sets the projection mode.
     * @param projectionMode the projection mode to set.
     */
    setProjectionMode(projectionMode: Projection): void;
    /**
     * Gets the projection mode.
     * @returns The current projection mode.
     */
    getProjectionMode(): Projection;
    /**
     * Gets the draw strategy.
     * @returns The current draw strategy.
     */
    getDrawStrategy(): DrawStrategy;
    /**
     * Gets the view matrix.
     * @returns The current view matrix.
     */
    getViewMatrix(): Matrix;
    /**
     * Gets the projection matrix.
     * @returns The current projection matrix.
     */
    getProjectionMatrix(): Matrix;
    /**
     * This is equivalent to (projectionMatrix * viewMatrix).
     * @returns The current full camera matrix.
     */
    getFullCameraMatrix(): Matrix;
    /**
     * Creates a ray based on a viewport position.
     * @param point The (X, Y) viewport position.
     * @returns The ray if it was generated, otherwise null.
     */
    raycastFromPoint(point: Point2): Ray | null;
    /**
     * @param source
     * @param projectionMatrix
     * @param viewMatrix
     * @param viewSize
     */
    private _unproject;
    private _rectifySelectionItem;
    /** @hidden */
    private isOutsideCanvasArea;
    /**
     * Performs a picking operation from the given position on the canvas. The best candidate entity is be returned.
     * This method does not trigger a selection event.
     * This method will reject if the point is outside the canvas area.
     * @param point Canvas position to pick from.
     * @param config The configuration object used for this picking operation.
     * @returns An object containing the result of the picking operation.
     */
    pickFromPoint(point: Point2, config: PickConfig): Promise<SelectionItem>;
    /**
     * Performs a picking operation from the given position on the canvas. All candidate entities are returned.
     * This method does not trigger a selection event.
     * This method will reject if the point is outside the canvas area.
     * @param point Canvas position to pick from.
     * @param config The configuration object used for this picking operation.
     * @returns An object containing the result of the picking operation.
     */
    pickAllFromPoint(point: Point2, config: PickConfig): Promise<NodeEntitySelectionItem[]>;
    /**
     * Performs a composite picking operation.  This operation will return all candidate Node entities according to the PickConfig.
     * @param point Canvas position to pick from.
     * @param config The configuration object used for this picking operation.
     * @returns An object containing the result of the picking operation.
     */
    compositePickFromPoint(point: Point2, config: PickConfig): Promise<CompositeSelectionItem>;
    /**
     * Performs a selection operation from the given world-space ray. The best candidate entity is be returned.
     * This method does not trigger a selection event.
     * @param ray The world-space ray to perform the selection with.
     * @param config The configuration object used for this picking operation.
     * @returns An object containing the result of the picking operation.
     */
    pickFromRay(ray: Ray, config: PickConfig): Promise<SelectionItem>;
    /**
     * Performs a selection operation from the given world-space ray. All candidate entities are returned.
     * This method does not trigger a selection event.
     * @param ray The world-space ray to perform the selection with.
     * @param config The configuration object used for this picking operation.
     * @returns An object containing the result of the picking operation.
     */
    pickAllFromRay(ray: Ray, config: PickConfig): Promise<NodeEntitySelectionItem[]>;
    /**
     * Creates a new and active selection context for the provided selection window.
     * @param areaCssMin The minimum coodinate in CSS pixel space for the selection window.
     * @param areaCssMax The maximum coodinate in CSS pixel space for the selection window.
     * @param config The configuration object used for this selection operation.
     * @returns The handle for the selection context.
     */
    beginScreenSelectByArea(areaCssMin: Point2, areaCssMax: Point2, config: IncrementalPickConfig): Promise<IncrementalSelectionId>;
    /**
     * Creates a new and active selection context for the provided selection ray.
     * The ray is created at the supplied ray origin and is cast into the scene.
     * Faces are selected if they lie along the ray.
     * Lines and points are selected if they lie within the ray's box radius.
     *
     * Note: Somewhat confusingly ray drill selection is actually a selection by volume.
     * The provided ray origin and radius are used to create a frustum to preform the selection.
     * This has some consequences. For example, the `SelectionResult`s returned by advancing a
     * ray drill selection will not have selection positions, since they were not selected at
     * a single point.
     * @param rayCssOrigin The coordinate in CSS pixel space for the selection ray's origin.
     * @param rayCssBoxRadius The radius around the ray in CSS pixel space used for line and point selection proximity.
     * @param config The configuration object used for this selection operation.
     * @returns The handle for the selection context.
     */
    beginRayDrillSelection(rayCssOrigin: Point2, rayCssBoxRadius: number, config: IncrementalPickConfig): Promise<IncrementalSelectionId>;
    /**
     * Creates a new and active selection context for the provided selection volume.
     * The selection volume is a convex polyhedron defined by the bounded intersection of its half-spaces.
     * @param volumePlanes The planes used to define volume. A point p is inside the volume if and only if (plane.determineSide(p) == true) for all supplied planes.
     * @param heuristicOrigin A point used to compute distances against for prioritizing returned results. This is typically (but not necessarily) the center of the volume.
     * @param config The configuration object used for this selection operation.
     * @returns The handle for the selection context.
     */
    beginConvexPolyhedronSelection(volumePlanes: Plane[], heuristicOrigin: Point3, config: IncrementalPickConfig): Promise<IncrementalSelectionId>;
    /**
     * Creates a new and active selection context for the provided selection sphere.
     * @param sphereCenter The center of the selection sphere.
     * @param sphereRadius The radius of the selection sphere.
     * @param config The configuration object used for this selection operation.
     * @returns The handle for the selection context.
     */
    beginSphereSelection(sphereCenter: Point3, sphereRadius: number, config: IncrementalPickConfig): Promise<IncrementalSelectionId>;
    /**
     * Deactivates and destroys the provided selection context.
     * @param handle The selection context to destroy.
     */
    endIncrementalSelection(handle: IncrementalSelectionId): Promise<void>;
    private _endIncrementalSelection;
    /**
     * Returns the next batch of geometry selected by the supplied selection context.
     * @param handle The handle to an active area selection context.
     * @returns Returns selected items. If the resulting list is null then there are no more items to select.
     */
    advanceIncrementalSelection(handle: IncrementalSelectionId): Promise<NodeSelectionItem[] | null>;
    /**
     * Projects a 3d world space point to a 3d screen space point.
     * @param source world space point to be projected.
     * @param camera if a camera is provided, its projection and view matrix will be used.
     * @returns point projected into 3d screen space.
     */
    projectPoint(source: Point3, camera?: Camera): Point3;
    /**
     * @param source
     * @param projectionMatrix
     * @param viewMatrix
     * @param viewSize
     */
    private _project;
    /**
     * Unprojects a 2d screen space point to a 3d world space point.
     * @param point 2d screen space
     * @param z z value, default 0
     * @returns point world space point
     */
    unprojectPoint(point: Point2, z: number): Point3 | null;
    /**
     * Creates a normalized window position in the range of (-1, 1) for a given point in window space.
     * @returns the normalized window position
     */
    pointToWindowPosition(pt: Point2): Point2;
    /**
     * Sets the camera that will be used for the initial camera view.
     * @param camera
     */
    setInitialCamera(camera: Camera): void;
    /**
     * Sets the current camera
     * @param camera the camera to set
     * @param duration camera transition time in milliseconds
     */
    setCamera(camera: Camera | null, duration?: number): boolean;
    /** @hidden */
    _setCameraPromise(camera: Camera, duration: number): Promise<void>;
    private _setCameraImpl;
    private _interpolateCamera;
    /**
     * Updates camera properties individually. This method should be used to incrementally update camera properties individually.
     * @param camera the camera to set.
     * @returns updated camera object.
     */
    updateCamera(camera: Camera): Camera;
    /**
     * Resets the camera to the initial view of the model when first loaded.
     * @param duration the amount of time in milliseconds that the camera transition between the current and initial view should take.
     */
    resetCamera(duration?: number): Promise<void>;
    /**
     * Unsets the default camera. After this is called the next camera to be set will be the new default
     */
    unsetDefaultCamera(): void;
    /**
     * Gets the current camera
     * @returns the current camera
     */
    getCamera(): Camera;
    /**
     * Returns a camera set to a ViewOrientation
     * @param orientation The desired view orientation for the camera.
     * @param bounding Optional bounding to fit the camera about. If not supplied, the model bounding will be used.
     */
    getViewOrientationCamera(orientation: ViewOrientation, bounding?: Box, preserveModelUp?: boolean): Promise<Camera>;
    /**
     * Sets the view to a standard orientation.
     * @param orientation The desired view orientation for the camera.
     * @param duration The number of milliseconds used to transition to the new camera.
     * @param bounding Optional bounding to fit the camera about. If not supplied, the model bounding will be used.
     * @param preserveModelUp Indicates whether the camera up will be set according to model up or current camera.
     */
    setViewOrientation(orientation: ViewOrientation, duration?: number, bounding?: Box, preserveModelUp?: boolean): Promise<void>;
    /**
     * Centers the camera on a specified node id.
     * @param nodeId
     * @param duration the number of milliseconds to transition to the new camera.
     */
    centerCameraOnNode(nodeId: NodeId, duration?: number, camera?: Camera): Promise<void>;
    /** @hidden */
    _setInitialView(duration: number): Promise<void>;
    /**
     * Returns the size of the viewer canvas.
     * @returns the current size of the viewer canvas.
     */
    getCanvasSize(): Point2;
    /**
     * Sets the display for the default statistic overlay.
     * @param visibility whether the default statistics overlay should be drawn.
     */
    setStatisticsDisplayVisibility(visibility: boolean): Promise<void>;
    /**
     * Returns the background colors of the canvas.
     * @returns the canvas background colors.
     */
    getBackgroundColor(): VerticalGradient;
    /**
     * Sets the viewer background color to a gradient interpolating from the top to bottom color.
     * For a solid color, the top and bottom color should have the same values.
     * Background Transparency is only available with client-side rendering.
     * To re-enable a transparent background, pass null to the parameters of this function.
     *
     * When draw mode is set to "HiddenLine" ({@link DrawModeName}), the background color is defined in {@link HiddenLineSettings HiddenLineSettings}.
     * See {@link HiddenLineSettings.setBackgroundColor HiddenLineSettings.setBackgroundColor}.
     * @param top the top color for the the background gradient.
     * @param bottom the bottom color for the the background gradient.
     * @returns a promise that resolves when the operation has completed.
     */
    setBackgroundColor(top?: Color | null, bottom?: Color | null): Promise<void>;
    /**
     * Hides all nodes except those specified. Also fits the camera to those nodes' bounding box.
     * @param nodeIds An array of the node IDs to be isolated.
     * @param duration Time in milliseconds for the camera transition to the new camera view.
     * @param fitNodes If true, then the view is fitted around the isolated nodes.
     * @param initiallyHiddenStayHidden Controls whether or not initially hidden geometries stay hidden. Default behavior is driven by [[setBehaviorInitiallyHidden]].
     */
    isolateNodes(nodeIds: NodeId[], duration?: number, fitNodes?: boolean, initiallyHiddenStayHidden?: boolean | null): Promise<void>;
    /**
     * Fits the camera to the bounding box containing the node ids.
     * @param ids Array of node ids to fit the camera.
     * @param duration Time in milliseconds for the camera transition to the new camera view.
     * @returns A promise that will be resolved once the transition is complete.
     */
    fitNodes(ids: NodeId[], duration?: number): Promise<void>;
    /**
     * Fits the view to the model bounding box.
     * @param duration the number of milliseconds to transition to the new camera.
     * @returns A promise that will be resolved once the transition is complete.
     */
    fitWorld(duration?: number, camera?: Camera): Promise<void>;
    private _fitCameraToBounding;
    /**
     * Fits the camera to the bounding box.
     * @param bounding bounding box to fit the camera.
     * @param duration Time in milliseconds for the camera transition to the new camera view.
     * @returns A promise that will be resolved once the transition is complete.
     */
    fitBounding(bounding: Box, duration?: number, camera?: Camera): Promise<void>;
    /**
     * Sets whether backfaces should be rendered in the scene.
     * @param visible Boolean value indicating whether backfaces should be rendered.
     * @returns Promise that is resolved when this operation has completed.
     */
    setBackfacesVisible(visible: boolean): Promise<void>;
    /**
     * Gets whether backfaces are being rendered in the scene.
     * @returns Boolean value indicating whether backfaces are being rendered in the scene.
     */
    getBackfacesVisible(): boolean;
    /**
     * Sets the drawing mode for the scene.
     * @param drawMode The drawing mode to set.
     *
     * @deprecated Calling setDrawMode with a DrawMode is deprecated and will be removed in a future release. Please use setDrawMode with a DrawModeName instead.
     *
     */
    setDrawMode(drawMode: DrawMode): Promise<void>;
    /**
     * Sets the drawing mode for the scene.
     * @param drawMode The drawing mode to set, specified as a DrawModeName.
     */
    setDrawMode(drawMode: DrawModeName): Promise<void>;
    private _setDrawMode;
    /**
     * @returns The current draw mode
     *
     * @deprecated Calling getDrawMode is deprecated and the API will change to return a DrawModeName in a future release. Please use getDrawModeName instead.
     */
    getDrawMode(): DrawMode;
    /**
     * @returns The current draw mode name
     */
    getDrawModeName(): DrawModeName;
    /**
     * Sets the anti-aliasing mode for the scene.
     * @param antiAliasingMode
     */
    setAntiAliasingMode(antiAliasingMode: AntiAliasingMode): Promise<void>;
    private _setAntiAliasingMode;
    /**
     * Gets the anti-aliasing mode for the scene. The Default value is AntiAliasingMode.SMAA
     * @returns the current anti-aliasing mode.
     */
    getAntiAliasingMode(): AntiAliasingMode;
    /**
     * @returns a [[HiddenLineSettings]] object.
     */
    getHiddenLineSettings(): HiddenLineSettings;
    /**
     * Sets whether ambient occlusion is enabled
     * @param enabled sets whether ambient occlusion will be enabled
     */
    setAmbientOcclusionEnabled(enabled?: boolean): Promise<void>;
    private _setAmbientOcclusionEnabled;
    /**
     * @returns boolean value indicating whether ambient occlusion is enabled
     */
    getAmbientOcclusionEnabled(): boolean;
    /**
     * Sets the ambient occlusion radius. This value represents the maximum screen-proportional distance between two points such that one will cast a shadow on the other.
     * @param radius the ambient occlusion radius.
     */
    setAmbientOcclusionRadius(radius: number): Promise<void>;
    private _setAmbientOcclusionRadius;
    /**
     * @returns the ambient occlusion radius
     */
    getAmbientOcclusionRadius(): number;
    /**
     * Sets whether lighting is enabled. When disabled, material colors
     * are drawn at full intensity.
     *
     * See also [[InstanceModifier.DoNotLight]], [[clearLights]].
     */
    setLightingEnabled(enabled?: boolean): Promise<void>;
    private _setLightingEnabled;
    /**
     * Returns whether lighting is enabled.
     *
     * See also [[setLightingEnabled]].
     */
    getLightingEnabled(): boolean;
    /**
     * Sets how transparent objects are blended.
     */
    setTransparencyMode(mode: TransparencyMode): void;
    /**
     * Sets the opacity of unselected items in x-ray mode.
     * @param opacity a number between 0 and 1
     * @param element the type of element to which the opacity will apply.
     * If unspecified, the opacity will apply to all element types.
     */
    setXRayOpacity(opacity: number, element?: ElementType): Promise<void>;
    private _setXRayOpacity;
    /**
     * Sets how transparent (unselected) objects are blended in x-ray mode.
     */
    setXRayTransparencyMode(mode: XRayTransparencyMode): Promise<void>;
    private _setXRayTransparencyMode;
    /**
     * Sets the color applied to nodes in x-ray mode.
     * By default, the color is unset.
     *
     * See [[unsetXRayColor]].
     *
     * @param element the type of geometry to apply the color to
     * @param color the color to apply
     * @param group the category of nodes that will be affected.
     * If unspecified, [[XRayGroup.Selected]] will be used.
     */
    setXRayColor(element: ElementType, color: Color, group?: XRayGroup): Promise<void>;
    /**
     * Unsets the color applied to selected items in x-ray mode.
     * Selected items will be displayed without overriding their colors.
     *
     * See [[setXRayColor]].
     *
     * @param element the type of geometry affected by the change
     * @param group the category of nodes that will be affected.
     * If unspecified, [[XRayGroup.Selected]] will be used.
     */
    unsetXRayColor(element: ElementType, group?: XRayGroup): Promise<void>;
    /**
     * Sets the value to use as the blue tone in Gooch shading.
     * @param blue the blue tone.  This value should be in the range [0,1]
     */
    setGoochBlue(blue: number): void;
    /**
     * Gets the value to use as the blue tone in Gooch shading.
     */
    getGoochBlue(): number;
    /**
     * Sets the prominence of the object's base color in Gooch shading.
     * @param prominence this scalar value determines the amount of the object's base color is applied to the final shaded color.
     */
    setGoochBaseColorProminence(prominence: number): void;
    /**
     * Gets the prominence of the object's base color in Gooch shading.
     */
    getGoochBaseColorProminence(): number;
    /**
     * Sets the value to use as the yellow tone in Gooch shading.
     * @param yellow the yellow tone. This value should be in the range [0,1]
     *
     */
    setGoochYellow(yellow: number): void;
    /**
     * Gets the value to use as the yellow tone in Gooch shading.
     */
    getGoochYellow(): number;
    /**
     * Sets the number of discrete shading bands that will be used when toon shading is enabled.  Each band represents a shade between dark and light which will control the final color of the pixel based on its light intensity.  The default band count is 3.
     */
    setToonShadingBandCount(bandCount: number): void;
    /**
     * Gets the current number of discrete shading bands that will be used when toon shading is enabled.
     */
    getToonShadingBandCount(): number;
    /**
     * Sets a scale factor which controls the size of specular highlights when toon shading is enabled.  The default value is 1.0.
     */
    setToonShadingSpecularFactor(specularFactor: number): void;
    /**
     * Gets the current toon shading specular scale factor.
     */
    getToonShadingSpecularFactor(): number;
    /**
     * Sets the strength of the luminance shift in Gooch shading.
     * @param shiftStrength this scalar values determines the amount of luminance shift that is applied to the object's base color
     */
    setGoochLuminanceShiftStrength(shiftStrength: number): void;
    /**
     * Gets the strength of the luminance shift in Gooch shading.
     */
    getGoochLuminanceShiftStrength(): number;
    /**
     * Sets the diameter of rendered points. (default: 1, ScreenPixels) See [[PointSizeUnit]].
     */
    setPointSize(size: number, unit: PointSizeUnit): Promise<void>;
    private _setPointSize;
    /**
     * Gets the diameter of rendered points. See [[PointSizeUnit]].
     */
    getPointSize(): Promise<[number, PointSizeUnit]>;
    /**
     * Controls the appearance of rendered points. (default: Square) See [[PointShape]].
     */
    setPointShape(shape: PointShape): Promise<void>;
    private _setPointShape;
    /**
     * Gets the PointShape. See [[PointShape]]
     */
    getPointShape(): Promise<PointShape>;
    /**
     * Enables or disables eye-dome lighting for point clouds. (default: disabled)
     */
    setEyeDomeLightingEnabled(enabled?: boolean): Promise<void>;
    private _setEyeDomeLightingEnabled;
    /**
     * @returns boolean value indicating if eye-dome lighting is enabled or disabled.
     */
    getEyeDomeLightingEnabled(): Promise<boolean>;
    /**
     * Sets the diameter of the blur filter used in eye-dome lighting for point clouds.
     * Setting the value to 0 will disable blurring. (default: 7)
     */
    setEyeDomeLightingBlurSamples(value: number): Promise<void>;
    private _setEyeDomeLightingBlurSamples;
    /**
     * Returns the diameter of the blur filter used in eye-dome lighting for point clouds.
     * A value of 0 means that blurring is disabled.
     */
    getEyeDomeLightingBlurSamples(): Promise<number>;
    /**
     * Sets the distance in pixels between samples taken by the blur filter used in eye-dome lighting
     * for point clouds. (default: 1)
     */
    setEyeDomeLightingBlurInterval(value: number): Promise<void>;
    private _setEyeDomeLightingBlurInterval;
    /**
     * Returns the distance in pixels between samples taken by the blur filter used in eye-dome lighting
     * for point clouds.
     */
    getEyeDomeLightingBlurInterval(): Promise<number>;
    /**
     * Controls the maximum Z-distance between samples taken by the blur filter used in eye-dome
     * lighting for point clouds. The value is taken as a proportion of the screen size.
     * Decreasing the value will result in sharper edges, and increasing the value will result
     * in softer edges. (default: .03)
     */
    setEyeDomeLightingBlurEdgeDistance(value: number): Promise<void>;
    private _setEyeDomeLightingBlurEdgeDistance;
    /**
     * Returns a value that controls the maximum Z-distance between samples taken by
     * the blur filter used in eye-dome lighting for point clouds.
     * The value is a proportion of the screen size.
     */
    getEyeDomeLightingBlurEdgeDistance(): Promise<number>;
    /**
     * Controls the shading contrast in eye-dome lighting for point clouds. The value is taken
     * as a number of pixels. Increasing the value will result in overall lighter shading, and
     * decreasing the value will result in overall darker shading. (default: 2)
     */
    setEyeDomeLightingShadingEdgeDistance(value: number): Promise<void>;
    private _setEyeDomeLightingShadingEdgeDistance;
    /**
     * Returns a value that controls the shading contrast in eye-dome lighting for point clouds.
     * The value is a number of pixels.
     */
    getEyeDomeLightingShadingEdgeDistance(): Promise<number>;
    /**
     * Sets the opacity of the shading rendered by eye-dome lighting for point clouds. (default: 1)
     * @param value A number in the range [0,1].
     */
    setEyeDomeLightingOpacity(value: number): Promise<void>;
    private _setEyeDomeLightingOpacity;
    /**
     * Returns the opacity of the shading rendered by eye-dome lighting for point clouds.
     * The value is in the range [0,1].
     */
    getEyeDomeLightingOpacity(): Promise<number>;
    /**
     * Sets whether or not bounding calculations by this View object ignores invisible geometry.
     */
    setBoundingCalculationIgnoresInvisible(value: boolean): void;
    /**
     * @returns whether or not bounding calculations by this View object ignores invisible geometry.
     */
    getBoundingCalculationIgnoresInvisible(): boolean;
    /**
     * Sets whether intermediate frames of an incremental draw will be displayed. (default: true)
     *
     * If false, the image will only be displayed once completely drawn, except immediately
     * after certain operations, such as setting the camera. To disable these exceptions,
     * call [[setInteractiveDrawDelay]] with a value of 0.
     */
    setDisplayIncompleteFrames(value: boolean): Promise<void>;
    private _setDisplayIncompleteFrames;
    /**
     * Sets whether to change cad view cameras with extreme values to functionally identical cameras with
     * better behavior. This should be disabled if it is important that cameras have their authored values
     * Default: true
     * @param value Whether to modify cameras
     */
    setMassageExtremeCameras(value: boolean): void;
    getMassageExtremeCameras(): boolean;
    /**
     * Sets how long after certain operations, such as setting the camera, to wait before
     * starting a redraw. This delay exists in order to prevent flicker during continuous
     * interaction. The initial value is 200ms.
     * @param value The delay in milliseconds
     */
    setInteractiveDrawDelay(value: number): Promise<void>;
    private _setInteractiveDrawDelay;
    /**
     * Sets whether or not the viewer will periodically attempt to increase the amount drawn during interaction.
     * Setting this to `false` may improve periodic framerate dips caused by such adjustments.
     * @param enable
     */
    setInteractiveDrawLimitIncreaseEnabled(enable: boolean): void;
    /**
     * Gets whether or not the viewer will periodically attempt to increase the amount drawn during interaction.
     * @return boolean value indicating whether this feature is enabled or not
     */
    getInteractiveDrawLimitIncreaseEnabled(): Promise<boolean>;
    /**
     * Sets a minimum frame rate that will be maintained by this views.
     * The view will use various culling techniques in order to maintain the value passed in.
     *
     * Passing `0` will cause the entire scene to be drawn for every frame.
     * @param minimum The minimum framerate to be maintained by this view.
     */
    setMinimumFramerate(minimum: number): void;
    /**
     * Forces the a redraw of this view.
     * @param callback A function to be called once the draw is complete.
     * This is provided instead of a `Promise` to ensure the callback is
     * called before the start of another redraw.
     */
    redraw(callback?: () => void): void;
    getNavCube(): NavCube;
    get navCube(): NavCube;
    getAxisTriad(): AxisTriad;
    get axisTriad(): AxisTriad;
    private _determineViewAxes;
    /**
     * Sets the color of the ambient light applied to the scene.
     * This is a constant source of light that affects every point
     * in the scene in the same way regardless of position
     * or surface normal.
     *
     * See also [[getAmbientLightColor]].
     */
    setAmbientLightColor(value: Color): void;
    /**
     * Gets the color of the ambient light applied to the scene.
     *
     * See also [[setAmbientLightColor]].
     */
    getAmbientLightColor(): Color;
    /**
     * Get the list of light keys in the scene.
     * @returns The list of light keys in the scene.
     */
    getLightKeys(): Promise<LightKey[]>;
    /**
     * Get a Light given its key if it exists.
     * @param key The key of the light to get.
     * @returns A Light given its key if it exists.
     */
    getLight(key: LightKey): Promise<Light | undefined>;
    /**
     * Removes all lights from the scene. When there are no lights,
     * material colors are drawn at full intensity. This has the same
     * visual effect as calling `setLightingEnabled(false)`.
     *
     * See also:
     *  - [[InstanceModifier.DoNotLight]]
     *  - [[setLightingEnabled]]
     */
    clearLights(): void;
    /**
     * Adds a light to the scene. The returned promise may be rejected if
     * there are too many lights in the scene. See [[Light]].
     *
     * See also:
     *  - [[clearLights]]
     *  - [[removeLight]]
     *  - [[updateLight]]
     *  - [[setAmbientLightColor]]
     */
    addLight(light: Light): Promise<LightKey>;
    /**
     * removes a light from the scene. See [[Light]].
     *
     * See also:
     *  - [[addLight]]
     *  - [[clearLights]]
     *  - [[updateLight]]
     */
    removeLight(key: LightKey): void;
    /**
     * Updates a light in the scene. See [[Light]].
     *
     * See also:
     *  - [[addLight]]
     *  - [[clearLights]]
     *  - [[removeLight]]
     */
    updateLight(key: LightKey, light: Light): void;
    /**
     * Sets whether bloom is enabled.
     *
     * See [[getBloomEnabled]].
     */
    setBloomEnabled(value?: boolean): void;
    /**
     * Returns whether bloom is enabled.
     *
     * See [[setBloomEnabled]].
     */
    getBloomEnabled(): boolean;
    /**
     * Sets the minimum luminance value a pixel must have for it to
     * contribute to bloom. The value should be in the range `[0,1]`.
     *
     * See [[getBloomThreshold]], [[setBloomThresholdRampWidth]].
     */
    setBloomThreshold(value: number): void;
    /**
     * Returns the minimum luminance value a pixel must have for it to
     * contribute to bloom.
     *
     * See [[setBloomThreshold]], [[getBloomThresholdRampWidth]].
     */
    getBloomThreshold(): number;
    /**
     * Sets how much greater than the threshold set by [[setBloomThreshold]]
     * a pixel's luminance value must be before it contributes fully to
     * the bloom effect.
     *
     * If the pixel's luminance value does not exceed
     * the threshold by at least the amount set by this function,
     * the pixel's contribution will be diminished based on how close
     * its luminance value is to the threshold.
     *
     * See [[getBloomThresholdRampWidth]].
     */
    setBloomThresholdRampWidth(value: number): void;
    /**
     * Returns how much greater than the threshold set by [[setBloomThreshold]]
     * a pixel's luminance value must be before it contributes fully to
     * the bloom effect.
     *
     * See [[setBloomThresholdRampWidth]].
     */
    getBloomThresholdRampWidth(): number;
    /**
     * Sets the intensity of the bloom effect. This value is multiplied
     * by the intensities of the individual layers set by [[setBloomLayers]].
     *
     * See [[getBloomIntensityScale]].
     */
    setBloomIntensityScale(value: number): void;
    /**
     * Gets the intensity of the bloom effect.
     *
     * See [[setBloomIntensityScale]].
     */
    getBloomIntensityScale(): number;
    /**
     * Sets the number of layers in the bloom effect and the layers'
     * attributes.
     *
     * The bloom effect is achieved by applying a luminance filter to the
     * source image, then progressively downsampling, blurring, and adding
     * the results together. The result of each downsample/blur operation is
     * fed into the next, which is executed at half the resolution of the
     * previous. The number of stages and the behavior of each stage
     * are controlled by this function.
     *
     * See [[BloomLayerInfo]], [[getBloomLayers]].
     */
    setBloomLayers(layers: BloomLayerInfo[]): void;
    /**
     * Returns an array of objects describing each layer in the bloom
     * effect.
     *
     * See [[setBloomLayers]].
     */
    getBloomLayers(): BloomLayerInfo[];
    /**
     * Enables a visual comparison of two sets of nodes. The nodes specified
     * by `nodeIdSet1` are filled with one color, the nodes specified by
     * `nodeIdSet2` with another color, and overlapping areas are filled
     * with a third color.
     *
     * See [[endComparison]].
     *
     * @param nodeIdSet1 the nodes to compare against `nodeIdSet2`
     * @param nodeIdSet2 the nodes to compare against `nodeIdSet1`
     * @param config settings controlling the behavior of the comparison
     */
    startComparison(nodeIdSet1: NodeId[], nodeIdSet2: NodeId[], config?: ComparisonConfig): void;
    /**
     * Disables a visual comparison of two sets of nodes enabled by
     * [[startComparison]].
     */
    endComparison(): void;
    /**
     * Enables or disables a full-scene shadow projected onto an
     * invisible ground plane.
     *
     * See also:
     *  - [[getSimpleShadowEnabled]]
     *  - [[setSimpleShadowColor]]
     *  - [[setSimpleShadowOpacity]]
     *  - [[setGroundPlane]]
     *  - [[setSimpleShadowResolution]]
     *  - [[setSimpleShadowInteractiveUpdateEnabled]]
     *
     * @param value Whether simple shadows should be enabled.
     */
    setSimpleShadowEnabled(value?: boolean): void;
    /**
     * Returns whether simple shadows are enabled.
     *
     * See [[setSimpleShadowEnabled]].
     */
    getSimpleShadowEnabled(): boolean;
    /**
     * Sets the color of simple shadows.
     *
     * See also:
     *  - [[getSimpleShadowColor]]
     *  - [[setSimpleShadowEnabled]]
     *
     * @param color The color to set.
     */
    setSimpleShadowColor(color: Color): void;
    /**
     * Returns the color of simple shadows.
     *
     * See also:
     *  - [[setSimpleShadowColor]]
     *  - [[setSimpleShadowEnabled]]
     */
    getSimpleShadowColor(): Color;
    /**
     * Sets the opacity of simple shadows.
     *
     * See also:
     *  - [[getSimpleShadowOpacity]]
     *  - [[setSimpleShadowEnabled]]
     *
     * @param opacity The opacity to set.
     */
    setSimpleShadowOpacity(opacity: number): void;
    /**
     * Returns the opacity of simple shadows.
     *
     * See also:
     *  - [[setSimpleShadowOpacity]]
     *  - [[setSimpleShadowEnabled]]
     */
    getSimpleShadowOpacity(): number;
    /**
     * Defines the invisible ground plane onto which simple shadows
     * and reflections are projected.
     *
     * See also:
     *  - [[getGroundPlane]]
     *  - [[setSimpleShadowEnabled]]
     *  - [[setSimpleReflectionEnabled]]
     *
     * @param plane The plane to set.
     */
    setGroundPlane(plane: GroundPlane): void;
    private _updateGroundPlane;
    /**
     * Returns information about the invisible ground plane onto which
     * simple shadows and reflections are projected.
     *
     * See also:
     *  - [[setGroundPlane]]
     */
    getGroundPlane(): GroundPlane;
    /**
     * Sets the width and height in pixels of the texture image into which
     * simple shadows are drawn.
     *
     * See also:
     *  - [[getSimpleShadowResolution]]
     *  - [[setSimpleShadowEnabled]]
     *
     * @param pixels The resolution to set.
     */
    setSimpleShadowResolution(pixels: number): void;
    /**
     * Returns the width and height in pixels of the texture image
     * into which simple shadows are drawn.
     *
     * See also:
     *  - [[getSimpleShadowResolution]]
     *  - [[setSimpleShadowEnabled]]
     */
    getSimpleShadowResolution(): number;
    /**
     * Sets the diameter of the blur filter used for simple shadows.
     * Setting the value to `0` will disable blurring.
     *
     * See also:
     *  - [[getSimpleShadowBlurSamples]]
     *  - [[setSimpleShadowEnabled]]
     *
     * @param value The number of samples.
     */
    setSimpleShadowBlurSamples(value: number): void;
    /**
     * Returns the diameter of the blur filter used for simple shadows.
     *
     * See also:
     *  - [[setSimpleShadowBlurSamples]]
     *  - [[setSimpleShadowEnabled]]
     */
    getSimpleShadowBlurSamples(): number;
    /**
     * Sets the distance in pixels between samples taken by the blur filter
     * used for simple shadows.
     *
     * See also:
     *  - [[getSimpleShadowBlurInterval]]
     *  - [[setSimpleShadowEnabled]]
     *
     * @param value The interval to set.
     */
    setSimpleShadowBlurInterval(value: number): void;
    /**
     * Returns the distance in pixels between samples taken by the blur
     * filter used for simple shadows.
     *
     * See also:
     *  - [[setSimpleShadowBlurInterval]]
     *  - [[setSimpleShadowEnabled]]
     */
    getSimpleShadowBlurInterval(): number;
    /**
     * Enables or disables updates to simple shadows during user
     * interaction.
     *
     * See also:
     *  - [[getSimpleShadowInteractiveUpdateEnabled]]
     *  - [[setSimpleShadowEnabled]]
     */
    setSimpleShadowInteractiveUpdateEnabled(value?: boolean): void;
    /**
     * Returns whether simple shadows will be updated during user
     * interaction.
     *
     * See also:
     *  - [[setSimpleShadowInteractiveUpdateEnabled]]
     *  - [[setSimpleShadowEnabled]]
     */
    getSimpleShadowInteractiveUpdateEnabled(): boolean;
    /**
     * Enables or disables silhouette edges.
     *
     * Silhouette edges are always enabled in hidden line mode.
     *
     * See also:
     * - [[getSilhouetteEnabled]]
     * - [[setSilhouetteColor]]
     * - [[setSilhouetteOpacity]]
     * - [[setSilhouetteThreshold]]
     * - [[setSilhouetteThresholdRampWidth]]
     *
     * @param value Whether silhouette edges should be enabled.
     */
    setSilhouetteEnabled(value?: boolean): void;
    /**
     * Returns whether silhouette edges are enabled.
     *
     * Silhouette edges are always enabled in hidden line mode, regardless
     * of the return value.
     *
     * See [[setSilhouetteEnabled]].
     */
    getSilhouetteEnabled(): boolean;
    /**
     * Sets the color of silhouette edges.
     *
     * See also:
     * - [[getSilhouetteColor]]
     * - [[setSilhouetteEnabled]]
     *
     * @param value The color to set.
     */
    setSilhouetteColor(value: Color): void;
    /**
     * Returns the color of silhouette edges.
     *
     * See also:
     * - [[setSilhouetteColor]]
     * - [[setSilhouetteEnabled]]
     */
    getSilhouetteColor(): Color;
    /**
     * Sets the opacity of silhouette edges.
     *
     * See also:
     * - [[getSilhouetteOpacity]]
     * - [[setSilhouetteEnabled]]
     *
     * @param value The opacity to set.
     */
    setSilhouetteOpacity(value: number): void;
    /**
     * Returns the opacity of silhouette edges.
     *
     * See also:
     * - [[setSilhouetteOpacity]]
     * - [[setSilhouetteEnabled]]
     */
    getSilhouetteOpacity(): number;
    /**
     * Sets the distance threshold for silhouette edges. This value
     * affects the minimum z-distance required between two pixels
     * for an edge to be drawn. A smaller value will result in more edges
     * being drawn on finer details.
     *
     * The value is a proportion of the canvas size and not a world-space
     * distance.
     *
     * See also:
     * - [[getSilhouetteThreshold]]
     * - [[setSilhouetteThresholdRampWidth]]
     * - [[setSilhouetteEnabled]]
     *
     * @param value The threshold to set.
     */
    setSilhouetteThreshold(value: number): void;
    /**
     * Returns the distance threshold for silhouette edges. This value
     * affects the minimum z-distance required between two pixels
     * for an edge to be drawn. A smaller value will result in more edges
     * being drawn on finer details.
     *
     * The value is a proportion of the canvas size and not a world-space
     * distance.
     *
     * See also:
     * - [[setSilhouetteThreshold]]
     * - [[setSilhouetteThresholdRampWidth]]
     * - [[setSilhouetteEnabled]]
     *
     */
    getSilhouetteThreshold(): number;
    /**
     * Controls how quickly edges fade as z-distance between pixels
     * decreases.
     *
     * This value is added to the one set by [[setSilhouetteThreshold]]
     * to create a secondary threshold. Distances greater than the
     * secondary threshold will result in edges with full opacity, and
     * distances between the two thresholds will result in edges with
     * reduced opacity.
     *
     * Setting this value to `0` will cause all edges to be drawn
     * at full opacity.
     *
     * See also:
     * - [[getSilhouetteThresholdRampWidth]]
     * - [[setSilhouetteEnabled]]
     */
    setSilhouetteThresholdRampWidth(value: number): void;
    /**
     * Returns the value set by [[setSilhouetteThresholdRampWidth]].
     *
     * This value is added to the one set by [[setSilhouetteThreshold]]
     * to create a secondary threshold. Distances greater than the
     * secondary threshold will result in edges with full opacity, and
     * distances between the two thresholds will result in edges with
     * reduced opacity.
     *
     * A value of `0` means that all edges are drawn at full opacity.
     *
     * See also:
     * - [[setSilhouetteThresholdRampWidth]]
     * - [[setSilhouetteEnabled]]
     */
    getSilhouetteThresholdRampWidth(): number;
    /**
     * Enables or disables hard edges. Hard edges are edges between two
     * faces whose normals diverge beyond a given angle.
     *
     * Hard edges are always enabled in hidden line mode.
     *
     * See also:
     * - [[getHardEdgesEnabled]]
     * - [[setHardEdgeColor]]
     * - [[setHardEdgeOpacity]]
     * - [[setHardEdgeThreshold]]
     * - [[setHardEdgeThresholdRampWidth]]
     *
     * @param value Whether hard edges should be enabled.
     */
    setHardEdgesEnabled(value?: boolean): void;
    /**
     * Returns whether hard edges are enabled. Hard edges are edges between
     * two faces whose normals diverge beyond a given angle.
     *
     * Hard edges are always enabled in hidden line mode, regardless of the
     * return value.
     *
     * See [[setHardEdgesEnabled]].
     */
    getHardEdgesEnabled(): boolean;
    /**
     * Sets the color of hard edges.
     *
     * See also:
     * - [[getHardEdgeColor]]
     * - [[setHardEdgesEnabled]]
     *
     * @param value The color to set.
     */
    setHardEdgeColor(value: Color): void;
    /**
     * Returns the color of hard edges.
     *
     * See also:
     * - [[setHardEdgeColor]]
     * - [[setHardEdgesEnabled]]
     */
    getHardEdgeColor(): Color;
    /**
     * Sets the opacity of hard edges.
     *
     * See also:
     * - [[getHardEdgeOpacity]]
     * - [[setHardEdgesEnabled]]
     *
     * @param value The opacity to set.
     */
    setHardEdgeOpacity(value: number): void;
    /**
     * Returns the opacity of hard edges.
     *
     * See also:
     * - [[setHardEdgeOpacity]]
     * - [[setHardEdgesEnabled]]
     */
    getHardEdgeOpacity(): number;
    /**
     * Sets the angle threshold for hard edges. Edges will be drawn between
     * two faces whose normals diverge beyond this angle.
     *
     * See also:
     * - [[getHardEdgeThreshold]]
     * - [[setHardEdgeThresholdRampWidth]]
     * - [[setHardEdgesEnabled]]
     *
     * @param degrees The threshold to set.
     */
    setHardEdgeThreshold(degrees: number): void;
    /**
     * Returns the angle threshold for hard edges. Edges will be drawn
     * between two faces whose normals diverge beyond this angle.
     *
     * See also:
     * - [[setHardEdgeThreshold]]
     * - [[setHardEdgeThresholdRampWidth]]
     * - [[setHardEdgesEnabled]]
     *
     */
    getHardEdgeThreshold(): number;
    /**
     * Controls how quickly edges fade as the angle between adjacent faces
     * decreases.
     *
     * This value is added to the one set by [[setHardEdgeThreshold]] to
     * create a secondary threshold. Angles greater than the secondary
     * threshold will result in edges with full opacity, and angles between
     * the two thresholds will result in edges with reduced opacity.
     *
     * Setting this value to `0` will cause all edges to be drawn at full
     * opacity.
     *
     * See also:
     * - [[getHardEdgeThresholdRampWidth]]
     * - [[setHardEdgesEnabled]]
     */
    setHardEdgeThresholdRampWidth(degrees: number): void;
    /**
     * Returns the value set by [[setHardEdgeThresholdRampWidth]].
     *
     * This value is added to the one set by [[setHardEdgeThreshold]] to
     * create a secondary threshold. Angles greater than the secondary
     * threshold will result in edges with full opacity, and angles between
     * the two thresholds will result in edges with reduced opacity.
     *
     * A value of `0` means that all edges are drawn at full opacity.
     *
     * See also:
     * - [[setHardEdgeThresholdRampWidth]]
     * - [[setHardEdgesEnabled]]
     */
    getHardEdgeThresholdRampWidth(): number;
    /**
     * Enables or disables simple reflections projected onto an
     * invisible ground plane.
     *
     * See also:
     * - [[getSimpleReflectionEnabled]]
     * - [[setSimpleReflectionOpacity]]
     * - [[setSimpleReflectionBlurSamples]]
     * - [[setSimpleReflectionBlurInterval]]
     * - [[setSimpleReflectionFadeAngle]]
     */
    setSimpleReflectionEnabled(value?: boolean): void;
    /**
     * Returns whether simple reflections are enabled.
     *
     * See [[setSimpleReflectionEnabled]].
     */
    getSimpleReflectionEnabled(): boolean;
    /**
     * Sets the distance between samples taken by the blur filter used for
     * simple reflections.
     *
     * See also:
     *  - [[getSimpleReflectionBlurInterval]]
     *  - [[setSimpleReflectionEnabled]]
     *
     * @param value The interval to set.
     * @param unit The unit in which the `value` argument is specified.
     */
    setSimpleReflectionBlurInterval(value: number, unit?: BlurIntervalUnit): void;
    /**
     * Returns the distance between samples taken by the blur filter used
     * for simple reflections.
     *
     * See also:
     *  - [[setSimpleReflectionBlurInterval]]
     *  - [[setSimpleReflectionEnabled]]
     */
    getSimpleReflectionBlurInterval(): [number, BlurIntervalUnit];
    /**
     * Sets the diameter of the blur filter used for simple reflections.
     * Setting the value less than or equal to `1` will disable blurring.
     *
     * See also:
     * - [[getSimpleReflectionBlurSamples]]
     * - [[setSimpleReflectionEnabled]]
     */
    setSimpleReflectionBlurSamples(value: number): void;
    /**
     * Returns the diameter of the blur filter used for simple reflections.
     * A value less than or equal to `1` means that blurring is disabled.
     *
     * See also:
     * - [[setSimpleReflectionBlurSamples]]
     * - [[setSimpleReflectionEnabled]]
     */
    getSimpleReflectionBlurSamples(): number;
    /**
     * Sets the angle, in degrees, between the view vector and the ground
     * plane at which simple reflections begin to fade.
     *
     * Settings the value to `0` will disable the fading effect.
     *
     * Regardless of the value, simple reflections will not be drawn
     * if the camera is below the ground plane.
     *
     * See also:
     * - [[getSimpleReflectionFadeAngle]]
     * - [[setSimpleReflectionEnabled]]
     *
     * @param degrees The angle in degrees.
     */
    setSimpleReflectionFadeAngle(degrees: number): void;
    /**
     * Returns the angle, in degrees, between the view vector and the ground
     * plane at which simple reflections begin to fade.
     *
     * A value to `0` means that the fading effect is disabled.
     *
     * Regardless of the value, simple reflections will not be drawn
     * if the camera is below the ground plane.
     *
     * See also:
     * - [[setSimpleReflectionFadeAngle]]
     * - [[setSimpleReflectionEnabled]]
     */
    getSimpleReflectionFadeAngle(): number;
    /**
     * Sets the opacity of simple reflections.
     *
     * See also:
     *  - [[getSimpleReflectionOpacity]]
     *  - [[setSimpleReflectionEnabled]]
     *
     * @param value The opacity to set.
     */
    setSimpleReflectionOpacity(value: number): void;
    /**
     * Returns the opacity of simple reflections.
     *
     * See also:
     *  - [[setSimpleReflectionOpacity]]
     *  - [[setSimpleReflectionEnabled]]
     */
    getSimpleReflectionOpacity(): number;
    /**
     * Controls how objects drawn in simple reflections fade as they
     * move further from the ground plane.
     *
     * Attenuation begins at `nearDistance` and increases linearly
     * such that the model is not visible in the reflection beyond
     * `farDistance`.
     *
     * Attenuation is disabled if `farDistance` is less than or equal to
     * `nearDistance`.
     *
     * See also:
     *  - [[getSimpleReflectionAttenuation]]
     *  - [[setSimpleReflectionEnabled]]
     *
     * @param nearDistance The distance from the ground plane at which
     * objects begin to fade.
     * @param farDistance The distance from the ground plane at which
     * objects are completely faded.
     * @param unit The unit in which `nearDistance` and `farDistance` are
     * specified. If unspecified, [[SimpleReflectionAttenuationUnit.World]]
     * will be used.
     */
    setSimpleReflectionAttenuation(nearDistance: number, farDistance: number, unit?: SimpleReflectionAttenuationUnit): void;
    /**
     * Returns properties that control how objects drawn in simple
     * reflections fade as they move further from the ground plane.
     *
     * Attenuation begins at `nearDistance` and increases linearly
     * such that the model is not visible in the reflection beyond
     * `farDistance`.
     *
     * Attenuation is disabled if `farDistance` is less than or equal to
     * `nearDistance`.
     *
     * See also:
     *  - [[setSimpleReflectionAttenuation]]
     *  - [[setSimpleReflectionEnabled]]
     *
     * @returns An object with the following properties:
     */
    getSimpleReflectionAttenuation(): {
        /** The distance from the ground plane at which the model begins to fade. */
        nearDistance: number;
        /** The distance from the ground plane at which the model is completely faded. */
        farDistance: number;
        /** The unit in which `nearDistance` and `farDistance` are specified. */
        unit: SimpleReflectionAttenuationUnit;
    };
    /**
     * Tests whether the given points are visible by comparing them to
     * the depth buffer of the most-recently-drawn frame. Points that
     * are partially obscured by transparent objects are considered visible.
     *
     * If the test is to be run every time a frame is drawn,
     * [[setPointVisibilityTest]] should be used instead for proper
     * synchronization.
     *
     * @param points The points to test.
     * @returns A list of indices of the visible points.
     */
    testPointVisibility(points: Point3[]): Promise<number[]>;
    /**
     * Sets a list of points whose visibility will be tested every time a
     * frame is drawn by comparing them to the frame's depth buffer. Points
     * that are partially obscured by transparent objects are considered
     * visible.
     *
     * The results are passed to the [[CallbackMap.frameDrawn]] callback so
     * that UI elements may be updated in sync with rendering.
     *
     * See also [[testPointVisibility]].
     *
     * @param points The points to test. An empty array will disable the test.
     */
    setPointVisibilityTest(points: Point3[]): void;
    /**
     * Sets whether image-based lighting is enabled for physically-based
     * materials.
     *
     * See also:
     * - [[getImageBasedLightingEnabled]]
     * - [[setImageBasedLightingIntensity]]
     * - [[setImageBasedLightingOrientation]]
     */
    setImageBasedLightingEnabled(value: boolean): void;
    /**
     * Returns whether image-based lighting is enabled for physically-based
     * materials.
     *
     * See also:
     * - [[setImageBasedLightingEnabled]]
     * - [[setImageBasedLightingIntensity]]
     * - [[setImageBasedLightingOrientation]]
     */
    getImageBasedLightingEnabled(): boolean;
    /**
     * Sets the intensity (brightness) of image-based lighting applied to
     * physically-based materials.
     *
     * The default value is 1.
     *
     * See also:
     * - [[getImageBasedLightingIntensity]]
     * - [[setImageBasedLightingEnabled]]
     * - [[setImageBasedLightingOrientation]]
     */
    setImageBasedLightingIntensity(value: number): void;
    /**
     * Returns the intensity (brightness) of image-based lighting applied to
     * physically-based materials.
     *
     * The default value is 1.
     *
     * See also:
     * - [[setImageBasedLightingIntensity]]
     * - [[setImageBasedLightingEnabled]]
     * - [[setImageBasedLightingOrientation]]
     */
    getImageBasedLightingIntensity(): number;
    private _copyImageBasedLightingOrientation;
    /**
     * Sets the orientation of the image-based lighting environment applied
     * to physically-based materials.
     *
     * See also:
     * - [[getImageBasedLightingOrientation]]
     * - [[setImageBasedLightingEnabled]]
     * - [[setImageBasedLightingIntensity]]
     */
    setImageBasedLightingOrientation(value: ImageBasedLightingOrientation): void;
    /**
     * Returns the orientation of the image-based lighting environment
     * applied to physically-based materials.
     *
     * See also:
     * - [[setImageBasedLightingOrientation]]
     * - [[setImageBasedLightingEnabled]]
     * - [[setImageBasedLightingIntensity]]
     */
    getImageBasedLightingOrientation(): ImageBasedLightingOrientation;
    private _updateImageBasedLightingOrientation;
    /**
     * Sets the environment image used by image-based lighting applied to
     * physically-based materials.
     *
     * Passing `null` will cause the default environment image to be used.
     *
     * The image should be a cube map in KTX2 format with a space-separated
     * list of spherical harmonics coefficients stored under the "sh"
     * metadata key.
     *
     * A compatible image can be created from an equirectangular source
     * image (such as those found at [HDRI Haven](https://hdrihaven.com))
     * with the following process:
     *
     * - cmgen: https://github.com/google/filament
     * - ktx2ktx2, ktx2sc: https://github.com/KhronosGroup/KTX-Software/
     *
     * ```
     * cmgen -x out --format=ktx --size=256 in.hdr
     * ktx2ktx2 -o uncompressed.ktx2 out/out_ibl.ktx
     * ktxsc --zcmp 20 -o out.ktx2 uncompressed.ktx2
     * ```
     */
    setImageBasedLightingEnvironment(data: Uint8Array | null): void;
    /**
     * Sets whether line jitter is enabled.
     *
     * Line jitter makes lines look 'sketchy' by drawing them multiple times
     * with randomized offsets applied to the vertices.
     *
     * See also:
     * - [[getLineJitterEnabled]]
     * - [[setLineJitterInstanceCount]]
     * - [[setLineJitterRadius]]
     * - [[setLineJitterFrequency]]
     */
    setLineJitterEnabled(value?: boolean): void;
    /**
     * Returns whether line jitter is enabled.
     *
     * Line jitter makes lines look 'sketchy' by drawing them multiple times
     * with randomized offsets applied to the vertices.
     *
     * See also:
     * - [[setLineJitterEnabled]]
     * - [[getLineJitterInstanceCount]]
     * - [[getLineJitterRadius]]
     * - [[getLineJitterFrequency]]
     */
    getLineJitterEnabled(): boolean;
    /**
     * Sets the number of times lines are drawn when line jitter is enabled.
     * The default value is 4.
     *
     * Increasing this number can make the lines look more 'sketchy.'
     *
     * See also:
     * - [[setLineJitterEnabled]]
     * - [[getLineJitterInstanceCount]]
     * - [[setLineJitterRadius]]
     * - [[setLineJitterFrequency]]
     */
    setLineJitterInstanceCount(value: number): void;
    /**
     * Returns the number of times lines are drawn when line jitter is
     * enabled. The default value is 4.
     *
     * See also:
     * - [[getLineJitterEnabled]]
     * - [[setLineJitterInstanceCount]]
     * - [[getLineJitterRadius]]
     * - [[getLineJitterFrequency]]
     */
    getLineJitterInstanceCount(): number;
    /**
     * Sets the radius of the random offset applied to line vertices when
     * line jitter is enabled. The default value is 0.005.
     *
     * The value is specified as a proportion of the canvas height, where 1
     * means the full height of the canvas.
     *
     * See also:
     * - [[setLineJitterEnabled]]
     * - [[setLineJitterInstanceCount]]
     * - [[getLineJitterRadius]]
     * - [[setLineJitterFrequency]]
     */
    setLineJitterRadius(value: number): void;
    /**
     * Returns the radius of the random offset applied to line vertices when
     * line jitter is enabled. The default value is 0.005.
     *
     * The value is specified as a proportion of the canvas height, where 1
     * means the full height of the canvas.
     *
     * See also:
     * - [[getLineJitterEnabled]]
     * - [[getLineJitterInstanceCount]]
     * - [[setLineJitterRadius]]
     * - [[getLineJitterFrequency]]
     */
    getLineJitterRadius(): number;
    /**
     * Sets the frequency of the noise used to offset line vertices when
     * line jitter is enabled. The default value is 5.
     *
     * Decreasing this value causes lines to appear smoother, while
     * increasing it causes lines to look more noisy.
     *
     * See also:
     * - [[setLineJitterEnabled]]
     * - [[setLineJitterInstanceCount]]
     * - [[setLineJitterRadius]]
     * - [[getLineJitterFrequency]]
     */
    setLineJitterFrequency(value: number): void;
    /**
     * Returns the frequency of the noise used to offset line vertices when
     * line jitter is enabled. The default value is 5.
     *
     * See also:
     * - [[getLineJitterEnabled]]
     * - [[getLineJitterInstanceCount]]
     * - [[getLineJitterRadius]]
     * - [[setLineJitterFrequency]]
     */
    getLineJitterFrequency(): number;
}
