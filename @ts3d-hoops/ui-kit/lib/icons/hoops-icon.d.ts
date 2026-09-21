import { LitElement } from 'lit';
/**
 * A web component that displays SVG icons from a predefined icon library.
 *
 * Provides a simple interface for rendering SVG icons by name, with automatic
 * sizing and error handling for missing icons.
 *
 * @element hoops-icon
 *
 * @cssprop --hoops-icon-width - Width of the icon container
 * @cssprop --hoops-icon-height - Height of the icon container
 * @cssprop --hoops-svg-stroke-color - Stroke color for SVG icon elements
 * @cssprop --hoops-svg-fill-color - Fill color for SVG icon elements
 *
 * @attribute {string} icon - Name of the icon to display from the icon library
 *
 * @example
 * ```html
 * <hoops-icon icon="home"></hoops-icon>
 * <hoops-icon icon="settings" style="width: 24px; height: 24px;"></hoops-icon>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsIcon extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The name of the icon to display from the icon library.
     *
     * @default ''
     */
    icon: string;
    /**
     * Retrieves the SVG template for the specified icon name.
     *
     * @returns The SVG template for the icon, or undefined if not found
     *
     * @internal
     */
    private getIcon;
    /** @internal */
    protected render(): unknown;
}
