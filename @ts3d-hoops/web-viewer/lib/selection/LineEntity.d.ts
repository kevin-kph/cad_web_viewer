import { Box, Point3 } from '@ts3d-hoops/common';
import { OverlayIndex } from '../types';
export declare class LineEntity {
    private readonly _elementIndex;
    private readonly _elementBits;
    private readonly _position;
    private readonly _lineSegmentVertices;
    private readonly _bestLineSegmentVertexIndex?;
    private readonly _bounding;
    private readonly _overlayIndex;
    /** @hidden */
    constructor(elementIndex: number, position: Point3, lineSegmentVertices: number[] | null, bestLineSegmentVertexIndex: number, bounding: Box, overlayIndex: OverlayIndex, elementBits: number);
    isCappingGeometry(): boolean;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[LineEntity]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any): LineEntity;
    /**
     * Gets the line identifier
     * @returns the identifier of the line that was selected
     */
    getLineId(): number;
    /**
     * Gets the closest point on the selected line
     * @returns the closest point on the line
     */
    getPosition(): Point3;
    getPoints(): Point3[];
    /**
     * Returns the vertex of the line that is closest to the selection
     * point.
     *
     * Clipped vertices are skipped. If the vertex is occluded, then
     * `null` is returned.
     */
    getBestVertex(): Point3 | null;
    /**
     * Gets the kine bits for the selection Point.
     * @returns The bits set on the line/edge.
     */
    getLineBits(): number;
    /**
     * Gets the bounding box for the line entity
     * @returns Bounding box for the line entity
     */
    getBounding(): Box;
    /**
     * @returns The index of the overlay the entity belongs to.
     */
    overlayIndex(): OverlayIndex;
}
