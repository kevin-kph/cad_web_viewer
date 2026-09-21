import { MouseInputEvent } from '../event/MouseInputEvent';
import { OperatorBase } from './OperatorBase';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
import { ICuttingManager } from '../core/ICuttingManager';
export declare class CuttingPlaneOperator extends OperatorBase {
    private _cuttingManager;
    /**
     * The context will only be non-null after a successful selection of the cutting plane has happened, and
     * only for the duration of the mouse up-move-down sequence.
     */
    private _context;
    constructor(viewer: IWebViewer, view: IView, cuttingManager: ICuttingManager);
    onMouseDown(event: MouseInputEvent): Promise<void>;
    onMouseMove(event: MouseInputEvent): Promise<void>;
    private _updatePlane;
    onMouseUp(event: MouseInputEvent): Promise<void>;
    setHandled(): boolean;
    /**
     * Perform the selection operation. If successful, the cutting plane context will be properly
     * setup, otherwise the cutting plane context will be null.
     */
    private _startSelection;
}
