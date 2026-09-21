import { BimId, RelationshipType } from '../../../../types';
import { InclusionContext } from '../../context/InclusionContext';
import { AssemblyDataParser } from '../../load/AssemblyDataParser';
import { RelationshipRelated } from './RelationshipRelated';
import { RelationshipRelating } from './RelationshipRelating';
export declare class Relationship {
    type: RelationshipType;
    related: RelationshipRelated | null;
    relating: RelationshipRelating | null;
    static registerBimId(bimId: BimId, inclusionContext: InclusionContext): void;
    static parseBinary(inclusionContext: InclusionContext, parser: AssemblyDataParser): Relationship;
    static parseXml(elem: Element): Relationship;
}
