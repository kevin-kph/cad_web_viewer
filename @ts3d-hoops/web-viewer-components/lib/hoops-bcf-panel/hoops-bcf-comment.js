import { LitElement as p, html as r, css as l } from "lit";
import { property as a, customElement as h } from "lit/decorators.js";
var u = Object.defineProperty, f = Object.getOwnPropertyDescriptor, m = (n, t, s, c) => {
  for (var o = c > 1 ? void 0 : c ? f(t, s) : t, d = n.length - 1, i; d >= 0; d--)
    (i = n[d]) && (o = (c ? i(t, s, o) : i(o)) || o);
  return c && o && u(t, s, o), o;
};
let e = class extends p {
  constructor() {
    super(...arguments), this.commentId = "", this.topicId = "";
  }
  _handleRemove() {
    this.dispatchEvent(
      new CustomEvent("hoops-bcf-comment-removed", {
        detail: { topicId: this.topicId, commentId: this.commentId },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /** @internal */
  render() {
    if (!this.comment)
      return r``;
    const n = this.comment.getText(), t = this.comment.getAuthor(), s = this.comment.getDate();
    return r`<div class="comment-card">
      <div class="comment-card-header">
        <span class="comment-card-text">${n}</span>
        <button
          class="comment-card-remove"
          @click=${this._handleRemove}
          title="Remove comment"
          aria-label="Remove comment"
        >
          ×
        </button>
      </div>
      ${this.snapshotUrl ? r`<img class="comment-card-screenshot" src="${this.snapshotUrl}" alt="Comment screenshot" />` : void 0}
      <div class="comment-card-meta">
        ${t ? r`<span>${t}</span>` : r``}
        ${s ? r`<span>${s.toLocaleDateString()}</span>` : r``}
      </div>
    </div>`;
  }
};
e.styles = l`
    :host {
      display: block;
    }

    .comment-card {
      border: 1px solid var(--hoops-neutral-border, #e0e0e0);
      border-radius: 4px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .comment-card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .comment-card-text {
      font-size: 0.85rem;
      word-break: break-word;
    }

    .comment-card-remove {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
      opacity: 0.6;
      padding: 0.1rem 0.3rem;
    }

    .comment-card-remove:hover {
      opacity: 1;
    }

    .comment-card-screenshot {
      width: 100%;
      max-height: 100px;
      object-fit: contain;
      border-radius: 2px;
      border: 1px solid var(--hoops-neutral-border, #e0e0e0);
    }

    .comment-card-meta {
      font-size: 0.75rem;
      color: var(--hoops-neutral-foreground, #303030);
      opacity: 0.7;
      display: flex;
      gap: 0.5rem;
    }
  `;
m([
  a({ attribute: !1 })
], e.prototype, "comment", 2);
m([
  a({ type: String })
], e.prototype, "commentId", 2);
m([
  a({ type: String })
], e.prototype, "topicId", 2);
m([
  a({ attribute: !1 })
], e.prototype, "snapshotUrl", 2);
e = m([
  h("hoops-bcf-comment")
], e);
const g = e;
export {
  e as HoopsBcfCommentElement,
  g as default
};
