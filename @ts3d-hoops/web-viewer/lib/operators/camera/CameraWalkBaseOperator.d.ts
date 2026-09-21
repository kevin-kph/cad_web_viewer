import { Point3 } from '@ts3d-hoops/common';
import { Camera } from '../../Camera';
import { DoorConfig, FloorConfig, WallConfig } from '../../bim/types';
import { MouseInputEvent } from '../../event/MouseInputEvent';
import { Axis } from '../../types';
import { CurrentAction } from '../../util/promise/CurrentAction';
import { OperatorBase } from '../OperatorBase';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
/** @hidden */
export declare class CameraWalkBaseOperator extends OperatorBase {
    private _elevationSpeed;
    private _rotationSpeed;
    private _viewAngle;
    private _zoomDistance;
    private _walkDistance;
    private _tilt;
    private _majorAxis;
    private _maxExtents;
    private _walkActive;
    private readonly _activeWalk;
    private _bimModeEnabled;
    private readonly _synchronizedToggleBimMode;
    private readonly _doorCache;
    private _downAxis;
    private _initialInteractiveDrawLimitIncreaseStatus;
    private readonly _logical;
    private readonly _effective;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    private _updateSceneFloor;
    isBimModeEnabled(): boolean;
    private _enableBimMode;
    private _disableBimMode;
    /**
     * Enables BIM mode, which includes collision detection
     */
    enableBimMode(): Promise<void>;
    /**
     * Disables BIM mode, which includes collision detection
     */
    disableBimMode(): Promise<void>;
    /**
     * Toggles BIM mode, deactivating it if it's activated and activating it if it's deactivated
     */
    toggleBimMode(): Promise<void>;
    /** @hidden */
    onActivate(): Promise<void>;
    /** @hidden */
    onDeactivate(): Promise<void>;
    /**
     * Sets the walk, rotate, and mouse look speeds to the default values.
     */
    resetDefaultWalkSpeeds(): Promise<void>;
    /**
     * Gets the floor distance config used by BIM mode.
     * See also: [[enableBimMode]].
     */
    getBimFloorConfig(): FloorConfig;
    /**
     * Sets the floor distance config used by BIM mode.
     * See also: [[enableBimMode]].
     */
    setBimFloorConfig(floorConfig: FloorConfig): void;
    /**
     * Gets the wall distance config used by BIM mode.
     * See also: [[enableBimMode]].
     */
    getBimWallConfig(): WallConfig;
    /**
     * Sets the wall distance config used by BIM mode.
     * See also: [[enableBimMode]].
     */
    setBimWallConfig(wallConfig: WallConfig): void;
    /**
     * Gets the door distance config used by BIM mode.
     * See also: [[enableBimMode]].
     */
    getBimDoorConfig(): DoorConfig;
    /**
     * Sets the door distance config used by BIM mode.
     */
    setBimDoorConfig(doorConfig: DoorConfig): void;
    private _scaleAgainstModelUnit;
    /** @hidden */
    onMouseDown(event: MouseInputEvent): void;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
    /** @hidden */
    protected _applyGravity(): Promise<void>;
    /** @hidden */
    protected _updateNearbyDoors(): Promise<void>;
    private _updateCamera;
    /** @hidden */
    protected _applyWalkDelta(camera: Camera, walkDelta: Point3): void;
    /** @hidden */
    protected _applyWalkDeltaWithCollisionCheck(camera: Camera, walkDelta: Point3, upDir: Point3): Promise<void>;
    private _testWallCollision;
    private _walkBackward;
    private _walkForward;
    private _walkLeft;
    private _walkRight;
    walkBackward(walkDistance: number): void;
    walkForward(walkDistance: number): void;
    walkLeft(walkDistance: number): void;
    walkRight(walkDistance: number): void;
    walkBackwardWithCollision(walkDistance: number): Promise<void>;
    walkForwardWithCollision(walkDistance: number): Promise<void>;
    walkLeftWithCollision(walkDistance: number): Promise<void>;
    walkRightWithCollision(walkDistance: number): Promise<void>;
    walkDown(walkDistance: number): void;
    walkUp(walkDistance: number): void;
    rotateRight(degrees: number): void;
    rotateLeft(degrees: number): void;
    tiltDown(degrees: number): void;
    tiltUp(degrees: number): void;
    /** @hidden */
    protected _calculateInitialPosition(): void;
    private _updateCameraViewAngle;
    private _updateCameraTilt;
    private _calculateInitialTilt;
    /** @hidden */
    protected _resetPosition(camera: Camera): void;
    /** @hidden */
    protected _calculateMajorAxis(camera: Camera): void;
    /**
     * Sets the speed to walk when using the mouse scroll wheel.
     * @param zoomSpeed distance for walking with the mouse scroll wheel.
     */
    setZoomSpeed(zoomSpeed: number): void;
    /**
     * Gets the speed used when walking with the mouse scroll wheel.
     */
    getZoomSpeed(): number;
    /**
     * Sets the tilt value. Values must be between -45 and 45 degrees.
     * @param tilt
     */
    setTilt(tilt: number): void;
    /**
     * Gets the tilt value.
     */
    getTilt(): number;
    /**
     * Sets the view angle. Values must be between 30 and 150 degrees.
     * @param degrees
     */
    setViewAngle(degrees: number): void;
    /**
     * Gets the view angle.
     */
    getViewAngle(): number;
    /**
     * Sets the walkSpeed for walking forward, backwards, left, and right.
     * @param walkSpeed The camera will move by walkSpeed per second.
     */
    setWalkSpeed(walkSpeed: number): void;
    /**
     * Gets the walkSpeed for walking forward, backwards, left, and right.
     */
    getWalkSpeed(): number;
    /**
     * Sets the elevation speed for moving the camera up and down.
     * @param elevationSpeed The camera will move by elevationSpeed per second.
     */
    setElevationSpeed(elevationSpeed: number): void;
    /**
     * Gets the elevation speed for moving the camera up and down.
     */
    getElevationSpeed(): number;
    /**
     * Sets the rotation speed for tilt and rotate.
     * @param rotationSpeed The camera will rotate by rotationSpeed degrees per second.
     */
    setRotationSpeed(rotationSpeed: number): void;
    /**
     * Gets the rotation speed for tilt and rotate.
     */
    getRotationSpeed(): number;
    /** @hidden */
    setWalkActive(active: boolean): void;
    /**
     * Returns true if walking is currently active
     */
    getWalkActive(): boolean;
    /**
     * Returns true if BIM mode is currently active
     */
    getBimModeEnabled(): boolean;
    /**
     * Get major axis
     */
    getMajorAxis(): Axis;
    /** @hidden */
    protected getActiveWalk(): CurrentAction;
}
