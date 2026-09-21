import { CameraInterpolation } from './CameraInterpolation';
export declare class InterpolationManager {
    private _activeInterpolation;
    private _updateTimer;
    private _updateInterval;
    stop(): void;
    start(interpolation: CameraInterpolation, force?: boolean): boolean;
    update(): void;
}
