import { Point2 } from '@ts3d-hoops/common';
import { EndcapShape } from './Shape';
/**
 * This class represents a single line consisting of two points. P1 is considered the start and P2 is considered the end of the line.
 * Each Point may have its endcap settings adjusted independently.
 */
export declare class Line extends EndcapShape {
    private _p1;
    private _p2;
    /**
     * Creates a new Line Shape
     * @param p1 Optional first point on the line. If omitted, default value of (0,0) is used.
     * @param p2 Optional second point on the line. If omitted, default value of (0,0) is used.
     * @returns new Line object.
     */
    constructor(p1?: Point2, p2?: Point2);
    /**
     * Sets the points that define the line segment
     * @param p1 first point of the line segment
     * @param p2 second point of the line segment
     */
    set(p1: Point2, p2: Point2): void;
    /**
     * Gets the first point of the line segment
     * @returns the first point of the line segment
     */
    getP1(): Point2;
    /**
     * Sets the first point of the line segment
     * @param p1 first point of the line segment
     */
    setP1(p1: Point2): void;
    /**
     * Gets the second point of the line segment
     * @returns the second point of the line segment
     */
    getP2(): Point2;
    /**
     * sets the first point of the line segment
     * @param p2 second point of the line segment
     */
    setP2(p2: Point2): void;
}
/** @hidden */
export declare class _MarkupLineData {
    p1: Point2;
    p2: Point2;
    constructor(p1: Point2, p2: Point2);
}
/**
 * This class is useful for specifying multiple lines that all share the same visual appearance.
 */
export declare class LineCollection extends EndcapShape {
    private _lines;
    /**
     * Adds a line segment to the collection
     * @param p1 first point of the line segment
     * @param p2 second point of the line segment
     */
    addLine(p1: Point2, p2: Point2): void;
    /**
     * Gets the lines in the collection
     */
    getLines(): _MarkupLineData[];
    /**
     * Removes all line segments from this collection
     */
    clear(): void;
}
