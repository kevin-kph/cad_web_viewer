/**
 * This function takes an array of type <T>, and a predicate function to test each element of the array.
 * This function does not create a new array.
 * @param xs Array to filter.
 * @param pred If this function returns true when testing an item, the item will be kept in the array, otherwise the item will be removed.
 */
export declare function filterInPlace<T>(xs: T[], pred: (x: T) => boolean): void;
