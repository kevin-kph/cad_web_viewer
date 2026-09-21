import { AnyTreeNode } from '../node/types';
import { IScEngine } from '../../../core/IScEngine';
import { ICallbackManager } from '../../../core/ICallbackManager';
export declare function updateScMatrices(engine: IScEngine, callbackManager: ICallbackManager, startNodes: AnyTreeNode[], allowOutOfHierarchy: boolean): Promise<void>;
