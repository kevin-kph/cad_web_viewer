import { InstanceIncs } from '@ts3d-hoops/streamcache';
import { RuntimeNodeId } from '../NodeId';
import { AnyBody, AnyTreeNode } from '../node/types';
export declare function getInstanceIncs(bodies: AnyBody[]): InstanceIncs;
export declare function getRuntimeIds(nodes: AnyTreeNode[]): RuntimeNodeId[];
