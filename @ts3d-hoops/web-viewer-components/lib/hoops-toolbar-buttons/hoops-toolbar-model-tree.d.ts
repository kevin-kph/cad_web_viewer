import { LitElement } from 'lit';
/**
 * Displays the toolbar button used to toggle the model tree panel.
 *
 * @element hoops-toolbar-model-tree
 *
 * @attribute {'default' | 'accent'} color - Color style for the button
 *
 * @example
 * ```html
 * <hoops-toolbar-model-tree color="accent"></hoops-toolbar-model-tree>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsModelTreeButtonElement extends LitElement {
    color: 'default' | 'accent';
    /** @internal */
    protected render(): unknown;
}
export default HoopsModelTreeButtonElement;
