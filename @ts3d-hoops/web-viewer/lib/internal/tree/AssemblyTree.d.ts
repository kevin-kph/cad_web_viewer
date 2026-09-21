import { Plane, Point3, Matrix16 } from '@ts3d-hoops/common';
import { DataKey, InclusionKey, InstanceKey, MeshKey, ModelKey } from '@ts3d-hoops/streamcache';
import { Camera } from '../../Camera';
import { BimId, FilteredNodes, PmiSubType, PmiType, RelationshipType, StreamingMode, LayerName, GenericId, GenericType, LayerId, FilterId, FilterName } from '../../types';
import { BodyInstance } from './node/BodyInstance';
import { AbstractCuttingManager } from './AbstractCore';
import { AssemblyDataHeader } from './AssemblyData';
import { NodeIdOffset, DynamicNodeId, RuntimeNodeId, AuthoredNodeId } from './NodeId';
import { InclusionContext } from './context/InclusionContext';
import { LoadContext } from './context/LoadContext';
import { SharedPrototypeContext } from './context/PrototypeContext';
import { ScAttacher } from './load/ScAttacher';
import { TreeLoader } from './load/TreeLoader';
import { Layer } from './node-data/Layer';
import { ReferenceOnTopology } from './node-data/ReferenceOnTopology';
import { Filter } from './node-data/filter/Filter';
import { BimRelationship } from './node-data/relationship/types';
import { AuthoredLayerId } from './node-data/types';
import { CadView, CadViewParent } from './node/CadView';
import { PartDefinition } from './node/PartDefinition';
import { Pmi } from './node/Pmi';
import { PmiBody } from './node/PmiBody';
import { ProductOccurrence } from './node/ProductOccurrence';
import { RepresentationItem } from './node/RepresentationItem';
import { ViewFrame } from './node/ViewFrame';
import { AnyBody, AnyTreeNode, AnyNonTreeNode, AnyNode, AnyTreeContext, DeletableNode, LoadId } from './node/types';
import { LazyPromise } from '../LazyPromise';
import { LazyLike, PhantomMember } from '../types';
import { MeshInstanceData } from '../../MeshData';
import { IScEngine } from '../../core/IScEngine';
import { ICallbackManager } from '../../core/ICallbackManager';
import { IAssemblyTree } from '../../core/IAssemblyTree';
import { IModel, IView } from '../../core';
export interface AssemblyTreeConfig {
    readonly disableAutomaticFitWorld: boolean;
    readonly markImplicitNodesOutOfHierarchy: boolean;
    readonly streamingMode: StreamingMode;
}
/**
 * This basically contains 'global' information about the assembly tree.
 */
export declare class AssemblyTree implements IAssemblyTree {
    protected readonly __AssemblyTree: PhantomMember;
    private readonly _config;
    private readonly _engine;
    private readonly _callbackManager;
    private readonly _cuttingManager;
    private readonly _model;
    private _centralQueue;
    private readonly _centralQueueClock;
    private readonly _isScs;
    private _rootLoadContext;
    private _rootNode;
    private readonly _productOccurrences;
    private readonly _pmis;
    private readonly _cadViews;
    private readonly _bodyInstances;
    private readonly _pmiBodies;
    private readonly _viewFrames;
    private readonly _partDefinitions;
    private readonly _representationItems;
    private readonly _partToInstance;
    private readonly _filters;
    private readonly _layers;
    private readonly _layersIds;
    private _nextLayerId;
    private readonly _genericTypeToNodes;
    private readonly _genericIdToNodes;
    private readonly _cadConfigurations;
    private readonly _modelContents;
    private readonly _inclusionContents;
    private readonly _nodeDeletionBlackList;
    private readonly _meshDeletionBlackList;
    private _dynamicNodeIdSeed;
    private _currentNodeIdOffset;
    private _initialEmptyNodeIdOffsetObtained;
    private _activeCadView;
    private _activeCadConfiguration;
    private _defaultCadConfiguration;
    private _defaultCadViewsByConfiguration;
    private _firstProductOccurrenceWithView;
    private _containsDrawings;
    private _isMeasurable;
    private _automaticMeasurementUnitScaling;
    private _initiallyHiddenStayHidden;
    private _nextLoadId;
    private _activeLoadIds;
    private _requestedNodes;
    private _unnamedProductCount;
    private _unnamedGroupCount;
    private _unnamedDrawingSheetCount;
    private _unnamedDrawingViewCount;
    private _isInitialized;
    private _seenExternalModel;
    constructor(config: AssemblyTreeConfig, engine: IScEngine, callbackManager: ICallbackManager, cuttingManager: AbstractCuttingManager, model: IModel);
    initialize(scAttacher: ScAttacher): void;
    isInitialized(): boolean;
    getRootNode(): ProductOccurrence;
    getAbstractScEngine(): IScEngine;
    generateDynamicNodeId(): DynamicNodeId;
    newNodeIdOffset(): NodeIdOffset;
    /**
     * Please don't use me. This was kept for legacy reasons with Erwan's tree, which
     * had fundamental design problems with NodeIds (because they could conflict).
     */
    getLowestAvailableNodeId(): RuntimeNodeId;
    tryParseHeader(possibleHeaderData: Uint8Array): Promise<AssemblyDataHeader> | null;
    private _isRegistered;
    registerProductOccurrence(node: ProductOccurrence): void;
    lookupProductOccurrence(nodeId: RuntimeNodeId): ProductOccurrence | null;
    registerPmi(node: Pmi): void;
    lookupPmi(nodeId: RuntimeNodeId): Pmi | null;
    registerCadView(node: CadView): void;
    getFirstProductOccurrenceWithView(): ProductOccurrence | null;
    lookupCadView(nodeId: RuntimeNodeId): CadView | null;
    registerBodyInstance(node: BodyInstance, inclusionKey: InclusionKey): void;
    lookupBodyInstance(nodeId: RuntimeNodeId): BodyInstance | null;
    registerPmiBody(node: PmiBody, inclusionKey: InclusionKey): void;
    lookupPmiBody(nodeId: RuntimeNodeId): PmiBody | null;
    registerViewFrame(node: ViewFrame, inclusionKey: InclusionKey): void;
    lookupViewFrame(nodeId: RuntimeNodeId): ViewFrame | null;
    registerPartDefinition(partDef: PartDefinition): void;
    lookupPartDefinition(nodeId: RuntimeNodeId): PartDefinition | null;
    registerRepresentationItem(repItem: RepresentationItem): void;
    lookupRepresentationItem(nodeId: RuntimeNodeId): RepresentationItem | null;
    lookupAnyBody(nodeId: RuntimeNodeId): AnyBody | null;
    lookupAnyTreeNode(nodeId: RuntimeNodeId): AnyTreeNode | null;
    lookupAnyNonTreeNode(nodeId: RuntimeNodeId): AnyNonTreeNode | null;
    lookupAnyNode(nodeId: RuntimeNodeId): AnyNode | null;
    private _registerCadConfiguration;
    getInstanceCountByInclusion(inclusionKey: InclusionKey): number;
    lookupAnyBodyByInstanceInc(inclusionKey: InclusionKey, instanceKey: InstanceKey): AnyBody | null;
    private _registerAnyBodyByInstanceInc;
    private _getInclusionContent;
    private _getModelContent;
    registerPrototypeByDataId(loadContext: LoadContext, modelKey: ModelKey, dataKey: DataKey, prototype: SharedPrototypeContext): void;
    registerPartDefinitionByDataId(loadContext: LoadContext, modelKey: ModelKey, dataKey: DataKey, partDefinition: LazyPromise<PartDefinition>): void;
    lookupPrototypeByDataId(loadContext: LoadContext, modelKey: ModelKey, dataKey: DataKey): SharedPrototypeContext | null;
    lookupPartDefinitionByDataId(loadContext: LoadContext, modelKey: ModelKey, dataKey: DataKey): LazyPromise<PartDefinition> | null;
    registerInclusionContext(context: InclusionContext): void;
    getInclusionContexts(inclusionKey: InclusionKey): InclusionContext[];
    private _createLayer;
    private _updateNameToLayersMap;
    /**
     * Creates a new layer in the assembly tree. Also creates a mapping in the supplied assembly tree from
     * the authored layer id to the effective, runtime, id.
     * @param authoredLayerId The authored ID of the layer. Used to create the mapping in the assembly tree
     * @param layerName Name of the layer
     * @param loadContext Attach context of the node creating the layer. A layer mapping will be created in it
     */
    createLayer(authoredLayerId: AuthoredLayerId, layerName: LayerName | null, loadContext: LoadContext): Layer;
    /**
     * Changes the name of an existing layer.
     * @param layerId Layer id to update
     * @param layerName Name to be set
     */
    updateLayerName(layerId: LayerId, layerName: LayerName): void;
    private _registerNodeInLayer;
    /**
     * Registers a node as part of a layer. This will create a layer if one doesn't exist.
     * @param node Node to be registered
     * @param authoredLayerId Authored id of the Layer
     */
    registerNodeInLayer(node: AnyTreeNode, authoredLayerId: AuthoredLayerId): void;
    /**
     * Registers a tree node as part of a layer. This will create a layer if one doesn't exist.
     * @param node Node to be registered
     * @param authoredLayerId Authored id of the Layer
     */
    registerTreeNodeInLayer(node: AnyTreeNode, authoredLayerId: AuthoredLayerId): void;
    addFilter(filter: Filter, loadContext: LoadContext): void;
    getFilters(): Map<FilterId, FilterName>;
    getFilterName(filterId: FilterId): FilterName | null;
    getFiltersWithNode(targetNode: AnyTreeNode): FilterId[];
    getNodesFromFilterIds(filterIds: FilterId[]): FilteredNodes | null;
    getLayers(): Map<LayerId, LayerName>;
    getUniqueLayerNames(): LayerName[];
    getLayerName(layerId: LayerId): LayerName | null;
    getLayerAuthoredId(layerId: LayerId): number | null;
    getLayersIdFromName(name: LayerName): LayerId[] | null;
    getNodesFromLayer(layerId: LayerId, onlyTreeNodes?: boolean): AnyTreeNode[] | null;
    getNodesFromLayers(layerIds: LayerId[], onlyTreeNodes?: boolean): AnyTreeNode[] | null;
    getNodesFromLayerName(layerName: LayerName, onlyTreeNodes?: boolean): AnyTreeNode[] | null;
    generateProductName(): string;
    generateGroupName(): string;
    generateDrawingSheetName(): string;
    generateDrawingViewName(): string;
    forEachCadView(callback: (node: CadView) => void): void;
    forEachPmi(callback: (node: Pmi) => void): void;
    forEachCadConfiguration(callback: (node: ProductOccurrence) => void): void;
    hasActiveCadView(): boolean;
    activateCadView(view: IView, cadView: CadView, duration: number, massageCamera: boolean): Promise<void>;
    deactivateActiveCadView(): Promise<void>;
    getDefaultCadView(node: ProductOccurrence | null): CadView | null;
    getCadViewPmis(cadView: CadView): Pmi[];
    isMeasurable(): boolean;
    containsDrawings(): boolean;
    getCadConfigurations(): ProductOccurrence[];
    getDefaultCadConfiguration(): ProductOccurrence | null;
    getActiveCadConfiguration(): ProductOccurrence | null;
    activateCadConfiguration(node: ProductOccurrence): void;
    massageAuthoredUserId(inclusionContext: InclusionContext, authoredId: AuthoredNodeId | null): AuthoredNodeId | DynamicNodeId;
    createNode(parent: ProductOccurrence, nodeName: string, authoredId: AuthoredNodeId | null, localMatrix: Matrix16 | null, visibility: boolean, measurementUnit?: number | null): ProductOccurrence;
    createPart(authoredNodeId: AuthoredNodeId | null): PartDefinition;
    setPart(referrer: ProductOccurrence, partDef: PartDefinition): void;
    private _createCadView;
    private _createCadViewInstance;
    createCadView(engine: IScEngine, parent: CadViewParent, name: string, camera: Camera, pmis: Pmi[] | null, productOccurrencesToShow: RuntimeNodeId[], productOccurrencesToHide: RuntimeNodeId[], transformMap: Map<RuntimeNodeId, Matrix16>, cuttingPlane: Plane | null, meshInstanceData: MeshInstanceData | null): CadView;
    createMeshInstance(markLoaded: boolean, inclusionKey: InclusionKey, instanceKey: InstanceKey, authoredId: AuthoredNodeId | null, name: string | null, parent: ProductOccurrence, preventFromResetting: boolean, isOutOfHierarchy: boolean, initiallyVisible: boolean, implicitBody: boolean): BodyInstance;
    createPmiInstance(inclusionKey: InclusionKey, instanceKey: InstanceKey, authoredId: AuthoredNodeId | null, name: string | null, parent: ProductOccurrence, pmiType: PmiType, pmiSubType: PmiSubType, topoRefs: ReferenceOnTopology[]): Pmi;
    getRelationshipsOfItem(contextNodeId: RuntimeNodeId, node: BimId): Map<RelationshipType, BimRelationship>;
    getAutomaticMeasurementUnitScaling(): boolean;
    setAutomaticMeasurementUnitScaling(value: boolean): void;
    getInitiallyHiddenStayHidden(): boolean;
    setInitiallyHiddenStayHidden(value: boolean): void;
    private _removeIdMappingsRecursive;
    deleteNode(node: ProductOccurrence | BodyInstance | Pmi): Promise<void>;
    private _canDeleteNode;
    allowNodeDeletion(node: DeletableNode): void;
    preventNodeDeletion(node: DeletableNode): void;
    preventMeshDeletion(meshKey: MeshKey): void;
    private _resetContents;
    reset(): Promise<void>;
    setViewAxes(frontVec: Point3, upVec: Point3): void;
    private _requestIncsOfNodes;
    private _requestExternalModelsLocal;
    private _requestExternalModelsNonLocal;
    private _requestExternalModelsOfNodes;
    private _requestNodes;
    requestNodes(treeLoader: TreeLoader, nodes: AnyTreeNode[], isImplicitlyRequested: boolean): Promise<void>;
    isBeingRequested(startNode: AnyTreeNode | AnyTreeContext): boolean;
    onDemandRequestsActive(): boolean;
    onLoadBegin(): LoadId;
    onLoadEnd(loadId: number): void;
    markSeenExternalModel(): void;
    seenExternalModel(): boolean;
    getNodesByGenericId(genericId: GenericId): Set<AnyTreeNode> | null;
    getNodesByGenericType(genericType: GenericType): Set<AnyTreeNode> | null;
    genericTypeToNodes(): Map<GenericType, Set<AnyTreeNode>>;
    registerGenericGlobalId(node: AnyTreeNode, genericId: GenericId): void;
    registerGenericType(node: AnyTreeNode, genericType: GenericType): void;
    disableAutomaticFitWorld(): boolean;
    markImplicitNodesOutOfHierarchy(): boolean;
    private _throttleLoad;
    /**
     * Enqueues an action that can be throttled by user interactions.
     */
    enqueue<T>(lazyPromise: LazyLike<Promise<T>>): Promise<T>;
    private _onUserInteraction;
}
