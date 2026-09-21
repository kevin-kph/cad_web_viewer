import { LitElement } from 'lit';
/**
 * Displays an information icon button for viewer UI actions.
 *
 * @element hoops-info-button
 *
 * @attribute {string} tabindex - Keyboard tab order index for the button
 * @attribute {string} role - ARIA role applied to the host
 * @attribute {string} size - Size variant passed to the underlying icon button
 * @attribute {'default' | 'accent'} color - Color style of the icon button
 *
 * @example
 * ```html
 * <hoops-info-button color="accent" size="sm"></hoops-info-button>
 * ```
 *
 * @since 2025.7.0
 */
export declare class InfoButton extends LitElement {
    tabindex: string;
    role: string;
    size: string;
    color: 'default' | 'accent';
    /** @internal */
    protected render(): unknown;
}
export default InfoButton;
