import { PhantomMember } from '../internal';
/**
 * This is used to delay the evaluation of a value.
 *
 * Evaluation is completely deferred until `get()` is called.
 * Evaluation happens no more than once and the obtained value
 * is cached for later calls to `get()`.
 *
 * ---
 *
 * Example:
 * ```
 * const x = Lazy.create(() => {
 *     console.log("evaluating (x)")
 *     return 5;
 * });
 * console.log("created (x)");
 * console.log(`(x) is ${x.get()}`);
 * console.log(`(x+1) is ${x.get()+1}`);
 *
 * // *** Console Output ***
 * // created (x)
 * // evaluating (x)
 * // (x) is 5
 * // (x+1) is 6
 * ```
 *
 * ---
 *
 * Note: Unlike `LazyObject<T>`, this can have any type `T`.
 */
export declare class Lazy<T> {
    /**
     * Creates a new lazy value, which is the result of the supplied function
     * once the lazy value is forced.
     */
    static create<T>(value: () => T): Lazy<T>;
    private constructor();
    /**
     * Forces the lazy value given at construction and returns it.
     */
    get(): T;
    protected readonly __Lazy: PhantomMember;
    private _deferredValue;
    private _resolvedValue?;
}
export type LazyLike<T> = Lazy<T> | (() => T);
