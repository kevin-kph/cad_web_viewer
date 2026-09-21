import { LitElement } from 'lit';
import { Tree } from '@ts3d-hoops/ui-kit/tree';
import { TypesTreeAdapter } from './TypesAdapter';
import { IModel } from './types';
export type * from './custom-events.d.ts';
/**
 * Provides a specialized tree component for displaying model type hierarchies with lazy loading and selection.
 *
 * This component relies on TypesTreeAdapter and hoops-tree for its functionality. The tree nodes are
 * lazy loaded for better performance and memory consumption, especially during initial loading.
 * Expansion and selection are handled automatically by the underlying hoops-tree component.
 *
 * The component has no reactive properties but provides methods and getters/setters to interact with
 * the tree state. To set the model, assign it to the `model` property and it will update automatically.
 *
 * @element hoops-types-tree
 *
 * @fires hoops-types-tree-node-click - Emitted when a tree node is clicked
 * @fires hoops-types-tree-type-node-click - Emitted when a type node is clicked
 * @fires hoops-types-tree-node-visibility-change - Emitted when node visibility changes
 *
 * @example
 * ```html
 * <hoops-types-tree></hoops-types-tree>
 *
 * <script>
 *   document.getElementsByTagName('hoops-types-tree')[0].model = modelInstance;
 *   document.getElementsByTagName('hoops-types-tree')[0].addEventListener('hoops-types-tree-node-click', (event) => {
 *     console.log('Node clicked:', event.detail);
 *   });
 * </script>
 * ```
 *
 * @since 2025.8.0
 */
export declare class HoopsTypesTreeElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * Reference to the internal hoops-tree element.
     */
    private treeRef;
    /**
     * Gets the underlying Tree element.
     *
     * @returns {Tree | undefined} The tree element instance or undefined if not available
     */
    get treeElement(): Tree | undefined;
    /**
     * Gets or sets the selected nodes in the tree.
     *
     * This is a syntactic sugar to access the underlying Tree's selected property.
     * If the Tree element is not set, getter returns an empty array.
     * Reassigning the selected array will trigger a reactive update.
     *
     * Note: Trying to set selected nodes while the tree element is not available will throw an error.
     * This should not happen in normal use cases since the tree is added at initialization.
     *
     * @returns {number[]} Array of selected node IDs
     * @defaultValue []
     * @throws Error - Thrown when attempting to set while tree element is not available
     */
    get selected(): number[];
    set selected(value: number[]);
    /**
     * Gets or sets the IModel interface that represents the Model being displayed.
     *
     * This is syntactic sugar to access the TypesTreeAdapter's model property.
     * If the TypesTreeAdapter is not set, getter returns undefined.
     * Reassigning the model will trigger a tree reset and update automatically.
     *
     * Note: Trying to set the model while the TypesTreeAdapter is not available will throw an error.
     * This should not happen in normal use cases since the TypesTreeAdapter is added at initialization.
     *
     * @returns {IModel | undefined} The model instance or undefined if not available
     * @throws Error - Thrown when attempting to set while TypesTreeAdapter is not available
     */
    get model(): IModel | undefined;
    set model(model: IModel | undefined);
    /**
     * Gets or sets the TypesTreeAdapter that manages tree data and operations.
     *
     * This provides syntactic sugar to access the underlying tree's context adapter.
     * If the Tree element is not set, getter returns undefined.
     * Reassigning the TypesTreeAdapter will trigger a reactive update.
     *
     * Note: Trying to set the TypesTreeAdapter while the tree element is not available will throw an error.
     * This should not happen in normal use cases since the tree is added at initialization.
     *
     * @returns {TypesTreeAdapter | undefined} The TypesTreeAdapter instance or undefined if not available
     * @throws Error - Thrown when attempting to set while tree element is not available
     */
    get typesTreeAdapter(): TypesTreeAdapter | undefined;
    set typesTreeAdapter(value: TypesTreeAdapter);
    /**
     * Selects or deselects nodes in the tree.
     *
     * @param nodeIds - Array of node IDs to select or deselect
     * @param selected - Whether to select (true) or deselect (false) the nodes
     * @returns {void}
     * @throws Error - Thrown when tree element is not available
     */
    selectNodes(nodeIds: number[], selected: boolean): void;
    /**
     * Retrieves custom data attached to a specific node.
     *
     * This allows users to attach reactive data to tree nodes. If the TypesTreeAdapter
     * does not exist, it will throw an Error. Otherwise it will return the stored data
     * for the specified node, if any.
     *
     * @param nodeId - The ID of the node to get data for
     * @returns {T} The custom data stored for the node
     * @throws Error - Thrown when TypesTreeAdapter is not available
     */
    getNodeData<T = unknown>(nodeId: number): T;
    /**
     * Sets custom data for a specific node, replacing any existing data.
     *
     * If the node already has a value, it will be erased and replaced with the new data.
     * Setting node data will trigger a reactive update of the tree component.
     *
     * @param nodeId - The ID of the node to set data for
     * @param data - The data to store for the node
     * @returns {void}
     * @throws Error - Thrown when TypesTreeAdapter or tree element is not available
     */
    setNodeData(nodeId: number, data: unknown): void;
    /**
     * Merges custom data into a node's existing data instead of replacing it.
     *
     * If the node does not have existing data, the new data is added to the context.
     * The merge behavior depends on data types:
     * - If both existing and new data are arrays: new data is appended to the existing array
     * - If both are objects: objects are merged using Object.assign, with new data taking precedence
     * - Otherwise: equivalent to calling setNodeData (replaces existing data)
     *
     * Updating node data will trigger a reactive update of the tree component.
     *
     * @param nodeId - The ID of the node to update data for
     * @param data - The data to merge with existing node data
     * @returns {void}
     * @throws Error - Thrown when TypesTreeAdapter or tree element is not available
     */
    updateNodeData(nodeId: number, data: unknown): void;
    /**
     * Retrieves all type tree node elements from the shadow DOM.
     *
     * @internal
     * @returns {TypeTreeNodeElement[]} Array of TypeTreeNodeElement instances found in the tree
     */
    private getNodeElements;
    /**
     * Updates the visibility state of all nodes in the tree.
     *
     * This method refreshes the visibility for all node elements by:
     * - For individual model nodes: retrieving visibility from the model's getBranchVisibility method
     * - For type nodes: using stored visibility data from nodesData or defaulting to 'Shown'
     *
     * Note: The parameters are currently unused in the implementation but maintained for API compatibility.
     *
     * @param _shownBodyIds - Array of node IDs to mark as visible (currently unused)
     * @param _hiddenBodyIds - Array of node IDs to mark as hidden (currently unused)
     * @returns {void}
     * @throws Error - Thrown when TypesTreeAdapter is not available
     */
    updateVisibility(_shownBodyIds: number[], _hiddenBodyIds: number[]): void;
    /**
     * Resets the tree to its initial state and expands the root node.
     *
     * @internal
     * @returns {void}
     */
    private resetTree;
    /** @internal */
    protected render(): unknown;
    /**
     * Handles node click events and re-emits them with proper event bubbling.
     *
     * @internal
     * @param event - The node click event from child components
     * @returns {void}
     */
    private handleNodeClick;
    /**
     * Handles type node click events and re-emits them with proper event bubbling.
     *
     * @internal
     * @param event - The type node click event from child components
     * @returns {void}
     */
    private handleTypeNodeClick;
    /**
     * Handles visibility change events and updates node data for type nodes.
     *
     * For type nodes, persists the visibility change in nodesData before re-emitting the event.
     *
     * @internal
     * @param event - The visibility change event from child components
     * @returns {void}
     */
    private handleVisibilityChange;
}
export default HoopsTypesTreeElement;
