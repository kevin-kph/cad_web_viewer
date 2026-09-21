import { MeasureManager } from '../../MeasureManager';
import { KeyInputEvent } from '../../event/KeyInputEvent';
import { MouseInputEvent } from '../../event/MouseInputEvent';
import { OperatorBase } from '../OperatorBase';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class MeasureFaceFaceDistanceOperator extends OperatorBase {
    private readonly _measureManager;
    private readonly _moveSelectionAction;
    private _currentHighlight;
    private _markup;
    constructor(viewer: IWebViewer, view: IView, measureManager: MeasureManager);
    private _unsetCurrentHighlight;
    private _performMoveSelection;
    private _performUpSelection;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    private _onMouseUpImpl;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
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
