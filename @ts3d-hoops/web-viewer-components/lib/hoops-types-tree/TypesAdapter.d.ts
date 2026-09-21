import { HTMLTemplateResult, nothing } from 'lit';
import { TreeContext } from '@ts3d-hoops/ui-kit/tree';
import { IModel, TypesTreeNodeFactory } from './types';
/**
 * Create a `type-tree-node` to render in the types tree. If nodeId is not set
 * or is NaN then nothing is displayed.
 *
 * @param {IModel} model The model that contains the node
 * @param {number} nodeId The id of the node to render
 * @param {?boolean} [selected] whether the node is selected or not
 * @returns {(HTMLTemplateResult | typeof nothing)} The HTML fragment to display
 */
export declare function defaultNodeFactory(treeContext: TreeContext, model: IModel, nodeId: number, selected?: boolean, nodeData?: unknown): HTMLTemplateResult | typeof nothing;
/**
 * This class serves as a proxy to the Model class. It is used by the TypesTree
 * to communicate with the Model.
 *
 * @class TypesTreeAdapter
 * @typedef {TypesTreeAdapter}
 */
export declare class TypesTreeAdapter implements TreeContext {
    /**
     * The Model where the node will be queried.
     *
     * @type {?IModel}
     */
    model?: IModel;
    /**
     * A function that creates a HTML fragment for a given node.
     *
     * @type {TypesTreeNodeFactory}
     */
    nodeFactory: TypesTreeNodeFactory;
    /**
     * This structure hold custom data for the nodes inside the context to make it
     * reactive.
     *
     * You can use this variable to record property for your custom types tree
     * nodes.
     *
     * The data are recorded as a literal object using the node ids as keys and
     * anything as value.
     *
     * @type {Record<number, unknown>}
     */
    nodesData: Record<number, unknown>;
    /**
     * The icon drawn when a node is expanded.
     *
     * @type {HTMLTemplateResult}
     */
    expandedIcon: import('lit').TemplateResult<1>;
    /**
     * The icon drawn when a node is collapsed.
     *
     * @type {HTMLTemplateResult}
     */
    collapsedIcon: import('lit').TemplateResult<1>;
    /**
     * The name of the root node
     * @type {string}
     */
    rootNodeName: string;
    /**
     * Stores the generic type id map for the types tree.
     * @type {Map<string, Set<number>> | undefined}
     */
    allTypes?: Map<string, Set<number>>;
    /**
     * Stores the hierarchy of tree node ids for visual representation.
     * The key is the parent tree node id, and the value is an array of child tree node ids.
     * This is separate from the model node id hierarchy.
     * @type {Map<number, number[]>}
     */
    treeNodes: Map<number, number[]>;
    /**
     * Counter used to assign indices to type nodes.
     * @type {number}
     */
    indexCounter: number;
    /**
     * This function will be used by the tree to render the root node.
     * @returns The id of the root node.
     */
    getRoot(): number;
    /**
     * This function will be used by the tree to get the children of each node.
     *
     * @param {number} nodeId The id of the parent node.
     * @returns {number[]} An array containing the children's ids.
     */
    getChildren(nodeId: number): number[];
    /**
     * Returns the name of a node in the types tree
     * @param nodeId The types tree-specific node id
     */
    getNodeName(nodeId: number): string;
    /**
     * Return the CAD type name for a given CAD type id
     * @param cadViewId
     * @returns
     */
    getTypeName(cadViewId: number): string;
    /**
     * Return the HTML Fragment for a node.
     * @param id The id of the node to render.
     * @param selected Whether the node is selected or not.
     * @returns The HTML fragment to render for the node.
     */
    getContent(_: TreeContext, id: number, selected?: boolean, nodeData?: unknown): HTMLTemplateResult | typeof nothing;
}
export declare enum TypesTreeNodeId {
    /**
     * The root node id of the types tree
     */
    RootNode = -1
}
