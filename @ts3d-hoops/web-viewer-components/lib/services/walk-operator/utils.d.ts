import { WalkMode } from '@ts3d-hoops/web-viewer';
import { WalkModeName, WalkSpeedUnitName } from './types';
export declare function walkModeToString(mode: WalkMode): WalkModeName;
export declare function stringToWalkMode(mode: WalkModeName): WalkMode;
export declare function getWalkSpeedUnitName(factor: number): WalkSpeedUnitName;
export declare function getWalkSpeedUnitFactor(unit: WalkSpeedUnitName): number;
export declare function calculateWalkSpeedUnitFactor(speed: number): number;
