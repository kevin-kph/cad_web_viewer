import { Point3 } from '@ts3d-hoops/common';
import { PhantomMember } from '../../types';
import { AssemblyDataParser } from '../load/AssemblyDataParser';
export declare class PhysicalProperties {
    static parseBinary(parser: AssemblyDataParser): PhysicalProperties;
    constructor(surfaceArea: number, volume: number, centerOfGravity: Point3);
    protected readonly __PhysicalProperties: PhantomMember;
    readonly surfaceArea: number;
    readonly volume: number;
    readonly centerOfGravity: Point3;
}
