import { Box } from '../Box';
import { Matrix12, Matrix16 } from './types';
import { Point3 } from './Point3';
import { Point4 } from './Point4';
/**
 * Object representing the 4x4 Matrix. More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/model_attributes/matrices.html).
 */
export declare class Matrix {
    m: Matrix16;
    /**
     * Creates a new matrix set to the identity matrix.
     */
    constructor();
    /**
     * Sets the matrix to the identity matrix.
     * @returns This matrix object.
     */
    loadIdentity(): this;
    isIdentity(): boolean;
    /**
     * Strictly compares this matrix with another.
     * @param other Matrix to compare with.
     * @returns True if the values of this matrix equal those of the other.
     */
    equals(other: Matrix): boolean;
    /**
     * Compares this matrix with another using a tolerance.
     * @param other Matrix to compare with.
     * @param tolerance Tolerance to be used in the comparison.
     * @returns True if the values of this matrix equal those of the other.
     */
    equalsWithTolerance(other: Matrix, tolerance: number): boolean;
    /**
     * Sets the scale components of this matrix.
     * @param x X scale value.
     * @param y Y scale value.
     * @param z Z scale value.
     * @returns This matrix object.
     */
    setScaleComponent(x: number, y: number, z: number): this;
    /**
     * Sets the translation components of this matrix.
     * @param x X translation value.
     * @param y Y translation value.
     * @param z Z translation value.
     * @returns This matrix object.
     */
    setTranslationComponent(x: number, y: number, z: number): this;
    /**
     * Creates a copy of this matrix.
     * @returns Copy of this matrix.
     */
    copy(): Matrix;
    /**
     * Sets the value of this matrix to another.
     * @param matrix the matrix whose values will be set.
     * @returns This matrix object.
     */
    assign(matrix: Matrix): this;
    /**
     * Multiply the matrix by given scalar.
     * @param scalar Scalar to multiply the matrix with.
     * @return This matrix object.
     */
    multiplyByScalar(scalar: number): this;
    /**
     * Transforms a point according to this matrix. The source and destination points are allowed to be the same object.
     * @param point The point to be transformed.
     * @param result A Point3 which can hold the result of the transformation.
     * @returns A new point if result is undefined, result otherwise.
     */
    transform(point: Point3, result?: Point3): Point3;
    /**
     * Transforms a point according to this matrix. The source and destination points are allowed to be the same object.
     * @param point The point to be transformed.
     * @param result A Point3 which can hold the result of the transformation.
     * @returns A new point if result is undefined, result otherwise.
     */
    transform4(point: Point4, result?: Point4): Point4;
    /**
     * Transforms an array of points according to this matrix.
     * @param inPoints an array of points to be transformed.
     * @param outPoints an array that will be populated with transformed points. Note that the results will be pushed onto the end of the array.
     */
    transformArray(inPoints: Point3[], outPoints: Point3[]): void;
    transformBox(inBox: Box): Box;
    /**
     * Sets this matrix equal to its transpose.
     * @returns This matrix object.
     */
    transpose(): this;
    /**
     * Creates a matrix from an array of numbers.
     * @param arr 16 element array of numbers.
     * @returns New matrix with elements set to the values of the array parameter. Array elements will be in column-major order.
     */
    static createFromArray(arr: number[]): Matrix;
    /**
     * Creates a rotation matrix from an arbitrary axis.
     * @param axis Axis to rotate about.
     * @param degrees Amount of degrees to rotate about the provided axis.
     * @returns Rotation matrix which represents the rotation about the supplied axis.
     */
    static createFromOffAxisRotation(axis: Point3, degrees: number): Matrix;
    /**
     * Creates a matrix from three [[Point3]]s, which will be used as the
     * columns of the matrix.
     *
     * @param xAxis The first column.
     * @param yAxis The second column.
     * @param zAxis The third column.
     */
    static createFromBasis(xAxis: Point3, yAxis: Point3, zAxis: Point3): Matrix;
    /**
     * Multiplies two matrices.
     *
     * (p' = ABp <=> p' = multiply(B, A).transform(p))
     *
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns Matrix which is the result of the multiplication.
     */
    static multiply(m1: Matrix, m2: Matrix): Matrix;
    /**
     * Computes the determinant and inverse of a matrix, if possible.
     * @returns An array containing the inverse (or null if not invertible) followed by the determinant
     */
    inverseAndDeterminant(): [Matrix | null, number];
    /**
     * Computes the inverse of a matrix if possible.
     * @param matrix Matrix whose inverse will be computed.
     * @returns Matrix set to the inverse of the supplied matrix.
     */
    static inverse(matrix: Matrix): Matrix | null;
    /**
     * Computes the determinant of the upper-left 3x3 subsection of this matrix.
     */
    upperLeft3x3Determinant(): number;
    /**
     * @returns the version of this matrix suitable for applying to normals,
     * i.e. the inverse transpose of the upper-left 3x3 submatrix.
     */
    normalMatrix(): Matrix | null;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): number[];
    /**
     * Creates a new [[Matrix]] from an object given by [[toJson]].
     * @param obj An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(obj: unknown): Matrix;
    /** @hidden */
    static toMatrix12(m: Matrix16): Matrix12;
    /**
     * Returns the matrix for a clockwise rotation around the X-axis.
     * @param degrees The degrees of the rotation.
     * @returns The rotation matrix.
     */
    static xAxisRotation(degrees: number): Matrix;
    /**
     * Returns the matrix for a clockwise rotation around the Y-axis.
     * @param degrees The degrees of the rotation.
     * @returns The rotation matrix.
     */
    static yAxisRotation(degrees: number): Matrix;
    /**
     * Returns the matrix for a clockwise rotation around the Z-axis.
     * @param degrees The degrees of the rotation.
     * @returns The rotation matrix.
     */
    static zAxisRotation(degrees: number): Matrix;
}
