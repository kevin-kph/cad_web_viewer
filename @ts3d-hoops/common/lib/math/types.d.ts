export type Vector3 = [number, number, number];
export type Vector3s = number[];
export type Vector4 = [number, number, number, number];
export type Vector4s = number[];
export type Uvs = number[] | Float32Array;
export type Rgbas = Vector4s | Uint8Array;
export type Matrix9 = [number, number, number, number, number, number, number, number, number];
export type Matrix12 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
export type Matrix16 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
export interface FaceFaceDistanceObject {
    distance: number;
    point1: Vector3;
    point2: Vector3;
}
export interface IRay {
    origin: Vector3;
    direction: Vector3;
}
export interface IBox {
    min: Vector3;
    max: Vector3;
}
export interface IPoint2 {
    x: number;
    y: number;
}
export interface IPoint3 extends IPoint2 {
    z: number;
}
export interface IPoint4 extends IPoint3 {
    w: number;
}
export declare function isIPoint2(o: any): o is IPoint2;
export declare function isIPoint3(o: unknown): o is IPoint3;
export declare function isIPoint4(o: unknown): o is IPoint4;
