import { IResettableConfigurationService, IService } from '../types';
export declare const ProjectionValues: readonly ["Perspective", "Orthographic"];
export type Projection = (typeof ProjectionValues)[number];
export declare const OrbitFallbackModeValues: readonly ["Camera Target", "Model Center", "Orbit Target"];
export type OrbitFallbackMode = (typeof OrbitFallbackModeValues)[number];
export type CameraServiceConfiguration = {
    projectionMode: Projection;
    orbitFallbackMode: OrbitFallbackMode;
};
export declare function isProjection(value: unknown): value is Projection;
export declare function isOrbitFallbackMode(value: unknown): value is OrbitFallbackMode;
export declare function isCameraServiceConfiguration(obj: unknown): obj is CameraServiceConfiguration;
export interface ICameraService extends IService, IResettableConfigurationService {
    getProjectionMode(): Projection;
    setProjectionMode(projectionMode: Projection): void;
    getOrbitFallbackMode(): OrbitFallbackMode;
    setOrbitFallbackMode(fallbackMode: OrbitFallbackMode): void;
    resetConfiguration(obj?: object): Promise<void>;
    reset(): void;
}
