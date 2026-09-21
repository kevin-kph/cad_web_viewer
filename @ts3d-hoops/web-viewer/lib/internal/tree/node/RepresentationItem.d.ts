import { LoadSubtreeConfig } from '../../../types';
import { PhysicalProperties } from '../node-data/PhysicalProperties';
import { NodeMixin } from './NodeMixin';
import { PartDefinition } from './PartDefinition';
import { NodeInfo } from './types';
import { AuthoredNodeId, RuntimeNodeId } from '../NodeId';
import { MasterModelKey, MeshKey } from '@ts3d-hoops/streamcache';
import { AssemblyDataParser } from '../load/AssemblyDataParser';
import { Edge, Face } from '../../SubentityProperties';
import { PhantomMember } from '../../types';
import { SubentityAttributes } from '../../../SubentityAttributes';
import { IAssemblyTree } from '../../../core';
export declare enum BodyType {
    Unknown = 0,
    BRep = 1,
    Tessellation = 2,
    Wireframe = 3,
    PointCloud = 4
}
export interface RepresentationItemInfo {
    readonly nodeInfo: NodeInfo;
    readonly meshKey: MeshKey | null;
    readonly bodyType: BodyType;
    readonly faceMeasurementProps: Face[];
    readonly edgeMeasurementProps: Edge[];
    readonly physicalProps: PhysicalProperties | null;
    readonly faceAttributes: (SubentityAttributes | null)[];
    readonly edgeAttributes: (SubentityAttributes | null)[];
    readonly pointAttributes: (SubentityAttributes | null)[];
}
export type RepresentationItemParent = PartDefinition;
export declare class RepresentationItem extends NodeMixin<0> {
    static parseXml(assemblyTree: IAssemblyTree, elem: Element, config: LoadSubtreeConfig): RepresentationItemInfo;
    static parseBinary(assemblyTree: IAssemblyTree, parser: AssemblyDataParser, config: LoadSubtreeConfig): RepresentationItemInfo;
    static reify(assemblyTree: IAssemblyTree, masterModelKey: MasterModelKey, info: RepresentationItemInfo, parent: RepresentationItemParent): RepresentationItem;
    static createDynamic(assemblyTree: IAssemblyTree, authoredId: AuthoredNodeId | null, name: string | null, masterModelKey: MasterModelKey, parent: RepresentationItemParent): RepresentationItem;
    private constructor();
    setPhysicalProperties(props: PhysicalProperties): void;
    getPhysicalProperties(): PhysicalProperties | null;
    getParent(): RepresentationItemParent;
    getFaceCount(): number;
    getEdgeCount(): number;
    getFaceAttributes(index: number): SubentityAttributes | null;
    getEdgeAttributes(index: number): SubentityAttributes | null;
    getPointAttributes(index: number): SubentityAttributes | null;
    getFaceMeasurementProperty(index: number): Face | null;
    getEdgeMeasurementProperty(index: number): Edge | null;
    setFaceMeasurementProperty(index: number, prop: Face): void;
    setEdgeMeasurementProperty(index: number, prop: Edge): void;
    getBodyType(): BodyType;
    getRuntimeId(): RuntimeNodeId;
    protected readonly __RepresentationItem: PhantomMember;
    private readonly _parent;
    private readonly _bodyType;
    private _physicalProps;
    private _faceMeasurementProps;
    private _edgeMeasurementProps;
    private _faceAttributes;
    private _edgeAttributes;
    private _pointAttributes;
}
