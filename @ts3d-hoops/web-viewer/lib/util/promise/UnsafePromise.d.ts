/**
 * This represents a `Promise` that has its promised return value immediately available.
 * The immediate value is unsafe to use (safety depends on specific use cases) until
 * this `UnsafePromise` becomes marked as ready.
 *
 * The primary use case of this would be to synchronously return a reference to an object
 * that needs to wait for an `init(): Promise<void>` function to complete.
 */
export interface UnsafePromise<T> extends Promise<T> {
    /**
     * An unsafe synchronous reference to the value returned through this promise's `then()` callback.
     */
    unsafeValue: T;
    /**
     * This promise resolves once `this.unsafeValue` is safe to access.
     */
    readyPromise: Promise<void>;
    /**
     * This value becomes `true` once `this.readyPromise` resolves. If `this.readyPromise` rejects, this
     * value never becomes `true`.
     */
    isReady: boolean;
}
/**
 * Creates a new `UnsafePromise`.
 * @param promisedValue The value this promise resolves to. (See `this.unsafeValue`.)
 * @param readyPromise The promise used for `this.readyPromise`. (See also `this.isReady`.)
 * @returns A new `UnsafePromise`.
 */
export declare function createUnsafePromise<T>(promisedValue: T, readyPromise: Promise<void>): UnsafePromise<T>;
