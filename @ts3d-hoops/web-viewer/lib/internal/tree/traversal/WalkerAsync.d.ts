import { AttachContext } from '../context/AttachContext';
import { LoadContext } from '../context/LoadContext';
import { AnyTreeNode } from '../node/types';
import { Visitor, WalkRestriction } from './types';
export declare class WalkerAsync {
    static walk(visitor: Visitor, node: AnyTreeNode | AttachContext | LoadContext, restriction: WalkRestriction): Promise<void>;
    static forceLazyPromises(node: AnyTreeNode | AttachContext | LoadContext): Promise<void>;
    private constructor();
    private _walkAnyTreeNode;
    private _walkRepresentationItem;
    private _walkPartDefinition;
    private _walkAnyBody;
    private _walkPmi;
    private _walkCadView;
    private _walkProductOccurrence;
    private readonly _visitor;
}
