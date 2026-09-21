import { LitElement } from 'lit';
/**
 * Displays the toolbar button used to toggle the layers panel.
 *
 * @element hoops-toolbar-layers
 *
 * @attribute {'default' | 'accent'} color - Color style for the button
 *
 * @example
 * ```html
 * <hoops-toolbar-layers color="accent"></hoops-toolbar-layers>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsLayersButtonElement extends LitElement {
    color: 'default' | 'accent';
    /** @internal */
    protected render(): unknown;
}
export default HoopsLayersButtonElement;
