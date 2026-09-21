import { LitElement } from 'lit';
/**
 * Displays the toolbar button used to open CAD configuration controls.
 *
 * @element hoops-toolbar-cad-configuration
 *
 * @attribute {'default' | 'accent'} color - Color style for the button
 *
 * @example
 * ```html
 * <hoops-toolbar-cad-configuration color="accent"></hoops-toolbar-cad-configuration>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsCadConfigurationButtonElement extends LitElement {
    color: 'default' | 'accent';
    /** @internal */
    protected render(): unknown;
}
export default HoopsCadConfigurationButtonElement;
