import { Point3 } from '@ts3d-hoops/common';
export interface CuttingPlaneData {
    plane: {
        normal: Point3;
        d: number;
    };
    referenceGeometry: Point3[] | null;
}
export declare enum DepthRange {
    Cutoff = 4.76837158203125e-7
}
