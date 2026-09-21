import { LitElement } from 'lit';
/**
 * Provides a BCF (BIM Collaboration Format) panel for managing BCF files, topics, and comments.
 *
 * When no BCF is loaded, the panel displays an empty state with options to create or import a BCF file.
 *
 * @element hoops-bcf-panel
 *
 * @fires hoops-bcf-panel-bcf-created - Emitted when a new BCF is created, with detail `{ id: number, filename: string }`
 * @fires hoops-bcf-panel-bcf-imported - Emitted when a BCF file is imported, with detail `{ id: number, filename: string }`
 * @fires hoops-bcf-panel-topic-created - Emitted when a new topic is created, with detail `{ topicId: string }`
 * @fires hoops-bcf-panel-topic-removed - Emitted when a topic is removed, with detail `{ topicId: string }`
 * @fires hoops-bcf-panel-topic-clicked - Emitted when a topic is selected or its screenshot is clicked, with detail `{ topicId: string }`
 * @fires hoops-bcf-panel-comment-created - Emitted when a comment is created, with detail `{ topicId: string, commentId: string }`
 * @fires hoops-bcf-panel-comment-removed - Emitted when a comment is removed, with detail `{ topicId: string, commentId: string }`
 *
 * @example
 * ```html
 * <hoops-bcf-panel></hoops-bcf-panel>
 * ```
 *
 * @since 2026.7.0
 */
export declare class HoopsBcfPanelElement extends LitElement {
    /** @internal */
    static styles: import('lit').CSSResult;
    private _bcfService?;
    private _noteTextService?;
    private _showCreateForm;
    private _createName;
    private _activeBcfId;
    private _showTopicCreateForm;
    private _topicCreateTitle;
    private _selectedTopicId;
    private _showCommentCreateForm;
    private _commentCreateText;
    private readonly _topicMarkupViewMap;
    private readonly _topicNoteTextMap;
    /** @internal */
    connectedCallback(): void;
    private get _hasBcfData();
    private get _activeBcfData();
    /** @internal */
    protected updated(_changedProperties: Map<string, unknown>): void;
    /** @internal */
    disconnectedCallback(): Promise<void>;
    private _handleCreateClick;
    private _handleCreateCancel;
    private _handleCreateConfirm;
    private _handleImportClick;
    private _handleFileSelected;
    private _handleNameInput;
    private _handleNameKeydown;
    private _handleBcfSelectionChange;
    private _handleCloseBcf;
    private _handleShowTopicCreate;
    private _handleTopicCreateCancel;
    private _handleTopicTitleInput;
    private _handleTopicTitleKeydown;
    private _handleTopicCreateConfirm;
    private _getActiveTopicCaptureView;
    private _handleRemoveTopic;
    private _handleTopicScreenshotClick;
    private _handleTopicSelect;
    private _handleBackToTopics;
    private _activateTopicAndRestoreMarkup;
    private _clearActiveTopicMarkup;
    private _handleShowCommentCreate;
    private _handleCommentTextInput;
    private _handleCommentTextKeydown;
    private _handleCommentCreateConfirm;
    private _captureTopicAnnotations;
    private _clearTopicAnnotationVisibility;
    private _restoreTopicAnnotations;
    private _handleRemoveComment;
    private _handleTopicClickedEvent;
    private _handleTopicRemovedEvent;
    private _handleTopicScreenshotClickedEvent;
    private _handleCommentRemovedEvent;
    /** @internal */
    protected render(): unknown;
    private _renderEmptyState;
    private _renderActions;
    private _renderCreateForm;
    private _renderBcfContent;
    private _renderBcfSelector;
    private _renderTopicSection;
    private _renderTopicCreateForm;
    private _renderTopicEmpty;
    private _renderTopicList;
    private _renderTopicDetail;
    private _renderCommentCreateForm;
    private _renderCommentEmpty;
    private _renderCommentList;
}
export default HoopsBcfPanelElement;
