import { ViewKey } from '@ts3d-hoops/streamcache';
import { SnapshotLayer } from './types';
/**
 * This class contains configuration properties for creating viewer snapshots.
 */
export declare class SnapshotConfig {
    /**
     * Specifies which view the screenshot will be of.
     * the default value is 0.
     */
    viewKey: ViewKey;
    /**
     * Specifies the width of the resulting snapshot image.
     * A value of 0 indicates the canvas width should be used.
     * The default value is 0.
     */
    width: number;
    /**
     * Specifies the width of the resulting snapshot image.
     * A value of 0 indicates the canvas width should be used.
     * The default value is 0.
     */
    height: number;
    /**
     * Indicates which layers to include in the snapshot.
     * The default value is [[SnapshotLayer.All]].
     */
    layers: SnapshotLayer;
    /**
     * Creates a new SnapshotConfig object.
     */
    constructor(width?: number, height?: number, layers?: SnapshotLayer, viewKey?: ViewKey);
}
