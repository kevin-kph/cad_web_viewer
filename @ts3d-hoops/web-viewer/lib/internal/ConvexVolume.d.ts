import { Point4, Matrix } from '@ts3d-hoops/common';
import { Vector3 } from './Vector';
import { VolumeTestResult } from './types';
export declare class ConvexVolume {
    private constructor();
    static fromPlaneCoefficients(coeffsList: Point4[]): ConvexVolume;
    static createFrustumFromMatrix(matrix: Matrix): ConvexVolume;
    testAxisAlignedBox(center: Vector3, extent: Vector3): VolumeTestResult;
    axisAlignedBoxNotOutside(center: Vector3, extent: Vector3): boolean;
    sphereNotOutside(center: Vector3, squaredRadius: number): boolean;
    sphereFullyInside(center: Vector3, squaredRadius: number): boolean;
    pointInside(point: Vector3): boolean;
    private readonly _planes;
    private readonly _absPlanes;
    private readonly _signs;
    private readonly _distanceScale;
}
