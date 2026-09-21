import { LitElement } from 'lit';
/**
 * Displays the toolbar dropdown for selecting the active camera operator.
 *
 * @element hoops-toolbar-camera-operator
 *
 * @attribute {'bottom' | 'top' | 'right' | 'left'} dropDownPosition - Dropdown placement relative to the button
 *
 * @service {IFloorplanService} FloorplanService - Service reset when entering walk mode
 * @service {WebViewerContextManager} ContextManager - Context manager used to set camera operator
 *
 * @example
 * ```html
 * <hoops-toolbar-camera-operator dropDownPosition="right"></hoops-toolbar-camera-operator>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsCameraOperatorButtonElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * Represents the position where the dropdown is located relative to the button.
     * Possible values are "bottom", "top", "right", or "left".
     * Default value is "right".
     */
    dropDownPosition: 'bottom' | 'top' | 'right' | 'left';
    private contextManager?;
    private webViewerState?;
    private setCameraOp;
    /** @internal */
    protected render(): unknown;
}
