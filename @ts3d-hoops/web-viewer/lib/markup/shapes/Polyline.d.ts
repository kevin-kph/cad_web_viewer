import { Point2 } from '@ts3d-hoops/common';
import { EndcapShape } from './Shape';
/**
 * This class reprsents a line defined by a list of points.
 */
export declare class Polyline extends EndcapShape {
    /** @hidden */
    private _points;
    /**
     * Removes all points from this polyline
     */
    clearPoints(): void;
    /**
     * Gets the points in this polyline
     * @returns the points in this polyline
     */
    getPoints(): Point2[];
    /**
     * Adds a point to the polyline
     * @param point the point to add to the line
     */
    pushPoint(point: Point2): void;
}
/**
 * This class is useful for drawing a number of polylines all of which share the same visual appearance.
 */
export declare class PolylineCollection extends EndcapShape {
    /** @hidden */
    private _polylines;
    /**
     * Removes all polylines from the collection
     */
    clear(): void;
    /**
     * Creates a new array of points that represent a polyline. Add Point2 objects to the array to construct the polyline
     * @returns new array which represents a polyline.
     */
    createPolyline(): Point2[];
    /**
     * @returns the polylines in this collection
     */
    getPolylines(): Point2[][];
}
