import { NodeType } from '@ts3d-hoops/web-viewer';
import { LitElement } from 'lit';
import { BranchVisibility } from './types';
/**
 * A custom element representing a node in the model tree.
 *
 * This component displays a model tree node with its type, visibility state,
 * and interactive controls. It does not have any dependency on the
 * @ts3d-hoops/web-viewer Model class.
 *
 * @element hoops-model-tree-node
 *
 * @attribute {number} nodeId - The id of the node in the model
 * @attribute {string} nodeName - The name of the node
 * @attribute {number} nodeType - The type of the node (casted into a NodeType)
 * @attribute {boolean} isRoot - Whether the node is a root node
 * @attribute {boolean} hidden - The visibility state of the node
 *
 * @example
 * ```html
 * <hoops-model-tree-node nodeId="1" nodeName="Part1" nodeType="1"></hoops-model-tree-node>
 * <hoops-model-tree-node nodeId="2" nodeName="Part2" nodeType="1" hidden></hoops-model-tree-node>
 * ```
 *
 * @since 2025.8.0
 */
export declare class ModelTreeNode extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The id of the node to render.
     *
     * @type {number}
     */
    nodeId: number;
    /**
     * The name of the node to render.
     *
     * @type {string}
     */
    nodeName: string;
    /**
     * The type of the node to render.
     *
     * @type {number}
     */
    nodeType: NodeType;
    /**
     * If the node is a root.
     *
     * @type {boolean}
     */
    isRoot: boolean;
    /**
     * The visibility attribute represents the visibility of the node in the viewer.
     * It may be one of the following three states:
     * - `Shown` - The node and all of its children are visible.
     * - `Hidden` - The node and all of its children are hidden.
     * - `Mixed` - The node is visible, but some of its
     *   children are not visible.
     *
     * @type {BranchVisibility}
     */
    visibility: BranchVisibility;
    /**
     * Whether the node is selected or not.
     *
     * @type {boolean}
     */
    selected: boolean;
    /** @internal */
    protected render(): unknown;
    /**
     * Handles a click on the visibility icon.
     * It stops the propagation of the click event and emit a
     * 'hoops-model-tree-node-visibility-change' that provides the nodeId, the new
     * visibility and `this` element itself along with some mouse event
     * properties.
     * @param {MouseEvent} event The mouse event from the click on the node
     */
    private onVisibilityClicked;
}
