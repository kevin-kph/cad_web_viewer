import { IColor, Box } from '@ts3d-hoops/common';
import { core } from '@ts3d-hoops/web-viewer';
import { CuttingPlane, CuttingServiceConfiguration, ICuttingService, Section, SelectedFace } from './types';
/**
 * Service class for managing cutting plane operations in 3D models.
 *
 * This service provides a high-level interface for creating, managing, and manipulating
 * cutting planes and cutting sections. It acts as a bridge between the UI components
 * and the underlying HOOPS Web Viewer cutting functionality.
 *
 * Key features:
 * - Cutting section management (create, activate, deactivate, clear)
 * - Cutting plane operations (add, remove, update, visibility control)
 * - Visual property management (color, opacity, reference geometry)
 * - Capping geometry configuration
 * - Event dispatching for UI synchronization
 * - Face selection integration for plane creation
 *
 * @fires hoops-cutting-sections-change - When cutting sections are loaded or changed
 * @fires hoops-cutting-section-added - When a new cutting section is added
 * @fires hoops-cutting-section-removed - When a cutting section is removed
 * @fires hoops-cutting-section-change - When a cutting section state changes
 * @fires hoops-cutting-plane-added - When a cutting plane is added to a section
 * @fires hoops-cutting-plane-removed - When a cutting plane is removed
 * @fires hoops-cutting-plane-change - When a cutting plane is modified
 * @fires hoops-capping-geometry-visibility-changed - When capping geometry visibility changes
 * @fires hoops-capping-face-color-changed - When capping face color changes
 * @fires hoops-capping-line-color-changed - When capping line color changes
 * @fires hoops-cutting-face-selection-change - When face selection changes
 * @fires hoops-cutting-service-reset - When the service is reset with a new cutting manager
 *
 * @example
 * ```typescript
 * // Create and configure cutting service
 * const cuttingService = new CuttingService(cuttingManager);
 *
 * // Add event listeners
 * cuttingService.addEventListener('hoops-cutting-plane-change', (event) => {
 *   console.log('Plane changed:', event.detail);
 * });
 *
 * // Create a cutting plane
 * const plane = new Plane();
 * plane.normal = new Point3(1, 0, 0);
 * plane.d = 10;
 *
 * const cuttingPlane = {
 *   plane,
 *   color: { r: 1, g: 0, b: 0 },
 *   opacity: 0.5
 * };
 *
 * cuttingService.addCuttingPlane(0, cuttingPlane);
 * ```
 *
 * @example
 * ```typescript
 * // Configure capping geometry
 * await cuttingService.setCappingGeometryVisibility(true);
 * await cuttingService.setCappingFaceColor('#ff0000');
 * await cuttingService.setCappingLineColor('#000000');
 * ```
 */
export default class CuttingService extends EventTarget implements ICuttingService {
    /** The service identifier for this cutting service. */
    readonly serviceName: "CuttingService";
    /** The underlying HOOPS Web Viewer cutting manager. */
    private _cuttingManager?;
    /** The model's bounding box for sizing reference geometry. */
    private _modelBounding?;
    /** The currently selected face for creating cutting planes. */
    private selectedFace?;
    /** Tracks which cutting sections have hidden reference geometry. */
    private sectionHideReferenceGeometry;
    /** Callback map for HOOPS Web Viewer events. */
    private callbackMap;
    /** Default configuration values for the cutting service. */
    static readonly DefaultConfig: CuttingServiceConfiguration;
    /**
     * Constructs a new CuttingService instance.
     *
     * @param cuttingManager - Optional HOOPS Web Viewer cutting manager to use for operations
     *
     * @example
     * ```typescript
     * // Create service with cutting manager
     * const service = new CuttingService(viewer.cuttingManager);
     *
     * // Create service without manager (can be set later)
     * const service = new CuttingService();
     * service.cuttingManager = viewer.cuttingManager;
     * ```
     */
    constructor(cuttingManager?: core.ICuttingManager);
    /**
     * Binds event callbacks to the HOOPS Web Viewer cutting manager.
     *
     * @internal
     * @throws Error if cutting manager is not set
     */
    private bind;
    /**
     * Unbinds event callbacks from the HOOPS Web Viewer cutting manager.
     *
     * @internal
     * @throws Error if cutting manager is not set
     */
    private unbind;
    /**
     * Gets the current HOOPS Web Viewer cutting manager.
     *
     * @returns The cutting manager instance, or undefined if not set
     */
    get cuttingManager(): core.ICuttingManager | undefined;
    /**
     * Sets the HOOPS Web Viewer cutting manager.
     *
     * Unbinds from the previous cutting manager (if any) and binds to the new one.
     * Dispatches a 'hoops-cutting-service-reset' event when the manager changes.
     *
     * @param cuttingManager - The new cutting manager instance, or undefined to clear
     *
     * @fires hoops-cutting-service-reset - When the cutting manager is changed
     */
    set cuttingManager(cuttingManager: core.ICuttingManager | undefined);
    /**
     * Gets the currently selected face for creating cutting planes.
     *
     * @returns The selected face data, or undefined if no face is selected
     */
    getSelectedFace(): SelectedFace | undefined;
    /**
     * Gets the current model bounding box.
     *
     * @returns The model's bounding box, or an empty Box if not set
     */
    getModelBounding(): Box;
    /**
     * Sets the model bounding box.
     *
     * @param modelBounding - The new model bounding box
     */
    setModelBounding(modelBounding: Box): void;
    /**
     * Gets the current capping geometry visibility state.
     *
     * @returns True if capping geometry is visible, false otherwise, or default value if no cutting manager is set
     */
    getCappingGeometryVisibility(): boolean;
    /**
     * Sets the capping geometry visibility state.
     *
     * @param cappingGeometryVisibility - True to show capping geometry, false to hide
     * @throws Error if cutting manager is not set
     *
     * @fires hoops-capping-geometry-visibility-changed - When visibility state changes
     */
    setCappingGeometryVisibility(cappingGeometryVisibility: boolean): Promise<void>;
    /**
     * Gets the current capping face color.
     *
     * @returns The capping face color as a hex string, or default value if no cutting manager is set
     */
    getCappingFaceColor(): string | undefined;
    /**
     * Sets the capping face color.
     *
     * @param color - The color as a hex string (e.g., "#ff0000"), or undefined to use default
     * @throws Error if cutting manager is not set
     *
     * @fires hoops-capping-face-color-changed - When face color changes
     */
    setCappingFaceColor(color?: string): Promise<void>;
    /**
     * Gets the current capping line color.
     *
     * @returns The capping line color as a hex string, or default value if no cutting manager is set
     */
    getCappingLineColor(): string | undefined;
    /**
     * Sets the capping line color.
     *
     * @param color - The color as a hex string (e.g., "#000000"), or undefined to use default
     * @throws Error if cutting manager is not set
     *
     * @fires hoops-capping-line-color-changed - When line color changes
     */
    setCappingLineColor(color?: string): Promise<void>;
    /**
     * Gets the total number of cutting sections.
     *
     * @returns The number of cutting sections, or 0 if no cutting manager is set
     */
    getCuttingSectionCount(): number;
    /**
     * Gets all cutting sections.
     *
     * @returns Array of Section objects representing all cutting sections
     */
    getCuttingSections(): Section[];
    /**
     * Gets a cutting section by index.
     *
     * @param index - The index of the cutting section to retrieve
     * @returns The Section object at the specified index, or undefined if not found
     */
    getCuttingSection(index: number): Section | undefined;
    /**
     * Clears all cutting planes from the specified cutting section.
     *
     * @param sectionIndex - The index of the cutting section to clear
     * @throws Error if cutting manager is not set or section index is invalid
     *
     * @fires hoops-cutting-section-change - When the section is cleared
     */
    clearCuttingSection(sectionIndex: number): Promise<void>;
    /**
     * Sets the active state of a cutting section.
     *
     * @param sectionIndex - The index of the cutting section to modify
     * @param active - True to activate the section, false to deactivate
     * @throws Error if cutting manager is not set or section index is invalid
     *
     * @fires hoops-cutting-section-change - When the section state changes
     */
    setCuttingSectionState(sectionIndex: number, active: boolean): Promise<void>;
    /**
     * Sets the reference geometry visibility for a cutting section.
     *
     * @param sectionIndex - The index of the cutting section to modify
     * @param hidden - True to hide reference geometry, false to show
     * @throws Error if cutting manager is not set or section index is invalid
     *
     * @fires hoops-cutting-section-change - When the section visibility changes
     */
    setCuttingSectionGeometryVisibility(sectionIndex: number, hidden: boolean): Promise<void>;
    /**
     * Gets the number of cutting planes in a cutting section.
     *
     * @param sectionIndex - The index of the cutting section
     * @returns The number of cutting planes in the section, or 0 if section not found
     */
    getCuttingPlaneCount(sectionIndex: number): number;
    /**
     * Gets all cutting planes from a cutting section.
     *
     * @param sectionIndex - The index of the cutting section
     * @returns Array of CuttingPlane objects representing all planes in the section
     */
    getCuttingPlanes(sectionIndex: number): CuttingPlane[];
    /**
     * Gets a specific cutting plane from a cutting section.
     *
     * @param sectionIndex - The index of the cutting section
     * @param planeIndex - The index of the cutting plane within the section
     * @returns The CuttingPlane object at the specified indices, or undefined if not found
     */
    getCuttingPlane(sectionIndex: number, planeIndex: number): CuttingPlane | undefined;
    /**
     * Adds a cutting plane to a cutting section.
     *
     * @param sectionIndex - The index of the cutting section to add the plane to
     * @param cuttingPlane - The CuttingPlane object containing plane definition and visual properties
     * @throws Error if cutting manager is not set or section index is invalid
     *
     * @fires hoops-cutting-plane-added - When the plane is successfully added
     *
     * @example
     * ```typescript
     * const plane = new Plane();
     * plane.normal = new Point3(1, 0, 0);
     * plane.d = 0;
     *
     * const cuttingPlane = {
     *   plane,
     *   color: { r: 1, g: 0, b: 0 },
     *   opacity: 0.5
     * };
     *
     * service.addCuttingPlane(0, cuttingPlane);
     * ```
     */
    addCuttingPlane(sectionIndex: number, cuttingPlane: CuttingPlane): Promise<void>;
    /**
     * Removes a cutting plane from a cutting section.
     *
     * @param sectionIndex - The index of the cutting section containing the plane
     * @param planeIndex - The index of the cutting plane to remove
     * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
     *
     * @fires hoops-cutting-plane-removed - When the plane is successfully removed
     */
    removeCuttingPlane(sectionIndex: number, planeIndex: number): Promise<void>;
    /**
     * Updates properties of an existing cutting plane.
     *
     * This method allows partial updates to cutting plane properties including plane geometry,
     * visual properties (color, opacity), and reference geometry. The plane normal is automatically
     * normalized for proper reference geometry alignment.
     *
     * @param sectionIndex - The index of the cutting section containing the plane
     * @param planeIndex - The index of the cutting plane to update
     * @param cuttingPlane - Partial CuttingPlane object with properties to update
     * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
     *
     * @fires hoops-cutting-plane-change - When the plane is successfully updated
     *
     * @example
     * ```typescript
     * // Update only the color
     * service.updateCuttingPlane(0, 0, {
     *   color: { r: 0, g: 1, b: 0 }
     * });
     *
     * // Update plane position and opacity
     * const newPlane = new Plane();
     * newPlane.normal = new Point3(0, 1, 0);
     * newPlane.d = 5;
     *
     * service.updateCuttingPlane(0, 0, {
     *   plane: newPlane,
     *   opacity: 0.8
     * });
     * ```
     */
    updateCuttingPlane(sectionIndex: number, planeIndex: number, cuttingPlane: Partial<CuttingPlane>): Promise<void>;
    /**
     * Sets the visibility of reference geometry for a specific cutting plane.
     *
     * @param sectionIndex - The index of the cutting section containing the plane
     * @param planeIndex - The index of the cutting plane to modify
     * @param visible - True to show reference geometry, false to hide
     * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
     *
     * @fires hoops-cutting-plane-change - When the plane visibility changes
     */
    setCuttingPlaneVisibility(sectionIndex: number, planeIndex: number, visible: boolean): Promise<void>;
    /**
     * Sets the face color of a specific cutting plane.
     *
     * @param sectionIndex - The index of the cutting section containing the plane
     * @param planeIndex - The index of the cutting plane to modify
     * @param color - The new face color (RGB values between 0 and 1)
     * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
     *
     * @fires hoops-cutting-plane-change - When the plane color changes
     */
    setCuttingPlaneColor(sectionIndex: number, planeIndex: number, color: IColor): void;
    /**
     * Sets the line color of a specific cutting plane.
     *
     * @param sectionIndex - The index of the cutting section containing the plane
     * @param planeIndex - The index of the cutting plane to modify
     * @param lineColor - The new line color (RGB values between 0 and 1)
     * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
     *
     * @fires hoops-cutting-plane-change - When the plane line color changes
     */
    setCuttingPlaneLineColor(sectionIndex: number, planeIndex: number, lineColor: IColor): void;
    /**
     * Sets the opacity of a specific cutting plane.
     *
     * @param sectionIndex - The index of the cutting section containing the plane
     * @param planeIndex - The index of the cutting plane to modify
     * @param opacity - The new opacity value (between 0.0 and 1.0)
     * @throws Error if cutting manager is not set, section index is invalid, or plane index is invalid
     *
     * @fires hoops-cutting-plane-change - When the plane opacity changes
     */
    setCuttingPlaneOpacity(sectionIndex: number, planeIndex: number, opacity: number): void;
    /**
     * Resets the cutting service configuration to default values or provided configuration.
     *
     * @param obj - Optional configuration object to apply, or undefined to use default configuration
     * @throws Error if cutting manager is not set or configuration object is invalid
     *
     * @example
     * ```typescript
     * // Reset to default configuration
     * await service.resetConfiguration();
     *
     * // Apply custom configuration
     * await service.resetConfiguration({
     *   cappingGeometryVisibility: false,
     *   cappingFaceColor: '#ff0000',
     *   cappingLineColor: '#000000'
     * });
     * ```
     */
    resetConfiguration(obj?: object): Promise<void>;
}
