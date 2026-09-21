import { Point3 } from '@ts3d-hoops/common';
import { MeshData } from '../MeshData';
/**
 * Creates a basic sphere with normals.
 */
export declare function generateSphereMeshData(): MeshData;
/**
 * Creates a cylinder with an attached cone.  An example of the resulting geometry can be observed in the default Axis Triad or Handles implementation.
 * @param cylinderRadius the radius of the cylinder portion of the geometry.
 * @param numSegments the number of segments used to create the cylinder and cone portions.  Increasing this number will result in a smoother appearance but consume more memory.
 * @param stemHeight the height of the cone portion.
 * @param coneBaseRadius the radius of the cone portion
 * @param capHeight the height of the cylinder cap
 * @param taperHeight the height of the taper.
 */
export declare function generateConeCylinderMeshData(cylinderRadius: number, numSegments: number, stemHeight: number, coneBaseRadius: number, capHeight: number, taperHeight: number): MeshData;
/**
 * Creates a cylinder that is deformed by an arc.  An example of the resulting geometry can be observed in the Handles implementation.
 * @param arc an array of numbers describing points on an arc that will be used to deform the cylinder
 * @param axisDirection cylinder axis.
 * @param numSegments the number of segments to use when constructing the cylinder.  A higher number will give a smoother appearance but consume more memory.
 * @param scale a scaling factor to apply to the geometry.
 */
export declare function createCylinderMeshDataFromArc(arc: number[], axisDirection: Point3, numSegments: number, scale: number): MeshData;
