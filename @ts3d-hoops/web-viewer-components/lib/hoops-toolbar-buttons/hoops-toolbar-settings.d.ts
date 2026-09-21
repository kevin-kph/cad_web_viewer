import { LitElement } from 'lit';
/**
 * Displays the toolbar button used to toggle the settings panel.
 *
 * @element hoops-toolbar-settings
 *
 * @attribute {'default' | 'accent'} color - Color style for the button
 *
 * @example
 * ```html
 * <hoops-toolbar-settings color="accent"></hoops-toolbar-settings>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsSettingsButtonElement extends LitElement {
    color: 'default' | 'accent';
    /** @internal */
    protected render(): unknown;
}
export default HoopsSettingsButtonElement;
