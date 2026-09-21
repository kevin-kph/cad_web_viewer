import { Matrix16 } from '@ts3d-hoops/common';
import { BranchVisibility, BranchVisibilityOptions, LoadSubtreeConfig } from '../../../types';
import { AuthoredNodeId, RuntimeNodeId } from '../NodeId';
import { SimpleMaterial } from '../node-data/SimpleMaterial';
import { Filter } from '../node-data/filter/Filter';
import { Relationship } from '../node-data/relationship/Relationship';
import { BimObject } from '../node-data/relationship/types';
import { NodeMixin } from './NodeMixin';
import { Pmi, PmiInfo } from './Pmi';
import { CadViewInfo, NodeInfo, PartDefinitionInfo } from './types';
import { PartDefinition } from './PartDefinition';
import { BodyInstance } from './BodyInstance';
import { DataId, DataKey } from '@ts3d-hoops/streamcache';
import { PhysicalProperties } from '../node-data/PhysicalProperties';
import { AttachContext } from '../context/AttachContext';
import { InclusionContext } from '../context/InclusionContext';
import { LoadContext } from '../context/LoadContext';
import { PrototypeContext } from '../context/PrototypeContext';
import { AssemblyDataParser } from '../load/AssemblyDataParser';
import { ExternalModelInfo } from '../load/ExternalModel';
import { ToAttachDataFunc } from '../load/ScAttacher';
import { TreeLoader } from '../load/TreeLoader';
import { CadView } from './CadView';
import { BodyInstanceInfo } from '../types';
import { LayerInfo } from '../node-data/types';
import { Boxed } from '../../Boxed';
import { LazyPromise } from '../../LazyPromise';
import { PhantomMember } from '../../types';
import { IAssemblyTree } from '../../../core';
export declare enum ProductBits_Legacy {
    NodeTypeDrawingSheet = 6
}
export declare enum ProductBits {
    IsAConfigurationNode = 1,
    NodeTypeProduct = 2,
    NodeTypeGroup = 4,
    NodeTypeDrawingSheet = 32,
    NodeTypeDrawingView = 8,
    IsADefaultNodeType = 16,
    BranchVisibilityHidden = 131072,
    BranchVisibilityShown = 65536,
    BranchVisibilityDirty = 32768,
    IsMissing = 4096,
    OutOfHierarchy = 268435456,
    IsExternalModelRoot = 2048
}
export interface ProductOccurrenceInfo {
    readonly nodeInfo: NodeInfo;
    readonly productBits: ProductBits;
    readonly childDataKeys: DataKey[];
    readonly prototypeDataKey: DataKey | null;
    readonly partDefinition: PartDefinitionInfo | DataId | null;
    readonly quickAccessPartDefinitionDataId: DataId | null;
    readonly externalModelInfo: ExternalModelInfo | null;
    readonly bodyInstanceInfos: BodyInstanceInfo[];
    readonly cadViewInfos: CadViewInfo<AuthoredNodeId>[];
    readonly pmiInfos: PmiInfo[];
    readonly measurementUnit: number | null;
    readonly simpleMaterial: SimpleMaterial | null;
    readonly layerInfos: LayerInfo[];
    readonly filters: Filter[];
    readonly relationships: Relationship[];
    readonly bimInfos: BimObject[];
}
export type ProductOccurrenceParent = ProductOccurrence | InclusionContext | PrototypeContext;
type ChildContext = LoadContext | AttachContext;
export declare class ProductOccurrence extends NodeMixin<ProductBits> {
    static parseXml(config: LoadSubtreeConfig, assemblyTree: IAssemblyTree, inclusionContext: InclusionContext, elem: Element, toAttachData: ToAttachDataFunc): ProductOccurrenceInfo;
    static parseBinary(config: LoadSubtreeConfig, assemblyTree: IAssemblyTree, inclusionContext: InclusionContext, parser: AssemblyDataParser): ProductOccurrenceInfo;
    /**
     * Like `reify` but with a synchronous return result.
     *
     * Usage requirements:
     *      - `info.childDataKeys` must be empty.
     *      - `info.externalModelInfo` must be `null`.
     */
    static reifySync(config: LoadSubtreeConfig, treeLoader: TreeLoader, assemblyTree: IAssemblyTree, inclusionContext: InclusionContext, info: ProductOccurrenceInfo, parent: ProductOccurrenceParent): ProductOccurrence;
    static reify(config: LoadSubtreeConfig, treeLoader: TreeLoader, assemblyTree: IAssemblyTree, inclusionContext: InclusionContext, info: ProductOccurrenceInfo, parent: ProductOccurrenceParent): Promise<ProductOccurrence>;
    static createDynamic(assemblyTree: IAssemblyTree, parent: ProductOccurrenceParent, name: string | null, authoredId: AuthoredNodeId | null, localTransform: Matrix16 | null, visible: boolean, outOfHierarchy?: boolean, measurementUnit?: number | null): ProductOccurrence;
    static createMissing(assemblyTree: IAssemblyTree, parent: ProductOccurrenceParent): ProductOccurrence;
    isMissing(): boolean;
    private static _amendInfo;
    private constructor();
    private _loadExternalModel;
    private _loadAndAttachExternalModel;
    loadPendingExternalModels(treeLoader: TreeLoader): Promise<AttachContext[]>;
    private _lazyLoadPartDefinitionByInfo;
    private _lazyLoadPartDefinitionById;
    private static _loadProductOccurrence;
    private _loadPrototypeContext;
    private _loadProductOccurrences;
    private _loadBodyInstances;
    private _loadCadViews;
    private _loadPmis;
    getParent(): ProductOccurrenceParent;
    getRuntimeId(): RuntimeNodeId;
    isAbsoluteRoot(): boolean;
    getPrototype(): PrototypeContext | null;
    isAConfigurationNode(): boolean;
    isADefaultNode(): boolean;
    isAProductNode(): boolean;
    isAGroupNode(): boolean;
    isADrawingSheetNode(): boolean;
    isADrawingViewNode(): boolean;
    addProductOccurrence(node: ProductOccurrence): void;
    addBodyInstance(node: BodyInstance): void;
    addCadView(node: CadView): void;
    addPmi(node: Pmi): void;
    addLoadContext(context: LoadContext): void;
    addAttachContext(context: AttachContext): void;
    private _followPrototypesWhileEmpty;
    getRawPartDefinition(): Promise<Boxed<LazyPromise<PartDefinition>> | null> | LazyPromise<PartDefinition> | null;
    getPartDefinition(): Promise<Boxed<LazyPromise<PartDefinition>> | null>;
    getPartDefinitionSync(): PartDefinition | null;
    getChildContexts(): ChildContext[];
    private _getChildren;
    getChildren(): Promise<ProductOccurrence[]>;
    getChildrenSync(): ProductOccurrence[];
    tryGetChildrenSync(): ProductOccurrence[] | null;
    forEachChild(callback: (node: ProductOccurrence) => void | Promise<void>): Promise<void>;
    forEachBodyInstance(callback: (node: BodyInstance) => void | Promise<void>): Promise<void>;
    forEachPmi(callback: (node: Pmi) => void | Promise<void>): Promise<void>;
    forEachCadView(callback: (node: CadView) => void | Promise<void>): Promise<void>;
    hasBodyInstances(): boolean;
    getBodyInstances(): BodyInstance[];
    getCadViews(): CadView[];
    getPmis(): Pmi[];
    setMeasurementUnit(unit: number): void;
    unsetMeasurementUnit(): void;
    hasMeasurementUnit(): boolean;
    getMeasurementUnit(): number;
    getPhysicalProperties(gatherFromChildren: boolean): Promise<PhysicalProperties | null>;
    setPartDefinition(partDef: PartDefinition): void;
    setPrototype(prototype: PrototypeContext): void;
    removePrototype(): PrototypeContext;
    getBranchVisibility(options?: BranchVisibilityOptions): BranchVisibility;
    private _getBranchVisibility;
    private _setBranchVisibility;
    private _updateBranchVisibility;
    private _getSubBranchVisibilities;
    private _itemWasAdded;
    private _onItemRemoved;
    markBranchVisibilityDirty(): void;
    private _markBranchVisibilityDirty;
    setVisibility(visible: boolean): void;
    private _removeDirectChild;
    private _removeIndirectChild;
    removeProductOccurrence(node: ProductOccurrence): boolean;
    /**
     * Removes the given child context from this product occurrence.
     * No cleanup of the child context is performed. That needs to be done by the caller.
     * @param context The child context to remove.
     * @internal
     */
    removeChildContext(context: ChildContext): void;
    removePmi(node: Pmi): boolean;
    removeBodyInstance(node: BodyInstance): boolean;
    purgeContents(): Promise<void>;
    removePartDefinition(): PartDefinition;
    isOutOfHierarchy(): boolean;
    markIsExternalModelRoot(assemblyTree: IAssemblyTree): void;
    isExternalModelRoot(): boolean;
    addPendingExternalModel(info: ExternalModelInfo): void;
    hasPendingExternalModels(): boolean;
    protected readonly __ProductOccurrence: PhantomMember;
    private readonly _parent;
    private _partDefinition;
    private _prototypeContext;
    private _children;
    private _childContexts;
    private _pendingExternalModels;
    private _bodyInstances;
    private _cadViews;
    private _pmis;
    private _measurementUnit;
    private branchVisibilityOptionFlag;
}
export {};
