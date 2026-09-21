import { Operators } from '@ts3d-hoops/web-viewer';
import { IWalkOperatorService, WalkModeName } from './types';
export declare class WalkOperatorService extends EventTarget implements IWalkOperatorService {
    readonly serviceName: "WalkOperatorService";
    private _walkModeOperator?;
    private _mouseWalkOperator?;
    private _keyboardWalkOperator?;
    private callbackMap;
    static readonly DefaultConfiguration: {
        walkMode: WalkModeName;
        mouseLookEnabled: boolean;
        collisionDetectionEnabled: boolean;
    };
    constructor(options?: {
        walkModeOperator?: Operators.Camera.CameraWalkModeOperator;
        mouseWalkOperator?: Operators.Camera.CameraWalkOperator;
        keyboardWalkOperator?: Operators.Camera.CameraKeyboardWalkOperator;
    });
    get walkModeOperator(): Operators.Camera.CameraWalkModeOperator | undefined;
    set walkModeOperator(value: Operators.Camera.CameraWalkModeOperator | undefined);
    get mouseWalkOperator(): Operators.Camera.CameraWalkOperator | undefined;
    set mouseWalkOperator(value: Operators.Camera.CameraWalkOperator | undefined);
    get keyboardWalkOperator(): Operators.Camera.CameraKeyboardWalkOperator | undefined;
    set keyboardWalkOperator(value: Operators.Camera.CameraKeyboardWalkOperator | undefined);
    getWalkMode(): WalkModeName;
    setWalkMode(mode: WalkModeName): Promise<void>;
    getRotationSpeed(): number;
    setRotationSpeed(value: number): void;
    getWalkSpeed(): number;
    setWalkSpeed(value: number): void;
    getElevationSpeed(): number;
    setElevationSpeed(value: number): void;
    getFieldOfView(): number;
    setFieldOfView(value: number): void;
    isMouseLookEnabled(): boolean;
    setMouseLookEnabled(enabled: boolean): void;
    getMouseLookSpeed(): number;
    setMouseLookSpeed(speed: number): void;
    isCollisionDetectionEnabled(): boolean;
    setCollisionDetectionEnabled(enabled: boolean): Promise<void>;
    reset(): void;
    resetConfiguration(obj?: object): Promise<void>;
    private bind;
    private unbind;
}
export default WalkOperatorService;
