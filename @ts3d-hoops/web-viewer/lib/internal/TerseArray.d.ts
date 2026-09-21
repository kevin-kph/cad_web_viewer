/**
 * This type represents a space efficient array representation by being:
 *
 * (a) `X` if length is 0.
 *
 * (b) `T` if length is 1.
 *
 * (c) `T[]` if length is greater than 1.
 *
 * Neither `null` or `undefined` should inhabit the type `T`. Doing otherwise is an error.
 */
export type TerseArray0<T, X extends null | undefined> = T[] | T | X;
/**
 * This type represents a non-empty space efficient array representation by being:
 *
 * (a) `T` if length is 1.
 *
 * (b) `T[]` if length is greater than 1.
 *
 * Neither `null` or `undefined` should inhabit the type `T`. Doing otherwise is an error.
 */
export type TerseArray1<T> = T[] | T;
export declare function isEmpty<T>(xs: TerseArray0<T, null | undefined>): boolean;
/**
 * Converts a `TerseArray0` into an `Array`.
 * If the `TerseArray0` is represented by an actual `Array`, a copy is returned.
 * @param xs The `TerseArray0` to convert.
 * @returns The resulting `Array`.
 */
export declare function toArray<T>(xs: TerseArray0<T, null | undefined>): T[];
/**
 * Converts an `Array` into a `TerseArray0`.
 * The converted `TerseArray0` output may be a reference of the input `Array` (as in not a copy).
 * @param xs The `Array` to convert.
 * @returns The resulting `TerseArray0`.
 */
export declare function fromArray<T>(xs: T[]): TerseArray0<T, null>;
/**
 * Appends an item to the end of a `TerseArray0`.
 * The returned `TerseArray1` may be a reference of the underlying `Array` in the original
 * `TerseArray0` object (if represented as such).
 * @param xs The `TerseArray0` to push an element into.
 * @param x The item to push into the array.
 * @returns The resulting `TerseArray1` with the appended element.
 */
export declare function push<T>(xs: TerseArray0<T, null | undefined>, x: T): TerseArray1<T>;
