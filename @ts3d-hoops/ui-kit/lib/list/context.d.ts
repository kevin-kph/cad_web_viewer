import { ListContext } from './types';
/**
 * We use this structure to Wrap the context into a literal object to simplify
 * reassignment.
 *
 * @typedef {ContextWrapper}
 */
export type ContextWrapper = {
    context: ListContext;
};
/**
 * The context that we will provide to our list elements
 */
export declare const listContext: {
    __context__: ContextWrapper;
};
