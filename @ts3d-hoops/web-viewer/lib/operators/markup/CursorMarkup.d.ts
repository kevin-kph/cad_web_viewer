import { Point2 } from '@ts3d-hoops/common';
import { MeasureMarkup } from '../markup/measure/MeasureMarkup';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class CursorMarkup extends MeasureMarkup {
    private readonly _cursorSprite;
    private readonly _markupId;
    private _view;
    private _removed;
    constructor(viewer: IWebViewer, view: IView);
    draw(): void;
    enable(enable: boolean): void;
    isEnabled(): boolean;
    setPosition(point: Point2): void;
    destroy(): void;
    remove(_view: IView | null): void;
}
