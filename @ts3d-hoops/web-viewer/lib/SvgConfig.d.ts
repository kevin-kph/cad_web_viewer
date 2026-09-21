/**
 *  Allows customization of an exported SVG.
 */
export declare class SvgConfig {
    /** If true, the standard XML prolog will be included in the output SVG (default: true) */
    svgXmlPrologEnabled: boolean;
    /** If non-empty, an SVG <rect> element will be at the root with the given background color. (default: "") */
    svgBackgroundCssColor: string;
    /** Determines if silhouette lines will be drawn for the model (default: true) */
    silhouettesEnabled: boolean;
    /** Determines if the model lines will be included in the SVG output (default: true) */
    linesDrawModelLinesEnabled: boolean;
    /**
     * Determines the output SVG line width for all lines in the model. This is relative to
     * the SVG viewBox settings of -32767 to +32767 in both X and Y directions. (default: 20.0)
     */
    linesStrokeWidth: number;
    /** CSS compliant color string used to draw lines (default: "#000000") */
    linesCssColor: string;
    /**
     * For line clipping, this factor determines how close a line can get to a triangle
     * without getting clipped. Larger values will help small sections that shouldn't
     * get clipped, but larger values may also allow hidden line sections to poke through.
     * Z values are normalized to -32767 to 32767, so this value is relative to that scale. (default: 5.5)
     */
    linesClipProximityToPlane: number;
    /**
     * For line clipping, this value will be used to adjust line segment endpoints, bringing
     * closer to the camera for positive values. This is helpful for z-fighting causing
     * small sections of lines to be unintentionally clipped.
     * Z values are normalized to -32767 to 32767, so this value is relative to that scale. (default: 5.5)
     */
    linesClipZNudgeFactor: number;
    /**
     * If set to a non-empty CSS string value, forces all polygons to be drawn as this color
     * Example, to force all polygons to be white, use <code>PolygonsForceDrawColor="#ffffff"</code>
     * (default: "")
     */
    polygonsForceDrawCssColor: string;
    /** Enables progress logging. If running in-browser, this will go to the developer console (default: false) */
    logProgress: boolean;
    /** Enables diagnostics logging. If running in-browser, this will go to the developer console (default: false) */
    logDiagnostics: boolean;
}
