import { LitElement } from 'lit';
import { List } from '@ts3d-hoops/ui-kit/list';
import { default as LayerAdapter } from './LayerAdapter';
import { ILayersContainer } from './types';
export type * from './custom-events.d.ts';
/**
 * Provides a tree view for displaying and managing model layers.
 *
 * This component renders a list of layers with lazy loading support.
 * It handles layer selection, visibility toggling, and node management within layers.
 *
 * @element hoops-layer-tree
 *
 * @fires hoops-layer-tree-node-selected - Emitted when layer nodes are selected
 * @fires hoops-layer-tree-visibility-changed - Emitted when layer visibility changes
 *
 * @example
 * ```html
 * <hoops-layer-tree></hoops-layer-tree>
 *
 * <script>
 *   const layerTree = document.getElementsByTagName('hoops-layer-tree')[0];
 *   layerTree.layersContainer = webviewer.model;
 *   layerTree.addEventListener('hoops-layer-tree-node-selected', (event) => {
 *     console.log('Selected nodes:', event.detail.nodeIds);
 *   });
 * </script>
 * ```
 *
 * @since 2025.8.0
 */
export declare class HoopsLayerTreeElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * Reference to the internal list component element.
     * @internal
     */
    private listRef;
    /**
     * Gets the internal list component instance.
     *
     * This is a syntactic sugar to simplify getting the list element and expose it externally.
     *
     * @returns {List | undefined} The list element instance or undefined if not initialized
     */
    get layerTreeDomElement(): List | undefined;
    /**
     * Gets or sets the layers container that represents the available layers in the model.
     *
     * This is a syntactic sugar to access LayerTree.layerAdapter.layersContainer.
     * If the LayerAdapter is not set it returns undefined.
     *
     * Reassigning the layersContainer will trigger an update.
     *
     * @throws {Error} When setting layersContainer without an initialized layer adapter. This should not happen in normal use since the layerAdapter is added to the layer list at initialization.
     */
    get layersContainer(): ILayersContainer | undefined;
    set layersContainer(layersContainer: ILayersContainer | undefined);
    /**
     * Gets or sets the layer adapter that supplies data to the list.
     *
     * This is a syntactic sugar to access list.context.
     * If the List is not set it returns undefined.
     *
     * Reassigning the layerAdapter will trigger an update.
     *
     * @throws {Error} When setting layerAdapater without an initialized list element. This should not happen in normal use since the list is added to the layer list at initialization.
     */
    get layerAdapter(): LayerAdapter | undefined;
    set layerAdapter(newLayerAdapter: LayerAdapter);
    /**
     * Selects or deselects layers in the list.
     *
     * Reassigning the selected layers will trigger an update.
     *
     * @param layerIds - Array of layer IDs to update
     * @param selected - Whether to select (true) or deselect (false) the layers
     * @returns {void}
     * @throws {Error} When the layer tree element is not initialized
     */
    selectElements(layerIds: number[], selected: boolean): void;
    /**
     * Selects or deselects nodes in the layer sublists.
     *
     * Clears existing selection and applies the new selection to all layer tree elements.
     *
     * @param nodeIds - Array of node IDs to update
     * @param selected - Whether to select (true) or deselect (false) the nodes
     * @returns {void}
     * @throws {Error} When the tree dom element is not initialized
     */
    selectNodes(nodeIds: number[], selected: boolean): void;
    /**
     * Retrieves custom data associated with a layer.
     *
     * This is a shorthand to allow users to attach reactive data to layers.
     *
     * @param layerId - The ID of the layer that owns the data
     * @returns {T} The stored custom data or undefined if no data exists
     * @throws {Error} When the layer adapter is not initialized
     */
    getElementData<T = unknown>(layerId: number): T;
    /**
     * Stores custom data for a layer, replacing any existing value.
     *
     * If the layer had already a value it is erased.
     * Setting layer data will trigger an update.
     *
     * @param layerId - The ID of the layer that owns the data
     * @param data - The data to store
     * @returns {void}
     * @throws {Error} When the layer adapter or tree element is not initialized
     */
    setLayerData(layerId: number, data: unknown): void;
    /**
     * Merges custom data into an existing layer entry.
     *
     * If the layer did not have data, it is added to the context.
     * If the given data is an array and the context layer data is an array, the data passed as argument are appended to the context data.
     * If both are objects, then the objects are merged using Object.assign, with the data argument being the last object of the merge.
     * Otherwise it is equivalent to setLayerData.
     *
     * Updating layer data will trigger an update.
     *
     * @param layerId - The ID of the layer that owns the data
     * @param data - The data to merge into the layer entry
     * @returns {void}
     * @throws {Error} When the layer adapter or tree element is not initialized
     */
    updateLayerData(layerId: number, data: unknown): void;
    /**
     * Updates visibility icons for layers based on shown and hidden body IDs.
     *
     * This method propagates visibility changes to affected layer tree elements.
     *
     * @param shownBodyIds - Array of body IDs that are now visible
     * @param hiddenBodyIds - Array of body IDs that are now hidden
     * @returns {void}
     */
    updateVisibility(shownBodyIds: number[], hiddenBodyIds: number[]): void;
    /** @internal */
    protected render(): unknown;
    /**
     * Handles layer click events and manages layer selection.
     * @internal
     * @param event - The layer clicked event
     * @returns {void}
     */
    private onLayerClicked;
    /**
     * Retrieves all layer tree element instances from the shadow DOM.
     * @internal
     * @returns {LayerTreeElement[]} Array of layer tree elements
     */
    private getLayerTreeElements;
    /**
     * Handles layer node click events and manages node selection.
     * @internal
     * @param event - The layer tree node clicked event
     * @returns {void}
     */
    private onLayerNodeClicked;
    /**
     * Handles layer visibility toggle events.
     * @internal
     * @param event - The layer visibility click event
     * @returns {void}
     */
    private onLayerVisibilityClicked;
    /**
     * Handles layer node visibility toggle events.
     * @internal
     * @param event - The layer node visibility click event
     * @returns {void}
     */
    private onLayerNodeVisibilityClicked;
    /**
     * Dispatches a custom event to notify about node selection changes.
     * @internal
     * @param event - The base mouse event details
     * @returns {void}
     */
    private notifyNodeSelection;
    /**
     * Dispatches a custom event to notify about layer visibility changes.
     * @internal
     * @param event - The base mouse event details
     * @returns {void}
     */
    private notifyLayerVisibility;
}
export default HoopsLayerTreeElement;
