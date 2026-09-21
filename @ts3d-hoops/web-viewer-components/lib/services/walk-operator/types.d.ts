import { IResettableConfigurationService, IService } from '../types';
export declare const WalkModeNames: readonly ["Mouse", "Keyboard"];
export type WalkModeName = (typeof WalkModeNames)[number];
export declare function isWalkModeName(value: unknown): value is WalkModeName;
export declare const WalkSpeedUnitNames: string[];
export type WalkSpeedUnitName = (typeof WalkSpeedUnitNames)[number];
export declare function isWalkSpeedUnitName(value: unknown): value is WalkSpeedUnitName;
export type WalkOperatorServiceConfiguration = {
    walkMode: WalkModeName;
    rotationSpeed?: number;
    walkSpeed?: number;
    elevationSpeed?: number;
    fieldOfView?: number;
    mouseLookEnabled: boolean;
    mouseLookSpeed?: number;
    collisionDetectionEnabled: boolean;
};
export declare function isWalkOperatorServiceConfiguration(obj: unknown): obj is WalkOperatorServiceConfiguration;
export interface IWalkOperatorService extends IService, IResettableConfigurationService {
    getWalkMode(): WalkModeName;
    setWalkMode(mode: WalkModeName): Promise<void>;
    getRotationSpeed(): number;
    setRotationSpeed(speed: number): void;
    getWalkSpeed(): number;
    setWalkSpeed(speed: number): void;
    getElevationSpeed(): number;
    setElevationSpeed(speed: number): void;
    getFieldOfView(): number;
    setFieldOfView(fov: number): void;
    isMouseLookEnabled(): boolean;
    setMouseLookEnabled(enabled: boolean): void;
    getMouseLookSpeed(): number;
    setMouseLookSpeed(speed: number): void;
    isCollisionDetectionEnabled(): boolean;
    setCollisionDetectionEnabled(enabled: boolean): Promise<void>;
    reset(): void;
    resetConfiguration(obj?: object): Promise<void>;
}
