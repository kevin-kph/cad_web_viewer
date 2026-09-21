import { PromiseState } from '../../internal';
import { OpenPromise } from './OpenPromise';
/**
 * This represents a `OpenPromise` that tracks whether or not it has been resolved or rejected.
 */
export interface TrackedOpenPromise<T> extends OpenPromise<T> {
    /**
     * This value is `true` if and only if this promise has been resolved or rejected.
     */
    readonly state: PromiseState;
}
/**
 * Creates a new `TrackedOpenPromise` that does not have its state resolved or rejected.
 */
export declare function createTrackedOpenPromise<T>(): TrackedOpenPromise<T>;
