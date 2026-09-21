import { Point3 } from '@ts3d-hoops/common';
import { OverlayIndex } from '../types';
export declare class PointEntity {
    private readonly _elementIndex;
    private readonly _elementBits;
    private readonly _position;
    private readonly _overlayIndex;
    /** @hidden */
    constructor(position: Point3, elementIndex: number, overlayIndex: OverlayIndex, elementBits: number);
    /**
     * Creates a new [[PointEntity]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any): PointEntity;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Gets the world space position of the selection point.
     * @returns World space position of the selection point if it can be determined.
     */
    getPosition(): Point3;
    /**
     * Gets the cad bits for the selection Point.
     * @returns The bits set on the point.
     */
    getPointBits(): number;
    /**
     * Gets the point identifier
     * @returns the identifier of the point that was selected
     */
    getPointId(): number;
    /**
     * @returns The index of the overlay the entity belongs to.
     */
    overlayIndex(): OverlayIndex;
}
