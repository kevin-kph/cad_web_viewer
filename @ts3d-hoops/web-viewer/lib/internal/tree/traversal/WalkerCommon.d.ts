import { CadView } from '../node/CadView';
import { PartDefinition } from '../node/PartDefinition';
import { Pmi } from '../node/Pmi';
import { ProductOccurrence } from '../node/ProductOccurrence';
import { RepresentationItem } from '../node/RepresentationItem';
import { AnyBody } from '../node/types';
import { Visitor, WalkRestriction } from './types';
export declare function nop(): void;
export declare class TotalVisitor {
    constructor(visitor: Visitor, restriction: WalkRestriction);
    readonly followProductOccurrence: (node: ProductOccurrence) => boolean;
    readonly enterProductOccurrence: (node: ProductOccurrence) => void;
    readonly leaveProductOccurrence: (node: ProductOccurrence) => void;
    readonly followPartDefinition: (partDef: PartDefinition) => boolean;
    readonly enterPartDefinition: (partDef: PartDefinition) => void;
    readonly leavePartDefinition: (partDef: PartDefinition) => void;
    readonly followRepresentationItem: (repItem: RepresentationItem) => boolean;
    readonly enterRepresentationItem: (repItem: RepresentationItem) => void;
    readonly leaveRepresentationItem: (repItem: RepresentationItem) => void;
    readonly followAnyBody: (body: AnyBody) => boolean;
    readonly enterAnyBody: (body: AnyBody) => void;
    readonly leaveAnyBody: (body: AnyBody) => void;
    readonly followCadView: (cadView: CadView) => boolean;
    readonly enterCadView: (cadView: CadView) => void;
    readonly leaveCadView: (cadView: CadView) => void;
    readonly followPmi: (pmi: Pmi) => boolean;
    readonly enterPmi: (pmi: Pmi) => void;
    readonly leavePmi: (pmi: Pmi) => void;
}
