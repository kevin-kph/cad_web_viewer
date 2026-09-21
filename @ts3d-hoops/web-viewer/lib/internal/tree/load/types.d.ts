export declare enum NodeParseBits1 {
    Id = 1,
    Name = 2,
    Visiblity = 4,
    Transform = 8,
    SubNodes = 16,
    Instance = 32,
    InstanceQuickAccess = 64,
    BodyInstances = 128,
    Attributes = 256,
    PartDataLink = 512,
    Bodies = 1024,
    FaceMeasurement = 2048,
    EdgeMeasurement = 4096,
    MeshKey = 8192,
    Unit = 16384,
    Views = 32768,
    Pmis = 65536,
    ScInclusionKey = 131072,
    ScInstanceKey = 262144,
    ExternalModel = 524288,
    PhysicalProperties = 1048576,
    VersionNumber = 2097152,
    ProductBits = 4194304,
    Header = 8388608,
    FrontUpVector = 16777216,
    ExchangeId = 33554432,
    LayerId = 67108864,
    LayerList = 134217728,
    Filters = 268435456,
    UserData = 536870912,
    UseNodeParseBits2 = 1073741824
}
export declare enum NodeParseBits2 {
    FaceAttributes = 1,
    EdgeAttributes = 2,
    OriginalName = 4,
    GenericTypes = 8,
    GenericTypeId = 16,
    GenericId = 32,
    DoublePrecisionMatrices = 64,
    PointAttributes = 128,
    Relationships = 256,
    Modifiers = 512,
    BodyRef = 1024
}
export declare enum ViewParseBits {
    Name = 1,
    Camera = 2,
    Pmi = 4,
    Frame = 8,
    ShowNodes = 16,
    HideNodes = 32,
    MoveNodes = 64,
    CuttingPlanes = 128,
    IsAnnotationView = 256,
    IsNotCameraSet = 512,
    IsNotPmiFilteringSet = 1024,
    IsNotGeomFilteringSet = 2048,
    IsNotCrosssectionSet = 4096,
    IsNotExplosionSet = 8192,
    IsCombineState = 16384,
    IsPerspective = 32768,
    IsDefaultView = 65536,
    ViewFilters = 131072
}
export declare enum PmiParseBits {
    Name = 1,
    TopoRef = 2,
    Attributes = 4,
    InitiallyHidden = 8,
    HasMultipleBodies = 16,
    ExchangeId = 32
}
export declare enum FilterParseBits {
    Name = 1,
    LayerItem = 2,
    EntityItem = 4,
    ScId = 8
}
export declare enum LayerParseBits {
    Name = 1
}
export declare enum AttributeParseBits {
    ValueName = 1,
    Units = 2
}
export declare enum RelationshipParseBits {
    Type = 1,
    Related = 2,
    Relating = 4
}
export interface LineWithMarker {
    line: SVGLineElement;
    start: SVGMarkerElement | null;
    end: SVGMarkerElement | null;
}
export type CanvasImageSource = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap;
