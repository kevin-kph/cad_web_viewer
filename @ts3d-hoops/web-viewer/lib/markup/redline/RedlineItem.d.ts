import { Point2 } from '@ts3d-hoops/common';
import { MarkupItem } from '../MarkupItem';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
/**
 * Base class for Redline Markup. It should not be used directly.
 */
export declare class RedlineItem extends MarkupItem {
    protected _viewer: IWebViewer;
    constructor(viewer: IWebViewer);
    onDragStart(_position: Point2, _view: IView): boolean;
    onDragMove(_position: Point2, _view: IView): boolean;
    onDragEnd(_position: Point2, _view: IView): boolean;
    remove(_view: IView | null): void;
}
