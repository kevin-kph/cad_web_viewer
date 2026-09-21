import { LazyPromise } from './LazyPromise';
/**
 * This is a cache of keyed `LazyPromise`s.
 */
export declare class PromiseCache<K extends object | number | string, V extends object | null> {
    clear(): void;
    load(key: K, lazyValue: LazyPromise<V>): Promise<V>;
    private readonly _cache;
}
