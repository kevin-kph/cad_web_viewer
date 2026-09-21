import { Point2 } from '@ts3d-hoops/common';
import { Circle, CircleCollection } from './shapes/Circle';
import { Line, LineCollection } from './shapes/Line';
import { Polygon, PolygonCollection } from './shapes/Polygon';
import { Polyline, PolylineCollection } from './shapes/Polyline';
import { Rectangle, RectangleCollection } from './shapes/Rectangle';
import { TextCollection, TextMarkupBase, Text } from './shapes/Text';
import { TextBox, TextBoxCollection } from './shapes/TextBox';
/**
 * This class provides an interface for MarkupItems to draw on the canvas.
 */
export interface MarkupRenderer {
    /** @hidden */
    _clear(): void;
    /** @hidden */
    _finalize(): void;
    /**
     * Renders a circle to the markup layer.
     * @param circle the circle to draw.
     * @returns SVG element for the circle. This element is temporary and will not be preserved when the markup is redrawn.
     */
    drawCircle(circle: Circle): Element;
    /**
     * Renders a collection of circles sharing the same properties to the markup layer.
     * @param circles the collection of circle to render.
     * @returns an array containing SVG elements for each circle. These elements are temporary and will not be preserved when the markup is redrawn.
     */
    drawCircles(circles: CircleCollection): Element[];
    /**
     * Renders a polyline to the markup layer.
     * @param polyline the polyline to draw.
     * @returns SVG element for the line. This element is temporary and will not be preserved when the markup is redrawn.
     */
    drawPolyline(polyline: Polyline): Element;
    /**
     * Renders a collection of polylines sharing the same properties to the markup layer.
     * @param polylines the collection of polylines to render.
     * @returns an array containing SVG elements for each line. These elements are temporary and will not be preserved when the markup is redrawn.
     */
    drawPolylines(polylines: PolylineCollection): Element[];
    /**
     * Renders a polygon to the markup layer.
     * @param polygon the polygon to render.
     * @returns SVG element for the polygon. This element is temporary and will not be preserved when the markup is redrawn.
     */
    drawPolygon(polygon: Polygon): Element;
    /**
     * Renders a collection of polygons sharing the same properties to the markup layer.
     * @param polygons the collection of polygons to render.
     * @returns an array containing SVG elements for each polygon. These elements are temporary and will not be preserved when the markup is redrawn.
     */
    drawPolygons(polygons: PolygonCollection): Element[];
    /**
     * Renders a line to the markup layer.
     * @param line the line to render.
     * @returns SVG element for the line. This element is temporary and will not be preserved when the markup is redrawn.
     */
    drawLine(line: Line): Element;
    /**
     * Renders a collection of lines sharing the same properties to the markup layer.
     * @param lines the collection of lines to render.
     * @returns an array containing SVG elements for each line. These elements are temporary and will not be preserved when the markup is redrawn.
     */
    drawLines(lines: LineCollection): Element[];
    /**
     * Renders a rectangle to the markup layer.
     * @param rectangle the rectangle to render.
     * @returns SVG element for the rectangle. This element is temporary and will not be preserved when the markup is redrawn.
     */
    drawRectangle(rectangle: Rectangle): Element;
    /**
     * Renders a collection of rectangles sharing the same properties to the markup layer.
     * @param rectangles the collection of rectangles to render.
     * @returns an array containing SVG elements for each rectangle. These elements are temporary and will not be preserved when the markup is redrawn.
     */
    drawRectangles(rectangles: RectangleCollection): Element[];
    /**
     * Renders text to the markup layer.
     * @param text the text to render.
     * @returns SVG element for the text. This element is temporary and will not be preserved when the markup is redrawn.
     */
    drawText(text: Text): Element;
    /**
     * Renders a collection of text sharing the same properties to the markup layer.
     * @param texts the collection of texts to render.
     * @returns an array containing SVG elements for each text. These elements are temporary and will not be preserved when the markup is redrawn.
     */
    drawTexts(texts: TextCollection): Element[];
    /**
     * Computes the width and height of a string using the given text attributes.
     * @param str the text string to measure.
     * @param markup the properties of the text item to measure.
     * @returns a point object containing the width and height in pixels of the string.
     */
    measureText(str: string, markup: TextMarkupBase): Point2;
    /**
     * Computes the width and height of a text box.
     * @param textBox the text box to measure.
     * @returns a point object containing the width and height in pixels of the text box.
     */
    measureTextBox(textBox: TextBox): Point2;
    /**
     * Renders a text box to the markup layer.
     * @param textBox the text box to render.
     * @returns SVG element pair for the text. The first item in this array corresponds to the rectangle. The second item corresponds to the text. These elements are temporary and will not be preserved when the markup is redrawn.
     */
    drawTextBox(textBox: TextBox): Element[];
    /**
     * Renders a collection of text boxes sharing the same properties to the markup layer.
     * @param textBoxes the collection of text boxes to render.
     * @returns an array containing SVG element pairs for each text box. These elements are temporary and will not be preserved when the markup is redrawn.
     */
    drawTextBoxes(textBoxes: TextBoxCollection): Element[][];
    /** @hidden */
    _setCanvas(canvas: Element): void;
}
