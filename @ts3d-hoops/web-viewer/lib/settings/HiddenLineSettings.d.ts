import { Color } from '@ts3d-hoops/common';
import { VerticalGradient } from '../VerticalGradient';
/**
 * This class controls settings used in hidden line rendering.
 * Settings get applied when `View.setDrawMode('HiddenLine')` is called.
 */
export declare class HiddenLineSettings {
    private _obscuredLineColor;
    private _obscuredLineOpacity;
    private _visibleLineColor;
    private _visibleLineOpacity;
    private _backgroundColorTop;
    private _backgroundColorBottom;
    /**
     * Returns the `Color` used for rendering obscured lines.
     * @returns The color used for obscured lines.
     */
    getObscuredLineColor(): Color;
    /**
     * Sets the `Color` used for rendering obscured lines.
     * @param color The color used for obscured lines.
     */
    setObscuredLineColor(color: Color): void;
    /**
     * Returns the opacity used for rendering obscured lines.
     * @returns The opacity used for obscured lines.
     */
    getObscuredLineOpacity(): number;
    /**
     * Sets the opacity used for rendering obscured lines.
     * @param opacity The opacity used for obscured lines.
     */
    setObscuredLineOpacity(opacity: number): void;
    /**
     * Gets the `Color` used for rendering visible lines.
     * @returns The color used for visible lines.
     */
    getVisibleLineColor(): Color;
    /**
     * Sets the `Color` used for rendering visible lines.
     * @param color The color used for visible lines.
     */
    setVisibleLineColor(color: Color): void;
    /**
     * Gets the opacity used for rendering visible lines.
     * @returns The opacity used for visible lines.
     */
    getVisibleLineOpacity(): number;
    /**
     * Sets the opacity used for rendering visible lines.
     * @param opacity The opacity used for visible lines.
     */
    setVisibleLineOpacity(opacity: number): void;
    /**
     * Gets the colors used for the background in hidden line rendering.
     * @returns The background colors used for hidden line.
     */
    getBackgroundColor(): VerticalGradient;
    /**
     * Sets the background color in hidden line rendering to a gradient interpolating from the top to bottom color.
     * For a solid color, the top and bottom color should have the same values.
     * To enable a transparent background, pass null to the parameters of this function.
     *
     * @param top the top color for the the background gradient, null for transparent.
     * @param bottom the bottom color for the the background gradient, null for transparent.
     */
    setBackgroundColor(top?: Color | null, bottom?: Color | null): void;
}
