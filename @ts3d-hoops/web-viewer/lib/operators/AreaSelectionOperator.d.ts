import { KeyInputEvent } from '../event/KeyInputEvent';
import { MouseInputEvent } from '../event/MouseInputEvent';
import { SelectionMask } from '../types';
import { OperatorBase } from './OperatorBase';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
export declare class AreaSelectionOperator extends OperatorBase {
    private _incrementalSelection;
    private _rectangleMarkup;
    private _forceEffectiveSceneVisibilityMask;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView);
    /**
     * Gets the mask used for forcing effective scene visibility during selection.
     */
    getForceEffectiveSceneVisibilityMask(): SelectionMask;
    /**
     * Sets the mask used for forcing effective scene visibility during selection.
     */
    setForceEffectiveSceneVisibilityMask(mask: SelectionMask): void;
    hasActiveSelection(): boolean;
    waitForIdle(): Promise<void>;
    clearSelection(): Promise<void>;
    private _allowSelection;
    private _createBeginConfig;
    private _performSelection;
    /** @hidden */
    setHandled(): boolean;
    /** @hidden */
    onKeyUp(e: KeyInputEvent): void;
    /** @hidden */
    onMouseDown(e: MouseInputEvent): void;
    /** @hidden */
    onMouseMove(e: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(e: MouseInputEvent): void;
}
