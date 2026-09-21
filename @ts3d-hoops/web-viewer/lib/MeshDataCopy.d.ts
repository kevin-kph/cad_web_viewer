/**
 * The data for a single vertex in a [[MeshDataCopy]], returned by a [[MeshDataCopyIterator]].
 */
export interface MeshDataCopyVertex {
    /**
     * The vertex's 3-dimensional position.
     */
    position: number[];
    /**
     * The vertex's 3-dimensional normal, if available.
     */
    normal?: number[];
    /**
     * The vertex's 2-dimensional texture coordinates, if available.
     */
    UV?: number[];
    /**
     * The color of the vertex in RGBA format, if available. Possible values are integers 0-255.
     */
    RGBA?: number[];
}
/**
 * An iterator over the vertices of a [[MeshDataCopyElement]] or [[MeshDataCopyElementGroup]].
 */
export interface MeshDataCopyIterator {
    /**
     * @returns `false` if a call to [[next]] will return a vertex, or `true` if a call to [[next]] will return `undefined`.
     */
    done(): boolean;
    /**
     * @returns The next vertex in the element or element group, or `undefined` if iteration has completed.
     */
    next(): MeshDataCopyVertex;
    /**
     * Continue iteration from a particular index.
     * @param index the index from which to iterate
     */
    goTo(index: number): void;
}
/**
 * Provides access to mesh data of a single face, line, or point element in a [[MeshDataCopyElementGroup]].
 *
 * This object additionally supports the ECMAScript 2015 **iterable** protocol and therefore can be iterated over using a `for..of` loop.
 */
export interface MeshDataCopyElement {
    /**
     * The number of vertices in this element.
     */
    vertexCount: number;
    /**
     * The selection filter bits supplied for this element.
     */
    bits: number;
    /**
     * @returns An iterator over the vertices in this element.
     */
    iterate(): MeshDataCopyIterator;
}
/**
 * Provides access to all data of a particular type (faces, lines or points) within a [[MeshDataCopy]].
 *
 * This object additionally supports the ECMAScript 2015 **iterable** protocol and therefore can be iterated over using a `for..of` loop.
 */
export interface MeshDataCopyElementGroup {
    /**
     * The total number of vertices in all elements in this group.
     */
    vertexCount: number;
    /**
     * Whether the vertices in this element group have normals.
     */
    hasNormals: boolean;
    /**
     * Whether the vertices in this element group have texture coordinates.
     */
    hasUVs: boolean;
    /**
     * Whether the vertices in this element group have colors.
     */
    hasRGBAs: boolean;
    /**
     * The number of elements in this group.
     */
    elementCount: number;
    /**
     * @returns An iterator over all the vertices in all the elements in this group.
     */
    iterate(): MeshDataCopyIterator;
    /**
     * Provides access to mesh data of a single element. Throws `RangeError` if `index` is invalid.
     * @param index the element's index
     */
    element(index: number): MeshDataCopyElement;
}
/**
 * A self-contained copy of the data of a single mesh. The data is part of this object and is not managed by Communicator.
 */
export interface MeshDataCopy {
    /**
     * Provides access to the mesh's face data.
     */
    faces: MeshDataCopyElementGroup;
    /**
     * Provides access to the mesh's line data. Line data is represented as a list of individual line segments and not polylines.
     */
    lines: MeshDataCopyElementGroup;
    /**
     * Provides access to the mesh's point data.
     */
    points: MeshDataCopyElementGroup;
    /**
     * Whether or not the mesh data is two-sided. Backface culling is disabled for two-sided meshes.
     */
    isTwoSided: boolean;
    /**
     * Whether or not the mesh data is manifold. Cutting section caps are generated only for manifold objects.
     */
    isManifold: boolean;
    /**
     * The order in which the vertices of each face are specified. This determines which side of the face is the front.
     * May be `undefined`.
     */
    winding?: 'clockwise' | 'counterClockwise';
}
