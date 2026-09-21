import { LitElement } from 'lit';
/**
 * Renders the controls section for walk and space mouse settings.
 *
 * @element hoops-settings-controls-section
 *
 * @service {IWalkOperatorService} WalkOperatorService - Service used to configure walk controls
 * @service {ISpaceMouseService} SpaceMouseService - Service used to connect and manage space mouse
 *
 * @example
 * ```html
 * <hoops-settings-controls-section></hoops-settings-controls-section>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsSettingsControlsSectionElement extends LitElement {
    static styles: import('lit').CSSResult[];
    private walkOperatorService;
    private spaceMouseService;
    private updateCallback;
    private walkSpeedUnitFactor;
    private updateUnitFactor;
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
