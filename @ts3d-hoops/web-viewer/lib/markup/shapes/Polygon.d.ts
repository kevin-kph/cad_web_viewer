import { Point2 } from '@ts3d-hoops/common';
import { FilledShape } from './Shape';
/**
 * This class represents a shape bounded by the polyline formed from its points.
 */
export declare class Polygon extends FilledShape {
    private _points;
    /**
     * Removes all points from this polygon
     */
    clearPoints(): void;
    /**
     * Gets the points in this polyline
     * @returns the points in this polygon
     */
    getPoints(): Point2[];
    /**
     * Adds a point to the polygon
     * @param point the point to add to the polygon
     */
    pushPoint(point: Point2): void;
}
/**
 * This class is useful for drawing a number of polygons which share the same visual appearance
 */
export declare class PolygonCollection extends FilledShape {
    private _polygons;
    /**
     * Removes all polygons from the collection
     */
    clear(): void;
    /**
     * Creates a new array of points that represent a polygon. Add Point2 objects to the array to construct the polygon
     * @returns new array which represents a polygon.
     */
    createPolygon(): Point2[];
    /**
     * @returns the polylines in this collection
     */
    getPolygons(): Point2[][];
}
