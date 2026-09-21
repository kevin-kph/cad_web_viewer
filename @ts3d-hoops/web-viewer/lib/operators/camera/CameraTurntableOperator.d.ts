import { Point3 } from '@ts3d-hoops/common';
import { MouseWheelInputEvent } from '../../event/MouseInputEvent';
import { Axis } from '../../types';
import { CameraOrbitBaseOperator } from './CameraOrbitBaseOperator';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class CameraTurntableOperator extends CameraOrbitBaseOperator {
    private _rotationAxis;
    private _tiltAmount;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    private _rotateAroundAxis;
    /** @hidden */
    onMousewheel(event: MouseWheelInputEvent): void;
    private _axisToPoint3;
    /**
     * Sets the rotation axis.
     * @param axis [[Axis]] or [[Point3]] used to set the rotation axis.
     */
    setRotationAxis(axis: Axis | Point3): boolean;
}
