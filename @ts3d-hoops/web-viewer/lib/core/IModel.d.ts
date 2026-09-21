import { Box, Color, Matrix, Plane, Point3, Ray, UnitElement } from '@ts3d-hoops/common';
import { BimId, BranchVisibility, BranchVisibilityOptions, CadViewId, CullingVector, CullingVectorSpace, Degrees, ElementType, ExchangeId, FaceFaceDistanceItem, FileType, FilteredNodes, FilterId, FilterName, GenericId, GenericType, GetNodesBoundingConfig, IdBooleanMap, IdColorMap, IdNumberMap, IdStringMap, ImageId, ImageOptions, IMaterial, InstanceModifier, LayerId, LayerName, LinePattern, LinePatternLengthUnit, MassageModelNameFunc, MaterialParam, MetallicRoughnessValue, ModelNameToScsFileFunc, NodeDrawModeName, NodeId, NodeIdOffset, NodeType, PartId, PmiId, PmiSubType, PmiType, RefOnTopoItem, RelationshipType, ScsUri, StringStringMap, TextureOptions, UserDataIndex, ViewAxes, VisibilityState, XmlFilename } from '../types';
import { SubentityAttributes } from '../SubentityAttributes';
import { Base, Edge, Face } from '../internal';
import { MeshDataCopy } from '../MeshDataCopy';
import { BimMask, DataIds, InclusionKey, InstanceInc, InstanceIncs, InstanceKey, MeshId, ModelKey, ScModelName, ScsBuffer, SetShaderOptions, UniformDescription } from '@ts3d-hoops/streamcache';
import { IView } from './IView';
import { BodyTypeBits } from '../internal/tree';
import { MeshData, MeshInstanceData } from '../MeshData';
import { IModelStructure } from './IModelStructure';
import { Camera } from '../Camera';
import { AssemblyDataHeader } from '../internal/tree/AssemblyData';
export interface IModel {
    activateCadConfiguration(nodeId: NodeId, view?: IView): Promise<void>;
    activateCadView(nodeId: NodeId, duration?: number, massageCamera?: boolean, view?: IView): Promise<void>;
    activateDefaultCadConfiguration(fitNodes?: boolean, view?: IView): Promise<void>;
    activateDefaultCadView(duration?: number, massageCamera?: boolean, view?: IView): Promise<void>;
    addPropertyToNode(id: NodeId, propertyName: string, propertyValue: string, propertyUnit: UnitElement[]): boolean;
    cadConfigurationsEnabled(): Promise<boolean>;
    clear(): Promise<void>;
    clearNodeFaceVisibility(id: NodeId): void;
    clearNodeLineVisibility(id: NodeId): void;
    clearNodePointVisibility(id: NodeId): void;
    computeMinimumFaceLineDistance(partId: PartId, faceId: number, ray: Ray): Promise<FaceFaceDistanceItem>;
    computeMinimumBodyBodyDistance(partId1: PartId, partId2: PartId): Promise<FaceFaceDistanceItem>;
    computeMinimumFaceFaceDistance(partId1: PartId, faceId1: number, partId2: PartId, faceId2: number): Promise<FaceFaceDistanceItem>;
    computeMinimumFaceRayDistance(partId: PartId, faceId: number, ray: Ray): Promise<FaceFaceDistanceItem>;
    createAndAddRepresentationItem(partNodeId: PartId | undefined | null, repItemId?: NodeId | null): NodeId | null;
    createCadView(nodeId: NodeId, viewName: string, camera: Camera, pmiIds?: PmiId[] | null, nodesToShow?: NodeId[] | null, nodesToHide?: NodeId[] | null, nodeIdsAndLocalTransforms?: [NodeId, Matrix][] | null, cuttingPlane?: Plane | null, meshInstanceData?: MeshInstanceData | null): CadViewId | null;
    createImage(primaryImage: ImageOptions, thumbnailImage?: ImageOptions): Promise<ImageId>;
    createMesh(meshData: MeshData, config?: {
        doNotDelete?: boolean;
    }): Promise<MeshId>;
    createMeshInstance(data: MeshInstanceData, parentNodeId?: NodeId | null, preventFromResetting?: boolean | null, isOutOfHierarchy?: boolean | null): Promise<NodeId>;
    createNode(parentNodeId: NodeId | undefined | null, nodeName: string, nodeId?: NodeId | null, localMatrix?: Matrix | null, visibility?: boolean | null, measurementUnit?: number | null): NodeId;
    createPart(nodeId?: NodeId | null): PartId;
    createPmiInstance(data: MeshInstanceData, pmiType: PmiType, pmiSubType: PmiSubType, refOnTopoItems: RefOnTopoItem[], parentNodeId?: NodeId | null): Promise<PmiId>;
    deleteImages(imageIds: ImageId[]): Promise<void>;
    deleteMeshInstances(nodeIds: NodeId[]): Promise<void>;
    deleteMeshes(ids: MeshId[]): Promise<void>;
    deleteNode(id: NodeId): Promise<void>;
    getAbsoluteRootNode(): NodeId;
    getActiveCadConfiguration(): NodeId | null;
    getAssociatedModelKey(nodeId: NodeId): Promise<ModelKey | null>;
    getBimIdConnectedElements(node: NodeId, bimId: BimId, type: RelationshipType): {
        relateds: BimId[];
        relatings: BimId[];
    };
    getBimIdFromNode(id: NodeId): BimId | null;
    getBimIdRelatedElements(node: NodeId, bimId: BimId, type: RelationshipType): BimId[];
    getBimIdRelatingElements(node: NodeId, bimId: BimId, type: RelationshipType): BimId[];
    getBimIdsFromGenericId(ifcGuid: GenericId): BimId[];
    getBimInfoFromBimId(node: NodeId, bimId: BimId): {
        name: string;
        connected: boolean;
    };
    getBranchVisibility(id: NodeId, options?: BranchVisibilityOptions): BranchVisibility;
    getCadViewConfiguration(cadViewNodeId: NodeId): NodeId | null;
    getCadConfigurations(): IdStringMap;
    getCadViewMap(): Map<NodeId, string>;
    getCadViewPmis(nodeId: NodeId): PmiId[];
    getDataFromIds(ids: DataIds): Promise<Uint8Array[]>;
    getDefaultCadConfiguration(): NodeId | null;
    getDefaultCadView(): NodeId | null;
    getEdgeAttributes(id: NodeId, edgeIndex: number): Promise<SubentityAttributes | null>;
    getEdgeCount(id: NodeId): Promise<number>;
    getEdgeProperty(id: NodeId, edgeId: number): Promise<Edge | null>;
    getFaceAttributes(id: NodeId, faceIndex: number): Promise<SubentityAttributes | null>;
    getFaceCount(id: NodeId): Promise<number>;
    getFaceProperty(id: NodeId, faceId: number): Promise<Face | null>;
    getFilterName(filterId: FilterId): FilterName | null;
    getFiltersWithNode(nodeIdSearched: NodeId): FilterId[];
    getFilters(): Map<FilterId, FilterName>;
    getGenericIdFromBimId(node: NodeId, bimId: BimId): GenericId | null;
    getGenericTypes(): GenericType[];
    getGenericTypeIdMap(): Map<GenericType, Set<NodeId>>;
    getLayerIdsFromName(name: LayerName): LayerId[] | null;
    getLayerName(layerId: LayerId): LayerName | null;
    getLayerAuthoredId(layerId: LayerId): number | null;
    getLayers(): Map<LayerId, LayerName>;
    getLooseBounding(): Promise<Box>;
    getLowestAvailableNodeId(): NodeId;
    getMeshIds(ids: NodeId[]): Promise<MeshId[]>;
    getMetallicRoughness(nodeIds: NodeId[]): Promise<(MetallicRoughnessValue | null)[]>;
    getModelBounding(ignoreInvisible: boolean, includeExcluded: boolean, tightBounding?: boolean): Promise<Box>;
    getModelFileNameFromNode(id: NodeId): string | null;
    getModelFileTypeFromNode(id: NodeId): FileType | null;
    getNodeCappingMeshData(id: NodeId): Promise<MeshDataCopy | null>;
    getNodeChildren(id: NodeId, all?: boolean): NodeId[];
    getNodeColorMap(id: NodeId, elementType: ElementType): Promise<Map<NodeId, Color>>;
    getNodeEffectivePointColor(id: NodeId, pointIndex: number, view?: IView): Promise<Color | null>;
    getNodeEffectiveFaceColor(id: NodeId, faceIndex: number, view?: IView): Promise<Color | null>;
    getNodeEffectiveLineColor(id: NodeId, lineIndex: number, view?: IView): Promise<Color | null>;
    getNodeExchangeId(id: NodeId): ExchangeId | null;
    getNodeFaceColor(id: NodeId, faceIndex: number): Promise<Color | null>;
    getNodeFaceHighlighted(id: NodeId, faceIndex: number): Promise<boolean>;
    getNodeGenericId(id: NodeId): GenericId | null;
    getNodeGenericType(id: NodeId): GenericType | null;
    getNodeIdFromBimId(node: NodeId, bimID: BimId): NodeId | null;
    getNodeIdFromScInstanceKey(inclusionKey: InclusionKey, instanceKey: InstanceKey): NodeId | null;
    getNodeIdOffset(id: NodeId): NodeIdOffset;
    getNodeIdsByGenericIds(genericIds: GenericId[]): NodeId[];
    getNodeLayerId(id: NodeId): LayerId | null;
    getNodeLineColor(id: NodeId, lineIndex: number): Promise<Color | null>;
    getNodeLineHighlighted(id: NodeId, lineIndex: number): Promise<boolean>;
    getNodeMatrix(id: NodeId): Matrix;
    getNodeMeshData(id: NodeId): Promise<MeshDataCopy>;
    getNodeName(id: NodeId): string | null;
    getNodeNetMatrix(id: NodeId): Matrix;
    getNodeParent(id: NodeId): NodeId | null;
    getNodePointColor(id: NodeId, pointIndex: number): Promise<Color | null>;
    getNodePointHighlighted(id: NodeId, pointIndex: number): Promise<boolean>;
    getNodeProperties(id: NodeId, computeFromChildren?: boolean): Promise<StringStringMap | null>;
    getNodeRealBounding(id: NodeId, view?: IView): Promise<Box>;
    getNodeType(id: NodeId): NodeType;
    getNodeUnitMultiplier(id: NodeId): number;
    getNodeUserData(id: NodeId, index: UserDataIndex): Uint8Array;
    getNodeUserDataIndices(id: NodeId): UserDataIndex[];
    getNodeVisibility(id: NodeId): boolean;
    getNodesAmbientColor(ids: NodeId[]): Promise<(Color | null)[]>;
    getNodesBounding(ids: NodeId[], config?: GetNodesBoundingConfig): Promise<Box>;
    getNodesByGenericType(genericType: GenericType): Set<NodeId> | null;
    getNodesCappingMeshData(nodeIds: NodeId[]): Promise<MeshDataCopy[]>;
    getNodesCullingVectors(nodeIds: NodeId[]): Promise<(CullingVector | null)[]>;
    getNodesEffectiveAmbientColor(ids: NodeId[]): Promise<Color[]>;
    getNodesEffectiveEmissiveColor(ids: NodeId[]): Promise<Color[]>;
    getNodesEffectiveFaceColor(ids: NodeId[]): Promise<Color[]>;
    getNodesEffectiveLineColor(ids: NodeId[]): Promise<Color[]>;
    getNodesEffectiveOpacity(ids: NodeId[], elementType: ElementType): Promise<number[]>;
    getNodesEffectivePointColor(ids: NodeId[]): Promise<Color[]>;
    getNodesEffectiveSpecularColor(ids: NodeId[]): Promise<Color[]>;
    getNodesFaceColor(ids: NodeId[]): Promise<(Color | null)[]>;
    getNodesFaceEmissiveColor(ids: NodeId[]): Promise<(Color | null)[]>;
    getNodesFaceSpecularColor(ids: NodeId[]): Promise<(Color | null)[]>;
    getNodesFromFiltersId(filtersId: FilterId[]): FilteredNodes | null;
    getNodesFromLayer(layerId: LayerId, onlyTreeNodes?: boolean): NodeId[] | null;
    getNodesFromLayerName(layerName: LayerName, onlyTreeNodes?: boolean): NodeId[] | null;
    getNodesFromLayers(layersId: LayerId[], onlyTreeNodes?: boolean): NodeId[] | null;
    getNodesHaveTransparency(ids: NodeId[]): Promise<boolean[]>;
    getNodesHighlighted(ids: NodeId[]): Promise<boolean[]>;
    getNodesInstancingSamePart(id: NodeId): Promise<NodeId[] | null>;
    getNodesLineColor(ids: NodeId[]): Promise<(Color | null)[]>;
    getNodesMaterial(nodeIds: NodeId[]): Promise<IMaterial[]>;
    getNodesOpacity(ids: NodeId[]): Promise<(number | null)[]>;
    getNodesPointColor(ids: NodeId[]): Promise<(Color | null)[]>;
    /**
     * Applies custom GLSL shader programs to the specified nodes.
     * @param ids - Array of node identifiers to apply the shader to
     * @param vertexSource - GLSL vertex shader source code
     * @param fragmentSource - GLSL fragment shader source code
     * @param options - Optional shader configuration including uniform values
     * @returns Promise that resolves when the shader has been applied to all nodes
     * @throws When GLSL compilation fails, the promise rejects with an object whose `data` field contains the compiler error message.
     */
    setNodesShader(ids: NodeId[], vertexSource: string, fragmentSource: string, options?: SetShaderOptions): Promise<void>;
    /**
     * Updates uniform values for custom shaders previously applied to the specified nodes.
     * @param ids - Array of node identifiers whose shader uniforms should be updated
     * @param uniforms - Map of uniform variable names to their updated descriptions containing type and value information
     */
    setNodesShaderUniforms(ids: NodeId[], uniforms: Record<string, UniformDescription>): void;
    getOutOfHierarchy(id: NodeId): boolean;
    getPointAttributes(id: NodeId, pointIndex: number): Promise<SubentityAttributes | null>;
    getPmiColor(): Color;
    getPmiColorOverride(): boolean;
    getPmiSubtype(pmiId: PmiId): PmiSubType;
    getPmiTopologyReferences(pmiNodeId: NodeId): RefOnTopoItem[] | null;
    getPmiType(pmiId: PmiId): PmiType;
    getPmis(): IdStringMap;
    getRelationshipTypesFromBimId(node: NodeId, bimId: BimId): RelationshipType[];
    getScInstanceKey(nodeId: NodeId): InstanceInc | null;
    getUniqueLayerNames(): LayerName[];
    getViewAxes(): ViewAxes;
    getVisibilityState(id: NodeId): Promise<VisibilityState>;
    hasDepthRange(nodeIds: NodeId[]): Promise<boolean[]>;
    hasEffectiveGenericType(nodeId: NodeId, genericType: GenericType): boolean;
    isAnnotationView(cadViewNodeId: CadViewId): boolean;
    isCombineStateView(cadViewNodeId: CadViewId): boolean;
    isDrawing(): boolean;
    isFaceMeasurable(id: NodeId, faceIndex: number): Promise<boolean>;
    isLineMeasurable(id: NodeId, lineIndex: number): Promise<boolean>;
    isMeasurable(): boolean;
    isNodeLoaded(id: NodeId): boolean;
    isWithinExternalModel(id: NodeId): boolean;
    loadMeasurementFromFile(filename: string): Promise<void>;
    loadMeasurementFromJson(json: any): Promise<void>;
    loadMeasurementFromString(str: string): Promise<void>;
    loadSubtreeFromModel(nodeId: NodeId, modelName: ScModelName, ...args: any[]): Promise<NodeId[]>;
    loadSubtreeFromScsBuffer(nodeId: NodeId, buffer: ScsBuffer, ...args: any[]): Promise<NodeId[]>;
    loadSubtreeFromScsFile(nodeId: NodeId, scsFilename: ScsUri, ...args: any[]): Promise<NodeId[]>;
    loadSubtreeFromScsXmlBuffer(nodeId: NodeId, xmlData: string | Document, modelNameToScs?: ModelNameToScsFileFunc | null, ...args: any[]): Promise<NodeId[]>;
    loadSubtreeFromScsXmlFile(nodeId: NodeId, xmlFilename: XmlFilename, modelNameToScs?: ModelNameToScsFileFunc | null, ...args: any[]): Promise<NodeId[]>;
    loadSubtreeFromXmlBuffer(nodeId: NodeId, xmlData: string | Document, massageModelName?: MassageModelNameFunc | null, ...args: any[]): Promise<NodeId[]>;
    loadSubtreeFromXmlFile(nodeId: NodeId, xmlFilename: XmlFilename, massageModelName?: MassageModelNameFunc | null, ...args: any[]): Promise<NodeId[]>;
    registerBimNodes(id: NodeId, attributeToMask: (value: string) => BimMask, legacy_useAttributeTitle?: string | boolean | null): Promise<void>;
    registerIfcNodes(id: NodeId, legacy_useAttributeTitle?: string | boolean | null): Promise<void>;
    replaceMesh(id: MeshId, data: MeshData): Promise<void>;
    requestNodes(nodeIds: NodeId[]): Promise<void>;
    reset(): Promise<void>;
    resetModelHighlight(): Promise<void>;
    resetModelOpacity(): void;
    resetNodeMatrixToInitial(id: NodeId): void;
    resetNodesColor(): Promise<void>;
    resetNodesMaterial(nodeIds: NodeId[], params?: MaterialParam[]): void;
    resetNodesOpacity(ids: NodeId[]): void;
    resetNodesTransform(): Promise<void>;
    resetNodesVisibility(): Promise<void>;
    setBehaviorInitiallyHidden(enabled: boolean): void;
    setBodyNodesVisibility(id: NodeId, visibilityFormatter: boolean | ((node: NodeId) => boolean | undefined)): Promise<void>;
    setDepthRange(nodeIds: NodeId[], min: number, max: number): Promise<void>;
    setEdgeProperty(id: NodeId, edgeId: number, prop: Base): void;
    setEnableAutomaticUnitScaling(enabled: boolean): void;
    setFaceProperty(id: NodeId, faceId: number, prop: Base): void;
    setInstanceModifier(instanceModifier: InstanceModifier, nodeIds: NodeId[], value: boolean): Promise<void>;
    setMeshLevel(nodeIds: NodeId[], meshLevel: number): Promise<void>;
    setMetallicRoughness(nodeIds: NodeId[], metallicFactor: number, roughnessFactor: number): void;
    setNodeFaceColor(id: NodeId, faceId: number, color: Color): void;
    setNodeFaceVisibility(id: NodeId, faceId: number, visibility: boolean): void;
    setNodeFaceHighlighted(id: NodeId, faceId: number, highlighted: boolean): void;
    setNodeLineColor(id: NodeId, lineId: number, color: Color): void;
    setNodeLineVisibility(id: NodeId, lineId: number, visibility: boolean): void;
    setNodeLineHighlighted(id: NodeId, lineId: number, highlighted: boolean): void;
    setNodesMaterial(nodeIds: NodeId[], material: IMaterial): void;
    setNodeMatrix(id: NodeId, matrix: Matrix, initial?: boolean): Promise<void>;
    setNodePointColor(id: NodeId, pointId: number, color: Color): void;
    setNodePointHighlighted(id: NodeId, pointId: number, highlighted: boolean): void;
    setNodePointVisibility(id: NodeId, pointId: number, visibility: boolean): void;
    setNodesAmbientColor(ids: NodeId[], color: Color): void;
    setNodesAmbientMix(ids: NodeId[], value: number): void;
    setNodesColors(colorMap: Map<NodeId, Color> | IdColorMap, alsoApplyToWireframe?: boolean, alsoApplyToPoints?: boolean): Promise<void>;
    setNodesCullingVector(nodeIds: NodeId[], space: CullingVectorSpace, vector: Point3, toleranceDegrees: Degrees): Promise<void>;
    setNodesFaceColor(ids: NodeId[], color: Color): void;
    setNodesFaceEmissiveColor(ids: NodeId[], color: Color): void;
    setNodesFaceSpecularColor(ids: NodeId[], color: Color): void;
    setNodesFaceSpecularIntensity(ids: NodeId[], value: number): void;
    setNodesHighlighted(ids: NodeId[], highlighted: boolean): void;
    setNodesLineColor(ids: NodeId[], color: Color): void;
    setNodesLinePattern(nodeIds: NodeId[], pattern: LinePattern, patternLength: number, patternLengthUnit: LinePatternLengthUnit): void;
    setNodesOpacities(params: Map<NodeId, number> | IdNumberMap): void;
    setNodesOpacity(ids: NodeId[], opacity: number): void;
    setNodesPointColor(ids: NodeId[], color: Color): void;
    setNodesTexture(nodeIds: NodeId[], options: TextureOptions): Promise<void>;
    setNodesVisibilities(mapping: Map<NodeId, boolean> | IdBooleanMap, initiallyHiddenStayHidden?: boolean | null): Promise<void>;
    setNodesVisibility(ids: NodeId[], value: boolean, initiallyHiddenStayHidden?: boolean | null): Promise<void>;
    setPart(assemblyNodeId: NodeId | undefined | null, partNodeId: PartId | undefined | null): boolean;
    setPhysicalProperties(id: NodeId, gravityCenter: Point3, surfaceArea: number, volume: number): boolean;
    setPmiColor(color: Color): void;
    setPmiColorOverride(enableOverride: boolean, rootId?: NodeId): Promise<void>;
    setViewAxes(frontVector: Point3, upVector: Point3): void;
    switchToModel(newModelFilename: ScModelName): Promise<NodeId[]>;
    triangulatePolygon(polygonPoints: Float32Array | number[], normal: Point3): Float32Array;
    unsetDepthRange(nodeIds: NodeId[]): void;
    unsetMetallicRoughness(nodeIds: NodeId[]): void;
    unsetNodeFaceColor(id: NodeId, faceId: number): void;
    unsetNodeLineColor(id: NodeId, lineId: number): void;
    unsetNodesAmbientColor(ids: NodeId[]): void;
    unsetNodesCullingVectors(nodeIds: NodeId[]): Promise<void>;
    unsetNodesFaceColor(ids: NodeId[]): void;
    unsetNodesFaceEmissiveColor(ids: NodeId[]): void;
    unsetNodesFaceSpecularColor(ids: NodeId[]): void;
    unsetNodesFaceSpecularIntensity(ids: NodeId[]): void;
    unsetNodesLineColor(ids: NodeId[]): void;
    unsetNodesLinePattern(nodeIds: NodeId[]): void;
    unsetNodePointColor(id: NodeId, pointId: number): void;
    unsetNodesPointColor(ids: NodeId[]): void;
    unsetNodesTexture(nodeIds: NodeId[]): void;
    viewAxesHaveBeenSet(): boolean;
    /**
     * Get overridden draw mode for the given node ids.
     * Only leaf nodes attached to a body are considered. Other wont be in the returned record.
     * @param nodeIds The node ids to get the draw mode from.
     * @returns A record mapping node ids to their overridden draw modes per view.
     */
    getNodesDrawMode(nodeIds: NodeId[]): Record<NodeId, Record<number, NodeDrawModeName>>;
    /**
     * Set the draw modes for the given node ids.
     * Given nodes will be drawn according to their specified draw modes, overriding draw mode of the view.
     * Only leaf nodes attached to a body can have overriden draw mode.
     * If other nodes are passed, the draw mode will be applied recursively to the children and grand children which are attached to a body.
     * @param nodesDrawModes A record mapping node ids to their desired draw modes.
     * @param viewIds Array of view IDs to apply the draw mode override to. Pass an empty array to apply to all active views.
     */
    setNodesDrawModes(nodesDrawModes: Record<NodeId, NodeDrawModeName>, viewIds: number[]): void;
    _allowNodeDeletion(nodeId: NodeId): void;
    _firstAssemblyDataHeader(): AssemblyDataHeader | null;
    _gatherInstanceIncsFromNodeIds(nodeIds: NodeId[], allowedTypes?: BodyTypeBits): InstanceIncs;
    _getModelStructure(): IModelStructure;
    _getNodeFromInstanceInc(markNodeLoadedIfCreated: boolean, inclusionKey: InclusionKey, instanceKey: InstanceKey, isOutOfHierarchy: boolean): NodeId;
    _hwfAwaitAssemblyTreeReady(): Promise<void>;
    _preventMeshDeletion(meshId: MeshId): void;
    _preventNodeDeletion(nodeId: NodeId): void;
    _setDefaultView(view: IView): void;
    _setInstanceModifier(instanceModifier: InstanceModifier, nodeIds: NodeId[], value: boolean, allowedTypes: BodyTypeBits): void;
    _setModelStructure(modelStructure: IModelStructure): void;
    _setNodesMatrices(nodeIds: NodeId[], matrices: Matrix[], setAsInitial?: boolean): Promise<void>;
}
