import { LitElement, PropertyValues } from 'lit';
import { IRedlineService } from '../services';
/**
 * Renders one redline markup view and its items.
 *
 * @element hoops-markup-view
 *
 * @fires hoops-delete-redline - Emitted when a markup item deletion is requested
 *
 * @attribute {string} uuid - Identifier of the markup view to render
 *
 * @service {IRedlineService} RedlineService - Service used to retrieve and mutate redlines
 *
 * @example
 * ```html
 * <hoops-markup-view uuid="view-1"></hoops-markup-view>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsMarkupViewElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    uuid: string;
    itemFilter: (item: {
        id: string;
        type: string;
    }) => boolean;
    redlineService?: IRedlineService;
    private onRedlineCreated;
    private onRedlineDeleted;
    private onRedlineViewDeleted;
    private onMarkupManagerReset;
    private onMarkupViewActivated;
    /**
     * @internal
     */
    protected firstUpdated(_changedProperties: PropertyValues): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /** @internal */
    protected render(): unknown;
}
export default HoopsMarkupViewElement;
