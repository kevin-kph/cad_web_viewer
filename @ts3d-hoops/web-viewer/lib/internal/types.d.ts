export { FileType } from '../internal/tree/types';
export declare enum PromiseState {
    Pending = 0,
    Resolved = 1,
    Rejected = 2
}
/** @hidden */
export declare enum AttachType {
    Direct = 0,
    Indirect = 1
}
export declare enum ViewModeEyeBits {
    X = 2,
    Y = 4,
    Z = 8
}
export declare enum ViewModeUpBits {
    X = 16,
    Y = 32,
    Z = 64
}
export declare enum ViewMode {
    None = 0,
    EyeX_UpY = 34,
    EyeX_UpZ = 66,
    EyeY_UpX = 20,
    EyeY_UpZ = 68,
    EyeZ_UpX = 24,
    EyeZ_UpY = 40
}
export declare enum AxisConstants {
    StemHeight = 2,
    CapHeight = 0.5,
    TaperHeight = 0.1,
    SegmentCount = 20,
    CylinderRadius = 0.2,
    ConeBaseRadius = 0.4,
    LetterOffsetPos = 0.6,
    LetterWidth = 0.3,
    LetterHeight = 0.5
}
export declare enum CameraFlags {
    None = 0,
    Position = 1,
    Target = 2,
    Up = 4,
    Width = 8,
    Height = 16,
    Projection = 32,
    NearLimit = 64
}
export declare enum KeyInfoBy {
    Attachment = 0,
    Model = 1
}
export declare enum KeyInfoReturn {
    AllKeys = 0,
    KeyCountOnly = 1
}
export declare enum AddOrUpdate {
    Add = 0,
    Update = 1
}
export interface CuttingSectionLimits {
    maxCuttingSections: number;
    maxCuttingPlanesPerSection: number;
}
export declare enum RequestBatchType {
    MetaData = 0,
    Count = 1
}
export declare enum ScSelectionBits {
    SelectionBitsFaceHasMeasurementData = 1,
    SelectionBitsFacePlanar = 2,
    SelectionBitsEdgeHasMeasurementData = 4
}
export interface RawCallbackMap {
    [callbackName: string]: (...args: any[]) => any | undefined;
}
export declare enum VolumeTestResult {
    Outside = 0,
    PartiallyInside = 1,
    FullyInside = 2
}
export declare enum ReadyState {
    Unsent = 0,
    Opened = 1,
    HeadersRecieved = 2,
    Loading = 3,
    Done = 4
}
export declare enum Status {
    Ok = 200
}
export interface NumberMap<V> {
    [x: number]: V | undefined;
}
export interface StringMap<V> {
    [x: string]: V | undefined;
}
/**
 * Used to emulate nominal typing in Typescript's structural typing environment.
 *
 * ---
 *
 * Usage:
 * ```
 * protected readonly __YourClassName: PhantomMember;
 * ```
 *
 * and never initialize the phantom member.
 */
export type PhantomMember<T = void> = undefined | T;
export type CompareGreater<T> = (this: void, x: T, y: T) => boolean;
export * from '../util/';
