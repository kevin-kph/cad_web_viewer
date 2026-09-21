import { LitElement } from 'lit';
import { BranchVisibility } from '../hoops-model-tree/types';
/**
 * A custom element representing a node in the types tree.
 *
 * This component displays a type tree node with its properties and interactive controls.
 * It does not have any dependency on the @ts3d-hoops/web-viewer Model class.
 *
 * @element hoops-types-tree-node
 *
 * @attribute {number} nodeId - The id of the node in the model
 * @attribute {string} nodeName - The name of the node
 *
 * @example
 * ```html
 * <hoops-types-tree-node nodeId="1" nodeName="Type A"></hoops-types-tree-node>
 * ```
 *
 * @since 2025.8.0
 */
export declare class TypeTreeNodeElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The tree id of the node for UI purposes (not related to the model)
     */
    nodeId: number;
    /**
     * The id of the node represented by this element
     */
    modelNodeId: number;
    /**
     * The name of the node
     */
    nodeName: string;
    /**
     * The nodes associated with this type node
     */
    modelNodes: number[];
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
    /** @internal */
    protected render(): unknown;
    private onNodeClicked;
    private onTypeNodeClicked;
    isTypeNode(): boolean;
    private onVisibilityClicked;
}
