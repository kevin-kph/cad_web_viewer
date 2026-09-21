import { LitElement, PropertyValues } from 'lit';
import { IRedlineService } from '../services';
/**
 * Displays a tree of markup views from the redline service.
 *
 * @element hoops-markup-tree
 *
 * @service {IRedlineService} RedlineService - Service used to list and update markup views
 *
 * @example
 * ```html
 * <hoops-markup-tree></hoops-markup-tree>
 * ```
 *
 * @since 2025.7.0
 */
export declare class HoopsMarkupTreeElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult[];
    redlineService?: IRedlineService;
    private onUpdate;
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
export default HoopsMarkupTreeElement;
