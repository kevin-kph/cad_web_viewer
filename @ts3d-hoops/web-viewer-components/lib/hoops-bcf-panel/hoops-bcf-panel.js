import { LitElement as m, html as a, css as u } from "lit";
import { state as p, customElement as f } from "lit/decorators.js";
import "../services/index.js";
import "./hoops-bcf-topic.js";
import "./hoops-bcf-comment.js";
import { tryGetService as h } from "../services/serviceRegistry.js";
var _ = Object.defineProperty, v = Object.getOwnPropertyDescriptor, l = (e, t, o, i) => {
  for (var r = i > 1 ? void 0 : i ? v(t, o) : t, c = e.length - 1, n; c >= 0; c--)
    (n = e[c]) && (r = (i ? n(t, o, r) : n(r)) || r);
  return i && r && _(t, o, r), r;
};
let s = class extends m {
  constructor() {
    super(...arguments), this._showCreateForm = !1, this._createName = "", this._activeBcfId = null, this._showTopicCreateForm = !1, this._topicCreateTitle = "", this._selectedTopicId = null, this._showCommentCreateForm = !1, this._commentCreateText = "", this._topicMarkupViewMap = /* @__PURE__ */ new Map(), this._topicNoteTextMap = /* @__PURE__ */ new Map();
  }
  /** @internal */
  connectedCallback() {
    super.connectedCallback(), this._bcfService = h("BcfService"), this._noteTextService = h("NoteTextService");
  }
  get _hasBcfData() {
    var e;
    return !!((e = this._bcfService) != null && e.getBCFMap().size);
  }
  get _activeBcfData() {
    return this._activeBcfId === null || !this._bcfService ? null : this._bcfService.getBCFData(this._activeBcfId);
  }
  /** @internal */
  updated(e) {
    var i;
    if (this._activeBcfId !== null)
      return;
    const t = (i = this._bcfService) == null ? void 0 : i.getBCFMap(), o = t == null ? void 0 : t.keys().next().value;
    typeof o == "number" && (this._activeBcfId = o);
  }
  /** @internal */
  async disconnectedCallback() {
    var e;
    await this._clearTopicAnnotationVisibility(), (e = this._bcfService) == null || e.clearTopicMarkupAutoDeactivate(), super.disconnectedCallback();
  }
  _handleCreateClick() {
    this._showCreateForm = !0, this._createName = "";
  }
  _handleCreateCancel() {
    this._showCreateForm = !1, this._createName = "";
  }
  _handleCreateConfirm() {
    const e = this._createName.trim();
    if (!e || !this._bcfService)
      return;
    const t = this._bcfService.createBCFData(e);
    this._showCreateForm = !1, this._createName = "", this._activeBcfId = t.getId(), this._selectedTopicId = null, this._showCommentCreateForm = !1, this._commentCreateText = "", this._bcfService.clearTopicMarkupAutoDeactivate(), this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-bcf-created", {
        detail: { id: t.getId(), filename: t.getFilename() },
        bubbles: !0,
        composed: !0
      })
    ), this.requestUpdate();
  }
  _handleImportClick() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector('input[type="file"]');
    e == null || e.click();
  }
  async _handleFileSelected(e) {
    var n;
    const t = e.target, o = (n = t.files) == null ? void 0 : n[0];
    if (!o || !this._bcfService)
      return;
    const i = await o.arrayBuffer();
    await this._bcfService.addBCFFromBuffer(i, o.name);
    const c = [...this._bcfService.getBCFMap().keys()].pop();
    if (c === void 0) {
      t.value = "", this.requestUpdate();
      return;
    }
    this._activeBcfId = c, this._selectedTopicId = null, this._showCommentCreateForm = !1, this._commentCreateText = "", this._bcfService.clearTopicMarkupAutoDeactivate(), this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-bcf-imported", {
        detail: { id: c, filename: o.name },
        bubbles: !0,
        composed: !0
      })
    ), t.value = "", this.requestUpdate();
  }
  _handleNameInput(e) {
    this._createName = e.target.value;
  }
  _handleNameKeydown(e) {
    e.key === "Enter" ? this._handleCreateConfirm() : e.key === "Escape" && this._handleCreateCancel();
  }
  async _handleBcfSelectionChange(e) {
    var o;
    const t = e.target;
    this._activeBcfId = parseInt(t.value, 10), this._selectedTopicId = null, this._showCommentCreateForm = !1, this._commentCreateText = "", await this._clearActiveTopicMarkup(), await this._clearTopicAnnotationVisibility(), (o = this._bcfService) == null || o.clearTopicMarkupAutoDeactivate(), this.requestUpdate();
  }
  async _handleCloseBcf() {
    if (this._activeBcfId === null || !this._bcfService)
      return;
    const e = this._activeBcfData;
    if (this._bcfService.removeBCFData(this._activeBcfId), e)
      for (const o of e.getTopics().keys())
        this._topicMarkupViewMap.delete(o), this._topicNoteTextMap.delete(o);
    await this._clearActiveTopicMarkup(), await this._clearTopicAnnotationVisibility(), this._bcfService.clearTopicMarkupAutoDeactivate();
    const t = this._bcfService.getBCFMap();
    t.size > 0 ? this._activeBcfId = t.keys().next().value ?? null : this._activeBcfId = null, this._selectedTopicId = null, this._showCommentCreateForm = !1, this._commentCreateText = "", this.requestUpdate();
  }
  _handleShowTopicCreate() {
    this._showTopicCreateForm = !0, this._topicCreateTitle = "";
  }
  _handleTopicCreateCancel() {
    this._showTopicCreateForm = !1, this._topicCreateTitle = "";
  }
  _handleTopicTitleInput(e) {
    this._topicCreateTitle = e.target.value;
  }
  async _handleTopicTitleKeydown(e) {
    e.key === "Enter" ? await this._handleTopicCreateConfirm() : e.key === "Escape" && this._handleTopicCreateCancel();
  }
  async _handleTopicCreateConfirm() {
    const e = this._topicCreateTitle.trim(), t = this._activeBcfData;
    if (!e || !t || !this._bcfService)
      return;
    const o = this._getActiveTopicCaptureView(), r = (await this._bcfService.setupTopic(t, e, o)).getTopicId();
    o !== null && this._topicMarkupViewMap.set(r, o.getUniqueId()), this._captureTopicAnnotations(r), this._showTopicCreateForm = !1, this._topicCreateTitle = "", this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-topic-created", {
        detail: { topicId: r },
        bubbles: !0,
        composed: !0
      })
    ), this.requestUpdate();
  }
  _getActiveTopicCaptureView() {
    var i;
    const e = (i = this._bcfService) == null ? void 0 : i.webViewer, t = e == null ? void 0 : e.markupManager.getActiveMarkupView(e.view);
    if (!t)
      return null;
    const o = t.getUniqueId();
    return [...this._topicMarkupViewMap.values()].includes(o) ? null : t;
  }
  _handleRemoveTopic(e) {
    var i;
    const t = this._activeBcfData;
    if (!t)
      return;
    t.getTopics().delete(e), this._topicMarkupViewMap.delete(e), this._topicNoteTextMap.delete(e), this._selectedTopicId === e && (this._selectedTopicId = null, this._showCommentCreateForm = !1, this._commentCreateText = "", this._clearTopicAnnotationVisibility(), (i = this._bcfService) == null || i.clearTopicMarkupAutoDeactivate()), this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-topic-removed", {
        detail: { topicId: e },
        bubbles: !0,
        composed: !0
      })
    ), this.requestUpdate();
  }
  async _handleTopicScreenshotClick(e) {
    await this._activateTopicAndRestoreMarkup(e), this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-topic-clicked", {
        detail: { topicId: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  async _handleTopicSelect(e) {
    this._selectedTopicId = e, this._showCommentCreateForm = !1, this._commentCreateText = "", await this._activateTopicAndRestoreMarkup(e), this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-topic-clicked", {
        detail: { topicId: e },
        bubbles: !0,
        composed: !0
      })
    ), this.requestUpdate();
  }
  async _handleBackToTopics() {
    var e;
    this._selectedTopicId = null, this._showCommentCreateForm = !1, this._commentCreateText = "", await this._clearActiveTopicMarkup(), await this._clearTopicAnnotationVisibility(), (e = this._bcfService) == null || e.clearTopicMarkupAutoDeactivate(), this.requestUpdate();
  }
  async _activateTopicAndRestoreMarkup(e) {
    var o, i;
    await this._clearActiveTopicMarkup(), (o = this._bcfService) == null || o.clearTopicMarkupAutoDeactivate();
    const t = this._activeBcfData;
    if (t) {
      const r = t.getTopics().get(e);
      if (r) {
        const c = this._topicMarkupViewMap.get(e);
        await ((i = this._bcfService) == null ? void 0 : i.activateTopicAndRestoreMarkup(r, c)), await this._restoreTopicAnnotations(e);
      }
    }
  }
  async _clearActiveTopicMarkup() {
    var e;
    await ((e = this._bcfService) == null ? void 0 : e.clearActiveTopicMarkup());
  }
  _handleShowCommentCreate() {
    this._showCommentCreateForm = !0, this._commentCreateText = "";
  }
  _handleCommentTextInput(e) {
    this._commentCreateText = e.target.value;
  }
  async _handleCommentTextKeydown(e) {
    e.key === "Enter" ? await this._handleCommentCreateConfirm() : e.key === "Escape" && (this._showCommentCreateForm = !1, this._commentCreateText = "");
  }
  async _handleCommentCreateConfirm() {
    const e = this._commentCreateText.trim();
    if (!e || !this._selectedTopicId || !this._bcfService)
      return;
    const t = this._selectedTopicId, o = this._activeBcfData;
    if (!o)
      return;
    const i = o.getTopics().get(t);
    if (!i)
      return;
    const r = this._bcfService.webViewer, c = r == null ? void 0 : r.markupManager.getActiveMarkupView(r.view), { commentId: n } = await this._bcfService.addTopicComment(i, e, c);
    this._captureTopicAnnotations(t), this._showCommentCreateForm = !1, this._commentCreateText = "", this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-comment-created", {
        detail: { topicId: t, commentId: n },
        bubbles: !0,
        composed: !0
      })
    ), this.requestUpdate();
  }
  _captureTopicAnnotations(e) {
    if (this._noteTextService)
      try {
        const t = this._noteTextService.getVisibleNoteTextKeys();
        this._topicNoteTextMap.set(e, new Set(t));
      } catch (t) {
        console.warn("Failed to capture topic note annotation visibility", t);
      }
  }
  async _clearTopicAnnotationVisibility() {
    if (!this._noteTextService)
      return;
    const e = /* @__PURE__ */ new Set();
    for (const t of this._topicNoteTextMap.values())
      for (const o of t)
        e.add(o);
    if (e.size !== 0)
      try {
        await this._noteTextService.setNoteTextsVisibility([...e], !1);
      } catch (t) {
        console.warn("Failed to clear topic note annotation visibility", t);
      }
  }
  async _restoreTopicAnnotations(e) {
    if (!this._noteTextService)
      return;
    await this._clearTopicAnnotationVisibility();
    const t = this._topicNoteTextMap.get(e);
    if (!(!t || t.size === 0))
      try {
        await this._noteTextService.setNoteTextsVisibility([...t], !0);
      } catch (o) {
        console.warn("Failed to restore topic note annotation visibility", o);
      }
  }
  _handleRemoveComment(e) {
    if (!this._selectedTopicId)
      return;
    const t = this._activeBcfData;
    if (!t)
      return;
    const o = t.getTopics().get(this._selectedTopicId);
    if (!o)
      return;
    const i = o.getMarkup();
    i && (i.deleteComment(e), this.dispatchEvent(
      new CustomEvent("hoops-bcf-panel-comment-removed", {
        detail: { topicId: this._selectedTopicId, commentId: e },
        bubbles: !0,
        composed: !0
      })
    ), this.requestUpdate());
  }
  async _handleTopicClickedEvent(e) {
    await this._handleTopicSelect(e.detail.topicId);
  }
  _handleTopicRemovedEvent(e) {
    this._handleRemoveTopic(e.detail.topicId);
  }
  async _handleTopicScreenshotClickedEvent(e) {
    await this._handleTopicScreenshotClick(e.detail.topicId);
  }
  _handleCommentRemovedEvent(e) {
    this._handleRemoveComment(e.detail.commentId);
  }
  /** @internal */
  render() {
    return a`<div
      @hoops-bcf-topic-clicked=${this._handleTopicClickedEvent}
      @hoops-bcf-topic-removed=${this._handleTopicRemovedEvent}
      @hoops-bcf-topic-screenshot-clicked=${this._handleTopicScreenshotClickedEvent}
      @hoops-bcf-comment-removed=${this._handleCommentRemovedEvent}
    >
      <h2 class="title">BCF</h2>
      ${this._hasBcfData ? this._renderBcfContent() : this._renderEmptyState()}
      <input type="file" accept=".bcf,.bcfzip" @change=${this._handleFileSelected} />
    </div>`;
  }
  _renderEmptyState() {
    return a`<div class="empty-state">
      <div class="empty-state-message">
        No BCF loaded. Create a new BCF or import an existing one.
      </div>
      ${this._showCreateForm ? this._renderCreateForm() : this._renderActions()}
    </div>`;
  }
  _renderActions() {
    return a`<div class="actions">
      <hoops-button @click=${this._handleCreateClick}>Create BCF</hoops-button>
      <hoops-button @click=${this._handleImportClick}>Import BCF</hoops-button>
    </div>`;
  }
  _renderCreateForm(e = !1) {
    return a`<div class=${e ? "create-form create-form-inline" : "create-form"}>
      <input
        type="text"
        placeholder="BCF name"
        .value=${this._createName}
        @input=${this._handleNameInput}
        @keydown=${this._handleNameKeydown}
      />
      <div class="create-form-buttons">
        <hoops-button @click=${this._handleCreateCancel}>Cancel</hoops-button>
        <hoops-button @click=${this._handleCreateConfirm}>Create</hoops-button>
      </div>
    </div>`;
  }
  _renderBcfContent() {
    return a`
      ${this._renderBcfSelector()}
      ${this._activeBcfData ? this._selectedTopicId ? this._renderTopicDetail() : this._renderTopicSection() : a``}
    `;
  }
  _renderBcfSelector() {
    var t;
    const e = (t = this._bcfService) == null ? void 0 : t.getBCFMap();
    return e ? a`<div class="bcf-selector">
      <select @change=${this._handleBcfSelectionChange}>
        ${[...e.entries()].map(
      ([o, i]) => a`<option value=${o} ?selected=${o === this._activeBcfId}>
              ${i.getFilename()}
            </option>`
    )}
      </select>
      <div class="bcf-selector-actions">
        <button @click=${this._handleCreateClick} title="Create BCF" aria-label="Create BCF">+</button>
        <button @click=${this._handleImportClick} title="Import BCF" aria-label="Import BCF">
          <hoops-icon icon="importIcon" class="import-icon"></hoops-icon>
        </button>
        <button @click=${this._handleCloseBcf} title="Close active BCF" aria-label="Close active BCF">&times;</button>
      </div>
    </div>
    ${this._showCreateForm ? this._renderCreateForm(!0) : a``}` : a``;
  }
  _renderTopicSection() {
    const e = this._activeBcfData;
    if (!e)
      return a``;
    const t = e.getTopics();
    return a`
      <div class="topic-toolbar">
        <span class="topic-toolbar-label">Topics (${t.size})</span>
        <div class="topic-toolbar-actions">
          <button @click=${this._handleShowTopicCreate} title="Create topic">+ Topic</button>
        </div>
      </div>
      ${this._showTopicCreateForm ? this._renderTopicCreateForm() : a``}
      ${t.size > 0 ? this._renderTopicList(t) : this._renderTopicEmpty()}
    `;
  }
  _renderTopicCreateForm() {
    return a`<div class="topic-create-form">
      <input
        type="text"
        placeholder="Topic title"
        .value=${this._topicCreateTitle}
        @input=${this._handleTopicTitleInput}
        @keydown=${this._handleTopicTitleKeydown}
      />
      <button @click=${this._handleTopicCreateConfirm}>Create</button>
      <button @click=${this._handleTopicCreateCancel}>Cancel</button>
    </div>`;
  }
  _renderTopicEmpty() {
    return a`<div class="topic-empty">No topics yet. Create one to get started.</div>`;
  }
  _renderTopicList(e) {
    return a`<div class="topic-list">
      ${[...e.entries()].map(
      ([t, o]) => a`<hoops-bcf-topic
            .topic=${o}
            .topicId=${t}
          ></hoops-bcf-topic>`
    )}
    </div>`;
  }
  _renderTopicDetail() {
    const e = this._activeBcfData;
    if (!e || !this._selectedTopicId)
      return a``;
    const t = e.getTopics().get(this._selectedTopicId);
    if (!t)
      return this._selectedTopicId = null, a``;
    const o = t.getMarkup(), i = (o == null ? void 0 : o.getTopicTitle()) ?? "Untitled", r = (o == null ? void 0 : o.getComments()) ?? /* @__PURE__ */ new Map();
    return a`<div class="topic-detail">
      <button class="topic-detail-back" @click=${this._handleBackToTopics}>← Topics</button>
      <div class="topic-detail-title">${i}</div>
      <div class="topic-toolbar">
        <span class="topic-toolbar-label">Comments (${r.size})</span>
        <div class="topic-toolbar-actions">
          <button @click=${this._handleShowCommentCreate} title="Add comment">+ Comment</button>
        </div>
      </div>
      ${this._showCommentCreateForm ? this._renderCommentCreateForm() : a``}
      ${r.size > 0 ? this._renderCommentList(r) : this._renderCommentEmpty()}
    </div>`;
  }
  _renderCommentCreateForm() {
    return a`<div class="comment-create-form">
      <input
        type="text"
        placeholder="Comment text"
        .value=${this._commentCreateText}
        @input=${this._handleCommentTextInput}
        @keydown=${this._handleCommentTextKeydown}
      />
      <button @click=${this._handleCommentCreateConfirm}>Add</button>
      <button
        @click=${() => {
      this._showCommentCreateForm = !1, this._commentCreateText = "";
    }}
      >
        Cancel
      </button>
    </div>`;
  }
  _renderCommentEmpty() {
    return a`<div class="comment-empty">No comments yet.</div>`;
  }
  _renderCommentList(e) {
    return a`<div class="comment-list">
      ${[...e.entries()].map(([t, o]) => {
      const i = o.getViewpointGuid();
      let r;
      if (i && this._selectedTopicId) {
        const c = this._activeBcfData;
        if (c) {
          const n = c.getTopics().get(this._selectedTopicId);
          if (n) {
            const d = n.getSnapshot(`${i}.png`);
            r = d == null ? void 0 : d.getUrl();
          }
        }
      }
      return a`<hoops-bcf-comment
          .comment=${o}
          .commentId=${t}
          .topicId=${this._selectedTopicId}
          .snapshotUrl=${r}
        ></hoops-bcf-comment>`;
    })}
    </div>`;
  }
};
s.styles = u`
    :host {
      display: block;
      height: 100%;
      overflow: auto;
    }

    .title {
      font-size: 1.2rem;
      font-weight: normal;
      margin: 0.5rem 0;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 2rem 1rem;
      text-align: center;
    }

    .empty-state-message {
      color: var(--hoops-neutral-foreground, #303030);
      font-size: 0.9rem;
      opacity: 0.7;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      max-width: 200px;
    }

    .actions hoops-button {
      border: 1px solid var(--hoops-neutral-foreground, #303030);
    }

    .create-form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      max-width: 200px;
    }

    .create-form-inline {
      padding: 0.5rem;
    }

    .create-form input {
      padding: 0.4rem;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      background: var(--hoops-neutral-background, #ffffff);
      color: var(--hoops-neutral-foreground, #303030);
      font-size: 0.85rem;
    }

    .create-form-buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
    }

    .create-form-buttons hoops-button {
      border: 1px solid var(--hoops-neutral-foreground, #303030);
    }

    input[type='file'] {
      display: none;
    }

    .bcf-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-bottom: 1px solid var(--hoops-neutral-border, #e0e0e0);
    }

    .bcf-selector select {
      flex: 1;
      padding: 0.3rem;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      background: var(--hoops-neutral-background, #ffffff);
      color: var(--hoops-neutral-foreground, #303030);
      font-size: 0.85rem;
    }

    .bcf-selector-actions {
      display: flex;
      gap: 0.25rem;
    }

    .bcf-selector-actions button {
      background: none;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
    }

    .bcf-selector-actions button:hover {
      background: var(--hoops-neutral-background-hover, #f0f0f0);
    }

    .topic-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      border-bottom: 1px solid var(--hoops-neutral-border, #e0e0e0);
    }

    .topic-toolbar-label {
      font-size: 0.85rem;
      font-weight: 500;
    }

    .topic-toolbar-actions {
      display: flex;
      gap: 0.25rem;
    }

    .topic-toolbar-actions button {
      background: none;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
    }

    .topic-toolbar-actions button:hover {
      background: var(--hoops-neutral-background-hover, #f0f0f0);
    }

    .topic-create-form {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
      border-bottom: 1px solid var(--hoops-neutral-border, #e0e0e0);
    }

    .topic-create-form input {
      flex: 1;
      padding: 0.3rem;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      background: var(--hoops-neutral-background, #ffffff);
      color: var(--hoops-neutral-foreground, #303030);
      font-size: 0.85rem;
    }

    .topic-create-form button {
      background: none;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
    }

    .topic-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    .topic-empty {
      text-align: center;
      padding: 1rem;
      font-size: 0.85rem;
      opacity: 0.6;
    }

    .topic-detail {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    .topic-detail-back {
      background: none;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
      align-self: flex-start;
    }

    .topic-detail-back:hover {
      background: var(--hoops-neutral-background-hover, #f0f0f0);
    }

    .import-icon {
      width: 1rem;
      height: 1rem;
    }

    .topic-detail-title {
      font-size: 1rem;
      font-weight: 500;
    }

    .comment-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .comment-empty {
      text-align: center;
      padding: 1rem;
      font-size: 0.85rem;
      opacity: 0.6;
    }

    .comment-create-form {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem 0;
    }

    .comment-create-form input {
      flex: 1;
      padding: 0.3rem;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      background: var(--hoops-neutral-background, #ffffff);
      color: var(--hoops-neutral-foreground, #303030);
      font-size: 0.85rem;
    }

    .comment-create-form button {
      background: none;
      border: 1px solid var(--hoops-neutral-foreground, #303030);
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
    }
  `;
l([
  p()
], s.prototype, "_showCreateForm", 2);
l([
  p()
], s.prototype, "_createName", 2);
l([
  p()
], s.prototype, "_activeBcfId", 2);
l([
  p()
], s.prototype, "_showTopicCreateForm", 2);
l([
  p()
], s.prototype, "_topicCreateTitle", 2);
l([
  p()
], s.prototype, "_selectedTopicId", 2);
l([
  p()
], s.prototype, "_showCommentCreateForm", 2);
l([
  p()
], s.prototype, "_commentCreateText", 2);
s = l([
  f("hoops-bcf-panel")
], s);
const x = s;
export {
  s as HoopsBcfPanelElement,
  x as default
};
