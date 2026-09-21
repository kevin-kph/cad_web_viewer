import { MouseInputEvent, MouseWheelInputEvent } from '../../event/MouseInputEvent';
import { TouchInputEvent } from '../../event/TouchInputEvent';
import { OperatorBase } from '../OperatorBase';
import { CameraOrbitOperator } from './CameraOrbitOperator';
import { CameraPanOperator } from './CameraPanOperator';
import { CameraZoomOperator } from './CameraZoomOperator';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class CameraNavigationOperator extends OperatorBase {
    private _orbitOperator;
    private _panOperator;
    private _zoomOperator;
    private _activeOperator;
    private _activeTouchCount;
    private _touchMoveCount;
    private _returnToOrbit;
    private _bimNavigationEnabled;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView, orbitOperator: CameraOrbitOperator, panOperator: CameraPanOperator, zoomOperator: CameraZoomOperator);
    /**
     * When BIM navigation is enabled, the following controls for orbit, pan, and zoom are set:
     * Left mouse button: orbit
     * Middle mouse wheel: zoom
     * Middle mouse button: pan
     * Right mouse button: zoom
     * @param bimNavigation
     */
    setBimNavigationEnabled(bimNavigation: boolean): void;
    private _setBimCamera;
    /**
     * Returns true if BIM navigation is enabled.
     */
    getBimNavigationEnabled(): boolean;
    /** @hidden */
    onViewOrientationChange(): void;
    /** @hidden */
    onMouseDown(event: MouseInputEvent): void;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
    /** @hidden */
    onMousewheel(event: MouseWheelInputEvent): Promise<void>;
    /** @hidden */
    onTouchStart(event: TouchInputEvent): void;
    /** @hidden */
    onTouchMove(event: TouchInputEvent): Promise<void>;
    /** @hidden */
    onTouchEnd(event: TouchInputEvent): void;
    /** @hidden */
    stopInteraction(): void | Promise<void>;
    private _setActiveOperatorForMouseInput;
    /** @hidden */
    onDeactivate(): void;
}
