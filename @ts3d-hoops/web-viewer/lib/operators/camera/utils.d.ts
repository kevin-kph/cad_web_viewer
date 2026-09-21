import { Point3 } from '@ts3d-hoops/common';
import { PickConfig } from '../../PickConfig';
import { FaceSelectionItem } from '../../selection/types';
import { BimMask, WalkDirection } from '../../types';
import { IModel } from '../../core/IModel';
import { IView } from '../../core/IView';
/**
 * Normalizes a set of directions such that it does not contain
 * opposing directions. If opposing directions do exist, then they
 * cancel each other and are removed from the set.
 */
export declare function normalizeDirections(directions: Set<WalkDirection>): void;
/**
 * If the input set contains both `x` and `y`, then both `x` and `y` are removed from the set.
 * Otherwise this function does nothing.
 *
 * @param set The set to inspect and alter.
 * @param x The value that cancels with `y`.
 * @param y The value that cancels with `x`.
 */
export declare function removeOpposing<T>(set: Set<T>, x: T, y: T): void;
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Returns the vector pointing down in the scene.
 */
export declare function getDownAxis(model: IModel): Point3;
/**
 * @param bimMask Restricts the objects the selection ray can select to the BIM types present in the mask.
 * @param maxWorldDistance If non-null, this limits the distance the selection ray can travel to hit an object.
 * @returns A ray pick config object suitable for BIM collision tests.
 */
export declare function buildCollisionRayConfig(bimMask: BimMask, maxWorldDistance: number | null): PickConfig;
/**
 * This returns the final position of a point object when gravity is applied.
 * If there are no floors to collide with, null is returned.
 *
 * It is the caller's responsibility to interpolate smooth motion if desired.
 *
 * @param view The `View` of the scene.
 * @param pointObject The point object to fall.
 * @param downVector The vector used to determine the direction of fall.
 * @param maxFallDistance If the fall distance would exceed this value, then gravity is not applied at all.
 */
export declare function applyGravity(view: IView, pointObject: Point3, downVector: Point3, maxFallDistance: number | null): Promise<Point3 | null>;
/**
 * Returns the point of collision or null if there is none.
 */
export declare function testWallCollision(view: IView, position: Point3, movementVector: Point3, // For general motion support, such as back and strafing motion in addition to forward motion.
maxCollisionDistance: number): Promise<FaceSelectionItem | null>;
