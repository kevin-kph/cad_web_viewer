import { LazyObject } from './LazyObject';
import { PhantomMember } from './types';
/**
 * This is a more space-concious variant of `LazyObject<T>`, but restricts the allowed types for `T` even further.
 *
 * Warning:
 *
 * `T` must not be itself of type `Promise` or `LazyObject`. The compiler cannot enforce this.
 *
 */
export declare class LazyPromise<T extends object | null> implements PromiseLike<T> {
    /**
     * Creates a new lazy value, which is the result of the supplied function
     * once the lazy value is forced (or the value itself if a `T` is directly supplied).
     */
    static create<T extends object | null>(value: T | Promise<T> | LazyObject<T | Promise<T>> | (() => T | Promise<T>)): LazyPromise<T>;
    private constructor();
    /**
     * Returns whether or not this has been both forced (lazy).
     * This says nothing about resolution (promise).
     */
    isUnforced(): boolean;
    /**
     * Returns whether or not this has been both forced (lazy) and resolved (promise).
     */
    isResolved(): boolean;
    /**
     * Returns the final promised value synchronously.
     *
     * This is only legal to call if `isResolved()` returns `true`.
     *
     */
    getResolved(): T;
    /**
     * Forces the lazy promise and then delegates to the forced promise's `then()` method.
     *
     * Note: This intentionally returns a normal `Promise`, not a `LazyPromise`.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    private _rectifyResult;
    protected readonly __LazyPromise: PhantomMember;
    private _value;
}
