import { InclusionKey, InstanceInc, InstanceKey, MasterModelKey } from '@ts3d-hoops/streamcache';
import { AuthoredNodeId, RuntimeNodeId } from '../NodeId';
import { AnyBodyBits, BodyInstanceInfo, BodyInstanceParent } from '../types';
import { ProductOccurrence } from './ProductOccurrence';
import { NodeBits } from './types';
import { BodyMixin } from './BodyMixin';
import { AssemblyDataParser } from '../load/AssemblyDataParser';
import { InclusionContext } from '../context/InclusionContext';
import { PhantomMember } from '../../types';
import { LoadSubtreeConfig, BodyId } from '../../../types';
import { IAssemblyTree } from '../../../core';
export declare class BodyInstance extends BodyMixin<BodyInstanceParent> {
    private bodyRef?;
    static parseXml(assemblyTree: IAssemblyTree, elem: Element, inclusionKey: InclusionKey, config: LoadSubtreeConfig): BodyInstanceInfo;
    static parseBinary(assemblyTree: IAssemblyTree, inclusionContext: InclusionContext, parser: AssemblyDataParser, config: LoadSubtreeConfig): BodyInstanceInfo;
    static reify(assemblyTree: IAssemblyTree, masterModelKey: MasterModelKey, parent: BodyInstanceParent, info: BodyInstanceInfo): BodyInstance;
    static createDynamic(assemblyTree: IAssemblyTree, inclusionKey: InclusionKey, instanceKey: InstanceKey, authoredId: AuthoredNodeId | null, name: string | null, parent: ProductOccurrence, nodeBits: NodeBits, bodyBits: AnyBodyBits): BodyInstance;
    private constructor();
    getName(): string;
    getInstanceInc(): InstanceInc;
    setVisibility(visible: boolean): void;
    getRuntimeId(): RuntimeNodeId;
    getBodyRef(): BodyId | undefined;
    protected readonly __BodyInstance: PhantomMember;
}
