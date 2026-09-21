import { InstanceKey, MasterModelKey } from '@ts3d-hoops/streamcache';
import { PhantomMember } from '../../types';
import { AnyBodyBits, AnyBodyInfo } from '../types';
import { NodeMixin } from './NodeMixin';
import { AnyBodyModifierBits } from '..';
import { IAssemblyTree } from '../../../core';
import { NodeDrawMode } from '../../../types';
export declare class BodyMixin<Parent> extends NodeMixin<AnyBodyBits> {
    protected constructor(assemblyTree: IAssemblyTree, masterModelKey: MasterModelKey, parent: Parent, info: AnyBodyInfo);
    setRequested(): void;
    isRequested(): boolean;
    isOutOfHierarchy(): boolean;
    preventFromResetting(): boolean;
    isImplicitBody(): boolean;
    getParent(): Parent;
    getInstanceKey(): InstanceKey;
    hasModifiers(): boolean;
    ignoreParentScale(): boolean;
    ignoreParentRotation(): boolean;
    drawMode: Record<number, NodeDrawMode>;
    protected _modifiers: AnyBodyModifierBits;
    protected readonly __BodyMixin: PhantomMember;
    private readonly _parent;
    protected readonly _instanceKey: InstanceKey;
}
