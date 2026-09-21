import { LoadSubtreeConfig, UserDataIndex } from '../../../types';
import { PhantomMember } from '../../types';
import { AssemblyDataParser, NodeParseBits } from '../load/AssemblyDataParser';
import { NodeInfo } from './types';
import { IAssemblyTree } from '../../../core';
export declare class Node {
    /**
     * Parses the `NodeInfo` for a node without inserting it into the tree.
     */
    static parseXml(assemblyTree: IAssemblyTree, elem: Element, config: LoadSubtreeConfig): NodeInfo;
    /**
     * Parses the `NodeInfo` for a node without inserting it into the tree.
     */
    static parseBinary(assemblyTree: IAssemblyTree, parser: AssemblyDataParser, parseBits: NodeParseBits, config: LoadSubtreeConfig): NodeInfo;
    private constructor();
    protected readonly __Node: PhantomMember;
}
export declare function compareUserDataIndices(x: UserDataIndex, y: UserDataIndex): -1 | 0 | 1;
