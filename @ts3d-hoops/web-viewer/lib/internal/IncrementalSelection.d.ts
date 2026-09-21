import { Point2, Plane, Point3 } from '@ts3d-hoops/common';
import { IncrementalPickConfig } from '../PickConfig';
import { NodeSelectionItem, SelectionManager } from '../selection';
import { IView } from '../core/IView';
import { IWebViewer } from '../core/IWebViewer';
/**
 * This class is a high-level wrapper over the various incremental selection operations that can be performed.
 *
 * See also:
 *
 * [[SelectionManager.prototype.beginScreenSelectByArea]]
 * [[SelectionManager.prototype.beginRayDrillSelection]]
 * [[SelectionManager.prototype.beginConvexPolyhedronSelection]]
 * [[SelectionManager.prototype.beginSphereSelection]]
 * [[SelectionManager.prototype.advanceIncrementalSelection]]
 * [[SelectionManager.prototype.endIncrementalSelection]]
 *
 * [[View.prototype.beginScreenSelectByArea]]
 * [[View.prototype.beginRayDrillSelection]]
 * [[View.prototype.beginConvexPolyhedronSelection]]
 * [[View.prototype.beginSphereSelection]]
 * [[View.prototype.advanceIncrementalSelection]]
 * [[View.prototype.endIncrementalSelection]]
 */
export declare class IncrementalSelection<M extends Mode> {
    private readonly _impl;
    private readonly _mode;
    private constructor();
    /**
     * Creates a new `IncrementalSelection` object that can be used to perform incremental selections.
     *
     * @param mode Controls whether or not selections are performed using the [[View]] or the [[SelectionManager]].
     * @param viewer The `IWebViewer` of the scene.
     * @param createSelectionPredicate This callback is used to create a selection predicate. Return null to not filter selection results.
     * @returns The created `IncrementalSelection` object.
     */
    static create<M extends Mode>(mode: M, viewer: IWebViewer): IncrementalSelection<M>;
    /**
     * Perform an incremental selection using the [[SelectionManager]].
     *
     * Selected objects will incrementally be added to the `SelectionManager`
     * as the incremental selection progresses.
     *
     * @returns A Promise that resolves when the selection has completed.
     */
    performSelection(this: IncrementalSelection<'SelectionManager'>, beginConfig: BeginConfig, predicate?: Predicate | null): Promise<void>;
    /**
     * Perform an incremental selection using the [[View]].
     *
     * @returns A Promise of all selected items when selection has completed.
     */
    performSelection(this: IncrementalSelection<'View'>, beginConfig: BeginConfig, predicate?: Predicate | null): Promise<NodeSelectionItem[]>;
    /**
     * Perform an incremental selection using the [[View]].
     *
     * Selected objects will incrementally be added to the
     * `outItems` argument as the incremental selection progresses.
     *
     * @returns A Promise that resolves to `outItems` when selection has completed.
     */
    performSelection(this: IncrementalSelection<'View'>, beginConfig: BeginConfig, predicate: Predicate | null | undefined, outItems: NodeSelectionItem[]): Promise<NodeSelectionItem[]>;
    performSelection(this: IncrementalSelection<Mode>, beginConfig: BeginConfig, predicate?: Predicate | null): Promise<void | NodeSelectionItem[]>;
    /**
     * Returns whether or not this object has an active selection in progress.
     * @returns `true` if active and `false` if idle.
     */
    isIdle(): boolean;
    /**
     * Used to wait for this object to become idle.
     * @returns A promise that resolves when this becomes idle.
     */
    waitForIdle(): Promise<void>;
    /**
     * Stops the selection.
     * @returns A `Promise` that resolves when completed.
     */
    stopSelection(): Promise<void>;
    /**
     * Stops and clears the selection.
     * @returns A `Promise` that resolves when completed.
     */
    clearSelection(this: IncrementalSelection<'SelectionManager'>): Promise<void>;
}
/**
 * Type used for a selection predicate.
 * The predicate is used to filter selection items.
 */
export type Predicate = (item: NodeSelectionItem) => Promise<boolean>;
/**
 * Determines whether or not selections are performed using the [[View]] or the [[SelectionManager]].
 */
export type Mode = 'View' | 'SelectionManager';
/**
 * Configuration object detailing how an incremental selection begins.
 */
export type BeginConfig = ScreenByAreaConfig | RayDrillConfig | ConvexPolyhedronConfig | SphereConfig;
/**
 * Configuration object detailing how a screen by area selection begins.
 */
export interface ScreenByAreaConfig {
    /** The configuration object used for this selection operation. */
    pickConfig: IncrementalPickConfig;
    /** The minimum coodinate in CSS pixel space for the selection window. */
    areaCssMin: Point2;
    /** The maximum coodinate in CSS pixel space for the selection window. */
    areaCssMax: Point2;
}
/**
 * Determines if the input `BeginConfig` is a `ScreenByAreaConfig`.
 * @param config The config to test.
 * @returns `true` if `config` is a `ScreenByAreaConfig` and `false` otherwise.
 */
export declare function isScreenByAreaConfig(config: BeginConfig): config is ScreenByAreaConfig;
/**
 * Configuration object detailing how a ray drll selection begins.
 */
export interface RayDrillConfig {
    /** The configuration object used for this selection operation. */
    pickConfig: IncrementalPickConfig;
    /** The coodinate in CSS pixel space for the selection ray's origin. */
    rayCssOrigin: Point2;
    /** The radius around the ray in CSS pixel space used for line and point selection proximity. */
    rayCssBoxRadius: number;
}
/**
 * Determines if the input `BeginConfig` is a `RayDrillConfig`.
 * @param config The config to test.
 * @returns `true` if `config` is a `RayDrillConfig` and `false` otherwise.
 */
export declare function isRayDrillConfig(config: BeginConfig): config is RayDrillConfig;
/**
 * Configuration object detailing how a convex polyhedron selection begins.
 */
export interface ConvexPolyhedronConfig {
    /** The configuration object used for this selection operation. */
    pickConfig: IncrementalPickConfig;
    /** The planes used to define volume. A point p is inside the volume if and only if (plane.determineSide(p) == true) for all supplied planes. */
    volumePlanes: Plane[];
    /** A point used to compute distances against for prioritizing returned results. This is typically (but not necessarily) the center of the volume. */
    heuristicOrigin: Point3;
}
/**
 * Determines if the input `BeginConfig` is a `ConvexPolyhedronConfig`.
 * @param config The config to test.
 * @returns `true` if `config` is a `ConvexPolyhedronConfig` and `false` otherwise.
 */
export declare function isConvexPolyhedronConfig(config: BeginConfig): config is ConvexPolyhedronConfig;
/**
 * Configuration object detailing how a sphere selection begins.
 */
export interface SphereConfig {
    /** The configuration object used for this selection operation. */
    pickConfig: IncrementalPickConfig;
    /** The center of the selection sphere. */
    sphereCenter: Point3;
    /** The radius of the selection sphere. */
    sphereRadius: number;
}
/**
 * Determines if the input `BeginConfig` is a `SphereConfig`.
 * @param config The config to test.
 * @returns `true` if `config` is a `SphereConfig` and `false` otherwise.
 */
export declare function isSphereConfig(config: BeginConfig): config is SphereConfig;
export type SelectionDriver = IView | SelectionManager;
export declare class IncrementalSelectionImpl {
    readonly viewer: IWebViewer;
    private readonly _killHandles;
    private _activeSelectionCount;
    private _inactivityPromise;
    constructor(viewer: IWebViewer);
    isIdle(): boolean;
    waitForIdle(): Promise<void>;
    stopSelection(): Promise<void>;
    clearSelection(): Promise<void>;
    private _advanceBySelectionManager;
    private _advanceByView;
    private _wrapBeginSelection;
    performSelection(driver: SelectionDriver, beginConfig: BeginConfig, predicate: Predicate | null, outItems: NodeSelectionItem[] | undefined): Promise<void | NodeSelectionItem[]>;
    private _performSelection;
}
