import { LitElement } from 'lit';
import { IContextMenuModel, IContextMenuWebViewer } from './types';
import { GenericType, NodeId, Point3 } from '@ts3d-hoops/web-viewer';
import { IsolateZoomHelper } from './IsolateZoomHelper';
/**
 * Provides a context menu component for 3D model interactions and operations.
 *
 * This component displays a contextual menu with actions like isolate, zoom, visibility toggles,
 * transparency controls, color setting, and model operations. It integrates with the web viewer
 * and model to provide interactive functionality for selected nodes, layers, or types.
 *
 * The menu dynamically positions itself to stay within viewport bounds and updates its state
 * based on current selections and model properties.
 *
 * @element hoops-context-menu
 *
 * @fires context-menu-item-clicked - Emitted when any context menu item is clicked
 *
 * @cssprop --hoops-neutral-background-20 - Background color for the context menu
 * @cssprop --hoops-accent-foreground-hover - Text color for menu items on hover
 * @cssprop --hoops-accent-foreground-disabled - Text color for disabled menu items
 *
 * @attribute {number} x - X coordinate for menu positioning
 * @attribute {number} y - Y coordinate for menu positioning
 * @attribute {string} activeItemId - ID of the currently active/selected item
 * @attribute {string} activeLayerName - Name of the currently active layer
 * @attribute {string} activeType - Type of the currently active generic type
 * @attribute {string} color - Current color value for color operations
 * @attribute {boolean} isUnsettingColor - Whether the color operation is unsetting vs setting
 *
 * @example
 * ```html
 * <hoops-context-menu x="100" y="150" activeitemid="node123"></hoops-context-menu>
 *
 * <script>
 *   document.getElementsByTagName('hoops-context-menu')[0].addEventListener('context-menu-item-clicked', (event) => {
 *     console.log('Menu item clicked:', event.detail);
 *   });
 * </script>
 * ```
 *
 * @since 2025.8.0
 */
declare class HoopsContextMenuElement extends LitElement {
    x: number;
    y: number;
    isolateZoomHelper: IsolateZoomHelper | undefined;
    activeItemId: NodeId | null;
    activeLayerName: string | null;
    activeType: GenericType | null;
    protected position: Point3 | null;
    color: string;
    private model;
    private webViewer;
    isUnsettingColor: boolean;
    private explodeService;
    /** @internal */
    static styles: import('lit').CSSResult;
    /** @internal */
    protected render(): unknown;
    /**
     * Handles color picker input change events.
     *
     * Updates the component's color property when the user selects a new color
     * from the color picker input element.
     *
     * @internal
     * @param event - The input change event from the color picker
     * @returns {void}
     */
    private handleColorChange;
    /**
     * Handles component updates and positions the menu within viewport bounds.
     *
     * Automatically repositions the menu if it would extend beyond window boundaries
     * and updates the color state based on current context.
     *
     * @param _changedProperties - Map of changed properties (unused)
     * @returns {void}
     */
    updated(_changedProperties: Map<string | number | symbol, unknown>): void;
    /**
     * Updates the color operation state based on current context items.
     *
     * Determines whether the color action should be "Set Color" or "Unset Color"
     * based on whether the selected items already have the current color applied.
     *
     * @returns {Promise<void>}
     */
    updateIsUnsettingColor(): Promise<void>;
    /**
     * Gets or sets the context menu model interface.
     *
     * The model provides access to 3D model operations like visibility, color, and node queries.
     * Setting a new model triggers helper recreation and component updates.
     *
     * @returns {IContextMenuModel | undefined} The current model instance or undefined
     */
    get contextMenuModel(): IContextMenuModel | undefined;
    /**
     * Sets the context menu model interface.
     *
     * @param model - The model instance to use for 3D operations
     * @returns {void}
     */
    set contextMenuModel(model: IContextMenuModel | undefined);
    /**
     * Gets or sets the web viewer interface for context menu operations.
     *
     * The web viewer provides access to selection management, operators, and view controls.
     * Setting a new web viewer triggers helper recreation and component updates.
     *
     * @returns {IContextMenuWebViewer | undefined} The current web viewer instance or undefined
     */
    get contextMenuWebViewer(): IContextMenuWebViewer | undefined;
    /**
     * Sets the web viewer interface for context menu operations.
     *
     * @param webViewer - The web viewer instance to use for operations
     * @returns {void}
     */
    set contextMenuWebViewer(webViewer: IContextMenuWebViewer | undefined);
    /**
     * Notifies parent components that a context menu item was clicked.
     *
     * Dispatches a custom event to inform listeners that any context menu action
     * was executed, allowing parent components to respond appropriately (e.g., hide menu).
     *
     * @internal
     * @returns {void}
     */
    private notifyItemClicked;
    /**
     * Determines if the context menu items should show as visible/hidden.
     *
     * Checks the visibility state of active items, layers, and types to determine
     * whether the visibility toggle should show "Hide" or "Show" text.
     *
     * @internal
     * @returns {boolean} True if any active context items are currently visible
     */
    private isMenuItemVisible;
    /**
     * Creates a new IsolateZoomHelper instance when both webViewer and model are available.
     *
     * Initializes the helper class that provides isolate and zoom functionality
     * for context menu operations. Called when model or webViewer properties change.
     *
     * @internal
     * @returns {void}
     */
    private createIsolateZoomHelper;
    /**
     * Handles service update events and triggers component re-render.
     *
     * @returns {void}
     */
    handleServiceUpdate: () => void;
    /**
     * Lifecycle callback when component is added to the DOM.
     *
     * Sets up event listeners for context menu prevention and explode service events.
     *
     * @returns {void}
     */
    connectedCallback(): void;
    /**
     * Lifecycle callback when component is removed from the DOM.
     *
     * Cleans up event listeners for context menu prevention and explode service events.
     *
     * @returns {void}
     */
    disconnectedCallback(): void;
    /**
     * Prevents the browser's default context menu from appearing.
     *
     * Intercepts right-click context menu events to ensure only the custom
     * hoops context menu is shown, preventing conflicts with browser menus.
     *
     * @internal
     * @param event - The right-click mouse event to prevent
     * @returns {void}
     */
    private _handleContextMenu;
    /**
     * Checks if all provided nodes are IFC space elements.
     *
     * Determines whether the given node IDs all represent IFCSPACE elements,
     * which may require special handling in certain operations.
     *
     * @internal
     * @param nodeIds - Array of node IDs to check
     * @returns {boolean} True if all nodes are IFC space elements
     */
    private isAllIfcSpace;
    /**
     * Determines if context menu items should be executable/enabled.
     *
     * Checks if there are any active context items (selected nodes, active layer,
     * active type, or current selections) that would make menu operations valid.
     *
     * @internal
     * @returns {boolean} True if menu items can be executed based on current context
     */
    private isMenuItemExecutable;
    /**
     * Determines if handle operations should be executable/enabled.
     *
     * Checks if menu items are executable and explode mode is not currently active,
     * as handles cannot be used during model explosion.
     *
     * @internal
     * @returns {boolean} True if handle operations can be executed
     */
    private isHandleExecutable;
    /**
     * Executes the isolate operation on context items.
     *
     * Hides all model elements except the currently active context items,
     * providing a focused view. Special handling for IFC space elements.
     *
     * @internal
     * @returns {Promise<void>}
     */
    private isolateFunc;
    /**
     * Executes the zoom-to-fit operation on context items.
     *
     * Adjusts the camera view to fit all currently active context items
     * within the viewport bounds for optimal viewing.
     *
     * @internal
     * @returns {Promise<void>}
     */
    private zoomFunc;
    /**
     * Traverses the model hierarchy to find the first leaf node.
     *
     * Recursively drills down through the node hierarchy to find a leaf node
     * (a node with no children), used for opacity and property queries.
     *
     * @internal
     * @param nodeId - The starting node ID to drill down from
     * @returns {NodeId} The ID of the first encountered leaf node
     */
    private drillNodes;
    /**
     * Toggles the visibility of context items.
     *
     * Shows or hides the currently active context items based on their current
     * visibility state. Special handling for IFC space elements.
     *
     * @internal
     * @returns {Promise<void>}
     */
    private visibilityFunc;
    /**
     * Toggles transparency on context items.
     *
     * Sets context items to 50% opacity if they are currently opaque (opacity = 1 or null),
     * or resets them to full opacity if they are currently transparent.
     *
     * @internal
     * @returns {Promise<void>}
     */
    private transparentFunc;
    /**
     * Adds interactive handles to context items for manipulation.
     *
     * Creates 3D manipulation handles on the currently selected context items,
     * allowing users to interactively move, rotate, or scale objects. Only works
     * when explode mode is not active.
     *
     * @internal
     * @returns {Promise<void>}
     */
    private handlesFunc;
    /**
     * Resets the entire model to its initial state.
     *
     * Performs a comprehensive reset including:
     * - Removes all manipulation handles
     * - Resets model visibility, colors, and transformations
     * - Clears face color overrides
     * - Resets PMI color override settings
     *
     * @internal
     * @returns {Promise<void>}
     */
    private resetFunc;
    /**
     * Sets the mesh level for context items.
     *
     * Updates the level of detail for mesh rendering on the currently selected
     * or context items if menu operations are executable.
     *
     * @param meshLevel - The mesh level to apply (higher = more detailed)
     * @returns {void}
     */
    meshLevelFunc(meshLevel: number): void;
    /**
     * Shows all model elements and fits them in the view.
     *
     * Restores visibility to all previously hidden elements and adjusts
     * the camera view to fit the entire model within the viewport.
     *
     * @internal
     * @returns {Promise<void>}
     */
    private showAllFunc;
    /**
     * Sets or unsets the face color for context items.
     *
     * Applies the current color picker value to context items if setting color,
     * or removes color overrides if unsetting color. The operation mode is
     * determined by the isUnsettingColor state.
     *
     * @internal
     * @returns {Promise<void>}
     */
    private setColorFunc;
    /**
     * Checks if the current color is already set on the provided context items.
     *
     * Determines whether all the given node IDs already have the current color
     * applied to their faces, which affects whether the color action should be
     * "Set Color" or "Unset Color".
     *
     * @internal
     * @param contextItemIds - Array of node IDs to check for color state
     * @returns {Promise<boolean>} True if the current color is set on all items
     */
    private _isColorSet;
    /**
     * Checks the visibility state of a specific node item.
     *
     * Determines if the given node ID is currently visible in the model.
     * If nodeId is null, checks the first selected item instead.
     *
     * @internal
     * @param nodeId - The node ID to check visibility for, or null to check first selection
     * @returns {boolean} True if the item is visible, false otherwise
     */
    private isItemVisible;
    /**
     * Checks if any nodes in the specified layer are visible.
     *
     * Iterates through all layer IDs matching the layer name and checks
     * if any nodes within those layers are currently visible.
     *
     * @internal
     * @param layerName - The name of the layer to check visibility for
     * @returns {boolean} True if any nodes in the layer are visible
     */
    private isLayerVisibile;
    /**
     * Checks if any nodes of the specified generic type are visible.
     *
     * Iterates through all nodes matching the generic type and checks
     * if any of them are currently visible in the model.
     *
     * @internal
     * @param genericType - The generic type to check visibility for
     * @returns {boolean} True if any nodes of the type are visible
     */
    private isTypeVisible;
    /**
     * Retrieves the node IDs that are currently in context for operations.
     *
     * Collects node IDs from various sources based on the provided parameters:
     * selected items, clicked items, active layer, and active type. This method
     * determines which nodes should be affected by context menu operations.
     *
     * @param includeSelected - Whether to include currently selected nodes
     * @param includeClicked - Whether to include the clicked/active node
     * @param includeRoot - Whether to include root nodes in the results
     * @returns {NodeId[]} Array of node IDs that are in context for operations
     */
    getContextItemIds(includeSelected: boolean, includeClicked: boolean, includeRoot?: boolean): NodeId[];
}
export { HoopsContextMenuElement };
