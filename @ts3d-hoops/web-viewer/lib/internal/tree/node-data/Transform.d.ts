import { Matrix16 } from '@ts3d-hoops/common';
import { PhantomMember } from '../../types';
import { AssemblyDataParser } from '../load/AssemblyDataParser';
export declare class Transform {
    static parseBinary(parser: AssemblyDataParser): Matrix16;
    static parseXml(transformNode: Element): Matrix16;
    static getIdentity(): Matrix16;
    static copy(m: Matrix16): Matrix16;
    static isIdentity(m: Matrix16): boolean;
    static multiply(m1: Matrix16, m2: Matrix16): Matrix16;
    private constructor();
    protected readonly __Transform: PhantomMember;
}
