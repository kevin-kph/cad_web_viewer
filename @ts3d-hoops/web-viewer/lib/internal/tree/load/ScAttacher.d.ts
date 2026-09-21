import { Matrix, Box } from '@ts3d-hoops/common';
import { AttachScope } from '@ts3d-hoops/streamcache';
import { ScModelName, ScsBuffer, ExternalModelName } from '../../../types';
import { Lazy, PhantomMember } from '../../types';
import { VersionNumber } from '../../utils';
import { ProductOccurrence } from '../node/ProductOccurrence';
import { AttachInfo } from './AttachInfo';
import { ScKeyRemapper } from './ScKeyRemapper';
import { IScEngine } from '../../../core/IScEngine';
import { ICallbackManager } from '../../../core/ICallbackManager';
import { IAssemblyTree, IView } from '../../../core';
export type AttachData = ScModelName | ScsBuffer | Response;
/**
 * Returns `null` or `Promise<null>` to signify skipping the external model.
 * Returns `AttachData` or `Promise<AttachData>` otherwise for the external model.
 */
export type ToAttachDataFunc = (modelName: ExternalModelName) => Promise<AttachData | null> | AttachData | null;
/** A variant of `ToAttachDataFunc` that also accepts a format version. */
export type VersionedToAttachDataFunc = (modelName: ExternalModelName, formatVersion: VersionNumber) => Promise<AttachData | null> | AttachData | null;
export interface XmlAttachInfo {
    readonly bounding: Box | null;
    readonly parent: ProductOccurrence;
    /**
     * If true, the attachment associated with this info will get prioritized over
     * other non-directly requested pending attachments.
     * See `AttachPriorityManager._updateHeuristicInfo` to see how priorities are affected by this.
     */
    directlyRequested: boolean;
}
/**
 * This class is used to make SC attachments. It abstracts away low-level SC messages
 * used for attachments. See `_awaitAttachInfo` for such abstractions.
 */
export declare class ScAttacher {
    static createWithEmptyModel(engine: IScEngine, view: IView, callbackManager: ICallbackManager, maxConcurrentAttachments: number | null): Promise<ScAttacher>;
    private constructor();
    setPrefetchScsCutoffScale(prefetchCutoffScale: number): void;
    /**
     * Used in the constructor only.
     */
    private _createAttachQueue;
    /**
     * Used in the constructor only.
     */
    private _createPrefetchScsQueue;
    private _reprioritizeAttachments;
    /**
     * Used in the constructor only.
     */
    private _registerCameraListener;
    reprioritizeAttachmentsNow(): void;
    private _onCameraChange;
    /**
     * This listens on SC messages relevant for a given attachment.
     * This abstracts away the low-level details about an attachment
     * and bundles relevant information in a promise return value.
     */
    private _awaitAttachInfo;
    private _createPriority;
    private _cleanupAttachLowLevel;
    private _cleanupAttachHighLevel;
    newAttachScope(): AttachScope;
    private _attachByStream;
    private static _getAllModelKeys;
    /**
     * This function is used to attach SCS buffers that are keyed to an `ExternalModelName`.
     * This happens when attaching an SCS from a model found in a shattered XML file.
     *
     * This function should be used over `simpleAttach` for this case. This is because `simpleAttach`
     * only takes a buffer as an argument. Without storing the entire buffer as a key to the attached
     * model keys of the SCS model, subsequent attachments of equivalent buffers cannot leverage
     * making new inclusions of the existing attached models. On the other hand, this keys the
     * attached models from the SCS buffer, allowing model sharing for subsequent attachments.
     *
     * cancelUnitMatrix is a patch to tell to the engine to cancel the undesired scale matrix for
     * some model type in some version when using the shattered workflow.
     *
     * Returns `Promise<null>` when the attachment is skipped (due to `toAttachData` returning `null`).
     */
    attachByNamedScsBuffer(assemblyTree: IAssemblyTree, modelName: ExternalModelName, remapper: ScKeyRemapper, toAttachData: ToAttachDataFunc, inclusionMatrix: Matrix, parentMeasurementUnit: number, attachInvisibly: Lazy<boolean>, xmlAttachInfo: XmlAttachInfo, cancelUnitMatrix: boolean, autoUnitScale: boolean): Promise<AttachInfo | null>;
    private streamScsData;
    private _attachByScsBuffer;
    simpleAttach(assemblyTree: IAssemblyTree, remapper: ScKeyRemapper, attachData: ScsBuffer, inclusionMatrix: Matrix, parentMeasurementUnit: number, attachInvisibly: Lazy<boolean>, xmlAttachInfo: null, allowMissingModel: boolean): Promise<AttachInfo>;
    simpleAttach(assemblyTree: IAssemblyTree, remapper: ScKeyRemapper, attachData: ScModelName, inclusionMatrix: Matrix, parentMeasurementUnit: number, attachInvisibly: Lazy<boolean>, xmlAttachInfo: XmlAttachInfo | null, allowMissingModel: boolean): Promise<AttachInfo>;
    simpleAttach(assemblyTree: IAssemblyTree, remapper: ScKeyRemapper, attachData: AttachData, inclusionMatrix: Matrix, parentMeasurementUnit: number, attachInvisibly: Lazy<boolean>, xmlAttachInfo: null, allowMissingModel: boolean): Promise<AttachInfo>;
    reset(): Promise<void>;
    /**
     * This method will effectively cancel an active LoadSubtreeByXML operation.
     * All deferred promises in the prefetch queue will be canceled.
     * Note that any open promises i.e. SCS files that are being fetched when this method is called will resolve before this method returns.
     */
    clearAttachQueues(): Promise<void>;
    isIdle(): boolean;
    /**
     * Call this when a node has been directly requested by `Model.prototype.requestNodes`.
     */
    notifyDirectRequest(node: ProductOccurrence): void;
    registerXmlAttachInfo(info: XmlAttachInfo): void;
    private _forgetXmlAttachment;
    maxConcurrentAttachments(): number;
    protected readonly __ScAttacher: PhantomMember;
    private readonly _engine;
    private readonly _view;
    private readonly _callbackManager;
    private readonly _parentToXmlAttachInfos;
    private readonly _attachPriorityManager;
    private readonly _comparePriority;
    private readonly _attachQueue;
    private readonly _prefetchScsQueue;
    private _viewInfo;
    private _cameraTimeoutId;
    private _isFirstAttachment;
    private _attachScope;
}
