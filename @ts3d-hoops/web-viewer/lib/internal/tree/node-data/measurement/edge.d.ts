import { CircleElement, Edge, LineElement, OtherEdgeElement } from '../../../SubentityProperties';
import { AssemblyDataParser } from '../../load/AssemblyDataParser';
export declare function parseBinary(parser: AssemblyDataParser): Edge;
export declare class Line {
    static parseBinary(parser: AssemblyDataParser): LineElement;
}
export declare class Circle {
    static parseBinary(parser: AssemblyDataParser): CircleElement;
}
export declare class Other {
    static parseBinary(parser: AssemblyDataParser): OtherEdgeElement;
}
