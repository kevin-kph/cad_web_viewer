import { DoorConfig, FloorConfig, WallConfig } from '../../bim/types';
import { IWebViewer } from '../../core/IWebViewer';
import { KeyInputEvent } from '../../event/KeyInputEvent';
import { MouseInputEvent, MouseWheelInputEvent } from '../../event/MouseInputEvent';
import { TouchInputEvent } from '../../event/TouchInputEvent';
import { WalkMode } from '../../types';
import { Operator } from '../types';
import { CameraKeyboardWalkOperator } from './CameraKeyboardWalkOperator';
import { CameraWalkOperator } from './CameraWalkOperator';
export declare class CameraWalkModeOperator implements Operator {
    private _keyboardWalkOperator;
    private _walkOperator;
    private _activeOperator;
    private _walkMode;
    private _active;
    readonly viewer: IWebViewer;
    /** @hidden */
    constructor(viewer: IWebViewer, walkOperator: CameraWalkOperator, keyboardWalkOperator: CameraKeyboardWalkOperator);
    get keyboardWalkOperator(): CameraKeyboardWalkOperator;
    get walkOperator(): CameraWalkOperator;
    /**
     * Sets the walk mode to Mouse or Keyboard.
     * @param walkMode
     */
    setWalkMode(walkMode: WalkMode): Promise<void>;
    /**
     * Gets the walk mode.
     * @returns Keyboard or Mouse
     */
    getWalkMode(): WalkMode;
    /** @hidden */
    onMouseDown(event: MouseInputEvent): void;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
    /** @hidden */
    onMousewheel(event: MouseWheelInputEvent): void;
    /** @hidden */
    onTouchStart(event: TouchInputEvent): void;
    /** @hidden */
    onTouchMove(event: TouchInputEvent): Promise<void>;
    /** @hidden */
    onTouchEnd(event: TouchInputEvent): void;
    /** @hidden */
    onKeyDown(event: KeyInputEvent): void;
    /** @hidden */
    onKeyUp(event: KeyInputEvent): void;
    /** @hidden */
    onDeactivate(): void | Promise<void>;
    /** @hidden */
    onActivate(): void | Promise<void>;
    /** @hidden */
    onViewOrientationChange(): void;
    /** @hidden */
    stopInteraction(): void | Promise<void>;
    /**
     * Sets BIM mode enables/disabled on both mouse and keyboard walk
     */
    setBimModeEnabled(enabled: boolean): Promise<void>;
    /**
     * Resets speeds to defaults on both mouse and keyboard walk
     */
    resetDefaultWalkSpeeds(): Promise<void>;
    /**
     * Sets BIM floor config on both mouse and keyboard walk
     */
    setBimFloorConfig(floorConfig: FloorConfig): void;
    /**
     * Sets BIM wall config on both mouse and keyboard walk
     */
    setBimWallConfig(wallConfig: WallConfig): void;
    /**
     * Sets BIM door config on both mouse and keyboard walk
     */
    setBimDoorConfig(doorConfig: DoorConfig): void;
    /**
     * Sets zoom speed on both mouse and keyboard walk
     */
    setZoomSpeed(speed: number): void;
    /**
     * Sets walk speed for both mouse and keyboard walk
     */
    setWalkSpeed(speed: number): void;
    /**
     * Sets elevation speed for both mouse and keyboard walk
     */
    setElevationSpeed(speed: number): void;
    /**
     * Sets rotation speed for both mouse and keyboard walk
     */
    setRotationSpeed(speed: number): void;
    /**
     * Sets view angle (FOV) for both mouse and keyboard walk operators
     */
    setViewAngle(angle: number): void;
}
