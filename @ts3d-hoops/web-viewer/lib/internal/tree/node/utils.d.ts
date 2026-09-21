import { BranchVisibility, BranchVisibilityOptions } from '../../../types';
import { ProductOccurrence } from './ProductOccurrence';
export declare const BranchVisibilityOptionFlags: {
    readonly children: 1;
    readonly bodies: 2;
    readonly pmis: 4;
    readonly cadViews: 8;
};
export declare function branchVisibilityOptionsToFlags(options?: BranchVisibilityOptions): number;
export declare function getBodyInstancesVisibility(node: ProductOccurrence, _?: BranchVisibilityOptions): BranchVisibility | undefined;
export declare function getChildrenVisibility(node: ProductOccurrence, options?: BranchVisibilityOptions): BranchVisibility | undefined;
export declare function getPmisVisibility(node: ProductOccurrence, options?: BranchVisibilityOptions): BranchVisibility | undefined;
export declare function getCadViewsVisibility(node: ProductOccurrence, options?: BranchVisibilityOptions): BranchVisibility | undefined;
export declare function getSubBranchVisibilities(node: ProductOccurrence, options?: BranchVisibilityOptions): BranchVisibility | null;
