import { Point3 } from '@ts3d-hoops/common';
import { MarkupItem } from '../../markup';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
/** @hidden */
export declare class OrbitMarkup extends MarkupItem {
    private _viewer;
    private _view;
    private _circle;
    private _position;
    constructor(viewer: IWebViewer, view: IView, position: Point3, radius: number);
    draw(): void;
}
