import { Point2 } from '@ts3d-hoops/common';
import { MeasureManager } from '../../MeasureManager';
import { KeyInputEvent } from '../../event/KeyInputEvent';
import { MouseInputEvent } from '../../event/MouseInputEvent';
import { OperatorBase } from '../OperatorBase';
import { MeasurePolylineDistanceMarkup } from '../markup/measure/MeasurePolylineDistanceMarkup';
import { MeasurePolylineDistanceAnchor } from './types';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
/**
 * This operator allows you to create a polyline and measure its distance.
 * Click to add points to the polyline.  A cursor will show where the point will be placed.
 * The operator will perform vertex snapping by default.  Holding down the alt key will disable this feature.
 * To complete a measurement, double click when placing a point to create an open line measurement, or single click on the first point to create a closed loop.
 * When there is no active measurement being created, click on a text box to drag and reposition it relative to its anchor point.
 * If a measurement is currently being created, pressing the Escape key will discard it, otherwise the last created measurement will be discarded.
 */
export declare class MeasurePolylineDistanceOperator extends OperatorBase {
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
    getMarkupItem(): MeasurePolylineDistanceMarkup | null;
    /** Sets the anchor type that will be set for markups created by this operator. */
    setAnchor(anchor: MeasurePolylineDistanceAnchor): void;
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
