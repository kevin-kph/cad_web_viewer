import { LitElement } from 'lit';
/**
 * Displays the toolbar button used to open the tools panel.
 *
 * @element hoops-toolbar-tools
 *
 * @attribute {'default' | 'accent'} color - Color style for the button
 *
 * @example
 * ```html
 * <hoops-toolbar-tools color="accent"></hoops-toolbar-tools>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsToolsButtonElement extends LitElement {
    color: 'default' | 'accent';
    /** @internal */
    protected render(): unknown;
}
export default HoopsToolsButtonElement;
