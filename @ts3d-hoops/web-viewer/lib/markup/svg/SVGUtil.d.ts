import { Point2, Color } from '@ts3d-hoops/common';
import { Pixels } from '../../types';
export declare const svgNamespace = "http://www.w3.org/2000/svg";
export declare function svgColorRgbString(color: Color): string;
export declare function svgPointString(points: Point2[]): string;
export declare function createStartArrowMarker(size: Pixels, color: Color): SVGMarkerElement;
export declare function createEndArrowMarker(size: Pixels, color: Color): SVGMarkerElement;
export declare function createCircleMarker(position: Point2, strokeWidth: Pixels, size: Pixels, color: Color): SVGCircleElement;
