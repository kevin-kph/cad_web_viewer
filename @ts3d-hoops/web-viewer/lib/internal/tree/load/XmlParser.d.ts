import { Box } from '@ts3d-hoops/common';
import { DataKey, InstanceKey, MeshKey } from '@ts3d-hoops/streamcache';
import { Camera } from '../../../Camera';
import { AuthoredNodeId } from '../NodeId';
import { AuthoredLayerId } from '../node-data/types';
export declare class XmlParser {
    private static _parseUint_32;
    static _parseFloat(str: string): number | null;
    static parseFloat(elem: Element, attrName: string): number | null;
    private static _parseScKey;
    static parseDataKey(elem: Element, attrName: string): DataKey | null;
    static parseMeshKey(elem: Element, attrName: string): MeshKey | null;
    static parseInstanceKeyFromInc(elem: Element, attrName: string): InstanceKey | null;
    static parseNodeId(elem: Element, attrName: string): AuthoredNodeId | null;
    static parseLayerId(elem: Element, attrName: string): AuthoredLayerId | null;
    static parseUint(element: Element, attrName: string): number | null;
    static parseUints(elem: Element, attrName: string): number[] | null;
    static parseFloats(elem: Element, attrName: string): number[] | null;
    static parseNodeIds(elem: Element, attrName: string): AuthoredNodeId[] | null;
    private static _parsePoint3;
    static parseBounding(parentElem: Element, childName: string): Box | null;
    static parseCamera(elem: Element): Camera | null;
}
