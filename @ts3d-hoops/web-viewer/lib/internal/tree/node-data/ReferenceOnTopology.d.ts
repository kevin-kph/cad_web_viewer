import { PmiTopoRef } from '../../../types';
import { InstanceInc } from '@ts3d-hoops/streamcache';
import { PhantomMember } from '../../types';
import { InclusionContext } from '../context/InclusionContext';
import { AssemblyDataParser } from '../load/AssemblyDataParser';
import { BodyInstance } from '../node/BodyInstance';
import { ReferenceOnTopologyInfo } from './types';
export declare class ReferenceOnTopology {
    static parseBinary(parser: AssemblyDataParser): ReferenceOnTopologyInfo;
    static reify(inclusionContext: InclusionContext, info: ReferenceOnTopologyInfo): ReferenceOnTopology;
    static fromBodyInstance(node: BodyInstance, subElementType: PmiTopoRef, subElementIndex: number): ReferenceOnTopology;
    private constructor();
    getBodyInstanceInc(): InstanceInc;
    getTopoItemType(): PmiTopoRef;
    getItemIndex(): number;
    protected readonly __ReferenceOnTopology: PhantomMember;
    private readonly _inclusionKey;
    private readonly _bodyInstanceKey;
    private readonly _topoItemType;
    private readonly _itemIndex;
}
