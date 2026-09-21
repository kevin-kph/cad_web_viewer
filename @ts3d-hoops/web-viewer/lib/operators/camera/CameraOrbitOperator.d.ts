import { Point3 } from '@ts3d-hoops/common';
import { MouseInputEvent } from '../../event/MouseInputEvent';
import { Button, OrbitFallbackMode } from '../../types';
import { CameraOrbitBaseOperator } from './CameraOrbitBaseOperator';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class CameraOrbitOperator extends CameraOrbitBaseOperator {
    private _orbitTarget;
    private _orbitFallbackMode;
    private _modelCenter;
    private _circleMarkupHandler;
    private _circleRadius;
    private readonly _updateCameraCenterAction;
    private readonly _updateCameraCenterTimer;
    private _primaryButton;
    private _pickPosition;
    private _bimOrbitEnabled;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    private _updateModelCenter;
    /** @hidden */
    onMouseDown(event: MouseInputEvent): Promise<void>;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
    /** @hidden */
    onDeactivate(): void | Promise<void>;
    /**
     * BIM orbit is intended to make orbiting building models easier.
     * It slows the rotation speed, clamps vertical rotation to 180 degrees, and restricts horizontal rotation to rotate around the vertical axis.
     * @param bimOrbitEnabled
     */
    setBimOrbitEnabled(bimOrbitEnabled: boolean): void;
    /**
     * Returns true if BIM orbit is enabled.
     */
    getBimOrbitEnabled(): boolean;
    /** @hidden */
    _removeMarkup(): void;
    private _getClampedRotationMatrix;
    private _orbitByTurnTiltWithTarget;
    /**
     * Sets the fallback mode. This is used to specify whether to orbit
     * around a set target, the model center, or camera target.
     */
    setOrbitFallbackMode(fallbackMode: OrbitFallbackMode): void;
    /**
     * Gets the orbit fallback mode.
     * @returns orbit fallback mode
     */
    getOrbitFallbackMode(): OrbitFallbackMode;
    /**
     * Sets the orbit target for the orbit fallback mode OrbitTarget.
     * @param orbitTarget
     */
    setOrbitTarget(orbitTarget: Point3): void;
    /**
     * Gets the orbit target point.
     * @returns orbit target
     */
    getOrbitTarget(): Point3;
    /**
     * Sets the primary mouse button. When this button is pressed, we will orbit around the selected point on the model.
     * If there is no selected point, the orbit fallback mode will be used for orbit.
     * @param button
     */
    setPrimaryButton(button: Button): void;
    /**
     * @returns the primary orbit button
     */
    getPrimaryButton(): Button;
}
