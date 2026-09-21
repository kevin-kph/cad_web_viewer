import { LitElement } from 'lit';
/**
 * Renders selection tool actions in the tools panel.
 *
 * @element hoops-tools-select-group
 *
 * @service {WebViewerContextManager} ContextManager - Context manager used to switch active tool operator
 *
 * @example
 * ```html
 * <hoops-tools-select-group></hoops-tools-select-group>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsToolsSelectGroupElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult;
    private contextManager?;
    private webViewerState?;
    private setActiveTool;
    /** @internal */
    protected render(): unknown;
}
export default HoopsToolsSelectGroupElement;
