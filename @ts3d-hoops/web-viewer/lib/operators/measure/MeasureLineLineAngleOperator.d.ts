import { MeasureManager } from '../../MeasureManager';
import { KeyInputEvent } from '../../event/KeyInputEvent';
import { MouseInputEvent } from '../../event/MouseInputEvent';
import { OperatorBase } from '../OperatorBase';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
/**
 * This operator allows you to measure the angle between two lines.
 * The measured angle can be between 0 - 180 degrees.
 * Click to add points to create the lines. A cursor will show where the next point will be placed.
 * The operator will perform vertex snapping by default. Holding down the alt key will disable this feature.
 * The first point placed is the common point between the lines.
 * The second and third points placed create two lines using the first point.
 * After the third point has been placed, the measurement will be finalized, and the angle between the two lines will be displayed.
 * If a measurement is currently being created, pressing the Escape key will discard it, otherwise the last created measurement will be discarded.
 */
export declare class MeasureLineLineAngleOperator extends OperatorBase {
    private _cursor;
    private _markupItem;
    private _measureManager;
    private _cameraInteractionActive;
    constructor(viewer: IWebViewer, view: IView, measureManager: MeasureManager);
    private _onBeginInteraction;
    private _onEndInteraction;
    /**
     * Determine if the given mouse event should cause snapping.
     * This is influenced by the snap configuration enabled value.
     */
    private _useSnapping;
    private _addPoint;
    private _updateMarkupSelectionPosition;
    onMouseMove(event: MouseInputEvent): Promise<void>;
    onMouseUp(event: MouseInputEvent): Promise<void>;
    onKeyDown(event: KeyInputEvent): void;
    private _clearMeasurement;
    setHandled(): boolean;
    onActivate(): void;
    onDeactivate(): void;
}
