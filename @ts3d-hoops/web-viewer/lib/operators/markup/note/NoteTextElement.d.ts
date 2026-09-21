import { Point2 } from '@ts3d-hoops/common';
import { NoteText } from './NoteText';
export declare class NoteTextElement {
    private _container;
    private _textArea;
    private _positionOffset;
    private _position;
    private _activeNoteText;
    constructor();
    private _createTextBox;
    /**
     * Sets the corner offset position of the HTML container.
     * @param positionOffset
     */
    setPositionOffset(positionOffset: Point2): void;
    /**
     * @returns the current HTML container offset position.
     */
    getPositionOffset(): Point2;
    /**
     * Sets the position of the HTML container, taking into account the position offset.
     * @param position
     */
    setPosition(position: Point2): void;
    /**
     * @returns the position of the HTML container, taking into account the position offset.
     */
    getPosition(): Point2;
    /**
     * Sets the text in the HTML container text area.
     * @param text
     */
    setText(text: string): void;
    /**
     * @returns the current text in the HTML container text area.
     */
    getText(): string;
    /**
     * Sets the size of the HTML container.
     * @param size
     */
    setSize(size: Point2): void;
    /**
     * @returns the size of the HTML container.
     */
    getSize(): Point2;
    /**
     * Puts the cursor focus in the HTML container text area.
     */
    focus(): void;
    /**
     * Removes the cursor focus from the HTML container text area.
     */
    blur(): void;
    /**
     * Hides the HTML container.
     */
    hide(): void;
    /**
     * Sets the active NoteText and shows the HTML container.
     * @param noteText
     */
    show(noteText: NoteText): void;
    /**
     * @returns the HTML container element.
     */
    getHtmlContainer(): HTMLDivElement;
    /**
     * Sets the HTML container element.
     * @param container
     */
    setHtmlContainer(container: HTMLDivElement): void;
}
