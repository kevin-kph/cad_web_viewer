import { Box } from '../Box';
import { UnitElement } from '../types';
import { Matrix } from './Matrix';
import { Plane } from './Plane';
import { Point2 } from './Point2';
import { Point3 } from './Point3';
import { IPoint3 } from './types';
/**
 * Returns the cross product of a vector against its least significant axis.
 * @param vector The input vector to cross.
 * @param out_crossVector The out parameter for the cross product.
 */
export declare function oneVectorCross(vector: Point3, out_crossVector?: Point3): Point3;
/**
 * Computes the intersection of a line segment and a plane.
 * @param lineBegin The start point of the line segment to intersect.
 * @param lineEnd The end point of the line segment to intersect.
 * @param plane The plane to intersect.
 * @param out_intersectionPoint The out parameter for the point of intersection if one exists.
 * @returns True if the line segment and plane intersect. False otherwise.
 */
export declare function intersectionPlaneLine2(lineBegin: Point3, lineEnd: Point3, plane: Plane, out_intersectionPoint: Point3): boolean;
/**
 * Computes the shortest distance between a point and a line segment.
 * @param point The point to compute against.
 * @param lineBegin The start point of the line segment to compute against.
 * @param lineEnd The end point of the line segment to compute against.
 * @param out_closestPointOnLine The out parameter for a closest point on the line segment to the point.
 * @returns The distance from the point and the closest point on the line.
 */
export declare function computePointToLineDistance(point: Point3, lineBegin: Point3, lineEnd: Point3, out_closestPointOnLine: Point3): number;
/**
 * Returns the formatted string of a value and its units.
 * Unit scaling is based on `unit === 1` being for millimeters.
 * @param value The value to format (without units).
 * @param unit The unit scale to be applied to `value`.
 */
export declare function formatWithUnit(value: number, unit: number): string;
/**
 * Converts degrees to radians.
 * @param degrees The degrees to convert.
 * @returns The converted radians.
 */
export declare function degreesToRadians(degrees: number): number;
/**
 * Converts radians to degrees.
 * @param radians The radians to convert.
 * @returns The converted degrees.
 */
export declare function radiansToDegrees(radians: number): number;
/**
 * Computes the rotation matrix defined by rotating around a vector.
 * @param axisVector The vector to rotate around.
 * @param degrees The amount to rotate.
 * @param out_rotationMatrix The out parameter for the rotation matrix.
 * @returns The out parameter rotation matrix.
 */
export declare function computeOffaxisRotation(axisVector: Point3, degrees: number, out_rotationMatrix?: Matrix): Matrix;
/**
 * Computes the intersection of two planes.
 * @param plane1 The first plane.
 * @param pointOnPlane1 A point on the first plane.
 * @param plane2 The second plane.
 * @param pointOnPlane2 A point on the second plane.
 * @param out_lineBegin Out parameter for resulting intersection line (if any).
 * @param out_lineEnd Out parameter for resulting intersection line (if any).
 * @returns `0` if the planes are disjoint. `1` if the planes coincide. `2` if the planes intersect in a line.
 */
export declare function intersect3d2Planes(plane1: Plane, pointOnPlane1: Point3, plane2: Plane, pointOnPlane2: Point3, out_lineBegin: Point3, out_lineEnd: Point3): 0 | 1 | 2;
/**
 * Computes the intersection of a line segment and a plane.
 *
 * @param lineBegin The start point of the line segment to intersect.
 * @param lineEnd The end point of the line segment to intersect.
 * @param planePoint1 A point on the plane to intersect.
 * @param planePoint2 A point on the plane to intersect.
 * @param planePoint3 A point on the plane to intersect.
 * @param out_intersectionPoint The out parameter for the point of intersection if one exists.
 * @returns True if the line segment and plane intersect. False otherwise.
 *
 * See also: [[intersectionPlaneLine2]].
 */
export declare function intersectionPlaneLine(lineBegin: Point3, lineEnd: Point3, planePoint1: Point3, planePoint2: Point3, planePoint3: Point3, out_intersectionPoint: Point3): boolean;
/**
 * Computes the smallest angle between two vectors in degrees.
 * @param vector1 The first vector.
 * @param vector2 The second vector.
 * @returns The angle between vectors in degrees.
 */
export declare function computeAngleBetweenVector(vector1: Point3, vector2: Point3): number;
/**
 * Generates tessellated points suitable for mesh creation for a given circle.
 * @param out_points The out parameter for the generated points.
 * @param center The center of the circle.
 * @param radius The radius of the circle.
 * @param numPoints The number of points to use for the tesesselated circle.
 * @param axisVector The axis to orient the circle against.
 */
export declare function generatePointsOnCircle(out_points: Point3[], center: Point3, radius: number, numPoints: number, axisVector: Point3): void;
/**
 * Returns the distance between two line segments.
 * @param line1Begin The start of the first line segment.
 * @param line1End The end of the first line segment.
 * @param line2Begin The start of the second line segment.
 * @param line2End The end of the second line segment.
 * @param out_closestPointLine1 Out parameter for the closest point of line1 to line2.
 * @param out_closestPointLine2 Out parameter for the closest point of line2 to line1.
 * @returns The distance between the two input line segments.
 */
export declare function distanceLineLine(line1Begin: Point3, line1End: Point3, line2Begin: Point3, line2End: Point3, out_closestPointLine1: Point3, out_closestPointLine2: Point3): number;
/**
 * Finds the closest point on the first line to the second line in 3D space.
 *
 * This function computes the point on line p1-p2 that is closest to line p3-p4.
 * For intersecting lines, this returns the intersection point. For skew lines
 * (non-intersecting, non-parallel lines in 3D), it returns the point on the first
 * line that minimizes the distance to the second line.
 *
 * @param p1 - First point defining the first line
 * @param p2 - Second point defining the first line
 * @param p3 - First point defining the second line
 * @param p4 - Second point defining the second line
 * @returns The closest point on line p1-p2 to line p3-p4, or null if either line is degenerate or lines are parallel
 *
 * @example
 * ```typescript
 * // Intersecting lines
 * const p1 = new Point3(0, 0, 0);
 * const p2 = new Point3(1, 0, 0);
 * const p3 = new Point3(0.5, -1, 0);
 * const p4 = new Point3(0.5, 1, 0);
 * const intersection = lineLineIntersect(p1, p2, p3, p4);
 * // Returns: Point3(0.5, 0, 0) - the intersection point
 * ```
 *
 * @example
 * ```typescript
 * // Skew lines (non-intersecting in 3D)
 * const p1 = new Point3(0, 0, 0);
 * const p2 = new Point3(1, 0, 0);
 * const p3 = new Point3(0, 1, 1);
 * const p4 = new Point3(1, 1, 1);
 * const closest = lineLineIntersect(p1, p2, p3, p4);
 * // Returns: Point3 representing the closest point on line p1-p2 to line p3-p4
 * ```
 *
 * @example
 * ```typescript
 * // Parallel lines
 * const p1 = new Point3(0, 0, 0);
 * const p2 = new Point3(1, 0, 0);
 * const p3 = new Point3(0, 1, 0);
 * const p4 = new Point3(1, 1, 0);
 * const result = lineLineIntersect(p1, p2, p3, p4);
 * // Returns: null (parallel lines have no unique closest point)
 * ```
 *
 * @remarks
 * - Algorithm based on Paul Bourke's line-line intersection method
 * - Uses a small epsilon (1e-12) for numerical stability
 * - Returns null for degenerate cases:
 *   - Either line has zero length (p1 == p2 or p3 == p4)
 *   - Lines are parallel (cross product of direction vectors is zero)
 * - For non-parallel lines, always returns a valid Point3
 * - The returned point always lies on the infinite extension of line p1-p2
 * - For truly intersecting lines, the distance between the returned point and line p3-p4 will be approximately zero
 * - For skew lines, the returned point minimizes the 3D distance to line p3-p4
 *
 * @see {@link http://paulbourke.net/geometry/pointlineplane/lineline.c} - Original algorithm reference
 * @see {@link distanceLineLine} - For computing distance between line segments with clamping
 */
export declare function lineLineIntersect(p1: Point3, p2: Point3, p3: Point3, p4: Point3): Point3 | null;
/**
 * Finds the scalar for the closest point on line segment p0-p1 to the given point. The returned scalar
 * will always be in the range [0, 1], where 0 indicates p0 is closest, and 1 indicates p1 is closest.
 *
 * @param p0 First point of the line segment
 * @param p1 Second point of the line segment
 * @param point Point at which to find closest line segment scalar
 */
export declare function closestPointScalarFromPointToSegment(p0: Point3, p1: Point3, point: Point3): number;
/**
 * Finds the closest point on line segment p0-p1 to the given point. The closest point will always lie
 * on or between the line segment endpoints.
 *
 * @param p0 First point of the line segment
 * @param p1 Second point of the line segment
 * @param point Point at which to find closest line segment point.
 */
export declare function closestPointFromPointToSegment(p0: Point3, p1: Point3, point: Point3): Point3;
/**
 * Determine if the point is both on the line formed by p0-p1, and within the p0-p1 line-segment endpoints
 *
 * @param p0 First point of the line segment
 * @param p1 Second point of the line segment
 * @param point Point that possibly lies on the line segment.
 * @param epsilon Epsilon value used with point-on-line distance calculation.
 */
export declare function isPointOnLineSegment(p0: Point3, p1: Point3, point: Point3, epsilon: number): boolean;
/**
 * Returns whether the 2-dimensional point `point` lies on the line segment `p1p2`.
 *
 * @param point The point to test
 * @param p1 The first endpoint of the line segment
 * @param p2 The second endpoint of the line segment
 * @param tolerance If the perpendicular distance of `point` from the line
 * segment is less than or equal to `tolerance`, the function will return `true`.
 */
export declare function isPointOnLineSegment2d(point: Point2, p1: Point2, p2: Point2, tolerance: number): boolean;
/**
 * Returns whether the 2-dimensional point `point` lies within the given rectangle.
 *
 * @param point The point to test
 * @param rectPos The lower-left corner of the rectangle
 * @param rectSize The width and height of the rectangle
 * @param tolerance The maximum distance along the x- or y-axis that `point` is
 * allowed to be outside the rectangle
 */
export declare function isPointInRect2d(point: Point2, rectPos: Point2, rectSize: Point2, tolerance?: number): boolean;
/**
 * Returns an array of evenly-distributed points that lie on an arc.
 *
 * @param axis The normal of the plane containing the arc (in other words, the axis of rotation).
 * @param angle The angle swept by the arc (may be negative).
 * @param center The center point of the arc.
 * @param startOffset The starting point of the arc, expressed as an offset relative to the center.
 * @param segmentCount The number of line segments to be generated.
 * @returns An array containing `segmentCount + 1` points.
 */
export declare function generateArcPoints(axis: Point3, angle: number, center: Point3, startOffset: Point3, segmentCount: number): Point3[];
/**
 * Generates a human-readable unit string from an array of unit elements.
 *
 * This function takes an array of unit elements and converts them into a standardized
 * unit string representation. Units are sorted by exponent (highest first) and formatted
 * with appropriate symbols and exponent notations.
 *
 * @param unit - An array of UnitElement objects containing basicUnit, exponent, and factor properties
 * @returns A formatted string representing the combined units with proper symbols and exponents
 *
 * @example
 * ```typescript
 * const units = [
 *   { basicUnit: BasicUnit.unitLength, exponent: 2, factor: 1 },
 *   { basicUnit: BasicUnit.unitMass, exponent: 1, factor: 1 },
 *   { basicUnit: BasicUnit.unitTime, exponent: -2, factor: 1 }
 * ];
 * const result = getLongUnitString(units);
 * // Returns: "kg.m².s⁻²" (representing kg⋅m²⋅s⁻² for energy units)
 * ```
 *
 * @example
 * ```typescript
 * const velocityUnits = [
 *   { basicUnit: BasicUnit.unitLength, exponent: 1, factor: 1 },
 *   { basicUnit: BasicUnit.unitTime, exponent: -1, factor: 1 }
 * ];
 * const result = getLongUnitString(velocityUnits);
 * // Returns: "m.s⁻¹" (representing m/s for velocity)
 * ```
 *
 * @remarks
 * - Units are automatically sorted by exponent in descending order (positive exponents first)
 * - Special handling for factor values enables unit prefixes (milli-, centi-, kilo-, etc.)
 * - Exponents are represented using Unicode subscript characters (², ³, ⁻¹, ⁻², ⁻³)
 * - Units with exponent 1 have no subscript notation
 * - Units with exponent 0 are included but display no exponent
 * - Multiple units are separated by dots (.)
 * - Supports all SI base units and derived units including:
 *   - Length (m), Mass (kg), Time (s), Electric Current (A)
 *   - Temperature (K), Substance Amount (mol), Luminous Intensity (cd)
 *   - Derived units like Force (N), Energy (J), Power (W), etc.
 */
export declare function getLongUnitString(unit: UnitElement[]): string;
/**
 * Computes an orthogonal vector to the given 3D vector.
 *
 * @param v - The input vector for which to find an orthogonal vector.
 * @returns An orthogonal vector to the input vector.
 * @throws Will throw an error if the input vector is a zero vector.
 *
 * @example
 * ```typescript
 * const v = { x: 1, y: 0, z: 0 };
 * const orthogonal = getOrthogonalVector(v);
 * console.log(orthogonal); // { x: 0, y: 1, z: 0 }
 * ```
 */
export declare function getOrthogonalVector(v: IPoint3): IPoint3;
/**
 * Generates a 3D orthonormal basis from a given normal vector.
 *
 * This function takes a normal vector, normalizes it, and then computes an orthogonal vector to it.
 * Finally, it returns an array containing the normalized normal vector, the orthogonal vector, and
 * their cross product, which forms an orthonormal basis.
 *
 * @param normal - The input normal vector from which to generate the 3D basis.
 * @returns An array of three IPoint3 vectors representing the orthonormal basis.
 */
export declare function get3dBaseFromVector(normal: IPoint3): IPoint3[];
/**
 * Sorts an array of vertices in counter-clockwise order around their centroid.
 *
 * @param vertices - An array of vertices to be sorted.
 * @param base - A base array used to determine the sorting order.
 * @returns A new array of vertices sorted in counter-clockwise order.
 */
export declare function sortVerticesCounterClockwise(vertices: IPoint3[], base: IPoint3[]): IPoint3[];
/**
 * generates reference geometry for a cutting plane.
 * @param axis axis for reference geometry.
 * @param modelBounding modelBounding for geometry size.
 */
export declare function createReferenceGeometryFromAxis(axis: 'x' | 'y' | 'z', modelBounding: Box): Point3[];
/**
 * Uses a selection normal and position to create reference geometry for a cutting plane.
 * @param normal face normal.
 * @param position face position.
 * @param modelBounding model bounding for geometry size.
 */
export declare function createReferenceGeometryFromFaceNormal(normal: Point3, position: Point3, modelBounding: Box): Point3[];
