import { Box } from '@ts3d-hoops/common';
import { InclusionKey, ModelKey } from '@ts3d-hoops/streamcache';
import { ExternalModelName, LoadSubtreeConfig } from '../../../types';
import { NodeIdOffset } from '../NodeId';
import { ToAttachDataFunc } from './ScAttacher';
export type ExternalModelInfo = ExternalModelInfoByInc | ExternalModelInfoByName;
/**
 * This is for any external models authored into a model using ModelIncs.
 */
export interface ExternalModelInfoByInc {
    readonly config: LoadSubtreeConfig;
    readonly inclusionKey: InclusionKey;
    readonly modelKey: ModelKey;
}
/**
 * This is used for any external models discovered in XML files by name.
 */
export interface ExternalModelInfoByName {
    readonly config: LoadSubtreeConfig;
    readonly modelName: ExternalModelName;
    readonly bounding: Box | null;
    readonly measurementUnit: number | null;
    readonly toAttachData: ToAttachDataFunc;
    readonly reservedNodeIdOffset: NodeIdOffset;
    readonly cancelUnitScale: boolean;
    readonly autoUnitScale: boolean;
}
export declare function isNameInfo(info: ExternalModelInfo): info is ExternalModelInfoByName;
export declare function isIncInfo(info: ExternalModelInfo): info is ExternalModelInfoByInc;
export declare function canImplicitlyLoad(info: ExternalModelInfo): boolean;
