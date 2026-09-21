import { BimObject } from './types';
import { InclusionContext } from '../../context/InclusionContext';
import { AssemblyDataParser } from '../../load/AssemblyDataParser';
export declare class RelationshipRelating {
    relationElt: BimObject;
    static parseBinary(inclusionContext: InclusionContext, parser: AssemblyDataParser): RelationshipRelating;
    static parseXml(_elem: Element): RelationshipRelating;
}
