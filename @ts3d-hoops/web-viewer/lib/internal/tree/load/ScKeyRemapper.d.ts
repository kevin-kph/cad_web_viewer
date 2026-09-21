import { InclusionKey, ModelKey } from '@ts3d-hoops/streamcache';
import { PhantomMember } from '../../types';
export declare class ScKeyRemapper {
    remapModel(effectiveModelKey: ModelKey, originalModelKey: ModelKey): void;
    remapInclusion(effectiveModelKey: ModelKey, effectiveInclusionKey: InclusionKey, originalInclusionKey: InclusionKey): void;
    getEffectiveModelKey(originalModelKey: ModelKey): ModelKey;
    getEffectiveInclusionKey(originalInclusionKey: InclusionKey, effectiveModelKey: ModelKey): InclusionKey;
    protected readonly __ScKeyRemapper: PhantomMember;
    private readonly _remappedModelKeys;
    private readonly _remappedInclusionKeys;
}
