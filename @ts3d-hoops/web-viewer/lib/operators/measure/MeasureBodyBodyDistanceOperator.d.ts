import { MeasureManager } from '../../MeasureManager';
import { KeyInputEvent } from '../../event/KeyInputEvent';
import { MouseInputEvent } from '../../event/MouseInputEvent';
import { OperatorBase } from '../OperatorBase';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
/**
 * This operator allows you to measure the minimum distance between two bodies.
 * Moving the mouse over the model will highlight the body that will be measured.
 * Clicking will select the first node to be measured, it will stay highlighted as
 * you move the mouse away. Clicking a second time on a different body will begin the
 * measurement. Once the measurement is completed you can move the mouse to position the
 * measurement text box. The markup drawn represents the shortest distance between the
 * two bodies you selected. Clicking a final time will place the measurement text box
 * and finalize the measurement.
 */
export declare class MeasureBodyBodyDistanceOperator extends OperatorBase {
    private readonly _measureManager;
    private readonly _moveSelectionAction;
    private _currentMoveHighlight;
    private _currentSelectHighlight;
    private _markup;
    constructor(viewer: IWebViewer, view: IView, measureManager: MeasureManager);
    private _unsetCurrentMoveHighlight;
    private _unsetCurrentSelectionHighlight;
    private _performMoveSelection;
    private _performUpSelection;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    private _onMouseUpImpl;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): Promise<void>;
    /** @hidden */
    setDraggingEnabled(dragging: boolean): void;
    /** @hidden */
    onKeyUp(_event: KeyInputEvent): void;
    /** @hidden */
    onKeyDown(event: KeyInputEvent): void;
    /** @hidden */
    setHandled(): boolean;
    /** @hidden */
    onDeactivate(): void;
}
