import { Point2 } from '@ts3d-hoops/common';
import { MouseInputEvent } from '../../event/MouseInputEvent';
import { OperatorBase } from '../OperatorBase';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class CameraWindowZoomOperator extends OperatorBase {
    private _rectangleMarkup;
    private _computeTarget;
    private _preserveViewAngle;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /**
     * When enabled, the camera target will be computed using selection while zooming.
     * This can provide a better zoom behavior in perspective projection mode,
     * but comes at the cost of performing a selection on the model during each zoom operation,
     * which may not be ideal for performance on large models.
     *
     * This setting is disabled by default.
     */
    setComputeTarget(compute: boolean): void;
    /**
     * Returns whether a new camera target will be computed using selection.
     * See [[setComputeTarget]]
     */
    getComputeTarget(): boolean;
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
     * If window zoom is being using in conjunction with mouse wheel zoom
     * this setting should be the same in both.
     *
     * This setting is enabled by default.
     */
    setPreserveViewAngle(preserve: boolean): void;
    /**
     * Gets whether to maintain a constant view angle while zooming. See
     * [[setPreserveViewAngle]].
     */
    getPreserveViewAngle(): boolean;
    private adjustPositionToPlane;
    private computeNewField;
    private computeReasonableTarget;
    private getCameraTarget;
    doZoom(rectMin: Point2, rectMax: Point2): Promise<void>;
    /** @hidden */
    onMouseDown(e: MouseInputEvent): void;
    /** @hidden */
    onMouseMove(e: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(e: MouseInputEvent): Promise<void>;
}
