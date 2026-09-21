import { OverlayAnchor } from '../types';
import { OverlayUnitPoint } from './OverlayUnitPoint';
/**
 * This class is used to store overlay viewport information set via the OverlayManager so that we can retrieve it
 * later
 */
export declare class OverlayViewport {
    private readonly _anchor;
    private readonly _position;
    private readonly _size;
    constructor(anchor: OverlayAnchor, position: OverlayUnitPoint, size: OverlayUnitPoint);
    getAnchor(): OverlayAnchor;
    getPosition(): OverlayUnitPoint;
    getSize(): OverlayUnitPoint;
}
