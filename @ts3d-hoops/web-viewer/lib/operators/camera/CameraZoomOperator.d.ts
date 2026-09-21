import { MouseInputEvent, MouseWheelInputEvent } from '../../event/MouseInputEvent';
import { TouchInputEvent } from '../../event/TouchInputEvent';
import { OperatorBase } from '../OperatorBase';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class CameraZoomOperator extends OperatorBase {
    private _mouseMoveZoomDelta;
    private _mouseWheelZoomDelta;
    private _pinchZoomModifier;
    private _zoomToMousePosition;
    private _dollyZoomEnabled;
    private _adjustCameraTarget;
    private _preserveViewAngle;
    private _mouseMoveZoomFactor;
    private _mouseWheelZoomFactor;
    private _secondaryTouchId;
    private _lastTouch1;
    private _lastTouch2;
    private _prevLen;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /**
     * When true, scrolling up will zoom towards the model.
     * @param inverted
     */
    setMouseWheelZoomInverted(inverted: boolean): void;
    getMouseWheelZoomInverted(): boolean;
    /**
     * When true, moving the mouse up will zoom towards the model.
     * @param inverted
     */
    setMouseMoveZoomInverted(inverted: boolean): void;
    getMouseMoveZoomInverted(): boolean;
    /**
     * Sets the delta to zoom when moving the mouse
     * @param delta
     */
    setMouseMoveZoomDelta(delta: number): void;
    /**
     * Gets the mouse move zoom delta
     * @returns number
     */
    getMouseMoveZoomDelta(): number;
    /**
     * Sets the delta to zoom when scrolling
     * @param delta
     */
    setMouseWheelZoomDelta(delta: number): void;
    /**
     * Gets the scrollwheel zoom delta
     * @returns number
     */
    getMouseWheelZoomDelta(): number;
    /**
     * When set, the zoom will be towards the mouse position. When not set, the zoom will be from the center of the screen.
     * @param zoom
     */
    setZoomToMousePosition(zoom: boolean): void;
    /**
     * @returns boolean When true, the zoom will be towards the mouse position. When false, the zoom will be towards the center of the screen.
     */
    getZoomToMousePosition(): boolean;
    /**
     * When dolly zoom is enabled, the camera position will move towards the camera target when zooming.
     * @param dollyZoomEnabled Sets the dolly zoom status to enabled.
     */
    setDollyZoomEnabled(dollyZoomEnabled: boolean): void;
    /**
     * Returns true if dolly zoom is enabled.
     */
    getDollyZoomEnabled(): boolean;
    /**
     * When enabled, the camera target will be updated to the selection position while zooming.
     * This can provide a better zoom behavior in perspective projection mode,
     * but comes at the cost of performing a selection on the model during each mouse scroll,
     * which may not be ideal for performance on large models.
     *
     * This setting is disabled by default.
     */
    setMouseWheelAdjustCameraTarget(value: boolean): void;
    /**
     * Returns whether the camera target will be updated to the selection
     * position while zooming. See [[setMouseWheelAdjustCameraTarget]].
     */
    getMouseWheelAdjustCameraTarget(): boolean;
    /**
     * Sets whether to maintain a constant view angle while zooming. If
     * enabled, when zooming causes the camera's field of view to shrink or
     * grow, the camera's position will also be moved toward or away from
     * the target, respectively.
     *
     * This may prevent confusing camera behavior when perspective
     * projection is used or might be used. When using only orthographic
     * projection, it is better to disable this.
     *
     * If mouse wheel zoom is being using in conjunction with window zoom
     * this setting should be the same in both.
     *
     * This setting is enabled by default.
     */
    setPreserveViewAngle(value: boolean): void;
    /**
     * Gets whether to maintain a constant view angle while zooming. See
     * [[setPreserveViewAngle]].
     */
    getPreserveViewAngle(): boolean;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): Promise<void>;
    /** @hidden */
    onMousewheel(event: MouseWheelInputEvent): Promise<void>;
    /** @hidden */
    onTouchStart(event: TouchInputEvent): void;
    /** @hidden */
    onTouchMove(event: TouchInputEvent): Promise<void>;
    /** @hidden */
    onTouchEnd(event: TouchInputEvent): void;
    /** @hidden */
    onDeactivate(): void;
    private _updateCameraViewAngle;
    private _dollyZoom;
    private _doZoom;
    private _zoomHelper;
}
