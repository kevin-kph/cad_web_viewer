import { KeyInputEvent } from '../event/KeyInputEvent';
import { MouseInputEvent } from '../event/MouseInputEvent';
import { SelectionMask } from '../types';
import { OperatorBase } from './OperatorBase';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
export declare class RayDrillSelectionOperator extends OperatorBase {
    private _incrementalSelection;
    private _selectionButton;
    private _ignoreTransparency;
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
    setIgnoreTransparency(value: boolean): void;
    getIgnoreTransparency(): boolean;
    hasActiveSelection(): boolean;
    waitForIdle(): Promise<void>;
    clearSelection(): Promise<void>;
    private _createBeginConfig;
    private _selectionPredicate;
    private _performSelection;
    /** @hidden */
    setHandled(): boolean;
    /** @hidden */
    onKeyUp(e: KeyInputEvent): void;
    /** @hidden */
    onMouseUp(e: MouseInputEvent): void;
}
