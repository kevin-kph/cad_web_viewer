import { PhantomMember } from './types';
/**
 * https://en.wikipedia.org/wiki/Rose_tree
 */
export declare class RoseTree<T> {
    constructor(value: T, kids: RoseTree<T>[]);
    protected readonly __RoseTree: PhantomMember;
    readonly value: T;
    readonly kids: RoseTree<T>[];
}
