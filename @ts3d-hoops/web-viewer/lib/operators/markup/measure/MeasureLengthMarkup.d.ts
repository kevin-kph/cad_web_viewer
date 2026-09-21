import { Point3, Point2, Color } from '@ts3d-hoops/common';
import { Polyline } from '../../../markup/shapes/Polyline';
import { MeasureMarkup } from './MeasureMarkup';
import { IWebViewer } from '../../../core/IWebViewer';
/** @hidden */
export declare class MeasureLengthMarkup extends MeasureMarkup {
    static readonly className: string;
    protected _lineEdgeShape: Polyline;
    protected _linePositions: Point3[];
    /** @hidden */
    constructor(viewer: IWebViewer);
    setLineGeometry(linePoints: Point3[]): void;
    setMeasurementEdgeColor(color: Color): void;
    reset(): void;
    adjust(position: Point2): void;
    draw(): void;
    getLineEdgeShape(): Polyline;
    getClassName(): string;
}
