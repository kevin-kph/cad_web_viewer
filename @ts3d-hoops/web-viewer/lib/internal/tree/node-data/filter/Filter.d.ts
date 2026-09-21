import { FilterName, FilterId } from '../../../../types';
import { AssemblyDataParser } from '../../load/AssemblyDataParser';
import { FilterEntities } from './FilterEntities';
import { FilterLayers } from './FilterLayers';
export declare class Filter {
    isDisplayfilter: boolean;
    name: FilterName | null;
    isActive: boolean;
    layers: FilterLayers | null;
    entities: FilterEntities | null;
    scId: FilterId | null;
    static parseBinary(parser: AssemblyDataParser): Filter;
    static parseXml(elem: Element): Filter;
}
