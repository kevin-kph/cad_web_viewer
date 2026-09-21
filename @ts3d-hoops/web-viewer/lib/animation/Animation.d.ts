import { Point3 } from '@ts3d-hoops/common';
import { NodeId } from '../types';
import { NodeChannel, CameraChannel, NodeProperty, CameraProperty } from './Channel';
import { ExportContext, ImportContext } from './ImportExport';
import { Sampler } from './Sampler';
/** Structure encapsulating a specific animation */
export declare class Animation {
    name: string;
    nodeChannels: NodeChannel[];
    cameraChannels: CameraChannel[];
    pivotPoints: Map<number, Point3>;
    /**
     * Creates a new, empty Animation
     * @param name friendly name for the animation
     */
    constructor(name: string);
    /**
     * Creates a new node animation channel.
     * @param name friendly name for the channel.
     * @param target id of node that will receive interpolated values.
     * @param property the node property that will be animated.
     * @param sampler sampler describing the buffer and interpolation type.
     */
    createNodeChannel(name: string, target: NodeId, property: NodeProperty, sampler: Sampler): NodeChannel;
    private _registerNodeChannel;
    /**
     * Creates a new camera animation channel.
     * @param name friendly name for the channel.
     * @param property the property that will be animated by this channel.
     * @param sampler sampler describing the buffer and interpolation type used.
     */
    createCameraChannel(name: string, property: CameraProperty, sampler: Sampler): CameraChannel;
    private _registerCameraChannel;
    /**
     * Removes a channel from this animation.
     *
     * Call [[Player.reload]] on any players that are referencing this animation.
     */
    deleteChannel(channel: NodeChannel | CameraChannel): void;
    /** @hidden */
    _gatherForExport(context: ExportContext): void;
    /** @hidden */
    _export(context: ExportContext): {
        nodeChannels?: ReturnType<NodeChannel["_export"]>[];
        cameraChannels?: ReturnType<CameraChannel["_export"]>[];
        name?: string;
        pivotPoints?: {
            node: NodeId;
            point: ReturnType<Point3["toJson"]>;
        }[];
    };
    /** @hidden */
    static _import(context: ImportContext, data: ReturnType<Animation['_export']>): Animation;
}
