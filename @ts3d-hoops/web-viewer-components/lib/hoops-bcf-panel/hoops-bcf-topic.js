import { LitElement as f, html as e, css as b } from "lit";
import { property as v, customElement as g } from "lit/decorators.js";
var m = Object.defineProperty, y = Object.getOwnPropertyDescriptor, a = (t, r, i, c) => {
  for (var o = c > 1 ? void 0 : c ? y(r, i) : r, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (o = (c ? n(r, i, o) : n(o)) || o);
  return c && o && m(r, i, o), o;
};
let p = class extends f {
  constructor() {
    super(...arguments), this.topicId = "";
  }
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-topic-clicked", {
        detail: { topicId: this.topicId },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleRemove(t) {
    t.stopPropagation(), this.dispatchEvent(
      new CustomEvent("hoops-bcf-topic-removed", {
        detail: { topicId: this.topicId },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleScreenshotClick(t) {
    t.stopPropagation(), this.dispatchEvent(
      new CustomEvent("hoops-bcf-topic-screenshot-clicked", {
        detail: { topicId: this.topicId },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleKeydown(t) {
    t.target === t.currentTarget && (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._handleClick());
  }
  /** @internal */
  render() {
    if (!this.topic)
      return e``;
    const t = this.topic.getMarkup(), r = this.topic.getSnapshotMap(), i = this.topic.getSnapshot("snapshot.png") ?? r.values().next().value ?? null, c = i == null ? void 0 : i.getUrl(), o = (t == null ? void 0 : t.getTopicTitle()) ?? "Untitled", s = t == null ? void 0 : t.getTopicCreationAuthor(), n = t == null ? void 0 : t.getTopicCreationDate(), d = t == null ? void 0 : t.getTopicDescription(), l = t == null ? void 0 : t.getTopicType(), h = t == null ? void 0 : t.getTopicPriority(), u = t == null ? void 0 : t.getTopicStage();
    return e`<div
      class="topic-card"
      role="button"
      tabindex="0"
      data-topic-id=${this.topicId}
      @click=${this._handleClick}
      @keydown=${this._handleKeydown}
    >
      <div class="topic-card-header">
        <span class="topic-card-title">${o}</span>
        <button
          class="topic-card-remove"
          @click=${this._handleRemove}
          title="Remove topic"
          aria-label="Remove topic"
        >
          ×
        </button>
      </div>
      ${c ? e`<img
            class="topic-card-screenshot"
            src=${c}
            alt="Topic screenshot"
            @click=${this._handleScreenshotClick}
          />` : e``}
      <div class="topic-card-meta">
        ${s ? e`<span>Author: ${s}</span>` : e``}
        ${d ? e`<span>Description: ${d}</span>` : e``}
        ${n ? e`<span>Created: ${n.toLocaleDateString()}</span>` : e``}
        ${l ? e`<span>Type: ${l}</span>` : e``}
        ${h ? e`<span>Priority: ${h}</span>` : e``}
        ${u ? e`<span>Stage: ${u}</span>` : e``}
        <span>ID: ${this.topicId}</span>
      </div>
    </div>`;
  }
};
p.styles = b`
    :host {
      display: block;
    }

    .topic-card {
      border: 1px solid var(--hoops-neutral-border, #e0e0e0);
      border-radius: 4px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      cursor: pointer;
    }

    .topic-card:hover {
      background: var(--hoops-neutral-background-hover, #f0f0f0);
    }

    .topic-card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .topic-card-title {
      font-size: 0.9rem;
      font-weight: 500;
      word-break: break-word;
    }

    .topic-card-remove {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
      opacity: 0.6;
      padding: 0.1rem 0.3rem;
    }

    .topic-card-remove:hover {
      opacity: 1;
    }

    .topic-card-screenshot {
      width: 100%;
      max-height: 120px;
      object-fit: contain;
      cursor: pointer;
      border-radius: 2px;
      border: 1px solid var(--hoops-neutral-border, #e0e0e0);
    }

    .topic-card-meta {
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
      opacity: 0.7;
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .topic-card-meta span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
a([
  v({ attribute: !1 })
], p.prototype, "topic", 2);
a([
  v({ type: String })
], p.prototype, "topicId", 2);
p = a([
  g("hoops-bcf-topic")
], p);
const x = p;
export {
  p as HoopsBcfTopicElement,
  x as default
};
