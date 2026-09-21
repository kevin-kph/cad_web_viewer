import { LitElement, PropertyValueMap } from 'lit';
import { WebViewer, RendererType, StreamingMode, BoundingPreviewMode, WebViewerConfig } from '@ts3d-hoops/web-viewer';
import { default as WebViewerContextManager } from './context-manager';
export type * from './custom-events';
/**
 * A simple HTML tag to quickly initialize a complete viewer.
 *
 * This component provides a full-featured 3D model viewer with support for loading models,
 * navigation, selection, markup, and various visualization modes.
 *
 * @element hoops-web-viewer
 *
 * @fires hwvAddCuttingSection - Emitted when a cutting section is added
 * @fires hwvAssemblyTreeReady - Emitted when the assembly tree is ready
 * @fires hwvBcfLoaded - Emitted when a BCF file is loaded
 * @fires hwvBcfRemoved - Emitted when a BCF file is removed
 * @fires hwvBeginInteraction - Emitted when user interaction begins
 * @fires hwvCadViewCreated - Emitted when a CAD view is created
 * @fires hwvCamera - Emitted when camera position changes
 * @fires hwvCappingIdle - Emitted when capping becomes idle
 * @fires hwvConfigurationActivated - Emitted when a configuration is activated
 * @fires hwvContextMenu - Emitted when context menu is requested
 * @fires hwvCuttingPlaneDrag - Emitted during cutting plane drag
 * @fires hwvCuttingPlaneDragEnd - Emitted when cutting plane drag ends
 * @fires hwvCuttingPlaneDragStart - Emitted when cutting plane drag starts
 * @fires hwvCuttingSectionsLoaded - Emitted when cutting sections are loaded
 * @fires hwvEndInteraction - Emitted when user interaction ends
 * @fires hwvExplode - Emitted when explode state changes
 * @fires hwvFirstModelLoaded - Emitted when the first model is loaded
 * @fires hwvFrameDrawn - Emitted when a frame is drawn
 * @fires hwvHandleEvent - Emitted during a handle event
 * @fires hwvHandleEventEnd - Emitted when a handle event ends
 * @fires hwvHandleEventStart - Emitted when a handle event starts
 * @fires hwvHwfParseComplete - Emitted when HWF parsing is complete
 * @fires hwvIncrementalSelectionBatchBegin - Emitted when incremental selection batch begins
 * @fires hwvIncrementalSelectionBatchEnd - Emitted when incremental selection batch ends
 * @fires hwvIncrementalSelectionEnd - Emitted when incremental selection ends
 * @fires hwvInfo - Emitted with informational messages
 * @fires hwvLineCreated - Emitted when a line markup is created
 * @fires hwvLineDeleted - Emitted when a line markup is deleted
 * @fires hwvLineLoaded - Emitted when a line markup is loaded
 * @fires hwvMeasurementBegin - Emitted when measurement begins
 * @fires hwvMeasurementCreated - Emitted when a measurement is created
 * @fires hwvMeasurementDeleted - Emitted when a measurement is deleted
 * @fires hwvMeasurementHidden - Emitted when a measurement is hidden
 * @fires hwvMeasurementLoaded - Emitted when a measurement is loaded
 * @fires hwvMeasurementShown - Emitted when a measurement is shown
 * @fires hwvMeasurementValueSet - Emitted when a measurement value is set
 * @fires hwvMissingModel - Emitted when a model is missing
 * @fires hwvModelLoadBegin - Emitted when model loading begins
 * @fires hwvModelLoadFailure - Emitted when model loading fails
 * @fires hwvModelStructureHeaderParsed - Emitted when model structure header is parsed
 * @fires hwvModelStructureReady - Emitted when the model structure is loaded
 * @fires hwvModelSwitched - Emitted when the model is switched
 * @fires hwvModelSwitchStart - Emitted when model switching starts
 * @fires hwvNoteTextCreated - Emitted when a note text is created
 * @fires hwvNoteTextDeleted - Emitted when a note text is deleted
 * @fires hwvNoteTextHidden - Emitted when a note text is hidden
 * @fires hwvNoteTextShown - Emitted when a note text is shown
 * @fires hwvNoteTextUpdated - Emitted when a note text is updated
 * @fires hwvOverlayViewportSet - Emitted when overlay viewport is set
 * @fires hwvReady - Emitted when the web viewer is initialized and ready
 * @fires hwvRedlineCreated - Emitted when a redline is created
 * @fires hwvRedlineDeleted - Emitted when a redline is deleted
 * @fires hwvRedlineUpdated - Emitted when a redline is updated
 * @fires hwvRemoveCuttingSection - Emitted when a cutting section is removed
 * @fires hwvSceneReady - Emitted when the scene is ready
 * @fires hwvSelectionArray - Emitted when selection changes
 * @fires hwvSheetActivated - Emitted when a sheet is activated
 * @fires hwvSheetDeactivated - Emitted when a sheet is deactivated
 * @fires hwvStreamingActivated - Emitted when streaming is activated
 * @fires hwvStreamingDeactivated - Emitted when streaming is deactivated
 * @fires hwvSubtreeDeleted - Emitted when a subtree is deleted
 * @fires hwvSubtreeLoaded - Emitted when a subtree is loaded
 * @fires hwvTimeout - Emitted on session timeout
 * @fires hwvTimeoutWarning - Emitted before session timeout
 * @fires hwvTransitionBegin - Emitted when a transition begins
 * @fires hwvTransitionEnd - Emitted when a transition ends
 * @fires hwvViewAxes - Emitted when view axes change
 * @fires hwvViewCreated - Emitted when a view is created
 * @fires hwvViewDeactivated - Emitted when a view is deactivated
 * @fires hwvViewDeleted - Emitted when a view is deleted
 * @fires hwvViewLoaded - Emitted when a view is loaded
 * @fires hwvViewOrientation - Emitted when view orientation changes
 * @fires hwvVisibilityChanged - Emitted when visibility changes
 * @fires hwvWalkOperatorActivated - Emitted when walk operator is activated
 * @fires hwvWalkOperatorDeactivated - Emitted when walk operator is deactivated
 * @fires hwvWebGlContextLost - Emitted when WebGL context is lost
 * @fires hwvWebsocketConnectionClosed - Emitted when websocket connection closes
 * @fires hwvXHRonerror - Emitted on XHR error
 * @fires hwvXHRonloadend - Emitted when XHR load ends
 * @fires hwvXHRonprogress - Emitted on XHR progress
 *
 * @attribute {string} endpointuri - Specifies the endpoint to be used by the viewer.
 * @attribute {string} model - Specifies the instance name to be loaded.
 * @attribute {string} sessiontoken - An arbitrary value used for authentication.
 * @attribute {string} renderertype - Specifies the renderer type to be used.
 * @attribute {boolean} empty - Whether the viewer should be started without connecting to a server or loading a model.
 * @attribute {boolean} usepointerevents - Specifies whether pointer events should be used when available.
 * @attribute {string} streamingmode - Sets the streaming mode that the viewer will use.
 * @attribute {number} memorylimit - Controls the amount of mesh data present on the client machine at given time.
 * @attribute {string} boundingpreviewmode - Specifies what types of bounding previews should be rendered.
 * @attribute {number} defaultmeshlevel - Specifies which mesh detail level will be used to initially stream the model.
 * @attribute {number} streamcutoffscale - Specifies a scale factor that will be applied to the streaming size cutoff.
 * @attribute {boolean} disableautomaticbackgroundsheets - If true, then automatic generation of background sheets for drawings is not performed when the drawing is loaded.
 * @attribute {boolean} disableautomaticfloorplanoverlay - If true, then the floorplan overlay capability will not be displayed automatically for BIM enabled models.
 * @attribute {boolean} calculatedefaultviewaxes - If true, the default view axes will be calculated from the initial camera unless explicitly set during authoring time.
 * @attribute {boolean} disableautomaticfitworld - If true, disable automatic fitworld on camera activation when there is no camera on view.
 * @attribute {boolean} enableshatteredmodeluiviews - If true, then CAD views contained within external models will populate the model tree UI.
 * @attribute {string} enginepath - Path containing the graphics engine `.wasm` files.
 * @attribute {number} defaultmetallicfactor - Sets a default metallic factor that will be applied to ALL non PBR materials in the scene.
 * @attribute {number} defaultroughnessfactor - Sets a default roughness factor that will be applied to ALL non PBR materials in the scene.
 *
 * @example
 * ```html
 * <hoops-web-viewer endpointuri="/models/sample.scs" enginepath="/engine">
 * </hoops-web-viewer>
 *
 * <script>
 *   const viewer = document.getElementsByTagName('hoops-web-viewer')[0];
 *   viewer.addEventListener('hwvReady', (event) => {
 *     console.log('Viewer ready:', event.detail);
 *   });
 * </script>
 * ```
 *
 * @since 2025.8.0
 */
export declare class WebViewerComponent extends LitElement implements WebViewerConfig {
    static styles: import('lit').CSSResult[];
    /**
     * The internal WebViewer instance.
     * @internal
     */
    private hwv;
    private modelStructureReady;
    /**
     * The DOM container element that hosts the WebViewer canvas.
     * Automatically assigned during component initialization.
     */
    container: HTMLElement;
    /**
     * Context manager for coordinating component communication.
     * Automatically injected when the component is within a context manager.
     */
    contextManager?: WebViewerContextManager;
    /**
     * Specifies the endpoint to be used by the viewer. This can be of type: http, https or ws.
     */
    endpointUri?: string;
    /**
     * Specifies the instance name to be loaded. This option is required if you specify an enpdointUri of type `ws://` or `wss://`.
     */
    model?: string;
    /**
     * An arbitrary value used for authentication. If used, it must match the token expected by the server for connection to proceed.
     */
    sessionToken?: string;
    /**
     * Specifies the renderer type to be used.
     * Any invalid value will be converted to \`RendererType.Client\`.
     */
    rendererType?: RendererType;
    /**
     * Whether the viewer should be started without connecting to a server or loading a model.
     * @default false
     */
    empty: boolean;
    /**
     * Specifies whether pointer events should be used when available. Setting this option to false can be useful when using web views in GUI toolkits that rely on Internet Explorer.
     * @default false
     */
    usePointerEvents: boolean;
    /**
     * Sets the streaming mode that the viewer will use.
     * Any invalid value will be converted to \`StreamingMode.Default\`.
     */
    streamingMode?: StreamingMode;
    /**
     * Controls the amount of mesh data present on the client machine at given time. This value is expressed in [Mebibytes](https://en.wikipedia.org/wiki/Mebibyte).
     */
    memoryLimit?: number;
    /**
     * Specifies what types of bounding previews should be rendered.
     * Any invalid value will be converted to \`StreamingMode.Default\`.
     */
    boundingPreviewMode?: BoundingPreviewMode;
    /**
     * Specifies which mesh detail level will be used to initially stream the model.
     */
    defaultMeshLevel?: number;
    /**
     * Specifies a scale factor that will be applied to the streaming size cutoff.
     *
     * In streaming sessions, an object whose projected size is lower than the cutoff will not be streamed until its projected size reaches the cutoff.
     *
     * In file sessions, when loading a tree via XML, a file whose projected size is lower than the cutoff will not be requested until its projected size reaches the cutoff.
     *
     * A value of 0 will disable the cutoff.  The value should be in the interval of [0.0, 2.0].
     * If unspecified, this value will default to 1.0 for streaming sessions and 0.0 (disabled) for file based sessions.
     */
    streamCutoffScale?: number;
    /**
     * If true, then automatic generation of background sheets for drawings is not performed when the drawing is loaded.
     * @default false
     */
    disableAutomaticBackgroundSheets: boolean;
    /**
     * If true, then the floorplan overlay capability will not be displayed automatically for BIM enabled models
     * @default false
     */
    disableAutomaticFloorplanOverlay: boolean;
    /**
     * If true, the default view axes will be calculated from the initial camera unless explicitly set during authoring time.
     * @default false
     */
    calculateDefaultViewAxes: boolean;
    /**
     * If true, disable automatic fitworld on camera activation when there is no camera on view
     * @default false
     */
    disableAutomaticFitWorld: boolean;
    /**
     * If true, then CAD views contained within external models will populate the model tree UI.
     * @default false
     */
    enableShatteredModelUiViews: boolean;
    /**
     * Path containing the graphics engine `.wasm` files. Follows the same rules as the `src` attribute of an HTML `script` tag.
     */
    enginePath?: string;
    /**
     * Sets a default metallic factor that will be applied to ALL non PBR materials in the scene. Acceptable value range is (0.0 - 1.0)
     * If [[defaultRoughnessFactor]] is specified and this value is omitted, a value of 1.0 will be assumed.
     */
    defaultMetallicFactor?: number;
    /**
     * Sets a default roughness factor that will be applied to ALL non PBR materials in the scene. . Acceptable value range is (0.0 - 1.0)
     * If [[defaultMetallicFactor]] is specified and this value is omitted, a value of 1.0 will be assumed.
     */
    defaultRoughnessFactor?: number;
    /**
     * Creates a new WebViewerComponent instance.
     * Initializes the component and binds event handlers.
     * @internal
     */
    constructor();
    /**
     * Handles window resize events by updating the viewer canvas dimensions.
     * @returns {void}
     * @internal
     */
    private handleResize;
    /**
     * Handles viewer initialization completion.
     * Sets up context manager, dispatches ready event, and binds viewer events.
     * @returns {void}
     * @internal
     */
    private handleReady;
    /**
     * Lifecycle callback invoked after the component's first update.
     * Creates and initializes the WebViewer instance with configured properties.
     * @param _changedProperties - Map of changed properties (unused)
     * @returns {void}
     * @internal
     */
    firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    /**
     * Lifecycle callback invoked when the component is added to the DOM.
     * Sets up window resize event listeners for responsive canvas sizing.
     * @returns {void}
     * @internal
     */
    connectedCallback(): void;
    /**
     * Lifecycle callback invoked when the component is removed from the DOM.
     * Cleans up event listeners and shuts down the WebViewer instance.
     * @returns {void}
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * Gets the underlying WebViewer instance.
     * Provides access to the full HOOPS Web Viewer API for advanced operations.
     * @returns {WebViewer | null} The WebViewer instance or null if not initialized
     */
    get viewer(): WebViewer | null;
    /**
     * Renders the component template.
     * Creates the container div that will host the WebViewer canvas and slots.
     * @returns {TemplateResult} The component's HTML template
     * @internal
     */
    render(): import('lit').TemplateResult<1>;
    /**
     * Binds WebViewer events to custom events for component communication.
     * Creates event listeners that forward viewer events as custom DOM events.
     * @param hwv - The WebViewer instance to bind events from
     * @returns {void}
     * @internal
     */
    bindEvents(hwv: WebViewer): void;
}
export default WebViewerComponent;
