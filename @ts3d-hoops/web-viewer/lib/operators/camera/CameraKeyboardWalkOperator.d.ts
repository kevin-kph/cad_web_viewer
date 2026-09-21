import { KeyInputEvent } from '../../event/KeyInputEvent';
import { MouseInputEvent, MouseWheelInputEvent } from '../../event/MouseInputEvent';
import { KeyCode, WalkDirection } from '../../types';
import { CameraWalkBaseOperator } from './CameraWalkBaseOperator';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class CameraKeyboardWalkOperator extends CameraWalkBaseOperator {
    private readonly _keyWalkMapping;
    private readonly _keyUpMap;
    private readonly _keyDownMap;
    private _mouseLookSpeed;
    private _mouseLookEnabled;
    private _previousWalkTime;
    private _tickTimerId;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /**
     * Adds a key mapping for a walk direction.
     * @param key
     * @param walkDirection
     */
    addKeyMapping(key: KeyCode, walkDirection: WalkDirection): void;
    /**
     * Gets the walk direction key mapping.
     */
    getKeyMapping(): Map<KeyCode, WalkDirection>;
    /**
     * Clears all key mappings.
     */
    clearKeyMappings(): void;
    /** @hidden */
    onMouseDown(event: MouseInputEvent): void;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
    /** @hidden */
    onMousewheel(event: MouseWheelInputEvent): void;
    /** @hidden */
    onKeyDown(event: KeyInputEvent): void;
    /** @hidden */
    onKeyUp(event: KeyInputEvent): void;
    private _keyCodeActive;
    private _onKeyChange;
    /**
     * Sets the speed for mouse look.
     * @param mouseLookSpeed
     */
    setMouseLookSpeed(mouseLookSpeed: number): void;
    /**
     * Gets the mouse look speed.
     */
    getMouseLookSpeed(): number;
    /**
     * Sets whether the mouse look is enabled. If enabled, mouse move events will not continue down the operator stack.
     * @param mouseLookEnabled
     */
    setMouseLookEnabled(mouseLookEnabled: boolean): void;
    /**
     * Gets whether the mouse look is enabled. If enabled, mouse move events will not continue down the operator stack.
     */
    getMouseLookEnabled(): boolean;
    resetDefaultWalkSpeeds(): Promise<void>;
    private _execWalkDirection;
    private _queueWalkDirections;
    /** @hidden */
    protected _onTick(): void;
}
