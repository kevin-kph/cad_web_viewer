import { LitElement } from 'lit';
/**
 * Displays the toolbar button used to toggle the types panel.
 *
 * @element hoops-toolbar-types
 *
 * @attribute {'default' | 'accent'} color - Color style for the button
 *
 * @example
 * ```html
 * <hoops-toolbar-types color="accent"></hoops-toolbar-types>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsTypesButtonElement extends LitElement {
    color: 'default' | 'accent';
    /** @internal */
    protected render(): unknown;
}
export default HoopsTypesButtonElement;
