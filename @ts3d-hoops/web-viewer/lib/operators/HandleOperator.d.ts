import { Matrix, Point3, Color, IPoint3 } from '@ts3d-hoops/common';
import { MeshData } from '../MeshData';
import { MouseInputEvent } from '../event/MouseInputEvent';
import { Degrees, NodeId } from '../types';
import { OperatorBase } from './OperatorBase';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
export declare function computeRotationAngle({ position, rotationPlaneNormal, intersectionPoint1, intersectionPoint2, }: {
    position: IPoint3;
    rotationPlaneNormal: IPoint3;
    intersectionPoint1: IPoint3 | null;
    intersectionPoint2: IPoint3 | null;
}): Degrees;
/**
 * Handles are added scene elements that can update the position of your parts through user interaction. Find more information [here](https://docs.techsoft3d.com/hoops/visualize-web/tutorials/additive-manufacturing/handles.html).
 */
export declare class HandleOperator extends OperatorBase {
    private _draggingHandle;
    private _newRotationMatrix;
    private _translation;
    private _newTranslation;
    private _nodeIdGroupMap;
    private _groupIdCount;
    private _activeChildrenGroupIds;
    private _initialLocalNodeMatrices;
    private _newLocalNodeMatrices;
    private _handleMarkup;
    private _trackedPoints;
    private _trackedPointsPositions;
    private _trackedPointCount;
    private _previousContextClick;
    private _overlayIndex;
    private _activeHandleNodeId;
    private _handleEventType;
    private _highlightedHandleId;
    private _handleSize;
    private _explodeActive;
    private _measureActive;
    private _settingMatrixInProgress;
    private _pickConfig;
    constructor(viewer: IWebViewer, view: IView);
    /**
     * Sets the mesh data for axis handles.
     * @param meshData
     */
    setAxisMeshData(meshData: MeshData): Promise<void>;
    /**
     * Sets the mesh data for plane handles.
     * @param meshData
     */
    setPlaneMeshData(meshData: MeshData): Promise<void>;
    /**
     * Sets the mesh data for view plane handles.
     * @param meshData
     */
    setViewPlaneMeshData(meshData: MeshData): Promise<void>;
    /**
     * Sets the mesh data for rotation handles.
     * @param meshData
     */
    setRotateMeshData(meshData: MeshData): Promise<void>;
    /**
     * Add a point to the tracked points list. When the handle moves, these points will update in world space.
     * @param point
     * @returns point index
     */
    addTrackedPoint(point: Point3): number;
    /**
     * Gets the tracked point list.
     */
    getTrackedPoints(): Point3[];
    /**
     * Clear the list of tracked points.
     */
    clearTrackedPoints(): void;
    /**
     * Returns a boolean value indicating if handles are available to be added to the scene
     * If there is an active explode, active measure, or the model is a 2d drawing.
     * this will be false.
     */
    isEnabled(): boolean;
    private _guardEnabled;
    /**
     * Takes a scale value to change the handle size with 1 representing the default size
     * @param size
     */
    setHandleSize(size: number): void;
    /**
     * Adds all handles into the scene, oriented along the primary axes
     * @param nodeIds corresponding to the parts that will move with the handles
     * @param position world space coordinates the the handle position
     */
    addHandles(nodeIds: NodeId[], position?: Point3 | null, groupId?: number | null): Promise<void>;
    /**
     * Returns the group id associated to the given group of node ids, returns null if does not exist
     * @param nodeIds
     */
    private _findGroupId;
    /**
     * This will generate a unique id to associate a group of handles with a group of NodeIds.
     */
    generateGroupId(): number;
    private _massageGroupId;
    /**
     * Adds a handle that moves along an axis.
     * @param position center of the handle.
     * @param axis axis to move along
     * @param color color of the handle geometry
     * @param positionNormal optional vector to control the orientation of the handle geometry.
     * @param groupId optional parameter to associate this handle with a group of NodeIds
     */
    addAxisTranslationHandle(position: Point3, axis: Point3, color: Color, positionNormal?: Point3 | null, groupId?: number | null): Promise<NodeId>;
    /**
     * Adds a handle that rotates around an axis
     * @param position center of the handle.
     * @param axis axis to rotate around
     * @param color color of the handle geometry
     * @param positionNormal optional vector to control the orientation of the handle geometry.
     * @param groupId optional parameter to associate this handle with a group of NodeIds
     */
    addAxisRotationHandle(position: Point3, axis: Point3, color: Color, positionNormal?: Point3 | null, groupId?: number | null): Promise<NodeId>;
    /**
     * Adds a handle that restricts movement to a plane.
     * @param position center of the handle.
     * @param normal normal of the plane
     * @param faceColor face color of the handle geometry
     * @param lineColor outline color of the handle geometry
     * @param positionNormal optional vector to control the orientation of the handle geometry.
     * @param groupId optional parameter to associate this handle with a group of NodeIds
     */
    addPlaneTranslationHandle(position: Point3, normal: Point3, faceColor: Color, lineColor: Color, positionNormal?: Point3 | null, groupId?: number | null): Promise<NodeId>;
    /**
     * Adds a handle that restricts movement to the viewplane.
     * @param position center of the handle
     * @param color geometry color
     * @param groupId optional parameter to associate this handle with a group of NodeIds
     */
    addViewPlaneTranslationHandle(position: Point3, color: Color, groupId?: number | null): Promise<NodeId>;
    /**
     * Sets the NodeIds that any handles in the scene will move.
     * @param nodeIds
     * @param groupId optional parameter that associates a group of NodeIds with a group of handles.
     */
    setNodeIds(nodeIds: NodeId[], groupId?: number | null): void;
    /**
     * Gets the NodeIds that the handles in the scene will move.
     * @param groupId optional parameter that specifies if the NodeIds to retrieve are part of a group.
     */
    getNodeIds(groupId?: number | null): NodeId[];
    /**
     * Shows any handles that have been added to the scene.
     */
    showHandles(): void;
    /**
     * Updates the current handle position.
     * @param translation additional translation
     * @param rotation additional rotation
     * @param finalizePosition keep translation and rotation. If true, added translation and rotation
     * will not reset the next time the position is updated.
     */
    updatePosition(translation: Point3, rotation: Matrix, finalizePosition: boolean, groupId?: number | null): Promise<void>;
    /**
     * @returns the current handle position or null if not currently active.
     */
    getPosition(): Point3 | null;
    /**
     * Removes all handles from the scene.
     */
    removeHandles(): Promise<void>;
    /**
     * @returns the total translation applied to the handles.
     */
    getTranslation(): Point3;
    private _initLocalNodeMatrices;
    private _getHandleEventType;
    private _rotate;
    private _translate;
    private _genericTransform;
    /** @hidden */
    _testRotate(rotationAxis: Point3, rotationAngle: Degrees, groupId?: number | null): Promise<void>;
    /** @hidden */
    _testTranslate(translation: Point3, groupId?: number | null): Promise<void>;
    private _getActiveNodeIdByGroupId;
    private _startDragging;
    private _stopDragging;
    /** @hidden */
    onMouseDown(event: MouseInputEvent): Promise<void>;
    private _onHandleDrag;
    /** @hidden */
    onMouseMove(event: MouseInputEvent): Promise<void>;
    /** @hidden */
    onMouseUp(event: MouseInputEvent): void;
    /** @hidden */
    setHandled(): boolean;
    private _getClosestPoint;
    private _getTranslationComponent;
    private _clearHighlightedHandle;
    private _highlightHandle;
    private _getPlaneIntersectionPoint;
    private _getRotationAngle;
    private _getRotationMatrix;
}
