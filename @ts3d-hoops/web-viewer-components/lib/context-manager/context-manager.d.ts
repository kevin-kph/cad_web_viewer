import { LitElement } from 'lit';
import { DrawModeName, OperatorId, WebViewer } from '@ts3d-hoops/web-viewer';
import { WebViewerState } from './types';
export declare const contextManagerContext: {
    __context__: WebViewerContextManager;
};
export declare const webViewerContext: {
    __context__: WebViewer;
};
export declare const webViewerStateContext: {
    __context__: WebViewerState;
};
/**
 * Provides centralized context management for the Hoops Web Viewer ecosystem.
 *
 * This component acts as a context provider that manages the global state and coordinates
 * communication between different web viewer components. It provides shared access to
 * the WebViewer instance, state management, and service coordination.
 *
 * @element hoops-web-viewer-context-manager
 *
 * @example
 * ```html
 * <hoops-web-viewer-context-manager></hoops-web-viewer-context-manager>
 *
 * <script>
 *   document.getElementsByTagName('hoops-web-viewer-context-manager')[0].webViewer = webViewerInstance;
 * </script>
 * ```
 *
 * @since 2025.8.0
 */
export default class WebViewerContextManager extends LitElement {
    webviewerState: WebViewerState;
    contextManager: WebViewerContextManager;
    private _webViewer?;
    /**
     * Gets the current WebViewer instance.
     *
     * @returns {WebViewer | undefined} The current WebViewer instance or undefined if not set
     */
    get webViewer(): WebViewer | undefined;
    /**
     * Sets the WebViewer instance and initializes all associated services.
     * When set, automatically configures service dependencies and refreshes operator states.
     *
     * @param value - The WebViewer instance to set
     * @returns {void}
     */
    set webViewer(value: WebViewer | undefined);
    /**
     * Updates the web viewer state with the specified draw mode.
     * Dispatches state change to all consuming components via context.
     *
     * @internal
     * @param drawMode - The new draw mode to set in the state
     * @returns {void}
     */
    private dispatchDrawMode;
    /**
     * Sets the draw mode for the web viewer and updates the context state.
     * Changes how 3D models are rendered (wireframe, shaded, etc.).
     *
     * @param drawMode - The draw mode to apply to the web viewer
     * @returns {void}
     */
    setDrawMode(drawMode: DrawModeName): void;
    /**
     * Resets the web viewer and all associated services to their initial state.
     * Clears all active operations, handles, and resets service states.
     *
     * @returns {Promise<void>} Promise that resolves when reset is complete
     */
    reset(): Promise<void>;
    /**
     * Updates the web viewer state with the specified camera operator.
     * Dispatches camera operator change to all consuming components via context.
     *
     * @internal
     * @param cameraOp - The camera operator ID to set in the state
     * @returns {void}
     */
    private dispatchCameraOperator;
    /**
     * Updates the web viewer state with the specified tool operator.
     * Dispatches tool operator change to all consuming components via context.
     *
     * @internal
     * @param redlineOperator - The tool operator ID to set in the state
     * @returns {void}
     */
    private dispatchToolOperator;
    /**
     * Refreshes the camera operator state from the web viewer and updates the context.
     * Synchronizes the context state with the current camera operator.
     *
     * @returns {void}
     */
    refreshCameraOperator(): void;
    /**
     * Refreshes the tool operator state from the web viewer and updates the context.
     * Synchronizes the context state with the current active tool operator.
     *
     * @returns {void}
     */
    refreshToolOperator(): void;
    /**
     * Sets the active redline operator for drawing markup annotations.
     * Validates the operator ID against supported redline modes before setting.
     *
     * @param redlineOperatorId - The redline operator ID to activate
     * @returns {void}
     */
    setRedlineOperator(redlineOperatorId: OperatorId): void;
    /**
     * Checks if a redline operator is currently active.
     * Returns true if any redline drawing mode is currently enabled.
     *
     * @returns {boolean} True if a redline operator is active, false otherwise
     */
    isRedlineOperatorActive(): boolean;
    /**
     * Gets the currently active tool operator.
     * Returns the operator ID if a tool is active, undefined otherwise.
     *
     * @returns {OperatorId | undefined} The active tool operator ID or undefined if none is active
     */
    get activeToolOperator(): OperatorId | undefined;
    /**
     * Sets the active tool operator and updates the context state.
     * Activates the specified operator in the web viewer's operator manager and
     * synchronizes the context state to notify all consuming components.
     *
     * @param value - The operator ID to set as active, or undefined to clear
     * @returns {void}
     */
    set activeToolOperator(value: OperatorId | undefined);
    /**
     * Returns the element itself as the render root instead of creating a shadow DOM.
     * This ensures the context provider doesn't interfere with application styling.
     *
     * @internal
     * @returns {Element} The element itself
     */
    protected createRenderRoot(): this;
    /** @internal */
    protected render(): unknown;
}
export { WebViewerContextManager };
