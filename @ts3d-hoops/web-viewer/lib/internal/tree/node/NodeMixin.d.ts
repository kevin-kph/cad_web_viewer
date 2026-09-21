import { Matrix16 } from '@ts3d-hoops/common';
import { MasterModelKey } from '@ts3d-hoops/streamcache';
import { UserDataIndex, ExchangeId, GenericId } from '../../../types';
import { AuthoredNodeId, DynamicNodeId } from '../NodeId';
import { Attribute } from '../node-data/Attribute';
import { AuthoredLayerId } from '../node-data/types';
import { NodeBits, NodeInfo } from './types';
import { GenericTypeId } from '../context/AttachContext';
import { PhantomMember } from '../../types';
import { IAssemblyTree } from '../../../core';
/**
 * The base functionality of `AnyTreeNode`.
 *
 * As an implementation detail, node classes inherit from this to gain common functionality.
 * As a general rule of thumb, avoid relying on this fact and instead use sum types such as
 * `AnyTreeNode` or `AnyNode`. This avoidance is for maintenance and robustness reasons.
 */
export declare class NodeMixin<Bits extends number> {
    protected constructor(assemblyTree: IAssemblyTree, masterModelKey: MasterModelKey, info: NodeInfo);
    private static _lazyLoadAttributes;
    hasAuthoredId(): boolean;
    getAuthoredId(): AuthoredNodeId;
    getName(): string | null;
    getExchangeId(): ExchangeId | null;
    getAuthoredLayerId(): AuthoredLayerId | null;
    getGenericTypeId(): GenericTypeId | null;
    getGenericId(): GenericId | null;
    protected _hasBits(bits: NodeBits | Bits): boolean;
    isLoaded(): boolean;
    markLoaded(): void;
    protected _setVisibility(visible: boolean): void;
    isVisible(): boolean;
    isInitiallyShown(): boolean;
    private _toAffineTransformation;
    setLocalTransformAsInitial(matrix: Matrix16): void;
    overrideLocalTransform(matrix: Matrix16): void;
    hasLocalTransformOverride(): boolean;
    removeLocalTransformOverride(): void;
    getLocalTransform(): Matrix16 | null;
    getAttributes(): Promise<Attribute[]>;
    addAttribute(attr: Attribute): void;
    getUserDataIndices(): UserDataIndex[];
    getUserData(index: UserDataIndex): Uint8Array;
    protected readonly __NodeMixin: PhantomMember;
    protected readonly _nodeId: AuthoredNodeId | DynamicNodeId;
    private readonly _name;
    protected _bits: NodeBits | Bits;
    private _exchangeId;
    private _layerId;
    private _genericTypeId;
    private _genericId;
    private _lazyAttributes;
    private _attributes;
    private _localTransform;
    private _localTransformOverride;
    private _userDatas;
}
