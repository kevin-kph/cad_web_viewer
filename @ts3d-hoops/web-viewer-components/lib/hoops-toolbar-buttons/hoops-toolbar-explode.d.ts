import { LitElement } from 'lit';
import { WebViewer } from '@ts3d-hoops/web-viewer';
/**
 * Provides a toolbar button with a slider to control model explode magnitude.
 * Need to connect to a web viewer instance through the `webViewer` property to query model bounds before starting explode.
 *
 * @element hoops-toolbar-explode
 *
 * @attribute {'bottom' | 'top' | 'right' | 'left'} dropDownPosition - Defines where the explode dropdown is rendered relative to the button.
 *
 * @service {IExplodeService} ExplodeService - Service used to initialize, read, and update explode state.
 *
 * @example
 * ```html
 * <hoops-toolbar-explode dropDownPosition="right"></hoops-toolbar-explode>
 *
 * <script>
 *   const explodeButton = document.getElementsByTagName("hoops-toolbar-explode")[0];
 *   explodeButton.webViewer = webViewerInstance;
 * </script>
 * ```
 *
 * @since 2026.2.0
 */
export declare class HoopsExplodeButtonElement extends LitElement {
    /**
     * Represents the position where the dropdown is located relative to the button.
     * Possible values are "bottom", "top", "right", or "left".
     * Default value is "right".
     */
    dropDownPosition: 'bottom' | 'top' | 'right' | 'left';
    /**
     * Connected web viewer instance used to query model bounds before starting explode.
     */
    webViewer: WebViewer | null;
    private explodeService;
    private handleServiceUpdate;
    /** @internal */
    connectedCallback(): void;
    /** @internal */
    disconnectedCallback(): void;
    private handleExplodeChange;
    /** @internal */
    protected render(): unknown;
}
export default HoopsExplodeButtonElement;
