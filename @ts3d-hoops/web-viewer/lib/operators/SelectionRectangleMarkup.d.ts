import { Point2 } from '@ts3d-hoops/common';
import { MeasureMarkup } from './markup/measure/MeasureMarkup';
import { IWebViewer } from '../core/IWebViewer';
/** @hidden */
export declare class SelectionRectangleMarkup extends MeasureMarkup {
    private _rectangle;
    private _markupHandle;
    private _dim;
    private _constantStrokeColor;
    initialPosition: Point2;
    currentPosition: Point2;
    min: Point2;
    max: Point2;
    constructor(viewer: IWebViewer, constantStrokeColor: boolean);
    draw(): void;
    updateCurrentPosition(currentPosition: Point2): void;
    private _updateRectangleVertices;
    activate(initialPosition: Point2): void;
    deactivate(): void;
    isActive(): boolean;
}
