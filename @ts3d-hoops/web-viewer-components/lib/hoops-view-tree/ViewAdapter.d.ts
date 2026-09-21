import { HTMLTemplateResult, nothing } from 'lit';
import { TreeContext } from '@ts3d-hoops/ui-kit/tree';
import { IModel, ViewTreeNodeFactory } from './types';
/**
 * Create a `view-tree-node` to render in the view tree. If nodeId is not set
 * or is NaN then nothing is displayed.
 *
 * @param {IModel} model The model that contains the node
 * @param {number} nodeId The id of the node to render
 * @param {?boolean} [selected] whether the node is selected or not
 * @returns {(HTMLTemplateResult | typeof nothing)} The HTML fragment to display
 */
export declare function defaultNodeFactory(treeContext: TreeContext, model: IModel, nodeId: number, selected?: boolean, nodeData?: unknown): HTMLTemplateResult | typeof nothing;
/**
 * This class serves as a proxy to the Model class. It is used by the ViewTree
 * to communicate with the Model.
 *
 * @class ViewAdapter
 * @typedef {ViewAdapter}
 */
export declare class ViewAdapter implements TreeContext {
    /**
     * The Model where the node will be queried.
     *
     * @type {?IModel}
     */
    model?: IModel;
    /**
     * A function that creates a HTML fragment for a given node.
     *
     * @type {ViewTreeNodeFactory}
     */
    nodeFactory: ViewTreeNodeFactory;
    /**
     * This structure hold custom data for the nodes inside the context to make it
     * reactive.
     *
     * You can use this variable to record property for your custom view tree
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
     * The name of the combine state views node
     * @type {string}
     */
    combineStateViewsNodeName: string;
    /**
     * The name of the annotation views node
     * @type {string}
     */
    annotationViewsNodeName: string;
    /**
     * The name of the standard views node
     * @type {string}
     */
    standardViewsNodeName: string;
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
     * Returns the name of a node in the view tree
     * @param nodeId The view tree-specific node id
     */
    getNodeName(nodeId: number): string;
    /**
     * Return the CAD view name for a given CAD view id
     * @param cadViewId
     * @returns
     */
    getViewName(cadViewId: number): string;
    /**
     * Return the HTML Fragment for a node.
     * @param id The id of the node to render.
     * @param selected Whether the node is selected or not.
     * @returns The HTML fragment to render for the node.
     */
    getContent(_: TreeContext, id: number, selected?: boolean, nodeData?: unknown): HTMLTemplateResult | typeof nothing;
}
export declare enum ViewTreeNodeId {
    /**
     * The root node id of the view tree
     */
    RootNode = 0,
    /**
     * The combine state views node id of the view tree
     */
    CombineStateViewsNode = 1,
    /**
     * The annotation views node id of the view tree
     */
    AnnotationViewsNode = 2,
    /**
     * The standard views node id of the view tree
     */
    StandardViewsNode = 3
}
