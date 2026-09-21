import { Matrix16 } from '@ts3d-hoops/common';
import { AttachContext } from './context/AttachContext';
import { InclusionContext } from './context/InclusionContext';
import { LoadContext } from './context/LoadContext';
import { PrototypeContext } from './context/PrototypeContext';
import { ProductOccurrence } from './node/ProductOccurrence';
import { AnyNode, AnyTreeContext, AnyTreeNode, AnyContainerNode } from './node/types';
import { BranchVisibility, NodeType, GenericType, BranchVisibilityOptions } from '../../types';
export declare function getNetMatrix(startNode: AnyNode | AnyTreeContext): Matrix16;
/**
 * Retrieves the nearest `AnyTreeContext` to the input object by walking upward.
 * If the input object is already an `AnyTreeContext`, it is immediately returned instead.
 */
export declare function towardContainerNode(startNode: AnyTreeNode | AnyTreeContext): AnyContainerNode | null;
export declare function isOutOfHierarchy(node: AnyNode): boolean;
export declare function getBranchVisibility(node: AnyTreeNode, options?: BranchVisibilityOptions): BranchVisibility;
export declare function getNodeType(node: AnyNode): NodeType;
export declare function getNodeGenericType(node: AnyTreeNode): GenericType | null;
/**
 * The type used to denote a tree node or tree context where `towardInclusionContext` can be called from.
 */
export type HasInclusionContext = AnyTreeNode | InclusionContext | PrototypeContext;
/**
 * Retrieves the nearest `InclusionContext` to the input object by walking upward.
 * If the input object is already an `InclusionContext`, it is immediately returned instead.
 */
export declare function towardInclusionContext(startNode: HasInclusionContext): InclusionContext;
/**
 * Retrieves the nearest `LoadContext` to the input object by walking upward.
 * If the input object is already a `LoadContext`, it is immediately returned instead.
 */
export declare function towardLoadContext(startNode: AnyTreeContext | AnyTreeNode): LoadContext;
/**
 * Retrieves the nearest `AttachContext` to the input object by walking upward.
 * If the input object is already an `AttachContext`, it is immediately returned instead.
 */
export declare function towardAttachContext(startNode: AnyTreeNode | InclusionContext | AttachContext | LoadContext | PrototypeContext): AttachContext;
/**
 * Retrieves the nearest "attach root" to the input node by walking upward.
 * If the input node is already an "attach root", it is immediately returned instead.
 *
 * An "attach root" is defined to be a `ProductOccurrence` that is a child of an `InclusionContext`.
 */
export declare function towardAttachRoot(startNode: AnyTreeNode): ProductOccurrence;
/**
 * Retrieves the nearest `ProductOccurrence` to the input object by walking upward.
 * If the input object is already a `ProductOccurrence`, it is immediately returned instead.
 */
export declare function towardProductOccurrence(startNode: AnyTreeNode | AnyTreeContext): ProductOccurrence | null;
