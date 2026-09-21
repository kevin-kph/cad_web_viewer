import { LoadSubtreeConfig } from '../../../types';
import { InclusionKey, InstanceIncs, MasterModelKey } from '@ts3d-hoops/streamcache';
import { PhantomMember } from '../../types';
import { RuntimeNodeId } from '../NodeId';
import { InclusionContext } from '../context/InclusionContext';
import { AssemblyDataParser } from '../load/AssemblyDataParser';
import { ViewFrameInfo, ViewFrameParent } from '../types';
import { BodyMixin } from './BodyMixin';
import { IAssemblyTree } from '../../../core';
export declare class ViewFrame extends BodyMixin<ViewFrameParent> {
    static parseXml(assemblyTree: IAssemblyTree, elem: Element, inclusionKey: InclusionKey, config: LoadSubtreeConfig): ViewFrameInfo;
    static parseBinary(assemblyTree: IAssemblyTree, inclusionContext: InclusionContext, parser: AssemblyDataParser, config: LoadSubtreeConfig): ViewFrameInfo;
    static reify(assemblyTree: IAssemblyTree, masterModelKey: MasterModelKey, parent: ViewFrameParent, info: ViewFrameInfo): ViewFrame;
    private constructor();
    getName(): string;
    getInstanceInc(): InstanceIncs;
    setVisibility(visible: boolean): void;
    getRuntimeId(): RuntimeNodeId;
    protected readonly __ViewFrame: PhantomMember;
}
