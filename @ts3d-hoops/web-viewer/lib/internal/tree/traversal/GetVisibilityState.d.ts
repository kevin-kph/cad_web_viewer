import { VisibilityState } from '../../../types';
import { AnyTreeNode } from '../node/types';
export declare function getVisibilityState(startNode: AnyTreeNode, initialState?: boolean): Promise<VisibilityState>;
