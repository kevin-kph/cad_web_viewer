import { Plane, Matrix16 } from '@ts3d-hoops/common';
import { DataKey, InstanceKey } from '@ts3d-hoops/streamcache';
import { Camera } from '../../../Camera';
import { FilterId, UserDataIndex, ExchangeId, GenericId } from '../../../types';
import { AssemblyDataHeader } from '../AssemblyData';
import { AuthoredNodeId, DynamicNodeId } from '../NodeId';
import { AttachContext, GenericTypeId } from '../context/AttachContext';
import { InclusionContext } from '../context/InclusionContext';
import { LoadContext } from '../context/LoadContext';
import { PrototypeContext } from '../context/PrototypeContext';
import { Attribute } from '../node-data/Attribute';
import { AuthoredLayerId } from '../node-data/types';
import { ViewFrameInfo } from '../types';
import { BodyInstance } from './BodyInstance';
import { CadView } from './CadView';
import { PartDefinition } from './PartDefinition';
import { Pmi } from './Pmi';
import { PmiBody } from './PmiBody';
import { ProductOccurrence } from './ProductOccurrence';
import { RepresentationItem, RepresentationItemInfo } from './RepresentationItem';
import { ViewFrame } from './ViewFrame';
export declare enum TreeNodeType {
    ProductOccurrence = 0,
    AnyBody = 1,
    BodyInstance = 2,
    CadView = 3
}
export declare enum NodeBits {
    InitiallyShown = 1073741824,
    InitiallyRemoved = 536870912,
    IsShownSpecified = 524288,
    IsShown = 262144,
    IsLoaded = -2147483648
}
/**
 * All the information needed to describe a generic node to be added into an assembly tree.
 */
export interface NodeInfo {
    readonly nodeId: AuthoredNodeId | DynamicNodeId;
    readonly bits: NodeBits;
    readonly name: string | null;
    readonly localTransform: Matrix16 | null;
    readonly attributes: DataKey | Attribute[];
    readonly header: AssemblyDataHeader | null;
    readonly exchangeId: ExchangeId | null;
    readonly layerId: AuthoredLayerId | null;
    readonly genericTypeId: GenericTypeId | null;
    readonly genericId: GenericId | null;
    readonly userDatas: Map<UserDataIndex, Uint8Array> | null;
}
/**
 * A context is much like a node in that both live in the assembly tree.
 *
 * The difference is that (non-context) nodes are publicly known from a consumer API standpoint.
 *
 * Contexts on the other hand, are internal to the tree's implementation. They exist to inject data into
 * the tree, where nodes can be walked up to the nearest context (by type) to retrieve essential data tied
 * to that node.
 *
 * Since contexts are not publicly known, they are transparently walked through when encountered.
 *
 * For example, when retrieving the children of node N1 below, we get both N2 and N4 as a result instead of only N2.
 * (N1, N2, N3, N4 are nodes, and C1 is a context.)
 *
 * ```
 *      N1
 *     /  \
 *    N2  C1
 *   /      \
 *  N3      N4
 * ```
 *
 */
export type AnyTreeContext = LoadContext | AttachContext | InclusionContext | PrototypeContext;
/**
 * This type denotes any assembly tree node that contains mesh instances.
 */
export type AnyBody = BodyInstance | PmiBody | ViewFrame;
/**
 * This type denotes any assembly tree node that can contain other nodes.
 */
export type AnyContainerNode = ProductOccurrence | Pmi | CadView;
/**
 * This type denotes any assembly tree node that lives in the *tree structure* of the assembly tree.
 */
export type AnyTreeNode = AnyContainerNode | AnyBody;
/**
 * This type denotes any node that does not live in the *tree structure* of the assembly tree.
 * Note that these nodes are still stored in `AssemblyTree`.
 *
 * (Perhaps this type should be renamed to something else such as "AnyReferenceNode".)
 */
export type AnyNonTreeNode = PartDefinition | RepresentationItem;
/**
 * This type denotes any assembly tree node regardless of where it lives in the assembly tree.
 */
export type AnyNode = AnyTreeNode | AnyNonTreeNode;
export interface PartDefinitionInfo {
    readonly nodeInfo: NodeInfo;
    readonly repItemInfos: RepresentationItemInfo[];
}
export declare enum PartDefinitionBits {
    IsMissing = 4096
}
export declare enum PmiType {
    Unknown = 0,
    Text = 1,
    Dimension = 2,
    Arrow = 3,
    Balloon = 4,
    CircleCenter = 5,
    Coordinate = 6,
    Datum = 7,
    Fastener = 8,
    Gdt = 9,
    Locator = 10,
    MeasurementPoint = 11,
    Roughness = 12,
    Welding = 13,
    Table = 14,
    Other = 15,
    GeometricalTolerance = 16
}
export declare enum PmiSubTypeDatum {
    Ident = 1,
    Target = 2
}
export declare enum PmiSubTypeDimension {
    Distance = 1,
    DistanceOffset = 2,
    DistanceCumulate = 3,
    Chamfer = 4,
    Slope = 5,
    Ordinate = 6,
    Radius = 7,
    RadiusTangent = 8,
    RadiusCylinder = 9,
    RadiusEdge = 10,
    Diameter = 11,
    DiameterTangent = 12,
    DiameterCylinder = 13,
    DiameterEdge = 14,
    DiameterCone = 15,
    Length = 16,
    LengthCurvilinear = 17,
    LengthCircular = 18,
    Angle = 19
}
export declare enum PmiSubTypeGdt {
    Fcf = 1
}
export declare enum PmiSubTypeWelding {
    Line = 1,
    Spot = 2
}
export declare enum PmiSubTypeOther {
    SymbolUser = 1,
    SymbolUtility = 2,
    SymbolCustom = 3,
    GeometricReference = 4,
    Region = 5
}
export declare enum CadViewBits {
    IsAnnotationView = 134217728,
    IsCameraSet = 67108864,
    IsPmiFilteringSet = 33554432,
    IsGeomFilteringSet = 16777216,
    IsCrossSectionSet = 8388608,
    IsExplosionSet = 4194304,
    IsCombineState = 2097152,
    IsPerspective = 1048576,
    HasDynamicFrame = 8192,
    IsDefaultView = 256
}
export interface CadViewInfo<Id> {
    readonly nodeId: AuthoredNodeId | DynamicNodeId;
    readonly name: string | null;
    readonly camera: Camera | null;
    readonly instanceMarkupKeysToShow: InstanceKey[];
    readonly viewFrameInfo: ViewFrameInfo | null;
    readonly nodesToShow: Id[];
    readonly nodesToHide: Id[];
    readonly filters: FilterId[];
    readonly transformMap: Map<Id, Matrix16>;
    readonly cuttingPlanes: Plane[];
    readonly bits: CadViewBits;
}
export interface CadViewCamera {
    readonly initial: Camera;
    derived: Camera;
}
export type DeletableNode = ProductOccurrence | BodyInstance | InclusionContext | AttachContext | LoadContext | Pmi;
export type LoadId = number;
