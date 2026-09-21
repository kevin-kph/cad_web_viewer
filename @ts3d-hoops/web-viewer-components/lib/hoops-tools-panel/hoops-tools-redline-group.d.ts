import { LitElement } from 'lit';
/**
 * Renders redline tool actions and the redline tree in the tools panel.
 *
 * @element hoops-tools-redline-group
 *
 * @service {IRedlineService} RedlineService - Service used to manage redline markups
 * @service {WebViewerContextManager} ContextManager - Context manager used to switch active operator
 *
 * @cssprop --hoops-foreground - Foreground color used for list rows and borders
 * @cssprop --hoops-accent-foreground - Accent color used for selected and hover states
 *
 * @example
 * ```html
 * <hoops-tools-redline-group></hoops-tools-redline-group>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsToolsRedlineGroupElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult;
    private contextManager?;
    private webViewerState?;
    private setActiveTool;
    private service?;
    onMarkupsUpdated: () => void;
    /**
     * @internal
     */
    firstUpdated(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /** @internal */
    protected render(): unknown;
}
export default HoopsToolsRedlineGroupElement;
