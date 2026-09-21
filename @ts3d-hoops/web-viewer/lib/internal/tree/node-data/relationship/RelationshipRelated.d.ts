import { BimObject } from './types';
import { InclusionContext } from '../../context/InclusionContext';
import { AssemblyDataParser } from '../../load/AssemblyDataParser';
export declare class RelationshipRelated {
    relationships: BimObject[];
    static parseBinary(inclusionContext: InclusionContext, parser: AssemblyDataParser): RelationshipRelated;
}
