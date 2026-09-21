import { Point2 } from '@ts3d-hoops/common';
import { RectangleBase } from './Rectangle';
import { TextMarkupBase, _MarkupTextData } from './Text';
export declare class TextBoxBase {
    private _padding;
    private _text;
    private _box;
    /** @hidden */
    constructor();
    /** @hidden */
    _assign(other: TextBoxBase): void;
    /**
     * Gets the Text portion of the TextBox. Use the methods on this object to modify the appearance of the text string
     * @returns the text markup object
     */
    getTextPortion(): TextMarkupBase;
    /**
     * Gets the Box portion of the TextBox. Use the methods on this object to modify the appearance of the rectangle around the text string
     * @returns the rectangle markup object.
     */
    getBoxPortion(): RectangleBase;
    /**
     * Gets the Pixel distance between the text and outer rectangle
     * @returns the padding value.
     */
    getPadding(): number;
    /**
     * Sets the Pixel distance between the text and outer rectangle
     * @param padding the padding value.
     */
    setPadding(padding: number): void;
}
/**
 * This object encapsulates a text and rectangle object into one entity. Sizing of the box and positioning of the string is handled by the system.
 * This class consists of two portions which control the look and feel of the markup. The text portion controls the styling of the text,
 * while the box portion controls the styling of the outer rectangle.
 */
export declare class TextBox extends TextBoxBase {
    private _position;
    private _textStr;
    /**
     * Creates a new TextBox Markup Shape.
     * @param position the screen space point of the top left of the box. Default value is (0,0).
     * @param text the text string for the box. Default value is empty string.
     */
    constructor(position?: Point2, text?: string);
    /** @hidden */
    _assign(other: TextBox): void;
    /**
     * Gets the position in screen space of the top-left corner of the TextBox rectangle
     * @returns the TextBox position
     */
    getPosition(): Point2;
    /**
     * Sets the position in screen space of the top-left corner of the TextBox rectangle
     * @param position the TextBox position
     */
    setPosition(position: Point2): void;
    /**
     * Gets the text string for this box
     * @returns the text string
     */
    getTextString(): string;
    /**
     * Sets the text string for this box
     * @param text the text string
     */
    setTextString(text: string): void;
}
/**
 * This class is useful for drawing a number of text boxes which share the same visual settings.
 */
export declare class TextBoxCollection extends TextBoxBase {
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
