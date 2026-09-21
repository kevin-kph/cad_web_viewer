import { Matrix, Color } from '@ts3d-hoops/common';
import { MeshId, OverlayId } from '@ts3d-hoops/streamcache';
import { OverlayIndex, FaceWinding, MeshInstanceCreationFlags } from './types';
/**
 * Object which represents geometry data which will be inserted into the scene at run time.
 * For performance reasons, it is not recommended to create meshes with large amounts of data on the client side as certain optimizations are not available to geometry inserted this way.
 *
 * More information can be found [here](https://docs.techsoft3d.com/hoops/visualize-web/prog_guide/viewing/geometry/meshes.html).
 */
export declare class MeshData {
    private readonly _faceMeshData;
    private readonly _pointMeshData;
    private readonly _polylineMeshData;
    private _faceWinding;
    private _backfacesEnabled;
    private _isManifold;
    /**
     * Adds face data to the mesh. Note that the arrays passed into this function are not copied and should remain unchanged until the mesh has been created.
     * When adding vertex data into the mesh using this method, it is important to note that the data is interpreted as triangles in which each vertex must be explicitly enumerated.
     * @param vertexData floating point data describing the points in space for the faces to be added to the mesh
     * @param normalData normals for the corresponding vertex data points.
     * @param rgba32data colors for the corresponding vertex data points (four bytes per rbga).
     * @param uvs texture parameters for the corresponding vertex data points.
     * @param bits bitmask associated with the face.
     */
    addFaces(vertexData: Float32Array | number[], normalData?: Float32Array | number[], rgba32data?: Uint8Array | number[], uvs?: Float32Array | number[], bits?: number): void;
    /**
     * Adds point data to the mesh. Note that the arrays passed into this function are not copied and should remain unchanged until the mesh has been created.
     * @param pointData floating point data describing the points to be added to the mesh
     * @param rgba32data colors for the corresponding vertex data points (four bytes per rbga).
     * @param bits bitmask associated with the point.
     */
    addPoints(pointData: Float32Array | number[], rgba32data?: Uint8Array | number[], bits?: number): void;
    /**
     * Adds polyline data to the mesh.Note that the arrays passed into this function are not copied and should remain unchanged until the mesh has been created.
     * @param polylineData floating point data describing the polyline to be added to the mesh
     * @param rgba32data colors for the corresponding vertex data points (four bytes per rbga).
     * @param bits bitmask associated with the line.
     */
    addPolyline(polylineData: Float32Array | number[], rgba32data?: Uint8Array | number[], bits?: number): void;
    /**
     * Removes all data from the object.
     */
    clear(): void;
    /**
     * Sets the face winding to be used for this mesh. The default value is CounterClockwise.
     * @param faceWinding the face winding to use for mesh geometry.
     */
    setFaceWinding(faceWinding: FaceWinding): void;
    /**
     * Gets the face winding used for this mesh.
     */
    getFaceWinding(): FaceWinding;
    /**
     * Sets whether backfaces should be enabled for this geometry. The default value is false.
     * Setting this to true for geometry with a large amount of faces may affect performance.
     * @param backfacesEnabled indicated whether backfaces should be enabled for this geometry.
     */
    setBackfacesEnabled(backfacesEnabled: boolean): void;
    /**
     * Gets whether backfaces are enabled for this geometry
     * @returns value indicting whether backfaces are enabled for this geometry.
     */
    getBackfacesEnabled(): boolean;
    /**
     * Sets whether the mesh is a manifold one or not (if the mesh is not set as manifold, then capping won't happen while cutting).
     * @param isManifold indicated whether or not it's a manifold mesh.
     */
    setManifold(isManifold: boolean): void;
    /**
     * Gets if the mesh is set as manifold.
     * @returns value indicating whether or not it's a manifold mesh.
     */
    isManifold(): boolean;
    /** @hidden */
    _getFaceData(): FaceMeshData[];
    /** @hidden */
    _getPointData(): PointMeshData[];
    /** @hidden */
    _getPolylineData(): PolylineMeshData[];
}
/**
 * Object representing a Mesh instance that will be created by the client at run time.
 * This class allows for the specification of instance specific properties of a mesh.
 */
export declare class MeshInstanceData {
    private _meshId;
    private _matrix;
    private _faceColor;
    private _lineColor;
    private _pointColor;
    private _instanceName;
    private _faceOpacity;
    private _lineOpacity;
    private _pointOpacity;
    private _creationFlags;
    /**
     * The overlay for this instance.
     */
    overlayId: OverlayId;
    /**
     * Creates a new MeshInstanceData object.
     * @param meshId the [[MeshId]] of the mesh to instantiate
     * @param matrix a matrix that will be applied to this instance
     * @param instanceName a name that will be visible when querying the model hierarchy
     * @param faceColor the color for faces of this instance
     * @param lineColor the color for lines of this instance
     * @param pointColor the color for points of this instance
     * @param creationFlags additional options that can be used to alter the behavior of this instance
     */
    constructor(meshId?: MeshId | null, matrix?: Matrix | null, instanceName?: string | null, faceColor?: Color | null, lineColor?: Color | null, pointColor?: Color | null, creationFlags?: MeshInstanceCreationFlags | null);
    /**
     * Creates a copy of this MeshInstanceData.
     * @returns Copy of this MeshInstanceData object.
     */
    copy(): MeshInstanceData;
    /**
     * Resets all fields of this object.
     */
    clear(): void;
    /**
     * Gets the [[MeshId]] of the mesh to use for this instance.
     * [[MeshId]]s are created with [[Model.createMesh]] or retrieved with [[Model.getMeshIds]].
     * @returns the mesh ID to use for this instance.
     */
    getMeshId(): MeshId | null;
    /**
     * Sets the [[MeshId]] of the mesh to use for the instance.
     * [[MeshId]]s are created with [[Model.createMesh]] or retrieved with [[Model.getMeshIds]].
     * @param meshId the [[MeshId]] to use.
     */
    setMeshId(meshId: MeshId): void;
    /**
     * Gets the matrix to apply to this instance.
     * @returns the current matrix that will be applied to this instance upon creation.
     */
    getMatrix(): Matrix | null;
    /**
     * Gets the mesh instance creation flags (SuppressCameraScale, DoNotExplode, DoNotLight...)
     * @returns the mesh instance creation flags (null if none set)
     */
    getCreationFlags(): MeshInstanceCreationFlags;
    /**
     * Sets the mesh instance creation flags (SuppressCameraScale, DoNotExplode, DoNotLight...)
     * @param flags creation flags
     */
    setCreationFlags(flags: MeshInstanceCreationFlags): void;
    /**
     * Sets the matrix that will be applied to this instance.
     * @param matrix the matrix to apply.
     */
    setMatrix(matrix: Matrix): void;
    /**
     * Gets the name that will be applied to the instance.
     * @returns the instance name.
     */
    getInstanceName(): string | null;
    /**
     * Sets the name that will be assigned to this instance. This name will be visible when querying the model hierarchy.
     * @param instanceName the name to assign to this instance.
     */
    setInstanceName(instanceName: string): void;
    /**
     * Sets the color for face elements in this instance.
     * @param faceColor the color to apply to face elements.
     */
    setFaceColor(faceColor: Color): void;
    /**
     * Gets the color for face elements in this instance.
     * @returns the color for face elements.
     */
    getFaceColor(): Color | null;
    /**
     * Sets the color for line elements in this instance.
     * @param lineColor the color to apply to line elements.
     */
    setLineColor(lineColor: Color): void;
    /**
     * Gets the color for line elements in this instance.
     * @returns the color for line elements.
     */
    getLineColor(): Color | null;
    /**
     * Sets the color for point elements in this instance.
     * @param pointColor the color to apply to point elements.
     */
    setPointColor(pointColor: Color): void;
    /**
     * Gets the color for point elements in this instance.
     * @returns the color for point elements.
     */
    getPointColor(): Color | null;
    /**
     * Sets the point opacity for this instance.
     * @param pointOpacity opacity value to set.
     */
    setPointOpacity(pointOpacity: number): void;
    /**
     * Gets the point opacity value for this instance.
     * @returns the point opacity value for this instance.
     */
    getPointOpacity(): number;
    /**
     * Sets the line opacity for this instance.
     * @param lineOpacity opacity value to set.
     */
    setLineOpacity(lineOpacity: number): void;
    /**
     * Gets the line opacity value for this instance.
     * @returns the line opacity value for this instance.
     */
    getLineOpacity(): number;
    /**
     * Sets the face opacity for this instance.
     * @param faceOpacity opacity value to set.
     */
    setOpacity(faceOpacity: number): void;
    /**
     * Gets the face opacity value for this instance.
     * @returns the face opacity value for this instance.
     */
    getOpacity(): number;
    /**
     * Sets the overlay index for this instance but doesn't change the associated view.
     * @param overlayIndex overlay index to set.
     * @deprecated use [[overlayId]] instead.
     */
    setOverlayIndex(overlayIndex: OverlayIndex): void;
    /**
     * Gets the overlay index for this instance.
     * @returns the overlay index for this instance, but not the associated view.
     * @deprecated use [[overlayId]] instead.
     */
    getOverlayIndex(): OverlayIndex;
}
export declare class FaceMeshData {
    vertexData: Float32Array | number[];
    normalData?: Float32Array | number[];
    rgba32data?: Uint8Array | number[];
    uvData?: Float32Array | number[];
    bits: number;
    constructor(vertexData: Float32Array | number[], normalData?: Float32Array | number[], rgba32data?: Uint8Array | number[], uvData?: Float32Array | number[], bits?: number);
}
export declare class PolylineMeshData {
    vertexData: Float32Array | number[];
    rgba32data?: Uint8Array | number[];
    bits: number;
    constructor(vertexData: Float32Array | number[], rgba32data?: Uint8Array | number[], bits?: number);
}
export declare class PointMeshData {
    vertexData: Float32Array | number[];
    rgba32data?: Uint8Array | number[];
    bits: number;
    constructor(vertexData: Float32Array | number[], rgba32data?: Uint8Array | number[], bits?: number);
}
