import { Box } from '@ts3d-hoops/common';
import { RuntimeNodeId } from '../NodeId';
import { BodyTypeBits } from '../types';
import { IScEngine } from '../../../core/IScEngine';
import { IAssemblyTree } from '../../../core';
export declare function getBoundingByNodeId(assemblyTree: IAssemblyTree, engine: IScEngine, nodeIds: RuntimeNodeId[], bodyTypeMask: BodyTypeBits, ignoreInvisible: boolean, tightBounding: boolean): Promise<Box>;
