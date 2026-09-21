import { MouseInputEvent } from '../../event/MouseInputEvent';
import { OperatorBase } from '../OperatorBase';
import { CameraRotateFunction } from './types';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
/** @hidden */
export declare class CameraOrbitBaseOperator extends OperatorBase {
    private _cameraRotateFunction;
    private _cameraRotationMomentumEnabled;
    private _isDown;
    private _mouseDragged;
    private _averagedMousePoints;
    private _averageTimeIntervalMilliseconds;
    private _previousMouseMovePoint;
    private _mouseMovePoint;
    private _mouseMoveOffset;
    private _previousMouseMoveTime;
    private _mouseMoveTime;
    private _mouseMoveElapsedTimeSeconds;
    private _rotationDegreesPerSecond;
    private _animationLastTickTime;
    private _animationElapsedTimeSeconds;
    private _animationIntervalResult;
    private _preferredAnimationIntervalMilliseconds;
    private _momentum;
    private _momentumLossPerSecond;
    private _degreesPerPixel;
    private _maxRotationMagnitudeScale;
    private _initialSelectionPosition;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView, rotateFunction: CameraRotateFunction);
    getCameraRotationMomentumEnabled(): boolean;
    setCameraRotationMomentumEnabled(val: boolean): void;
    isCurrentlyAnimating(): boolean;
    /** @hidden */
    onDeactivate(): void | Promise<void>;
    /** @hidden */
    onViewOrientationChange(): void;
    supportsAnimation(): boolean;
    /** @hidden */
    onMouseDown(event: MouseInputEvent): void;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
    private _rotateCamera;
    stopAnimation(): void;
    getMomentum(): number;
    /**
     * Sets proportion of momentum lost per second if camera rotation momentum is enabled. At 0
     * no momentum is lost and the camera will orbit indefinitely. Above 1 the camera will stop
     * orbiting within a second of release. Only values greater than or equal to 0 are accepted.
     * @param amountLost Proportion of momentum lost per second
     */
    setMomentumLossPerSecond(amountLost: number): void;
    getMomentumLossPerSecond(): number;
    isAnimating(): boolean;
    private _startAnimation;
    private _getMouseMoveOffsetForRotation;
    private _onTick;
}
