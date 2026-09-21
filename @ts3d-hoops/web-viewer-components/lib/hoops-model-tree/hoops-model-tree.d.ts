import { LitElement } from 'lit';
import { Tree } from '@ts3d-hoops/ui-kit/tree';
import { default as ModelAdapter } from './ModelAdapter';
import { IModel } from './types';
export type * from './custom-events.d.ts';
/**
 * Provides a tree view for displaying and navigating the model structure.
 *
 * This component renders a lazy-loaded tree of model nodes using the model adapter.
 * It supports selection, contextual data storage, and emits events when nodes are interacted with.
 *
 * @element hoops-model-tree
 *
 * @fires hoops-model-tree-node-click - Emitted when a model node is clicked (primary or auxiliary button)
 *
 * @example
 * ```html
 * <hoops-model-tree></hoops-model-tree>
 *
 * <script>
 *   const tree = document.getElementsByTagName('hoops-model-tree')[0];
 *   tree.model = modelInstance;
 *   tree.addEventListener('hoops-model-tree-node-click', (event) => {
 *     console.log('Node clicked:', event.detail.nodeId);
 *   });
 * </script>
 * ```
 *
 * @since 2025.8.0
 */
export declare class HoopsModelTreeElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * Reference to the internal tree component element.
     * @internal
     */
    private treeRef;
    /**
     * Gets the internal tree component instance.
     * Provides access to the underlying tree API when needed.
     * @returns {Tree | undefined} The tree element instance or undefined if not initialized
     */
    get treeElement(): Tree | undefined;
    /**
     * Gets the currently selected model node IDs.
     * @returns {number[]} Array of selected node IDs
     */
    get selected(): number[];
    /**
     * Sets the currently selected model node IDs.
     * @param value - Array of node IDs to select
     * @returns {void}
     * @throws {Error} When the tree element is not initialized
     */
    set selected(value: number[]);
    /**
     * Gets the model instance used to populate the tree.
     * @returns {IModel | undefined} The current model instance or undefined
     */
    get model(): IModel | undefined;
    /**
     * Sets the model instance used to populate the tree.
     * Setting the model refreshes the displayed tree structure.
     * @param model - The model instance to set
     * @returns {void}
     * @throws {Error} When the model adapter is not initialized
     */
    set model(model: IModel | undefined);
    /**
     * Gets the model adapter that supplies data to the tree.
     * @returns {ModelAdapter | undefined} The current model adapter or undefined
     */
    get modelAdapter(): ModelAdapter | undefined;
    /**
     * Sets the model adapter that supplies data to the tree.
     * @param value - The model adapter to set
     * @returns {void}
     * @throws {Error} When the tree element is not initialized
     */
    set modelAdapter(value: ModelAdapter);
    /**
     * Selects or deselects nodes in the tree.
     *
     * Reassigning the selected nodes will trigger an update.
     *
     * @param nodeIds - Array of node IDs to update
     * @param selected - Whether to select (true) or deselect (false) the nodes
     * @returns {void}
     * @throws {Error} When the tree element is not initialized
     */
    selectNodes(nodeIds: number[], selected: boolean): void;
    /**
     * Retrieves custom data associated with a node.
     *
     * This is a shorthand to allow users to attach reactive data to nodes.
     *
     * @param nodeId - The ID of the node that owns the data
     * @returns {T} The stored custom data
     * @throws {Error} When the model adapter is not initialized
     */
    getNodeData<T = unknown>(nodeId: number): T;
    /**
     * Stores custom data for a node, replacing any existing value.
     *
     * If the node had already a value it is erased.
     * Setting node data will trigger an update.
     *
     * @param nodeId - The ID of the node that owns the data
     * @param data - The data to store
     * @returns {void}
     * @throws {Error} When the model adapter or tree element is not initialized
     */
    setNodeData(nodeId: number, data: unknown): void;
    /**
     * Merges custom data into an existing node entry.
     *
     * If the node did not have data, it is added to the context.
     * If the given data is an array and the context node data is an array, the data passed as argument are appended to the context data.
     * If both are objects, then the objects are merged using Object.assign, with the data argument being the last object of the merge.
     * Otherwise it is equivalent to setNodeData.
     *
     * Updating node data will trigger an update.
     *
     * @param nodeId - The ID of the node that owns the data
     * @param data - The data to merge into the node entry
     * @returns {void}
     * @throws {Error} When the model adapter or tree element is not initialized
     */
    updateNodeData(nodeId: number, data: unknown): void;
    /**
     * Refreshes the data for a specific node.
     *
     * Useful if data provided by the model has changed (child nodes added or removed).
     * If node is not loaded, it does nothing since data will be properly loaded when expanded.
     *
     * @param nodeId - The ID of the node to refresh
     * @returns {void}
     */
    refreshNodeData(nodeId: number): void;
    /**
     * Removes a node and its descendants from the displayed tree.
     *
     * This notifies the tree that a node has been removed from the model.
     * If the node is not loaded yet, it does nothing.
     *
     * @param nodeId - The ID of the removed node
     * @returns {void}
     */
    removeNode(nodeId: number): void;
    /**
     * Resets the tree and expands default nodes for user visibility.
     * @internal
     * @returns {void}
     */
    private resetTree;
    /**
     * Handles low-level tree click events and re-emits them as model tree events.
     * @internal
     * @param event - The original tree click event
     * @returns {void}
     */
    private handleNodeClick;
    /** @internal */
    protected render(): unknown;
}
export default HoopsModelTreeElement;
