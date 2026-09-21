export interface IColor {
    r: number;
    g: number;
    b: number;
}
export declare function isIColor(o: unknown): o is IColor;
/**
 * An object representing an RGB Color. Values are specified in the 0-255 range.
 */
export declare class Color implements IColor {
    r: number;
    g: number;
    b: number;
    /**
     * Creates a new color object. Values are specified in the 0-255 range.
     * @param r red color component
     * @param g green color component
     * @param b blue color component
     */
    constructor(r: number, g: number, b: number);
    /**
     * Sets this color equal to another color
     * @param color the point whose values will be used to set this color
     * @returns the color object
     */
    assign(color: Color): this;
    /**
     * Creates a copy of this color
     * @returns Copy of this color
     */
    copy(): Color;
    /**
     * Compares this color with another color
     * @param color the color to compare with
     * @returns True if the values of this color equal the other. False otherwise.
     */
    equals(color: Color): boolean;
    /**
     * Sets the color object. Values are specified in the 0-255 range.
     * @param r red color component
     * @param g green color component
     * @param b blue color component
     */
    set(r: number, g: number, b: number): void;
    /**
     * Sets the color object from floating point values. Values are specified in the 0.0-1.0 range.
     * @param r red color component
     * @param g green color component
     * @param b blue color component
     */
    setFromFloat(r: number, g: number, b: number): void;
    /**
     * Sets this color from an array of normalized floating point values
     * @param arr the array to assign from
     */
    fromFloatArray(arr: number[]): void;
    /**
     * Gets an array of floating point values representing this color. Values are clamped in the 0.0 - 1.0 range.
     * @returns array of floating point values for this color.
     */
    getFloatArray(): [number, number, number];
    /**
     * Populates an array with floating point values for this color. Values are clamped in the 0.0 - 1.0 range.
     * @param arr array whose first three elements will be populated with the r,g, and b values of this color respectively.
     */
    toFloatArray(arr?: number[]): number[];
    /**
     * Creates a new [[Color]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: unknown): Color;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): IColor;
    /**
     * Converts the color to a hexadecimal string.
     * @returns Hexadecimal string representation of the color.
     */
    toHexString(): string;
    /**
     * Creates a color object from a hexadecimal string.
     * @param hexString Hexadecimal string representation of the color.
     * @returns new color object
     */
    static fromHexString(hexString: string): Color;
    /**
     * Creates a color object from floating point values. Values are specified in the 0.0-1.0 range.
     * @param r red color component
     * @param g green color component
     * @param b blue color component
     * @returns new color object
     */
    static createFromFloat(r: number, g: number, b: number): Color;
    /**
     * Creates a color object from an array of floating point values.
     * Values are specified in the 0.0-1.0 range.
     */
    static createFromFloatArray(values: number[]): Color;
    /**
     * Creates a new color object initialized to red.
     * @returns new color object
     */
    static red(): Color;
    /**
     * Creates a new color object initialized to green.
     * @returns new color object
     */
    static green(): Color;
    /**
     * Creates a new color object initialized to blue.
     * @returns new color object
     */
    static blue(): Color;
    /**
     * Creates a new color object initialized to yellow.
     * @returns new color object
     */
    static yellow(): Color;
    /**
     * Creates a new color object initialized to white.
     * @returns new color object
     */
    static white(): Color;
    /**
     * Creates a new color object initialized to black.
     * @returns new color object
     */
    static black(): Color;
}
