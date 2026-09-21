import { Color } from '@ts3d-hoops/common';
import { NodeId, SheetId, ComparisonConfig } from './types';
import { MarkupManager } from './MarkupManager';
import { IWebViewer } from './core/IWebViewer';
import { IScEngine } from './core/IScEngine';
import { ICallbackManager } from './core/ICallbackManager';
export declare class SheetManager {
    private readonly _viewer;
    private readonly _callbackManager;
    private _markupManager;
    private _activeSheetId;
    private _backgroundSheetMeshId;
    private _sheetIds;
    private _backgroundSheetEnabled;
    private _backgroundSelectionEnabled;
    private _backgroundColor;
    private _sheetColor;
    private _sheetShadowColor;
    private _engine;
    constructor(viewer: IWebViewer, engine: IScEngine, callbackManager: ICallbackManager, disableAutomaticBackgroundSheets: boolean);
    /**
     * @returns an array of 2D [[SheetId]]s.
     */
    getSheetIds(): NodeId[];
    /**
     * Returns Ids of sheet nodes which contain 3D data.
     */
    get3DNodes(): NodeId[];
    /**
     * Deactivate sheets and only display 3D content
     * @param triggerCallback triggers a "sheetDeactivated" callback if true
     * @param ignoreFitNodes camera will not fit nodes if true
     * @returns promise that resolves when the operation has completed
     */
    deactivateSheets(triggerCallback?: boolean, ignoreFitNodes?: boolean): Promise<void>;
    /**
     * Sets the id of the current active sheet
     * @param activeSheetId id of the sheet which will be activated.
     * @param isolateNodes indicates whether the nodes in the sheet should be isolated
     * @param fitNodes indicates whether a fit world should be performed after isolating the nodes.  Note: This parameter has no effect if `isolateNodes` is `false`.
     * @returns promise that resolves when the operation has completed
     */
    setActiveSheetId(activeSheetId: NodeId, isolateNodes?: boolean, fitNodes?: boolean): Promise<void>;
    private _activateSheetId;
    /**
     * @returns gets the id of the current active sheet. null if none has been set.
     */
    getActiveSheetId(): NodeId | null;
    /**
     * @returns true if a drawing sheet is activated, false otherwise
     */
    isDrawingSheetActive(): boolean;
    /** @hidden */
    setMarkupManager(markupManager: MarkupManager): void;
    private _createBackgroundSheetMesh;
    private _createBackgroundSheetMatrix;
    private _createBackgroundSheetInstance;
    /**
     * Deletes background sheets described by sheetTypes, but only if they exist.
     * @param sheetTypes An array with the sheets to delete. Omitting will delete all sheets.
     */
    private _deleteBackgroundSheetInstances;
    /**
     *  Creates the sheet-type into our array, or if the sheet already exists updates the necessary state values
     */
    private _createOrUpdateSheet;
    /**
     * Refreshes the background sheets used for 2D drawings.
     */
    private _refreshBackgroundSheets;
    /**
     * Sets custom sheet colors.
     * @param backgroundColor viewer background color.
     * @param sheetColor sheet background color.
     * @param sheetShadowColor sheet shadow effect color.
     */
    setSheetColors(backgroundColor: Color, sheetColor: Color, sheetShadowColor: Color): Promise<void>;
    /**
     * Gets the sheet Background Color.
     */
    getSheetBackgroundColor(): Color;
    /**
     * Gets the Sheet Color.
     */
    getSheetColor(): Color;
    /**
     * Gets the Sheet Shadow Color.
     */
    getSheetShadowColor(): Color;
    /**
     * Enables or disables the background sheet used for 2D drawings.
     */
    setBackgroundSheetEnabled(enabled: boolean): Promise<void>;
    /**
     * Gets the current state of the background sheet.
     * @returns `true` if enabled and `false` otherwise.
     */
    getBackgroundSheetEnabled(): boolean;
    /**
     * Sets whether the background for 2D drawings is selectable. By default it is not.
     * 2D drawings have an invisible selection plane with a single face. Note that this setting
     * is unaffected by the background-sheet enable setting.
     */
    setBackgroundSelectionEnabled(enabled: boolean): Promise<void>;
    /** Gets the current state of the background sheet.
     * @returns `true` if enabled and `false` otherwise.
     */
    getBackgroundSelectionEnabled(): boolean;
    /**
     * Enables a visual comparison of two drawing sheets. The nodes specified
     * by `sheetId1` are filled with one color, the nodes specified by
     * `sheetId2` with another color, and overlapping areas are filled
     * with a third color.
     *
     * See [[endSheetComparison]], [[View.startComparison]].
     *
     * @param sheetId1 the drawing sheet to compare against `sheetId2`
     * @param sheetId2 the drawing sheet to compare against `sheetId1`
     * @param config settings controlling the behavior of the comparison
     */
    startComparison(sheetId1: SheetId, sheetId2: SheetId, config?: ComparisonConfig): Promise<void>;
    /**
     * Disables a visual comparison of two drawing sheets enabled by
     * [[startSheetComparison]]. The `Promise` returned by that function
     * should be waited upon before calling [[endSheetComparison]].
     */
    endComparison(): Promise<void>;
}
