import { LitElement } from 'lit';
/**
 * Displays the toolbar button used to toggle the views panel.
 *
 * @element hoops-toolbar-views
 *
 * @attribute {'default' | 'accent'} color - Color style for the button
 *
 * @example
 * ```html
 * <hoops-toolbar-views color="accent"></hoops-toolbar-views>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsViewsButtonElement extends LitElement {
    color: 'default' | 'accent';
    /** @internal */
    protected render(): unknown;
}
export default HoopsViewsButtonElement;
