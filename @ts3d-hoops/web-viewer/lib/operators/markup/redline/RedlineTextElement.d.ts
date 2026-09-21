import { Point2 } from '@ts3d-hoops/common';
/** @hidden */
export declare class RedlineTextElement {
    private static _defaultSize;
    private _textArea;
    private _currentSize;
    private _sizeChanged;
    private _sizeUpdateCallback;
    private _textUpdateCallback;
    constructor(sizeUpdateCallback: (size: Point2) => void, textUpdateCallback: (text: string) => void);
    private _createTextBox;
    setPosition(pos: Point2): void;
    setBorderWidth(borderWidth: number): void;
    setText(text: string): void;
    setSize(size: Point2): void;
    focus(): void;
    blur(): void;
    getTextArea(): HTMLTextAreaElement;
}
