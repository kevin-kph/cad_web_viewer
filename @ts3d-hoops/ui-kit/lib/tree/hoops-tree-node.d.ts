import { LitElement } from 'lit';
import { ContextWrapper } from './context';
export type * from './custom-events.d.ts';
/**
 * This class represent a node in a `hoops-tree`.
 *
 * @class TreeNode
 * @typedef {TreeNode}
 * @extends {LitElement}
 */
export default class TreeNode extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The context of the hoops-tree
     *
     * @type {?TreeContext}
     */
    tree?: ContextWrapper;
    /**
     * The id of the node in the tree.
     *
     * @type {number}
     */
    key: number;
    /**
     * Whether the node is expanded or not
     *
     * @type {boolean}
     */
    expanded: boolean;
    /**
     * Whether the node is selected or not
     *
     * @type {boolean}
     */
    selected: boolean;
    /**
     * Wheteher or not a node is a leaaf.
     *
     * @type {boolean}
     */
    leaf: boolean;
    /** @internal */
    protected render(): unknown;
    /**
     * Handles click on the expand icon.
     *
     * This will stop the propagation of the click and propagate a
     * hoops-tree-node-expand with information about the clicked node.
     *
     * @fires TreeNode#hoops-tree-node-expand
     *
     * @param {MouseEvent} event The event that triggered the listener.
     */
    private handleExpandClick;
    /**
     * Handles click on the node.
     *
     * This will stop the propagation of the click and propagate a
     * hoops-tree-node-click with information about the clicked node.
     *
     * @fires TreeNode#hoops-tree-node-click
     *
     * @param {MouseEvent} event The event that triggered the listener.
     */
    private handleNodeClick;
    /**
     * Handles right click on the node.
     *
     * This will stop the propagation of the aux click and propagate a
     * hoops-tree-node-aux-click with information about the clicked node.
     *
     * @fires TreeNode#hoops-tree-node-aux-click
     *
     * @param {MouseEvent} event The event that triggered the listener.
     */
    private handleNodeAuxClick;
    /**
     * Get the expand/collapse icon for a node. If a node is a leaf, it does not
     * make sense to have an expand/collapse icon but you may want to provide an
     * icon for the leafs which is supported by TreeContext
     *
     * @returns {(HTMLTemplateResult | typeof nothing)}
     */
    private getExpandIcon;
}
