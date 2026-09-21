import { AnyTreeNode } from '../node/types';
import { Visitor, WalkRestriction } from './types';
export declare class WalkerSync {
    static walk(visitor: Visitor, node: AnyTreeNode, restriction: WalkRestriction): void;
    private constructor();
    private _walkRepresentationItem;
    private _walkPartDefinition;
    private _walkAnyBody;
    private _walkPmi;
    private _walkCadView;
    private _walkProductOccurrence;
    private readonly _visitor;
}
