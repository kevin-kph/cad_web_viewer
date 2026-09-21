import { LitElement } from 'lit';
/**
 * Displays the toolbar dropdown for redline markup tools.
 *
 * @element hoops-toolbar-redlines
 *
 * @service {WebViewerContextManager} ContextManager - Context manager used to set redline operator
 *
 * @example
 * ```html
 * <hoops-toolbar-redlines></hoops-toolbar-redlines>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsRedlinesButtonElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    private contextManager?;
    private webViewerState?;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    private handleKeyDown;
    private setRedlineMode;
    /** @internal */
    protected render(): unknown;
}
export default HoopsRedlinesButtonElement;
