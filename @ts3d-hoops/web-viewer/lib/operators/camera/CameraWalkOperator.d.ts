import { KeyInputEvent } from '../../event/KeyInputEvent';
import { MouseInputEvent, MouseWheelInputEvent } from '../../event/MouseInputEvent';
import { TouchInputEvent } from '../../event/TouchInputEvent';
import { Button } from '../../types';
import { CameraWalkBaseOperator } from './CameraWalkBaseOperator';
import { ViewKey } from '@ts3d-hoops/streamcache';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class CameraWalkOperator extends CameraWalkBaseOperator {
    private _timerId;
    private _walkButton;
    private _previousTimestamp;
    private _activeTouchCount;
    private _maxDistance;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /** @hidden */
    onActivate(): Promise<void>;
    /** @hidden */
    onKeyDown(event: KeyInputEvent): void;
    /** @hidden */
    onDeactivate(): Promise<void>;
    private _checkProjection;
    /** @hidden */
    onMouseDown(event: MouseInputEvent): void;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
    /** @hidden */
    onTouchStart(event: TouchInputEvent): void;
    /** @hidden */
    onTouchMove(event: TouchInputEvent): Promise<void>;
    /** @hidden */
    onTouchEnd(event: TouchInputEvent): void;
    /** @hidden */
    onMousewheel(event: MouseWheelInputEvent): void;
    /** @hidden */
    stopWalking(): void;
    /** @hidden */
    _testWalk(walkSpeed: number, walkDuration: number, button: Button, viewKey?: ViewKey): Promise<void>;
    /** @hidden */
    protected _onTick(): void;
    private _adjustTilt;
    private _resetCameraTarget;
}
