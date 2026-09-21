import { LitElement } from 'lit';
/**
 * A circular icon button component with customizable size, color, and accessibility features.
 *
 * Provides a clickable button specifically designed for displaying icons with proper
 * keyboard navigation, hover effects, and disabled states.
 *
 * @element hoops-icon-button
 *
 * @slot - Default slot for icon content (typically SVG elements)
 *
 * @cssprop --hoops-neutral-foreground - Default icon color
 * @cssprop --hoops-accent-foreground - Icon color when using accent variant
 * @cssprop --hoops-neutral-foreground-active - Icon color when button is hovered/focused/active
 * @cssprop --hoops-accent-foreground-active - Accent icon color when button is hovered/focused/active
 * @cssprop --hoops-neutral-background-hover - Background color on hover/focus/active states
 * @cssprop --hoops-svg-stroke-color - Stroke color for SVG icons in accent mode
 * @cssprop --hoops-xl-icon-button-size - Size of extra large button container
 * @cssprop --hoops-xl-icon-button-content-size - Size of extra large button content
 * @cssprop --hoops-md-icon-button-size - Size of medium button container
 * @cssprop --hoops-md-icon-button-content-size - Size of medium button content
 * @cssprop --hoops-sm-icon-button-size - Size of small button container
 * @cssprop --hoops-sm-icon-button-content-size - Size of small button content
 *
 * @attribute {string} tabindex - Tab order index for keyboard navigation
 * @attribute {string} role - ARIA role for accessibility
 * @attribute {'xl' | 'md' | 'sm'} size - Size variant of the button
 * @attribute {'default' | 'accent'} color - Color variant of the button
 * @attribute {boolean} disabled - Whether the button is disabled
 *
 * @example
 * ```html
 * <hoops-icon-button size="md" color="accent">
 *   <svg>...</svg>
 * </hoops-icon-button>
 * ```
 *
 * @since 2025.7.0
 */
export default class HoopsIconButton extends LitElement {
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
    private handleKeypress;
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
     * Size variant of the button.
     *
     * @default 'md'
     */
    size: string;
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
