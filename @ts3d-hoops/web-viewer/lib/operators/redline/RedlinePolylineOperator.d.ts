import { Point2 } from '@ts3d-hoops/common';
import { RedlineItem } from '../../markup/redline/RedlineItem';
import { RedlineOperator } from './RedlineOperator';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class RedlinePolylineOperator extends RedlineOperator {
    private _redlinePolyline;
    private _previewHandle;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /** @hidden */
    createRedlineItem(position: Point2): RedlineItem;
    /** @hidden */
    updateRedlineItem(position: Point2): void;
    /** @hidden */
    finalizeRedlineItem(_position: Point2): RedlineItem | null;
}
