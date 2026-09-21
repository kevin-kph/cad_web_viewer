import { Point2 } from '@ts3d-hoops/common';
import { KeyInputEvent } from '../../event/KeyInputEvent';
import { MouseInputEvent, MouseWheelInputEvent } from '../../event/MouseInputEvent';
import { RedlineItem } from '../../markup/redline/RedlineItem';
import { OperatorBase } from '../OperatorBase';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
/** @hidden */
export declare class RedlineOperator extends OperatorBase {
    protected _viewer: IWebViewer;
    private _activeRedlineItem;
    private _newRedlineItem;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /** @hidden */
    createRedlineItem(_position: Point2): RedlineItem | null;
    /** @hidden */
    updateRedlineItem(_position: Point2): void;
    /** @hidden */
    finalizeRedlineItem(_position: Point2): RedlineItem | null;
    /** @hidden */
    onMouseDown(event: MouseInputEvent): void;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
    /** @hidden */
    onMousewheel(event: MouseWheelInputEvent): void;
    /** @hidden */
    setDraggingEnabled(dragging: boolean): void;
    /** @hidden */
    setHandled(): boolean;
    private _isRedlineItem;
    /** @hidden */
    onKeyUp(event: KeyInputEvent): void;
    private _removeRedlineTextIfInvalid;
    private _redlineOperatorStart;
    private _redlineOperatorMove;
    private _redlineOperatorEnd;
    private _attachNewMarkupToView;
    private _markupIsTextArea;
}
