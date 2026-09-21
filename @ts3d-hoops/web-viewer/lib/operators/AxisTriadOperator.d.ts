import { MouseInputEvent } from '../event/MouseInputEvent';
import { OperatorBase } from './OperatorBase';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
export declare class AxisTriadOperator extends OperatorBase {
    private readonly _axisTriad;
    private readonly _pickConfig;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /** @hidden */
    onMouseUp(event: MouseInputEvent): Promise<void>;
}
