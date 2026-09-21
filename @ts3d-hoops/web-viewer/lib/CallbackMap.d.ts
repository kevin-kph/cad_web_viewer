import { Matrix, Point3, Point2 } from '@ts3d-hoops/common';
import { Camera } from './Camera';
import { BCFName } from './bcf';
import { InputEvent } from './event/InputEvent';
import { NodeSelectionEvent } from './event/SelectionEvent';
import { AssemblyDataHeader } from './internal/tree/AssemblyData';
import { AttachType } from './internal/types';
import { MarkupView } from './markup/MarkupView';
import { LineMarkup } from './markup/line/LineMarkup';
import { RedlineItem } from './markup/redline/RedlineItem';
import { MeasureMarkup } from './operators/markup/measure/MeasureMarkup';
import { NoteText } from './operators/markup/note/NoteText';
import { AttachScope, DataKey, InclusionKey, InstanceInc, MasterModelKey, ModelKey, ViewKey } from '@ts3d-hoops/streamcache';
import { EventType, FileType, HandleEventType, InfoType, KeyModifiers, NodeSource, ScModelName, ViewOrientation, BodyId, CadViewId, NodeId, OverlayIndex, SheetId, LoadSubtreeConfig } from './types';
import { IView } from './core/IView';
import { ICuttingSection } from './core/ICuttingSection';
/** Object which maps callback names to functions. Used by [[WebViewer.setCallbacks]]. */
export interface CallbackMap {
    /** @hidden */
    _assemblyTreeReady?: () => Promise<void>;
    /** @hidden */
    _firstAttachment?: (attachType: AttachType) => Promise<void>;
    /** @hidden */
    _firstBoundingReady?: () => Promise<void>;
    /** @hidden */
    _firstModelLoaded?: (modelRootIds: NodeId[], isHwf: boolean, attachType: AttachType, config: LoadSubtreeConfig) => Promise<void>;
    /** @hidden */
    _missingModel?: (attachScope: AttachScope, modelPath: string) => void;
    /** @hidden */
    _modelStructureHeaderParsed?: (header: AssemblyDataHeader) => Promise<void>;
    /** @hidden */
    _modelStructureReady?: () => Promise<void>;
    /** @hidden */
    _modelSwitched?: (clearOnly: boolean, modelRootIds: NodeId[], attachType: AttachType) => Promise<void>;
    /** @hidden */
    _resetAssemblyTreeBegin?: () => Promise<void>;
    /** @hidden */
    _resetDrawing?: () => Promise<void>;
    /** @hidden */
    _sessionStarted?: () => Promise<void>;
    /** @hidden */
    _subtreeLoaded?: (subtreeRootIds: NodeId[], source: NodeSource) => Promise<void>;
    /** @hidden */
    _announceModel?: (attachScope: AttachScope, masterModelKey: MasterModelKey) => void;
    /** @hidden */
    _attached?: (attachScope: AttachScope) => void;
    /** @hidden */
    _attachmentPopulated?: (attachmentRootIds: NodeId[]) => void;
    /** @hidden */
    _drawComplete?: (viewKey: ViewKey) => void;
    /** @hidden */
    _firstInstance?: () => void;
    /** @hidden */
    _geometryCreated?: (inc: InstanceInc) => void;
    /** @hidden */
    _inclusion?: (attachScope: AttachScope, inclusionKey: InclusionKey, modelKey: ModelKey) => void;
    /** @hidden */
    _inputInteraction?: (event: InputEvent, eventType: EventType) => void;
    /** @hidden */
    _metaData?: (modelKey: ModelKey, dataKey: DataKey, data: Uint8Array) => void;
    /** @hidden */
    _priorityMetaDataSent?: (attachScope: AttachScope, prototypeInstanceCount: number) => void;
    /** @hidden */
    _remapInclusion?: (attachScope: AttachScope, effectiveModelKey: ModelKey, effectiveInclusionKey: InclusionKey, originalInclusionKey: InclusionKey) => void;
    /** @hidden */
    _remapModel?: (attachScope: AttachScope, effectiveModelKey: ModelKey, originalModelKey: ModelKey) => void;
    /** @hidden */
    _fetchBegin?: (url: string, attachScope: AttachScope) => void;
    /** @hidden */
    _fetchEnd?: (url: string, attachScope: AttachScope) => void;
    /** @hidden */
    _resetOpacity?: () => void;
    /** @hidden */
    _rootModelKey?: (modelKey: ModelKey) => void;
    /** @hidden */
    _shutdownBegin?: () => void;
    /** @hidden */
    _test?: () => void;
    /** @hidden */
    _timeout?: () => void;
    /** @hidden */
    _updateTransform?: (isFullyOutOfHierarchy: boolean) => void;
    /** @hidden */
    _drawContextCreated?: (viewKey: ViewKey) => void;
    /** @hidden */
    _drawContextDestroyed?: (viewKey: ViewKey) => void;
    /**
     * Triggered when a cutting section is added to the scene.
     *
     * @param cuttingSection The cutting section added.
     */
    addCuttingSection?: (cuttingSection: ICuttingSection) => void;
    /**
     * Triggered when methods on the [[Model]] class are allowed to be called.
     */
    assemblyTreeReady?: () => void;
    /**
     * Triggered after a BCF file has been loaded.
     * @param id index associated with the bcf file.
     * @param filename associated with the bcf file.
     */
    bcfLoaded?: (id: number, filename: BCFName) => void;
    /**
     * Triggered after a BCF file has been removed.
     */
    bcfRemoved?: (id: number) => void;
    /**
     * Triggered on the start of a mouse drag from any of the built-in Communicator operators.
     *
     * @param view View the interaction is taking place in.
     */
    beginInteraction?: (view: IView) => void;
    /**
     * Triggered when a CAD View is created.
     *
     * @param cadViewId The [[CadViewId]] of the CAD View.
     * @param cadViewName The name of the CAD View.
     */
    cadViewCreated?: (cadViewId: CadViewId, cadViewName: string) => void;
    /**
     * Triggered when the camera changes.
     *
     * @param camera The changed camera.
     * @param view The view the camera changed in.
     */
    camera?: (camera: Camera, view: IView) => void;
    /**
     * Triggered when capping geometry generation becomes idle or active.
     *
     * @param isIdle `true` if becoming idle. `false` if becoming active.
     * @param cappedInstanceCount The number of geometry instances with capped faces.
     */
    cappingIdle?: (isIdle: boolean, cappedInstanceCount: number) => void;
    /**
     * Triggered when a Configuration is activated.
     *
     * @param nodeId The [[NodeId]] of the activated Configuration.
     */
    configurationActivated?: (nodeId: NodeId) => void;
    /**
     * Triggered when `Ui.Context.ContextMenu` menu is shown or hidden.
     *
     * By default, this function is called on right mouse-click events.
     *
     * @param position The window position of the mouse at the time of trigger.
     * @param modifiers The active key modifiers at the time of trigger.
     */
    contextMenu?: (position: Point2, modifiers: KeyModifiers) => void;
    /**
     * Triggered when a cutting plane drag event starts.
     *
     * @param cuttingSection The cutting section containing the cutting plane.
     * @param planeIndex The index of the cutting plane in the cutting section.
     */
    cuttingPlaneDragStart?: (cuttingSection: ICuttingSection, planeIndex: number) => void;
    /**
     * Triggered when a cutting plane is dragged.
     *
     * @param cuttingSection The cutting section containing the cutting plane.
     * @param planeIndex The index of the cutting plane in the cutting section.
     */
    cuttingPlaneDrag?: (cuttingSection: ICuttingSection, planeIndex: number) => void;
    /**
     * Triggered when a cutting plane drag event stops.
     *
     * @param cuttingSection The cutting section containing the cutting plane.
     * @param planeIndex The index of the cutting plane in the cutting section.
     */
    cuttingPlaneDragEnd?: (cuttingSection: ICuttingSection, planeIndex: number) => void;
    /**
     * Triggered after a batch update to cutting sections, such as when
     * deserializing from JSON data.
     *
     * This event may be triggered manually after modifying cutting sections
     * to cause the UI state to be updated.
     */
    cuttingSectionsLoaded?: () => void;
    /**
     * Triggered at the end of a mouse drag from any of the built-in Communicator operators
     * or if [[Operator.stopInteraction]] gets called for a given operator.
     *
     * @param view the View the interaction has ended in.
     */
    endInteraction?: (view: IView) => void;
    /**
     * Triggered when the expode magnitude of [[ExplodeManager]] changes.
     * @param magnitude The new explosion magnitude.
     */
    explode?: (magnitude: number) => void;
    /**
     * Triggered when the first model of a scene gets loaded.
     *
     * Clearing or switching models allows this to be triggered again.
     *
     * @param modelRootIds The root node IDs of the loaded model.
     * @param isHwf True if the model is an HWF model, false otherwise.
     */
    firstModelLoaded?: (modelRootIds: NodeId[], isHwf: boolean) => void;
    /**
     * Triggered when a frame has been drawn.
     *
     * @param camera The camera used when the frame was drawn.
     * @param visiblePoints A list of indices of points passed to [[View.setPointVisibilityTest]].
     * @param viewKey The key of the View the frame was drawn in.
     */
    frameDrawn?: (camera: Camera, visiblePoints: number[], viewKey: ViewKey) => void;
    /**
     * Triggered when a geometry handle is selected.
     *
     * @param eventType The type of the handle event.
     * @param nodeIds The node IDs bound to the handle.
     * @param initialMatrices The initial matrices for each of the supplied `nodeIds`.
     */
    handleEventStart?: (eventType: HandleEventType, nodeIds: NodeId[], initialMatrices: Matrix[]) => void;
    /**
     * Triggered when a geometry handle is moved.
     *
     * @param eventType The type of the handle event.
     * @param nodeIds The node IDs bound to the handle.
     * @param initialMatrices The initial matrices for each of the supplied `nodeIds`.
     * @param newMatrices The new matrices for each of the supplied `nodeIds`.
     */
    handleEvent?: (eventType: HandleEventType, nodeIds: NodeId[], initialMatrices: Matrix[], newMatrices: Matrix[]) => void;
    /**
     * Triggered when a geometry handle is no longer selected.
     *
     * @param eventType The type of the handle event.
     * @param nodeIds The node IDs bound to the handle.
     * @param initialMatrices The initial matrices for each of the supplied `nodeIds`.
     * @param newMatrices The new matrices for each of the supplied `nodeIds`.
     */
    handleEventEnd?: (eventType: HandleEventType, nodeIds: NodeId[], initialMatrices: Matrix[], newMatrices: Matrix[]) => void;
    /**
     * Triggered when HWF parsing becomes completed.
     */
    hwfParseComplete?: () => void;
    /**
     * Triggered before a batch of incrementally selected entities is put into the [[SelectionManager]].
     *
     * See also:
     *  - [[SelectionManager.advanceIncrementalSelection]]
     */
    incrementalSelectionBatchBegin?: () => void;
    /**
     * Triggered after a batch of incrementally selected entities is put into the [[SelectionManager]].
     *
     * See also:
     *  - [[SelectionManager.advanceIncrementalSelection]]
     */
    incrementalSelectionBatchEnd?: () => void;
    /**
     * Triggered after all batches of incrementally selected entities have been put into the [[SelectionManager]].
     *
     * See also:
     *  - [[SelectionManager.advanceIncrementalSelection]]
     */
    incrementalSelectionEnd?: () => void;
    /**
     * Triggered when an info message is generated by the viewer.
     *
     * @param infoType The type of the message.
     * @param message The message.
     */
    info?: (infoType: InfoType, message: string) => void;
    /**
     * Triggered when a markup line is created.
     *
     * @param line The created markup line.
     */
    lineCreated?: (line: LineMarkup) => void;
    /**
     * Triggered when a markup line is deleted.
     *
     * @param line The deleted markup line.
     */
    lineDeleted?: (line: LineMarkup) => void;
    /**
     * Triggered when a markup line is loaded.
     *
     * @param line The loaded markup line.
     */
    lineLoaded?: (line: LineMarkup) => void;
    /**
     * Triggered when a measurement operator has begun measuring.
     */
    measurementBegin?: () => void;
    /**
     * Triggered when a measurement is fully created.
     *
     * @param measurement The created measurement.
     */
    measurementCreated?: (measurement: MeasureMarkup) => void;
    /**
     * Triggered when a measurement is deleted by its [[MeasureManager]].
     *
     * @param measurement The deleted measurement.
     *
     * See also:
     *  - [[MeasureManager.removeMeasurement]]
     *  - [[MeasureManager.removeAllMeasurements]]
     */
    measurementDeleted?: (measurement: MeasureMarkup) => void;
    /**
     * Triggered when a measurement is hidden by a call to its `setVisibility` method.
     *
     * @param measurement The hidden measurement.
     *
     * See also:
     *  - [[MeasureMarkup.setVisibility]]
     */
    measurementHidden?: (measurement: MeasureMarkup) => void;
    /**
     * Triggered when a measurement loaded by its [[MeasureManager]].
     *
     * @param measurement The loaded measurement.
     *
     * See also:
     *  - [[MeasureManager.loadData]]
     */
    measurementLoaded?: (measurement: MeasureMarkup) => void;
    /**
     * Triggered when a measurement is shown by a call to its `setVisibility` method.
     *
     * @param measurement The shown measurement.
     *
     * See also:
     *  - [[MeasureMarkup.setVisibility]]
     */
    measurementShown?: (measurement: MeasureMarkup) => void;
    /**
     * Triggered when the measurement value is set but before it is displayed to the user.
     *
     * This callback is useful for customizing the display of measurement text by using
     * its `getMeasurementValue` and `setMeasurementText` methods.
     *
     * @param measurement The modified measurement.
     */
    measurementValueSet?: (measurement: MeasureMarkup) => void;
    /**
     * Triggered when a missing model is discovered during a load.
     *
     * @param modelPath The path of the missing model.
     */
    missingModel?: (modelPath: string) => void;
    /**
     * Triggered immediately when [[Model.switchToModel]] is called.
     */
    modelLoadBegin?: () => void;
    /**
     * Triggered when a model could not be loaded.
     *
     * @param modelName The name of the model that failed to load.
     * @param reason The reason the model failed to load.
     * @param error The error object thrown when the load failed, if available.
     */
    modelLoadFailure?: (modelName: ScModelName, reason: string, error?: any) => void;
    /**
     * Triggered when a model header has been parsed.
     * @param filename The name of the original model file.
     * @param fileType The type of the original model file.
     */
    modelStructureHeaderParsed?: (filename: string, fileType: FileType) => void;
    /**
     * Triggered when the model structure has been loaded and is ready to be queried.
     *
     * This callback will only be called after the [[assemblyTreeReady]] callback gets triggered.
     */
    modelStructureReady?: () => void;
    /**
     * Triggered when [[Model.switchToModel]] or [[Model.clear]] is called.
     * This gets triggered after any of the above methods complete.
     *
     * @param clearOnly `true` if the callback was triggered by [[Model.clear]]. `false` otherwise.
     * @param modelRootIds The root IDs of the newly loaded assembly tree nodes.
     */
    modelSwitched?: (clearOnly: boolean, modelRootIds: NodeId[]) => void;
    /**
     * Triggered when [[Model.switchToModel]] or [[Model.clear]] is called.
     * This gets triggered after any of the above methods begin.
     *
     * @param clearOnly `true` if the callback was triggered by [[Model.clear]]. `false` otherwise.
     */
    modelSwitchStart?: (clearOnly: boolean) => void;
    /**
     * Triggered when note text is created, especially via the note operator.
     *
     * @param noteText The note text that was created.
     */
    noteTextCreated?: (noteText: NoteText) => void;
    /**
     * Triggered when note text is deleted.
     *
     * @param noteText The note text that was deleted.
     */
    noteTextDeleted?: (noteText: NoteText) => void;
    /**
     * Triggered when note text is updated.
     *
     * @param noteText The note text that was updated.
     */
    noteTextUpdated?: (noteText: NoteText) => void;
    /**
     * Triggered when note text is hidden, especially via the note operator.
     *
     * @param noteText The note text that was hidden.
     */
    noteTextHidden?: (noteText: NoteText) => void;
    /**
     * Triggered when note text is shown, especially via the note operator.
     *
     * @param noteText The note text that was shown.
     */
    noteTextShown?: (noteText: NoteText) => void;
    /**
     * Triggered when an overlay viewport is set.
     *
     * @param overlayIndex The index of the overlay that had its viewport set.
     * @param view The View the overlay was set in.
     */
    overlayViewportSet?: (overlayIndex: OverlayIndex, view: IView) => void;
    /**
     * Triggered when a redline markup item is created.
     *
     * @param redlineMarkup The created redline.
     */
    redlineCreated?: (redlineMarkup: RedlineItem) => void;
    /**
     * Triggered when a redline markup item is deleted.
     *
     * @param redlineMarkup The deleted redline.
     */
    redlineDeleted?: (redlineMarkup: RedlineItem) => void;
    /**
     * Triggered when a redline markup item is updated.
     *
     * An update is triggered by changes in a redline markup item's
     * position, size, or text.
     *
     * @param redlineMarkup The deleted redline.
     */
    redlineUpdated?: (redlineMarkup: RedlineItem) => void;
    /**
     * Triggered when a cutting section is removed.
     */
    removeCuttingSection?: () => void;
    /**
     * Triggered when the scene is ready to be interacted with.
     *
     * [[View]]-related operations such as moving the camera may be invoked.
     * However, operations requiring node IDs should not be called at this time.
     */
    sceneReady?: () => void;
    /**
     * Triggered when a selection event occurs.
     *
     * @param selectionEvents A list of selection events.
     * @param removed `true` if the selection items have been removed from the selection set. `false` otherwise.
     */
    selectionArray?: (selectionEvents: NodeSelectionEvent[], removed: boolean) => void;
    /**
     * Triggered when a drawing sheet has been activated.
     * @param nodeId The node ID of the activated sheet.
     */
    sheetActivated?: (nodeId: SheetId) => void;
    /**
     * Triggered when drawing sheets have been deactivated.
     */
    sheetDeactivated?: () => void;
    /**
     * Triggered when the client begins streaming data from the server.
     */
    streamingActivated?: () => void;
    /**
     * Triggered when streaming from the client has stopped.
     */
    streamingDeactivated?: () => void;
    /**
     * Triggered when a subtree has been deleted.
     *
     * @param modelRootIds A list of deleted subtree roots.
     */
    subtreeDeleted?: (modelRootIds: NodeId[]) => void;
    /**
     * Triggered when a subtree has been loaded.
     * This includes loading a model as well as directly creating nodes.
     *
     * @param modelRootIds A list of loaded subtree roots.
     */
    subtreeLoaded?: (modelRootIds: NodeId[], source: NodeSource) => void;
    /**
     * Triggered when a timeout due to inactivity occurs.
     */
    timeout?: () => void;
    /**
     * Triggered when a timeout due to inactivity is about to occur.
     *
     * @param minutesRemaining The remaining time until the [[timeout]] callback gets triggered.
     */
    timeoutWarning?: (minutesRemaining: number) => void;
    /**
     * Triggered when a camera transition begins.
     *
     * @param duration The duration of the transition in milliseconds.
     * @param view The View the camera transition started in.
     */
    transitionBegin?: (duration: number, view: IView) => void;
    /**
     * Triggered when a camera transition ends.
     *
     * @param view the View the camera transition ended in.
     */
    transitionEnd?: (view: IView) => void;
    /**
     * Triggered after the view axes have been set.
     *
     * @param frontVector The front vector of the view.
     * @param upVector The up vector of the view.
     */
    viewAxes?: (frontVector: Point3, upVector: Point3) => void;
    /**
     * Triggered when a view is created or by creating a redline item when no view is active.
     *
     * @param view The created markup view.
     *
     * See also:
     *  - [[MarkupManager.createMarkupView]]
     */
    viewCreated?: (view: MarkupView) => void;
    /**
     * Triggered when a view is deactivated.
     *
     * @param view The deactivated markup view.
     *
     * See also:
     *  - [[MarkupManager.activateMarkupView]]
     *  - [[MarkupManager.deleteMarkupView]]
     */
    viewDeactivated?: (view: MarkupView) => void;
    /**
     * Triggered when a view is deleted.
     *
     * @param view The deleted markup view.
     *
     * See also:
     *  - [[MarkupManager.deleteMarkupView]]
     */
    viewDeleted?: (view: MarkupView) => void;
    /**
     * Triggered when a view is loaded from data.
     *
     * @param view The loaded markup view.
     *
     * See also:
     *  - [[MarkupManager.loadMarkupData]]
     */
    viewLoaded?: (view: MarkupView) => void;
    /**
     * Triggered after the view orientation has changed.
     *
     * @param orientation The new view orientation.
     * @param view the View the orientation was set for.
     *
     * See also:
     *  - [[View.setViewOrientation]]
     */
    viewOrientation?: (orientation: ViewOrientation, view: IView) => void;
    /**
     * Triggered when nodes are shown or hidden. If `shownBodyIds` and `hiddenBodyIds` are both
     * empty, only the visibility of structural nodes (nodes that do not directly contain
     * geometry) changed.
     *
     * @param shownBodyIds IDs of `Body` nodes that were shown.
     * @param hiddenBodyIds IDs of `Body` nodes that were hidden.
     */
    visibilityChanged?: (shownBodyIds: BodyId[], hiddenBodyIds: BodyId[]) => void;
    /**
     * Triggered when the [[Operator.CameraWalkOperator]] becomes active.
     */
    walkOperatorActivated?: () => void;
    /**
     * triggered when the [[Operator.CameraWalkOperator]] is deactivated.
     */
    walkOperatorDeactivated?: () => void;
    /**
     * Triggered when the browser causes the WebGL context to be lost and rendering cannot continue.
     */
    webGlContextLost?: () => void;
    /**
     * Triggered when the browser stream websocket connection is closed.
     */
    websocketConnectionClosed?: () => void;
    /**
     * Triggered during load progress of HTTP requests.
     *
     * Happens when an error occurs during the loading of a model via an HTTP request.
     * For some errors (e.g. 404) make sure to check the status of XHRonloadend instead.
     *
     * @param errorEvent Describes the error.
     */
    XHRonerror?: (errorEvent: ErrorEvent) => void;
    /**
     * Triggered when an HTTP request completes.
     *
     * A completed HTTP request does not necessarily indicate success.
     * Make sure to check the return status.
     *
     * @param progressEvent Describes the progress of the completed load.
     * @param status The status of the request.
     * @param uri The URI of the request.
     *
     * See also:
     *   - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     */
    XHRonloadend?: (progressEvent: ProgressEvent, status: number, uri: string) => void;
    /**
     * Triggered during load progress of HTTP requests.
     *
     * Happens when loading a model via an HTTP request.
     *
     * @param progressEvent Describes the progress of the load.
     */
    XHRonprogress?: (progressEvent: ProgressEvent) => void;
}
