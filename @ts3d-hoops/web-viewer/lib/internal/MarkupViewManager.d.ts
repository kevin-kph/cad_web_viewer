import { Color } from '@ts3d-hoops/common';
import { ExplodeManager } from '../ExplodeManager';
import { MarkupTypeManager } from '../MarkupTypeManager';
import { SheetManager } from '../SheetManager';
import { MarkupItemManager } from '../markup/MarkupItemManager';
import { MarkupView } from '../markup/MarkupView';
import { NodeId, SheetId, Uuid, VisibilityState } from '../types';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
import { ICallbackManager } from '../core/ICallbackManager';
import { ICuttingManager } from '../core/ICuttingManager';
export declare class MarkupViewManager extends MarkupTypeManager {
    private _markupViews;
    private _markupItemManager;
    private _callbackManager;
    private _explodeManager;
    private _cuttingManager;
    private _viewer;
    private _sheetManager;
    private _defaultViewCounter;
    constructor(viewer: IWebViewer, markupItemManager: MarkupItemManager, callbackManager: ICallbackManager, explodeManager: ExplodeManager, cuttingManager: ICuttingManager, sheetManager: SheetManager);
    private _initEvents;
    getView(uniqueId: Uuid): MarkupView | null;
    getViewKeys(): Uuid[];
    loadData(viewArray: object[]): Promise<boolean[]>;
    exportMarkup(): object[];
    createView(name: string | undefined, view: IView, triggerEvent?: boolean, sheetId?: SheetId | null, visibilityState?: VisibilityState | null, colorMap?: Map<NodeId, Color> | null, snapshotImage?: HTMLImageElement | null): MarkupView;
    private _activateSheet;
    private _activateViewImpl;
    private _activateView;
    activateView(uniqueId: Uuid, view: IView, duration?: number): Promise<boolean>;
    /** This is a helper for `activateView`. */
    private _setActiveView;
    deleteView(uniqueId: Uuid): boolean;
    private _createDefaultViewName;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
}
