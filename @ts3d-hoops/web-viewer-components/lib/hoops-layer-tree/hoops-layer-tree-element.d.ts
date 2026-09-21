import { LitElement } from 'lit';
/**
 * A custom element representing a layer in the layer tree.
 *
 * This component displays a layer from the model with its visibility state,
 * nodes, and interactive controls. It does not have any dependency on the
 * @ts3d-hoops/web-viewer Model class.
 *
 * @element hoops-layer-tree-element
 *
 * @attribute {number} layerId - The id of the layer in the model
 * @attribute {string} layerName - The name of the layer
 * @attribute {boolean} hidden - The visibility state of the layer
 *
 * @example
 * ```html
 * <hoops-layer-tree-element layerId="1" layerName="Layer 1"></hoops-layer-tree-element>
 * <hoops-layer-tree-element layerId="2" layerName="Layer 2" hidden></hoops-layer-tree-element>
 * ```
 *
 * @since 2025.8.0
 */
export declare class LayerTreeElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The id of the layer to render.
     *
     * @type {number}
     */
    layerId: number;
    /**
     * The name of the layer to render.
     *
     * @type {string}
     */
    layerName: string;
    /**
     * The hidden attribute represent the visibility of the nodes in the viewer.
     * We use the negated visibility since usually boolean attribute default value
     * is false we prefer to add a hidden boolean attribute than to have
     * visible="true" or visible="false" on each layer.
     *
     * @type {Array<number>}
     */
    hiddenNodes: number[];
    /**
     * Whether the layer is selected or not.
     *
     * @type {boolean}
     */
    selected: boolean;
    /**
     * Which nodes are selected.
     *
     * @type {Array<number>}
     */
    selectedNodes: number[];
    /**
     * List of nodes that belong to this layer
     *
     * @type {Map}
     */
    layerNodes: Map<number, string>;
    /**
     * Whether the node is expanded or not
     *
     * @type {boolean}
     */
    expanded: boolean;
    /**
     * Map of the nodes' children that belong to this layer
     *
     * @type {Map<number, number[]>}
     */
    nodesChildren: Map<number, number[]>;
    /** @internal */
    protected render(): unknown;
    private formatLayerVisibilityIcon;
    toggleSelection(): void;
    select(selected: boolean): void;
    clearSelection(): void;
    updateVisibility(shownBodyIds: Array<number>, hiddenBodyIds: Array<number>): void;
    selectNodes(nodeIds: number[], selected: boolean): void;
    toggleNodeSelection(nodeId: number): void;
    toggleVisibility(): void;
    private updateLayerElementSelection;
    private getLayerNodeIds;
    private getNodeHtml;
    /**
     * Get the expand/collapse icon for a layer node.
     *
     * @returns {(HTMLTemplateResult | typeof nothing)}
     */
    private getExpandIcon;
    /**
     * Handles click on the expand icon.
     *
     * This will stop the propagation of the click and update
     * its expanded status
     *
     * @param {MouseEvent} event The event that triggered the listener.
     */
    private handleExpandClick;
    /**
     * Handles a click on the visibility icon.
     * It stops the propagation of the click event and emit a
     * 'hoops-layer-visibility-change' that provides the layerId, the new
     * visibility and `this` element itself along with some mouse event
     * properties.
     * @param {MouseEvent} event The mouse event from the click on the layer
     */
    private onVisibilityClicked;
    /**
     * Handles a click on the node visibility icon.
     * It stops the propagation of the click event and emit a
     * 'hoops-layer-node-visibility-change' that provides the nodeId, the new
     * visibility and `this` element itself along with some mouse event
     * properties.
     * @param {MouseEvent} event The mouse event from the click on the layer
     */
    private onNodeVisibilityClicked;
    /**
     * Handles a click on a node in the list.
     * It stops the propagation of the click event and emit a
     * 'hoops-layer-tree-node-clicked' that provides the nodeId
     * and `this` element itself along with some mouse event
     * properties.
     * @param {MouseEvent} event The mouse event from the click on the layer
     */
    private onLayerNodeClicked;
    /**
     * Handles a click on a single layer list element
     * It stops the propagation of the click event and emit a
     * 'hoops-layer-clicked' that provides the nodeId
     * and `this` element itself along with some mouse event
     * properties.
     * @param {MouseEvent} event The mouse event from the click on the layer
     */
    private onLayerClicked;
}
