import { LayerId, LayerName } from '../../../types';
import { AssemblyDataParser } from '../load/AssemblyDataParser';
import { AnyTreeNode } from '../node/types';
import { AuthoredLayerId, LayerInfo } from './types';
export declare class Layer {
    id: LayerId;
    name: LayerName | null;
    authoredId: AuthoredLayerId | null;
    nodes: AnyTreeNode[];
    treeNodes: AnyTreeNode[];
    static NoLayerId: number;
    static parseBinary(parser: AssemblyDataParser): LayerInfo;
    static parseXml(elem: Element): LayerInfo | null;
    constructor(id: LayerId, name: LayerName | null, nodes: AnyTreeNode[], treeNodes: AnyTreeNode[], authoredId?: AuthoredLayerId | null);
}
