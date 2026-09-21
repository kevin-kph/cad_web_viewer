import { Point3, Ray, Matrix, Plane, Box, UnitElement, Color } from '@ts3d-hoops/common';
import { DataIds, InclusionKey, InstanceInc, InstanceIncs, InstanceKey, ModelKey, UniformDescription, SetShaderOptions } from '@ts3d-hoops/streamcache';
import { Camera } from './Camera';
import { BimId, BimMask, BranchVisibility, CullingVector, CullingVectorSpace, ElementType, FaceFaceDistanceItem, FileType, FilteredNodes, IdBooleanMap, IdColorMap, IdNumberMap, IdStringMap, ImageId, ImageOptions, InstanceModifier, LinePattern, LinePatternLengthUnit, LoadSubtreeConfig, MassageModelNameFunc, MeshId, MetallicRoughnessValue, ModelNameToScsFileFunc, NodeType, PmiSubType, PmiType, RefOnTopoItem, RelationshipType, ScModelName, ScsBuffer, ScsUri, StringStringMap, TextureOptions, UserDataIndex, ViewAxes, VisibilityState, XmlFilename, LayerName, GenericId, NodeId, PartId, PmiId, CadViewId, ExchangeId, FilterId, FilterName, LayerId, GenericType, Degrees, NodeIdOffset, GetNodesBoundingConfig, IMaterial, MaterialParam, NodeDrawModeName, BranchVisibilityOptions } from './types';
import { BodyTypeBits } from './internal/tree';
import { AssemblyDataHeader } from './internal/tree/AssemblyData';
import { Base, Edge, Face } from './internal/SubentityProperties';
import { SubentityAttributes } from './SubentityAttributes';
import { MeshData, MeshInstanceData } from './MeshData';
import { MeshDataCopy } from './MeshDataCopy';
import { IModel } from './core/IModel';
import { IView } from './core/IView';
import { IScEngine } from './core/IScEngine';
import { IModelStructure } from './core/IModelStructure';
import { ICallbackManager } from './core/ICallbackManager';
/** The default duration in milliseconds of camera transitions. */
export declare const DefaultTransitionDuration = 400;
export declare const EmptyModelName = "_empty";
export declare const InvalidNodeId: NodeId;
/**
 * Object representing the model geometry and its associated data.
 * All major functionality for querying the model hierarchy, retrieving geometry data and loading additional model data are part of this object.
 *
 * More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/data_model/model-tree.html).
 */
export declare class Model implements IModel {
    private readonly _callbackManager;
    private readonly _engine;
    private readonly _pmiColor;
    private _pmiColorOverride;
    private _viewAxes;
    private _viewAxesSet;
    private _modelStructure;
    private _defaultView;
    /** @hidden */
    constructor(engine: IScEngine, callbackManager: ICallbackManager);
    /** @hidden */
    _setModelStructure(modelStructure: IModelStructure): void;
    /** @hidden */
    _setDefaultView(view: IView): void;
    /**
     * Sets the up and front vectors for the model coordinate system.
     * Both the upVector and frontVector must be unique, cardinal axes.
     * @param frontVector
     * @param upVector
     */
    setViewAxes(frontVector: Point3, upVector: Point3): void;
    /**
     * Gets whether there has been a successful call to setViewAxes.
     */
    viewAxesHaveBeenSet(): boolean;
    /**
     * @returns the up and front vectors for the model coordinate system.
     */
    getViewAxes(): ViewAxes;
    /**
     * Gets the world space bounding box for the model.
     * @returns Promise that resolves with a Box representing the world space bounding box of the model.
     */
    getModelBounding(ignoreInvisible: boolean, includeExcluded: boolean, tightBounding?: boolean): Promise<Box>;
    /**
     * Gets the world space bounding box for the model. This does not take node visibility into account.
     * @returns Promise that resolves with a Box representing the world space bounding box of the model.
     */
    getLooseBounding(): Promise<Box>;
    /** @hidden */
    _allowNodeDeletion(nodeId: NodeId): void;
    /** @hidden */
    _preventNodeDeletion(nodeId: NodeId): void;
    /** @hidden */
    _preventMeshDeletion(meshId: MeshId): void;
    /** @hidden */
    _getNodeFromInstanceInc(markNodeLoadedIfCreated: boolean, inclusionKey: InclusionKey, instanceKey: InstanceKey, isOutOfHierarchy: boolean): NodeId;
    /**
     * Gets the world space bounding box for a list of nodes.
     * @param nodeIds IDs of the nodes for which you wish to get the bounding box.
     * @param config Allows fine control of what body types to compute the bounding against. If not provided, all body types are considered.
     * @returns Promise that resolves with the world space bounding box for the given IDs.
     */
    getNodesBounding(nodeIds: NodeId[], config?: GetNodesBoundingConfig): Promise<Box>;
    /**
     * Gets the world space bounding box for a node including any effects (explosion, camera suppression, etc).
     * Note: This function can have performance implications when used on nodes with many children.
     * @param nodeId ID of the node for which you wish to get the bounding box.
     * @param view View to use for determining visibility.
     * @returns Promise that resolves with the world space bounding box for the given ID.
     */
    getNodeRealBounding(nodeId: NodeId, view?: IView): Promise<Box>;
    /**
     * Sets the visibility for a given set of nodes.
     * @param mapping The mapping of node IDs to boolean value indicating the visibility setting for that node.
     * @param initiallyHiddenStayHidden Controls whether or not initially hidden geometries stay hidden. Default behavior is driven by [[setBehaviorInitiallyHidden]].
     * @returns Promise that resolves when the operation has completed.
     */
    setNodesVisibilities(mapping: Map<NodeId, boolean> | IdBooleanMap, initiallyHiddenStayHidden?: boolean | null): Promise<void>;
    /**
     * Sets visibility for a given list of nodes.
     * @param nodeIds The node IDs whose visibilities will be set.
     * @param visibility If true, nodes will be shown. If false, they will be hidden.
     * @param initiallyHiddenStayHidden Controls whether or not initially hidden geometries stay hidden. Default behavior is driven by [[setBehaviorInitiallyHidden]].
     * @returns Promise that resolves when the operation has completed.
     */
    setNodesVisibility(nodeIds: NodeId[], visibility: boolean, initiallyHiddenStayHidden?: boolean | null): Promise<void>;
    /**
     * Sets the visibility of all body nodes starting from a given node.
     * @param startNodeId The start node to walk when updating body nodes visibility.
     * @param visibility If true, nodes will be shown. If false, they will be hidden.
     * @returns Promise that resolves when the operation has completed.
     */
    setBodyNodesVisibility(startNodeId: NodeId, visibility: boolean): Promise<void>;
    /**
     * Sets the visibility of all body nodes starting from a given node.
     * @param startNodeId The start node to walk when updating body nodes visibility.
     * @param visibilityFormatter A function that returns the visibility for a given node id
     * @returns Promise that resolves when the operation has completed.
     */
    setBodyNodesVisibility(startNodeId: NodeId, visibilityFormatter: (node: NodeId) => boolean | undefined): Promise<void>;
    /**
     * Resets visibility for all nodes in the model.
     * @returns Promise that resolves when the operation has completed.
     */
    resetNodesVisibility(): Promise<void>;
    /**
     * Returns a defaultVisibility boolean value and a visibilityException set of NodeIds.
     * defaultVisibility will be true if there are more nodes visible than hidden, and false otherwise.
     * If defaultVisibility is true, set of nodes that are hidden, if false, nodes that are visible.
     */
    getVisibilityState(startNodeId: NodeId): Promise<VisibilityState>;
    /**
     * Resets transform for all nodes in the model.
     * @returns Promise that resolves when the operation has completed.
     */
    resetNodesTransform(): Promise<void>;
    /**
     * Resets the state of the model to its default
     * @returns Promise that resolves when the operation has completed.
     */
    reset(): Promise<void>;
    /**
     * Remove all nodes, CAD views, configurations, and sheets from the model.
     *
     * If you intend to load additional models via the `loadSubtree` family
     * of methods, you should wait on the resolution of this promise before doing so.
     */
    clear(): Promise<void>;
    /**
     * Sets material properties for a given list of nodes.
     * Any properties not defined in the provided material will be left as-is.
     * @param nodeIds IDs of nodes whose material properties to set
     * @param material the material properties to apply
     */
    setNodesMaterial(nodeIds: NodeId[], material: IMaterial): void;
    /**
     * Gets the material properties of a node. This will combine material properties set at runtime
     * with authored material properties to return the complete current material.
     * @param nodeIds IDs of the nodes to be queried
     * @returns Promise that resolves with an array of material properties for each node
     */
    getNodesMaterial(nodeIds: NodeId[]): Promise<IMaterial[]>;
    /**
     * Resets material properties for a given list of nodes to their default values.
     * @param nodeIds IDs of nodes whose material properties to reset
     * @param params optional array of specific material parameters to reset. If not provided, all material properties
     * will be reset.
     */
    resetNodesMaterial(nodeIds: NodeId[], params?: MaterialParam[]): void;
    /**
     * Sets the color on the faces for a given list of nodes.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to set
     * @param color the color to set
     * @returns Promise that resolves when this operation has completed.
     */
    setNodesFaceColor(nodeIds: NodeId[], color: Color): Promise<void>;
    /**
     * Sets the ambient color on the faces for a given list of nodes.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to set
     * @param color the color to set
     */
    setNodesAmbientColor(nodeIds: NodeId[], color: Color): void;
    /**
     * Sets the ambient mix on the faces for a given list of nodes.
     * The mix is between the material ambient light and the global ambient light,
     * with 1.0 representing full material ambient mix and 0.0 representing full global
     * ambient light.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to set
     * @param value the decimal value to set, between 0 and 1
     */
    setNodesAmbientMix(nodeIds: NodeId[], value: number): void;
    /**
     * Gets the ambient color on the faces for a given list of nodes.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to get
     */
    getNodesAmbientColor(nodeIds: NodeId[]): Promise<(Color | null)[]>;
    /**
     * Gets the ambient color set on the faces of a list of leaf nodes. If no color has been set,
     * the color specified when the model was authored will be returned.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of the nodes to be queried
     */
    getNodesEffectiveAmbientColor(nodeIds: NodeId[]): Promise<Color[]>;
    /**
     * Unsets the ambient color on the faces for a given list of nodes.
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to unset
     */
    unsetNodesAmbientColor(nodeIds: NodeId[]): void;
    /**
     * Sets the emissive color on the faces for a given list of nodes.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to set
     * @param color the color to set
     */
    setNodesFaceEmissiveColor(nodeIds: NodeId[], color: Color): void;
    /**
     * Gets the emissive color on the faces for a given list of nodes.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to get
     */
    getNodesFaceEmissiveColor(nodeIds: NodeId[]): Promise<(Color | null)[]>;
    /**
     * Gets the emissive color set on the faces of a list of leaf nodes. If no color has been set,
     * the color specified when the model was authored will be returned.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of the nodes to be queried
     */
    getNodesEffectiveEmissiveColor(nodeIds: NodeId[]): Promise<Color[]>;
    /**
     * Resets the emissive color on the faces for a given list of nodes.
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to reset
     */
    unsetNodesFaceEmissiveColor(nodeIds: NodeId[]): void;
    /**
     * Sets the specular color on the faces for a given list of nodes.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to set
     * @param color the color to set
     */
    setNodesFaceSpecularColor(nodeIds: NodeId[], color: Color): void;
    /**
     * Gets the specular color on the faces for a given list of nodes.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to get
     */
    getNodesFaceSpecularColor(nodeIds: NodeId[]): Promise<(Color | null)[]>;
    /**
     * Gets the specular color set on the faces of a list of leaf nodes. If no color has been set,
     * the color specified when the model was authored will be returned.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of the nodes to be queried
     */
    getNodesEffectiveSpecularColor(nodeIds: NodeId[]): Promise<Color[]>;
    /**
     * Resets the specular color on the faces for a given list of nodes.
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to reset
     */
    unsetNodesFaceSpecularColor(nodeIds: NodeId[]): void;
    /**
     * Sets the specular intensity on the faces for a given list of nodes.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to set
     * @param value the value to set
     */
    setNodesFaceSpecularIntensity(nodeIds: NodeId[], value: number): void;
    /**
     * Resets the specular intensity on the faces for a given list of nodes.
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to set
     */
    unsetNodesFaceSpecularIntensity(nodeIds: NodeId[]): void;
    private _setNodesFaceColor;
    private _unsetNodesColor;
    /**
     * Unsets the color on the faces for a given list of nodes.
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @param nodeIds IDs of nodes to modify
     * @returns Promise that resolves when this operation has completed.
     */
    unsetNodesFaceColor(nodeIds: NodeId[]): Promise<void>;
    /**
     * Sets the color on the lines/edges for a given list of nodes.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to set
     * @param color the color to set
     * @returns Promise that resolves when this operation has completed.
     */
    setNodesLineColor(nodeIds: NodeId[], color: Color): Promise<void>;
    private _setNodesLineColor;
    /**
     * Unsets the color on the lines for a given list of nodes.
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @param nodeIds IDs of nodes to modify
     * @returns Promise that resolves when this operation has completed.
     */
    unsetNodesLineColor(nodeIds: NodeId[]): Promise<void>;
    /**
     * Sets whether the supplied nodes should appear highlighted. When a node is highlighted,
     * the highlight color will override any color previously set on the model.
     *
     * *Tip:* An easy way to unhighlight the entire model is to call [[setNodesHighlighted]]
     * on the root node of the model:
     * ```
     * hwv.model.setNodesHighlighted([hwv.model.getAbsoluteRootNode()], false);
     * ```
     * (In this case, `hwv` is your instance of [[WebViewer]].)
     *
     * @param partIds array of IDs for this operation.
     * @param highlighted value indicating whether the supplied nodes should be highlighted.
     * @returns Promise that resolves when this operation has completed.
     */
    setNodesHighlighted(partIds: PartId[], highlighted: boolean): Promise<void>;
    /**
     * Returns whether the supplied nodes have been highlighted with [[setNodesHighlighted]].
     * @param partIds the list of nodes to be queried
     */
    getNodesHighlighted(partIds: PartId[]): Promise<boolean[]>;
    /**
     * Sets colors for a given set of nodes.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param colorMap object mapping node IDs to color to set for that node
     * @param alsoApplyToWireframe change or not lines color
     * @param alsoApplyToPoints change or not points color
     * @returns Promise that resolves when this operation has completed.
     */
    setNodesColors(colorMap: Map<NodeId, Color> | IdColorMap, alsoApplyToWireframe?: boolean, alsoApplyToPoints?: boolean): Promise<void>;
    /**
     * Gets an array of PMI topology references linking a PMI node to a body element, like a face or an edge.
     * @param pmiNodeId the ID of the PMI node.
     */
    getPmiTopologyReferences(pmiNodeId: NodeId): RefOnTopoItem[] | null;
    /**
     * Returns names and ids of all the PMIs available in the scene
     * @returns a map associating PMI IDs to PMI names
     */
    getPmis(): IdStringMap;
    /**
     * Returns the type of a given PMI
     * @param pmiId ID of the PMI
     * @returns Type of the PMI (Dimension, Datum, GD&T...)
     */
    getPmiType(pmiId: PmiId): PmiType;
    /**
     * Returns the subtype of a given PMI
     * @param pmiId ID of the PMI
     * @returns Subtype of the PMI (Dimension distance, Datum target, GD&T fcf...)
     */
    getPmiSubtype(pmiId: PmiId): PmiSubType;
    /**
     * Saves a PMI override color
     * @param color the override color
     */
    setPmiColor(color: Color): void;
    /**
     * Returns the set PMI override color  (if none is set, defaults to black)
     * @returns color
     */
    getPmiColor(): Color;
    /**
     * Takes a boolean value and either enables the set PMI override color or resets all PMI colors to their default
     * @returns Promise that resolves when this operation has completed.
     */
    setPmiColorOverride(enableOverride: boolean, rootId?: NodeId): Promise<void>;
    /**
     * @returns a boolean value indicating the status of the PMI override color.
     */
    getPmiColorOverride(): boolean;
    /**
     * Computes the distance between two bodies
     * @param partId1 id for the part which the first face belongs to
     * @param partId2 id for the part which the second face belongs to
     * @returns a promise that resolves with a Markup.Measure.FaceFaceDistanceItem when the operation completes
     */
    computeMinimumBodyBodyDistance(partId1: PartId, partId2: PartId): Promise<FaceFaceDistanceItem>;
    /**
     * Computes the distance between two faces
     * @param partId1 id for the part which the first face belongs to
     * @param faceId1 id for the face in the first part
     * @param partId2 id for the part which the second face belongs to
     * @param faceId2 id for the face in the second part
     * @returns a promise that resolves with a Markup.Measure.FaceFaceDistanceItem when the operation completes
     */
    computeMinimumFaceFaceDistance(partId1: PartId, faceId1: number, partId2: PartId, faceId2: number): Promise<FaceFaceDistanceItem>;
    /**
     * Computers the minimum distance between a face and a ray.
     * @param partId id of the node the face belongs to
     * @param faceId id of the face in the node
     * @param ray the ray to test against
     * @returns a promise that resolves with a Markup.Measure.FaceFaceDistanceItem when the operation completes
     */
    computeMinimumFaceRayDistance(partId: PartId, faceId: number, ray: Ray): Promise<FaceFaceDistanceItem>;
    /**
     * Computers the minimum distance between a face and an infinite line.
     * @param partId id of the node the face belongs to
     * @param faceId id of the face in the node
     * @param ray the line (in the form of a ray) to test against
     * @returns a promise that resolves with a Markup.Measure.FaceFaceDistanceItem when the operation completes
     */
    computeMinimumFaceLineDistance(partId: PartId, faceId: number, ray: Ray): Promise<FaceFaceDistanceItem>;
    /**
     * Sets the color for a face element. This color will take precedence over any currently set color on the node
     * @param partId the Id of the node containing the face
     * @param faceId the Id of the face in the node that will have its color set
     * @param color the color to set
     */
    setNodeFaceColor(partId: PartId, faceId: number, color: Color): Promise<void>;
    private _setNodeFaceColor;
    /**
     * Sets the visibility for a face element. This visibility setting will take precedence over other element visibility settings
     * @param partId the Id of the part containing the face
     * @param faceId the Id of the face in the node that will have its visibility set
     * @param visibility visibility state to be set
     */
    setNodeFaceVisibility(partId: PartId, faceId: number, visibility: boolean): void;
    /**
     * Clears the visibility for a node's face elements, resetting them to default.
     * @param partId the Id of the part to be reset
     */
    clearNodeFaceVisibility(partId: PartId): void;
    private _setNodeElementVisibility;
    private _clearNodeElementVisibility;
    private _unsetElementColor;
    /**
     * Unsets the color for a face element. This will return the face's color to its default state.
     * @param partId the Id of the node containing the face
     * @param faceId the Id of the face in the node that will have its color unset
     */
    unsetNodeFaceColor(partId: PartId, faceId: number): Promise<void>;
    /**
     * Sets whether the face element for a given node should appear highlighted.
     * When a face element is highlighted, the highlight color will override
     * any color previously set on the element.
     * @param nodeId the id for the node containing the face element.
     * @param faceId the face Id that is the target of this operation.
     * @param highlighted value indicating whether the supplied face element should be highlighted.
     */
    setNodeFaceHighlighted(nodeId: NodeId, faceId: number, highlighted: boolean): Promise<void>;
    private _setNodeFaceHighlighted;
    private _getElementHighlighted;
    /**
     * Returns whether the supplied face element has been highlighted with [[setNodeFaceHighlighted]].
     * @param nodeId the ID of the node containing the face element
     * @param faceIndex the index of the face within the node
     */
    getNodeFaceHighlighted(nodeId: NodeId, faceIndex: number): Promise<boolean>;
    /**
     * Gets the color set via [[setNodePointColor]] on a point element.
     * If no color has been set, `null` will be returned.
     * <br><br> See also: [[getNodeEffectivePointColor]]
     * @param partId the ID of the node containing the point
     * @param pointIndex the index of the point in the node
     */
    getNodePointColor(partId: PartId, pointIndex: number): Promise<Color | null>;
    /**
     * Gets the color set via [[setNodePointColor]] on a point element. If no color has been set,
     * the node's point color will be returned. If the node's point color has not been set,
     * the color specified when the model was authored will be returned.
     * @param partId the ID of the node containing the point
     * @param pointIndex the index of the point in the node
     * @param view the View to use for calculating view effects
     */
    getNodeEffectivePointColor(partId: PartId, pointIndex: number, view?: IView): Promise<Color | null>;
    /**
     * Sets the color for a point element.
     * @param partId the Id of the node containing the point.
     * @param pointId the Id of the point in the node that will have its color set.
     * @param color the color to set.
     */
    setNodePointColor(partId: PartId, pointId: number, color: Color): void;
    /**
     * Unsets the color for a point element. This will return the point's color to its default state.
     * @param partId the Id of the node containing the point
     * @param pointId the Id of the point in the node that will have its color unset
     */
    unsetNodePointColor(partId: PartId, pointId: number): void;
    /**
     * Gets the color set via [[setNodesPointColor]] on the points of a list of leaf nodes.
     * If no color has been explicitly set for a particular node, `null` will appear at the corresponding
     * position in the returned array.
     * <br><br> See also: [[getNodesEffectivePointColor]]
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of the nodes to be queried
     */
    getNodesPointColor(nodeIds: NodeId[]): Promise<(Color | null)[]>;
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
    /**
     * Gets the color set on the points of a list of leaf nodes. If no color has been set,
     * the color specified when the model was authored will be returned.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of the nodes to be queried
     */
    getNodesEffectivePointColor(nodeIds: NodeId[]): Promise<Color[]>;
    /**
     * Sets the color on the points for a given list of nodes.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose color to set
     * @returns Promise that resolves when this operation has completed.
     */
    setNodesPointColor(nodeIds: NodeId[], color: Color): void;
    /**
     * Unsets the color on the points for a given list of nodes.
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @param nodeIds IDs of nodes to modify
     */
    unsetNodesPointColor(nodeIds: NodeId[]): void;
    /**
     * Sets the color for a line element.
     * @param partId the Id of the node containing the line.
     * @param lineId the Id of the line in the node that will have its color set.
     * @param color the color to set.
     */
    setNodeLineColor(partId: PartId, lineId: number, color: Color): Promise<void>;
    private _setNodeLineColor;
    /**
     * Unsets the color for a line element. This will return the line's color to its default state.
     * @param partId the Id of the node containing the line
     * @param lineId the Id of the line in the node that will have its color unset
     */
    unsetNodeLineColor(partId: PartId, lineId: number): Promise<void>;
    /**
     * Sets the visibility for a line element. This visibility setting will take precedence over other element visibility settings
     * @param partId the Id of the part containing the line
     * @param lineId the Id of the line in the node that will have its visibility set
     * @param visibility visibility state to be set
     */
    setNodeLineVisibility(partId: PartId, lineId: number, visibility: boolean): void;
    /**
     * Clears the visibility for a node's line elements, resetting them to default.
     * @param partId the Id of the part to clear visibilities from
     */
    clearNodeLineVisibility(partId: PartId): void;
    /**
     * Sets whether the line element for a given node should appear highlighted. When a line element is highlighted, the highlight color will override any color previously set on the element.
     * @param partId the id for the node containing the line element.
     * @param lineId the line Id that is the target of this operation.
     * @param highlighted value indicating whether the supplied line element should be highlighted.
     */
    setNodeLineHighlighted(partId: PartId, lineId: number, highlighted: boolean): Promise<void>;
    private _setNodeLineHighlighted;
    /**
     * Returns whether the supplied line element has been highlighted with [[setNodeLineHighlighted]].
     * @param nodeId the ID of the node containing the line element
     * @param lineIndex the index of the line within the node
     */
    getNodeLineHighlighted(nodeId: NodeId, lineIndex: number): Promise<boolean>;
    /**
     * Sets the visibility for a point element. This visibility setting will take precedence over other element visibility settings
     * @param partId the Id of the part containing the point
     * @param pointId the Id of the point in the node that will have its visibility set
     * @param visibility visibility state to be set
     */
    setNodePointVisibility(partId: PartId, pointId: number, visibility: boolean): void;
    /**
     * Clears the visibility for a node's point elements, resetting it to default.
     * @param partId the Id of the part to clear visibilities from
     */
    clearNodePointVisibility(partId: PartId): void;
    /**
     * Sets whether the point element for a given node should appear highlighted. When a point element is highlighted, the highlight color will override any color previously set on the element.
     * @param partId the id for the node containing the point element.
     * @param pointId the point Id that is the target of this operation.
     * @param highlighted value indicating whether the supplied point element should be highlighted.
     */
    setNodePointHighlighted(partId: NodeId, pointId: number, highlighted: boolean): Promise<void>;
    private _setNodePointHighlighted;
    /**
     * Returns whether the supplied point element has been highlighted with [[setNodePointHighlighted]].
     * @param nodeId the ID of the node containing the point element
     * @param pointIndex the index of the point within the node
     */
    getNodePointHighlighted(nodeId: NodeId, pointIndex: number): Promise<boolean>;
    /**
     * Resets color for all nodes in the model.
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @returns Promise that resolves when this operation has completed.
     */
    resetNodesColor(): Promise<void>;
    /**
     * Sets opacity for a given list of nodes.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose opacity will be set
     * @param opacity opacity value to apply to each node. The value should be between the range of 0.0 and 1.0. 0.0 indicates fully transparent, while 1.0 is fully opaque.
     */
    setNodesOpacity(nodeIds: NodeId[], opacity: number): void;
    /**
     * Returns whether nodes with the given NodeIds have an opacity value that is not fully opaque.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of nodes to query.
     * @returns array of boolean values corresponding to the id array passed into the function.  A value of true indicates that the node contains transparency and is not fully opaque.
     */
    getNodesHaveTransparency(nodeIds: NodeId[]): Promise<boolean[]>;
    /**
     * Sets opacity for a given set of nodes.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param params object mapping node IDs to opacity to set for that NodeId. The opacity value should be between the range of 0.0 and 1.0. 0.0 indicates fully transparent, while 1.0 is fully opaque.
     */
    setNodesOpacities(params: Map<NodeId, number> | IdNumberMap): void;
    /**
     * Resets opacity for all nodes in the model.
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @returns Promise that resolves when this operation has completed.
     */
    resetModelOpacity(): void;
    /**
     * Resets highlight for all nodes in the model.
     * @returns Promise that resolves when this operation has completed.
     */
    resetModelHighlight(): Promise<void>;
    /**
     * Resets opacity for a given list of nodes.
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @param nodeIds IDs of nodes whose opacity will be reset to their default values
     */
    resetNodesOpacity(nodeIds: NodeId[]): void;
    private _getNodesColor;
    private _getNodesEffectiveColor;
    /**
     * Gets the color set via [[setNodesFaceColor]] on the faces of a list of leaf nodes.
     * If no color has been explicitly set for a particular node, `null` will appear at the corresponding
     * position in the returned array.
     * <br><br> See also: [[getNodesEffectiveFaceColor]]
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of the nodes to be queried
     */
    getNodesFaceColor(nodeIds: NodeId[]): Promise<(Color | null)[]>;
    /**
     * Gets the color set on the faces of a list of leaf nodes. If no color has been set,
     * the color specified when the model was authored will be returned.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of the nodes to be queried
     */
    getNodesEffectiveFaceColor(nodeIds: NodeId[]): Promise<Color[]>;
    /**
     * Gets the color set via [[setNodesLineColor]] on the lines of a list of leaf nodes.
     * If no color has been set for a particular node, `null` will appear at the corresponding
     * position in the returned array.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of the nodes to be queried
     */
    getNodesLineColor(nodeIds: NodeId[]): Promise<(Color | null)[]>;
    /**
     * Gets the color set on the lines of a list of leaf nodes. If no color has been set,
     * the color specified when the model was authored will be returned.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds IDs of the nodes to be queried
     */
    getNodesEffectiveLineColor(nodeIds: NodeId[]): Promise<Color[]>;
    /**
     * Gets a map associating NodeIds to colors that are set on those nodes.
     * Only NodeIds of nodes that have a color set will be included.
     * @param startNodeId The start node to walk when building the color map.
     * @param elementType Returned colors are of this element type.
     */
    getNodeColorMap(startNodeId: NodeId, elementType: ElementType): Promise<Map<NodeId, Color>>;
    /**
     * Gets the opacity set via [[setNodesOpacity]] on a list of leaf nodes.
     * If no value has been set for a particular node, `null` will appear at the corresponding
     * position in the returned array.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param leafNodes IDs of the nodes to be queried
     */
    getNodesOpacity(leafNodes: NodeId[]): Promise<(number | null)[]>;
    private _getNodesOpacity;
    /**
     * Gets the opacity set on a list of leaf nodes multiplied by the opacity
     * specified when the model was authored. If no opacity has been set,
     * the opacity specified when the model was authored will be returned directly.
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param leafNodes IDs of the nodes to be queried
     * @param elementType the type of element (faces, lines or points) to query
     */
    getNodesEffectiveOpacity(leafNodes: NodeId[], elementType: ElementType): Promise<number[]>;
    private _getNodeElementColor;
    private _getNodeEffectiveElementColor;
    /**
     * Gets the color set via [[setNodeFaceColor]] on a face element.
     * If no color has been set, `null` will be returned.
     * <br><br> See also: [[getNodeEffectiveFaceColor]]
     * @param partId the ID of the node containing the face
     * @param faceIndex the index of the face in the node
     */
    getNodeFaceColor(partId: PartId, faceIndex: number): Promise<Color | null>;
    /**
     * Gets the color set via [[setNodeFaceColor]] on a face element. If no color has been set,
     * the node's face color will be returned. If the node's face color has not been set,
     * the color specified when the model was authored will be returned.
     * @param partId the ID of the node containing the face
     * @param faceIndex the index of the face in the node
     * @param view the View to use when calculating view effects
     */
    getNodeEffectiveFaceColor(partId: PartId, faceIndex: number, view?: IView): Promise<Color | null>;
    /**
     * Gets the color set via [[setNodeLineColor]] on a line element.
     * If no color has been set, `null` will be returned.
     * @param partId the ID of the node containing the line
     * @param lineIndex the index of the line in the node
     */
    getNodeLineColor(partId: PartId, lineIndex: number): Promise<Color | null>;
    /**
     * Gets the color set via [[setNodeLineColor]] on a line element. If no color has been set,
     * the node's line color will be returned. If the node's line color has not been set,
     * the color specified when the model was authored will be returned.
     * @param partId the ID of the node containing the line
     * @param lineIndex the index of the line in the node
     * @param view the View to use when calculating view effects
     */
    getNodeEffectiveLineColor(partId: PartId, lineIndex: number, view?: IView): Promise<Color | null>;
    /**
     * Returns "Out Of Hierarchy" status for child node for the given Id.
     * @param nodeId Node id to get children of
     * @returns false if node is Out Of Hierarchy, true if it is
     */
    getOutOfHierarchy(nodeId: NodeId): boolean;
    /**
     * Returns the absolute root node of the assembly tree.
     * @returns Id for the model tree root node or null if the model structure is not loaded.
     */
    getAbsoluteRootNode(): NodeId;
    /**
     * Returns IDs for child nodes for the given Id.
     * @param nodeId Node id to get children of
     * @param includeOutOfHierarchy true to include Out Of Hierarchy node, false or null to exclude them
     * @returns ID for the children of this node, or null if the ID is invalid
     */
    getNodeChildren(nodeId: NodeId, includeOutOfHierarchy?: boolean): NodeId[];
    /**
     * Returns IDs of nodes who instance the same part as the supplied node.
     * This method should be called on nodes whose type is `PartInstance`.
     * @param nodeId ID of a `PartInstance` node.
     * @returns Array containing `PartInstance` node IDs. These nodes all instance the same part as the supplied node.  If this method is called on a node which is not of type `PartInstance` then `null` will be returned.
     */
    getNodesInstancingSamePart(nodeId: NodeId): Promise<NodeId[] | null>;
    /**
     * Returns the unit multiplier affecting the supplied node.
     * This number is a multiplier of millimeters (for example inches will be `25.4`).
     * The default value is `1.0`.
     * @returns The unit multiplier for the model (in mm)
     */
    getNodeUnitMultiplier(nodeId: NodeId): number;
    /**
     * Creates a CAD view. This method will trigger a "cadViewCreated" callback if the creation is successful.
     * @param nodeId Node id to attach the created view to
     * @param viewName Name of the view
     * @param camera Camera that will be set when the view gets activated
     * @param pmiIds (optional, if undefined or null no change applied to pmis) Node IDs of the PMI to show for the view others will be hidden
     * @param nodesToShow (optional, pass null or empty array if none to send) Node IDs of the elements to force visibility on
     * @param nodesToHide (optional, pass null or empty array if none to send) Node IDs of the elements to force visibility off
     * @param nodeIdsAndLocalTransforms (optional, pass null or empty array if none to send) array of node ID and matrix pair, defining specific local transform to apply
     * @param cuttingPlane (optional, pass null if none to send) Cutting plane to set when the view gets activated. Distance of the planes must be in the same unit as the model.
     * @param meshInstanceData (optional, pass null if none to send) object that specifies the data for the mesh instance of the rectangular frame (mostly found on capture views)
     * @returns id of the view, null is returned if the function fails
     */
    createCadView(nodeId: NodeId, viewName: string, camera: Camera, pmiIds?: PmiId[] | null, nodesToShow?: NodeId[] | null, nodesToHide?: NodeId[] | null, nodeIdsAndLocalTransforms?: [NodeId, Matrix][] | null, cuttingPlane?: Plane | null, meshInstanceData?: MeshInstanceData | null): CadViewId | null;
    /**
     * Gets CAD View information for this model.
     * @returns a map mapping associating CAD View ID to name
     */
    getCadViewMap(): Map<NodeId, string>;
    /**
     * Activates a CAD View
     * @param nodeId ID of the CAD View to activate.
     * @param duration camera transition time in milliseconds.
     * @param massageCamera If true, undesirable authored cameras may be modified into a camera with more reasonable values
     * @param view View to activate the CAD View in. Visibility will be applied to all views. Uses default view if not specified.
     * @returns None.
     */
    activateCadView(nodeId: NodeId, duration?: number, massageCamera?: boolean, view?: IView): Promise<void>;
    /**
     * Get PMI IDs for a CAD View
     * @param nodeId ID of the CAD View
     * @returns IDs of visible PMIs for the view
     */
    getCadViewPmis(nodeId: NodeId): PmiId[];
    /**
     * Gets whether or not cad configurations are enabled
     * @returns Boolean indicating whether or not cad configurations are enabled
     */
    cadConfigurationsEnabled(): Promise<boolean>;
    /**
     * Gets CAD configurations
     * @returns an object mapping CAD configuration ID to config name
     */
    getCadConfigurations(): IdStringMap;
    /**
     * Gets CAD default configuration
     * @returns ID of default CAD Configuration
     */
    getDefaultCadConfiguration(): NodeId | null;
    /**
     * Gets CAD default view
     * @returns ID of default CAD Configuration
     */
    getDefaultCadView(): NodeId | null;
    /**
     * Activate the default CAD view
     * @param duration Duration of the camera animation
     * @param massageCamera If true, undesirable authored cameras may be modified into a camera with more reasonable values
     * @param view View to set the CAD View in. Visibility will be applied to all views. Uses default view if not specified.
     * @returns None.
     */
    activateDefaultCadView(duration?: number, massageCamera?: boolean, view?: IView): Promise<void>;
    /**
     * Gets Active CAD configuration
     * @returns ID of activated CAD Configuration
     */
    getActiveCadConfiguration(): NodeId | null;
    /**
     * Get the configuration in which the view is defined
     * @returns ID of CAD Configuration of the view
     */
    getCadViewConfiguration(cadViewNodeId: NodeId): NodeId | null;
    /**
     * Activates a CAD configuration
     * @param nodeId ID of the CAD Configuration to activate
     * @param view View to set the CAD Configuration in. Visibility will be applied to all views. Uses default view if not specified.
     * @returns None.
     */
    activateCadConfiguration(nodeId: NodeId, view?: IView): Promise<void>;
    /**
     * Activates Default CAD configuration
     * @param fitNodes Fit view to visible nodes if possible (default true)
     * @param view View to set the CAD Configuration in. Visibility will be applied to all views. Uses default view if not specified.
     * @returns None.
     */
    activateDefaultCadConfiguration(fitNodes?: boolean, view?: IView): Promise<void>;
    /**
     * Returns point attributes for a node of the given node and point.
     * @param nodeId Node to retrieve point properties from
     * @param pointIndex Index of point for which to retrieve point attributes
     * @returns Promise for the requested point attributes. Properties returned will be null if none associated with the point.
     */
    getPointAttributes(nodeId: NodeId, pointIndex: number): Promise<SubentityAttributes | null>;
    /**
     * Returns edge count for a node of the given node.
     * @param nodeId Node to retrieve edge count from
     * @returns Promise providing the number of edges
     */
    getEdgeCount(nodeId: NodeId): Promise<number>;
    /**
     * Returns edge attributes for a node of the given node and edge.
     * @param nodeId Node to retrieve edge properties from
     * @param edgeIndex Index of edge for which to retrieve edge attributes
     * @returns Promise for the requested edge attributes. Properties returned will be null if none associated with the edge.
     */
    getEdgeAttributes(nodeId: NodeId, edgeIndex: number): Promise<SubentityAttributes | null>;
    /**
     * Returns edge properties for a node of the given node and edge.
     * @param nodeId Node to retrieve edge properties from
     * @param edgeId ID of edge for which to retrieve edge properties
     * @returns Promise for the requested edge properties. Properties returned will be null if none associated with the edge.
     */
    getEdgeProperty(nodeId: NodeId, edgeId: number): Promise<Edge | null>;
    /**
     * Returns face count for a node of the given node and face.
     * @param nodeId Node to retrieve face count from
     * @returns Promise providing the number of faces
     */
    getFaceCount(nodeId: NodeId): Promise<number>;
    /**
     * Returns face attributes for a node of the given node and face.
     * @param nodeId Node to retrieve edge properties from
     * @param faceIndex Index of face for which to retrieve face attributes
     * @returns Promise for the requested face attributes. Properties returned will be null if none associated with the edge.
     */
    getFaceAttributes(nodeId: NodeId, faceIndex: number): Promise<SubentityAttributes | null>;
    /**
     * Returns Face properties for a node of the given node and face.
     * @param nodeId Node to retrieve face properties from
     * @param faceId ID of face for which to retrieve face properties
     * @returns Promise for the requested face properties. Properties returned will be null if none associated with the face.
     */
    getFaceProperty(nodeId: NodeId, faceId: number): Promise<Face | null>;
    /**
     * Set edge property for a node of the given node and edge.
     * @param nodeId Node to set edge properties to
     * @param edgeId ID of edge
     * @param prop property (CircleElement, LineElement...)
     */
    setEdgeProperty(nodeId: NodeId, edgeId: number, prop: Base): void;
    /**
     * Set face property for a node of the given node and face.
     * @param nodeId Node to set edge properties to
     * @param faceId ID of face
     * @param prop property (CylinderElement, PlaneElement...)
     */
    setFaceProperty(nodeId: NodeId, faceId: number, prop: Base): void;
    /**
     * Fetch the mesh data for a particular node
     * @param nodeId the node's ID
     */
    getNodeMeshData(nodeId: NodeId): Promise<MeshDataCopy>;
    /**
     * Fetch the mesh data for any capping geometry on a particular node
     * @param nodeId the node IDs to get capping data from.
     */
    getNodeCappingMeshData(nodeId: NodeId): Promise<MeshDataCopy | null>;
    /**
     * Fetch the mesh data for any capping geometry on a list of nodes and their children
     * @param nodeIds the node IDs to get capping data from.
     */
    getNodesCappingMeshData(nodeIds: NodeId[]): Promise<MeshDataCopy[]>;
    /**
     * Returns a copy of the Matrix for a node of the given ID
     * @param nodeId Node to retrieve matrix from
     * @returns Copy of the Matrix of the node
     */
    getNodeMatrix(nodeId: NodeId): Matrix;
    /**
     * Sets Matrix for a node of the given ID
     * @param nodeId Node to set matrix on
     * @param matrix of the Node
     * @param setAsInitial tells if you want to change the node initial matrix or not
     */
    setNodeMatrix(nodeId: NodeId, matrix: Matrix, setAsInitial?: boolean): Promise<void>;
    /**
     * Used by Animation system to efficiently update the matrix of many nodes at once.
     * Currently not part of public API due to difference in signature with other bulk operations which use Map based parameter.
     * @hidden
     */
    _setNodesMatrices(nodeIds: NodeId[], matrices: Matrix[], setAsInitial?: boolean): Promise<void>;
    /**
     * Reset node matrix to the one set as the initial one
     * @param nodeId Node to set matrix on
     */
    resetNodeMatrixToInitial(nodeId: NodeId): Promise<void>;
    /**
     * Returns net matrix for a node of the given ID
     * @param nodeId Node to retrieve net matrix from
     * @returns Net Matrix of the Node
     */
    getNodeNetMatrix(nodeId: NodeId): Matrix;
    /**
     * Returns the parent Id for the given node id.
     * @param nodeId node id to get the parent of
     * @returns ID of the parent node for the supplied ID. If the ID is invalid or the root ID, null is returned.
     */
    getNodeParent(nodeId: NodeId): NodeId | null;
    /**
     * Returns the type of the node with the given ID.
     * @param nodeId The ID of the node to get the type for.
     * @returns The type of the node.
     */
    getNodeType(nodeId: NodeId): NodeType;
    /**
     * Returns the properties for the given node ID.
     * @param nodeId Node ID to get the parent of
     * @param computeFromChildren If true physical properties will be computed from child nodes.
     * @returns object properties for the supplied ID, or null if the ID was invalid
     */
    getNodeProperties(nodeId: NodeId, computeFromChildren?: boolean): Promise<StringStringMap | null>;
    /**
     * Purpose: Adds a property to the node
     * @param nodeId Node ID to set the property on
     * @param propertyName Name assigned to the node
     * @param propertyValue Value assigned to the node
     * @param propertyUnit Unit used to represent the node
     * @returns true if all went right, false otherwise
     */
    addPropertyToNode(nodeId: NodeId, propertyName: string, propertyValue: string, propertyUnit: UnitElement[]): boolean;
    /**
     * Purpose: Sets physical properties
     * @param nodeId node id to set the property on, the node id has to be a body node
     * @param gravityCenter gravity center in local coordinates
     * @param surfaceArea surface area, in squared current unit
     * @param volume volume, in cubed current unit
     * @returns true if all went right, false otherwise
     */
    setPhysicalProperties(nodeId: NodeId, gravityCenter: Point3, surfaceArea: number, volume: number): boolean;
    /**
     * Specifies nodes for the system to load. This method is useful when the viewer was created with the <code>streamOnDemand</code> option set to true.
     * @param nodeIds array of unique IDs for the system to load
     */
    requestNodes(nodeIds: NodeId[]): Promise<void>;
    /**
     * Returns the name for a node in the assembly tree.
     * @param nodeId The node ID to get the name of.
     * @returns The name of the node with the given nodeId or null if no name is found.
     */
    getNodeName(nodeId: NodeId): string | null;
    /**
     * Returns the Exchange ID of a node in the assembly tree.
     * @param nodeId The node ID to get the Exchange ID from.
     * @returns The Exchange ID of the node with the given nodeId or null if no Exchange ID is found.
     */
    getNodeExchangeId(nodeId: NodeId): ExchangeId | null;
    /**
     * Returns names and ids of all filters available in the scene
     * @returns a map associating Filter IDs to filter names
     */
    getFilters(): Map<FilterId, FilterName>;
    /**
     * @returns The name of a filter for the given filter ID index or null if filter was not found
     */
    getFilterName(filterId: FilterId): FilterName | null;
    /**
     * @param nodeIdSearched The ID of the node to query.
     * @returns Filters which retain or remove the given node.
     */
    getFiltersWithNode(nodeIdSearched: NodeId): FilterId[];
    /**
     * @param filtersId array of filters indexes to take in account
     * @returns nodesId of nodes retained by the given filter indices and the type of filter (inclusive or not). Returns null if no filter is found.
     */
    getNodesFromFiltersId(filtersId: FilterId[]): FilteredNodes | null;
    /**
     * Returns names and ids of all layers available in the scene
     * @returns a map associating Layer IDs to Layer names
     */
    getLayers(): Map<LayerId, LayerName>;
    /**
     * Return names of layers. Different layers can have the same name. Some layers can be unnamed.
     * @returns Names of layers
     */
    getUniqueLayerNames(): LayerName[];
    /**
     * @returns The name of a layer for the given filter ID or null if layer was not found
     */
    getLayerName(layerId: LayerId): LayerName | null;
    /**
     * @returns The authored layer ID for the given runtime layer ID, or null if not found
     */
    getLayerAuthoredId(layerId: LayerId): number | null;
    /**
     * @returns Id of layers for the given filter name or null if no layers are found
     */
    getLayerIdsFromName(name: LayerName): LayerId[] | null;
    /**
     * Returns the layer ID of a node in the assembly tree.
     * @param nodeId The node ID to get the Exchange ID from.
     * @returns The layer ID of the node with the given nodeId or null if no layer is found.
     */
    getNodeLayerId(nodeId: NodeId): LayerId | null;
    /**
     * Returns IDs of nodes in the given layer.
     * @param layerId The layer ID to get nodes from.
     * @param onlyTreeNodes if true return only nodes present in model Tree
     * @returns An array of nodes Id of nodes with the given layerId or null if no layers are found.
     */
    getNodesFromLayer(layerId: LayerId, onlyTreeNodes?: boolean): NodeId[] | null;
    /**
     * Returns IDs of nodes in given layers.
     * @param layersId Array of layers Id to get nodes from.
     * @param onlyTreeNodes if true return only nodes present in model Tree
     * @returns An array of nodes Id of nodes with one of the given layerId or null if no layers are found.
     */
    getNodesFromLayers(layersId: LayerId[], onlyTreeNodes?: boolean): NodeId[] | null;
    /**
     * Returns IDs of nodes in the given layer.
     * @param layerName name the name of layer to get nodes from.
     * @param onlyTreeNodes if true return only nodes present in model Tree
     * @returns An array of nodes Id of nodes with the given layerName or null if no layers are found.
     */
    getNodesFromLayerName(layerName: LayerName, onlyTreeNodes?: boolean): NodeId[] | null;
    /**
     * Returns the current visibility for a node.
     * @param nodeId ID of the node to get visibility for.
     * @returns true if the current node's visibility state is on or false if it is not.
     */
    getNodeVisibility(nodeId: NodeId): boolean;
    /**
     * Branch visibility indicates the visibility state for all of a node's children.
     * @param nodeId ID of the node at the root of the branch.
     * @param options Options for determining branch visibility. If not provided, the default is to consider all children
     * of the node except for CAD views.
     * @returns Shown/Hidden if all children have the same visibility state, Mixed otherwise.
     */
    getBranchVisibility(nodeId: NodeId, options?: BranchVisibilityOptions): BranchVisibility;
    /**
     * Returns a data object. During the authoring phase, a user can store general data within a model. (This is how
     * properties are stored, for example.) This function allows you to retrieve the data from the client application.
     *
     * @see {@link https://docs.techsoft3d.com/hoops/visualize-web/api_ref/data_import/libsc/classSC_1_1Store_1_1Model.html#_CPPv4N2SC5Store5Model6InsertE8uint32_tPK7uint8_t8uint32_t Model::Insert}
     *
     * @param ids Array of ModelKey-DataKey pairs ([ModelKey, DataKey, ModelKey, DataKey, ModelKey, DataKey...]
     * @returns promise that resolves when this operation has completed returning an array of 8bits int arrays for each ModelKey-DataKey pairs
     */
    getDataFromIds(ids: DataIds): Promise<Uint8Array[]>;
    /**
     * @param meshData [[MeshData]] object containing data to insert into the scene.
     * @returns Promise that resolves with a [[MeshId]] when the mesh has been created. The [[MeshId]] can be used to create instances of the mesh using [[createMeshInstance]].
     */
    createMesh(meshData: MeshData, config?: {
        /** If true, the mesh won't be deleted when the model is cleared or switched. */
        doNotDelete?: boolean;
    }): Promise<MeshId>;
    private static _flatArrayToPairArray;
    private static _pairArrayToFlatArray;
    /**
     * Retrieve the [[MeshId]] associated with the mesh data attached to the given nodes.
     */
    getMeshIds(nodeIds: NodeId[]): Promise<MeshId[]>;
    /**
     * Replace a mesh's data. This will affect all instances of that mesh.
     * @param id the [[MeshId]] identifying the mesh
     * @param data the new data
     */
    replaceMesh(id: MeshId, data: MeshData): Promise<void>;
    /**
     * Creates an instance of a mesh that has been created using [[createMesh]] or retrieved using [[getMeshIds]].
     * @param data object that specifies the data for this mesh instance
     * @param parentNodeId the ID of the desired parent node
     * @param preventFromResetting if set to true, then the visibility and positioning won't be reset when resetxxx() functions gets called.
     * @param isOutOfHierarchy True if the node created shouldn't appear in the model structure.
     * @returns Promise that resolves with a node ID that can be used to perform operations on this instance.
     */
    createMeshInstance(data: MeshInstanceData, parentNodeId?: NodeId | null, preventFromResetting?: boolean | null, isOutOfHierarchy?: boolean | null): Promise<NodeId>;
    private _createMeshInstance;
    /**
     * Creates a PMI Instance from a mesh that has been created using the createMesh method.
     * @param data object that specifies the data for the PMI graphic representation
     * @param pmiType see PmiType enum (Datum, Gdt, Dimension...)
     * @param pmiSubType see PmiSubType enum (DatumTarget, GdtFcf, DimensionDistance...)
     * @param refOnTopoItems see RefOnTopoItem. It defines the PMI links to a body element, like a face or an edge
     * @param parentNodeId the ID of the desired parent node
     * @returns Promise that resolves with a node ID that can be used to perform operations on this instance. You can use deleteMeshInstances() to delete the PMI
     */
    createPmiInstance(data: MeshInstanceData, pmiType: PmiType, pmiSubType: PmiSubType, refOnTopoItems: RefOnTopoItem[], parentNodeId?: NodeId | null): Promise<PmiId>;
    /**
     * Creates an image that can be applied as a texture via [[setNodesTexture]].
     * See [[deleteImages]].
     * @param primaryImage The image data and associated options
     * @param thumbnailImage If specified, an uncompressed image that will be used as a
     *                       placeholder for the primary image until it is fully loaded.
     *                       Only useful when `primaryImage` is a compressed image.
     */
    createImage(primaryImage: ImageOptions, thumbnailImage?: ImageOptions): Promise<ImageId>;
    /**
     * Deletes images created with [[createImage]].
     * @param imageIds The IDs of the images to be deleted
     */
    deleteImages(imageIds: ImageId[]): Promise<void>;
    /**
     * Apply an image to a node as a texture map. See [[createImage]] and [[unsetNodesTexture]].
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds The nodes on which to apply the texture
     * @param options Options specifying how the texture is applied
     */
    setNodesTexture(nodeIds: NodeId[], options: TextureOptions): Promise<void>;
    /**
     * Remove one or more textures applied via [[setNodesTexture]].
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @param nodeIds The nodes from which to remove the texture or textures
     */
    unsetNodesTexture(nodeIds: NodeId[]): void;
    /**
     * Deletes meshes that have been created at run time.
     *
     * In order for this method to succeed, all mesh instances created for the given IDs
     * must have also been destroyed with [[deleteMeshInstances]].
     *
     * @param ids The IDs of meshes that should be deleted
     * @returns Promise that resolves when this operation has completed.
     */
    deleteMeshes(ids: MeshId[]): Promise<void>;
    /**
     * Deletes mesh instances that have been created at run time
     * @param nodeIds array of IDs for mesh instances created at run time that should be destroyed
     * @returns Promise that resolves when this operation has completed.
     */
    deleteMeshInstances(nodeIds: NodeId[]): Promise<void>;
    private _obtainLoadSubtreeConfig;
    /**
     * Loads the tree stored in the XML and query loading of required meshes
     * @param nodeId ID of the node to link the sub tree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param xmlFilename URL of XML file to load.
     * @param massageModelName Optional callback to massage model names within the XML file. Return null to skip the model.
     * @param config Configuration to control load behavior.
     * @returns A `Promise` of the newly loaded model's root nodes IDs.
     */
    loadSubtreeFromXmlFile(nodeId: NodeId, xmlFilename: XmlFilename, massageModelName: MassageModelNameFunc | null, config: LoadSubtreeConfig): Promise<NodeId[]>;
    /**
     * Loads the tree stored in the XML and query loading of required meshes
     * @param nodeId ID of the node to link the sub tree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param xmlFilename URL of XML file to load.
     * @param massageModelName Optional callback to massage model names within the XML file. Return null to skip the model.
     * @param additionalMatrix Optional matrix to get multiplied into the net attachment matrix.
     * @param allowMissingExternalModels Optional boolean to control whether or not missing models in the XML file are ignored or cause an error.
     * @returns A `Promise` of the newly loaded model's root nodes IDs.
     */
    loadSubtreeFromXmlFile(nodeId: NodeId, xmlFilename: XmlFilename, massageModelName?: MassageModelNameFunc | null, additionalMatrix?: Matrix | null, allowMissingExternalModels?: boolean): Promise<NodeId[]>;
    /**
     * Loads the tree stored in the XML and query loading of required meshes
     * @param nodeId ID of the node to link the sub tree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param xmlData XML document or XML document string.
     * @param massageModelName Optional callback to massage model names within the XML file. Return null to skip the model.
     * @param config Configuration to control load behavior.
     * @returns A `Promise` of the newly loaded model's root nodes IDs.
     */
    loadSubtreeFromXmlBuffer(nodeId: NodeId, xmlData: string | Document, massageModelName: MassageModelNameFunc | null, config: LoadSubtreeConfig): Promise<NodeId[]>;
    /**
     * Loads the tree stored in the XML and query loading of required meshes
     * @param nodeId ID of the node to link the sub tree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param xmlData XML document or XML document string.
     * @param massageModelName Optional callback to massage model names within the XML file. Return null to skip the model.
     * @param additionalMatrix Optional matrix to get multiplied into the net attachment matrix.
     * @param allowMissingExternalModels Optional boolean to control whether or not missing models in the XML file are ignored or cause an error.
     * @returns A `Promise` of the newly loaded model's root nodes IDs.
     */
    loadSubtreeFromXmlBuffer(nodeId: NodeId, xmlData: string | Document, massageModelName?: MassageModelNameFunc | null, additionalMatrix?: Matrix | null, allowMissingExternalModels?: boolean): Promise<NodeId[]>;
    /**
     * Loads the tree stored in the XML and query loading of required meshes
     * Load order is determined by the projected size of bounding information present in the XML.
     * If streamCutoffScale is set to a non zero value, a file whose projected size is lower than the cutoff will not be streamed until its projected size reaches the cutoff.
     * @param nodeId ID of the node to link the sub tree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param xmlFilename URL of XML file to load.
     * @param modelNameToScs Optional callback to massage model names within the XML file to SCS file URLS or SCS file buffers. Return null to skip the model.
     * @param config Configuration to control load behavior.
     * @returns A `Promise` of the newly loaded model's root nodes IDs that will resolve when all files have been loaded.
     */
    loadSubtreeFromScsXmlFile(nodeId: NodeId, xmlFilename: XmlFilename, modelNameToScs: ModelNameToScsFileFunc | null, config: LoadSubtreeConfig): Promise<NodeId[]>;
    /**
     * Loads the tree stored in the XML and query loading of required meshes
     * Load order is determined by the projected size of bounding information present in the XML.
     * If streamCutoffScale is set to a non zero value, a file whose projected size is lower than the cutoff will not be streamed until its projected size reaches the cutoff.
     * @param nodeId ID of the node to link the sub tree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param xmlFilename URL of XML file to load.
     * @param modelNameToScs Optional callback to massage model names within the XML file to SCS file URLS or SCS file buffers. Return null to skip the model.
     * @param additionalMatrix Optional matrix to get multiplied into the net attachment matrix.
     * @param allowMissingExternalModels Optional boolean to control whether or not missing models in the XML file are ignored or cause an error.
     * @returns A `Promise` of the newly loaded model's root nodes IDs that will resolve when all files have been loaded.
     */
    loadSubtreeFromScsXmlFile(nodeId: NodeId, xmlFilename: XmlFilename, modelNameToScs?: ModelNameToScsFileFunc | null, additionalMatrix?: Matrix | null, allowMissingExternalModels?: boolean): Promise<NodeId[]>;
    /**
     * Loads the tree stored in the XML and query loading of required meshes
     * Load order is determined by the projected size of bounding information present in the XML.
     * If streamCutoffScale is set to a non zero value, a file whose projected size is lower than the cutoff will not be streamed until its projected size reaches the cutoff.
     * @param nodeId ID of the node to link the sub tree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param xmlData XML document or XML document string.
     * @param modelNameToScs Optional callback to massage model names within the XML file to SCS file URLS or SCS file buffers. Return null to skip the model.
     * @param config Configuration to control load behavior.
     * @returns A `Promise` of the newly loaded model's root nodes IDs that will resolve when all files have been loaded.
     */
    loadSubtreeFromScsXmlBuffer(nodeId: NodeId, xmlData: string | Document, modelNameToScs: ModelNameToScsFileFunc | null, config: LoadSubtreeConfig): Promise<NodeId[]>;
    /**
     * Loads the tree stored in the XML and query loading of required meshes.
     * Load order is determined by the projected size of bounding information present in the XML.
     * If streamCutoffScale is set to a non zero value, a file whose projected size is lower than the cutoff will not be streamed until its projected size reaches the cutoff.
     * @param nodeId ID of the node to link the sub tree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param xmlData XML document or XML document string.
     * @param modelNameToScs Optional callback to massage model names within the XML file to SCS file URLS or SCS file buffers. Return null to skip the model.
     * @param additionalMatrix Optional matrix to get multiplied into the net attachment matrix.
     * @param allowMissingExternalModels Optional boolean to control whether or not missing models in the XML file are ignored or cause an error.
     * @returns A `Promise` of the newly loaded model's root nodes IDs that will resolve when all files have been loaded.
     */
    loadSubtreeFromScsXmlBuffer(nodeId: NodeId, xmlData: string | Document, modelNameToScs?: ModelNameToScsFileFunc | null, additionalMatrix?: Matrix | null, allowMissingExternalModels?: boolean): Promise<NodeId[]>;
    /**
     * Loads the tree stored in a model file and query loading of required meshes
     * @param nodeId ID of the node to link the subtree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param modelName The name of the model to load.
     * @param config Configuration to control load behavior.
     * @returns A `Promise` of the newly loaded model's root nodes IDs.
     */
    loadSubtreeFromModel(nodeId: NodeId, modelName: ScModelName, config: LoadSubtreeConfig): Promise<NodeId[]>;
    /**
     * Loads the tree stored in a model file and query loading of required meshes
     * @param nodeId ID of the node to link the subtree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param modelName The name of the model to load.
     * @param additionalMatrix Optional matrix to get multiplied into the net attachment matrix.
     * @returns A `Promise` of the newly loaded model's root nodes IDs.
     */
    loadSubtreeFromModel(nodeId: NodeId, modelName: ScModelName, additionalMatrix?: Matrix | null): Promise<NodeId[]>;
    /**
     * Loads the tree stored in a model file and query loading of required meshes
     * @param nodeId ID of the node to link the subtree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param scsFilename The name of the SCS file to load.
     * @param config Configuration to control load behavior.
     * @returns A `Promise` of the newly loaded model's root nodes IDs.
     */
    loadSubtreeFromScsFile(nodeId: NodeId, scsFilename: ScsUri, config: LoadSubtreeConfig): Promise<NodeId[]>;
    /**
     * Loads the tree stored in a model file and query loading of required meshes
     * @param nodeId ID of the node to link the subtree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param scsFilename The name of the SCS file to load.
     * @param additionalMatrix Optional matrix to get multiplied into the net attachment matrix.
     * @returns A `Promise` of the newly loaded model's root nodes IDs.
     */
    loadSubtreeFromScsFile(nodeId: NodeId, scsFilename: ScsUri, additionalMatrix?: Matrix | null): Promise<NodeId[]>;
    /**
     * Loads the tree stored in a model file and query loading of required meshes
     * @param nodeId ID of the node to link the subtree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param buffer The SCS buffer to load.
     * @param config Configuration to control load behavior.
     * @returns A `Promise` of the newly loaded model's root nodes IDs.
     */
    loadSubtreeFromScsBuffer(nodeId: NodeId, buffer: ScsBuffer, config: LoadSubtreeConfig): Promise<NodeId[]>;
    /**
     * Loads the tree stored in a model file and query loading of required meshes
     * @param nodeId ID of the node to link the subtree with. This ID should not have a type of Body or BodyInstance. If this parameter is null, the sub tree will be linked to the root. This method will trigger a subtreeLoaded event.
     * @param buffer The SCS buffer to load.
     * @param additionalMatrix Optional matrix to get multiplied into the net attachment matrix.
     * @returns A `Promise` of the newly loaded model's root nodes IDs.
     */
    loadSubtreeFromScsBuffer(nodeId: NodeId, buffer: ScsBuffer, additionalMatrix?: Matrix | null): Promise<NodeId[]>;
    /**
     * Loads measurement data from a JSON object
     * @param json JSON object containing measurement data
     */
    loadMeasurementFromJson(json: any): Promise<void>;
    /**
     * Loads measurement data from a JSON string
     * @param str JSON string containing measurement data
     */
    loadMeasurementFromString(str: string): Promise<void>;
    /**
     * Loads measurement data from a ZIP file
     * @param filename Name of a file containing ZIP measurement data
     */
    loadMeasurementFromFile(filename: string): Promise<void>;
    /**
     * Delete all the current scene and load the specified model instead. Also triggers a "modelSwitched" when finished.
     * @param newModelFilename Name of the model file to load after the existing scene gets deleted
     * @returns A `Promise` of the newly loaded model's root nodes IDs.
     */
    switchToModel(newModelFilename: ScModelName): Promise<NodeId[]>;
    /**
     * Creates a node
     * @param parentNodeId ID of the node to link the child node to. This ID should not have a type of Body or BodyInstance. If this parameter is `undefined`, the child node will be linked to the root.
     * @param nodeName of the node to create
     * @param nodeId (optional) ID you want the node to have, if not specified the nodeID will be set automatically. Be aware that if the specified node ID is already used by another node, then it will be ignored a new one will be set automatically.
     * @param localMatrix (optional) Initial local matrix of the node (identity if none set)
     * @param visibility (optional) Initial visibility of the node (visible if nothing set)
     * @param measurementUnit (optional) Specifies optional measurement units for this node. When set to null (the default), the node will inheret the unit setting of the parent node. If set, a scaling matrix will be computed
     *    that scales appropriately based on the unit scaling and applied to the newly created node. If a non-null localMatrix has been specified, that matrix will be combined with the computed scaling matrix.
     * @returns child node ID
     */
    createNode(parentNodeId: NodeId | undefined | null, nodeName: string, nodeId?: NodeId | null, localMatrix?: Matrix | null, visibility?: boolean | null, measurementUnit?: number | null): NodeId;
    /**
     * Delete a node and all its children
     * @param nodeId of the node
     */
    deleteNode(nodeId: NodeId): Promise<void>;
    /**
     * Creates an part node
     * @param nodeId (optional) ID you want the node to have, if not specified the nodeID will be set automatically. Be aware that if the specified node ID is already used by another node, then it will be ignored and new one will be set automatically.
     * @returns a node ID to access the created part node
     */
    createPart(nodeId?: NodeId | null): PartId;
    /**
     * Set a part on an assembly node
     * @param assemblyNodeId ID of the assembly node
     * @param partNodeId ID of the part node
     * @returns true if all went right, false otherwise
     */
    setPart(assemblyNodeId: NodeId | undefined | null, partNodeId: PartId | undefined | null): boolean;
    /**
     * Creates a representation item on a part
     * @param partNodeId ID of the part node
     * @param repItemId (optional) Id you want the node to have, if not specified the nodeId will be set automatically. Be aware that if the specified node Id is already used by another node, then it will be ignored and a new one will be set automatically.
     * @returns node ID to access the created representation item, null is returned if something went wrong
     */
    createAndAddRepresentationItem(partNodeId: PartId | undefined | null, repItemId?: NodeId | null): NodeId | null;
    /**
     * Returns the lowest available node ID
     */
    getLowestAvailableNodeId(): NodeId;
    /**
     * Allows changing the behavior in the viewer
     * @param instanceModifier InstanceModifier
     * @param nodeIds Array of node ids
     * @param value boolean
     */
    setInstanceModifier(instanceModifier: InstanceModifier, nodeIds: NodeId[], value: boolean): Promise<void>;
    /** @hidden */
    _setInstanceModifier(instanceModifier: InstanceModifier, nodeIds: NodeId[], value: boolean, allowedTypes: BodyTypeBits): void;
    /**
     * Returns the SC ID of a body instance
     * @param nodeId node instance ID. This must be a body node
     * @returns SC instance ID, a pair of numbers consisting of the inclusion ID and the instance ID. null is returned if the function fails.
     */
    getScInstanceKey(nodeId: NodeId): InstanceInc | null;
    /**
     * Returns the body node instance ID for the given SC instance ID
     * @returns body node instance ID
     */
    getNodeIdFromScInstanceKey(inclusionKey: InclusionKey, instanceKey: InstanceKey): NodeId | null;
    getAssociatedModelKey(nodeId: NodeId): Promise<ModelKey | null>;
    hasDepthRange(nodeIds: NodeId[]): Promise<boolean[]>;
    /**
     * Remaps the depth values used for z-ordering of pixels to the given
     * range, which must be a subset of `[0,1]`. The depth value at the
     * near plane (normally `0`) is mapped to `min` and the value at
     * the far plane (normally `1`) is mapped to `max`.
     *
     * The smaller the range, the more z-fighting you will see among
     * objects set to that range.
     *
     * @param nodeIds the node IDs to operate on
     * @param min the depth value at the near plane
     * @param max the depth value at the far plane
     */
    setDepthRange(nodeIds: NodeId[], min: number, max: number): Promise<void>;
    private _setDepthRange;
    /**
     * Unsets the depth range set by [[setDepthRange]].
     * @param nodeIds the node IDs to operate on
     */
    unsetDepthRange(nodeIds: NodeId[]): void;
    /** @hidden */
    _gatherInstanceIncsFromNodeIds(nodeIds: NodeId[], allowedTypes?: BodyTypeBits): InstanceIncs;
    private _getInstanceIncsFromLeafNodes;
    private _getInstanceIncFromSingleLeafNode;
    /**
     * Sets the desired mesh level
     * @param nodeIds IDs of nodes in the assembly on which mesh level will be set
     * @param meshLevel 0 standard, 1 low, 2 extra low
     * @returns Promise that resolves when the operation has completed.
     */
    setMeshLevel(nodeIds: NodeId[], meshLevel: number): Promise<void>;
    /**
     * Sets the metallic and roughness factors for the supplied nodes materials.
     * Materials that are not currently set to use the Metallic Roughness shading model will be upgraded to use this mode.
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds List of nodes to set material properties for
     * @param metallicFactor The metalness of the material
     * @param roughnessFactor The roughness of the material
     */
    setMetallicRoughness(nodeIds: NodeId[], metallicFactor: number, roughnessFactor: number): void;
    /**
     * Gets the metallic and roughness factors for the supplied nodes materials.
     * Materials that are not currently set to use the Metallic Roughness shading model will have a null entry
     * @deprecated Use [[getNodesMaterial]] instead.
     * @param nodeIds List of nodes to get material properties for
     */
    getMetallicRoughness(nodeIds: NodeId[]): Promise<(MetallicRoughnessValue | null)[]>;
    /**
     * Unsets the metallic and roughness values set with [[setMetallicRoughness]]
     * These materials will no longer use the Metallic Roughness shading model.
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @param nodeIds List of nodes to unset material properties for
     */
    unsetMetallicRoughness(nodeIds: NodeId[]): void;
    /**
     * If enabled then models loaded into an existing scene with a different unit value will be scaled to the unit value of the current scene.
     * @param enabled value indicating if automatic unit scaling will be active
     */
    setEnableAutomaticUnitScaling(enabled: boolean): void;
    /**
     * By default, objects that are initially hidden stays hidden unless specifically set to be shown. This function allows this behavior to be disabled.
     * @param enabled value indicating if initially hidden objects stay hidden
     */
    setBehaviorInitiallyHidden(enabled: boolean): void;
    /**
     * Tells if the model is a CAD drawing or not
     * @returns true if the model is a CAD drawing
     */
    isDrawing(): boolean;
    /**
     * @returns true if the model contains measurement data.
     */
    isMeasurable(): boolean;
    /**
     * @param bodyId ID of the body node containing the line
     * @param lineIndex Index of the line ot be checked
     * @returns true if the line has associated measurement data
     */
    isLineMeasurable(bodyId: NodeId, lineIndex: number): Promise<boolean>;
    isFaceMeasurable(bodyId: NodeId, faceIndex: number): Promise<boolean>;
    /**
     * @returns the original file name of the model which contain the given node or null if the node is not found.
     */
    getModelFileNameFromNode(nodeId: NodeId): string | null;
    /**
     * @returns the original file type of the model which contain the given node or null if the node is not found.
     */
    getModelFileTypeFromNode(nodeId: NodeId): FileType | null;
    /**
     * @returns the generic type of the given node or null if the node is not found.
     */
    getNodeGenericType(nodeId: NodeId): GenericType | null;
    /**
     * @returns the generic id of the given node or null if the node is not found.
     */
    getNodeGenericId(nodeId: NodeId): GenericId | null;
    /**
     * This function recursively discovers BIM nodes in the supplied subtree and registers them.
     * @param startNodeId The root of the subtree to walk for registration.
     * @param attributeToMask The callback used to obtain a node's [[BimMask]] from its attributes.
     * @returns Promise that resolves when the operation has completed.
     */
    registerBimNodes(startNodeId: NodeId, attributeToMask: (value: string) => BimMask, legacy_useAttributeTitle?: string | boolean | null): Promise<void>;
    /**
     * Gets all generic types and NodeIds with that type.
     * @returns Map containing generic types and NodeIds
     */
    getGenericTypeIdMap(): Map<GenericType, Set<NodeId>>;
    /**
     * This function returns all NodeIds with an IFC type.
     * @param genericType
     * @returns All NodeIds with an IFC type
     */
    getNodesByGenericType(genericType: GenericType): Set<NodeId> | null;
    /**
     * This function gets all generic types contained in the model.
     * @returns All generic types.
     */
    getGenericTypes(): GenericType[];
    /**
     * Checks if a [[NodeId]] is a generic type.
     * @param nodeId
     * @param genericType
     */
    hasEffectiveGenericType(nodeId: NodeId, genericType: GenericType): boolean;
    /**
     * This function recursively discovers IFC nodes in the supplied subtree and registers them.
     * @param startNodeId The root of the subtree to walk for registration.
     * @returns Promise that resolves when the operation has completed.
     */
    registerIfcNodes(startNodeId: NodeId, legacy_useAttributeTitle?: string | boolean | null): Promise<void>;
    /**
     * Tells if the view is an annotation view or not
     * @param cadViewNodeId Node ID of the CAD view
     * @returns true if the view is an annotation view
     */
    isAnnotationView(cadViewNodeId: CadViewId): boolean;
    /**
     * Tells if the view is a combine state view or not
     * @param cadViewNodeId Node ID of the CAD view
     * @returns true if the view is a combine state view
     */
    isCombineStateView(cadViewNodeId: CadViewId): boolean;
    /**
     * Sets a vector and angle used to determine an object's visibility based on camera orientation.
     * @param space The space in which the culling vector is defined.
     * @param vector A vector that will be compared with the view vector.
     * @param toleranceDegrees The maximum angle between the culling vector and the view vector within which the object will be visible.
     */
    setNodesCullingVector(nodeIds: NodeId[], space: CullingVectorSpace, vector: Point3, toleranceDegrees: Degrees): Promise<void>;
    private _setNodesCullingVector;
    /**
     * Unsets the vector and angle used to determine an object's visibility based on camera orientation.
     * @param nodeIds The nodes to unset culling vectors on.
     */
    unsetNodesCullingVectors(nodeIds: NodeId[]): Promise<void>;
    private _unsetNodesCullingVectors;
    /**
     * Retrieves the vector and angle used to determine an object's visibility based on camera orientation.
     * If unset, `null` will appear at the corresponding array index.
     * @param nodeIds The nodes to query culling vectors from.
     * @returns A promise of culling vectors.
     */
    getNodesCullingVectors(nodeIds: NodeId[]): Promise<(CullingVector | null)[]>;
    /**
     * Retrieves the node ID offset for a given node.
     * @param nodeId The node to obtain the node ID offset from.
     * @returns The node ID offset for the supplied node.
     */
    getNodeIdOffset(nodeId: NodeId): NodeIdOffset;
    /**
     * Queries if a node is fully loaded or not.
     * @param nodeId The node to query.
     * @returns True if the node is fully loaded; false otherwise.
     */
    isNodeLoaded(nodeId: NodeId): boolean;
    /**
     * Triangulates the supplied polygon.
     * @param polygonPoints An array of point data for the polygon. Points are stored [XYZXYZXYZ...] format.
     * @param normal The normal of the polygon to triangulate.
     * @returns An array containing the point data for the generated triangles. Points are stored [XYZXYZXYZ...] format.
     *          This returned list is always divisible by 9 (3 points per triangle; 3 floats per point).
     */
    triangulatePolygon(polygonPoints: Float32Array | number[], normal: Point3): Float32Array;
    /**
     * Applies the given line pattern to the specified nodes. See also [[unsetNodesLinePattern]].
     * @deprecated Use [[setNodesMaterial]] instead.
     * @param nodeIds The IDs of the nodes.
     * @param pattern The line pattern. See [[LinePattern]] for details.
     * @param patternLength The length of a single repetition of the line pattern.
     * @param patternLengthUnit The unit in which the length of the pattern is measured. See [[LinePatternLengthUnit]] for details.
     */
    setNodesLinePattern(nodeIds: NodeId[], pattern: LinePattern, patternLength: number, patternLengthUnit: LinePatternLengthUnit): void;
    /**
     * Removes the line pattern applied by [[setNodesLinePattern]].
     * @deprecated Use [[resetNodesMaterial]] instead.
     * @param nodeIds The IDs of the nodes.
     */
    unsetNodesLinePattern(nodeIds: NodeId[]): void;
    /** @hidden */
    _hwfAwaitAssemblyTreeReady(): Promise<void>;
    /**
     * Returns all the `UserDataIndex` items associated with the input node.
     * @param nodeId The ID of the node to query.
     * @returns A list of `UserDataIndex`, possibly empty.
     * @throws `InvalidNodeIdError`
     */
    getNodeUserDataIndices(nodeId: NodeId): UserDataIndex[];
    /**
     * Returns the user data for a given node and index.
     * @param nodeId The ID of the node to query.
     * @param index The index of the data.
     * @returns The user data.
     * @throws `InvalidNodeIdError` `InvalidIndexError`
     */
    getNodeUserData(nodeId: NodeId, index: UserDataIndex): Uint8Array;
    /**
     * Returns a list of node IDs given a list of generic IDs. Note that the
     * returned list of node IDs may be longer than the provided list of generic
     * IDs since one ID can be used by more than one node.
     * @param genericIds Array of generic IDs to find nodes fore
     * @returns Array of node ids corresponding to the provided generic IDs
     */
    getNodeIdsByGenericIds(genericIds: GenericId[]): NodeId[];
    /** @hidden */
    _getModelStructure(): IModelStructure;
    /**
     * Returns true if the node is within an external model.
     * @param nodeId
     */
    isWithinExternalModel(nodeId: NodeId): boolean;
    /** @hidden */
    _firstAssemblyDataHeader(): AssemblyDataHeader | null;
    /**
     * Retrieves the bim id of the corresponding node id.
     * @param node the id of the node for which you want its bim id.
     * @returns the bim id corresponding to the node or null if none.
     */
    getBimIdFromNode(node: NodeId): BimId | null;
    /**
     * Retrieves the bim ids of the corresponding generic id.
     * @param ifcGuid the generic id for which you want its bim id.
     * @returns the bim id corresponding to the ifcGuid or null if none.
     */
    getBimIdsFromGenericId(ifcGuid: GenericId): BimId[];
    /**
     * Retrieves the node id of the corresponding bim id.
     * @param node any known node id of the working model.
     * @param bimID bim id for which you want its node id.
     * @returns the node id corresponding to the BimId or null if none.
     */
    getNodeIdFromBimId(node: NodeId, bimID: BimId): NodeId | null;
    /**
     * Retrieves the generic id of the corresponding bim id.
     * @param node any known node id of the working model.
     * @param bimId bim id for which you want its generic id.
     * @returns the generic id corresponding to the BimId or null if none.
     */
    getGenericIdFromBimId(node: NodeId, bimId: BimId): GenericId | null;
    /**
     * Retrieves all type of relationships that a bim id has.
     * @param node any known node id of the working model.
     * @param bimId bim id for which you want its types of relationships.
     * @returns array of type of relationship corresponding to the BimId.
     */
    getRelationshipTypesFromBimId(node: NodeId, bimId: BimId): RelationshipType[];
    /**
     * Retrieve all related relationships that a bim id have.
     * @param node any known node id of the working model.
     * @param bimId bim id for which you want its related relationships.
     * @returns array of bim id which are the related relationship of the BimId.
     */
    getBimIdRelatedElements(node: NodeId, bimId: BimId, type: RelationshipType): BimId[];
    /**
     * Retrieve all relating relationships that a bim id have.
     * @param node any known node id of the working model.
     * @param bimId bim id for which you want its relating relationships.
     * @returns array of bim id which are the relating relationship of the BimId.
     */
    getBimIdRelatingElements(node: NodeId, bimId: BimId, type: RelationshipType): BimId[];
    /**
     * Retrieve all relationships that a bim id have, sorted in 2 arrays (relateds and relatings)
     * @param node any known node id of the working model.
     * @param bimId bim id for which you want its relationships.
     * @returns double array of bim id of relationship of the BimId sorted by its relateds and its relatings.
     */
    getBimIdConnectedElements(node: NodeId, bimId: BimId, type: RelationshipType): {
        relateds: BimId[];
        relatings: BimId[];
    };
    /**
     * Retrieve the name of the bim element
     * @param bimId bim id for which you want the bim element name.
     * @param node any known node id of the working model.
     * @returns the name and the info regarding the connection to a node of the bim element.
     */
    getBimInfoFromBimId(node: NodeId, bimId: BimId): {
        name: string;
        connected: boolean;
    };
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
     * @param viewIds Array of view IDs to apply override to. Pass empty array or omit to apply to all views.
     */
    setNodesDrawModes(nodesDrawModes: Record<NodeId, NodeDrawModeName>, viewIds?: number[]): void;
}
