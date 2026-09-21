import { LitElement } from 'lit';
/**
 * Displays the toolbar dropdown for selecting draw modes.
 *
 * @element hoops-toolbar-drawmode
 *
 * @attribute {'bottom' | 'top' | 'right' | 'left'} dropDownPosition - Dropdown placement relative to the button
 *
 * @service {WebViewerContextManager} ContextManager - Context manager used to set draw mode
 *
 * @example
 * ```html
 * <hoops-toolbar-drawmode dropDownPosition="right"></hoops-toolbar-drawmode>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsDrawmodeButtonElement extends LitElement {
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
    private setDrawMode;
    /** @internal */
    protected render(): unknown;
}
export default HoopsDrawmodeButtonElement;
