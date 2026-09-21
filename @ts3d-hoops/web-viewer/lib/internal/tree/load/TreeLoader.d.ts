import { ModelInc } from '@ts3d-hoops/streamcache';
import { LoadSubtreeConfig, ScsBuffer, ScModelName, ScsUri, XmlFilename } from '../../../types';
import { PhantomMember } from '../../types';
import { AssemblyData, AssemblyDataHeader } from '../AssemblyData';
import { AttachContext } from '../context/AttachContext';
import { InclusionContext } from '../context/InclusionContext';
import { LoadContext } from '../context/LoadContext';
import { ProductOccurrence } from '../node/ProductOccurrence';
import { ExternalModelInfo } from './ExternalModel';
import { ScAttacher, VersionedToAttachDataFunc } from './ScAttacher';
import { ActionResult } from '../../../util/promise/CurrentAction';
import { IScEngine } from '../../../core/IScEngine';
import { ICallbackManager } from '../../../core/ICallbackManager';
import { IAssemblyTree, IView } from '../../../core';
export declare class TreeLoader {
    constructor(assemblyTree: IAssemblyTree, scAttacher: ScAttacher, engine: IScEngine, view: IView, callbackManager: ICallbackManager);
    private _resolveMeasurementUnits;
    private _applyScalePatchIfNeeded;
    /**
     * Used to create assembly tree data for instances that don't have authored assembly tree data.
     */
    private _patchImplicitNodesByModelInc;
    private _getPrototypeInstanceCountByAttachment;
    /**
     * Used to create assembly tree data for instances that don't have authored assembly tree data.
     */
    private _patchImplicitNodesByAttachment;
    /**
     * Newly loaded children should have their instances demanded if any of their
     * ancestors are currently being demanded. This function performs this logic.
     */
    private _updateOnDemandRequests;
    private _populateAttachment;
    private _postProcessAttachContext;
    private _parseRootNodes;
    private _parseRootNode;
    private _setupRootNode;
    private _populateInclusion;
    /**
     * COM-1701
     */
    private _rectifyLateVisibilityChange;
    private _loadCleanup;
    private _wrap;
    private _initLoad;
    private static _getNetMatrix;
    private _lazyAttachInvisibly;
    private _loadBySingleAttach;
    private _populateFromXml;
    private _loadByXml;
    private _attachExternalModelByInc;
    private _attachExternalModelInfoByName;
    setPrefetchScsCutoffScale(prefetchCutoffScale: number): void;
    isIdle(): boolean;
    waitOnCurrentLoads(): Promise<void>;
    cancelPendingLoads(): Promise<void>;
    cancelActiveAttachmentProcess(): Promise<void>;
    loadByStream(config: LoadSubtreeConfig, parent: ProductOccurrence, modelName: ScModelName): Promise<LoadContext>;
    loadByScsBuffer(config: LoadSubtreeConfig, parent: ProductOccurrence, scsBuffer: ScsBuffer): Promise<LoadContext>;
    loadByScsFile(config: LoadSubtreeConfig, parent: ProductOccurrence, scsFilename: ScsUri): Promise<LoadContext>;
    loadByXmlDoc(config: LoadSubtreeConfig, parent: ProductOccurrence, xmlData: string | Document, toAttachData: VersionedToAttachDataFunc): Promise<LoadContext>;
    loadByXmlFile(config: LoadSubtreeConfig, parent: ProductOccurrence, xmlFilename: XmlFilename, toAttachData: VersionedToAttachDataFunc): Promise<LoadContext>;
    attachByExternalModelInfo(info: ExternalModelInfo, parent: ProductOccurrence, inclusionContext: InclusionContext): Promise<AttachContext>;
    /**
     * I don't think this is used at all. If so, this should be removed.
     */
    loadByAssemblyData(config: LoadSubtreeConfig, parent: ProductOccurrence, modelInc: ModelInc, assemblyData: AssemblyData): Promise<LoadContext>;
    reset(): Promise<void>;
    notifyDirectRequest(node: ProductOccurrence): void;
    onLoadChildProductOccurrence(): ActionResult;
    firstAssemblyDataHeader(): AssemblyDataHeader | null;
    protected readonly __TreeLoader: PhantomMember;
    private readonly _assemblyTree;
    private readonly _scAttacher;
    private readonly _engine;
    private readonly _view;
    private readonly _callbackManager;
    private readonly _isScsSession;
    private _loadQueue;
    private _activeLoadCount;
    private _activeLoadGeneration;
    private _isFirstLoad;
    private _firstAssemblyDataHeader;
    private _nodesUntilNextSleep;
}
