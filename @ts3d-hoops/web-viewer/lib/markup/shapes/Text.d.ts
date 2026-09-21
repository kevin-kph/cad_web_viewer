import { Point2 } from '@ts3d-hoops/common';
import { FilledShape } from './Shape';
/**
 * This is a base class for text markup objects. It should not be created directly.
 */
export declare class TextMarkupBase extends FilledShape {
    private _fontFamily;
    private _fontSize;
    /** @hidden */
    constructor();
    /** @hidden */
    _assign(other: TextMarkupBase): void;
    /**
     * Gets the font family for this text
     * @returns the font family
     */
    getFontFamily(): string | null;
    /**
     * Sets the font family this shape
     * @param fontFamily font family to use for this text
     */
    setFontFamily(fontFamily: string): void;
    /**
     * Sets the font size for this text
     * @param fontSize size to use for this text
     */
    setFontSize(fontSize: number): void;
    /**
     * Gets the font size for this text
     * @returns the font size
     */
    getFontSize(): number;
}
/**
 * This object represents markup text that is drawn on the canvas.
 */
export declare class Text extends TextMarkupBase {
    private _position;
    private _text;
    /**
     * Creates a new markup text item.
     * @param text the text associated with this item.
     * @param position the screen space point of the top left of the text string.
     */
    constructor(text: string, position: Point2);
    /** @hidden */
    _assign(other: Text): void;
    /**
     * Sets the text position
     * @returns the top left position to render text from
     */
    setPosition(position: Point2): void;
    /**
     * Gets the text position
     * @returns the text position
     */
    getPosition(): Point2;
    /**
     * Sets the text content
     * @param text the text to render
     */
    setText(text: string): void;
    /**
     * Gets the text content
     * @returns the text content
     */
    getText(): string;
}
/** @hidden */
export declare class _MarkupTextData {
    text: string;
    position: Point2;
    constructor(text: string, position: Point2);
}
export declare class TextCollection extends TextMarkupBase {
    private _textStrings;
    /**
     * Removes all text strings from this collection
     */
    clear(): void;
    /**
     * Adds a string to the collection
     * @param text the text to render
     * @param position the top left position of the text
     */
    addString(text: string, position: Point2): void;
    /**
     * Gets the strings in the collection
     */
    getStrings(): _MarkupTextData[];
}
