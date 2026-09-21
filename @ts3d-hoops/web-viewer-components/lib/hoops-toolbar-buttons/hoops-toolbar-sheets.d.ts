import { LitElement } from 'lit';
/**
 * Displays the toolbar button used to toggle the sheets panel.
 *
 * @element hoops-toolbar-sheets
 *
 * @attribute {'default' | 'accent'} color - Color style for the button
 *
 * @example
 * ```html
 * <hoops-toolbar-sheets color="accent"></hoops-toolbar-sheets>
 * ```
 *
 * @since 2026.3.0
 */
export declare class HoopsSheetsButtonElement extends LitElement {
    /**
     * The color style for the button.
     *
     * @type {'default' | 'accent'}
     */
    color: 'default' | 'accent';
    /** @internal */
    protected render(): unknown;
}
export default HoopsSheetsButtonElement;
