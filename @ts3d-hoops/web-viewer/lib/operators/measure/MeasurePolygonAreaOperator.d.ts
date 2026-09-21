import { Point2 } from '@ts3d-hoops/common';
import { MeasureManager } from '../../MeasureManager';
import { KeyInputEvent } from '../../event/KeyInputEvent';
import { MouseInputEvent } from '../../event/MouseInputEvent';
import { OperatorBase } from '../OperatorBase';
import { MeasurePolygonAreaMarkup } from '../markup/measure/MeasurePolygonAreaMarkup';
import { MeasurePolygonAreaAnchor } from './types';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
/**
 * This operator allows you to create a polygon and measure its area.
 * Click to add points to the polygon. A cursor will show where the point will be placed.
 * The operator will perform vertex snapping by default. Holding down the alt key will disable this feature.
 * To complete a measurement, double click when placing a point.
 * When there is no active measurement being created, click on a text box to drag and reposition it relative to its anchor point.
 * If a measurement is currently being created, pressing the Escape key will discard it, otherwise the last created measurement will be discarded.
 */
export declare class MeasurePolygonAreaOperator extends OperatorBase {
    private _cursor;
    private _markupItem;
    private _measureManager;
    private _cameraInteractionActive;
    private _textShapeOffset;
    private _anchor;
    private _dragPlane;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView, measureManager: MeasureManager);
    /** @hidden */
    getMarkupItem(): MeasurePolygonAreaMarkup | null;
    /** Sets the anchor type that will be set for markups created by this operator. */
    setAnchor(anchor: MeasurePolygonAreaAnchor): void;
    /**
     * Determine if the given mouse event should cause snapping. This is influenced by
     * the snap configuration enabled value.
     */
    private _useSnapping;
    private _getLastSelectedPoint;
    private _createNewMarkupItem;
    private _updateMarkupItem;
    private _updateMeasurementItem;
    private _isDraggingText;
    /** @hidden */
    onMouseDown(event: MouseInputEvent): void;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): Promise<void>;
    /** @hidden */
    onDoubleClick(_event: MouseInputEvent): void;
    private _dragMarkupText;
    private _finalizeMeasurement;
    private _updateAnchor;
    private _calculateSelectionPlane;
    private _calculateAnchorPos;
    _clearMeasurement(): void;
    private _draw;
    protected _pickExisting(selectPoint: Point2): boolean;
    /** @hidden */
    onActivate(): void;
    /** @hidden */
    onDeactivate(): void;
    /** @hidden */
    onKeyDown(event: KeyInputEvent): void;
    private _onBeginInteraction;
    private _onEndInteraction;
}
