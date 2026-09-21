import { LitElement } from 'lit';
/**
 * A custom element representing a node in the view tree.
 *
 * This component displays a view tree node with its properties and interactive controls.
 * It does not have any dependency on the @ts3d-hoops/web-viewer Model class.
 *
 * @element hoops-view-tree-node
 *
 * @attribute {number} nodeId - The id of the node in the model
 * @attribute {string} nodeName - The name of the node
 *
 * @example
 * ```html
 * <hoops-view-tree-node nodeId="1" nodeName="View 1"></hoops-view-tree-node>
 * ```
 *
 * @since 2025.8.0
 */
export declare class ViewTreeNode extends LitElement {
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
    /** @internal */
    protected render(): unknown;
}
