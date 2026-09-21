import { AuthoredNodeId } from '../../NodeId';
import { AssemblyDataParser } from '../../load/AssemblyDataParser';
export declare class FilterEntities {
    isInclusive: boolean;
    ids: AuthoredNodeId[];
    static parseBinary(parser: AssemblyDataParser): FilterEntities;
    static parseXml(elem: Element): FilterEntities;
}
