import { Vector3, IBox, Vector3s } from '@ts3d-hoops/common';
import { OverlayIndex } from './overlays';
import { InstanceInc, MeshId } from './keys';
import { CullingVectorSpace } from './misc';
export interface EntityBase {
    instanceInc: InstanceInc;
    meshLevelId: MeshId;
    meshLevel: number;
    elementIndex: number;
    elementBits: number;
    overlayIndex: OverlayIndex;
}
export type ProximityEntity = EntityBase & {
    radialMetric: number;
    zMetric: number;
};
export interface FaceEntity extends EntityBase {
    triangleIndex: number;
    normal: Vector3;
    bounding: IBox;
    rayPoint: Vector3;
}
export interface ProximityFaceEntity extends FaceEntity {
    radialMetric: number;
    zMetric: number;
}
export interface LineEntity extends EntityBase {
    lineIndex: number;
    bounding: IBox;
    point: Vector3;
    lineSegmentVertices: Vector3s;
    bestLineSegmentVertexIndex: number;
    radialMetric: number;
    zMetric: number;
}
export interface PointEntity extends EntityBase {
    pointIndex: number;
    point: Vector3;
    radialMetric: number;
    zMetric: number;
}
export interface FacePickResult {
    entities: FaceEntity[];
}
export interface LinePickResult {
    entities: LineEntity[];
}
export interface PointPickResult {
    entities: PointEntity[];
}
export interface ProximityFacePickResult {
    entities: ProximityFaceEntity[];
}
export interface PointEntity extends EntityBase {
    pointIndex: number;
    point: Vector3;
    radialMetric: number;
    zMetric: number;
}
export interface FacePickResult {
    entities: FaceEntity[];
}
export interface LinePickResult {
    entities: LineEntity[];
}
export interface PointPickResult {
    entities: PointEntity[];
}
export interface ProximityFacePickResult {
    entities: ProximityFaceEntity[];
}
export interface PickResult {
    face: FacePickResult | null;
    line: LinePickResult | null;
    point: PointPickResult | null;
    proximityFace: ProximityFacePickResult | null;
}
export interface CullingVector {
    space: CullingVectorSpace;
    vector: Vector3;
    toleranceDegrees: number;
}
