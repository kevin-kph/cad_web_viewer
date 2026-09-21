import { LoadSubtreeConfig } from '../../../types';
import { InstanceIncs, MasterModelKey } from '@ts3d-hoops/streamcache';
import { PhantomMember } from '../../types';
import { RuntimeNodeId } from '../NodeId';
import { InclusionContext } from '../context/InclusionContext';
import { AssemblyDataParser } from '../load/AssemblyDataParser';
import { PmiBodyInfo, PmiBodyParent } from '../types';
import { BodyMixin } from './BodyMixin';
import { IAssemblyTree } from '../../../core';
export declare class PmiBody extends BodyMixin<PmiBodyParent> {
    static parseBinary(assemblyTree: IAssemblyTree, inclusionContext: InclusionContext, parser: AssemblyDataParser, forceHidden: boolean, config: LoadSubtreeConfig): PmiBodyInfo;
    static reify(assemblyTree: IAssemblyTree, masterModelKey: MasterModelKey, parent: PmiBodyParent, info: PmiBodyInfo): PmiBody;
    private constructor();
    getName(): string;
    getInstanceInc(): InstanceIncs;
    setVisibility(visible: boolean): void;
    getRuntimeId(): RuntimeNodeId;
    protected readonly __PmiBody: PhantomMember;
}
