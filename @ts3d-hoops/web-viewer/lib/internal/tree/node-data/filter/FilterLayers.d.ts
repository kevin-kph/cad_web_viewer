import { AssemblyDataParser } from '../../load/AssemblyDataParser';
import { AuthoredLayerId } from '../types';
export declare class FilterLayers {
    isInclusive: boolean;
    authoredIds: AuthoredLayerId[];
    static parseBinary(parser: AssemblyDataParser): FilterLayers;
    static parseXml(elem: Element): FilterLayers;
}
