import { Matrix } from './Matrix';
/** @hidden */
export declare class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x: number, y: number, z: number, w: number);
    set(x: number, y: number, z: number, w: number): void;
    assign(other: Quaternion): void;
    copy(): Quaternion;
    equals(q: Quaternion): boolean;
    equalsWithTolerance(other: Quaternion, tolerance: number): boolean;
    fromArray(arr: number[]): this;
    toArray(arr: number[]): this;
    negate(): this;
    magnitudeSquared(): number;
    magnitude(): number;
    normalize(): this;
    static add(q1: Quaternion, q2: Quaternion): Quaternion;
    static subtract(q1: Quaternion, q2: Quaternion): Quaternion;
    static identity(): Quaternion;
    static toMatrix(quaternion: Quaternion): Matrix;
    static createFromMatrix(matrix: Matrix): Quaternion;
    static interpolate(begin: Quaternion, end: Quaternion, t: number): Quaternion;
    private static readonly _epsilon;
    private static _arccos;
}
