import { Point3 } from './Point3';
import { Ray } from './Ray';
/**
 * Object representing a Plane.
 */
export declare class Plane {
    normal: Point3;
    d: number;
    setFromPointAndNormal(point: Point3, normal: Point3): this;
    /**
     * Update the plane to pass through the three points
     */
    setFromPoints(p1: Point3, p2: Point3, p3: Point3): void;
    setFromCoefficients(a: number, b: number, c: number, d: number): void;
    getCoefficients(): [number, number, number, number];
    distanceToPoint(point: Point3): number;
    rayIntersection(ray: Ray): Point3 | null;
    intersectsRay(ray: Ray, outPoint?: Point3): boolean;
    /**
     * Returns true if the point is on the side of the plane that the plane's normal is directed. Returns false otherwise.
     * @param p The point to test.
     */
    determineSide(p: Point3): boolean;
    /**
     * Creates a copy of this plane
     * @returns a copy of this plane object
     */
    copy(): Plane;
    /**
     * Sets this plane equal to another plane
     * @param plane the plane to assign
     */
    assign(plane: Plane): void;
    /**
     * Returns true if the normal and d value are the same.
     * @param plane
     */
    equals(plane: Plane): boolean;
    static createFromPointAndNormal(point: Point3, normal: Point3): Plane;
    static createFromPoints(p1: Point3, p2: Point3, p3: Point3): Plane;
    static createFromCoefficients(a: number, b: number, c: number, d: number): Plane;
}
