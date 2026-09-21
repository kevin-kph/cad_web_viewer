import { LitElement } from 'lit';
/**
 * Renders one selectable markup item with icon and toolbar content.
 *
 * @element hoops-markup-item
 *
 * @slot - Slot for markup text label content
 * @slot icon - Slot for the markup type icon
 * @slot toolbar - Slot for trailing markup actions
 *
 * @fires hoops-select-markup - Emitted when the markup item is selected
 *
 * @attribute {string} markupId - Unique markup identifier
 * @attribute {boolean} selected - Indicates whether the item is selected
 *
 * @cssprop --hoops-foreground - Foreground color for row and separators
 * @cssprop --hoops-accent-foreground - Accent color used on hover and selected states
 *
 * @example
 * ```html
 * <hoops-markup-item markupId="markup-1" selected>
 *   Label
 *   <hoops-icon slot="icon"></hoops-icon>
 * </hoops-markup-item>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsMarkupItemElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult;
    markupId: string;
    selected: boolean;
    /** @internal */
    protected render(): unknown;
}
export default HoopsMarkupItemElement;
