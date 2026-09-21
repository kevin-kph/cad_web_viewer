import { InclusionKey } from '@ts3d-hoops/streamcache';
import { ProductOccurrence } from '../node/ProductOccurrence';
import { AnyTreeNode } from '../node/types';
import { WalkRestriction } from './types';
export declare function gatherInclusionKeysSync(startNode: AnyTreeNode, allowOutOfHierarchy: boolean, visited: Set<ProductOccurrence>, restriction: WalkRestriction): InclusionKey[];
export declare function gatherInclusionKeysFromNodesSync(nodes: AnyTreeNode[], restriction: WalkRestriction): InclusionKey[];
