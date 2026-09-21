import { LitElement } from 'lit';
/**
 * Renders the graphics settings section for viewer rendering and selection options.
 *
 * @element hoops-settings-graphics-section
 *
 * @attribute {number} minimumFramerate - Minimum framerate target used by render options
 * @attribute {boolean} eyeDomeLightingEnabled - Indicates whether eye dome lighting is enabled
 *
 * @service {ICameraService} CameraService - Camera projection and navigation configuration service
 * @service {ICuttingService} CuttingService - Cutting and capping configuration service
 * @service {IRenderOptionsService} RenderOptionsService - Rendering quality and effects service
 * @service {ISelectionService} SelectionService - Selection display and behavior service
 * @service {IMeasurementService} MeasurementService - Measurement style configuration service
 * @service {IPmiService} PmiService - PMI style configuration service
 * @service {ISheetService} SheetService - Sheet appearance configuration service
 *
 * @example
 * ```html
 * <hoops-settings-graphics-section></hoops-settings-graphics-section>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsSettingsGraphicsSectionElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    private cameraService;
    private renderOptionsService;
    private cuttingService;
    private selectionService;
    private measurementsService;
    private pmiService;
    private sheetService;
    minimumFramerate: number;
    eyeDomeLightingEnabled: boolean;
    private updatePromisedData;
    private updateCallback;
    private cameraServiceEvents;
    private renderOptionsServiceEvents;
    private cuttingServiceEvents;
    private selectionServiceEvents;
    private measurementsServiceEvents;
    private pmiServiceEvents;
    private sheetServiceEvents;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /** @internal */
    protected render(): unknown;
}
export default HoopsSettingsGraphicsSectionElement;
