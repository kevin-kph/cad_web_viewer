import { Point3, Point2, Plane, Ray, Vector3 } from '@ts3d-hoops/common';
import { IncrementalPickConfig, PickConfig } from '../PickConfig';
import { Instance, ViewKey } from '@ts3d-hoops/streamcache';
import { CompositeSelectionItem, IncrementalSelectionId, NodeEntitySelectionItem, SelectionItem } from '../selection';
export declare enum AdvanceSelectionCapacity {
    Batch = 5000,
    Chunk = 500
}
export declare enum ScSelectionBits {
    SelectionBitsFaceHasMeasurementData = 1,
    SelectionBitsFacePlanar = 2,
    SelectionBitsEdgeHasMeasurementData = 4
}
export declare class ScSelectionManager {
    private readonly _sc;
    private _pickTolerance;
    private readonly _incrementalChunkedItems;
    constructor(sc: Instance);
    setPickTolerance(tolerance: number): void;
    getPickTolerance(): number;
    beginScreenAreaSelection(viewKey: ViewKey, areaCssMin: Point2, areaCssMax: Point2, config: IncrementalPickConfig): Promise<IncrementalSelectionId>;
    beginRayDrillSelection(viewKey: ViewKey, rayCssOrigin: Point2, rayCssBoxRadius: number, config: IncrementalPickConfig): Promise<IncrementalSelectionId>;
    beginConvexPolyhedronSelection(volumePlanes: Plane[], heuristicOrigin: Point3, config: IncrementalPickConfig): Promise<IncrementalSelectionId>;
    beginSphereSelection(sphereCenter: Vector3, sphereRadius: number, config: IncrementalPickConfig): Promise<IncrementalSelectionId>;
    endIncrementalSelection(handle: IncrementalSelectionId): void;
    advanceIncrementalSelection(handle: IncrementalSelectionId, allowForStreamIdle: boolean): Promise<SelectionItem[] | null>;
    private _screenSelectByRay;
    private _worldSelectByRay;
    pickFromScreen(viewKey: ViewKey, point: Point2, config: PickConfig, isDrawing: boolean): Promise<NodeEntitySelectionItem | null>;
    pickAllFromScreen(viewKey: ViewKey, point: Point2, config: PickConfig, isDrawing: boolean): Promise<NodeEntitySelectionItem[]>;
    compositePickFromScreen(viewKey: ViewKey, point: Point2, config: PickConfig, isDrawing: boolean): Promise<CompositeSelectionItem>;
    pickFromRay(ray: Ray, config: PickConfig): Promise<NodeEntitySelectionItem | null>;
    pickAllFromRay(ray: Ray, config: PickConfig): Promise<NodeEntitySelectionItem[]>;
    pickCompositeFromRay(ray: Ray, config: PickConfig): Promise<CompositeSelectionItem>;
}
