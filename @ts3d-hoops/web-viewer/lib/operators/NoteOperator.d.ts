import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
import { MouseInputEvent } from '../event/MouseInputEvent';
import { NodeId } from '../types';
import { OperatorBase } from './OperatorBase';
import { NoteTextElement } from './markup/note/NoteTextElement';
import { NoteTextManager } from './markup/note/NoteTextManager';
export * from './markup/note/NoteTextManager';
export declare class NoteOperator extends OperatorBase {
    private _insertNoteButton;
    private _callbackFlag;
    private _noteTextManager;
    /** @hidden */
    constructor(viewer: IWebViewer, view: IView, noteTextManager: NoteTextManager);
    /** @hidden */
    onMouseDown(event: MouseInputEvent): void;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
    /**
     * @returns a NoteTextElement that can be used to configure the NoteText HTML container.
     */
    getNoteTextElement(): NoteTextElement;
    /**
     * @param noteTextElement
     */
    setNoteTextElement(noteTextElement: NoteTextElement): void;
    /**
     * Returns true if the nodeId is the id of a note pin instance.
     * @param nodeId
     */
    checkPinInstance(nodeId: NodeId): boolean;
}
