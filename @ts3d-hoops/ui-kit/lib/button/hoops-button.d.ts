import { LitElement } from 'lit';
/**
 * A customizable button component with icon support and multiple styling options.
 *
 * Provides a flexible button implementation with configurable colors, sizes, and accessibility features.
 * Supports keyboard navigation and can be disabled when needed.
 *
 * @element hoops-button
 *
 * @slot icon - Icon content to display before the button text
 * @slot - Default slot for button text content
 *
 * @cssprop --hoops-neutral-foreground - Default text color for the button
 * @cssprop --hoops-accent-foreground - Text color when using accent color variant
 * @cssprop --hoops-neutral-foreground-active - Text color when button is hovered/focused/active
 * @cssprop --hoops-accent-foreground-active - Accent text color when button is hovered/focused/active
 * @cssprop --hoops-neutral-background-hover - Background color on hover/focus/active states
 * @cssprop --hoops-svg-stroke-color - Stroke color for SVG icons in accent mode
 * @cssprop --hoops-xl-icon-button-content-size - Size for extra large icons
 * @cssprop --hoops-md-icon-button-content-size - Size for medium icons
 * @cssprop --hoops-sm-icon-button-content-size - Size for small icons
 *
 * @attribute {string} tabindex - Tab order index for keyboard navigation
 * @attribute {string} role - ARIA role for accessibility
 * @attribute {string} iconSize - Size of the icon (xl, md, sm)
 * @attribute {'default' | 'accent'} color - Color variant of the button
 * @attribute {boolean} disabled - Whether the button is disabled
 *
 * @example
 * ```html
 * <hoops-button color="accent" iconSize="md">
 *   <svg slot="icon">...</svg>
 *   Click me
 * </hoops-button>
 * ```
 *
 * @since 2025.7.0
 */
export default class HoopsButton extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    constructor();
    /**
     * Handles keyboard interactions for the button.
     *
     * @param keypressEvent - The keyboard event to handle
     * @returns void
     *
     * @internal
     */
    handleKeypress(keypressEvent: KeyboardEvent): void;
    /**
     * Tab order index for keyboard navigation.
     *
     * @default '0'
     */
    tabindex: string;
    /**
     * ARIA role for accessibility.
     *
     * @default 'button'
     */
    role: string;
    /**
     * Size of the icon displayed in the button.
     *
     * @default 'md'
     */
    iconSize: string;
    /**
     * Color variant of the button.
     *
     * @default 'default'
     */
    color: 'default' | 'accent';
    /**
     * Whether the button is disabled and non-interactive.
     *
     * @default false
     */
    disabled: boolean;
    /** @internal */
    protected render(): unknown;
}
