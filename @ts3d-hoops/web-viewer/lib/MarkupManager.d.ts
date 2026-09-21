import { Point2, Color } from '@ts3d-hoops/common';
import { LineManager } from './LineManager';
import { MarkupTypeManager } from './MarkupTypeManager';
import { MeasureManager } from './MeasureManager';
import { SheetManager } from './SheetManager';
import { MarkupItem } from './markup/MarkupItem';
import { MarkupItemManager } from './markup/MarkupItemManager';
import { MarkupRenderer } from './markup/MarkupRenderer';
import { MarkupView } from './markup/MarkupView';
import { NoteTextManager } from './operators/markup/note/NoteTextManager';
import { NodeId, Uuid, MarkupData, VisibilityState } from './types';
import { IView } from './core/IView';
import { IWebViewer } from './core/IWebViewer';
import { ICallbackManager } from './core/ICallbackManager';
/**
 * This class provides an interface into working with markup in the viewer. More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/markup/markup-basics.html).
 */
export declare class MarkupManager {
    private readonly _viewManager;
    private readonly _itemManager;
    private readonly _noteTextManager;
    private readonly _measurementManager;
    private readonly _lineManager;
    private readonly _renderer;
    private readonly _viewer;
    private readonly _callbackManager;
    private readonly _sheetManager;
    private readonly _markupTypeMap;
    /** @hidden */
    constructor(measurementManager: MeasureManager, lineManager: LineManager, callbackManager: ICallbackManager, sheetManager: SheetManager, noteTextManager: NoteTextManager, viewer: IWebViewer);
    /**
     * Return the viewer that is associated with this markup manager.
     *
     * @public
     * @readonly
     * @type {IWebViewer}
     */
    get viewer(): IWebViewer;
    /**
     * Registers a MarkupTypeManager to add markup to exported data.
     * @param markupTypeManager
     */
    registerMarkupTypeManager(markupType: string, markupTypeManager: MarkupTypeManager): void;
    /**
     * Registers a factory to load custom markups in markup views when using loadMarkupData.
     * @param className identifier of the markup item type, this is what's returned by getClassName function of MarkupItem.
     * @param factory a function to create the markup object from a json object outputed by toJson function of MarkupItem.
     */
    registerMarkupFactory(className: string, factory: (obj: any, viewer: IWebViewer) => MarkupItem): void;
    /**
     * Creates a new markup view based on a given view, line, and face visibility values.
     * @param view the reference view for values used to create the markup view (camera, line and face visibility).
     * @param name optional name for the markup view. If omitted or null, the system will generate a default name
     * @param triggerEvent optional parameter indicating whether a [[CallbackMap.viewCreated]] event should be triggered. This parameter defaults to true
     * @param visibilityState optional parameter
     * @returns Unique identifier for the new view
     */
    createMarkupView(view: IView, name?: string, triggerEvent?: boolean, visibilityState?: VisibilityState | null, colorMap?: Map<NodeId, Color> | null, snapshotImage?: HTMLImageElement | null): Uuid;
    /**
     * Gets a [[MarkupView]] object from the viewer.
     * @param uniqueId the handle for the view object to retreive
     * @returns [[MarkupView]] object for the corresponding ID or null if no view was found
     */
    getMarkupView(uniqueId: Uuid): MarkupView | null;
    /**
     * @returns an array of string keys for all markup views
     */
    getMarkupViewKeys(): Uuid[];
    /**
     * Activates a [[MarkupView]] in the given view.
     * @param uniqueId the handle for the [[MarkupView]] object to activate
     * @param view the view to activate the markup view
     * @param duration the time in milliseconds for the transition to this view
     */
    activateMarkupViewWithPromise(uniqueId: Uuid, view: IView, duration?: number): Promise<boolean>;
    /**
     * Returns the currently active [[MarkupView]].
     * @returns [[MarkupView]] object for the currently active view, or null if no view is active
     */
    getActiveMarkupView(view: IView): MarkupView | null;
    /**
     * Deletes a [[MarkupView]] object.
     * @param uniqueId the handle for the view object to delete
     * @returns true if a [[MarkupView]] with the supplied uniqueId was deleted, false otherwise
     */
    deleteMarkupView(uniqueId: Uuid): boolean;
    /**
     * Registers a [[MarkupItem]] to be rendered with the 3D view in the given view.
     * @param markupItem the item to register
     * @param view the view where display markup
     * @returns unique handle to this [[MarkupItem]].
     */
    registerMarkup(markupItem: MarkupItem, view: IView): Uuid;
    /**
     * Unregisters a [[MarkupItem]]. It will no longer be rendered with the 3D view.
     * @param uniqueId unique handle to the object that was returned from [[registerMarkup]]
     * @param view the view the markup belongs to
     */
    unregisterMarkup(uniqueId: Uuid, view: IView): void;
    /**
     * Add an HTML element to the markup element layer of a given view. The element will have its ID set to a system generated unique identifier.
     * @param element the HTML Element to add
     * @param view the view where to add the HTML element
     * @returns system generated unique identifier which is the id of the passed in object
     */
    addMarkupElement(element: HTMLElement, view: IView): Uuid;
    /**
     * Removes a markup element from the markup element layer of the given view
     * @param id unique handle to the object that was returned from [[registerMarkup]]
     * @param view the view where to remove the HTML element
     */
    removeMarkupElement(id: Uuid, view: IView): void;
    /**
     * Redraws the markup without rendering the scene. Useful when markup is added or removed but the scene is not affected.
     * @param view the view where markups need to be redrawn
     */
    refreshMarkup(view: IView): void;
    /**
     * Redraws all views where the given markup view is active. Scene is not rendered.
     * Useful when something in a markup view has been updated and views need to reflect the changes.
     * @param markupView the markup view that has changed.
     */
    refreshMarkupView(markupView: MarkupView): void;
    updateLater(view: IView): void;
    /**
     * Picks a [[MarkupItem]]. Tests scene based and markup attached to the active view (if any)
     * @param point position to pick against
     * @param view view where the test is triggered
     * @returns [[MarkupItem]] that was selected or null if none was picked
     */
    pickMarkupItem(point: Point2, view: IView): MarkupItem | null;
    /**
     * Gets the pick tolerance in pixels for picking a [[MarkupItem]]
     * @returns Current tolerance
     */
    getPickTolerance(): number;
    /**
     * Sets the pick tolerance in pixels for picking a [[MarkupItem]]
     * @param tolerance The new tolerance
     */
    setPickTolerance(tolerance: number): void;
    /**
     * Selects a [[MarkupItem]]. Pass null to clear the selection.
     * Will refresh all views with markups.
     * @param markupItem The [[MarkupItem]] to select.
     * @param view The view the selection come from.
     */
    selectMarkup(markupItem: MarkupItem | null, view: IView): void;
    /**
     * Returns the currently selected [[MarkupItem]], or null if nothing is currently selected
     * @returns selected [[MarkupItem]]
     */
    getSelectedMarkup(): MarkupItem | null;
    /**
     * export markup from the viewer
     * @returns Serialized markup objects
     */
    exportMarkup(): MarkupData;
    /**
     * Loads markup data into the viewer.
     * @param json markup data to be loaded into the viewer
     */
    loadMarkupData(json: string | MarkupData): Promise<boolean>;
    private _loadMarkupData;
    /**
     * Returns a the interface to the [[MarkupRenderer]].
     * @returns [[MarkupRenderer]] interface
     */
    getRenderer(): MarkupRenderer;
    /** @hidden */
    _shutdown(): void;
    /** @hidden */
    _update(): void;
    /** @hidden */
    _setActiveMarkupView(view: IView, markupView: MarkupView | null): Promise<void>;
    /** @hidden */
    _getItemManager(): MarkupItemManager;
    /** @hidden */
    _viewDeleted(view: IView): void;
}
