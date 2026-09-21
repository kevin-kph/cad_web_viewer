import { AttachScope, InclusionKey, MasterModelKey, ModelIncs, ModelKey } from '@ts3d-hoops/streamcache';
export interface AttachInfo {
    getAttachScope(): AttachScope;
    getMasterModelKey(): MasterModelKey;
    getModelKeys(): ModelKey[];
    hasInclusions(): boolean;
    getAllInclusions(): ModelIncs;
    getInclusionsOf(modelKey: ModelKey | MasterModelKey): ModelIncs;
    hasModelIncluded(modelKey: ModelKey): boolean;
    attachedInvisibly(): boolean;
    /**
     * Returns the number of instance prototypes in the attachment.
     * If this returns the value 0, then the number is unknown (and may be
     * queried later by manually calling `AbstractScEngine.instanceKeyInfo`).
     */
    prototypeInstanceCount(): number;
}
export declare class AttachInfoBuilder implements AttachInfo {
    constructor(attachScope: AttachScope, attachedInvisibly: boolean);
    getAttachScope(): AttachScope;
    getMasterModelKey(): MasterModelKey;
    getModelKeys(): ModelKey[];
    hasInclusions(): boolean;
    getAllInclusions(): ModelIncs;
    getInclusionsOf(modelKey: ModelKey | MasterModelKey): ModelIncs;
    hasModelIncluded(modelKey: ModelKey): boolean;
    attachedInvisibly(): boolean;
    prototypeInstanceCount(): number;
    registerInclusion(inclusionKey: InclusionKey, modelKey: ModelKey): void;
    registerMasterModelKey(masterModelKey: MasterModelKey): void;
    registerPrototypeInstanceCount(prototypeInstanceCount: number): void;
    private readonly _inclusionsOf;
    private readonly _attachScope;
    private readonly _attachedInvisibly;
    private _masterModelKey;
    private _prototypeInstanceCount;
}
