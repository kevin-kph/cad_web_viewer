import { Quaternion, Point3 } from '@ts3d-hoops/common';
import { ExportContext, ImportContext } from './ImportExport';
import { KeyframeBuffer } from './KeyframeBuffer';
export declare enum InterpolationType {
    Constant = 0,
    Linear = 1,
    CubicSpline = 2
}
export type KeyframeIndex = number;
/** Describes how the keyframes in a buffer are sampled. */
export declare class Sampler {
    readonly buffer: KeyframeBuffer;
    interpolationType: InterpolationType;
    private static q0;
    private static q1;
    private static q2;
    private static q3;
    private static q4;
    private static q5;
    private static v0;
    private static v1;
    private static v2;
    private static v3;
    /**
     * Creates a new sampler for a [[KeyframeBuffer]]
     * @param buffer The buffer that will be sampled.
     * @param interpolationType The Type of interpolation that will be used
     */
    constructor(buffer: KeyframeBuffer, interpolationType: InterpolationType);
    /**
     * Returns the index of the next keyframe for a given frame T.
     * Note that this assumes that all keyframes in the buffer
     * are arranged in ascending order by frame time.
     */
    private _getNextKeyframeIndex;
    /** Computes an interpolated quaternion for the given frame. */
    interpolateQuat(t: number, out: Quaternion): void;
    /** Computes an interpolated Vector 3 value for the given frame. */
    interpolateVec3(t: number, out: Point3): void;
    /** Computes an interpolated scalar value for the given frame. */
    interpolateScalar(t: number): number;
    /** Performs linear interpolation of two scalar values beginning at indices k0 and k1. */
    private interpolateScalarLinear;
    /** Performs spherical linear interpolation on the quaternion values beginning at indices k0 and k1. */
    private interpolateQuatSlerp;
    private static _interpVec3;
    /** Performs linear interpolation on the Vector3 values at keyframes beginning at indices k0 and k1 */
    private interpolateVec3Linear;
    private _interpCubicSpline;
    /** Performs Cubic Spline Interpolation on two scalar values beginning at indices k0 and k1 */
    private interpolateScalarCubicSpline;
    /** Performs Cubic Spline Interpolation on the Vector3 values at keyframes beginning at indices k0 and k1 */
    interpolateVec3CubicSpline(k0: KeyframeIndex, k1: KeyframeIndex, t: number, out: Point3): void;
    /** Performs Cubic Spline Interpolation on the Quaternion values beginning at indices k0 and k1 */
    private interpolateQuatCubicSpline;
    private _setVecFromKeyframeIndex;
    private _setVecTanFromKeyframeIndex;
    private _setQuatFromKeyframeIndex;
    private _setQuatTanFromKeyframeIndex;
    /** @hidden */
    _gatherForExport(context: ExportContext): void;
    /** @hidden */
    _export(context: ExportContext): {
        buffer: number;
        interpolationType: keyof typeof InterpolationType;
    };
    /** @hidden */
    static _import(context: ImportContext, data: ReturnType<Sampler['_export']>): Sampler;
}
