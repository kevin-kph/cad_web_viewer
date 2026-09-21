import { Point3, Matrix, Plane, Color, Box, UnitElement, Matrix16 } from '@ts3d-hoops/common';
import { Camera } from '../../Camera';
import { BimId, BranchVisibility, FileType, FilteredNodes, IdStringMap, LoadSubtreeConfig, MassageModelNameFunc, ModelNameToScsFileFunc, NodeType, PmiSubType, PmiType, RelationshipInfo, RelationshipType, ScModelName, ScsBuffer, ScsUri, StringStringMap, UserDataIndex, XmlFilename, ExchangeId, FilterId, FilterName, GenericId, GenericType, LayerId, LayerName, NodeId, CadViewId, BranchVisibilityOptions } from '../../types';
import { InclusionKey, InstanceIncs, InstanceKey, MeshKey, ModelInc, ModelKey } from '@ts3d-hoops/streamcache';
import { PhantomMember } from '../types';
import { AssemblyTreeConfig } from './AssemblyTree';
import { BodyTypeBits } from './types';
import { BodyInstance } from './node/BodyInstance';
import { AssemblyData, AssemblyDataHeader } from './AssemblyData';
import { AbstractCuttingManager } from './AbstractCore';
import { RuntimeNodeId, AuthoredNodeId, NodeIdOffset } from './NodeId';
import { Attribute } from './node-data/Attribute';
import { ReferenceOnTopology } from './node-data/ReferenceOnTopology';
import { Relationship } from './node-data/relationship/Relationship';
import { BimRelationship } from './node-data/relationship/types';
import { CadView } from './node/CadView';
import { PartDefinition } from './node/PartDefinition';
import { Pmi, PmiTopologyReference } from './node/Pmi';
import { ProductOccurrence } from './node/ProductOccurrence';
import { RepresentationItem } from './node/RepresentationItem';
import { AnyTreeNode, AnyBody, AnyNode } from './node/types';
import { WalkRestriction } from './traversal/types';
import { Base, Edge, Face } from '../SubentityProperties';
import { SubentityAttributes } from '../../SubentityAttributes';
import { MeshInstanceData } from '../../MeshData';
import { IScEngine } from '../../core/IScEngine';
import { IModelStructure } from '../../core/IModelStructure';
import { ICallbackManager } from '../../core/ICallbackManager';
import { IModel, IView } from '../../core';
export declare class ModelStructure implements IModelStructure {
    protected readonly __ModelStructure: PhantomMember;
    private readonly _engine;
    private readonly _callbackManager;
    private readonly _cuttingManager;
    private readonly _model;
    private readonly _readyPromise;
    private _assemblyTree;
    private _treeLoader;
    private _clearQueue;
    private _clearInProgress;
    private _cadConfigurationsEnabled;
    constructor(config: AssemblyTreeConfig, engine: IScEngine, callbackManager: ICallbackManager, cuttingManager: AbstractCuttingManager, model: IModel);
    init(view: IView, maxConcurrentAttachments: number | null): Promise<void>;
    private _loadSubtreePrologue;
    private _loadSubtreeEpilogue;
    loadSubtreeFromXmlFile(nodeId: RuntimeNodeId, xmlFilename: XmlFilename, massageModelName: MassageModelNameFunc, config: LoadSubtreeConfig): Promise<RuntimeNodeId[]>;
    loadSubtreeFromXmlDoc(nodeId: RuntimeNodeId, xml: string | Document, massageModelName: MassageModelNameFunc, config: LoadSubtreeConfig): Promise<RuntimeNodeId[]>;
    loadSubtreeFromScsXmlFile(nodeId: RuntimeNodeId, xmlFilename: XmlFilename, modelNameToScs: ModelNameToScsFileFunc, config: LoadSubtreeConfig): Promise<RuntimeNodeId[]>;
    loadSubtreeFromScsXmlDoc(nodeId: RuntimeNodeId, xmlData: string | Document, modelNameToScs: ModelNameToScsFileFunc, config: LoadSubtreeConfig): Promise<RuntimeNodeId[]>;
    private _loadSubtreeFromStream;
    loadSubtreeFromStream(nodeId: RuntimeNodeId, modelName: ScModelName, config: LoadSubtreeConfig): Promise<RuntimeNodeId[]>;
    loadSubtreeFromScsFile(nodeId: RuntimeNodeId, scsFilename: ScsUri, config: LoadSubtreeConfig): Promise<RuntimeNodeId[]>;
    loadSubtreeFromScsBuffer(nodeId: RuntimeNodeId, scsBuffer: ScsBuffer, config: LoadSubtreeConfig): Promise<RuntimeNodeId[]>;
    /**
     * I don't think this is used at all. If so, this should be removed.
     */
    loadSubtreeFromAssemblyData(nodeId: RuntimeNodeId, modelInc: ModelInc, assemblyData: AssemblyData, config: LoadSubtreeConfig): Promise<RuntimeNodeId[]>;
    loadMeasurementFromJson(json: any): Promise<void>;
    loadMeasurementFromString(str: string): Promise<void>;
    loadMeasurementFromFile(zipFilename: string): Promise<void>;
    private _clearImpl;
    clear(): Promise<void>;
    switchToModel(newModelFilename: string): Promise<RuntimeNodeId[]>;
    getAbsoluteRootNodeId(): RuntimeNodeId;
    isIdValid(nodeId: RuntimeNodeId): boolean;
    private _getNodeChildren;
    getChildIds(nodeId: RuntimeNodeId, includeOutOfHierarchy: boolean): RuntimeNodeId[];
    isOutOfHierarchy(nodeId: RuntimeNodeId): boolean;
    getParentId(nodeId: RuntimeNodeId): RuntimeNodeId | null;
    getPartReferrers(nodeId: RuntimeNodeId): Promise<RuntimeNodeId[] | null>;
    getAttributes(nodeId: RuntimeNodeId): Promise<Attribute[]>;
    getProperties(nodeId: RuntimeNodeId, computeFromChildren: boolean): Promise<StringStringMap | null>;
    addProperty(nodeId: RuntimeNodeId, propertyName: string, propertyValue: string, propertyUnit: UnitElement[]): boolean;
    setPhysicalProperties(nodeId: RuntimeNodeId, centerOfGravity: Point3, surfaceArea: number, volume: number): boolean;
    getUserDataIndices(nodeId: RuntimeNodeId): UserDataIndex[];
    getUserData(nodeId: RuntimeNodeId, index: UserDataIndex): Uint8Array;
    getInstanceIncs(nodeId: RuntimeNodeId, allowedTypes: BodyTypeBits): InstanceIncs;
    getNodeFromInstanceInc(markNodeLoadedIfCreated: boolean, inclusionKey: InclusionKey, instanceKey: InstanceKey, isOutOfHierarchy: boolean): RuntimeNodeId;
    private _getAssociatedModelKey;
    getAssociatedModelKey(nodeId: RuntimeNodeId): ModelKey | null;
    getMatrix(nodeId: RuntimeNodeId): Matrix;
    setMatrix(nodeId: RuntimeNodeId, matrix: Matrix, setAsInitial: boolean): Promise<void>;
    setMatrices(nodeIds: RuntimeNodeId[], matrices: Matrix[], setAsInitial: boolean): Promise<void>;
    resetToInitialMatrix(nodeId: RuntimeNodeId): Promise<void>;
    getNetMatrix(nodeId: RuntimeNodeId): Matrix16;
    private _getBodyInstanceIndexFrom;
    getNodeOrRepItem(node: AnyNode): Promise<ProductOccurrence | Pmi | CadView | PartDefinition | RepresentationItem | null>;
    private _getNodeOrRepItemFromId;
    getPointAttributes(nodeId: RuntimeNodeId, pointId: number): Promise<SubentityAttributes | null>;
    getEdgeCount(nodeId: RuntimeNodeId): Promise<number>;
    getEdgeAttributes(nodeId: RuntimeNodeId, edgeId: number): Promise<SubentityAttributes | null>;
    getEdgeProperty(nodeId: RuntimeNodeId, edgeId: number): Promise<Edge | null>;
    getFaceCount(nodeId: RuntimeNodeId): Promise<number>;
    getFaceAttributes(nodeId: RuntimeNodeId, faceId: number): Promise<SubentityAttributes | null>;
    getFaceProperty(prcId: RuntimeNodeId, faceId: number): Promise<Face | null>;
    setEdgeProperty(nodeId: RuntimeNodeId, edgeId: number, prop: Base): void;
    setFaceProperty(nodeId: RuntimeNodeId, faceId: number, prop: Base): void;
    getName(nodeId: RuntimeNodeId): string | null;
    getNodeExchangeId(nodeId: RuntimeNodeId): ExchangeId | null;
    getFilters(): Map<FilterId, FilterName>;
    getFilterName(filterId: FilterId): FilterName | null;
    getFiltersWithNode(nodeId: RuntimeNodeId): FilterId[];
    getNodesFromFilterIds(filterIds: FilterId[]): FilteredNodes | null;
    getLayers(): Map<LayerId, LayerName>;
    getUniqueLayerNames(): LayerName[];
    getLayerName(layerId: LayerId): LayerName | null;
    getLayerAuthoredId(layerId: LayerId): number | null;
    getLayerIdsFromName(name: LayerName): LayerId[] | null;
    getNodeLayerId(nodeId: RuntimeNodeId): LayerId | null;
    getAuthoredNodesFromLayer(layerId: LayerId, onlyTreeNodes?: boolean): AuthoredNodeId[] | null;
    getAuthoredNodesFromLayers(layersId: LayerId[], onlyTreeNodes?: boolean): AuthoredNodeId[] | null;
    getRuntimeNodesFromLayer(layerId: LayerId, onlyTreeNodes?: boolean): RuntimeNodeId[] | null;
    getRuntimeNodesFromLayers(layersId: LayerId[], onlyTreeNodes?: boolean): RuntimeNodeId[] | null;
    getRuntimeNodesFromLayerName(layerName: LayerName, onlyTreeNodes?: boolean): RuntimeNodeId[] | null;
    createCadView(parentId: RuntimeNodeId, viewName: string, camera: Camera, pmiIds: RuntimeNodeId[] | null, nodesToShow: RuntimeNodeId[], nodesToHide: RuntimeNodeId[], nodesIdAndLocalTransforms: [RuntimeNodeId, Matrix][], cuttingPlane: Plane | null, meshInstanceData: MeshInstanceData | null): RuntimeNodeId | null;
    getCadViewMap(): Map<NodeId, string>;
    activateCadView(view: IView, cadViewId: RuntimeNodeId, duration: number, massageCamera: boolean): Promise<void>;
    getCadViewPmis(cadViewId: RuntimeNodeId): RuntimeNodeId[];
    _disableCadConfigurations(): Promise<void>;
    cadConfigurationsEnabled(): Promise<boolean>;
    getCadConfigurations(): IdStringMap;
    getDefaultCadConfiguration(): RuntimeNodeId | null;
    getActiveCadConfiguration(): RuntimeNodeId | null;
    getCadViewConfiguration(nodeId: RuntimeNodeId): RuntimeNodeId | null;
    private _activateCadConfiguration;
    activateCadConfiguration(view: IView, cadConfigId: RuntimeNodeId, fitNodes: boolean): Promise<void>;
    activateDefaultCadConfiguration(view: IView, fitNodes: boolean): Promise<void>;
    getDefaultCadView(): RuntimeNodeId | null;
    activateDefaultCadView(view: IView, duration: number, massageCamera: boolean): Promise<void>;
    getPmis(): IdStringMap;
    getPmiType(pmiId: RuntimeNodeId): PmiType;
    getPmiSubType(pmiId: RuntimeNodeId): PmiSubType;
    getUnit(nodeId: RuntimeNodeId): number;
    private _rectifyParent;
    createMeshInstance(inclusionKey: InclusionKey, instanceKey: InstanceKey, name: string | null, parentId: RuntimeNodeId | null, preventFromResetting: boolean, isOutOfHierarchy: boolean, implicitBody: boolean): RuntimeNodeId;
    createPmiInstance(inclusionKey: InclusionKey, instanceKey: InstanceKey, pmiType: PmiType, pmiSubType: PmiSubType, topoRefs: ReferenceOnTopology[], name: string | null, parentId: RuntimeNodeId | null): RuntimeNodeId;
    setVisibilitiesByMap(idToVisibility: Map<RuntimeNodeId, boolean>, initiallyHiddenStayHidden?: boolean): Promise<void>;
    setBodyNodesVisibility(startNode: AnyTreeNode, visibilityFormatter: boolean | ((node: AnyTreeNode) => boolean | undefined)): Promise<void>;
    setVisibilitiesByValue(nodeIds: RuntimeNodeId[], visibility: boolean, initiallyHiddenStayHidden: boolean | null): Promise<void>;
    resetAllVisibilities(): Promise<void>;
    resetAllTransforms(): Promise<void>;
    reset(): Promise<void>;
    setPmiColor(color: Color, startNodeId: RuntimeNodeId | undefined): void;
    resetPmiColor(startNodeId: RuntimeNodeId | undefined): void;
    getPmiTopologyReferences(pmiNodeId: RuntimeNodeId): PmiTopologyReference[] | null;
    createNode(parentId: RuntimeNodeId | null, nodeName: string, nodeId: AuthoredNodeId | null, localMatrix?: Matrix | null, visibility?: boolean, measurementUnit?: number | null): RuntimeNodeId;
    deleteNode(nodeId: RuntimeNodeId): Promise<void>;
    createPart(nodeId: AuthoredNodeId | null): RuntimeNodeId;
    setPart(nodeId: RuntimeNodeId, partId: RuntimeNodeId): boolean;
    createAndAddRepItem(partId: RuntimeNodeId, repItemId: AuthoredNodeId | null): RuntimeNodeId | null;
    getLowestAvailableNodeId(): RuntimeNodeId;
    getType(nodeId: RuntimeNodeId): NodeType;
    isVisible(nodeId: RuntimeNodeId): boolean;
    getBranchVisibility(nodeId: RuntimeNodeId, options?: BranchVisibilityOptions): BranchVisibility;
    setMeshLevel(nodeIds: RuntimeNodeId[], meshLevel: number): void;
    setEnableAutomaticUnitScaling(value: boolean): void;
    setBehaviorInitiallyHidden(value: boolean): void;
    isACadDrawing(): boolean;
    isMeasurable(): boolean;
    isLineMeasurable(bodyId: NodeId, lineIndex: number): Promise<boolean>;
    isFaceMeasurable(bodyId: NodeId, faceIndex: number): Promise<boolean>;
    getModelFileNameFromNode(nodeId: RuntimeNodeId): string | null;
    getModelFileTypeFromNode(nodeId: RuntimeNodeId): FileType | null;
    isAnnotationView(cadViewNodeId: RuntimeNodeId): boolean;
    isCombineStateView(cadViewNodeId: RuntimeNodeId): boolean;
    /** This will undo the effect of calling preventNodeDeletion() for the given node. */
    allowNodeDeletion(nodeId: RuntimeNodeId): void;
    preventNodeDeletion(nodeId: RuntimeNodeId): void;
    preventMeshDeletion(meshKey: MeshKey): void;
    getBounding(nodeIds: RuntimeNodeId[], allowedTypes: BodyTypeBits, ignoreInvisible: boolean, tightBounding: boolean): Promise<Box>;
    getIdOffset(nodeId: RuntimeNodeId): NodeIdOffset;
    /**
     * Motivation for this function:
     *
     * It is possible to begin a load where some SC geometry gets streamed in
     * but the assembly tree has not been fully parsed. Suppose an SC instance
     * (A) gets streamed, and has its node parsed by the assembly tree. If the
     * user attempts to select (A), our internals will find the NodeId associated
     * with (A). This is so far okay (but not ideal perhaps). The big issue comes
     * when the user starts to query the parents or children of the node. Since
     * the entire loaded subtree has not been fully parsed, querying such things
     * may not make sense because they might not be available. (Querying other
     * things might also be problematic.)
     *
     * It might make sense to not expose this function publically (as it is today
     * in `Model`) and do all the required filtering of selection results in the
     * selection internals. This, however might be 'problematic' when loading a
     * giant model (such as the Boeing). In this case, it might take ages for the
     * tree to completely load, which would make geometry not selectable in the
     * meantime. This might be interpreted as a bug from our users because they might
     * want to highlight such selected geometries.
     *
     * Related: COM-1169
     */
    isNodeLoaded(nodeId: RuntimeNodeId): boolean;
    shutdown(): void;
    isReady(): boolean;
    waitForReady(): Promise<void>;
    lookupAnyTreeNode(nodeId: RuntimeNodeId): AnyTreeNode | null;
    lookupAnyBody(nodeId: RuntimeNodeId): AnyBody | null;
    lookupBodyInstance(nodeId: RuntimeNodeId): BodyInstance | null;
    gatherInstanceIncsFromNodeIds(nodeIds: RuntimeNodeId[], allowedTypes: BodyTypeBits, restriction: WalkRestriction): InstanceIncs;
    /**
     * Walk the assembly tree from the given nodeId and gather all the AnyBody nodes found.
     * @param nodeId The starting nodeId to walk from.
     * @returns An array of AnyBody nodes found during the walk.
     */
    gatherAnyBodiesFromNodeId(nodeId: RuntimeNodeId): AnyBody[];
    requestNodes(nodeIds: RuntimeNodeId[]): Promise<void>;
    isWithinExternalModel(nodeId: RuntimeNodeId): boolean;
    getNodeGenericType(nodeId: RuntimeNodeId): GenericType | null;
    getNodeGenericId(nodeId: RuntimeNodeId): GenericId | null;
    getNodesByGenericId(genericId: GenericId): Set<RuntimeNodeId> | null;
    getNodesByGenericType(genericType: GenericType): Set<RuntimeNodeId> | null;
    getGenericTypes(): GenericType[];
    getGenericTypeIdMap(): Map<GenericType, Set<RuntimeNodeId>>;
    hasEffectiveGenericType(nodeId: NodeId, genericType: GenericType): boolean;
    registerGenericId(node: AnyTreeNode, genericId: GenericId): void;
    registerGenericType(node: AnyTreeNode, genericType: GenericType): void;
    hasRelationships(nodeId: RuntimeNodeId): boolean;
    getBimIdFromNode(nodeId: RuntimeNodeId): BimId | null;
    getRuntimeNodeFromBimId(contextNodeId: RuntimeNodeId, bimId: BimId): RuntimeNodeId | null;
    getRelationsByTypeFromNode(contextNodeId: RuntimeNodeId, nodeId: BimId): Map<RelationshipType, BimRelationship> | null;
    firstAssemblyDataHeader(): AssemblyDataHeader | null;
    setPrefetchScsCutoffScale(prefetchCutoffScale: number): void;
    getAllRelationships(nodeId: RuntimeNodeId): Relationship[];
    private getAllBimInfos;
    getInfoOfBimId(nodeID: RuntimeNodeId, bimId: BimId): {
        name: string;
        connected: boolean;
    };
    getBimIdRelationshipTypes(contextNodeId: RuntimeNodeId, nodeId: BimId): RelationshipInfo[];
    /** @hidden */
    $mapBimRelationshipTypes(nodeId: BimId, relationships: Relationship[]): RelationshipInfo[];
    getFiltersFromView(nodeId: CadViewId): FilterId[];
    applyFilters(filterIds: FilterId[]): Promise<void>;
    private _applyFiltersAsync;
    private _getNodeAttributes;
    private _handlePhysicalProperties;
    private _getPartDefAttributes;
}
