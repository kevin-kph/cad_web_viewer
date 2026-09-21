import { MeasureManager } from '../../MeasureManager';
import { KeyInputEvent } from '../../event/KeyInputEvent';
import { MouseInputEvent } from '../../event/MouseInputEvent';
import { OperatorBase } from '../OperatorBase';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class MeasurePointPointDistanceOperator extends OperatorBase {
    private readonly _measureManager;
    private _measureMarkup;
    private _cursor;
    private _cameraInteractionActive;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView, measureManager: MeasureManager);
    private _onBeginInteraction;
    private _onEndInteraction;
    private _getStage;
    private _draw;
    private _finalizeMeasurement;
    private _getFirstPickPosition;
    private _updateMeasurementPoints;
    /**
     * Determine if the given mouse event should cause snapping. This is influenced by
     * the snap configuration enabled value.
     */
    private _useSnapping;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): Promise<void>;
    /** @hidden */
    onKeyUp(_event: KeyInputEvent): void;
    private _clearMeasurement;
    /** @hidden */
    onKeyDown(event: KeyInputEvent): void;
    /** @hidden */
    setHandled(): boolean;
    /** @hidden */
    onActivate(): void;
    /** @hidden */
    onDeactivate(): void;
}
