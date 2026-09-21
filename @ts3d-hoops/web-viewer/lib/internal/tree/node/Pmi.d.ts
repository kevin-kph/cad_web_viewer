import { DataKey } from '@ts3d-hoops/streamcache';
import { LoadSubtreeConfig, PmiSubType, BranchVisibility } from '../../../types';
import { AuthoredNodeId, DynamicNodeId, RuntimeNodeId } from '../NodeId';
import { ReferenceOnTopology } from '../node-data/ReferenceOnTopology';
import { ReferenceOnTopologyInfo } from '../node-data/types';
import { PmiBodyInfo } from '../types';
import { PmiBody } from './PmiBody';
import { NodeMixin } from './NodeMixin';
import { ProductOccurrence } from './ProductOccurrence';
import { AnyBody, PmiType } from './types';
import { InclusionContext } from '../context/InclusionContext';
import { AssemblyDataParser } from '../load/AssemblyDataParser';
import { PhantomMember } from '../../types';
import { IAssemblyTree } from '../../../core';
export declare class PmiTopologyReference {
    constructor(body: AnyBody);
    readonly body: AnyBody;
    readonly faceIds: number[];
    readonly edgeIds: number[];
}
export interface PmiInfo {
    readonly nodeId: AuthoredNodeId | DynamicNodeId;
    readonly name: string | null;
    readonly attributesDataKey: DataKey | null;
    readonly pmiBodyInfos: PmiBodyInfo[];
    readonly initiallyShown: boolean;
    readonly pmiType: PmiType;
    readonly pmiSubType: PmiSubType;
    readonly topoRefInfos: ReferenceOnTopologyInfo[];
    readonly topoRefs: ReferenceOnTopology[];
    readonly exchangeId: string | null;
}
export type PmiParent = ProductOccurrence;
export declare class Pmi extends NodeMixin<0> {
    static parseBinary(assemblyTree: IAssemblyTree, inclusionContext: InclusionContext, parser: AssemblyDataParser, config: LoadSubtreeConfig): PmiInfo;
    static reify(assemblyTree: IAssemblyTree, inclusionContext: InclusionContext, pmiInfo: PmiInfo, parent: PmiParent): Pmi;
    static createDynamic(assemblyTree: IAssemblyTree, inclusionContext: InclusionContext, parent: PmiParent, pmiName: string | null, pmiType: PmiType, pmiSubType: PmiSubType, pmiBodyInfo: PmiBodyInfo[], topoRefs: ReferenceOnTopology[]): Pmi;
    private constructor();
    private static _loadTopoRefs;
    private _loadPmiBody;
    getPmiBodies(): PmiBody[];
    private static _pack;
    getPmiType(): PmiType;
    getPmiSubType(): PmiSubType;
    getParent(): PmiParent;
    getRuntimeId(): RuntimeNodeId;
    getBranchVisibility(): BranchVisibility;
    setVisibility(visible: boolean): void;
    getPmiTopologyReferences(assemblyTree: IAssemblyTree): PmiTopologyReference[];
    protected readonly __Pmi: PhantomMember;
    private readonly _parent;
    private readonly _packed;
    private readonly _pmiBodies;
    private readonly _topoRefs;
}
