import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
import { MouseInputEvent } from '../event/MouseInputEvent';
import { OperatorBase } from './OperatorBase';
export declare class FloorplanOperator extends OperatorBase {
    private readonly _manager;
    private _draggingAvatar;
    private _restrictToAvatar;
    private _floorLocked;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /** @hidden */
    onMouseDown(event: MouseInputEvent): Promise<void>;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): Promise<void>;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    /**
     * Set whether or not dragging is restricted to the avatar. If true the operator will only function if
     * the selection begins on the avatar
     */
    restrictToAvatar(restrict: boolean): void;
}
