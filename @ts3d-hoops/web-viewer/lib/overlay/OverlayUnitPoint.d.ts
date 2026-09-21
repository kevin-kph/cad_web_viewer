import { OverlayUnit } from '../types';
/**
 * @hidden
 * Represents a point or size defined with [[OverlayUnit]]s.
 */
export declare class OverlayUnitPoint {
    x: number;
    xUnit: OverlayUnit;
    y: number;
    yUnit: OverlayUnit;
    constructor(x: number, xUnit: OverlayUnit, y: number, yUnit: OverlayUnit);
}
