import { Point2, Point3, Matrix } from '@ts3d-hoops/common';
import { Projection } from './types';
import { CameraFlags } from './internal/types';
import { IView } from './core/IView';
import { IWebViewer } from './core/IWebViewer';
/**
 * Object representing a viewpoint from which the scene can be rendered. More information about using Camera can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/scene_attributes/camera.html).
 */
export declare class Camera {
    private readonly _position;
    private readonly _target;
    private readonly _up;
    private _width;
    private _height;
    private _projection;
    private _nearLimit;
    private _cameraFlags;
    /** @hidden */
    _clearFlags(): void;
    /** @hidden */
    _getFlags(): CameraFlags;
    /**
     * Creates a copy of the camera.
     * @returns new object initialized with the current values of this camera
     */
    copy(): Camera;
    /**
     * Sets the camera position
     * @param position the new camera position
     */
    setPosition(position: Point3): void;
    /**
     * gets the camera position
     * @returns the camera position
     */
    getPosition(): Point3;
    /**
     * Sets the camera target
     * @param target the new camera target
     */
    setTarget(target: Point3): void;
    /**
     * gets the camera target
     * @returns the camera target
     */
    getTarget(): Point3;
    /**
     * Sets the camera up vector
     * @param up the new camera up vector
     */
    setUp(up: Point3): void;
    /**
     * gets the camera up vector
     * @returns the camera up vector
     */
    getUp(): Point3;
    /**
     * Sets the camera width
     * @param width the new camera width
     */
    setWidth(width: number): void;
    /**
     * gets the camera width
     * @returns the camera width
     */
    getWidth(): number;
    /**
     * Sets the camera height
     * @param height the new camera height
     */
    setHeight(height: number): void;
    /**
     * gets the camera height
     * @returns the camera width
     */
    getHeight(): number;
    /**
     * Sets the camera projection
     * @param projection the new camera Projection
     */
    setProjection(projection: Projection): void;
    /**
     * gets the camera projection
     * @returns the camera projection
     */
    getProjection(): Projection;
    /**
     * Sets the camera near clipping limit
     * @param nearLimit the new camera near clipping limit
     */
    setNearLimit(nearLimit: number): void;
    /**
     * gets the camera near clipping limit
     * @returns the camera near clipping limit
     */
    getNearLimit(): number;
    /**
     * Returns checks for equality with another camera
     * @param cam the camera to compare against
     */
    equals(cam: Camera): boolean;
    /**
     * Returns checks for equality with another camera with tolerance
     * @param cam the camera to compare against
     * @param tolerance floating point tolerance
     */
    equalsWithTolerance(cam: Camera, tolerance: number): boolean;
    /**
     * Move the camera along a delta
     * @param delta
     */
    dolly(delta: Point3): void;
    /**
     * Finds the intersection point with the camera plane
     * @param point
     * @param view
     */
    getCameraPlaneIntersectionPoint(point: Point2, view: IView): Point3 | null;
    /**
     * Returns the camera's view matrix. This matrix places the camera at
     * `<0,0,0>`, with the negative z-axis pointing toward the camera's
     * target and the y-axis in the direction of the camera's up-vector.
     * @param viewer The [[WebViewer]] for which the matrix should be valid.
     */
    getViewMatrix(viewer: IWebViewer): Matrix;
    /**
     * Returns the camera's projection matrix.
     * @param viewer The [[WebViewer]] for which the matrix should be valid.
     * @param view the [[View]] to use when calculating projection effects. Uses default view if undefined
     */
    getProjectionMatrix(viewer: IWebViewer, view?: IView): Matrix;
    /**
     * Returns the camera's projection matrix multiplied by its view matrix.
     * @param viewer The [[WebViewer]] for which the matrix should be valid.
     * @param view the [[View]] to use when calculating projection effects. Uses default view if undefined
     */
    getFullMatrix(viewer: IWebViewer, view?: IView): Matrix;
    /**
     * Creates a new camera object with the given parameters.
     * @param pos the camera position.
     * @param tar the camera target.
     * @param up the camera up vector.
     * @param projection the camera projection mode.
     * @param width camera view width.
     * @param height camera view height.
     * @param nearLimit the camera near limit.
     * @returns a new camera object.
     */
    static create(pos: Point3, tar: Point3, up: Point3, projection: Projection, width: number, height: number, nearLimit?: number): Camera;
    /**
     * Creates an object ready for JSON serialization.
     * @returns The prepared object.
     */
    toJson(): object;
    private _toJson;
    /**
     * Creates a new [[Camera]] from an object given by [[toJson]].
     * @param objData An object given by [[toJson]].
     * @returns The prepared object.
     */
    static fromJson(objData: any): Camera;
    transform(matrix: Matrix): Camera;
}
