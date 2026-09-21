import { Point2 } from '@ts3d-hoops/common';
import { FilledShape } from './Shape';
/**
 * This class represents a single circle consisting of a center point and a radius.
 */
export declare class Circle extends FilledShape {
    private _center;
    private _radius;
    /**
     * Sets the values for the circle
     * @param center the center point of the circle.
     * @param radius the circle radius.
     */
    set(center: Point2, radius: number): void;
    /**
     * Gets the center of the circle
     * @returns the circle center
     */
    getCenter(): Point2;
    /**
     * Sets the center of the circle
     * @param center circle center
     */
    setCenter(center: Point2): void;
    /**
     * Gets the radius of the circle
     * @returns the circle radius
     */
    getRadius(): number;
    /**
     * Sets the radius of the circle
     * @param radius the circle radius
     */
    setRadius(radius: number): void;
}
/** @hidden */
export declare class _MarkupCircleData {
    center: Point2;
    radius: number;
    constructor(center: Point2, radius: number);
}
/**
 * This class is useful for specifying multiple circles that all share the same visual appearance.
 */
export declare class CircleCollection extends FilledShape {
    private _circles;
    /**
     * Removes all circles from this collection
     */
    clear(): void;
    /**
     * Adds a circle to the collection
     * @param center circle center
     * @param radius the circle radius
     */
    addCircle(center: Point2, radius: number): void;
    /**
     * Updates a circle in the collection
     * @param index the index of the circle to update
     * @param center circle center
     * @param radius the circle radius
     */
    setCircle(index: number, center: Point2, radius: number): void;
    /**
     * Gets the circles in the collection
     */
    getCircles(): _MarkupCircleData[];
}
