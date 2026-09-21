import { LitElement } from 'lit-element';
/**
 * A custom web component that implements an accessible accordion using LitElement.
 *
 * @element hoops-accordion
 *
 * @slot header - Slot for the accordion header content
 * @slot toolbar - Slot for the accordion header toolbar
 * @slot icon - Slot for the accordion icon, defaults to an arrow icon
 * @slot content - Slot for the accordion content
 *
 * @csspart button - The button element that toggles the accordion
 * @csspart panel - The panel element that contains the accordion content
 *
 * @cssprop --hoops-svg-accent-color - The accent color for the accordion
 * @cssprop --hoops-svg-fill-color - The fill color for the accordion icon
 * @cssprop --hoops-background - The background color for the accordion panel
 * @cssprop --hoops-neutral-background-50 - The background color of accordion button
 * @cssprop --hoops-foreground - The foreground color for the accordion text
 *
 * @fires change - Dispatched when the accordion is toggled
 *
 * @attribute {boolean} expanded - Indicates whether the accordion is expanded
 * @attribute {boolean} disabled - Indicates whether the accordion is disabled
 * @attribute {number} level - The aria-level attribute for the heading element
 *
 * @example <hoops-accordion expanded><span slot="header">My Header</span><div slot="content">Content here</div></hoops-accordion>
 *
 * @since 2025.8.0
 */
export declare class HoopsAccordion extends LitElement {
    expanded: boolean;
    disabled: boolean;
    level?: number;
    /** @internal */
    static styles: import('lit-element').CSSResult;
    /** @internal */
    protected render(): unknown;
    /**
     * Toggles the accordion's expanded state.
     * @internal
     */
    private _toggle;
}
export default HoopsAccordion;
