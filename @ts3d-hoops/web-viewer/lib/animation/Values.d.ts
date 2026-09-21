import { Point3, Quaternion, Matrix, Color } from '@ts3d-hoops/common';
import { Camera } from '../Camera';
import { NodeId } from '../types';
import { IWebViewer } from '../core/IWebViewer';
/**
 * Enumeration whose bits indicate which node properties are interpolated.
 * */
export declare enum NodeValuesFlags {
    None = 0,
    Transform = 1,
    Opacity = 2,
    Visibility = 4,
    Color = 8
}
/**
 * Structure which holds interpolated values for a node.
 * */
export declare class NodeValues {
    readonly nodeId: NodeId;
    readonly translate: Point3;
    readonly rotation: Quaternion;
    readonly scale: Point3;
    readonly color: Point3;
    pivotPoint: Point3 | null | undefined;
    opacity: number;
    visibility: number;
    matrix: Matrix;
    flags: NodeValuesFlags;
    constructor(nodeId: NodeId);
    updateMatrix(): void;
    private _updateMatrixWithOrigin;
    private _updateMatrix;
}
/**
 * A structure that holds interpolated animation data for a camera. See
 * [[BatchedValues]].
 */
export declare class BatchedCameraValues {
    /** The camera's position, applied with [[Camera.setPosition]]. */
    position: Point3 | null;
    /** The camera's target, applied with [[Camera.setTarget]]. */
    target: Point3 | null;
    /** The camera's up vector, applied with [[Camera.setUp]]. */
    up: Point3 | null;
    /** The camera's field width, applied with [[Camera.setWidth]]. */
    width: number | null;
    /** The camera's field height, applied with [[Camera.setHeight]]. */
    height: number | null;
    /** Reset this object to its initial state. */
    clear(): void;
    /**
     * Set the stored values on the supplied [[Camera]].
     * @returns True if the camera was modified.
     */
    apply(camera: Camera): boolean;
}
/**
 * A structure that holds interpolated animation data for one or more nodes.
 * See [[BatchedValues]].
 */
export declare class BatchedNodeValues {
    /** Opacity values to be applied with [[Model.setNodesOpacities]]. */
    readonly opacities: Map<number, number>;
    /** Color values to be applied with [[Model.setNodesColors]]. */
    readonly colors: Map<number, Color>;
    /** [[NodeId]] values corresponding to the matrix values in [[matrices]]. */
    matrixNodeIds: NodeId[];
    /** Matrices to be set on the nodes specified in [[matrixNodeIds]]. */
    matrices: Matrix[];
    /** Nodes to be made visible. */
    visibilityOn: NodeId[];
    /** Nodes to be made invisible. */
    visibilityOff: NodeId[];
    /** Reset this object to its initial state. */
    clear(): void;
    /** Set the stored values on the supplied [[WebViewer]]. */
    apply(viewer: IWebViewer): void;
}
/**
 * A structure that holds all interpolated data to be applied to the viewer
 * for one tick of the [[Animation.Manager]]. See [[Player.evaluate]].
 */
export declare class BatchedValues {
    /** Properties to be set on nodes. */
    node: BatchedNodeValues;
    /** Properties to be set on the camera. */
    camera: BatchedCameraValues;
    /** Reset this object to its initial state. */
    clear(): void;
    /** Set the stored values on the supplied [[WebViewer]]. */
    apply(viewer: IWebViewer): void;
}
