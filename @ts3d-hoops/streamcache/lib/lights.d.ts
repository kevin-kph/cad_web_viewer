import { Vector3 } from '@ts3d-hoops/common';
export declare enum LightSpace {
    World = 0,
    Camera = 1
}
export declare enum LightType {
    Directional = 0,
    Point = 1
}
export interface ILight {
    position: Vector3;
    color: Vector3;
    type: LightType;
    space: LightSpace;
}
