import { Point3 } from '@ts3d-hoops/common';
import { IWebViewer } from '../../core/IWebViewer';
export declare class DoorCache {
    private readonly _viewer;
    private _nearbyDoors;
    constructor(viewer: IWebViewer);
    private _performSphereSelection;
    updateNearbyDoors(position: Point3, maxDoorDistance: number, nearbyDoorOpacity: number): Promise<void>;
    forgetNearbyDoors(): void;
}
