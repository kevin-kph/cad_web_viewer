import { Color } from '@ts3d-hoops/common';
import { ElementType } from '../../../types';
import { RuntimeNodeId } from '../NodeId';
import { AnyTreeNode } from '../node/types';
import { IScEngine } from '../../../core/IScEngine';
export declare function getNodeColorMap(startNode: AnyTreeNode, engine: IScEngine, elementType: ElementType): Promise<Map<RuntimeNodeId, Color>>;
