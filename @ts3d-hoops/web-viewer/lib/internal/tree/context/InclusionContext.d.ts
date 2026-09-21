import { InclusionKey, ModelKey } from '@ts3d-hoops/streamcache';
import { BimId } from '../../../types';
import { PhantomMember } from '../../types';
import { AuthoredNodeId, NodeIdOffset, RuntimeNodeId } from '../NodeId';
import { Relationship } from '../node-data/relationship/Relationship';
import { BimObject } from '../node-data/relationship/types';
import { ProductOccurrence } from '../node/ProductOccurrence';
import { AttachContext } from './AttachContext';
import { IAssemblyTree } from '../../../core';
/**
 * This object lives in the tree structure of `AssemblyTree`.
 * `InclusionContext` stores information relevant to the SC inclusion of tree nodes below it.
 * If multiple `InclusionContext`s are ancestors to a given node, the closest
 * context takes precedence.
 *
 * See `AnyTreeContext` for generic information about tree contexts.
 */
export declare class InclusionContext {
    constructor(assemblyTree: IAssemblyTree, attachContext: AttachContext, inclusionKey: InclusionKey, modelKey: ModelKey);
    split(assemblyTree: IAssemblyTree, parent: AttachContext): InclusionContext;
    getIdOffset(): NodeIdOffset;
    toRuntimeId(authoredId: AuthoredNodeId): RuntimeNodeId;
    getInclusionKey(): InclusionKey;
    getModelKey(): ModelKey;
    getParent(): AttachContext;
    /** Naming clarity for when you know you want it as the attach-context */
    getAttachContext(): AttachContext;
    addProductOccurrence(node: ProductOccurrence): void;
    getChildren(): ProductOccurrence[];
    removeProductOccurrence(node: ProductOccurrence): boolean;
    purgeContents(): Promise<void>;
    hasChildren(): boolean;
    isLoaded(): boolean;
    addRelationship(relationship: Relationship): void;
    getRelationships(): Relationship[];
    addBimInfos(bimInfo: BimObject): void;
    getBimInfos(): BimObject[];
    addBimIdToMap(bimId: BimId, runtimeId: RuntimeNodeId): void;
    getRuntimeNodeFromBimId(bimId: BimId): RuntimeNodeId | null;
    protected readonly __InclusionContext: PhantomMember;
    private readonly _attachContext;
    private readonly _inclusionKey;
    private readonly _modelKey;
    private readonly _nodeIdOffset;
    private _productOccurrences;
    private readonly _relationship;
    private _bimNodeIdMap;
    private _bimInfos;
}
