import { LitElement } from 'lit';
import { Bcf } from '@ts3d-hoops/web-viewer';
/**
 * Renders an individual BCF comment card.
 * Emits events for comment interactions (remove).
 *
 * @element hoops-bcf-comment
 * @fires hoops-bcf-comment-removed - Emitted when remove button is clicked, with detail `{ topicId: string, commentId: string }`
 *
 * @example
 * ```ts
 * <hoops-bcf-comment .comment=${bcfComment} .topicId=${topicId}></hoops-bcf-comment>
 * ```
 *
 * @since 2026.7
 * @internal
 */
export declare class HoopsBcfCommentElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult;
    comment: Bcf.BCFComment | undefined;
    commentId: string;
    topicId: string;
    snapshotUrl: string | undefined;
    private _handleRemove;
    /** @internal */
    protected render(): unknown;
}
export default HoopsBcfCommentElement;
