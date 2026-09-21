import { Box } from '@ts3d-hoops/common';
import { LoadSubtreeConfig } from '../../../types';
import { VersionNumber } from '../../utils';
import { InclusionContext } from '../context/InclusionContext';
import { ProductOccurrence, ProductOccurrenceInfo } from '../node/ProductOccurrence';
import { ToAttachDataFunc } from './ScAttacher';
import { TreeLoader } from './TreeLoader';
import { RoseTree } from '../../RoseTree';
import { PhantomMember } from '../../types';
import { ICallbackManager } from '../../../core/ICallbackManager';
import { IAssemblyTree } from '../../../core';
export declare const MaxModelFileVersion: VersionNumber;
/**
 * This is a wrapper over `ProductOccurrenceInfo` so the two
 * types can be differentiated with an `instanceof` check.
 */
export declare class ReferencedNodeInfo {
    constructor(nodeInfo: ProductOccurrenceInfo);
    protected readonly __ReferencedNodeInfo: PhantomMember;
    readonly referencedInfo: ProductOccurrenceInfo;
}
export type ModelFileNodeInfo = ProductOccurrenceInfo | ReferencedNodeInfo;
/**
 * This contains the tree structure of a `ModelFile`.
 * The XML files used for loading models are of model files.
 */
export interface ModelFileInfo {
    treeInfos: RoseTree<ModelFileNodeInfo>[];
}
/**
 * Extracts the `ProductOccurrenceInfo` from any `ModelFileNodeInfo`.
 */
export declare function modelFileNodeInfoAsProdOccInfo(nodeInfo: ModelFileNodeInfo): ProductOccurrenceInfo;
export declare class ModelFile {
    /**
     * This is used to parse `ModelFileInfo` without adding it to the tree.
     */
    static parseXml(config: LoadSubtreeConfig, assemblyTree: IAssemblyTree, inclusionContext: InclusionContext, elem: Element, toAttachData: ToAttachDataFunc): ModelFileInfo;
    private static _parentMapToChildMap;
    private static _childMapRoseTrees;
    /**
     * Inserts `ModelFileInfo` into the assembly tree.
     */
    static reify(config: LoadSubtreeConfig, callbackManager: ICallbackManager, treeLoader: TreeLoader, assemblyTree: IAssemblyTree, context: InclusionContext, fileInfo: ModelFileInfo): Promise<ProductOccurrence[]>;
    private static _rectifyExternalModelInfo;
    private static _reifyProductOccurrence;
    private static _parseBounding;
    static parseBounding(modelFileInfo: ModelFileInfo, parentUnit: number): Box;
    private constructor();
    protected readonly __ModelFile: PhantomMember;
}
