import { IPoint2, IPoint3 } from './types';
export declare class Point2 implements IPoint2 {
    x: number;
    y: number;
    /**
     * Creates a new point
     * @param {number} x value to set for x
     * @param {number} y value to set for y
     */
    constructor(x: number, y: number);
    /**
     * Sets this point equal to another point
     * @param {Point2} pt the point whose values will be used to set this object
     * @returns {Point2} the point object
     */
    assign(pt: Point2): this;
    /**
     * Adds a point to this one
     * @param {Point2} pt the point whose values will be added
     * @returns {Point2} the point object
     */
    add(pt: Point2): this;
    /**
     * Subtracts a point from this one
     * @param {Point2} pt the point whose values will be subtracted
     * @returns {Point2} the point object
     */
    subtract(pt: Point2): this;
    /**
     * Scales the point by a constant value
     * @param {number} k the value to scale by
     * @returns {Point2} the point object
     */
    scale(k: number): this;
    /**
     * Compares this point with another point
     * @param {Point2} pt the point to compare with
     * @returns {Boolean} True if the values of this point equal the other. False otherwise.
     */
    equals(pt: Point2): boolean;
    /**
     * Sets the values of this point
     * @param {number} x value to set for x
     * @param {number} y value to set for y
     * @returns {Point2} the point object
     */
    set(x: number, y: number): this;
    /**
     * Creates a copy of this point
     * @returns {Point} Copy of this point
     */
    copy(): Point2;
    /**
     * Returns the length of this point
     * @returns {number} the point length
     */
    length(): number;
    /**
     * Returns the squared length of this vector.
     * @returns Vector squared length.
     */
    squaredLength(): number;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): IPoint2;
    /**
     * Creates a new [[Point2]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: unknown): Point2;
    /**
     * Subtracts a point from another
     * @param {Point2} pt1 initial point
     * @param {Point2} pt2 the point to subtract
     * @returns {Point2} new point set to pt1 - pt2
     */
    static subtract(pt1: Point2, pt2: Point2): Point2;
    /**
     * Adds two points
     * @param {Point2} pt1 initial point
     * @param {Point2} pt2 the point to add
     * @returns {Point2} new point set to pt1 + pt2
     */
    static add(pt1: Point2, pt2: Point2): Point2;
    /**
     * Scale a point by a constant factor
     * @param {Point2} pt Point to be scaled
     * @param {number} k Amount to scale by
     * @returns {Point2} The scaled point
     */
    static scale(pt: Point2, k: number): Point2;
    /**
     * Calculate distance between two points
     * @param {Point2} p1 first point
     * @param {Point2} p2 second point
     * @returns {number} the distance between p1 and p2
     */
    static distance(p1: Point2, p2: Point2): number;
    /**
     * Creates a point initialized to (0,0)
     * @returns {Point} The new point
     */
    static zero(): Point2;
    static fromPoint3(p: IPoint3): Point2;
}
