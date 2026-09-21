import { MouseInputEvent } from '../event/MouseInputEvent';
import { OperatorBase } from './OperatorBase';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
export declare class NavCubeOperator extends OperatorBase {
    private readonly _navCube;
    private readonly _pickConfig;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /** @hidden */
    onMouseMove(event: MouseInputEvent): Promise<void>;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): Promise<void>;
}
