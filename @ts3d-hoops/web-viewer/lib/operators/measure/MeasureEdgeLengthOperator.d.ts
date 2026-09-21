import { MeasureManager } from '../../MeasureManager';
import { KeyInputEvent } from '../../event/KeyInputEvent';
import { MouseInputEvent } from '../../event/MouseInputEvent';
import { OperatorBase } from '../OperatorBase';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class MeasureEdgeLengthOperator extends OperatorBase {
    private readonly _measureManager;
    private readonly _pickConfig;
    private readonly _moveSelectionAction;
    private _lengthMarkup;
    private _edgeMarkup;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView, measureManager: MeasureManager);
    /** @hidden */
    onActivate(): void;
    private _unregisterEdgeMarkup;
    private _registerEdgeMarkup;
    private _resetEdgeMarkup;
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
