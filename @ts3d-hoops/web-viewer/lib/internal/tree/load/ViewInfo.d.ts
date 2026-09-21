import { Vector3 } from '../../Vector';
import { IView } from '../../../core';
export declare class ViewInfo {
    constructor(view: IView);
    calculateAttachHeuristic(extent: Vector3, center: Vector3): number;
    private readonly _frustum;
    private readonly _viewProjectionW;
    private readonly _position;
    private readonly _eye;
    private readonly _eyeDistanceInverse;
    private readonly _cameraIsOrtho;
}
