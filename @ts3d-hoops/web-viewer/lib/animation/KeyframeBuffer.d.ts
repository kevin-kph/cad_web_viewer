/** Describes the type of values stored in a Keyframe Buffer */
export declare enum KeyType {
    /** Keyframe value is a single scalar. */
    Scalar = 1,
    /** Keyframe value is a 3 component vector. */
    Vec3 = 3,
    /** Keyframe value is interpreted as a 4 component quaternion */
    Quat = 4
}
/**
 * This class contains a collection of keyframes.
 * A Keyframe consists of a scalar value T, representing the linear time in seconds, and a vector of scalars described by [[KeyType]].
 * Optionally, a Keyframe can also have a vector of tangents described by [[KeyType]], that are used for cubic spline interpolation.
 * Keyframes are stored in the times, values, and tangents arrays.
 * For example, with [[KeyType]] of Vec3:
 * times: t0, t1, ... tn
 * values: v0x, v0y, v0z, ... vnx, vny, vnz
 * tangents: in_v0x, in_v0y, in_v0z, out_v0x, out_v0y, out_v0z, ... in_vnx, in_vny, in_vnz, out_vnx, out_vny, out_vnz
 * */
export declare class KeyframeBuffer {
    readonly keyType: KeyType;
    times: number[];
    values: number[];
    tangents: number[];
    /** The number of elements between successive keyframes in the array. */
    readonly keyOffset: number;
    /** Keeps track if the data in the points array has associated tangents. */
    private _hasTangents;
    /**
     * Creates a new buffer for storing keyframe data.
     * @param keyType The type of keyframes that will be stored in the buffer.
     */
    constructor(keyType: KeyType);
    private _validateKey;
    private _validateTangents;
    private _findIndexFromTime;
    /** Returns the index of the keyframe at the specified time. */
    getKeyframeIndex(t: number): number;
    /** Deletes a keyframe at the specified index. */
    deleteKeyframe(index: number): void;
    /**
     * Inserts a Scalar keyframe with the specified time. The type of this buffer should be [[KeyType.Scalar]]
     * @returns Index at which keyframe was inserted
     */
    insertScalarKeyframe(t: number, val: number, inTan?: number, outTan?: number): number;
    /** Updates a Scalar keyframe at the specified index. The type of this buffer should be [[KeyType.Scalar]] */
    updateScalarKeyframe(index: number, t: number, val: number, inTan?: number, outTan?: number): void;
    /**
     * Inserts a Vec3 keyframe with the specified time. The type of this buffer should be [[KeyType.Vec3]]
     * @returns Index at which keyframe was inserted
     */
    insertVec3Keyframe(t: number, x: number, y: number, z: number, inTanX?: number, inTanY?: number, inTanZ?: number, outTanX?: number, outTanY?: number, outTanZ?: number): number;
    /** Updates a Vec3 keyframe at the specified index. The type of this buffer should be [[KeyType.Vec3]] */
    updateVec3Keyframe(index: number, t: number, x: number, y: number, z: number, inTanX?: number, inTanY?: number, inTanZ?: number, outTanX?: number, outTanY?: number, outTanZ?: number): number;
    /**
     * Inserts a Quat keyframe with the specified time. The type of this buffer should be [[KeyType.Quat]]
     * @returns Index at which keyframe was inserted
     */
    insertQuatKeyframe(t: number, x: number, y: number, z: number, w: number, inTanX?: number, inTanY?: number, inTanZ?: number, inTanW?: number, outTanX?: number, outTanY?: number, outTanZ?: number, outTanW?: number): void;
    /** Updates a Quat keyframe at the specified index. The type of this buffer should be [[KeyType.Quat]] */
    updateQuatKeyframe(index: number, t: number, x: number, y: number, z: number, w: number, inTanX?: number, inTanY?: number, inTanZ?: number, inTanW?: number, outTanX?: number, outTanY?: number, outTanZ?: number, outTanW?: number): void;
    /** @hidden */
    _export(): {
        tangents?: number[];
        keyType: keyof typeof KeyType;
        times: number[];
        values: number[];
    };
    /** @hidden */
    static _import(data: ReturnType<KeyframeBuffer['_export']>): KeyframeBuffer;
}
