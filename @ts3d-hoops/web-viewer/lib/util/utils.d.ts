import { ExchangeId, Milliseconds } from '../types';
/**
 * Returns a promise that resolves after the provided number of milliseconds
 * @param duration number of milliseconds until the returned promise can resolve
 */
export declare function sleep(duration: Milliseconds): Promise<void>;
/**
 * This function is an helper function that delay the call to a callback to the
 * computation of the next 'frame' of the browser's js engine.
 * The point is to let the js engine deal with pending promises before running
 * the given code.
 *
 * @param cb the callback to call the promise to call on the next frame.
 * @param args the arguments of the callback.
 * @returns a timeout id in order to cancel it if necessary.
 */
export declare function delayCall(cb: (...cbArgs: unknown[]) => unknown, ...args: unknown[]): ReturnType<typeof setTimeout>;
/**
 * Check if two exchange ids are equal.
 *
 * @param exchangeIdA the first exchange id to compare.
 * @param exchangeIdB the second exchange id to compare.
 * @returns true or false if exchange ids are equal.
 */
export declare function exchangeIdEqual(exchangeIdA: ExchangeId, exchangeIdB: ExchangeId): boolean;
/**
 * Check whether or not a Subentity is a LineElement.
 * @param prop the Subentity to check.
 * @returns true if the prop passed is a LineElement, false otherwise.
 */
export declare function isLineElement(prop: object): boolean;
/**
 * Check whether or not a Subentity is a CircleElement.
 * @param prop the Subentity to check.
 * @returns true if the prop passed is a CircleElement, false otherwise.
 */
export declare function isCircleElement(prop: object): boolean;
/**
 * Check whether or not a Subentity is a OtherEdgeElement.
 * @param prop the Subentity to check.
 * @returns true if the prop passed is a OtherEdgeElement, false otherwise.
 */
export declare function isOtherEdgeElement(prop: object): boolean;
/**
 * Check whether or not a Subentity is a PlaneElement.
 * @param prop the Subentity to check.
 * @returns true if the prop passed is a PlaneElement, false otherwise.
 */
export declare function isPlaneElement(prop: object): boolean;
/**
 * Check whether or not a Subentity is a Face.
 * @param prop the Subentity to check.
 * @returns true if the prop passed is a Face, false otherwise.
 */
export declare function isFace(prop: object): boolean;
