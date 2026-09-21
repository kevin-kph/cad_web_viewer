import { PhantomMember } from './types';
/**
 * This is a more space-concious variant of `Lazy<T>`, but restricts the allowed types for `T`.
 */
export declare class LazyObject<T extends object | null> {
    /**
     * Creates a new lazy value, which is the result of the supplied function
     * once the lazy value is forced (or the value itself if a `T` is directly supplied).
     */
    static create<T extends object | null>(value: (() => T) | T): LazyObject<T>;
    private constructor();
    /**
     * Forces the lazy value given at construction and returns it.
     */
    get(): T;
    protected readonly __LazyObject: PhantomMember;
    private _value;
}
