import { StateFailure, ViewKey } from '@ts3d-hoops/streamcache';
import { CallbackMap } from '../CallbackMap';
import { ExplodeManager } from '../ExplodeManager';
import { LineManager } from '../LineManager';
import { MarkupManager } from '../MarkupManager';
import { MeasureManager } from '../MeasureManager';
import { Operator } from '../operators';
import { NoteText, NoteTextManager } from '../operators/markup/note';
import { OverlayManager } from '../overlay';
import { SelectionManager } from '../selection';
import { SheetManager } from '../SheetManager';
import { SnapshotConfig } from '../SnapshotConfig';
import { FilterId, OperatorId, PartId, SelectionType, ViewConfig, ViewOrientation, WebViewerConfig, SelectionMode, StreamingMode, RendererType, HandleEventType, NodeId, KeyModifiers } from '../types';
import { ICallbackManager } from './ICallbackManager';
import { ICuttingManager } from './ICuttingManager';
import { IModel } from './IModel';
import { IScEngine } from './IScEngine';
import { IView } from './IView';
import { SvgConfig } from '../SvgConfig';
import { BCFManager } from '../bcf/BcfManager';
import { Manager as AnimationManager } from '../animation/Manager';
import { BCFName } from '../bcf';
import { Matrix, Point2 } from '@ts3d-hoops/common';
import { ICuttingSection } from './ICuttingSection';
import { RedlineItem } from '../markup/redline';
import { MeasureMarkup } from '../operators/markup/measure';
import { OperatorManager } from '../OperatorManager';
import { FloorplanManager } from '../floorplan';
import { MarkupView } from '../markup';
export interface IWebViewer {
    /** @hidden */
    readonly config: WebViewerConfig;
    _views: IView[];
    readonly model: IModel;
    readonly markupManager: MarkupManager;
    readonly explodeManager: ExplodeManager;
    readonly selectionManager: SelectionManager;
    readonly measureManager: MeasureManager;
    readonly lineManager: LineManager;
    readonly cuttingManager: ICuttingManager;
    readonly BCFManager: BCFManager;
    readonly sheetManager: SheetManager;
    readonly noteTextManager: NoteTextManager;
    readonly animationManager: AnimationManager;
    /**
     * @deprecated OverlayManagers are now properties of Views.
     */
    overlayManager: OverlayManager;
    /**
     * @deprecated FloorplanManagers are now properties of Views.
     */
    floorplanManager: FloorplanManager;
    /**
     * Adds another 3D view of the scene to the page.
     * @param config configuration to be used for the new view.
     * @returns A promise with the created View.
     */
    addView(config: ViewConfig): Promise<IView>;
    /**
     * Removes an existing view from the page. Note that the default view cannot be removed.
     * @param view The view to remove.
     */
    removeView(view: IView): void;
    /**
     * Gets a view with the provided key.
     * @param viewKey The key of the view to be returned.
     * @returns The view, or undefined if it doesn't exist.
     */
    getView(viewKey: ViewKey): IView | undefined;
    view: IView;
    views: IView[];
    /**
     * @deprecated OperatorManagers are now properties of Views.
     */
    operatorManager: OperatorManager;
    /**
     * Sets a boolean with the status of the context menu
     * @param isActive
     */
    setContextMenuStatus(isActive: boolean): void;
    /**
     * @returns boolean true if the context menu is active, false otherwise
     */
    getContextMenuStatus(): boolean;
    /**
     * Returns the viewer version string.
     * @returns string containing version information for the viewer.
     */
    getViewerVersionString(): string;
    /**
     * Returns the format version string.
     * @returns string containing version information for the format.
     */
    getFormatVersionString(): string;
    /**
     * Starts the viewer and begins the loading process
     */
    start(): boolean;
    /**
     * Associates a custom operator object with a system generated operatorId.
     * @param operator The operator to register
     * @returns an operatorId to be used for this operator.
     */
    registerCustomOperator(operator: Operator): OperatorId;
    /**
     * Removes a previously registered custom operator from the system.
     * @param operatorId the ID of the operator that is to be unregistered
     */
    unregisterCustomOperator(operatorId: OperatorId): void;
    /**
     * Sets whether keyboard input should be directed to this Web Viewer.
     * @param focus if true, the Web Viewer will be focused and accept keyboard input, otherwise it will be blurred and not accept keyboard input
     */
    focusInput(focus: boolean): void;
    /**
     * Registers callbacks that will be called when their corresponding events occur.
     * @param callbacks object with property names set to corresponding functions to be called when the event occurs.
     */
    setCallbacks(callbacks: CallbackMap): void;
    /**
     * Unregisters callbacks from the system. Note the actual function object passed in must be the same as the one that was registered using setCallbacks.
     * @param callbacks object with property names set to corresponding functions to be unregistered.
     */
    unsetCallbacks(callbacks: CallbackMap): void;
    /**
     * This method should be called after the container element is moved or resized.
     */
    resizeCanvas(): void;
    /**
     * This method should be called when the viewer is being moved to a new window. An example use case would be opening a new pop up window.
     * @param win the new document that this viewer will be associated with.
     */
    moveToWindow(win: Window): void;
    /**
     * Forces the viewer to perform a full redraw of all views.
     * @param callback A function to be called once the draw is complete.
     * This is provided instead of a `Promise` to ensure the callback is
     * called before the start of another redraw.
     */
    redraw(callback?: () => void): void;
    /**
     * Selects a part with the given Id.
     * @param nodeId nodeId of the part to select. Pass null to clear the selection.
     */
    selectPart(nodeId: PartId | null, selectionMode?: SelectionMode): SelectionType;
    trigger(name: 'bcfLoaded', id: number, filename: BCFName): void;
    trigger(name: 'bcfRemoved', id: number): void;
    trigger(name: 'handleEvent', eventType: HandleEventType, nodeIds: NodeId[], initialMatrices: Matrix[], newMatrices: Matrix[]): void;
    trigger(name: 'handleEventEnd', eventType: HandleEventType, nodeIds: NodeId[], initialMatrices: Matrix[], newMatrices: Matrix[]): void;
    trigger(name: 'handleEventStart', eventType: HandleEventType, nodeIds: NodeId[], initialMatrices: Matrix[]): void;
    trigger(name: 'cuttingPlaneDragStart', cuttingSection: ICuttingSection, planeIndex: number): void;
    trigger(name: 'cuttingPlaneDrag', cuttingSection: ICuttingSection, planeIndex: number): void;
    trigger(name: 'cuttingPlaneDragEnd', cuttingSection: ICuttingSection, planeIndex: number): void;
    trigger(name: 'cuttingSectionsLoaded'): void;
    trigger(name: 'redlineCreated', redlineMarkup: RedlineItem): void;
    trigger(name: 'redlineDeleted', redlineMarkup: RedlineItem): void;
    trigger(name: 'redlineUpdated', redlineMarkup: RedlineItem): void;
    trigger(name: 'measurementBegin'): void;
    trigger(name: 'measurementCreated', measurement: MeasureMarkup): void;
    trigger(name: 'measurementDeleted', measurement: MeasureMarkup): void;
    trigger(name: 'measurementValueSet', measurement: MeasureMarkup): void;
    trigger(name: 'measurementShown', measurement: MeasureMarkup): void;
    trigger(name: 'measurementHidden', measurement: MeasureMarkup): void;
    trigger(name: 'noteTextCreated', noteText: NoteText): void;
    trigger(name: 'noteTextDeleted', noteText: NoteText): void;
    trigger(name: 'noteTextUpdated', noteText: NoteText): void;
    trigger(name: 'noteTextHidden', noteText: NoteText): void;
    trigger(name: 'noteTextShown', noteText: NoteText): void;
    trigger(name: 'walkOperatorActivated'): void;
    trigger(name: 'walkOperatorDeactivated'): void;
    trigger(name: 'viewCreated', view: MarkupView): void;
    trigger(name: 'viewDeleted', view: MarkupView): void;
    trigger(name: 'viewLoaded', view: MarkupView): void;
    trigger(name: 'contextMenu', position: Point2, modifiers: KeyModifiers): void;
    trigger(name: 'beginInteraction'): void;
    trigger(name: 'endInteraction'): void;
    /**
     * Used to trigger Web Viewer events from operators. Refer to the overloaded method signatures for acceptable invocations of this method. Refer to [[CallbackMap]] for additional details for each event.
     * @param name
     * @param args
     */
    trigger(name: keyof CallbackMap, ...args: any[]): void;
    /** @hidden */
    _getCallbackManager(): ICallbackManager;
    /** @hidden */
    _setStreamIdleMarker(): Promise<void>;
    /**
     * Gets viewer statistics for the current rendered frame. Statistics marked with a (*) below must be calculated and will not be included in the results unless the calculateTotals parameter is true.
     * The values of these items will be cached and only updated during the next call to this method with calculateTotals set to true.
     * @param calculateTotals Forces an update of the total count elements. Please note that repeatedly calculating these items can cause a performance impact.
     * @returns an object containing informational key/value pairs
     *
     * | Statistic Name| Description                                          |
     * | ----------------------- | -----------------------------------------------------|
     * | draw_call_count  | number of draw calls made when rendering the frame             |
     * | saved_draw_call_count  | number of draw calls picked from budget but saved by optimisation |
     * | frames_per_second  | frames per second estimation    |
     * | triangle_count  | the number of triangles rendered    |
     * | line_segment_count  | the number of line segments rendered    |
     * | point_count  | the number of points rendered    |
     * | total_element_count(*)  | the total number of elements in the scene    |
     * | total_triangle_count(*)  | the total number of triangles in the scene   |
     *
     */
    getStatistics(calculateTotals?: boolean): Promise<object>;
    /**
     * Sets a minimum frame rate that will be maintained by all views.
     * Views will use various culling techniques in order to maintain the value passed in.
     *
     * Passing `0` will cause the entire scene to be drawn for every frame.
     * @param value The frame rate for the views to maintain.
     * @returns Promise that is resolved when the operation has completed.
     */
    setMinimumFramerate(value: number): Promise<void>;
    /**
     * Gets the minimum framerate that will be maintained by the viewer. The viewer will use various culling techniques in order to maintain the value returned.
     * @returns Promise that is resolved when the operation has completed.
     * @deprecated Views can have independent framerates. This should be set using `View.getMinimumFramerate`.
     */
    getMinimumFramerate(): Promise<number>;
    /**
     * Sets the image quality settings for the high quality and low quality server side render. The low quality settings will be applied during model interaction (camera changes, selection, etc)
     * @param jpegQualityLow The JPEG quality of the low quality render frame
     * @param jpegQualityHigh The JPEG quality of the high quality render frame
     * @param scaleLow The scale factor for the low quality render frame
     * @param scaleHigh The scale factor for the high quality render frame
     */
    setServerRenderQuality(jpegQualityLow: number, jpegQualityHigh: number, scaleLow: number, scaleHigh: number): void;
    /**
     * Gets the streaming mode this viewer was created with.
     * @returns the streaming mode.
     */
    getStreamingMode(): StreamingMode;
    /**
     * Gets the RendererType this viewer was created with.
     * @returns the render mode.
     */
    getRendererType(): RendererType;
    /**
     * Gets the view element for this viewer. This element contains the canvas
     * @returns the view element
     */
    getViewElement(): HTMLDivElement;
    /**
     * Releases the resources used by the viewer. This method should be called when the viewer is no longer needed but the page is not being reloaded.
     */
    shutdown(): void;
    /**
     * Sets the parameters for client driven timeout monitoring.
     * If no input is recorded for the the duration, the viewer will disconnect and free server resources.
     * Calling this method will reset any pending timeout duration.
     * No timeout will occur when viewing SCS Files.
     * The default value is to disconnect after 15 minutes, with a warning issued after 14 minutes of inactivity.
     * <br><br> <strong>Please note:</strong> Both parameters are required.
     * @param timeoutDuration the total time in minutes of inactivity that is allowed before a timeout event occurs
     * @param warningTime the number of minutes before issuing a timeoutWarning event
     * @returns boolean value indicating whether the timeout values were sucessfully updated
     */
    setClientTimeout(timeoutDuration: number, warningTime: number): boolean;
    /**
     * Resets the client timeout to the duration set with setClientTimeout.
     */
    resetClientTimeout(): void;
    /**
     * Pauses rendering updates for all views. This function is useful when
     * performing large batches of updates and you would like the result
     * to appear all at once.
     *
     * @param callback If provided, rendering will be paused, the callback
     * will be called, and then rendering will be resumed once the callback
     * returns or throws an exception.
     */
    pauseRendering(callback?: () => void): Promise<void>;
    /**
     * Resumes rendering for all views.
     */
    resumeRendering(): Promise<void>;
    /**
     * Delays capping processing by a fixed time interval.
     */
    delayCapping(): void;
    /**
     * Reset the camera, visibility, and transforms to their default state
     * @param durationCameraTransition the amount of time in milliseconds that the camera transition between the current and initial view should take.
     * @returns Promise that resolves when the operation has completed.
     */
    reset(durationCameraTransition?: number): Promise<void>;
    /**
     * Disconnects the network connection when in CSR mode.
     */
    closeConnection(): void;
    /**
     * Controls rendering on high DPI displays. If true, the image will be rendered at full resolution when a high-DPI display is detected. If false, the image may be rendered at a lower resolution. The default value is false.
     * This method may be called any time during or after the sceneReady callback has triggered.
     * @param allow controls the high DPI Setting.
     */
    setAllowHighDpi(allow: boolean): void;
    /**
     * Gets the current value for high DPI rendering
     * @returns current high DPI setting
     */
    getAllowHighDpi(): boolean;
    /**
     * Creates an Image of the current canvas
     */
    takeSnapshot(config?: SnapshotConfig): Promise<HTMLImageElement>;
    fitWorld(duration?: number): Promise<void>;
    /**
     * Sets the orientation of the current model view.
     * @param orientation a [[ViewOrientation]] object specifying back, front, top, etc.
     * @param duration the time in milliseconds for the model to transition to the new view orientation.
     */
    setViewOrientation(orientation: ViewOrientation, duration?: number): Promise<void>;
    getSceneReady(): boolean;
    getModelReady(): boolean;
    /**
     * Specifies a scale factor that will be applied to the streaming size cutoff.
     * An object whose projected size is lower than the cutoff will not be streamed
     * until its projected size reaches the cutoff.
     *
     * This value may also be set for file-based sessions.  In that case, when loading
     * an SCS file based assembly via XML, projected size will be calculated on a
     * per-file basis using the bounding information provided in the XML.
     * For additional information, refer to [[Model.loadSubtreeFromXmlBuffer]].
     *
     * A value of 0 will disable the cutoff.  The value should be in the interval of [0.0, 2.0].
     */
    setStreamCutoffScale(value: number): Promise<void>;
    /**
     * Returns the scale factor that will be applied to the streaming size cutoff.
     * An object whose projected size is lower than the cutoff will not be streamed
     * until its projected size reaches the cutoff. A value of 0 disables the cutoff.
     */
    getStreamCutoffScale(): number;
    /** @hidden */
    _loseWebGlContext(): boolean;
    /** @hidden */
    _getScEngine(): IScEngine;
    /** @hidden */
    _debug_log(message: string): Promise<void>;
    /** @hidden */
    _debug_stateFailure(value: StateFailure): Promise<void>;
    /** @hidden */
    _debug_sync(): Promise<void>;
    /**
     * Exports the current scene to a two-dimensional SVG representation.
     *
     * @param config Allows customization of the resultant SVG.
     * @return A promise that resolves to the created SVG string.
     */
    exportToSvg(config?: SvgConfig): Promise<string>;
    /**
     * Setup the env to export the current scene to a two-dimensional SVG representation through stream.
     *
     * @param config Allows customization of the resultant SVG.
     * @return A promise that resolves to void when the env is ready.
     */
    beginExportToSvg(config?: SvgConfig): Promise<void>;
    /**
     * Reset the env after SVG stream export.
     *
     * @return A promise that resolves to void when the env is reset.
     */
    endExportToSvg(): Promise<void>;
    /**
     * Get the next chunk of the SVG code
     *
     * @return A promise that resolves to a string containing the next chunk or undefined on completed..
     */
    advanceExportToSvg(): Promise<string | undefined>;
    /**
     * Returns a Promise that will resolve after streaming and associated
     * asynchronous operations complete and the scene is fully drawn.
     */
    waitForIdle(config: {
        /** If `false`, do not wait for rendering to finish. */
        redraw?: boolean;
    }): Promise<void>;
    applyFilter(filterId: FilterId): void;
}
