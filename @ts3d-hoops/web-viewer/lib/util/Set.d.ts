/**
 * Turns a Set<T> into an Array<T>.
 * @param set The set to convert.
 * @returns The resulting array.
 */
export declare function setToArray<T>(set: Set<T>): T[];
/**
 * Returns a new set consisting of all elements in `setA` not found in `setB`.
 * @param setA The starting set to start subtracting from.
 * @param setB The set used to reject values from `setA`.
 * @returns The resulting set.
 */
export declare function setSubtraction<T>(setA: Set<T>, setB: Set<T>): Set<T>;
