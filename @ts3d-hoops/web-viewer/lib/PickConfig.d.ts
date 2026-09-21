import { BimMask, SelectionMask } from './types';
/**
 * Configuration for all pick functions in the View class.
 */
export declare class PickConfig {
    constructor(selectionMask?: SelectionMask);
    /** Returns a copy of this [[PickConfig]]. */
    copy(): PickConfig;
    get allowFaces(): boolean;
    set allowFaces(allow: boolean);
    get allowLines(): boolean;
    set allowLines(allow: boolean);
    get allowPoints(): boolean;
    set allowPoints(allow: boolean);
    /** Configures what types of entities are considered for selection. */
    selectionMask: SelectionMask;
    /** (8 bits) If requiredBitsAny are supplied, a mesh can only be selected if its selection bits have any of the ones supplied. */
    requiredBitsAny?: number;
    /** (8 bits) If requiredBitsAll are supplied, a mesh can only be selected if its selection bits have all the ones supplied. */
    requiredBitsAll?: number;
    /** (8 bits) If rejectionBitsAny are supplied, a mesh cannot be selected if its selection bits have any of the ones supplied. */
    rejectionBitsAny?: number;
    /** (8 bits) If rejectionBitsAll are supplied, a mesh cannot be selected if its selection bits have all the ones supplied. */
    rejectionBitsAll?: number;
    /** Configures whether or not visibility is respected when performing a selection. */
    respectVisibility: boolean;
    /**
     * For each element type bit in this mask, if the bit is on, then scene visibility and geometry visibility
     * are treated as if that element type is visible during selection.
     */
    forceEffectiveVisibilityMask: SelectionMask;
    /**
     * For each element type bit in this mask, if the bit is on, then scene visibility is treated
     * as if that element type is visible during selection.
     */
    forceEffectiveSceneVisibilityMask: SelectionMask;
    /**
     * Configures whether or not depth range is respected when performing a selection.
     * This option is only relevant for screen selection.
     */
    respectDepthRange: boolean;
    /**
     * If true, then only one entity per entity type can be returned per instance.
     *
     * For example, consider a cube made from a single mesh instance, where each face is
     * a different face entity and backfaces culling is disabled. If this option is true,
     * then at most one face from the cube can be selected. If false, then multiple faces
     * from the cube can be selected. (This can occur when selecting from the front of the
     * cube and then obtaining the face behind the front face in addition to the front face.)
     */
    oneEntityPerTypePerInstance: boolean;
    /**
     * Configures whether or not line and point selection is restricted to instances that get selected by face.
     * This is only a heuristic and may be ignored.
     * This option is only relevant for screen selection.
     */
    restrictLinesAndPointsToSelectedFaceInstances: boolean;
    /**
     * If true, faces can be selected by proximity (like lines and points).
     * This option is only relevant for screen selection.
     */
    enableProximityFaces: boolean;
    /** Configures whether or not capping geometry is ignored when computing selection results. */
    ignoreCappingGeometry: boolean;
    /**
     * If true, selection will not process geometry contained in overlays.
     * This option is only relevant for screen selection.
     */
    ignoreOverlays: boolean;
    /**
     * If true, selection is performed only within overlays.
     * This option is only relevant for screen selection.
     */
    restrictToOverlays: boolean;
    /** If set, selection will be restricted to geometry of the specified BIM types. */
    bimMask?: BimMask;
    /**
     * If supplied, this is the maximum distance in world-space along
     * the selection ray that can be used to select any geometry.
     *
     * If this value is negative, it is ignored.
     *
     * This parameter is incompatible with line and point selection.
     */
    maxWorldDistance?: number;
}
export declare class IncrementalPickConfig {
    constructor(selectionMask?: SelectionMask);
    /** Configures whether or not items must be fully contained in the selection volume to be selection candidates. */
    mustBeFullyContained: boolean;
    /** Configures whether or not visibility is respected when performing a selection. */
    respectVisibility: boolean;
    /**
     * For each element type bit in this mask, if the bit is on, then scene visibility and geometry visibility
     * are treated as if that element type is visible during selection.
     */
    forceEffectiveVisibilityMask: SelectionMask;
    /**
     * For each element type bit in this mask, if the bit is on, then scene visibility is treated
     * as if that element type is visible during selection.
     */
    forceEffectiveSceneVisibilityMask: SelectionMask;
    /** If set, selection will be restricted to geometry of the specified BIM types. */
    bimMask?: BimMask;
    /** Configures whether or not faces are considered for selection. */
    allowFaces: boolean;
    /** Configures whether or not lines are considered for selection. */
    allowLines: boolean;
    /** Configures whether or not points are considered for selection. */
    allowPoints: boolean;
    /** Configures whether or not cutting sections are ignored during selection. */
    ignoreCuttingSections: boolean;
    /**
     * If false, instances that have not yet been streamed will be processed.
     * If true, instances that have not yet been streamed will be ignored.
     */
    onlyStreamedInstances: boolean;
    /**
     * This config option only applies for [[StreamingMode.OnDemand]] viewer sessions.
     * If true, then in nodes that are not requested will not be selected.
     * If false, then non-requested nodes can be selected.
     */
    ignoreUnrequestedInstances: boolean;
}
