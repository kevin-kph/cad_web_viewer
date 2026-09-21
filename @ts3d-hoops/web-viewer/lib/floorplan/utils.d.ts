import { Box, Matrix, Point3 } from '@ts3d-hoops/common';
/**
 * Multiplies all given matrices in order.
 */
export declare function multiplyMatrices(matrices: Matrix[]): Matrix;
/** Clamps a number to lie within the given min/max values */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Determine if the point lies within the bounding box
 */
export declare function isPointInBox(point: Point3, box: Box): boolean;
/**
 * Determine if the point lies within the z-bounds of the box
 */
export declare function isPointInBoxOnlyZ(point: Point3, box: Box): boolean;
