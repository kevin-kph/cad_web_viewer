import { ProductOccurrence } from '../node/ProductOccurrence';
import { VisibilityVisitor } from './VisibilityVisitor';
import { VisibilityVisitorOptions } from './types';
export declare class BodyVisibilityVisitor extends VisibilityVisitor {
    constructor(options: VisibilityVisitorOptions);
    /**
     * Check whether or not the current node is the configuration node and update the visitor
     * status without updating the node visibility status.
     * If it is the configuration node it tags the config so the visitor knows the current
     * branch contains the configuration node.
     *
     * @param node the current ProductOccurence
     */
    enterProductOccurrence(node: ProductOccurrence): void;
}
