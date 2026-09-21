import { Plane, Point2, Point3, Ray, Color } from '@ts3d-hoops/common';
import { SelectionHighlightMode, SelectionMode, SelectionType, GenericType, LayerName, NodeId } from '../types';
import { IncrementalSelectionId } from './IncrementalSelectionId';
import { SelectionItem } from './SelectionItem';
import { NodeSelectionItem, SelectionFilter } from './types';
import { IncrementalPickConfig, PickConfig } from '../PickConfig';
import { IModel } from '../core/IModel';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
import { IScEngine } from '../core/IScEngine';
import { IModelStructure } from '../core/IModelStructure';
import { ICallbackManager } from '../core/ICallbackManager';
/**
 * This class provides the main interface into the selection functionality of the viewer. The class manages a list of selection items that are optionally highlighted as the user selects objects in the scene.
 */
export declare class SelectionManager {
    private readonly _viewer;
    private readonly _model;
    private readonly _modelStructure;
    private readonly _engine;
    private readonly _callbackManager;
    private readonly _selectedItemsPruned;
    private readonly _selectedItemsFull;
    private readonly _selectedNodeCounts;
    private readonly _temporalLinks;
    private _oldestItemHash;
    private _newestItemHash;
    private readonly _selectedLayers;
    private readonly _selectedTypes;
    private readonly _nodeSelectionColor;
    private readonly _nodeSelectionOutlineColor;
    private readonly _elementSelectionColor;
    private readonly _elementSelectionOutlineColor;
    private _nodeHighlightMode;
    private _nodeElementHighlightMode;
    private _highlightNodeSelection;
    private _highlightFaceElementSelection;
    private _highlightLineElementSelection;
    private _highlightPointElementSelection;
    private _selectParentIfSelected;
    private _pruneSelectionDescendants;
    private _ignoreEntityWhenTogglingChildSelection;
    private _singleEntityToggleMode;
    private _suppressImplicitRemovalCallback;
    private _selectionFilter;
    get viewer(): IWebViewer;
    /** @hidden */
    _incrementalBlacklistedInstanceNodes: Set<number>;
    /** @hidden */
    constructor(viewer: IWebViewer, callbackManager: ICallbackManager, engine: IScEngine, model: IModel, modelStructure: IModelStructure);
    /** * @hidden */
    _init(): void;
    /**
     * This allows manipulating the selected NodeId.
     * To reset the filter, set it to null.
     * @param selectionFilter function that manipulates the selected NodeId.
     */
    setSelectionFilter(selectionFilter: SelectionFilter | null): void;
    /**
     * @returns [[SelectionFilter]] function or null if none is set.
     */
    getSelectionFilter(): SelectionFilter | null;
    /**
     * Enables / disables descendant pruning and clears the current selection set.  When enabled, a parent and child will not be present in the same selection set.  This behavior is enabled by default.
     */
    setPruneSelectionDescendants(pruneSelectionDescendants: boolean): void;
    /**
     * Gets whether descendant pruning is enabled.
     * See also: [[setPruneSelectionDescendants]]
     */
    getPruneSelectionDescendants(): boolean;
    /**
     * Enables / disables automatic parent selection.  When enabled, if a selected part is selected again, its parent will be selected.  This behavior is enabled by default.
     */
    setSelectParentIfSelected(selectParent: boolean): void;
    /**
     * Gets whether automatic parent selection is enabled.
     * See also: [[setSelectParentIfSelected]]
     */
    getSelectParentIfSelected(): boolean;
    /**
     * Enables / disables ignore entity when toggling child selection mode.
     *
     * When enabled, a [[NodeSelectionItem]] that has a selected ancestor may only be toggled if it does not contain an entity selection.
     * A selection item without an entity selection is usually generated from selecting a node via a model tree control.
     * A selection item containing an entity selection is usually generated as a result of a viewport picking operation.
     *
     * This behavior is enabled by default.
     * See Also: [[toggle]]
     */
    setIgnoreEntityWhenTogglingChildSelection(strictMode: boolean): void;
    /**
     * Gets whether ignore entity when toggling child selection mode is enabled.
     * See also: [[setIgnoreEntityWhenTogglingChildSelection]]
     */
    getIgnoreEntityWhenTogglingChildSelection(): boolean;
    /**
     * Enables / disables single entity toggle mode.
     *
     * When enabled, limits the selection set to containing only one entity selection for each node id.
     * Toggling with an entity selection that has the same node id as a [[NodeSelectionItem]]
     * already in the selection set will remove that item from the selection set.
     *
     * This behavior is disabled by default.
     * See Also: [[toggle]]
     */
    setSingleEntityToggleModeEnabled(enabled: boolean): void;
    /**
     * Gets whether single entity toggle mode is enabled.
     * See also: [[setSingleEntityToggleModeEnabled]]
     */
    getSingleEntityToggleModeEnabled(): boolean;
    /**
     * Sets whether to generate selectionArray callbacks with implicitly removed nodes.
     *
     * For example, consider the case where you have a parent node that has a multiple child nodes.
     * Normally, if the parent begins selected and then a child is removed from the selection set
     * there will be two selectionArray callbacks generated. The first will for the removal of the
     * parent node. The second wil be for the addition of all of it's children except the one that was
     * initially removed.
     *
     * When this behavior is enabled only a single selectionArray callback will be generated for the
     * child node that was removed.
     *
     * This behavior is disabled by default.
     */
    setSuppressImplicitRemovalCallback(suppress: boolean): void;
    /**
     * Gets whether implicit removal callbacks are being suppressed
     * See also: [[setSuppressImplicitRemovalCallback]]
     */
    getSuppressImplicitRemovalCallback(): boolean;
    /**
     * Performs a selection operation from the given position on the canvas. The best candidate entity is selected.
     * This method triggers a selection event.
     * @param point The canvas position to select from.
     * @param config The configuration object used for this picking operation.
     * @param selectionMode The mode to use for this selection.
     * @param view The view to use when projecting the point into the scene.
     * @returns Promise that resolves when this operation has completed.
     */
    selectFromPoint(point: Point2, config: PickConfig, selectionMode?: SelectionMode, view?: IView): Promise<void>;
    /**
     * Performs a selection operation from the given position on the canvas. All candidate entities are selected.
     * This method triggers a selection event.
     * @param point The canvas position to select from.
     * @param config The configuration object used for this picking operation.
     * @param selectionMode The mode to use for this selection.
     * @param view The view to use when projecting the point into the scene.
     * @returns Promise that resolves when this operation has completed.
     */
    selectAllFromPoint(point: Point2, config: PickConfig, selectionMode?: SelectionMode, view?: IView): Promise<void>;
    /**
     * Performs a selection operation from the given world-space ray. The best candidate entity is selected.
     * This method triggers a selection event.
     * @param ray The world-space ray to perform the selection with.
     * @param config The configuration object used for this picking operation.
     * @param selectionMode The mode to use for this selection.
     * @param view The view to use when projecting the point into the scene.
     * @returns Promise that resolves when this operation has completed.
     */
    selectFromRay(ray: Ray, config: PickConfig, selectionMode?: SelectionMode, view?: IView): Promise<void>;
    /**
     * Performs a selection operation from the given world-space ray. All candidate entities are selected.
     * This method triggers a selection event.
     * @param ray The world-space ray to perform the selection with.
     * @param config The configuration object used for this picking operation.
     * @param selectionMode The mode to use for this selection.
     * @param view The view to use when projecting the point into the scene.
     * @returns Promise that resolves when this operation has completed.
     */
    selectAllFromRay(ray: Ray, config: PickConfig, selectionMode?: SelectionMode, view?: IView): Promise<void>;
    private _onSelectionItem;
    private _onSelectionItems;
    /**
     * Creates a new and active selection context for the provided selection window.
     * @param areaCssMin The minimum coordinate in css pixel space for the selection window.
     * @param areaCssMax The maximum coordinate in css pixel space for the selection window.
     * @param config The configuration object used for this selection operation.
     * @param view The view to use when projecting the point into the scene.
     * @returns The handle for the selection context.
     */
    beginScreenSelectByArea(areaCssMin: Point2, areaCssMax: Point2, config: IncrementalPickConfig, view?: IView): Promise<IncrementalSelectionId>;
    /**
     * Creates a new and active selection context for the provided selection ray.
     * The ray is created at the supplied ray origin and is cast into the scene.
     * Faces are selected if they lie along the ray.
     * Lines and points are selected if they lie within the ray's box radius.
     *
     * Note: Somewhat confusingly ray drill selection is actually a selection by volume.
     * The provided ray origin and radius are used to create a frustum to preform the selection.
     * This has some consequences. For example, the `SelectionResult`s returned by advancing a
     * ray drill selection will not have selection positions, since they were not selected at
     * a single point.
     * @param rayCssOrigin The coordinate in css pixel space for the selection ray's origin.
     * @param rayCssBoxRadius The radius around the ray in css pixel space used for line and point selection proximity.
     * @param config The configuration object used for this selection operation.
     * @param view The view to use when projecting the point into the scene.
     * @returns The handle for the selection context.
     */
    beginRayDrillSelection(rayCssOrigin: Point2, rayCssBoxRadius: number, config: IncrementalPickConfig, view?: IView): Promise<IncrementalSelectionId>;
    /**
     * Creates a new and active selection context for the provided selection volume.
     * The selection volume is a convex polyhedron defined by the bounded intersection of its half-spaces.
     * @param volumePlanes The planes used to define volume. A point p is inside the volume if and only if (plane.determineSide(p) == true) for all supplied planes.
     * @param heuristicOrigin A point used to compute distances against for ordering returned results. This is typically (but not necessarily) the center of the volume.
     * @param config The configuration object used for this selection operation.
     * @returns The handle for the selection context.
     */
    beginConvexPolyhedronSelection(volumePlanes: Plane[], heuristicOrigin: Point3, config: IncrementalPickConfig): Promise<IncrementalSelectionId>;
    /**
     * Creates a new and active selection context for the provided selection sphere.
     * @param sphereCenter The center of the selection sphere.
     * @param sphereRadius The radius of the selection sphere.
     * @param config The configuration object used for this selection operation.
     * @returns The handle for the selection context.
     */
    beginSphereSelection(sphereCenter: Point3, sphereRadius: number, config: IncrementalPickConfig): Promise<IncrementalSelectionId>;
    /**
     * Deactivates and destroys the provided selection context.
     * @param handle The selection context to destroy.
     */
    endIncrementalSelection(handle: IncrementalSelectionId): Promise<void>;
    /**
     * Adds the next batch of instances selected by the supplied selection
     * context to the selection set.
     *
     * @param handle The handle to an active area selection context.
     * @param predicate An optional function that returns `true` if a given
     * [[NodeSelectionItem]] should be added to the selection set. If
     * `false` is returned, the item will not be added.
     *
     * @returns `true` if there are possibly more items to select and
     * `false` if not.
     */
    advanceIncrementalSelection(handle: IncrementalSelectionId, predicate?: ((item: NodeSelectionItem) => Promise<boolean>) | null): Promise<boolean>;
    isSelected(item: SelectionItem): boolean;
    /**
     * Checks whether a node, or its parents, appear in the selection set or not.
     * Note: for the purposes of this function element selections on a node
     * are considered the same as node selection.
     * @param nodeId Node to check for
     * @returns `true` if the node or its parents appear in the selection set. `false` otherwise
     */
    isNodeSelected(nodeId: NodeId): boolean;
    contains(item: SelectionItem): boolean;
    /**
     * Checks if the parent of a selection item is in the selection set.
     * @param item
     * @returns parent selection item, or null if not found
     */
    containsParent(item: NodeSelectionItem): NodeSelectionItem | null;
    private _findAncestor;
    /**
     * Adds all items in a layer to the selection set.
     * @param layerName
     * @param selectionMode
     */
    selectLayer(layerName: LayerName, selectionMode: SelectionMode): void;
    /**
     * Gets all selected layers.
     */
    getSelectedLayers(): LayerName[];
    /**
     * Adds all items with an IFC type to the selection set.
     * @param genericType
     */
    selectType(genericType: GenericType, selectionMode: SelectionMode): void;
    /**
     * Gets all selected IFC types.
     */
    getSelectedTypes(): GenericType[];
    /**
     * Selects a node with the given Id.
     * @param nodeId nodeId of the node to select. Pass null to clear the selection.
     * @returns the selection type of this operation.
     */
    selectNode(nodeId: NodeId | null, selectionMode?: SelectionMode): SelectionType;
    private _triggerNullSelection;
    private _isInAxisOverlay;
    private _getNodeCounts;
    private _addToFull;
    private _addItems;
    private _addItem;
    /**
     * Manually adds an item or array of items to the selection set.
     * Triggers a selection event.
     * @param itemOrItems A selectionItem or selectionItem array that will be added to the current selection set.
     * @param suppressCallback Optional boolean param to suppress the selectionArray callbacks calls to this generate.
     */
    add(itemOrItems: NodeSelectionItem | NodeSelectionItem[] | null, suppressCallback?: boolean): void;
    private _filterItem;
    private _addImpl;
    private _removeUpdateLayers;
    private _removeUpdateTypes;
    private _removeFromFull;
    private _removeItems;
    private _removeItem;
    /**
     * Manually removes an item or an array of items from the selection set.
     * Triggers a selection event.
     * @param itemOrItems A selectionItem or an array of selection items that will be removed from the current selection set.
     * @param suppressCallback Optional boolean param to suppress the selectionArray callbacks calls to this generate.
     */
    remove(itemOrItems: NodeSelectionItem | NodeSelectionItem[], suppressCallback?: boolean): void;
    /** hidden */
    private _removeImpl;
    private static _selectionItemIsFromModelBrowser;
    /**
     * Manually adds or removes an item from the selection set.
     * Triggers a selection event.
     * @param item A selectionItem that will be added or removed from the selection set.
     */
    toggle(item: NodeSelectionItem): void;
    /**
     * Manually removes all currently selected items (if any) from the selection set and adds the supplied item.
     * Triggers a selection event.
     * @param selection A selectionItem that will become the new selection item.
     */
    set(selection: NodeSelectionItem | null): void;
    /**
     * Gets all current selection items.
     * @returns array of all selection items.
     */
    getResults(): NodeSelectionItem[];
    /**
     * Gets a selection at the specified index. The first selected item will be at index 0.
     * @param index index of selection item to get
     * @returns the selection result at the given index.
     */
    getResult(index: number): NodeSelectionItem | null;
    private _getItemFromOldest;
    private _getItemFromNewest;
    /**
     * Gets the least recent selection item.
     * @returns the least recently selected item (if any).
     */
    getFirst(): NodeSelectionItem | null;
    /**
     * Gets the most recent selection item.
     * @returns the most recently selected item (if any).
     */
    getLast(): NodeSelectionItem | null;
    /**
     * Gets the number of selection items.
     * @returns the number of selected items.
     */
    size(): number;
    /**
     * Iterates over all selection items.
     * The function passed in will be called once for every selection item and will receive the item as its parameter.
     * @param func a function to be called for every selection item.
     */
    each(func: (s: NodeSelectionItem) => void): void;
    /**
     * Removes all items from the selection set.
     * @param triggerCallback triggers a null selection callback when true.
     */
    clear(triggerCallback?: boolean): void;
    /**
     * Sets the color to be used when selecting nodes.
     * This method should not be called before the sceneReady callback has been triggered.
     * @param color the color to apply to the selected node.
     */
    setNodeSelectionColor(color: Color): Promise<void>;
    private _setNodeSelectionColor;
    /**
     * Gets the color to be used when selecting nodes.
     * @returns the color that is applied to a selected node.
     */
    getNodeSelectionColor(): Color;
    /**
     * Sets color for the node selection outline.
     * This method should not be called before the sceneReady callback has been triggered.
     * @param color the color to apply to the node selection outline.
     */
    setNodeSelectionOutlineColor(color: Color): Promise<void>;
    private _setNodeSelectionOutlineColor;
    /**
     * Gets the color to be used for outlining the node selection.
     * @returns the color for node selection outline.
     */
    getNodeSelectionOutlineColor(): Color;
    /**
     * Sets the color to use for node element selection.
     * This method should not be called before the sceneReady callback has been triggered.
     * @param color the color to apply to selected node elements.
     */
    setNodeElementSelectionColor(color: Color): Promise<void>;
    private _setNodeElementSelectionColor;
    /**
     * Gets the color to use for face and line selection.
     * @returns the color used for face and line selection.
     */
    getNodeElementSelectionColor(): Color;
    /**
     * Gets the color to use for outlining node element selection.
     * This method should not be called before the sceneReady callback has been triggered.
     * @param color the color used for outlining face and line selection.
     */
    setNodeElementSelectionOutlineColor(color: Color): Promise<void>;
    private _setNodeElementSelectionOutlineColor;
    /**
     * Gets the color to use for outlining face and line selection.
     * @returns color the color used for outlining face and line selection.
     */
    getNodeElementSelectionOutlineColor(): Color;
    /**
     * Gets whether face elements will be highlighted on selection.
     * @returns boolean the current value for face element selection highlighting.
     */
    getHighlightFaceElementSelection(): boolean;
    /**
     * Sets whether face elements should be highlighted when a selection occurs.
     * By default the system will automatically highlight face elements associated with a selection item.
     * @param highlightFaceElementSelection value indicating whether selected face elements should be highlighted.
     */
    setHighlightFaceElementSelection(highlightFaceElementSelection: boolean): Promise<void>;
    /**
     * Sets the highlighting mode for selected nodes. The default behavior is to highlight the node and render an overlay outline.
     * This method should not be called before the sceneReady callback has been triggered.
     * @param highlightMode the highlighting mode that will be applied to selected nodes.
     */
    setNodeSelectionHighlightMode(highlightMode: SelectionHighlightMode): Promise<void>;
    private _setNodeSelectionHighlightMode;
    /**
     * Gets the highlighting mode for selected nodes.
     * @returns the current
     */
    getNodeSelectionHighlightMode(): SelectionHighlightMode;
    /**
     * Sets the highlighting mode for selected node elements.
     * The default behavior is to highlight the node element and render an overlay outline.
     * This method should not be called before the sceneReady callback has been triggered.
     * @param highlightMode the highlighting mode that will be applied to selected nodes.
     */
    setNodeElementSelectionHighlightMode(highlightMode: SelectionHighlightMode): Promise<void>;
    private _setNodeElementSelectionHighlightMode;
    getNodeElementSelectionHighlightMode(): SelectionHighlightMode;
    /**
     * Sets whether nodes should be highlighted when a selection occurs.
     * By default, the system will automatically highlight the node associated with a selection item.
     * @param highlightSelection value indicating whether selected nodes should be highlighted.
     */
    setHighlightNodeSelection(highlightSelection: boolean): Promise<void>;
    /**
     * Gets whether nodes will be highlighted on selection.
     * @returns the current value for node selection highlighting.
     */
    getHighlightNodeSelection(): boolean;
    /**
     * Gets whether line elements will be highlighted on selection.
     * @returns boolean the current value for line element selection highlighting.
     */
    getHighlightLineElementSelection(): boolean;
    /**
     * Gets whether point elements will be highlighted on selection.
     * @returns boolean the current value for point element selection highlighting.
     */
    getHighlightPointElementSelection(): boolean;
    /**
     * Sets whether line elements should be highlighted when a selection occurs.
     * By default the system will automatically highlight line elements associated with a selection item.
     * @param highlightLineElementSelection value indicating whether selected line elements should be highlighted.
     */
    setHighlightLineElementSelection(highlightLineElementSelection: boolean): Promise<void>;
    /**
     * Sets whether point elements should be highlighted when a selection occurs.
     * By default the system will automatically highlight point elements associated with a selection item.
     * @param highlightPointElementSelection value indicating whether selected point elements should be highlighted.
     */
    setHighlightPointElementSelection(highlightPointElementSelection: boolean): Promise<void>;
    /**
     * Sets the pick tolerance in pixels for line and point picking.
     * If a line or point is within this pixel tolerance of the click point,
     * it will be prioritized over the face at the click position.
     *
     * The default value is 20.
     * @param tolerance Tolerance value in pixels
     */
    setPickTolerance(tolerance: number): void;
    /**
     * Gets the pick tolerance in pixels for line and point picking.
     *
     * The default value is 20.
     * @returns number Pick tolerance value in pixels
     */
    getPickTolerance(): number;
    /**
     * Exports selection objects so that they may be loaded back into the the system at a later time using loadSelectionData.
     * @returns exported selection data.
     */
    exportSelectionData(): object[];
    /**
     * Loads serialized selection items exported using [[exportSelectionData]] back into the [[SelectionManager]].
     * The current selection will be cleared. A selection event will be triggered for each loaded item.
     * This method should not be called before the [[CallbackMap.modelStructureReady]] callback has been triggered.
     * @param datas data to be imported in the form of a JavaScript object or JSON string
     */
    loadSelectionData(datas: object[] | string): void;
    private _pathToParent;
    private _removeImplicit;
    private _removeDescendants;
    private _removeDescendantsRecursive;
    private _processSelection;
    private _clearHighlight;
    private _updateHighlight;
    private _updateItemHighlight;
    private _updateHighlightingMode;
    private _onSubtreeLoaded;
}
