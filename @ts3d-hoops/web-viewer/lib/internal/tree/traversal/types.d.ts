import { SetVisibility } from '@ts3d-hoops/streamcache';
import { AttachContext } from '../context/AttachContext';
import { CadView } from '../node/CadView';
import { PartDefinition } from '../node/PartDefinition';
import { Pmi } from '../node/Pmi';
import { ProductOccurrence } from '../node/ProductOccurrence';
import { RepresentationItem } from '../node/RepresentationItem';
import { AnyBody, AnyTreeNode } from '../node/types';
import { IScEngine } from '../../../core/IScEngine';
import { ICallbackManager } from '../../../core/ICallbackManager';
import { IAssemblyTree } from '../../../core';
export type VisibilityFormatter = (node: AnyTreeNode) => boolean | undefined;
export interface VisibilityConfig {
    filterByConfiguration: boolean;
    containsCurrentConfig: boolean;
    containsAnyConfig: boolean;
    node?: ProductOccurrence;
    setVisibility?: SetVisibility;
    initially: {
        shown: boolean;
        immutableHidden?: boolean;
    };
}
export interface NodeVisibilityConfig {
    explicitVisibility?: boolean;
    visible: boolean;
    initiallyShown: boolean;
    initiallyOrConfigurationShown: boolean;
}
export interface VisibilityUpdaterOptions {
    assemblyTree: IAssemblyTree;
    engine: IScEngine;
    callbackManager?: ICallbackManager;
    startNode: ProductOccurrence | AttachContext | AnyTreeNode;
    setVisibility?: SetVisibility;
    initiallyHiddenStayHidden?: boolean;
    configurationNode?: ProductOccurrence;
}
export interface VisibilityVisitorOptions {
    visibilityFormatter?: VisibilityFormatter;
    resetNonAffectedToDefault: boolean;
    resetNonAffectedPmiToDefault?: boolean;
    configuration: VisibilityConfig;
}
export interface VisibilityVisitorState {
    currentNode: AnyTreeNode | null;
    nodeConfiguration: NodeVisibilityConfig | null;
    appliedVisibility: boolean | null;
    inheritedVisibilityStack: boolean[];
    bodiesToShow: AnyBody[];
    bodiesToHide: AnyBody[];
}
export interface VisibilityVisitorResult {
    bodies: {
        show: AnyBody[];
        hide: AnyBody[];
    };
}
export interface Visitor {
    readonly followProductOccurrence?: (node: ProductOccurrence) => boolean;
    readonly enterProductOccurrence?: (node: ProductOccurrence) => void;
    readonly leaveProductOccurrence?: (node: ProductOccurrence) => void;
    readonly followPartDefinition?: (partDef: PartDefinition) => boolean;
    readonly enterPartDefinition?: (partDef: PartDefinition) => void;
    readonly leavePartDefinition?: (partDef: PartDefinition) => void;
    readonly followRepresentationItem?: (repItem: RepresentationItem) => boolean;
    readonly enterRepresentationItem?: (repItem: RepresentationItem) => void;
    readonly leaveRepresentationItem?: (repItem: RepresentationItem) => void;
    readonly followAnyBody?: (body: AnyBody) => boolean;
    readonly enterAnyBody?: (body: AnyBody) => void;
    readonly leaveAnyBody?: (body: AnyBody) => void;
    readonly followCadView?: (cadView: CadView) => boolean;
    readonly enterCadView?: (cadView: CadView) => void;
    readonly leaveCadView?: (cadView: CadView) => void;
    readonly followPmi?: (pmi: Pmi) => boolean;
    readonly enterPmi?: (pmi: Pmi) => void;
    readonly leavePmi?: (pmi: Pmi) => void;
}
export interface IVisibilityVisitor extends Visitor {
    readonly result: VisibilityVisitorResult;
    visibilityFormatter?: VisibilityFormatter;
}
export declare enum WalkRestriction {
    None = 0,
    LoadedNodesOnly = 1
}
export interface WalkerGeneric {
    walk(visitor: Visitor, node: AnyTreeNode, restriction: WalkRestriction): Promise<void> | void;
}
