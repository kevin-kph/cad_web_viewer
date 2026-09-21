import { InclusionKey, InstanceKey } from '@ts3d-hoops/streamcache';
import { CadView } from './node/CadView';
import { Pmi } from './node/Pmi';
import { ProductOccurrence } from './node/ProductOccurrence';
import { NodeInfo } from './node/types';
import { BodyId } from '../../types';
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
 * This master `BitDefinitions` enum is to help maintain non-colliding bits, so more specialized
 * bit enums can be type summed (e.g. FooBits | BarBits) without worry of overlap.
 *
 * Mirrored in C++.
 */
export declare enum BitDefinitions {
    IsLoaded = -2147483648,
    InitiallyShown = 1073741824,
    InitiallyRemoved = 536870912,
    OutOfHierarchy = 268435456,
    IsAnnotationView = 134217728,
    IsCameraSet = 67108864,
    IsPmiFilteringSet = 33554432,
    IsGeomFilteringSet = 16777216,
    IsCrossSectionSet = 8388608,
    IsExplosionSet = 4194304,
    IsCombineState = 2097152,
    IsPerspective = 1048576,
    IsShownSpecified = 524288,
    IsShown = 262144,
    BranchVisibilityHidden = 131072,
    BranchVisibilityShown = 65536,
    BranchVisibilityDirty = 32768,
    PreventFromResetting = 16384,
    HasDynamicFrame = 8192,
    IsMissing = 4096,
    IsExternalModelRoot = 2048,
    Requested = 1024,// For `StreamingMode.OnDemand` mode.
    ImplicitBody = 512,// Does not have authored assembly tree data
    IsDefaultView = 256,
    Unused2 = 128,
    Unused1 = 64,
    NodeTypeDrawingSheet = 32,
    IsADefaultNodeType = 16,
    NodeTypeDrawingView = 8,
    NodeTypeGroup = 4,
    NodeTypeProduct = 2,// Node can be a product and flagged as configuration. But a node can't be a product and a 2D sheet
    IsAConfigurationNode = 1
}
export declare enum BitDefinitions2 {
    IgnoreParentRotation = 2,
    IgnoreParentScale = 1
}
export type BodyInstanceParent = ProductOccurrence;
export type PmiBodyParent = Pmi;
export type ViewFrameParent = CadView;
export declare enum AnyBodyBits {
    OutOfHierarchy = 268435456,
    PreventFromResetting = 16384,
    Requested = 1024,
    ImplicitBody = 512
}
export declare enum AnyBodyModifierBits {
    IgnoreParentScale = 1,
    IgnoreParentRotation = 2
}
export declare enum BodyTypeBits {
    None = 0,
    BodyInstance = 1,
    PmiBody = 2,
    ViewFrame = 4,
    All = 7
}
export interface AnyBodyInfo {
    readonly nodeInfo: NodeInfo;
    readonly inclusionKey: InclusionKey;
    readonly instanceKey: InstanceKey;
    readonly bits: AnyBodyBits;
    readonly modifierbits: AnyBodyModifierBits;
    readonly bodyRef?: BodyId;
}
export type BodyInstanceInfo = AnyBodyInfo;
export type PmiBodyInfo = AnyBodyInfo;
export type ViewFrameInfo = AnyBodyInfo;
