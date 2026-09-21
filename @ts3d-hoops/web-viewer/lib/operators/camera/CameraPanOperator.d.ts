import { MouseInputEvent } from '../../event/MouseInputEvent';
import { OperatorBase } from '../OperatorBase';
import { IView } from '../../core/IView';
import { IWebViewer } from '../../core/IWebViewer';
export declare class CameraPanOperator extends OperatorBase {
    private _cameraPtPrevious;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /** @hidden */
    onMouseDown(event: MouseInputEvent): void;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): void;
}
