import { LitElement } from 'lit';
/**
 * Displays the toolbar home button that resets the viewer camera and state.
 *
 * @element hoops-toolbar-home
 *
 * @service {WebViewerContextManager} ContextManager - Context manager used to execute reset action
 *
 * @example
 * ```html
 * <hoops-toolbar-home></hoops-toolbar-home>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsHomeButtonElement extends LitElement {
    private contextManager?;
    private action;
    /** @internal */
    protected render(): unknown;
}
export default HoopsHomeButtonElement;
