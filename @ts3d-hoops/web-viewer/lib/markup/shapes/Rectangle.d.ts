import { Point2 } from '@ts3d-hoops/common';
import { FilledShape } from './Shape';
/**
 * This is a base class for rectangular markup objects. It should not be used directly.
 */
export declare class RectangleBase extends FilledShape {
    private _borderRadius;
    /** @hidden */
    _assign(other: RectangleBase): void;
    /**
     * Gets the border radius for this shape
     * @returns the border radius
     */
    getBorderRadius(): number;
    /**
     * Sets the border radius for this shape
     * @param borderRadius the border radius in pixels
     */
    setBorderRadius(borderRadius: number): void;
}
/**
 * Represents a rectangle defined by a position and a size.
 */
export declare class Rectangle extends RectangleBase {
    private _position;
    private _size;
    /**
     * Creates a new rectangle markup item
     * @param position the screen space position of the top left of the rectangle.
     * @param size the point object representing the width and height of the rectangle in pixels.
     */
    constructor(position?: Point2, size?: Point2);
    /** @hidden */
    _assign(other: Rectangle): void;
    /**
     * Sets the rectanlge position
     * @param position the top left corner of the rectangle
     */
    setPosition(position: Point2): void;
    /**
     * Gets rectangle position
     * @returns the rectangle position
     */
    getPosition(): Point2;
    /**
     * Sets the rectanlge size
     * @param size indicating the rectangle width and height
     */
    setSize(size: Point2): void;
    /**
     * Gets rectangle size
     * @returns the rectangle size
     */
    getSize(): Point2;
}
/** @hidden */
export declare class _MarkupRectangleData {
    position: Point2;
    size: Point2;
    constructor(position: Point2, size: Point2);
}
/**
 * This is useful for drawing a number of rectangles which share the same visual appearance.
 */
export declare class RectangleCollection extends RectangleBase {
    private _rectangles;
    /**
     * Removes all rectangles from this collection
     */
    clear(): void;
    /**
     * Adds a rectangle to the collection
     * @param position the top left corner of the rectangle
     * @param size indicating the rectangle width and height
     */
    addRectangle(position: Point2, size: Point2): void;
    /**
     * Gets the rectangles in the collection
     */
    getRectangles(): _MarkupRectangleData[];
}
