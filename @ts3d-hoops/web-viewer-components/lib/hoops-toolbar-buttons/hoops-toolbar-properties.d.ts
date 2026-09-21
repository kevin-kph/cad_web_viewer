import { LitElement } from 'lit';
/**
 * Displays the toolbar button used to toggle the properties panel.
 *
 * @element hoops-toolbar-properties
 *
 * @attribute {'default' | 'accent'} color - Color style for the button
 *
 * @example
 * ```html
 * <hoops-toolbar-properties color="accent"></hoops-toolbar-properties>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsPropertiesButtonElement extends LitElement {
    color: 'default' | 'accent';
    /** @internal */
    protected render(): unknown;
}
export default HoopsPropertiesButtonElement;
