import { Camera } from '../../Camera';
import { IView } from '../../core/IView';
export declare class CameraInterpolation {
    private _beginCam;
    private _endCam;
    private _duration;
    private _view;
    private _completeCallback;
    private _startTime;
    private _progress;
    private _positionMoveDelta;
    private _targetMoveDelta;
    private _interpolationUsesRotation;
    private _beginQuaternion;
    private _endQuaternion;
    private _viewVectorLength;
    private _viewVectorLengthDelta;
    private _fieldWidthDelta;
    private _fieldHeightDelta;
    constructor(begin: Camera, end: Camera, duration: number, completeCallback: () => void, view: IView);
    isComplete(): boolean;
    getCallback(): (() => void) | null;
    stop(): void;
    start(): void;
    update(): void;
    /**
     * Returns the transpose of the camera's view matrix without the
     * translation component and with the x- and z- axes flipped.
     *
     * Reproduced here because the public version is deprecated.
     */
    private getMatrixFromCamera;
    private _init;
}
