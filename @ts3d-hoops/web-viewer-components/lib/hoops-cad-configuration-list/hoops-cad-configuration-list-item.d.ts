import { LitElement } from 'lit';
/**
 * A custom element representing an item in the CAD configuration list.
 *
 * This component displays a CAD configuration with its active state and interactive controls.
 * It does not have any dependency on the @ts3d-hoops/web-viewer Model class.
 *
 * @element hoops-cad-configuration-list-item
 *
 * @attribute {number} cadConfigurationId - The id of the CAD configuration in the model
 * @attribute {string} cadConfigurationName - The name of the CAD configuration
 * @attribute {boolean} active - Whether the CAD configuration is active or not
 *
 * @example
 * ```html
 * <hoops-cad-configuration-list-item cadConfigurationId="1" cadConfigurationName="Config A"></hoops-cad-configuration-list-item>
 * <hoops-cad-configuration-list-item cadConfigurationId="2" cadConfigurationName="Config B" active></hoops-cad-configuration-list-item>
 * ```
 *
 * @since 2025.8.0
 */
export declare class CadConfigurationListItemElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    /**
     * The id of the CAD configuration to render.
     *
     * @type {number}
     */
    cadConfigurationId: number;
    /**
     * The name of the CAD configuration to render.
     *
     * @type {string}
     */
    cadConfigurationName: string;
    /**
     * Whether the CAD configuration is active or not.
     *
     * @type {boolean}
     */
    active: boolean;
    /** @internal */
    protected render(): unknown;
}
