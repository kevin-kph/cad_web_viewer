import { Point3 } from './math';
/**
 * Represents an axis-aligned bounding box.
 * A box is represented by a minimum and maximum point which describe the extents of the box.
 */
export declare class Box {
    /**
     * The point of minimum extent for the box.
     */
    min: Point3;
    /**
     * The point of maximum extent for the box.
     */
    max: Point3;
    /**
     * Creates a new box.
     * @param min The minimum extent of the box. Defaults to the origin.
     * @param max The maximum extent of the box. Defaults to the origin.
     */
    constructor(min?: Point3, max?: Point3);
    /**
     * Creates a copy of the box.
     * @returns A copy of this box.
     */
    copy(): Box;
    /**
     * Strictly compares this box with another box.
     * @param box Box to compare with.
     * @returns True if the values of this box equals the other. False otherwise.
     */
    equals(box: Box): boolean;
    /**
     * Gets the center point for the box.
     * @returns The center point of this box.
     */
    center(): Point3;
    /**
     * Gets the extents of the box.
     * @returns A point with members set to extent values for each corresponding axis.
     */
    extents(): Point3;
    /**
     * Expands the extents of the box so that it will contain another box.
     * @param box The box to add.
     */
    addBox(box: Box): void;
    /**
     * Expands the extents of the box so that it will contain a particular point.
     * @param point The point to add.
     */
    addPoint(point: Point3): void;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[Box]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: unknown): Box;
    /**
     * Gets all eight corner points for the box.
     * @returns The corner points of this box.
     */
    getCorners(): Point3[];
    /**
     * Returns whether a point is contained within the box
     * @returns whether a point is contained within the box
     */
    containsPoint(point: Point3): boolean;
    /**
     * Creates and returns an invalid bounding box.
     * @returns an invalid bounding box.
     */
    static invalid(): Box;
    /**
     * Returns whether or not the box is degenerate.
     * @returns whether or not the box is degenerate.
     */
    isDegenerate(): boolean;
}
