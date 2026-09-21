import { IPoint4 } from './types';
export declare class Point4 implements IPoint4 {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x: number, y: number, z: number, w: number);
    scale(k: number): this;
    set(x: number, y: number, z: number, w: number): void;
    assign(point: IPoint4): void;
    static zero(): Point4;
    /**
     * Strictly compares this point with another.
     * @param other Point to compare with.
     * @returns True if the values of this point equal those of the other.
     */
    equals(other: IPoint4): boolean;
    /**
     * Compares this point with another using a tolerance.
     * @param other Point to compare with.
     * @param tolerance Tolerance to be used in the comparison.
     * @returns True if the values of this point equal those of the other.
     */
    equalsWithTolerance(other: IPoint4, tolerance: number): boolean;
}
