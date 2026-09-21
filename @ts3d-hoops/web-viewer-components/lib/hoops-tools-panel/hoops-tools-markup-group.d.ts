import { LitElement } from 'lit';
/**
 * Renders markup note tools and the note text list in the tools panel.
 *
 * @element hoops-tools-markup-group
 *
 * @service {INoteTextService} NoteTextService - Service used to manage note text markups
 * @service {WebViewerContextManager} ContextManager - Context manager used to switch active operator
 *
 * @cssprop --hoops-foreground - Foreground color used for list rows and borders
 * @cssprop --hoops-accent-foreground - Accent color used for selected and hover states
 *
 * @example
 * ```html
 * <hoops-tools-markup-group></hoops-tools-markup-group>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsToolsGroupMarkupElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult;
    private contextManager?;
    private webViewerState?;
    private service?;
    private setActiveTool;
    onMarkupsUpdated: () => void;
    /**
     * @internal
     */
    firstUpdated(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    private selectMarkup;
    /** @internal */
    protected render(): unknown;
}
export default HoopsToolsGroupMarkupElement;
