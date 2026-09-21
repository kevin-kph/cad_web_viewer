import { Matrix, Point3, Color } from '@ts3d-hoops/common';
import { ScModelName, ScsBuffer, TextureFlags, TextureTiling, TextureParameterization } from '@ts3d-hoops/streamcache';
export type { Milliseconds, ScModelName, ScsBuffer } from '@ts3d-hoops/streamcache';
/** Type used to denote overlay indices. */
export type { OverlayIndex, OverlayId } from '@ts3d-hoops/streamcache';
/** Type used to denote GUIDs. */
export type Uuid = string;
/** Type used to denote HTML IDs. */
export type HtmlId = string;
/** Type used to denote Exchange IDs. Use [[Util.exchangeIdEqual]] function to compare. */
export type ExchangeId = string;
/** Type used to denote Filter IDs. */
export declare enum FilterId {
}
/** Type used to denote Layer IDs. */
export declare enum LayerId {
}
/** Type used to denote Layer names. */
export type LayerName = string;
/** Type used to denote Filter names. */
export type FilterName = string;
/** Type used to denote generic types */
export type GenericType = string;
/** Type used to denote generic id */
export type GenericId = string;
/** Type used to denote assembly tree node IDs. */
export type NodeId = number;
export type NodeIdOffset = number;
/** Type used to denote assembly tree part IDs. All PartIds are NodeIds. */
export type PartId = NodeId;
/** Type used to denote assembly tree body IDs. All BodyIds are NodeIds. */
export type BodyId = NodeId;
/** Type used to denote assembly tree CAD view IDs. All CadViewIds are NodeIds. */
export type CadViewId = NodeId;
/** Type used to denote assembly tree PMI IDs. All PmiIds are NodeIds. */
export type PmiId = NodeId;
/** Type used to denote assembly tree sheet IDs. All SheetIds are NodeIds. */
export type SheetId = NodeId;
/** Type used to denote light keys */
export type LightKey = number;
/** Type used to denote the degrees of angles. */
export type Degrees = number;
/** Type used to denote the radians of angles. */
export type Radians = number;
/** A number typed in pixel units. */
export type Pixels = number;
/** A pair of numbers identifying a mesh. */
export type MeshId = [number, number];
/** A pair of numbers identifying an image. */
export type ImageId = [number, number];
/**
 * This is the User Data Index for a node.
 *
 * Values of this type are unsigned 64 bit numbers.
 *
 * A value is of type `number` when it can be represented precisely as such.
 *
 * Otherwise a value is of type `string`, where the string is the hex encoding of the index.
 * The hex representation is in uppercase and does not have a leading `0x`.
 */
export type UserDataIndex = number | string;
export declare enum NodeSource {
    LoadModel = 0,
    CreateNode = 1,
    CreateInstance = 2,
    CreatePmi = 3
}
export declare enum ScreenConfiguration {
    Desktop = 0,
    Mobile = 1
}
export declare enum ElementType {
    Faces = 0,
    Lines = 1,
    Points = 2
}
/**
 * Enumerated values used for setting camera projection.
 */
export declare enum Projection {
    /** Perspective projection */
    Perspective = 0,
    /** Orthographic projection */
    Orthographic = 1
}
/**
 * Enumerated values used when setting pre-defined view orientations.
 */
export declare enum ViewOrientation {
    /** Top view */
    Top = 0,
    /** Bottom view */
    Bottom = 1,
    /** Left view */
    Left = 2,
    /** Right view */
    Right = 3,
    /** Front view */
    Front = 4,
    /** Back view */
    Back = 5,
    /** Isometric view */
    Iso = 6,
    TopRightFront = 7,
    TopLeftFront = 8,
    TopLeftBack = 9,
    TopRightBack = 10,
    TopBack = 11,
    TopFront = 12,
    TopLeft = 13,
    TopRight = 14,
    BottomRightBack = 15,
    BottomLeftBack = 16,
    BottomLeftFront = 17,
    BottomRightFront = 18,
    BottomFront = 19,
    BottomBack = 20,
    BottomLeft = 21,
    BottomRight = 22,
    RightBottomBack = 23,
    RightBottomFront = 24,
    RightTopFront = 25,
    RightTopBack = 26,
    RightTop = 27,
    RightBottom = 28,
    RightFront = 29,
    RightBack = 30,
    LeftBottomFront = 31,
    LeftBottomBack = 32,
    LeftTopBack = 33,
    LeftTopFront = 34,
    LeftTop = 35,
    LeftBottom = 36,
    LeftBack = 37,
    LeftFront = 38,
    FrontBottomRight = 39,
    FrontTopRight = 40,
    FrontTopLeft = 41,
    FrontBottomLeft = 42,
    FrontRight = 43,
    FrontLeft = 44,
    FrontTop = 45,
    FrontBottom = 46,
    BackTopRight = 47,
    BackBottomRight = 48,
    BackBottomLeft = 49,
    BackTopLeft = 50,
    BackLeft = 51,
    BackRight = 52,
    BackBottom = 53,
    BackTop = 54
}
/** Enumerated values used when referring to an axis */
export declare enum Axis {
    /** The X axis */
    X = 0,
    /** The Y axis */
    Y = 1,
    /** The Z axis */
    Z = 2
}
/** Enumerated values used when referring to the buttons on a mouse */
export declare enum Button {
    /** No mouse button */
    None = -1,
    /** Left mouse button */
    Left = 0,
    /** Middle mouse button */
    Middle = 1,
    /** Right mouse button */
    Right = 2
}
/** Bitmask for buttons being pressed when referring to the buttons on a mouse */
export declare enum Buttons {
    None = 0,
    Left = 1,
    Right = 2,
    Middle = 4
}
/** Enumerated values for types of handles for [[HandleOperator]]. */
export declare enum HandleType {
    Axis = 0,
    Plane = 1,
    ViewPlane = 2,
    Rotate = 3
}
/** Enumerated values for types of handle events for [[HandleOperator]]. */
export declare enum HandleEventType {
    Translate = 0,
    Rotate = 1
}
/** Enumerates IDs for operators. For more information see reference for [[Operator]]. */
export declare enum OperatorId {
    Invalid = -1,
    None = 0,
    Navigate = 1,
    Orbit = 2,
    Pan = 3,
    Zoom = 4,
    WindowZoom = 5,
    Walk = 6,
    KeyboardWalk = 7,
    WalkMode = 8,
    Turntable = 9,
    Select = 10,
    AreaSelect = 11,
    RayDrillSelect = 12,
    RedlineCircle = 13,
    RedlineText = 14,
    RedlineRectangle = 15,
    RedlinePolyline = 16,
    MeasureEdgeLength = 17,
    MeasureFaceFaceDistance = 18,
    MeasureLineLineAngle = 19,
    MeasurePointPointDistance = 20,
    MeasureBodyBodyDistance = 21,
    MeasureFaceFaceAngle = 22,
    MeasurePolylineDistance = 23,
    MeasurePolygonArea = 24,
    Note = 25,
    Cutting = 26,
    Handle = 27,
    NavCube = 28,
    AxisTriad = 29,
    Floorplan = 30,
    SpaceMouse = 31
}
/** Enumerates IDs for built-in operators */
export type BuiltInOperatorId = OperatorId.Navigate | OperatorId.Orbit | OperatorId.Pan | OperatorId.Zoom | OperatorId.WindowZoom | OperatorId.Walk | OperatorId.KeyboardWalk | OperatorId.WalkMode | OperatorId.Turntable | OperatorId.Select | OperatorId.AreaSelect | OperatorId.RayDrillSelect | OperatorId.RedlineCircle | OperatorId.RedlineText | OperatorId.RedlineRectangle | OperatorId.RedlinePolyline | OperatorId.MeasureEdgeLength | OperatorId.MeasureFaceFaceDistance | OperatorId.MeasureLineLineAngle | OperatorId.MeasurePointPointDistance | OperatorId.MeasureBodyBodyDistance | OperatorId.MeasureFaceFaceAngle | OperatorId.MeasurePolylineDistance | OperatorId.MeasurePolygonArea | OperatorId.Note | OperatorId.Cutting | OperatorId.Handle | OperatorId.NavCube | OperatorId.AxisTriad | OperatorId.Floorplan | OperatorId.SpaceMouse;
/** Enumerates EventTypes for Operators */
export declare enum EventType {
    MouseDown = 0,
    MouseMove = 1,
    MouseUp = 2,
    Mousewheel = 3,
    TouchStart = 4,
    TouchMove = 5,
    TouchEnd = 6,
    KeyDown = 7,
    KeyUp = 8,
    ViewOrientationChange = 9
}
/** Enumerates Modifier Keys. Note this enumeration may not correspond with JavaScript key codes for the corresponding keys. */
export declare enum KeyModifiers {
    /** No modifier key */
    None = 0,
    /** The shift key */
    Shift = 2,
    /** The alt key */
    Alt = 4,
    /** The control key */
    Control = 8,
    /** The command key */
    Command = 16
}
/** Enumerates types of mouse input */
export declare enum MouseInputType {
    /** Mouse button was pressed down */
    Down = 0,
    /** Mouse button was released */
    Up = 1,
    /** Mouse was moved */
    Move = 2,
    /** The mouse wheel was moved */
    Wheel = 3
}
/** Enumerates types of touch input */
export declare enum TouchInputType {
    /** A touch has started */
    Start = 0,
    /** A touch has moved */
    Move = 1,
    /** A touch has ended */
    End = 2
}
/** Enumerates types of keyboard input */
export declare enum KeyInputType {
    /** A key has been pressed */
    Down = 0,
    /** A key has been released */
    Up = 1
}
/** Enumerates directions for the walk operator */
export declare enum WalkDirection {
    Forward = 0,
    Backward = 1,
    Left = 2,
    Right = 3,
    Up = 4,
    Down = 5,
    RotateRight = 6,
    RotateLeft = 7,
    TiltUp = 8,
    TiltDown = 9
}
/** Enumerates JavaScript Key Codes. We recommend using [this tool](https://keycode.info/) if you are unsure which keycode you are trying to capture. */
export declare enum KeyCode {
    /** Backspace key */
    Backspace = 8,
    /** Shift key */
    Shift = 16,
    /** Escape Key */
    Escape = 27,
    /** PageUp Key */
    PgUp = 33,
    /** PageDown Key */
    PgDown = 34,
    /** Left Arrow */
    LeftArrow = 37,
    /** Up Arrow */
    UpArrow = 38,
    /** Right Arrow */
    RightArrow = 39,
    /** Down Arrow */
    DownArrow = 40,
    /** Delete Key */
    Delete = 46,
    /** Characters */
    a = 65,
    b = 66,
    c = 67,
    d = 68,
    e = 69,
    f = 70,
    g = 71,
    h = 72,
    i = 73,
    j = 74,
    k = 75,
    l = 76,
    m = 77,
    n = 78,
    o = 79,
    p = 80,
    q = 81,
    r = 82,
    s = 83,
    t = 84,
    u = 85,
    v = 86,
    w = 87,
    x = 88,
    y = 89,
    z = 90,
    _0 = 48,
    _1 = 49,
    _2 = 50,
    _3 = 51,
    _4 = 52,
    _5 = 53,
    _6 = 54,
    _7 = 55,
    _8 = 56,
    _9 = 57,
    NumPad_0 = 96,
    NumPad_1 = 97,
    NumPad_2 = 98,
    NumPad_3 = 99,
    NumPad_4 = 100,
    NumPad_5 = 101,
    NumPad_6 = 102,
    NumPad_7 = 103,
    NumPad_8 = 104,
    NumPad_9 = 105
}
/** Bitmask for allowed selection types */
export declare enum SelectionMask {
    None = 0,
    Face = 1,
    Line = 2,
    Point = 4,
    All = 7
}
/** Enumerates a type of selection */
export declare enum SelectionType {
    /** Nothing was selected */
    None = 0,
    /** A face element was selected */
    Face = 1,
    /** A line element was selected */
    Line = 2,
    /** A point element was selected */
    Point = 3,
    /** A Part was selected */
    Part = 4
}
/**
 * Enumerates the modes to be used when performing selections.
 */
export declare enum SelectionMode {
    /**
     * Sets the contents of the selection set to the supplied item.
     * All other selected items will be removed from the selection set.
     */
    Set = 0,
    /** Adds the item to the contents of the selection set. */
    Add = 1,
    /**
     * If the selection item is in the selection set, removes it.
     * If it is not in the selection set, adds it.
     */
    Toggle = 2
}
/**
 * Enumerates the visual indications for selected objects
 */
export declare enum SelectionHighlightMode {
    /** Selected nodes are highlighted */
    HighlightOnly = 0,
    /** An outline is rendered around selected nodes */
    OutlineOnly = 1,
    /** Selected Nodes are highlighted and an outline is rendered. */
    HighlightAndOutline = 2
}
/** Enumerates the type of message passed via an info callback */
export declare enum InfoType {
    /** Informational message which will most likely not affect execution */
    Info = 0,
    /** Warning message which does not trigger an error but may affect program execution */
    Warning = 1,
    /** Error message indicating a problem has occurred */
    Error = 2
}
/**
 * Enumerates the mode the viewer will use when streaming data to the client.
 */
export declare enum StreamingMode {
    /**
     * This is the default setting for the viewer.
     * Data will be streamed as it becomes visible based on the viewing frustum.
     * Keyed data that was encoded with priority 0 will not be streamed unless explicitly requested.
     * The supporting server process will remain active while the user views the model.
     */
    Interactive = 1,
    /**
     * All data will be streamed to the client.
     * Priority will be given to data visible based on the view frustum.
     * The supporting server process will remain active.
     */
    All = 2,
    /**
     * No data is streamed to the client unless it has been explicitly requested.
     * The supporting server process will remain active while the user views the model.
     */
    OnDemand = 4,
    /**
     * The default streaming mode.
     */
    Default = 1
}
/**
 * Enumerates the mode that is used for rendering
 */
export declare enum RendererType {
    /**
     * This is the default setting for the viewer.
     * Rendering is performed using webGL on the client.
     */
    Client = 0,
    /** Rendering is performed on the server */
    Server = 1
}
/** Enumerates drawing modes available in the viewer. More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/scene_attributes/draw-modes.html). */
export declare enum DrawMode {
    /** Lines are rendered and faces are not */
    Wireframe = 0,
    /** Faces are rendered and lines are not */
    Shaded = 1,
    /** Lines and faces are rendered */
    WireframeOnShaded = 2,
    /** Silhouette edges and obscured lines are rendered */
    HiddenLine = 3,
    /** Selected items are drawn on top, and unselected items are drawn transparent */
    XRay = 4,
    /** Shading occurs only in mid-tones so that edge lines and highlights remain visually prominent. */
    Gooch = 5,
    /** Conventional smooth lighting values are calculated for each pixel and then quantized to a small number of discrete shades */
    Toon = 6
}
/** All valid draw mode name strings, including all {@link DrawMode} members. */
export declare const DrawModeNames: readonly ["Wireframe", "Shaded", "WireframeOnShaded", "HiddenLine", "XRay", "Gooch", "Toon"];
/** String identifiers for draw modes, including all {@link DrawMode} members. */
export type DrawModeName = (typeof DrawModeNames)[number];
/** No override draw mode, mode of the viewer is applied */
export declare const NoOverrideDrawMode: -1;
/** Drawing modes available for nodes to override default mode of the viewer */
export type NodeDrawMode = DrawMode | typeof NoOverrideDrawMode;
/** All valid node draw mode name strings, including all {@link DrawMode} members and "NoOverrideDrawMode". */
export declare const NodeDrawModeNames: readonly ["NoOverrideDrawMode", "Wireframe", "Shaded", "WireframeOnShaded", "HiddenLine", "XRay", "Gooch", "Toon"];
/** String identifiers for node draw modes, including all {@link DrawMode} members and "NoOverrideDrawMode". */
export type NodeDrawModeName = (typeof NodeDrawModeNames)[number];
/** Enumerates ways of displaying transparent geometry */
export declare enum TransparencyMode {
    /** Transparent objects are blended together without z-sorting. */
    Unsorted = 0,
    /** Only the front-most transparent object is visible at a given pixel. */
    SingleLayer = 1
}
/** Enumerates ways of displaying transparent (unselected) geometry in the x-ray draw mode. */
export type XRayTransparencyMode = TransparencyMode;
/** Enumerates anti-aliasing modes available in the viewer */
export declare enum AntiAliasingMode {
    /** SMAA anti-aliasing */
    SMAA = 0,
    /** No anti-aliasing */
    None = 1
}
/** Enumerates instance modifier modes. More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/model_attributes/instance-modifiers.html). */
export declare enum InstanceModifier {
    /** If set, the instance will not be affected by an explode operation. */
    DoNotExplode = 0,
    /** If set, the instance will not be affected by cutting planes. */
    DoNotCut = 1,
    /** If set, the instance will not be selectable. */
    DoNotSelect = 2,
    /**
     * If set, the instance will be drawn at the same size
     * regardless of camera settings.
     */
    SuppressCameraScale = 3,
    /** If set, the instance will ignore scene-level visibility. */
    OverrideSceneVisibility = 4,
    /** If set, the instance will not be lit. */
    DoNotLight = 5,
    /** If set, the instance will not be outlined when highlighted. */
    DoNotOutlineHighlight = 6,
    /** If set, the instance will not be included in bounding calculations. */
    ExcludeBounding = 7,
    /** If set, the instance will not use the mesh's per-vertex colors. */
    DoNotUseVertexColors = 8,
    /**
     * If set, the instance will be drawn before other instances
     * and will not be culled in order to reach the target frame rate.
     */
    AlwaysDraw = 9,
    /** If set, the instance will not be affected by [[DrawMode.XRay]]. */
    DoNotXRay = 10,
    /**
     * If set, the instance will be oriented such that the cardinal
     * axes of object space are aligned with the cardinal axes of
     * screen space.
     */
    ScreenOriented = 11,
    /**
     * If set, the instance will be drawn in a space that extends
     * from X=-1 at the left side of the screen to X=1 at the right
     * side of the screen and from Y=-1 at the bottom of the screen
     * to Y=1 at the top of the screen.
     *
     * If the aspect ratio of the screen is not 1:1, the instance
     * will be scaled so that it appears as if the aspect ratio
     * were 1:1 (i.e., so that the instances will not appear stretched).
     */
    ScreenSpace = 12,
    /**
     * If set, the instance will be drawn in a space that extends
     * from X=-1 at the left side of the screen to X=1 at the right
     * side of the screen and from Y=-1 at the bottom of the screen
     * to Y=1 at the top of the screen.
     *
     * If the aspect ratio of the screen is not 1:1, the instance
     * will stretch in the direction of the longer side.
     */
    ScreenSpaceStretched = 13,
    /**
     * If set, the instance will not be affected by resets. Or by methods
     * that unset or reset certain properties on the instance
     */
    DoNotReset = 14
}
/** Flags used when creating a mesh instance */
export declare enum MeshInstanceCreationFlags {
    None = 0,
    /**
     * If set, the instance will be drawn at the same size
     * regardless of camera settings.
     */
    SuppressCameraScale = 1,
    /**
     * If set, the instance will be oriented such that the cardinal
     * axes of object space are aligned with the cardinal axes of
     * screen space.
     */
    ScreenOriented = 2,
    /** If set, the instance will not be affected by cutting planes. */
    DoNotCut = 4,
    /** If set, the instance will not be affected by explode. */
    DoNotExplode = 8,
    /** If set, the instance will not be selectable. */
    DoNotSelect = 16,
    /** If set, the instance will not be lit. */
    DoNotLight = 32,
    /** If set, the instance will not be outlined when highlighted. */
    DoNotOutlineHighlight = 64,
    /** If set, the instance will not be included in bounding calculations. */
    ExcludeBounding = 128,
    /** If set, the instance will not use the mesh's per-vertex colors. */
    DoNotUseVertexColors = 256,
    /** If set, the instance will not be visible until explicitly made visible. */
    Invisible = 512,
    /** If set, the instance will not be affected by [[DrawMode.XRay]]. */
    DoNotXRay = 1024,
    /**
     * If set, the instance will be drawn before other instances
     * and will not be culled in order to reach the target frame rate.
     */
    AlwaysDraw = 2048,
    /** If set, the instance will ignore scene-level visibility. */
    OverrideSceneVisibility = 4096,
    /**
     * If set, the instance will be drawn in a space that extends
     * from X=-1 at the left side of the screen to X=1 at the right
     * side of the screen and from Y=-1 at the bottom of the screen
     * to Y=1 at the top of the screen.
     *
     * If the aspect ratio of the screen is not 1:1, the instance
     * will be scaled so that it appears as if the aspect ratio
     * were 1:1 (i.e., so that the instances will not appear stretched).
     */
    ScreenSpace = 8192,
    /**
     * If set, the instance will be drawn in a space that extends
     * from X=-1 at the left side of the screen to X=1 at the right
     * side of the screen and from Y=-1 at the bottom of the screen
     * to Y=1 at the top of the screen.
     *
     * If the aspect ratio of the screen is not 1:1, the instance
     * will stretch in the direction of the longer side.
     */
    ScreenSpaceStretched = 16384,
    /**
     * If set, the instance will not be affected by resets. Or by methods
     * that unset or reset certain properties on the instance
     */
    DoNotReset = 32768
}
export declare enum BoundingPreviewMode {
    /** No bounding previews will be rendered */
    None = 0,
    /** Bounding previews will be rendered for models that have not been streamed yet. */
    Model = 1,
    /** Bounding previews will be rendered for instances that have not been streamed yet. */
    Instance = 2,
    /** Bounding previews will be rendered for items that have been ejected. This is only applicable if the memoryLimit option is set at viewer creation. */
    Ejected = 4,
    /** Combination of Model, Instance, and Ejected options */
    All = 7
}
/** Enumerates Camera Orbit Fallback Modes */
export declare enum OrbitFallbackMode {
    /** Orbit around the camera target. */
    CameraTarget = 0,
    /** Orbit around the center of the model bounding box. */
    ModelCenter = 1,
    /** Orbit around a specified point. Defaults to the origin if there is no specified point. */
    OrbitTarget = 2
}
/** Enumerates Walk Modes */
export declare enum WalkMode {
    Mouse = 0,
    Keyboard = 1
}
/** Enumerates of the types returned by Model.getNodeType() */
export declare enum NodeType {
    /** This is a node in the model tree, this node doesn't hold any instanced mesh/body. */
    AssemblyNode = 0,
    /** This is a node in the model tree, but this one holds one or more instanced meshes/bodies. */
    PartInstance = 1,
    /** This node is a non instanced part, it holds the actual mesh/body data, like measurement. */
    Part = 2,
    /** This node is an instanced mesh/body. */
    BodyInstance = 3,
    /** This node is an instanced PMI mesh/body. */
    PmiBody = 4,
    /** This node corresponds to the frame you'll find surrounding PMIs when the view is a CATIA annotation view type. */
    ViewFrame = 5,
    /** This node is a non instanced "undefined" body, held by a Part type node. */
    Body = 6,
    /** This node is a non instanced body built from a brep, held by a Part type node. */
    BrepBody = 7,
    /** This node is a non instanced body built from a tessellated object, held by a Part type node. */
    TessBody = 8,
    /** This node is a non instanced body built from a wireframed object, held by a Part type nod.e */
    WireBody = 9,
    /** This node is a non instanced body built from a point cloud, held by a Part type node. */
    PointsBody = 10,
    /** This node is a PMI, holding PMI data and PmiBody. */
    Pmi = 11,
    /** This node is the CAD view, holding view data and ViewFrame. */
    CadView = 12,
    /** This node is a Drawing sheet. */
    DrawingSheet = 13,
    /** If for any reason a node doesn't correspond to any of those types, unknown is returned. */
    Unknown = 14
}
/** PMI type */
export declare enum PmiType {
    /** Unknown value */
    Unknown = 0,
    /** Plain text */
    Text = 1,
    /** Dimension */
    Dimension = 2,
    /** Arrow */
    Arrow = 3,
    /** Balloon */
    Balloon = 4,
    /** Center of circle */
    CircleCenter = 5,
    /** Coordinate */
    Coordinate = 6,
    /** Datum */
    Datum = 7,
    /** Fastener */
    Fastener = 8,
    /** GD&T */
    Gdt = 9,
    /** Locator */
    Locator = 10,
    /** Point */
    MeasurementPoint = 11,
    /** Roughness */
    Roughness = 12,
    /** Welding */
    Welding = 13,
    /** Table */
    Table = 14,
    /** Other */
    Other = 15,
    /** Geometrical tolerance */
    GeometricalTolerance = 16
}
/** PMI subtype */
export declare enum PmiSubType {
    /** Unknown value */
    Unknown = 0,
    /** Datum subtype */
    DatumIdent = 1,
    /** Datum subtype */
    DatumTarget = 2,
    /** Dimension distance subtype */
    DimensionDistance = 1,
    /** Dimension distance subtype */
    DimensionDistanceOffset = 2,
    /** Dimension distance subtype */
    DimensionDistanceCumulate = 3,
    /** Dimension chamfer subtype */
    DimensionChamfer = 4,
    /** Dimension slope subtype */
    DimensionSlope = 5,
    /** Dimension ordinate subtype */
    DimensionOrdinate = 6,
    /** Dimension radius subtype */
    DimensionRadius = 7,
    /** Dimension radius subtype */
    DimensionRadiusTangent = 8,
    /** Dimension radius subtype */
    DimensionRadiusCylinder = 9,
    /** Dimension radius subtype */
    DimensionRadiusEdge = 10,
    /** Dimension diameter subtype */
    DimensionDiameter = 11,
    /** Dimension diameter subtype */
    DimensionDiameterTangent = 12,
    /** Dimension diameter subtype */
    DimensionDiameterCylinder = 13,
    /** Dimension diameter subtype */
    DimensionDiameterEdge = 14,
    /** Dimension diameter subtype */
    DimensionDiameterCone = 15,
    /** Dimension length subtype */
    DimensionLength = 16,
    /** Dimension length subtype */
    DimensionLengthCurvilinear = 17,
    /** Dimension length subtype */
    DimensionLengthCircular = 18,
    /** Dimension angle subtype */
    DimensionAngle = 19,
    /** GD&T Feature control frame subtype */
    GdtFcf = 1,
    /** Line welding subtype */
    WeldingLine = 1,
    /** Spot welding subtype */
    WeldingSpot = 2,
    /** User symbol, other subtype */
    OtherSymbolUser = 1,
    /** Utility symbol, other subtype */
    OtherSymbolUtility = 2,
    /** Custom symbol, other subtype */
    OtherSymbolCustom = 3,
    /** Geometric reference, other subtype */
    OtherGeometricReference = 4,
    /** Region symbol, other subtype */
    OtherRegion = 5
}
/** PMI reference to topology (brep) */
export declare enum PmiTopoRef {
    Unknown = -1,
    /** Self-containing set of topological entities */
    Context = 1,
    /** Abstract root type for any topological entity (body or single item) */
    Item = 2,
    /** Vertex whose position is the average of all edges' extremity positions to whom it belongs */
    MultipleVertex = 3,
    /** Vertex with one set of coordinates (absolute position) */
    UniqueVertex = 4,
    /** Edge belonging to a wire body */
    WireEdge = 5,
    /** Edge belonging to a BrepData body */
    Edge = 6,
    /** Usage of an edge in a loop */
    CoEdge = 7,
    /** Array of co-edges that delimit a face */
    Loop = 8,
    /** Topological face delimiting a shell */
    Face = 9,
    /** Topological shell (open or closed) */
    Shell = 10,
    /** Topological region */
    Connex = 11,
    /** Abstract root type for any topological body */
    Body = 12,
    /** Single wire body */
    SingleWireBody = 13,
    /** Main entry to non-wire topology */
    BrepData = 14,
    /** Main entry to wire topology */
    WireBody = 17
}
/**
 * Enumerates face winding for use with geometry. Face winding is the order in which points are specified relative to a face normal.
 */
export declare enum FaceWinding {
    /** The winding is unknown. This is not recommended. */
    Unknown = 0,
    /** Faces are wound in a clockwise manner. */
    Clockwise = 1,
    /** Faces are wound in a counter-clockwise manner. */
    CounterClockwise = 2
}
export declare enum OverlayAnchor {
    UpperLeftCorner = 0,
    LowerLeftCorner = 1,
    LowerRightCorner = 2,
    UpperRightCorner = 3,
    TopCenter = 4,
    LeftCenter = 5,
    RightCenter = 6,
    BottomCenter = 7,
    Center = 8
}
/**
 * Enumerates the unit types that an overlay viewport value may be.
 */
export declare enum OverlayUnit {
    /**
     * The value is specified in CSS pixels.
     */
    Pixels = 0,
    /**
     * The value is specified as a proportion of the viewing canvas.
     * If the canvas is resized, the viewport's dimensions will be recalculated accordingly.
     * In this case the value should be specified in a range of 0.0 to 1.0.
     */
    ProportionOfCanvas = 1,
    /**
     * The value is specified as a portion of the viewing canvas' minimum dimension.
     * If the canvas is resized, the viewport's dimensions will be recalculated based on the minimum
     * of the X and Y proportions.
     * This prevents the overlay from becoming oversized on very wide or very tall canvass.
     */
    MinimumProportionOfCanvas = 2,
    /**
     * The value is specified as a proportion its corresponding parameters calculated value.
     * For example, given a viewport specified with width of 0.25 and unit type of ProportionOfCanvas,
     * specifying height with value of 1.0 and type of ProportionOfOtherDimension will ensure that the
     * calculated height value will be equal to the calculated width value should the canvas resize.
     * In this case the value should be specified in a range of 0.0 to 1.0.
     */
    ProportionOfOtherDimension = 3
}
/** Specifies how point size is interpreted. */
export declare enum PointSizeUnit {
    /** Point size is measured directly in pixels of the output image, regardless of display DPI. */
    ScreenPixels = 0,
    /** CSS pixels, which may be larger than screen pixels on high-DPI displays. */
    CSSPixels = 1,
    /**
     * The world-space units in which model geometry is defined.
     * If this unit is used, points will scale according to distance from the camera under perspective projection.
     */
    World = 2,
    /** If this unit is used, the point size will be multiplied by the width of the screen. */
    ProportionOfScreenWidth = 3,
    /** If this unit is used, the point size will be multiplied by the height of the screen. */
    ProportionOfScreenHeight = 4,
    /**
     * If this unit is used, the point size will be multiplied by the length of the diagonal
     * of the scene's bounding box.
     * Points will scale according to distance from the camera under perspective projection.
     */
    ProportionOfBoundingDiagonal = 5
}
/** Specifies the appearance of points. */
export declare enum PointShape {
    /**
     * Points will be drawn as squares filled with a solid color.
     * This option will give the best performance for large point clouds.
     */
    Square = 0,
    /** Points will be drawn as circles filled with a solid color. */
    Disk = 1,
    /**
     * Points will be drawn as filled circles lit as if they were spheres
     * instead of being filled with a solid color.
     */
    Sphere = 2
}
/** Object which maps an Id to a string value */
export interface IdStringMap {
    [nodeId: number]: string | undefined;
}
/** Object which maps an Id to a color value */
export interface IdColorMap {
    [nodeId: number]: Color | undefined;
}
/** Object which maps an Id to a boolean value */
export interface IdBooleanMap {
    [nodeId: number]: boolean | undefined;
}
/** Object which maps an Id to a number value */
export interface IdNumberMap {
    [nodeId: number]: number | undefined;
}
/** Object which maps a string to a string */
export interface StringStringMap {
    [key: string]: string | undefined;
}
/**
 * Object which identifies a reference to an element on a brep
 */
export declare class RefOnTopoItem {
    /** Id of the body in assembly tree */
    bodyId: BodyId;
    /** See PmiTopoRef. Could be face, edge... */
    subElementType: PmiTopoRef;
    /** Index of the face, edge... */
    subElementIndex: number;
}
/** Visibity of a node's branch, including all children of that node. */
export declare enum BranchVisibility {
    /** All children are not visible. */
    Hidden = 0,
    /** All children are visible. */
    Shown = 1,
    /** Not all children have the same visibility state. */
    Mixed = 2
}
/**
 * Options for which types of child nodes to consider when calculating branch visibility.
 * By default, all types of child nodes are considered except for CAD views.
 */
export interface BranchVisibilityOptions {
    /**
     * Whether child assembly nodes are considered when calculating branch visibility.
     * @defaultValue true
     */
    children?: boolean;
    /**
     * Whether body nodes are considered when calculating branch visibility.
     * @defaultValue true
     */
    bodies?: boolean;
    /**
     * Whether PMI nodes are considered when calculating branch visibility.
     * @defaultValue true
     */
    pmis?: boolean;
    /**
     * Whether CAD view nodes are considered when calculating branch visibility.
     * @defaultValue false
     */
    cadViews?: boolean;
}
/** The space in which a culling vector is defined. */
export declare enum CullingVectorSpace {
    /** The object space of the item to which the culling vector is attached. The culling vector is affected by the item's modelling matrices. */
    Object = 0,
    /** World space. The culling vector is not affected by modelling matrices. */
    World = 1
}
export declare enum BuiltinOverlayIndex {
    /** @hidden */
    First = 8,
    Handles = 8,
    AxisTriad = 9,
    NavCube = 10,
    Floorplan = 11,
    /** @hidden */
    TestFramework = 12
}
export declare class FaceFaceDistanceItem {
    pos1: Point3;
    pos2: Point3;
    distance: number;
}
/**
 * Object representing the up and front vectors for the model coordinate system.
 */
export declare class ViewAxes {
    frontVector: Point3;
    upVector: Point3;
}
/** A vector and angle used to determine an object's visibility based on camera orientation. */
export interface CullingVector {
    /** The space in which the culling vector is defined. */
    space: CullingVectorSpace;
    /** A vector that will be compared with the view vector. */
    vector: Point3;
    /** The maximum angle between the culling vector and the view vector within which the object will be visible. */
    toleranceDegrees: number;
}
/** @hidden */
export type ResolveFunc<T> = (value: T | PromiseLike<T>) => void;
/** @hidden */
export type RejectFunc = (error: unknown) => void;
/**
 * Type used to denote an XML filename.
 */
export type XmlFilename = string;
/**
 * Type used to denote an XML ExternalModel name.
 */
export type ExternalModelName = string;
/**
 * Type used to denote an SCS model's URI.
 */
export type ScsUri = string;
/**
 * Callback to massage ExternalModel names within an XML load file to SC model names.
 * Return null to skip the model.
 * Returned value can be synchronous (non-Promise) or asynchronous (Promise).
 */
export type MassageModelNameFunc = (modelName: ExternalModelName) => Promise<ScModelName | null> | (ScModelName | null);
/**
 * Callback to map ExternalModel names within an XML load file to SCS file URis or SCS file buffers.
 * Return null to skip the model.
 * Returned value can be synchronous (non-Promise) or asynchronous (Promise).
 */
export type ModelNameToScsFileFunc = (modelName: ExternalModelName) => Promise<ScsUri | ScsBuffer | null> | (ScsUri | ScsBuffer | null);
/**
 * Specifies the appearance of a single repetion of a line pattern.
 * The format is an arbitrary-length array of `1`s and `0`s, where
 * pixels covered by a `1` in the pattern are visible and pixels
 * covered by a `0` are invisible.
 *
 * Examples:
 * - `[1,0]`: a dashed line with equal-length dashes and gaps
 * - `[1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0]`: a dash followed by a gap of
 *   equal length with a dot in the center
 */
export type LinePattern = number[] | Uint8Array;
/**
 * Specifies the units in which the length of a [[LinePattern]] is measured.
 */
export declare enum LinePatternLengthUnit {
    /** Object space units before applying modelling matrices. */
    Object = 0,
    /** Object space units after applying modelling matrices. */
    World = 1,
    /**
     * A proportion of the width of the canvas, where `1` means the full width.
     *
     * When this unit is used, the line pattern will appear the same regardless
     * of zoom or distance from the camera. However, this requires extra
     * calculation for each vertex in the line, which makes it less
     * performant than other units.
     */
    ProportionOfScreenWidth = 2,
    /**
     * A proportion of the height of the canvas, where `1` means the full height.
     *
     * When this unit is used, the line pattern will appear the same regardless
     * of zoom or distance from the camera. However, this requires extra
     * calculation for each vertex in the line, which makes it less
     * performant than other units.
     */
    ProportionOfScreenHeight = 3
}
/** Specifies a category of nodes in x-ray mode. See [[DrawMode.XRay]]. */
export declare enum XRayGroup {
    /** Selected nodes. */
    Selected = 0,
    /** Unselected nodes. */
    Unselected = 1
}
/**
 * Specifies the units in which the interval between samples in a blurring
 * operation is measured.
 */
export declare enum BlurIntervalUnit {
    /** Pixels of the source image. */
    Pixels = 0,
    /** A proportion of the width of the source image, where `1` means the full width. */
    ProportionOfWidth = 1,
    /** A Proportion of the height of the source image, where `1` means the full height. */
    ProportionOfHeight = 2
}
/**
 * Describes a single layer in the bloom effect.
 *
 * See [[View.setBloomLayers]].
 */
export interface BloomLayerInfo {
    /**
     * A number used to scale the contribution of the layer to the image.
     * Can be greater than `1`.
     *
     * If unspecified, the value will be `1`.
     *
     * See [[View.setBloomIntensityScale]].
     */
    intensity?: number;
    /**
     * The number of samples taken in each of the two passes of the
     * Gaussian blur operation executed when rendering this layer.
     *
     * If unspecified, the value will be `9`.
     */
    blurSamples?: number;
    /**
     * The distance between samples taken during the Gaussian blur operation
     * executed when rendering this layer.
     *
     * The [[BlurIntervalUnit.Pixels]] unit is interpreted based on the
     * dimensions of the current layer, which are half the dimensions
     * of the previous layer (or the source image if this is the first layer).
     *
     * Using `[1, Pixels]` will ensure that each pixel in the previous layer
     * contributes to the current layer, but will cause the bloom size to
     * be dependent on the canvas size. It may therefore be advisable to adjust
     * the interval using [[BlurIntervalUnit.Pixels]] and translate it
     * to one of the other units. This has been done for the default settings.
     *
     * If unspecified, the value will be `[1, Pixels]`.
     */
    blurInterval?: [number, BlurIntervalUnit];
}
export declare enum AttributeType {
    Undefined = 0,
    Int = 1,
    Float = 2,
    Time = 3,
    String = 4,
    Ignored = 5
}
export interface Attribute {
    getType(): AttributeType;
    getTitle(): string;
    getValue(): string;
    copy(): Attribute;
}
export declare class FilteredNodes {
    readonly isInclusive: boolean;
    readonly nodeIds: Set<NodeId>;
    constructor(inclusive: boolean, nodeIds: Set<NodeId>);
}
/**
 * Contains a defaultVisibility boolean and visibilityExceptions set of NodeIds.
 * If defaultVisibility is true, the NodeIds represent hidden nodes.
 * If defaultVisibility is false, the NodeIds represent visible nodes.
 */
export declare class VisibilityState {
    readonly defaultVisibility: boolean;
    readonly visibilityExceptions: Set<NodeId>;
    constructor(defaultVisibility: boolean, nodeIds: Set<NodeId>);
}
/**
 * Settings that control the behavior of visual node comparison enabled
 * by [[View.startComparison]].
 */
export interface ComparisonConfig {
    /** The color used for areas covered by the first set of nodes but not the second set. */
    only1Color?: Color;
    /** The color used for areas covered by the second set of nodes but not the first set. */
    only2Color?: Color;
    /** The color used for areas covered by both sets of nodes. */
    sameColor?: Color;
}
/**
 * Configuration for all `loadSubtree` functions in the [[Model]] class.
 */
export declare class LoadSubtreeConfig {
    /**
     * Optional matrix to get multiplied into the net attachment matrix.
     */
    additionalMatrix: Matrix | null;
    /**
     * Controls whether or not missing models are ignored or cause an error.
     */
    allowMissingExternalModels: boolean;
    /**
     * If true, then models are attached with all geometry turned invisible.
     * If exist, default CAD configuration and CAD view will not be activated.
     */
    attachInvisibly: boolean;
    /**
     * If true, then external models found in XML files will be implicitly loaded.
     * Otherwise [[Model.requestNodes]] must be called to load the external models.
     */
    implicitlyLoadXmlExternalModels: boolean;
    /**
     * If true CAD views will not be loaded. This can reduce memory consumption
     */
    ignoreCadViews: boolean;
    /**
     * If true filters will not be loaded. This can reduce memory consumption
     */
    ignoreFilters: boolean;
    /**
     * If true layers will not be loaded. This can reduce memory consumption
     */
    ignoreLayers: boolean;
    /**
     * If true generic types (IFC types) will not be loaded. This can reduce memory consumption
     */
    ignoreGenericTypes: boolean;
    /**
     * If true BIM relationships will not be loaded. This can reduce memory consumption
     */
    ignoreBimRelationships: boolean;
    /**
     * Allow `subtreeLoaded` callbacks to be triggered by this load.
     * @hidden
     */
    _allowSubtreeLoadedCallback: boolean;
    copy(): LoadSubtreeConfig;
}
/** FileType */
export declare enum FileType {
    /** User modeller. */
    Unknown = 0,
    /** CATIA modeller. */
    Catia = 2,
    /** CATIA V5 modeller. */
    CatiaV5 = 3,
    /** CADDS modeller. */
    Cadds = 4,
    /** Unigraphics modeller. */
    Unigraphics = 5,
    /** Parasolid modeller. */
    Parasolid = 6,
    /** Euclid modeller. */
    Euclid = 7,
    /** IGES modeller. */
    Iges = 9,
    /** Unisurf modeller. */
    Unisurf = 10,
    /** VDA modeller. */
    Vda = 11,
    /** STL modeller. */
    Stl = 12,
    /** WRL modeller. */
    Wrl = 13,
    /** DXF modeller. */
    Dxf = 14,
    /** ACIS modeller. */
    Acis = 15,
    /** Pro/E modeller. */
    ProE = 16,
    /** STEP modeller. */
    Step = 18,
    /** I-DEAS modeller. */
    Ideas = 19,
    /** JT modeller. */
    Jt = 20,
    /** SolidWorks modeller. */
    Slw = 22,
    /** CGR modeller. */
    Cgr = 23,
    /** PRC modeller. */
    Prc = 24,
    /** XVL modeller. */
    Xvl = 25,
    /** HPGL modeller. */
    Hpgl = 26,
    /** TopSolid modeller. */
    TopSolid = 27,
    /** OneSpace designer modeller. */
    OneSpaceDesigner = 28,
    /** 3DXML modeller. */
    _3dxml = 29,
    /** Inventor modeller. */
    Inventor = 30,
    /** Postscript modeller. */
    PostScript = 31,
    /** PDF modeller. */
    Pdp = 32,
    /** U3D modeller. */
    U3d = 33,
    /** IFC modeller. */
    Ifc = 34,
    /** DWG modeller. */
    Dwg = 35,
    /** DWF modeller. */
    Dwf = 36,
    /** SolidEdge modeller. */
    Se = 37,
    /** OBJ modeller. */
    Obj = 38,
    /** KMZ modeller. */
    Kmz = 39,
    /** COLLADA modeller. */
    Dae = 40,
    /** 3DS modeller. */
    _3ds = 41,
    /** Rhino modeller. */
    Rhino = 43,
    /** XML modeller. */
    Xml = 44,
    /** 3MF modeller. */
    _3mf = 45,
    /** SCS modeller. */
    Scs = 46,
    /** 3DHTML modeller. */
    _3dHtml = 47,
    /** Hsf modeller. */
    Hsf = 48,
    /** GL modeller. */
    Gltf = 49,
    /** Revit modeller. */
    Revit = 50,
    /** FBX modeller. */
    Fbx = 51
}
/**
 * Defines the invisible ground plane onto which simple shadows
 * are projected.
 *
 * See [[View.setGroundPlane]].
 */
export interface GroundPlane {
    /** The normal of the plane. */
    normal: Point3;
    /**
     * Any point on the plane. If `undefined`, the plane will be positioned
     * at the furthest extent of the model's bounding box.
     */
    position?: Point3;
    /**
     * If `true`, the model's view axes will affect how the normal is
     * interpreted. A normal of `[0,0,1]` will be aligned with the model's
     * up-vector.
     */
    followViewAxes?: boolean;
}
/**
 * Defines the orientation of the image-based lighting environment applied
 * to physically-based materials.
 */
export interface ImageBasedLightingOrientation {
    /**
     * A matrix applied to the environment. An identity matrix orients the
     * environment so that "up" is in the direction of the positive Y-axis.
     */
    matrix: Matrix;
    /**
     * If `true`, the environment will be oriented according to the model's
     * view axes after the matrix is applied.
     */
    followViewAxes?: boolean;
}
/**
 * Represents a node's metallic and roughness values when using a metallic roughness shading model.
 */
export interface MetallicRoughnessValue {
    /** Metallic value */
    metallic: number;
    /** Roughness value */
    roughness: number;
}
/**
 * Units in which attenuation distances are specified for simple
 * reflections.
 *
 * See [[View.setSimpleReflectionAttenuation]].
 */
export declare enum SimpleReflectionAttenuationUnit {
    /** World-space units. */
    World = 0,
    /**
     * If this unit is used, distances will be multiplied by the distance
     * from the ground plane to the furthest point on the scene bounding.
     */
    ProportionOfBoundingHeight = 1
}
/**
 * Possible modes to use when performing operations which allow for customization of the way the
 * model tree is walked.
 */
export declare enum TreeWalkMode {
    /**
     * The default tree walk mode which visits every node starting from the root.
     *
     * This mode will work in the general case, but may prove to be less performant when
     * operating on large trees.
     */
    Default = 0,
    /**
     * Perform multiple synchronous walks beginning at each node passed into the function.
     *
     * This optimized mode mode can speed up performance by greatly reducing the amount of nodes
     * that need to be walked for large model trees. Use this mode if the nodes you are
     * operating on are contained in distict subtrees, or primarily leaf nodes.
     *
     * Note that if the input contains nodes which are in the same subtree, but contain
     * conflicting values, this method may produce undesirable results, and the default method
     * should be used instead.
     */
    PerNode = 1
}
/** Used to allow different orientations of the floorplan display. */
export declare enum FloorplanOrientation {
    /** For North-Up, the floorplan rotation is fixed such that north is always facing up. */
    NorthUp = 0,
    /** For Avatar-Up, the avatar rotation is fixed such that it always points up, and the floorplan will
     *  rotate around it. */
    AvatarUp = 1
}
/**  Define the IFC relationships type */
export declare enum RelationshipType {
    ContainedInSpatialStructure = 0,
    Aggregates = 1,
    VoidsElement = 2,
    FillsElement = 3,
    SpaceBoundary = 4,
    ConnectsPathElements = 5,
    Undefined = 6
}
/** Type for the relationships ID*/
export type BimId = string;
export interface RelationshipInfo {
    type: RelationshipType;
    relateds: BimId[];
    relatings: BimId[];
}
/** Types of draw strategy */
export declare enum DrawStrategy {
    /** Draw only largest objects to maintain constant framerate */
    FixedFramerate = 0,
    /** Use occlusion culling to ignore occluded objects */
    OcclusionCulling = 1
}
export interface WebViewerConfig {
    /** The ID of the div element to use for the Web Viewer. */
    containerId?: HtmlId;
    /** A HTML element to use for the Web Viewer. */
    container?: HTMLElement;
    /** Specifies the endpoint to be used by the viewer. This can be of type: http, https or ws. */
    endpointUri?: string;
    /** Specifies the instance name to be loaded. This option is required if you specify an enpdointUri of type `ws://` or `wss://`. */
    model?: ScModelName | null;
    /** An arbitrary value used for authentication. If used, it must match the token expected by the server for connection to proceed. */
    sessionToken?: string;
    /** Specifies a buffer containing a binary representation of an SCS file to load. */
    buffer?: Uint8Array;
    /** Specifies the renderer type to be used. Default value is [[RendererType.Client]]. */
    rendererType?: RendererType;
    /** Whether the viewer should be started without connecting to a server or loading a model. */
    empty?: boolean;
    /** Specifies whether pointer events should be used when available. Setting this option to false can be useful when using web views in GUI toolkits that rely on Internet Explorer. Default value is `true`. */
    usePointerEvents?: boolean;
    /** Sets the streaming mode that the viewer will use. Default value is [[StreamingMode.Interactive]]. */
    streamingMode?: StreamingMode;
    /** Controls the amount of mesh data present on the client machine at given time. This value is expressed in [Mebibytes](https://en.wikipedia.org/wiki/Mebibyte). Default value is `0` indicating no limit. */
    memoryLimit?: number;
    /** Specifies what types of bounding previews should be rendered. DefaultValue is [[BoundingPreviewMode.All]]. */
    boundingPreviewMode?: BoundingPreviewMode;
    /** Specifies which mesh detail level will be used to initially stream the model. The default value is `0`. */
    defaultMeshLevel?: number;
    /** Specifies a scale factor that will be applied to the streaming size cutoff.
     *
     * In streaming sessions, an object whose projected size is lower than the cutoff will not be streamed until its projected size reaches the cutoff.
     *
     * In file sessions, when loading a tree via XML, a file whose projected size is lower than the cutoff will not be requested until its projected size reaches the cutoff.
     *
     * A value of 0 will disable the cutoff.  The value should be in the interval of [0.0, 2.0].
     * If unspecified, this value will default to 1.0 for streaming sessions and 0.0 (disabled) for file based sessions.
     * */
    streamCutoffScale?: number;
    /** If true, then automatic generation of background sheets for drawings is not performed when the drawing is loaded. */
    disableAutomaticBackgroundSheets?: boolean;
    /** If true, then the floorplan overlay capability will not be displayed automatically for BIM enabled models */
    disableAutomaticFloorplanOverlay?: boolean;
    /** If true, the default view axes will be calculated from the initial camera unless explicitly set during authoring time. Default value is `true`. */
    calculateDefaultViewAxes?: boolean;
    /** If true, disable automatic fitworld on camera activation when there is no camera on view */
    disableAutomaticFitWorld?: boolean;
    /** If true, then CAD views contained within external models will populate the model tree UI. */
    enableShatteredModelUiViews?: boolean;
    /** Path containing the graphics engine `.wasm` files. Follows the same rules as the `src` attribute of an HTML `script` tag. */
    enginePath?: string;
    defaultMetallicFactor?: number;
    defaultRoughnessFactor?: number;
    /** @hidden */
    _maxConcurrentAttachments?: number;
    /** @hidden */
    _markImplicitNodesOutOfHierarchy?: boolean;
}
export interface ViewConfig {
    container: string | HTMLElement;
}
export interface MarkupData {
    [key: string]: object[];
}
/** Formats accepted when specifying texture images. */
export declare enum ImageFormat {
    /** Uncompressed, interleaved RGBA, 32 bits per pixel (1 byte per channel) */
    Rgba32 = 0,
    /** Uncompressed, interleaved RGB, 24 bits per pixel (1 byte per channel) */
    Rgb24 = 1,
    /** Uncompressed grayscale, 1 byte per pixel */
    Gray8 = 2,
    /** Uncompressed grayscale with alpha, 16 bits per pixel (1 byte per channel) */
    GrayAlpha16 = 3,
    /** JPEG data */
    Jpeg = 4,
    /**
     * PNG data.
     *
     * Note: Currently, applying PNGs inserted through the viewer API as textures
     *       will cause objects to which they are applied to be treated as transparent,
     *       which may cause undesirable behavior. This can be avoided by setting
     *       [[TextureModifier.Decal]] in [[TextureOptions]] when applying the texture.
     *       [[TextureModifier.Decal]] is not currently supported for PBR based materials.
     */
    Png = 5
}
/** Parameters that describe an image to be used as a texture map. */
export interface ImageOptions {
    /** The format of the `data` property */
    format?: ImageFormat;
    /** The raw image data */
    data?: Uint8Array;
    /**
     * For uncompressed formats, the width of the image data in pixels.
     * Ignored for compressed formats.
     */
    width?: number;
    /**
     * For uncompressed formats, the height of the image data in pixels.
     * Ignored for compressed formats.
     */
    height?: number;
}
export { TextureTiling, TextureParameterization, TextureModifier, TextureInterpolation, TextureMipMapping, } from '@ts3d-hoops/streamcache';
/** Parameters that describe a texture and control how it is applied. */
export interface TextureOptions {
    /** The image used by this texture. */
    imageId?: ImageId;
    /**
     * A matrix to be applied to the texture's UV coordinates. If not specified,
     * the identity matrix will be used.
     */
    matrix?: Matrix;
    /**
     * Controls how UV coordinates are interpreted outside the [0.0, 1.0] range.
     * (Default: [[TextureTiling.Repeat]])
     */
    tiling?: TextureTiling;
    /**
     * Enables or disables interpolation of texel colors (also known as linear filtering).
     * (Default: `true`)
     *
     * If disabled, the texture image will appear pixelated when enlarged.
     */
    interpolation?: boolean;
    /**
     * Enables or disables mipmapping. (Default: `true`)
     *
     * Enable mipmapping to improve image quality at the expense of slightly more memory usage.
     * Depending on the platform, mipmapping may take effect only for textures with dimensions
     * that are powers of two.
     *
     * If disabled, textures may appear noisy when reduced in size.
     */
    mipMapping?: boolean;
    /**
     * Indicates how texture coordinates are specified or generated.
     * (Defalut: [[TextureParameterization.UV]])
     *
     * This controls where a given pixel of the texture appears on the object to which it is applied.
     */
    parameterization?: TextureParameterization;
    /**
     * Flags that control how the texture is applied. This is the result of OR-ing together
     * one or more [[TextureModifier]]s. (Default: `0`)
     */
    modifiers?: number;
}
export { BimMask, ViewKey } from '@ts3d-hoops/streamcache';
/**
 * Specifies which layers to include in a snapshot. These may be bitwise
 * OR-ed together.
 */
export declare enum SnapshotLayer {
    /** The rendered model and 3D overlays. */
    Model = 1,
    /** SVG-based markup. */
    Svg = 2,
    /** HTML-based markup, such as text boxes. */
    Html = 4,
    /** All available layers. */
    All = 7
}
export interface GetNodesBoundingConfig {
    /**
     * Controls whether or not body instances are visited.
     */
    bodyInstance: boolean;
    /**
     * Controls whether or not PMI bodies are visited.
     */
    pmiBody: boolean;
    /**
     * Controls whether or not view frames are visited.
     */
    viewFrame: boolean;
    /**
     * Controls whether or not a tight bounding is desired.
     * If `undefined`, this is treated as `false`.
     */
    tightBounding?: boolean;
    /**
     * Controls whether or not invisible geometry is visited.
     * If `undefined`, this is treated as `false`.
     */
    ignoreInvisible?: boolean;
}
export interface SimpleReflectionAttenuation {
    /** The distance from the ground plane at which the model begins to fade. */
    nearDistance: number;
    /** The distance from the ground plane at which the model is completely faded. */
    farDistance: number;
    /** The unit in which `nearDistance` and `farDistance` are specified. */
    unit: SimpleReflectionAttenuationUnit;
}
export type { TextureFlags } from '@ts3d-hoops/streamcache';
/**
 * An interface describing a material. The input and output of material operations
 */
export interface IMaterial {
    /** Whether this material uses physically-based rendering (PBR) */
    isPbr?: boolean;
    /** Color applied to face geometry */
    faceColor?: Color;
    /** Color applied to line geometry */
    lineColor?: Color;
    /** Color applied to point geometry */
    pointColor?: Color;
    /** Color of specular highlights */
    specularColor?: Color;
    /** Ambient light color contribution */
    ambientColor?: Color;
    /** Color emitted by the material */
    emissiveColor?: Color;
    /** Metallic factor for PBR materials (0.0 = dielectric, 1.0 = metallic) */
    metallic?: number;
    /** Surface roughness for PBR materials (0.0 = mirror, 1.0 = completely rough) */
    roughness?: number;
    /** Material opacity (0.0 = transparent, 1.0 = opaque) */
    opacity?: number;
    /** Intensity of specular reflections */
    specularIntensity?: number;
    textureFlags?: TextureFlags;
    textureMatrix?: Matrix;
    /** Base color texture map */
    colorMap?: ImageId;
    /** Normal map for surface detail */
    normalMap?: ImageId;
    /** Emissive texture map */
    emissiveMap?: ImageId;
    /** Metallic and roughness values texture map */
    metallicRoughnessMap?: ImageId;
    /** Ambient occlusion texture map */
    occlusionMap?: ImageId;
    /** Array of dash/gap lengths defining line pattern */
    linePattern?: number[];
    /** Total length of the line pattern */
    linePatternLength?: number;
    /** Unit of measurement for line pattern length */
    linePatternLengthUnit?: LinePatternLengthUnit;
}
/** Union type of all possible material parameter property names */
export type MaterialParam = keyof IMaterial;
