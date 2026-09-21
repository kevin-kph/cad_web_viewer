import { BimMask } from './misc';
export type IncrementalSelectionHandle = number;
export interface RaySelectionConfig {
    /**
     * If true, selection will try to return only the most relevant entities.
     *
     * A face is considered suboptimal if any of the following hold:
     *
     *  - The face is behind another selected face.
     *  - The face is selected by proximity and another face is selected at closer proximity.
     *
     * A line is considered suboptimal if:
     *
     * - The line is selected by proximity and another line is selected at closer proximity.
     *
     * A point is considered suboptimal if:
     *
     * - The point is selected by proximity and another point is selected at closer proximity.
     *
     */
    cullSuboptimalEntities?: boolean;
    enableOcclusionChecks?: boolean;
    enableProximityFaces?: boolean;
    bimMask?: BimMask;
    ignoreCappingGeometry?: boolean;
    ignoreOverlays?: boolean;
    maxWorldDistance?: number;
    oneEntityPerTypePerInstance?: boolean;
    rejectionBitsAll?: number;
    rejectionBitsAny?: number;
    requiredBitsAll?: number;
    requiredBitsAny?: number;
    respectDepthRange?: boolean;
    respectVisibility?: boolean;
    restrictLinesAndPointsToSelectedFaceInstances?: boolean;
    restrictToOverlays?: boolean;
    returnElementBounding?: boolean;
}
export interface VolumeSelectionConfig {
    mustBeFullyContained?: boolean;
    respectVisibility?: boolean;
    allowFaces?: boolean;
    allowLines?: boolean;
    allowPoints?: boolean;
    ignoreCuttingSections?: boolean;
    onlyStreamedInstances?: boolean;
    bimMask?: BimMask;
}
