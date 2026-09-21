import { NodeId } from '../../types';
import { HasInclusionContext } from './Query';
/**
 * This is the complete runtime ID of an assembly tree node.
 *
 * No two living nodes will have the same `RuntimeNodeId` in a given session.
 * (Once a node is removed from the scene, the ID in principle can be reused, much like C pointers.)
 *
 * Note:
 * This is conceptually the same as `NodeId`, but has a more descriptive name
 * that clarifies internal use. This type is also more strongly typed than `NodeId`.
 * As such, use of `NodeId` in `Tree` should not be used at all.
 *
 * Some implementation details:
 *  - Positive values are `AuthoredNodeId`s.
 *  - Negative values are `DynamicNodeId`s.
 *  - The value `-1` is `invalidNodeId`.
 *
 * If these details are needed to be known outside of this file, please
 * extend this file's exported interface to handle it instead.
 */
export type RuntimeNodeId = NodeId;
/**
 * This is the ID of an assembly tree node that was authored in the loaded model.
 *
 * These IDs are *not* unique in a given assembly tree.
 *
 * These should be unique within a given model. (Notably at the individual model level, not the shattered model level.)
 */
export type AuthoredNodeId = NodeId;
/**
 * This is the ID of an assembly tree node that was created dynamically.
 * (That is, the node was created locally and not supplied through loaded models.)
 *
 * No two living nodes will have the same `DynamicNodeId` in a given session.
 *
 * Some implementation details:
 *  - A `DynamicNodeId` always coincides with its `RuntimeNodeId`.
 */
export type DynamicNodeId = NodeId;
/**
 * This is the offset added to an `AuthoredNodeId` to get its `RuntimeNodeId`.
 *
 * This offset is the same for all nodes within a given inclusion.
 *
 * No two living inclusions will have the same `AuthoredNodeId` in a given session.
 */
export type NodeIdOffset = NodeId;
/**
 * This is the value for invalid node IDs.
 *
 * This value is overloaded for use in both `DynamicNodeId` and `RuntimeNodeId` types.
 *
 * Note:
 * There is no such thing as an invalid node ID for `AuthoredNodeId`s.
 */
export declare const invalidNodeId: DynamicNodeId | RuntimeNodeId;
export declare function isAuthoredId(nodeId: RuntimeNodeId | AuthoredNodeId | DynamicNodeId): nodeId is AuthoredNodeId;
export declare function getAuthoredId(nodeId: AuthoredNodeId): AuthoredNodeId;
export declare function getRuntimeId(nodeId: AuthoredNodeId | DynamicNodeId, node: HasInclusionContext): RuntimeNodeId;
