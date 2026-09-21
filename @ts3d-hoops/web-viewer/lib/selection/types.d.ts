import { Point3 } from '@ts3d-hoops/common';
import { NodeId, OverlayIndex } from '../types';
import { FaceEntity } from './FaceEntity';
import { LineEntity } from './LineEntity';
import { PointEntity } from './PointEntity';
import { SelectionItem } from './SelectionItem';
import { IModel } from '../core/IModel';
export declare enum Op {
    Dec = 0,
    Inc = 1
}
export type SelectionFilter = (nodeId: NodeId, model: IModel) => NodeId | null;
/** A [[SelectionItem]] that is guaranteed to have a valid [[NodeId]]. */
export interface NodeSelectionItem extends SelectionItem {
    getNodeId(): NodeId;
    /** @hidden */
    _setNodeId(id: NodeId): void;
}
/** A [[SelectionItem]] that is guaranteed to have a valid entity. */
export interface EntitySelectionItem extends SelectionItem {
    getPosition(): Point3;
    overlayIndex(): OverlayIndex;
}
/** A [[SelectionItem]] that is guaranteed to have a valid [[NodeId]] and entity. */
export interface NodeEntitySelectionItem extends SelectionItem {
    getNodeId(): NodeId;
    getPosition(): Point3;
    overlayIndex(): OverlayIndex;
    /** @hidden */
    _setNodeId(id: NodeId): void;
}
/** A [[SelectionItem]] that is guaranteed to have a valid [[NodeId]] and [[FaceEntity]]. */
export interface FaceSelectionItem extends NodeEntitySelectionItem {
    getFaceEntity(): FaceEntity;
}
/** A [[SelectionItem]] that is guaranteed to have a valid [[NodeId]] and [[LineEntity]]. */
export interface LineSelectionItem extends NodeEntitySelectionItem {
    getLineEntity(): LineEntity;
}
/** A [[SelectionItem]] that is guaranteed to have a valid [[NodeId]] and [[PointEntity]]. */
export interface PointSelectionItem extends NodeEntitySelectionItem {
    getPointEntity(): PointEntity;
}
