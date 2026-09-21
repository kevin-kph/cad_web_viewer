import { Point3 } from './Point3';
/**
 * Object representing a Ray.
 */
export declare class Ray {
    origin: Point3;
    direction: Point3;
    constructor(origin?: Point3, direction?: Point3);
    /**
     * Creates a copy of this ray
     * @returns {Ray} a copy of this ray object
     */
    copy(): Ray;
    /**
     * Sets this ray equal to another ray
     * @param {Ray} ray the ray to assign
     */
    assign(ray: Ray): this;
    /**
     * Flips the ray's direction.
     */
    negate(): this;
}
