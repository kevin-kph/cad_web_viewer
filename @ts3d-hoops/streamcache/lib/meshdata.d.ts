import { Vector3s, Uvs, Vector4s } from '@ts3d-hoops/common';
import { MeshDataCopy } from './MeshDataCopy';
import { MeshId, MeshIds } from './keys';
export interface MeshDataBuilderFaceOptions {
    normals?: Vector3s | Float32Array;
    uvs?: Uvs;
    rgba32s?: Vector4s | Uint8Array;
    bits?: number;
}
export interface MeshDataBuilderLineOptions {
    rgba32s?: Vector4s | Uint8Array;
    bits?: number;
}
export interface MeshDataBuilderPointOptions {
    rgba32s?: Vector4s | Uint8Array;
    bits?: number;
}
export interface MeshDataBuilder {
    addFace(vertexData: Vector3s | Float32Array, options?: MeshDataBuilderFaceOptions): void;
    addPolyline(polylineData: Vector3s | Float32Array, options?: MeshDataBuilderLineOptions): void;
    addPoints(pointData: Vector3s | Float32Array, options?: MeshDataBuilderPointOptions): void;
    formatBits: number;
}
export interface MeshDataInterface {
    create(meshDataBuilder: MeshDataBuilder): Promise<MeshId>;
    destroy(ids: MeshIds): Promise<void>;
    getData(id: MeshId): Promise<MeshDataCopy>;
    lineElementSegments(meshId: MeshId, lineElementIndex: number): Promise<Vector3s>;
    linesToIncidentFaces(lineElementIndices: number[], meshId: MeshId): Promise<number[]>;
    replace(id: MeshId, meshDataBuilder: MeshDataBuilder): Promise<void>;
}
