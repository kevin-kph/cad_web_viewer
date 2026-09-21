/**
 * Performs a shallow copy of a Map.
 * @param input The Map to be copied
 */
export declare function copyMap<K, V>(input: Map<K, V>): Map<K, V>;
/**
 * Performs a shallow copy of a Set.
 * @param input The Map to be copied
 */
export declare function copySet<T>(input: Set<T>): Set<T>;
/**
 * Creates a Set from the provided array.
 * @param xs Array to create a Set from
 */
export declare function toSet<T>(xs: T[]): Set<T>;
