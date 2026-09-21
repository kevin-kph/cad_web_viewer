import { IAssemblyTree } from '../../../core';
import { AnyBody } from '../node/types';
import { RuntimeNodeId } from '../NodeId';
/**
 * Walk the assembly tree from the given nodeId and gather all the AnyBody nodes found.
 * @param assemblyTree The assembly tree to walk.
 * @param nodeId The starting nodeId to walk from.
 * @returns An array of AnyBody nodes found during the walk.
 */
export declare function gatherAnyBodiesFromNodeIdSync(assemblyTree: IAssemblyTree, nodeId: RuntimeNodeId): AnyBody[];
