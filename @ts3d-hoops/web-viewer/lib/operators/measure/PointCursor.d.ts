import { Point2, Point3 } from '@ts3d-hoops/common';
import { CursorMarkup } from '../markup/CursorMarkup';
import { SelectionPoints } from './SelectionPoints';
import { SnappingConfig } from './types';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class PointCursor {
    private _viewer;
    private _view;
    _cursorMarkup: CursorMarkup | null;
    readonly snappingConfig: SnappingConfig;
    private readonly _updateCursorSpriteAction;
    constructor(viewer: IWebViewer, view: IView);
    getSelectionCursorPoints(mousePosition: Point2, useSnapping: boolean, previousPickPoint: Point3 | null): Promise<SelectionPoints | null>;
    updateCursorSprite(mousePosition: Point2, useSnapping: boolean, firstSelectedPoint: Point3 | null): void;
    private _updateCursorSpriteImpl;
    draw(): void;
    activateCursorSprite(enable: boolean): void;
    /**
     * Finds the best point to use for the given lineEntity given the snapping behavior and settings.
     */
    private _getLineSnapPoint;
    private _clearCursorMarkup;
    onOperatorActivate(): void;
    onOperatorDeactivate(): void;
}
