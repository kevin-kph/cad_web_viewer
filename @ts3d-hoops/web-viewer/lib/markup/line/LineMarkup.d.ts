import { Point3, Color } from '@ts3d-hoops/common';
import { LinePatternLengthUnit } from '@ts3d-hoops/streamcache';
import { NodeId, Uuid, LinePattern } from '../../types';
import { MarkupItem } from '../MarkupItem';
import { IWebViewer } from '../../core/IWebViewer';
/**
 * This class is for 3D line markup items.
 */
export declare class LineMarkup extends MarkupItem {
    static className: string;
    private _viewer;
    private _lineMeshId;
    private _lineMeshInstanceId;
    private _firstPoint;
    private _secondPoint;
    private _firstNodeId;
    private _secondNodeId;
    private _lineColor;
    private _lineOpacity;
    private _linePattern;
    private _linePatternLength;
    private _linePatternLengthUnit;
    constructor(viewer: IWebViewer, firstPoint?: Point3 | null, secondPoint?: Point3 | null, firstNodeId?: NodeId | null, secondNodeId?: NodeId | null);
    /**
     * Sets the line color.
     * @param color
     */
    setLineColor(color: Color): void;
    /**
     * Gets the line color.
     */
    getLineColor(): Color;
    /**
     * Sets the line opacity.
     * @param opacity
     */
    setLineOpacity(opacity: number): void;
    /**
     * Gets the line opacity.
     */
    getLineOpacity(): number;
    /**
     * Sets the line pattern.
     * @param pattern The line pattern.
     * @param patternLength The length of a single repetition of the line pattern.
     * @param patternLengthUnit The unit in which the pattern length is measured.
     */
    setLinePattern(pattern: LinePattern, patternLength: number, patternLengthUnit: LinePatternLengthUnit): void;
    /**
     * Gets the line pattern.
     */
    getLinePattern(): LinePattern | null;
    /**
     * Gets the length of a single repetition of the line pattern.
     */
    getLinePatternLength(): number | null;
    /**
     * Gets the unit in which the line pattern length is measured.
     */
    getLinePatternLengthUnit(): LinePatternLengthUnit | null;
    /**
     * Sets the first point on the line.
     * @param firstPoint
     */
    setFirstPoint(firstPoint: Point3 | null): void;
    /**
     * Gets the first point on the line.
     * @returns the first point, or null if none is set.
     */
    getFirstPoint(): Point3 | null;
    /**
     * Sets the second point on the line.
     * @param secondPoint
     */
    setSecondPoint(secondPoint: Point3 | null): void;
    /**
     * Gets the second point on the line.
     * @returns the second point, or null if none is set.
     */
    getSecondPoint(): Point3 | null;
    /**
     * Sets the NodeId of the part associated with the first line point
     * @param nodeId
     */
    setFirstNodeId(nodeId: NodeId | null): void;
    /**
     * Gets the NodeId of the part associated with the first line point
     */
    getFirstNodeId(): NodeId | null;
    /**
     * Sets the NodeId of the part associated with the second line point
     * @param nodeId
     */
    setSecondNodeId(nodeId: NodeId | null): void;
    /**
     * Gets the NodeId of the part associated with the second line point
     */
    getSecondNodeId(): NodeId | null;
    /**
     * Gets the node id associated with the line markup.
     */
    getNodeId(): number | null;
    /**
     * Removes the line geometry from the scene.
     */
    removeLine(): Promise<void>;
    /**
     * Draws updated line geometry in the scene.
     */
    updateLine(): Promise<void>;
    /**
     * Returns a unique markup id for this line.
     */
    getId(): Uuid;
    /**
     * Sets a markup id for this line.
     * @param id
     */
    setId(id: Uuid): void;
    /**
     * Returns the class name for this markup item.
     */
    getClassName(): string;
    private _toJson;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    /**
     * Creates a new [[LineMarkup]] from an object given by [[toJson]].
     * @param objData object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any, viewer: IWebViewer): Promise<LineMarkup>;
}
