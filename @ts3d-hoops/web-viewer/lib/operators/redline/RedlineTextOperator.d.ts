import { Point2 } from '@ts3d-hoops/common';
import { RedlineItem } from '../../markup/redline/RedlineItem';
import { RedlineOperator } from './RedlineOperator';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class RedlineTextOperator extends RedlineOperator {
    private _redlineText;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /** @hidden */
    createRedlineItem(_position: Point2): RedlineItem;
    /** @hidden */
    finalizeRedlineItem(position: Point2): RedlineItem | null;
}
