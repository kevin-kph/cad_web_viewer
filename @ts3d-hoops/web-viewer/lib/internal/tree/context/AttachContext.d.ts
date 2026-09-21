import { GenericType, FileType } from '../../../types';
import { AttachScope, MasterModelKey } from '@ts3d-hoops/streamcache';
import { AssemblyData } from '../AssemblyData';
import { NodeIdOffset } from '../NodeId';
import { ScKeyRemapper } from '../load/ScKeyRemapper';
import { ProductOccurrence } from '../node/ProductOccurrence';
import { InclusionContext } from './InclusionContext';
import { LoadContext } from './LoadContext';
import { Bimap } from '../../Bimap';
import { PhantomMember } from '../../types';
import { VersionNumber } from '../../utils';
import { IAssemblyTree } from '../../../core';
export type AttachContextParent = ProductOccurrence | LoadContext;
export declare enum GenericTypeId {
}
export type GenericTypeMaps = Bimap<GenericTypeId, GenericType>;
/**
 * This object lives in the tree structure of `IAssemblyTree`.
 * `AttachContext` stores information relevant to the SC attachment of tree nodes below it.
 * If multiple `AttachContext`s are ancestors to a given node, the closest
 * context takes precedence.
 *
 * See `AnyTreeContext` for generic information about tree contexts.
 *
 * Note:
 * This class does *not* represent a model (as in it's not a "ModelContext").
 * It represents an SC attachment. (SC attachments in turn yield included models.)
 * The main role of this is to root key remappers and master model keys.
 */
export declare class AttachContext {
    constructor(remapper: ScKeyRemapper, attachScope: AttachScope, attachedInvisibly: boolean, masterModelKey: MasterModelKey, parent: AttachContextParent);
    getRootNodeMetaData(assemblyTree: IAssemblyTree): Promise<AssemblyData | null>;
    getAttachScope(): AttachScope;
    attachedInvisibly(): boolean;
    getMasterModelKey(): MasterModelKey;
    addInclusionContext(context: InclusionContext): void;
    getRemapper(): ScKeyRemapper;
    getParent(): AttachContextParent;
    getChildren(): ProductOccurrence[];
    getInclusionContexts(): InclusionContext[];
    split(attachScope: AttachScope, attachedInvisibly: boolean, parent: AttachContextParent): AttachContext;
    hasChildren(): boolean;
    removeProductOccurrence(node: ProductOccurrence): boolean;
    purgeContents(): Promise<void>;
    isLoaded(): boolean;
    setReservedNodeIdOffset(offset: NodeIdOffset): void;
    getReservedNodeIdOffset(): NodeIdOffset | null;
    forgetReservedNodeIdOffset(): void;
    getOriginalFileName(): string;
    getOriginalFileType(): FileType;
    setGenericTypeMaps(maps: GenericTypeMaps): void;
    getGenericTypeMaps(): GenericTypeMaps | null;
    getAssemblyDataVersion(): VersionNumber;
    protected readonly __AttachContext: PhantomMember;
    private readonly _parent;
    private readonly _remapper;
    private readonly _attachScope;
    private readonly _attachedInvisibly;
    private readonly _masterModelKey;
    private _reservedNodeIdOffset;
    private _inclusionContexts;
    private _originalFileName;
    private _originalFileType;
    private _assemblyDataVersion;
    private _genericTypeMaps;
}
