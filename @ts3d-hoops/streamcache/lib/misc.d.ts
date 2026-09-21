import { DataIds, ImageId, ModelKey } from './keys';
export interface CuttingSectionLimits {
    maxCuttingSections: number;
    maxCuttingPlanesPerSection: number;
}
export interface OpenModelFailedData {
    reason: string;
    name: string;
}
export interface BadDataData {
    type: string;
    expected: string;
    actual: string;
}
export interface Error<ErrorType> {
    scFunction: string;
    data: ErrorType;
}
export interface DiscriminatedError<Discriminant extends string, ErrorType> extends Error<ErrorType> {
    scFunction: Discriminant;
    data: ErrorType;
}
export type OpaqueError = DiscriminatedError<'getMetaData', DataIds> | DiscriminatedError<'metaDataKeyInfo', ModelKey> | DiscriminatedError<'beginScreenAreaSelection', undefined> | DiscriminatedError<'beginConvexPolyhedronSelection', undefined> | DiscriminatedError<'beginRayDrillSelection', undefined> | DiscriminatedError<'beginSphereSelection', undefined> | DiscriminatedError<'advanceVolumeSelection', undefined>;
export declare const enum AttachScope {
    OfInitialEmptyModel = 0
}
export declare enum AntiAliasingMode {
    None = 0,
    SMAA = 1
}
export declare enum BimType {
    Floor = 0,
    Wall = 1,
    Door = 2
}
export declare enum BlurIntervalUnit {
    Pixels = 0,
    ProportionOfWidth = 1,
    ProportionOfHeight = 2
}
export declare enum CullingVectorSpace {
    Object = 0,
    World = 1
}
export declare enum DrawMode {
    Default = 0,
    Highlight = 1,
    HiddenLine = 2,
    XRay = 3,
    Gooch = 4,
    Toon = 5
}
export declare enum DrawStrategy {
    FixedFramerate = 0
}
export declare enum ElementType {
    Faces = 0,
    Lines = 1,
    Points = 2
}
export declare enum ElementMask {
    None = 0,
    Faces = 1,
    Lines = 2,
    Points = 4,
    All = 7
}
export declare enum ColorType {
    Base = 0,
    Specular = 1,
    Emissive = 2,
    Ambient = 3
}
export declare enum HighlightFilter {
    None = 0,
    Modulate = 1,
    Desaturate = 2,
    Colorize = 3
}
export declare enum HighlightMode {
    Visible = 0,
    VisibleWithFullOutline = 1
}
export declare enum LinePatternLengthUnit {
    Object = 0,
    World = 1,
    ProportionOfScreenWidth = 2,
    ProportionOfScreenHeight = 3
}
export declare enum PointShape {
    Square = 0,
    Disk = 1,
    Sphere = 2
}
export declare enum PointSizeUnit {
    ScreenPixels = 0,
    CSSPixels = 1,
    World = 2,
    ProportionOfScreenWidth = 3,
    ProportionOfScreenHeight = 4,
    ProportionOfBoundingDiagonal = 5
}
export declare enum Projection {
    Perspective = 0,
    Orthographic = 1,
    Stretched = 2
}
export declare enum SessionType {
    Uninitialized = 0,
    Network = 1,
    Scs = 2
}
export declare enum SetVisibility {
    Hide = 0,
    Show = 1,
    Initial = 2
}
export declare enum SimpleReflectionAttenuationUnit {
    World = 0,
    ProportionOfBoundingHeight = 1
}
export declare enum SmaaQuality {
    Low = 0,
    Medium = 1,
    High = 2,
    Ultra = 3
}
export declare enum StateFailure {
    SessionNotStarted = 0,
    Cancelled = 1,
    CorruptRpcMessage = 2
}
/**
 * Controls interpolation of texel colors (also known as linear filtering).
 */
export declare enum TextureInterpolation {
    /** Enable interpolation for smooth texture appearance. */
    On = 0,
    /** Disable interpolation - texture will appear pixelated when enlarged. */
    Off = 1
}
/**
 * Controls mipmapping for textures.
 */
export declare enum TextureMipMapping {
    /** Enable mipmapping to improve image quality (uses slightly more memory). */
    On = 0,
    /** Disable mipmapping - textures may appear noisy when reduced in size. */
    Off = 1
}
/**
 * Flags that control how textures are applied.
 */
export declare enum TextureModifier {
    /** No special modifiers. */
    None = 0,
    /**
     * Any transparent areas of the texture will be the same color as the underlying
     * diffuse color of the object.
     */
    Decal = 1
}
/**
 * Indicates how texture coordinates are specified or generated.
 */
export declare enum TextureParameterization {
    /** The texture will be mapped according to UV coordinates specified in the mesh data. */
    UV = 0
}
/**
 * Controls how UV coordinates are interpreted outside the [0.0, 1.0] range.
 */
export declare enum TextureTiling {
    /** Repeat the texture image when UV coordinates go outside the [0.0, 1.0] range. */
    Repeat = 0,
    /**
     * Textures don't repeat. Any UV coordinates outside the [0.0, 1.0] range are clamped
     * to 0.0 or 1.0, whichever is closer.
     */
    Clamp = 1,
    /**
     * The texture will get mapped normally for parameters in the range [0,1],
     * but parameters outside that range will act as if the texture at that location is transparent.
     */
    Trim = 2
}
export declare enum TransparencyMode {
    Unsorted = 0,
    SingleLayer = 1
}
export declare enum XRayGroup {
    Selected = 0,
    Unselected = 1
}
export interface Statistics {
    elementCount: number;
    triangleCount: number;
}
export interface FrameStats {
    frames_per_second: number;
    draw_call_count: number;
    saved_draw_call_count: number;
    triangle_count: number;
    line_segment_count: number;
    point_count: number;
}
export interface TextureFlags {
    tiling: TextureTiling;
    interpolation: TextureInterpolation;
    mipMapping: TextureMipMapping;
    parameterization: TextureParameterization;
    modifier: TextureModifier;
}
export interface MaterialDescriptor {
    isPbr?: boolean;
    faceColor?: number[];
    lineColor?: number[];
    pointColor?: number[];
    specularColor?: number[];
    ambientColor?: number[];
    emissiveColor?: number[];
    metallic?: number;
    roughness?: number;
    opacity?: number;
    specularIntensity?: number;
    textureFlags?: TextureFlags;
    textureMatrix?: number[];
    colorMap?: ImageId;
    normalMap?: ImageId;
    emissiveMap?: ImageId;
    metallicRoughnessMap?: ImageId;
    occlusionMap?: ImageId;
    linePattern?: number[];
    linePatternLength?: number;
    linePatternLengthUnit?: LinePatternLengthUnit;
}
export declare enum MaterialMask {
    None = 0,
    IsPbr = 1,
    FaceColor = 2,
    LineColor = 4,
    PointColor = 8,
    SpecularColor = 16,
    AmbientColor = 32,
    EmissiveColor = 64,
    Metallic = 128,
    Roughness = 256,
    Opacity = 512,
    SpecularIntensity = 1024,
    TextureFlags = 2048,
    TextureMatrix = 4096,
    ColorMap = 8192,
    NormalMap = 16384,
    EmissiveMap = 32768,
    MetallicRoughnessMap = 65536,
    OcclusionMap = 131072,
    LinePattern = 262144
}
export declare enum BimMask {
    None = 0,
    Floor = 1,
    Wall = 2,
    Door = 4
}
/** A number typed in millisecond units. */
export type Milliseconds = number;
/**
 * Type used to denote an SC model name.
 */
export type ScModelName = string;
/**
 * Type used to denote an SCS model's byte buffer.
 */
export type ScsBuffer = Uint8Array;
/**
 * Type used to denote a view's key.
 */
export declare enum ViewKey {
    Invalid = -1,
    Default = 0
}
