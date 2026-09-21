/**
 * This represents a `Promise` that has its `resolve` and `reject` functions
 * bundled as methods attached to the promise object.
 */
export interface OpenPromise<T> extends Promise<T> {
    resolve(this: OpenPromise<T>, value: T | PromiseLike<T>): void;
    resolve(this: OpenPromise<void>): void;
    reject(error: any): void;
}
/**
 * Creates a new `OpenPromise` that does not have its state resolved or rejected.
 */
export declare function createOpenPromise<T>(): OpenPromise<T>;
