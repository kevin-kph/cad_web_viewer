import { IPoint3 } from './types';
export declare class Point3 implements IPoint3 {
    x: number;
    y: number;
    z: number;
    /**
     * Creates a new point object.
     * @param x X value
     * @param y Y value
     * @param z Z value
     */
    constructor(x: number, y: number, z: number);
    /**
     * Sets this point equal to another point.
     * @param point The point to assign.
     * @returns This point object.
     */
    assign(point: IPoint3): this;
    /**
     * Sets the values of this point.
     * @param x X value to set.
     * @param y Y value to set.
     * @param z Z value to set.
     * @returns This point object.
     */
    set(x: number, y: number, z: number): this;
    /**
     * Sets an array from this point.
     * @param arr Array to assign.
     */
    toArray(arr?: number[]): number[];
    /**
     * Sets this point from an array.
     * @param arr Array to assign from.
     * @returns This point object.
     */
    fromArray(arr: number[]): this;
    /**
     * Adds another point to this point.
     * @param pt Point to add.
     * @returns This point object.
     */
    add(pt: IPoint3): this;
    /**
     * Subtracts another point from this point.
     * @param pt Point to subtract.
     * @returns This point object.
     */
    subtract(pt: IPoint3): this;
    /**
     * Creates a copy of this point.
     * @returns Copy of this point object.
     */
    copy(): Point3;
    /**
     * Creates a new [[Point3]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: unknown): Point3;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): IPoint3;
    /**
     * Strictly compares this point with another.
     * @param other Point to compare with.
     * @returns True if the values of this point equal those of the other.
     */
    equals(other: IPoint3): boolean;
    /**
     * Compares this point with another using a tolerance.
     * @param other Point to compare with.
     * @param tolerance Tolerance to be used in the comparison.
     * @returns True if the values of this point equal those of the other.
     */
    equalsWithTolerance(other: IPoint3, tolerance: number): boolean;
    /**
     * Returns a boolean value indicating if this vector lies on a major axis.
     */
    isAxis(): boolean;
    /**
     * Returns the length of this vector.
     * @returns Vector length.
     */
    length(): number;
    /**
     * Returns the squared length of this vector.
     * @returns Vector squared length.
     */
    squaredLength(): number;
    /**
     * Scale the point by constant value.
     * @param k Constant value to scale by.
     * @returns Point object.
     */
    scale(k: number): this;
    /**
     * Normalizes the vector.
     * @returns This object.
     */
    normalize(): this;
    /**
     * Negates the point.
     * @returns This object.
     */
    negate(): this;
    /**
     * Creates a new Point initialized to (0,0,0).
     * @returns New point with all elements set to 0.
     */
    static zero(): Point3;
    /**
     * Adds two points.
     * @param p1 First point.
     * @param p2 Second point.
     * @returns Sum of p1 and p2.
     */
    static add(p1: IPoint3, p2: IPoint3): Point3;
    /**
     * Subtract two points.
     * @param p1 First point.
     * @param p2 Second point.
     * @returns Difference of p1 and p2.
     */
    static subtract(p1: IPoint3, p2: IPoint3): Point3;
    /**
     * Calculate dot product.
     * @param p1 First point.
     * @param p2 Second point.
     * @returns Dot product of p1 and p2.
     */
    static dot(p1: IPoint3, p2: IPoint3): number;
    /**
     * Calculate cross product.
     * @param p1 First point.
     * @param p2 Second point.
     * @returns Cross product of p1 and p2.
     */
    static cross(p1: IPoint3, p2: IPoint3): Point3;
    /**
     * Returns the length of a vector.
     * @returns Vector length.
     */
    static magnitude(p: IPoint3): number;
    /**
     * Returns the squared length of a vector.
     * @returns Vector squared length.
     */
    static squaredLength(p: IPoint3): number;
    /**
     * Normalize a vector.
     * @param v First point.
     * @returns A vector that is colinear to v with a length of 1.
     */
    static normalize(v: IPoint3): Point3;
    /**
     * Calculate distance between two points
     * @param p1 First point
     * @param p2 Second point
     * @returns Distance between p1 and p2
     */
    static distance(p1: IPoint3, p2: IPoint3): number;
    /**
     * Multiply all scalars of a given point by a same value
     * @param p Point to scale
     * @param k Constant value used to scale p
     * @returns p * k
     */
    static scale(p: IPoint3, k: number): Point3;
    /**
     * Creates a point from an array of numbers
     * @param arr to assign from
     * @returns new point set from array elements
     */
    static createFromArray(arr: number[]): Point3;
}
