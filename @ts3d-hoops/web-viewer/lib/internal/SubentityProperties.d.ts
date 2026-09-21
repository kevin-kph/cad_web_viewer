import { Point3 } from '@ts3d-hoops/common';
import { PhantomMember } from './types';
/**
 * Represents any Edge subentity property.
 */
export type Edge = LineElement | CircleElement | OtherEdgeElement;
/**
 * Represents any Face subentity property.
 */
export type Face = CylinderElement | PlaneElement | ConeElement | SphereElement | TorusElement | Blend01Element | Blend02Element | Blend03Element | NurbsElement | CylindricalElement | OffsetElement | PipeElement | RuledElement | RevolutionElement | ExtrusionElement | FromCurvesElement | TransformElement | OtherFaceElement;
/**
 * Represents any Edge or Face subentity property.
 */
export type Base = Edge | Face;
/**
 * The edge type of an `Edge` property.
 */
export declare enum EdgeType {
    Undefined = 0,
    Line = 1,
    Circle = 2,
    Other = 6
}
/**
 * The face type of an `Face` property.
 */
export declare enum FaceType {
    Undefined = 0,
    Cylinder = 3,
    Plane = 4,
    Cone = 5,
    Other = 6,
    Sphere = 7,
    Torus = 8,
    Blend01 = 9,
    Blend02 = 10,
    Blend03 = 11,
    Nurbs = 12,
    Cylindrical = 13,
    Offset = 14,
    Pipe = 15,
    Ruled = 16,
    Revolution = 17,
    Extrusion = 18,
    FromCurves = 19,
    Transform = 20
}
/**
 * Returned by [[Model.getEdgeProperty]] when the requested edge is a segment.
 */
export declare class LineElement {
    constructor(length: number);
    static fromJson(propData: any): LineElement;
    copy(): LineElement;
    type(): EdgeType;
    protected readonly __LineElement: PhantomMember;
    length: number;
}
/**
 * Returned by [[Model.getEdgeProperty]] when the requested edge is an arc.
 */
export declare class CircleElement {
    constructor(radius: number, origin: Point3, normal: Point3);
    static fromJson(propData: any): CircleElement;
    copy(): CircleElement;
    type(): EdgeType;
    protected readonly __CircleElement: PhantomMember;
    radius: number;
    origin: Point3;
    normal: Point3;
}
/**
 * Returned by [[Model.getEdgeProperty]] when the requested edge fits neither a segment nor a circle arc.
 */
export declare class OtherEdgeElement {
    constructor(length: number);
    static fromJson(propData: any): OtherEdgeElement;
    copy(): OtherEdgeElement;
    type(): EdgeType;
    protected readonly __OtherEdgeElement: PhantomMember;
    length: number;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits no other face type.
 */
export declare class OtherFaceElement {
    copy(): OtherFaceElement;
    type(): FaceType;
    protected readonly __OtherFaceElement: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a cylinder.
 */
export declare class CylinderElement {
    constructor(radius: number, origin: Point3, normal: Point3);
    static fromJson(propData: any): CylinderElement;
    copy(): CylinderElement;
    type(): FaceType;
    protected readonly __CylinderElement: PhantomMember;
    radius: number;
    origin: Point3;
    normal: Point3;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a plane.
 */
export declare class PlaneElement {
    constructor(origin: Point3, normal: Point3);
    static fromJson(propData: any): PlaneElement;
    copy(): PlaneElement;
    type(): FaceType;
    protected readonly __PlaneElement: PhantomMember;
    origin: Point3;
    normal: Point3;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a cone.
 */
export declare class ConeElement {
    constructor(radius: number, origin: Point3, normal: Point3, halfAngle: number);
    static fromJson(propData: any): ConeElement;
    copy(): ConeElement;
    type(): FaceType;
    protected readonly __ConeElement: PhantomMember;
    radius: number;
    origin: Point3;
    normal: Point3;
    halfAngle: number;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a sphere.
 */
export declare class SphereElement {
    constructor(radius: number, origin: Point3, normal: Point3);
    static fromJson(propData: any): SphereElement;
    copy(): SphereElement;
    type(): FaceType;
    protected readonly __SphereElement: PhantomMember;
    radius: number;
    origin: Point3;
    normal: Point3;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a torus.
 */
export declare class TorusElement {
    constructor(majorRadius: number, minorRadius: number, origin: Point3, normal: Point3);
    static fromJson(propData: any): TorusElement;
    copy(): TorusElement;
    type(): FaceType;
    protected readonly __TorusElement: PhantomMember;
    majorRadius: number;
    minorRadius: number;
    origin: Point3;
    normal: Point3;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a Blend01.
 */
export declare class Blend01Element {
    copy(): Blend01Element;
    type(): FaceType;
    protected readonly __Blend01Element: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a Blend02.
 */
export declare class Blend02Element {
    copy(): Blend02Element;
    type(): FaceType;
    protected readonly __Blend02Element: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a Blend03.
 */
export declare class Blend03Element {
    copy(): Blend03Element;
    type(): FaceType;
    protected readonly __Blend03Element: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a Nurbs.
 */
export declare class NurbsElement {
    copy(): NurbsElement;
    type(): FaceType;
    protected readonly __NurbsElement: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a Cylindrical.
 */
export declare class CylindricalElement {
    copy(): CylindricalElement;
    type(): FaceType;
    protected readonly __CylindricalElement: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits an Offset.
 */
export declare class OffsetElement {
    copy(): OffsetElement;
    type(): FaceType;
    protected readonly __OffsetElement: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a Pipe.
 */
export declare class PipeElement {
    copy(): PipeElement;
    type(): FaceType;
    protected readonly __PipeElement: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a Ruled.
 */
export declare class RuledElement {
    copy(): RuledElement;
    type(): FaceType;
    protected readonly __RuledElement: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a Revolution.
 */
export declare class RevolutionElement {
    copy(): RevolutionElement;
    type(): FaceType;
    protected readonly __RevolutionElement: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits an Extrusion.
 */
export declare class ExtrusionElement {
    copy(): ExtrusionElement;
    type(): FaceType;
    protected readonly __ExtrusionElement: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a FromCurves.
 */
export declare class FromCurvesElement {
    copy(): FromCurvesElement;
    type(): FaceType;
    protected readonly __FromCurvesElement: PhantomMember;
}
/**
 * Returned by [[Model.getFaceProperty]] when the requested face fits a Transform.
 */
export declare class TransformElement {
    copy(): TransformElement;
    type(): FaceType;
    protected readonly __TransformElement: PhantomMember;
}
