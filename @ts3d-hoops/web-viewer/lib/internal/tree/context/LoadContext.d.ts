import { TrackedOpenPromise } from '../../../util/promise/TrackedOpenPromise';
import { InclusionKey, ModelKey } from '@ts3d-hoops/streamcache';
import { LayerId, ExternalModelName, ScsBuffer } from '../../../types';
import { PromiseCache } from '../../PromiseCache';
import { PhantomMember } from '../../types';
import { AuthoredNodeId } from '../NodeId';
import { ToAttachDataFunc } from '../load/ScAttacher';
import { AuthoredLayerId } from '../node-data/types';
import { ProductOccurrence } from '../node/ProductOccurrence';
import { AttachContext } from './AttachContext';
import { InclusionContext } from './InclusionContext';
export type LoadContextParent = ProductOccurrence | null;
/**
 * This object lives in the tree structure of `AssemblyTree`.
 * `LoadContext` stores information relevant to the "load" of tree nodes below it.
 * If multiple `LoadContext`s are ancestors to a given node, the closest
 * context takes precedence.
 *
 * See `AnyTreeContext` for generic information about tree contexts.
 *
 * This context always roots subtrees loaded from any of the `Model.loadSubtreeFromXxx`
 * methods as well as the tree's absolute root node.
 */
export declare class LoadContext {
    constructor(parent: LoadContextParent, _debugLoadString: string, scsBufferCache: PromiseCache<ExternalModelName, ScsBuffer | null> | null);
    /**
     * Returns whether or not an authored external model should be handled or not.
     */
    handleExternalModel(includerAuthoredNodeId: AuthoredNodeId, includerInclusionContext: InclusionContext, externalInclusionKey: InclusionKey): boolean;
    getParent(): LoadContextParent;
    addAttachContext(context: AttachContext): void;
    getChildren(): ProductOccurrence[];
    getAttachContexts(): AttachContext[];
    hasChildren(): boolean;
    removeProductOccurrence(node: ProductOccurrence): boolean;
    purgeContents(): Promise<void>;
    isLoaded(): boolean;
    /**
     * This should not be called more than once per `ExternalModelName` in a given `LoadContext`.
     */
    initializeScsModelKeysOf(modelName: ExternalModelName): void;
    /**
     * Gets the model keys of an SCS model by its external name from a shattered XML file.
     *
     * Returns:
     *  - `null` if `initializeScsModelKeysOf` was not called for the given model.
     *  - `TrackedOpenPromise<null>` if the model has no attachment data.
     *  - `TrackedOpenPromise<ModelKey[]>` if the model has attachment data.
     */
    getScsModelKeysOf(modelName: ExternalModelName): TrackedOpenPromise<ModelKey[] | null> | null;
    markAsFirstLoad(): void;
    isFirstLoad(): boolean;
    toScsBuffer(modelName: ExternalModelName, toAttachData: ToAttachDataFunc): Promise<ScsBuffer | Response | null>;
    onLoadComplete(): void;
    addLayerIdToMap(runtimeId: LayerId, authoredId: AuthoredLayerId): void;
    getAuthoredLayerId(runtimeId: LayerId): AuthoredLayerId | null;
    getRuntimeLayerId(authoredId: AuthoredLayerId): LayerId | null;
    protected readonly __LoadContext: PhantomMember;
    private readonly _parent;
    private _scsBufferCache;
    private _handledExternalModels;
    private _attachContexts;
    private _registeredScsModelKeys;
    private _isFirstLoad;
    private _layerIdMap;
}
