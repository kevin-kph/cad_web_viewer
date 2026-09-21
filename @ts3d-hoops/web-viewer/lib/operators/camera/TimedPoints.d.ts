import { Point2 } from '@ts3d-hoops/common';
/** @hidden */
export declare class TimedPoints {
    private _points;
    private _times;
    private _count;
    /**
     * Caches a stream of points generated in time by storing them in a wrapped array, from oldest to newest. When the wrap occurs, the oldest, earliest entries are overwritten
     * @param {number} maxPoints the maximum point stream size
     */
    constructor(maxPoints?: number);
    /**
     * Clears the array of points
     */
    clear(): void;
    /**
     * Adds a point to the array of points, possibly overwriting the oldest one
     */
    add(point: Point2, now?: number): void;
    /**
     * Gets the average offset from the first point specified between (now - offset) and now
     */
    getAverageOffsetWithinMilliseconds(millisec: number, now?: number): Point2;
}
