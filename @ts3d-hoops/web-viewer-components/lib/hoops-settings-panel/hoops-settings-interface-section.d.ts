import { LitElement } from 'lit';
/**
 * Renders the interface settings section for axis and floorplan behavior.
 *
 * @element hoops-settings-interface-section
 *
 * @service {IViewService} ViewService - Axis triad and navigation cube visibility service
 * @service {IFloorplanService} FloorplanService - Floorplan activation and appearance service
 *
 * @example
 * ```html
 * <hoops-settings-interface-section></hoops-settings-interface-section>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsSettingsInterfaceSectionElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    private viewService;
    private floorplanService;
    private updateCallback;
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
export default HoopsSettingsInterfaceSectionElement;
