import { Point3, Point2 } from '@ts3d-hoops/common';
import { SelectionItem } from '../../selection/SelectionItem';
export declare class SelectionPoints {
    readonly worldPosition: Point3 | null;
    readonly screenPosition: Point2;
    readonly selectionItem: SelectionItem;
    constructor(worldPosition: Point3 | null, screenPosition: Point2, selectionItem: SelectionItem);
}
