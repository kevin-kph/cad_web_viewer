import { Matrix } from '@ts3d-hoops/common';
import { XmlAttachInfo } from './ScAttacher';
import { ViewInfo } from './ViewInfo';
import { PhantomMember } from '../../types';
import { IScEngine } from '../../../core/IScEngine';
import { IView } from '../../../core';
export type XmlAttachPriorityProxy = object;
export type NonXmlAttachPriorityValue = number;
export type AttachPriority = NonXmlAttachPriorityValue | XmlAttachPriorityProxy;
export interface OpaqueAttachPriority {
    _OpaqueAttachPriority: PhantomMember;
}
/**
 * This is used to prioritize the order of attaching pending attachments.
 */
export declare class AttachPriorityManager {
    constructor();
    getPriorityCompareValue(priority: AttachPriority): number;
    setRequireBoundingInfo(required: boolean): void;
    comparePriority(p1: AttachPriority, p2: AttachPriority): boolean;
    private _updateHeuristicInfo;
    createPriority(viewInfo: ViewInfo, inclusionMatrix: Matrix, xmlAttachInfo: XmlAttachInfo | null): AttachPriority;
    destroyPriority(priority: AttachPriority): void;
    onViewChange(viewInfo: ViewInfo, view: IView, engine: IScEngine): void;
    reset(): void;
    private _calculateCutoff;
    getCalculatedCutoff(): number;
    protected readonly __AttachQueue: PhantomMember;
    private readonly _priorityProxies;
    private _prevPriorityValue;
    private _calculatedCutoff;
    private _requireBoundingInfo;
}
