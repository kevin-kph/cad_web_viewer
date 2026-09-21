import { LitElement } from 'lit';
/**
 * Displays the toolbar camera dropdown for projection and orientation actions.
 *
 * @element hoops-toolbar-camera
 *
 * @attribute {'bottom' | 'top' | 'right' | 'left'} dropDownPosition - Dropdown placement relative to the button
 *
 * @service {ICameraService} CameraService - Service used to configure projection mode
 * @service {WebViewerContextManager} ContextManager - Context manager used to apply view orientation
 *
 * @example
 * ```html
 * <hoops-toolbar-camera dropDownPosition="right"></hoops-toolbar-camera>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsCameraButtonElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * Represents the position where the dropdown is located relative to the button.
     * Possible values are "bottom", "top", "right", or "left".
     * Default value is "right".
     */
    dropDownPosition: 'bottom' | 'top' | 'right' | 'left';
    private faceSelected;
    private contextManager?;
    private cameraService;
    private webViewer?;
    private webViewerContext;
    private webViewerCallbacks?;
    private webViewerChanged;
    private orientToFace;
    private setProjection;
    private setOrientation;
    handleServiceUpdate: () => void;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /** @internal */
    protected render(): unknown;
}
export default HoopsCameraButtonElement;
