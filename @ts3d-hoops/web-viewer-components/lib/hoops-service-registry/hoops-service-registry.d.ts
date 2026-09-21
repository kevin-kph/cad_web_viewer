import { LitElement } from 'lit';
import { IBcfService, ICuttingService, ICameraService, IExplodeService, IRedlineService, IRenderOptionsService, IPmiService, ISelectionService, ISheetService, ISpaceMouseService, IWalkOperatorService, IService, ServiceName } from '../services';
import { INoteTextService } from '../services/notetext';
import { IMeasurementService } from '../services/measurement';
import { IIFCRelationshipsService } from '../services/ifc-relationships/types';
import { IViewService } from '../services/view/types';
import { IFloorplanService } from '../services/floorplan';
import { IMaterialService } from '../services/material';
import { ILogService } from '../services/log';
/**
 * HoopsServiceRegistryElement is a LitElement-based web component that provides centralized
 * service registration and management for the Hoops web viewer application.
 *
 * This component acts as a dependency injection container, automatically registering all core
 * services when connected to the DOM. It provides a convenient way to bootstrap the entire
 * service ecosystem with sensible defaults while allowing for easy customization.
 *
 * ## Features:
 * - Automatic registration of all core services
 * - Service customization through properties
 * - Type-safe service retrieval methods
 * - Zero-configuration setup with sensible defaults
 * - Service locator pattern implementation
 *
 * @element hoops-service-registry
 *
 * @example
 * ```html
 * <hoops-service-registry></hoops-service-registry>
 *
 * <script>
 *   const measurementService = document.getElementsByTagName('hoops-service-registry')[0].getService('MeasurementService');
 * </script>
 * ```
 * @since 2025.8.0
 */
export declare class HoopsServiceRegistryElement extends LitElement {
    /**
     * Service for BCF operations and viewpoint/markup coordination.
     * @type {IBcfService}
     * @default new BcfService()
     */
    bcfService: IBcfService;
    /**
     * Service for managing redline markup and annotations.
     * Handles creation, editing, and persistence of redline elements.
     * @type {IRedlineService}
     * @default new RedlineService()
     */
    redlineService: IRedlineService;
    /**
     * Service for managing text notes and comments.
     * Provides functionality for adding, editing, and organizing textual annotations.
     * @type {INoteTextService}
     * @default new NoteTextService()
     */
    noteTextService: INoteTextService;
    /**
     * Service for handling measurement tools and calculations.
     * Supports distance, angle, area, and volume measurements.
     * @type {IMeasurementService}
     * @default new MeasurementService()
     */
    measurementService: IMeasurementService;
    /**
     * Service for controlling rendering settings and visual options.
     * Manages display modes, lighting, materials, and other rendering parameters.
     * @type {IRenderOptionsService}
     * @default new RenderOptionsService()
     */
    renderOptionsService: IRenderOptionsService;
    /**
     * Service for handling view management and navigation.
     * Controls camera positions, view states, and navigation modes.
     * @type {IViewService}
     * @default new ViewService()
     */
    viewService: IViewService;
    /**
     * Service for managing IFC (Industry Foundation Classes) model relationships.
     * Handles building information modeling data and relationships between elements.
     * @type {IIFCRelationshipsService}
     * @default new IFCRelationshipsService()
     */
    ifcRelationshipsService: IIFCRelationshipsService;
    /**
     * Service for managing floorplan functionality and 2D representations.
     * Provides tools for working with architectural floor plans and layouts.
     * @type {IFloorplanService}
     * @default new FloorplanService()
     */
    floorplanService: IFloorplanService;
    /**
     * Service for handling Product Manufacturing Information (PMI).
     * Manages annotations, dimensions, tolerances, and other manufacturing data.
     * @type {IPmiService}
     * @default new PmiService()
     */
    pmiService: IPmiService;
    /**
     * Service for managing object selection and highlighting.
     * Handles single and multi-selection, selection events, and highlight visualization.
     * @type {ISelectionService}
     * @default new SelectionService()
     */
    selectionService: ISelectionService;
    /**
     * Service for providing cutting plane functionality.
     * Enables sectioning of 3D models with interactive cutting planes.
     * @type {ICuttingService}
     * @default new CuttingService()
     */
    cuttingService: ICuttingService;
    /**
     * Service for controlling camera movement and positioning.
     * Manages camera animations, transitions, and view manipulations.
     * @type {ICameraService}
     * @default new CameraService()
     */
    cameraService: ICameraService;
    /**
     * Service for managing drawing sheets and layouts.
     * Handles 2D technical drawings, sheet navigation, and layout management.
     * @type {ISheetService}
     * @default new SheetService()
     */
    sheetService: ISheetService;
    /**
     * Service for handling walk-through navigation mode.
     * Provides first-person navigation experience for architectural models.
     * @type {IWalkOperatorService}
     * @default new WalkOperatorService()
     */
    walkOperatorService: IWalkOperatorService;
    /**
     * Service for providing assembly explosion functionality.
     * Enables visual separation of assembly components for better understanding.
     * @type {IExplodeService}
     * @default new ExplodeService()
     */
    explodeService: IExplodeService;
    /**
     * Service for integrating 3D SpaceMouse navigation devices.
     * Provides support for professional 3D input devices for enhanced navigation.
     * @type {ISpaceMouseService}
     * @default new SpaceMouseService()
     */
    spaceMouseService: ISpaceMouseService;
    /**
     * Service for logging messages, warnings, and errors.
     * Provides a centralized logging mechanism for debugging and monitoring.
     * @type {ILogService}
     * @default new LogService()
     */
    logService: ILogService;
    /**
     * Service for managing custom shaders.
     * Provides support for custom shaders.
     * @type {IMaterialService}
     * @default new MaterialService()
     */
    materialService: IMaterialService;
    /**
     * Lifecycle callback invoked when the element is connected to the DOM.
     * Automatically registers all configured services in the global service registry,
     * making them available throughout the application.
     *
     * Services are registered in a specific order to handle any potential dependencies.
     * If a service with the same name already exists, it will be overwritten with a warning.
     *
     * @override
     * @returns {void}
     */
    connectedCallback(): void;
    /**
     * Retrieves a service from the global service registry by its name.
     * This is a type-safe wrapper around the global getService function.
     *
     * @template T - The type of the service to retrieve, must extend IService
     * @param {ServiceName} serviceName - The unique name of the service to retrieve
     * @returns {T} The requested service instance
     * @throws {Error} If the service with the given name is not registered
     *
     * @example
     * ```typescript
     * const measurementService = registry.getService<IMeasurementService>('MeasurementService');
     * measurementService.startMeasurement();
     * ```
     */
    getService<T extends IService = IService>(serviceName: ServiceName): T;
    /**
     * Attempts to retrieve a service from the global service registry by its name.
     * Returns undefined if the service is not found, making it safe for optional services.
     *
     * @template T - The type of the service to retrieve, must extend IService
     * @param {ServiceName} serviceName - The unique name of the service to retrieve
     * @returns {T | undefined} The service instance if found, undefined otherwise
     *
     * @example
     * ```typescript
     * const customService = registry.tryGetService<ICustomService>('CustomService');
     * if (customService) {
     *   customService.performCustomAction();
     * }
     * ```
     */
    tryGetService<T extends IService = IService>(serviceName: ServiceName): T | undefined;
    /**
     * Returns the element itself as the render root instead of creating a shadow DOM.
     * This ensures the component doesn't interfere with the application's styling and DOM structure.
     *
     * @internal
     * @protected
     * @override
     * @returns {Element} The element itself
     */
    protected createRenderRoot(): this;
    /**
     * Renders an empty template since this component is purely functional.
     * The component's purpose is service registration, not visual rendering.
     *
     * @internal
     */
    protected render(): unknown;
}
/**
 * Default export of the HoopsServiceRegistryElement.
 *
 * @default HoopsServiceRegistryElement
 * @example
 * ```typescript
 * import HoopsServiceRegistry from './hoops-service-registry';
 *
 * const registry = new HoopsServiceRegistry();
 * document.body.appendChild(registry);
 * ```
 */
export default HoopsServiceRegistryElement;
