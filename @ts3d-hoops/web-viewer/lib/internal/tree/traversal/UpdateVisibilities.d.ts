import { SetVisibility } from '@ts3d-hoops/streamcache';
import { AttachContext } from '../context/AttachContext';
import { ProductOccurrence } from '../node/ProductOccurrence';
import { AnyTreeNode } from '../node/types';
import { IScEngine } from '../../../core/IScEngine';
import { ICallbackManager } from '../../../core/ICallbackManager';
import { IAssemblyTree } from '../../../core';
export declare function updateVisibilitiesByAttachment(options: {
    assemblyTree: IAssemblyTree;
    engine: IScEngine;
    attachContext: AttachContext;
    setVisibility: SetVisibility;
}): Promise<void>;
export declare function updateBodyNodesVisibilitiesByAttachment(options: {
    assemblyTree: IAssemblyTree;
    engine: IScEngine;
    attachContext: AttachContext;
    setVisibility: SetVisibility;
}): Promise<void>;
export declare function updateVisibilities(options: {
    assemblyTree: IAssemblyTree;
    engine: IScEngine;
    startNode: ProductOccurrence | AnyTreeNode;
    visibilityFormatter: (node: AnyTreeNode) => boolean | undefined;
    resetNonAffectedToDefault: boolean;
    resetNonAffectedPmiToDefault?: boolean;
    configurationNode?: ProductOccurrence;
    callbackManager?: ICallbackManager;
    initiallyHiddenStayHidden?: boolean;
}): Promise<void>;
export declare function updateBodyNodesVisibilities(options: {
    assemblyTree: IAssemblyTree;
    engine: IScEngine;
    startNode: ProductOccurrence | AnyTreeNode;
    visibilityFormatter: (node: AnyTreeNode) => boolean | undefined;
    resetNonAffectedToDefault: boolean;
    resetNonAffectedPmiToDefault?: boolean;
    configurationNode?: ProductOccurrence;
    callbackManager?: ICallbackManager;
    initiallyHiddenStayHidden?: boolean;
}): Promise<void>;
export declare function synchronizePmiVisibilities(engine: IScEngine, startNode: AttachContext): Promise<void>;
