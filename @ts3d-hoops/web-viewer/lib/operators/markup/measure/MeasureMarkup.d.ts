import { Point3, Point2 } from '@ts3d-hoops/common';
import { Line } from '../../../markup/shapes/Line';
import { TextBox } from '../../../markup/shapes/TextBox';
import { MarkupItem } from '../../../markup/MarkupItem';
import { Uuid } from '../../../types';
import { IWebViewer } from '../../../core/IWebViewer';
/**
 * Base class for Measure Markup. It should not be used directly.
 */
export declare class MeasureMarkup extends MarkupItem {
    /** @hidden */
    protected _viewer: IWebViewer;
    /** @hidden */
    protected _stage: number;
    /** @hidden */
    protected _finalized: boolean;
    /** @hidden */
    protected _positions: Point3[];
    /** @hidden */
    protected _lineShapes: Line[];
    /** @hidden */
    protected _name: string;
    /** @hidden */
    protected _measurementValue: number;
    /** @hidden */
    protected _unitMultiplier: number;
    /** @hidden */
    protected _textShape: TextBox;
    /** @hidden */
    protected _visibility: boolean;
    /** @hidden */
    constructor(viewer: IWebViewer);
    /**
     * Gets the name of this measurement.
     * @returns the measurement name
     */
    getName(): string;
    /**
     * Sets the name of this measurement
     * @param name the name to set
     */
    setName(name: string): void;
    /** @hidden */
    _getStage(): number;
    /** @hidden */
    _nextStage(): void;
    /** @hidden */
    _setId(id: Uuid): void;
    /** @hidden */
    _getId(): Uuid;
    /** @hidden */
    adjust(_: Point2): void;
    /** @hidden */
    _isFinalized(): boolean;
    /** @hidden */
    update(): void;
    /** @hidden */
    draw(): void;
    setVisibility(visibility: boolean): void;
    getVisibility(): boolean;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    /**
     * Returns the unit agnostic value for this measurement.
     * In the case where this value represents distance, use [[getUnitMultiplier]] to determine the measurement units.
     * In other cases, this value will be the angle measurement in degrees.
     * @returns the measurement value
     */
    getMeasurementValue(): number;
    /**
     * Returns the unit multiplier incorporated into the measurement value.
     * This number is a multiplier of millimeters (for example inches will be `25.4`).
     * The default value is `1.0`.
     */
    getUnitMultiplier(): number;
    /**
     * Sets the measurement text that is rendered with this measurement.
     * @param measurementText the text to render with this measurement
     */
    setMeasurementText(measurementText: string): void;
    /**
     * Gets the text for this measurement. By default this will contain the measurement value and units for the model in the cases where the measurement is a distance.
     * In other cases it will contain the angle in degrees.
     */
    getMeasurementText(): string;
    /**
     * Returns whether the measurement markup is valid. Override in subclasses when needed.
     */
    isMarkupValid(): boolean;
    /** @hidden */
    protected _setMeasurementValue(millimeters: number): void;
    /** @hidden */
    protected static _serializePointArray(points: Point3[]): object[];
    /** @hidden */
    protected static _constructPointArray(pointObjs: object[]): Point3[];
}
