import { PickConfig } from '../PickConfig';
import { KeyInputEvent } from '../event/KeyInputEvent';
import { MouseInputEvent } from '../event/MouseInputEvent';
import { Button } from '../types';
import { OperatorBase } from './OperatorBase';
import { NoteTextManager } from './markup/note/NoteTextManager';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
export declare class SelectionOperator extends OperatorBase {
    private _selectionButton;
    private _noteTextManager;
    private _pickConfig;
    private _forceEffectiveSceneVisibilityMask;
    private _doubleClickFitWorld;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView, noteTextManager: NoteTextManager);
    /** Sets the [[PickConfig]] that will be passed to [[View.pickFromPoint]]. */
    setPickConfig(config: PickConfig): void;
    /** Returns the [[PickConfig]] that will be passed to [[View.pickFromPoint]]. */
    getPickConfig(): PickConfig;
    /**
     * Gets the button used for selection.
     * @returns Button
     */
    getSelectionButton(): Button;
    /**
     * Sets the button used for selection
     * @param button
     */
    setSelectionButton(button: Button): void;
    /** @hidden */
    onKeyUp(event: KeyInputEvent): void;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
    /** @hidden */
    onDoubleClick(): Promise<void>;
    /**
     * When enabled, a double click will fit the view to the model bounding box.
     * @param doubleClickFitWorld
     */
    setDoubleClickFitWorldEnabled(doubleClickFitWorld: boolean): void;
    private _getSelectionOrParentIfSelected;
    private _processSelectionClick;
}
