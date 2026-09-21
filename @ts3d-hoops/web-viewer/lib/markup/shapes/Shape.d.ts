import { Color } from '@ts3d-hoops/common';
import { Pixels } from '../../types';
export declare class StrokedShape {
    private _strokeWidth;
    private _strokeColor;
    /** @hidden */
    _assign(other: StrokedShape): void;
    /**
     * Sets the stroke color for this shape
     * @param color the stroke color
     */
    setStrokeColor(color: Color): void;
    /**
     * Gets the stroke color for this shape
     * @returns the stroke color
     */
    getStrokeColor(): Color;
    /**
     * Sets the stroke width for this shape in pixels
     * @param strokeWidth the stroke width in pixels
     */
    setStrokeWidth(strokeWidth: Pixels): void;
    /**
     * Gets the stroke width for this shape in pixels
     * @returns the stroke width in pixels
     */
    getStrokeWidth(): Pixels;
}
export declare class FilledShape extends StrokedShape {
    private _fillColor;
    private _fillOpacity;
    /** @hidden */
    _assign(other: FilledShape): void;
    /**
     * Gets the fill opacity for this shape
     * @returns the fill opacity
     */
    getFillOpacity(): number;
    /**
     * Sets the fill opacity for this shape
     * @param fillOpacity the fill opacity
     */
    setFillOpacity(fillOpacity: number): void;
    /**
     * Sets the fill color for this shape
     * @param color the fill color
     */
    setFillColor(color: Color): void;
    /**
     * Gets the fill color for this shape
     * @returns the fill color
     */
    getFillColor(): Color;
}
/**
 * Enumerates the type of shapes that can appear at the endcap of a shape.
 */
export declare enum EndcapType {
    None = 0,
    Arrowhead = 1,
    Circle = 2
}
export declare class EndcapShape extends StrokedShape {
    private _startEndcapType;
    private _startEndcapColor;
    private _startEndcapSize;
    private _endEndcapType;
    private _endEndcapColor;
    private _endEndcapSize;
    private _endcapsInverted;
    /** @hidden */
    _assign(other: EndcapShape): void;
    /**
     * Gets the start endcap type for this shape. The default Value is none.
     * @returns the start endcap type
     */
    getStartEndcapType(): EndcapType;
    /**
     * Sets the start endcap type for this shape
     * @param endcapType the new endcap type
     */
    setStartEndcapType(endcapType: EndcapType): void;
    /**
     * Gets the color of the start endcap. Default value is black.
     * @returns color for the start endcap.
     */
    getStartEndcapColor(): Color;
    /**
     * Sets the color for the start endcap.
     * @param color the start endcap color value.
     */
    setStartEndcapColor(color: Color): void;
    /**
     * Gets the size of the start endcap in pixels. Default value is 9.
     * @returns size of the start endcap.
     */
    getStartEndcapSize(): Pixels;
    /**
     * Sets the size of the start endcap in pixels.
     * @param size the start endcap.
     */
    setStartEndcapSize(size: Pixels): void;
    /**
     * Gets the end endcap type for this shape. The default value is none.
     * @returns the end endcap type
     */
    getEndEndcapType(): EndcapType;
    /**
     * Sets the end endcap type for this shape
     * @param endcapType the new endcap type
     */
    setEndEndcapType(endcapType: EndcapType): void;
    /**
     * Convenience for setting the start and eend endcap type for this shape
     * @param endcapType the new endcap type
     */
    setEndcapType(endcapType: EndcapType): void;
    /**
     * Gets the size of the end endcap in pixels. Default value is 9.
     * @returns size of the end endcap.
     */
    getEndEndcapSize(): Pixels;
    /**
     * Sets the size of the end endcap in pixels.
     * @param size the end endcap.
     */
    setEndEndcapSize(size: Pixels): void;
    /**
     * Gets the color of the end endcap. Default value is black.
     * @returns color for the end endcap.
     */
    getEndEndcapColor(): Color;
    /**
     * Sets the color for the end endcap.
     * @param color the end endcap color value.
     */
    setEndEndcapColor(color: Color): void;
    /**
     * Gets whether endcaps are inverted for this shape. The default value is false.
     * @returns value indicating whether endcaps are inverted
     */
    getEndcapsInverted(): boolean;
    /**
     * Sets whether endcapsare inverted for this shape.
     * @param inverted value indicated whether endcaps should be inverted
     */
    setEndcapsInverted(inverted: boolean): void;
}
