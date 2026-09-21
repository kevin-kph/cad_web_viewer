import { HTMLTemplateResult, nothing } from 'lit';
import { TreeContext } from '@ts3d-hoops/ui-kit/tree';
import { IModel, ModelTreeNodeFactory } from './types';
/**
 * Create a `model-tree-node` to render in the model tree. If nodeId is not set
 * or is NaN then nothing is displayed.
 *
 * @param {IModel} model The model that contains the node
 * @param {number} nodeId The id of the node to render
 * @param {?boolean} [selected] whether the node is selected or not
 * @returns {(HTMLTemplateResult | typeof nothing)} The HTML fragment to display
 */
export declare function defaultNodeFactory(treeContext: TreeContext, model: IModel, nodeId: number, selected?: boolean, nodeData?: unknown): HTMLTemplateResult | typeof nothing;
/**
 * This class serves as a proxy to the Model class. I is used by the ModelTree
 * to communicate with the Model.
 *
 * @class ModelAdapter
 * @typedef {ModelAdapter}
 */
export default class ModelAdapter implements TreeContext {
    /**
     * The Model where the node will be queried.
     *
     * @type {?IModel}
     */
    model?: IModel;
    /**
     * A function that creates a HTML fragment for a given node.
     *
     * @type {ModelTreeNodeFactory}
     */
    nodeFactory: ModelTreeNodeFactory;
    /**
     * This structure hold custom data for the nodes inside the context to make it
     * reactive.
     *
     * You can use this variable to record property for your custom model tree
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
     * Return the HTML Fragment for a node.
     * @param id The id of the node to render.
     * @param selected Whether the node is selected or not.
     * @returns The HTML fragment to render for the node.
     */
    getContent(_: TreeContext, id: number, selected?: boolean, nodeData?: unknown): HTMLTemplateResult | typeof nothing;
}
