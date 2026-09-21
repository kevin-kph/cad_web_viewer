import { DoorConfig, FloorConfig, WallConfig } from '../../bim/types';
export declare const MAX_TILT = 45;
export declare const MIN_TILT = -45;
export declare const MAX_ANGLE = 150;
export declare const MIN_ANGLE = 30;
export type CameraRotateFunction = (turnTilt: number[]) => void;
export interface BimConfigs {
    floor: FloorConfig;
    wall: WallConfig;
    door: DoorConfig;
}
