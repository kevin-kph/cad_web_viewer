import { InstanceIncs } from '@ts3d-hoops/streamcache';
import { RuntimeNodeId } from '../NodeId';
import { AnyTreeNode, AnyBody } from '../node/types';
import { BodyTypeBits } from '../types';
import { WalkRestriction } from './types';
import { IAssemblyTree } from '../../../core';
export declare function gatherInstanceIncs(startNode: AnyTreeNode, allowedTypes: BodyTypeBits, allowOutOfHierarchy: boolean, visited: Set<AnyBody>): Promise<InstanceIncs>;
export declare function gatherInstanceIncsSync(startNode: AnyTreeNode, allowedTypes: BodyTypeBits, allowOutOfHierarchy: boolean, visited: Set<AnyBody>, restriction: WalkRestriction): InstanceIncs;
export declare function gatherInstanceIncsByNodeIdsSync(assemblyTree: IAssemblyTree, nodeIds: RuntimeNodeId[], allowedTypes: BodyTypeBits, restriction: WalkRestriction): InstanceIncs;
