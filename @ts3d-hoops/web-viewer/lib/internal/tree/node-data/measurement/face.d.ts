import { Blend01Element, Blend02Element, Blend03Element, ConeElement, CylinderElement, CylindricalElement, ExtrusionElement, Face, FromCurvesElement, NurbsElement, OffsetElement, OtherFaceElement, PipeElement, PlaneElement, RevolutionElement, RuledElement, SphereElement, TorusElement, TransformElement } from '../../../SubentityProperties';
import { AssemblyDataParser } from '../../load/AssemblyDataParser';
export declare function parseBinary(parser: AssemblyDataParser): Face;
export declare class Cylinder {
    static parseBinary(parser: AssemblyDataParser): CylinderElement;
}
export declare class Plane {
    static parseBinary(parser: AssemblyDataParser): PlaneElement;
}
export declare class Cone {
    static parseBinary(parser: AssemblyDataParser): ConeElement;
}
export declare class Sphere {
    static parseBinary(parser: AssemblyDataParser): SphereElement;
}
export declare class Torus {
    static parseBinary(parser: AssemblyDataParser): TorusElement;
}
export declare class Other {
    static parseBinary(_parser: AssemblyDataParser): OtherFaceElement;
}
export declare class Blend01 {
    static parseBinary(_parser: AssemblyDataParser): Blend01Element;
}
export declare class Blend02 {
    static parseBinary(_parser: AssemblyDataParser): Blend02Element;
}
export declare class Blend03 {
    static parseBinary(_parser: AssemblyDataParser): Blend03Element;
}
export declare class Nurbs {
    static parseBinary(_parser: AssemblyDataParser): NurbsElement;
}
export declare class Cylindrical {
    static parseBinary(_parser: AssemblyDataParser): CylindricalElement;
}
export declare class Offset {
    static parseBinary(_parser: AssemblyDataParser): OffsetElement;
}
export declare class Pipe {
    static parseBinary(_parser: AssemblyDataParser): PipeElement;
}
export declare class Ruled {
    static parseBinary(_parser: AssemblyDataParser): RuledElement;
}
export declare class Revolution {
    static parseBinary(_parser: AssemblyDataParser): RevolutionElement;
}
export declare class Extrusion {
    static parseBinary(_parser: AssemblyDataParser): ExtrusionElement;
}
export declare class FromCurves {
    static parseBinary(_parser: AssemblyDataParser): FromCurvesElement;
}
export declare class Transform {
    static parseBinary(_parser: AssemblyDataParser): TransformElement;
}
