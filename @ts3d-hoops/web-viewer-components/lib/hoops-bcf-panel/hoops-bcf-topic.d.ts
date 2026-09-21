import { LitElement } from 'lit';
import { Bcf } from '@ts3d-hoops/web-viewer';
/**
 * Renders an individual BCF topic card.
 * Emits events for topic interactions (select, remove, screenshot click).
 *
 * @element hoops-bcf-topic
 * @fires hoops-bcf-topic-clicked - Emitted when topic is clicked, with detail `{ topicId: string }`
 * @fires hoops-bcf-topic-removed - Emitted when remove button is clicked, with detail `{ topicId: string }`
 * @fires hoops-bcf-topic-screenshot-clicked - Emitted when screenshot is clicked, with detail `{ topicId: string }`
 *
 * @example
 * ```ts
 * <hoops-bcf-topic .topic=${bcfTopic} .topicId=${topicId}></hoops-bcf-topic>
 * ```
 *
 * @since 2026.7
 * @internal
 */
export declare class HoopsBcfTopicElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult;
    topic: Bcf.BCFTopic | undefined;
    topicId: string;
    private _handleClick;
    private _handleRemove;
    private _handleScreenshotClick;
    private _handleKeydown;
    /** @internal */
    protected render(): unknown;
}
export default HoopsBcfTopicElement;
