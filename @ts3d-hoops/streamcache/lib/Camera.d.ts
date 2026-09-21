import { Matrix16, Vector3 } from '@ts3d-hoops/common';
import { Projection } from './misc';
export interface Camera {
    reset(projection: Projection, position: Vector3, target: Vector3, up: Vector3, width: number, height: number): void;
    position(): Vector3;
    target(): Vector3;
    upVector(): Vector3;
    projection(): Projection;
    setPosition(position: Vector3): void;
    setTarget(target: Vector3): void;
    setUpVector(upVector: Vector3): void;
    fieldWidth(): number;
    fieldHeight(): number;
    setNearLimit(nearLimit: number): void;
    nearLimit(): number;
    projectionMatrix(width: number, height: number): Matrix16;
    viewMatrix(): Matrix16;
    fullMatrix(width: number, height: number): Matrix16;
}
