import { Box, Point3 } from '@ts3d-hoops/common';
import { OverlayIndex } from '../types';
/**
 * Encapsulates a face selection.
 */
export declare class FaceEntity {
    private readonly _position;
    private readonly _normal;
    private readonly _elementIndex;
    private readonly _elementBits;
    private readonly _bounding;
    private readonly _overlayIndex;
    private readonly _isProximityFace;
    /** @hidden */
    constructor(position: Point3, normal: Point3, elementIndex: number, overlayIndex: OverlayIndex, elementBits: number, bounding: Box, isProximityFace: boolean);
    /**
     * Returns whether or not this face entity was selected by proximity or was instead selected dead-on.
     * @returns True if this face entity was selected by proximity and false otherwise.
     */
    isProximityFace(): boolean;
    /**
     * Returns whether or not this face entity is capping geometry or not.
     * @returns True if this face entity is capping geometry and false otherwise.
     */
    isCappingGeometry(): boolean;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[FaceEntity]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any): FaceEntity;
    /**
     * Gets the world space position of the selection point.
     * @returns World space position of the selection point if it can be determined.
     */
    getPosition(): Point3;
    /**
     * Gets the face normal for the selection Point.
     * @returns Face normal for the selection position if it can be determined.
     */
    getNormal(): Point3;
    /**
     * Gets the cad face index for the selection Point.
     * @returns The index for the cad face.
     */
    getCadFaceIndex(): number;
    /**
     * Gets the cad face bits for the selection Point.
     * @returns The bits set on the cad face.
     */
    getCadFaceBits(): number;
    /**
     * Gets the bounding box for the face entity
     * @returns Bounding box for the face entity
     */
    getBounding(): Box;
    /**
     * @returns The index of the overlay the entity belongs to.
     */
    overlayIndex(): OverlayIndex;
}
