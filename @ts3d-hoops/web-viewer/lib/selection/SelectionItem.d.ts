import { Point3 } from '@ts3d-hoops/common';
import { InclusionKey } from '@ts3d-hoops/streamcache';
import { NodeId, OverlayIndex, SelectionType } from '../types';
import { FaceEntity } from './FaceEntity';
import { LineEntity } from './LineEntity';
import { PointEntity } from './PointEntity';
import { EntitySelectionItem, FaceSelectionItem, LineSelectionItem, NodeEntitySelectionItem, NodeSelectionItem, PointSelectionItem } from './types';
export declare class SelectionItem implements NodeSelectionItem {
    /** @hidden */
    protected readonly _faceEntity: FaceEntity | null;
    /** @hidden */
    protected readonly _lineEntity: LineEntity | null;
    /** @hidden */
    protected readonly _pointEntity: PointEntity | null;
    /** @hidden */
    protected _nodeId: NodeId | null;
    /** @hidden */
    protected readonly _inclusionKey: InclusionKey | null;
    /** @hidden */
    private constructor();
    /**
     * Create a new [[FaceSelectionItem]].
     */
    static create(nodeId: NodeId, inclusionKey: InclusionKey | null | undefined, faceEntity: FaceEntity, lineEntity?: LineEntity | null, pointEntity?: PointEntity | null): FaceSelectionItem;
    /**
     * Create a new [[LineSelectionItem]].
     */
    static create(nodeId: NodeId, inclusionKey: InclusionKey | null | undefined, faceEntity: FaceEntity | null | undefined, lineEntity: LineEntity, pointEntity?: PointEntity | null): LineSelectionItem;
    /**
     * Create a new [[PointSelectionItem]].
     */
    static create(nodeId: NodeId, inclusionKey: InclusionKey | null | undefined, faceEntity: FaceEntity | null | undefined, lineEntity: LineEntity | null | undefined, pointEntity: PointEntity): PointSelectionItem;
    /**
     * Create a new [[EntitySelectionItem]].
     */
    static create(nodeId: NodeId | null | undefined, inclusionKey: InclusionKey | null | undefined, faceEntity: FaceEntity, lineEntity?: LineEntity | null, pointEntity?: PointEntity | null): EntitySelectionItem;
    /**
     * Create a new [[EntitySelectionItem]].
     */
    static create(nodeId: NodeId | null | undefined, inclusionKey: InclusionKey | null | undefined, faceEntity: FaceEntity | null | undefined, lineEntity: LineEntity, pointEntity?: PointEntity | null): EntitySelectionItem;
    /**
     * Create a new [[EntitySelectionItem]].
     */
    static create(nodeId: NodeId | null | undefined, inclusionKey: InclusionKey | null | undefined, faceEntity: FaceEntity | null | undefined, lineEntity: LineEntity | null | undefined, pointEntity: PointEntity): EntitySelectionItem;
    /**
     * Create a new [[NodeSelectionItem]].
     */
    static create(nodeId: NodeId, inclusionKey?: InclusionKey | null, faceEntity?: FaceEntity | null, lineEntity?: LineEntity | null, pointEntity?: PointEntity | null): NodeSelectionItem;
    /**
     * Create a new [[SelectionItem]].
     */
    static create(nodeId?: NodeId | null, inclusionKey?: InclusionKey | null, faceEntity?: FaceEntity | null, lineEntity?: LineEntity | null, pointEntity?: PointEntity | null): SelectionItem;
    getSelectionType(): SelectionType;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /** @hidden */
    static _fromJson(objData: any): SelectionItem;
    /**
     * Gets the face entity for this selection.
     * @returns the face entity if one was selected, otherwise null
     */
    getFaceEntity(): FaceEntity | null;
    /**
     * Gets the line entity for this selection.
     * @returns the line entity if one was selected, otherwise null
     */
    getLineEntity(): LineEntity | null;
    /**
     * Gets the point entity for this selection.
     * @returns the point entity if one was selected, otherwise null
     */
    getPointEntity(): PointEntity | null;
    /**
     * Gets the part id for this selection.
     * @returns the part id associated with this selection item
     */
    getNodeId(): NodeId;
    /**
     * Gets the include id for this selection.
     * @returns the inclusion key associated with this selection item
     */
    getInclusionKey(): InclusionKey | null;
    /**
     * Convenience method for getting the world space position of the selection point.
     * [[SelectionItem]]s with a type of [[SelectionType.Part]] will not have a position and null will be returned.
     * @returns World space position of the selection point if it can be determined.
     */
    getPosition(): Point3 | null;
    /**
     * Gets the overlay index for this selection.
     * @returns the overlay index associated with this selection item
     */
    overlayIndex(): OverlayIndex | null;
    /** @hidden */
    _setNodeId(id: NodeId): void;
    /**
     * Determines if two selection items are equal.
     * @param selectionItem The selection item to test against.
     * @returns whether or not the two items are equal.
     */
    equals(selectionItem: SelectionItem): boolean;
    /** @hidden */
    _hash(singleEntityToggleMode: boolean): string;
    /**
     * @returns true if the object has the fields required for an [[EntitySelectionItem]].
     * This function can be used as a TypeScript [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).
     */
    isEntitySelection(): this is EntitySelectionItem;
    /**
     * @returns true if the object has the fields required for a [[NodeSelectionItem]].
     * This function can be used as a TypeScript [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).
     */
    isNodeSelection(): this is NodeSelectionItem;
    /**
     * @returns true if the object has the fields required for a [[NodeEntitySelectionItem]].
     * This function can be used as a TypeScript [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).
     */
    isNodeEntitySelection(): this is NodeEntitySelectionItem;
    /**
     * @returns true if the object has the fields required for a [[FaceSelectionItem]].
     * This function can be used as a TypeScript [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).
     */
    isFaceSelection(): this is FaceSelectionItem;
    /**
     * @returns true if the object has the fields required for a [[LineSelectionItem]].
     * This function can be used as a TypeScript [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).
     */
    isLineSelection(): this is LineSelectionItem;
    /**
     * @returns true if the object has the fields required for a [[PointSelectionItem]].
     * This function can be used as a TypeScript [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).
     */
    isPointSelection(): this is PointSelectionItem;
}
