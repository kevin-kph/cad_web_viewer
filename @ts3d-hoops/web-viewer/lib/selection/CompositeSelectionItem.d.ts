import { SelectionMask } from '../types';
import { FaceSelectionItem, LineSelectionItem, NodeEntitySelectionItem, PointSelectionItem } from './types';
/**
 * This class is used to represent the result of a composite picking operation.  Each of its fields may be populated with a [[NodeEntitySelectionItem]].
 */
export declare class CompositeSelectionItem {
    constructor(faceItem: FaceSelectionItem | null, lineItem: LineSelectionItem | null, pointItem: PointSelectionItem | null);
    /**
     * Returns the most relevant selection item for the provided selection mask.
     * The priority used by this method is points -> lines -> faces.
     * For example, if your selection mask was Faces | Lines and this item contained and all fields were populated, this method would return its lineItem.
     * @param mask a selection mask used to indicate the relevancy of the item to retrieve.
     * @returns the most relevant selection item if one exists.  If no relevant item is found, null is returned.
     */
    fetchMostRelevant(mask: SelectionMask): NodeEntitySelectionItem | null;
    faceItem: FaceSelectionItem | null;
    lineItem: LineSelectionItem | null;
    pointItem: PointSelectionItem | null;
}
