import { LazyObject } from '../../LazyObject';
import { LazyPromise } from '../../LazyPromise';
import { PhantomMember } from '../../types';
import { ProductOccurrence } from '../node/ProductOccurrence';
import { InclusionContext } from './InclusionContext';
/**
 * The shared portion of a prototype context.
 */
export declare class SharedPrototypeContext {
    constructor(prototype: LazyPromise<ProductOccurrence>);
    _addReferrer(referrer: ProductOccurrence): void;
    _getReferrers(): ProductOccurrence[];
    _getPrototype(): LazyPromise<ProductOccurrence>;
    _removeReferrer(node: ProductOccurrence): boolean;
    _purgeContents(): Promise<void>;
    _isLoaded(): boolean;
    protected readonly __SharedPrototypeContext: PhantomMember;
    private readonly _prototype;
    private _referrers;
}
/**
 * This (by design) is used to break the tree structure of the assembly tree.
 * Because this exists, the tree is actually a directed acyclic graph.
 * If I'm not mistaken, this is much like an inclusion in the Visualize sense of the term.
 * (Not to be confused with the SC sense of the term.)
 */
export declare class PrototypeContext {
    constructor(shared: SharedPrototypeContext | LazyObject<SharedPrototypeContext>, inclusionContext: InclusionContext);
    getInclusionContext(): InclusionContext;
    addReferrer(referrer: ProductOccurrence): void;
    getReferrers(): ProductOccurrence[];
    getProductOccurrence(): LazyPromise<ProductOccurrence>;
    removeReferrer(node: ProductOccurrence): boolean;
    removeAllReferrers(): void;
    purgeContents(): Promise<void>;
    isLoaded(): boolean;
    protected readonly __PrototypeContext: PhantomMember;
    private readonly _shared;
    private readonly _inclusionContext;
}
