import { Box, Color, Point3 } from '@ts3d-hoops/common';
import { BcfNode, BCFVersion } from './types';
import { Camera } from '../Camera';
import { NodeId, GenericId } from '../types';
import { MarkupView } from '../markup';
import { IWebViewer } from '../core/IWebViewer';
export declare class BCFViewpoint {
    private readonly _viewer;
    private readonly _filename;
    private readonly _version;
    private readonly _modelBounding;
    private readonly _unitScale;
    private _viewpointGuid;
    private _components;
    private _orthogonalCamera;
    private _perspectiveCamera;
    private _lines;
    private _clippingPlanes;
    constructor(filename: string, document: Document | null, version: BCFVersion, modelBounding: Box, modelUnits: number, viewer: IWebViewer);
    static createViewpoint(viewer: IWebViewer, viewpointFilename: string, markupView?: MarkupView | null): Promise<BCFViewpoint>;
    private static _markupRedlineToBcf;
    private _parseDocument;
    private _exportComponents;
    private _exportOrthogonalCamera;
    private _exportPerspectiveCamera;
    private _exportLines;
    private _exportClippingPlanes;
    /**
     * @returns XML document containing the viewpoint data.
     */
    export(): XMLDocument;
    /**
     * Activates viewpoint.
     * Sets the camera, visibility, cutting planes, colors, and markup.
     */
    activate(): Promise<void>;
    private _activateCamera;
    private _activateComponentsVisibility;
    private _activateMarkup;
    private _activateCuttingPlanes;
    private _activateSelected;
    private _activateColors;
    /**
     * Gets the viewpoint filename.
     */
    getFilename(): string;
    /**
     * Gets the GUID associated with the viewpoint.
     */
    getViewpointGuid(): string | null;
    private _fromBCFPerspectiveCamera;
    private _fromBCFOrthogonalCamera;
    /**
     * Gets the viewpoint camera, or null if none is set.
     */
    getCamera(): Camera | null;
    /**
     * Sets the viewpoint camera.
     * @param camera
     */
    setCamera(camera: Camera): void;
    private _toBCFOrthogonalCamera;
    private _toBCFPerspectiveCamera;
    /**
     * Sets the default visibility.
     * If true, visibility exceptions are hidden.
     * If false, visibility exceptions are shown.
     * @param defaultVisibility
     */
    setDefaultVisibility(defaultVisibility: boolean): void;
    private _getDefaultVisibility;
    /**
     * Sets the visibility exceptions. These nodes will be shown or hidden based on the default visibility setting.
     * @param visibilityExceptions Array of GenericIds corresponding to components.
     */
    setVisibilityExceptions(visibilityExceptions: GenericId[]): void;
    /**
     * Sets the visibility exceptions. These nodes will be shown or hidden based on the default visibility setting.
     * @param visibilityExceptions Array of BcfNodes corresponding to components.
     */
    setVisibilityExceptionNodes(visibilityExceptions: BcfNode[]): void;
    /**
     * Gets the visibility exception generic ids.
     * @returns Array of GenericIds corresponding to components.
     */
    getVisibilityExceptions(): GenericId[];
    /**
     * Gets the visibility exception node ids.
     * @returns Array of NodeIds corresponding to components.
     */
    getVisibilityExceptionNodes(): NodeId[];
    /**
     * Sets the colors.
     * @param colorGenericIdMap Map correlating color to GenericIds.
     */
    setColors(colorGenericIdMap: Map<Color, Set<GenericId>>): void;
    /**
     * Sets the colors.
     * @param colorNodeMap Map correlating color to BfcNodes.
     */
    setColorNodes(colorNodeMap: Map<Color, Set<BcfNode>>): void;
    /**
     * @returns Map correlating color to components.
     */
    getColors(): Map<Color, Set<GenericId>>;
    /**
     * @returns Map correlating color to nodes.
     */
    getColorsToNodes(): Map<Color, Set<NodeId>>;
    /**
     * Sets the markup lines.
     * @param lines array of start point and end point line pairs.
     */
    setLines(lines: [Point3, Point3][]): void;
    /**
     * Gets markup lines.
     * @returns Array containing start point and end point line pairs.
     */
    getLines(): [Point3, Point3][];
    /**
     * Sets the clipping planes.
     * @param planes array containing position and direction pairs.
     */
    setClippingPlanes(planes: [Point3, Point3][]): void;
    /**
     * Gets the clipping planes.
     * @returns Array containing position and direction pairs.
     */
    getClippingPlanes(): [Point3, Point3][];
    /**
     * Sets a list of items to be added to the selection set.
     */
    setSelection(selection: GenericId[]): void;
    /**
     * Sets a list of items to be added to the selection set.
     */
    setSelectionNodes(selection: BcfNode[]): void;
    /**
     * Gets a list of generic IDs that are in the selection set.
     */
    getSelection(): GenericId[];
    /**
     * Gets a list of node IDs that are in the selection set.
     */
    getSelectionNodes(): NodeId[];
    private _getGenericIdsFromComponents;
    private _getNodeIdsFromComponents;
    private _parseComponentsV2_0;
    private _parseComponents;
    private _getCameraData;
    private _parseOrthogonalCamera;
    private _parsePerspectiveCamera;
    private _parseLines;
    private _parseClippingPlanes;
    private _getClippingPlane;
    private _getLine;
    private _getPoint;
    private _colorFromArgb;
    private _getColoring;
    private _getComponents;
}
