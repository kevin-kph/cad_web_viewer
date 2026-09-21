import { BimId, RelationshipType } from '../../../../types';
import { RelationshipRelated } from './RelationshipRelated';
import { BimObject, BimRelationship } from './types';
import { Relationship } from './Relationship';
export declare class RelationshipUtils {
    static pushRelatedItemFromParser(relatedParsed: RelationshipRelated): BimObject[];
    static addFromRelatingElt(relationToAdd: Relationship, everyRelationshipByType: Map<RelationshipType, BimRelationship>): void;
    static findBimObjectInArray(relationships: BimObject[], bimObject: BimObject): boolean;
    static addFromRelatedElt(iterRel: Relationship, outEveryRelationships: Map<RelationshipType, BimRelationship>): void;
    static findIndexInRelated(node: BimId, tabUnporcRel: BimObject[]): number;
}
