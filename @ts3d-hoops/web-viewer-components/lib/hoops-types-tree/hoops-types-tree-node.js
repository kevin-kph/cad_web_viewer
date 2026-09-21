import { LitElement as h, html as a, css as m } from "lit";
import { property as d, customElement as u } from "lit/decorators.js";
import { componentBaseStyle as y } from "@ts3d-hoops/ui-kit";
import { toBaseMouseEvent as c } from "@ts3d-hoops/ui-kit/tree";
import { formatNodeVisibilityIcon as v } from "../hoops-model-tree/utils.js";
var N = Object.defineProperty, b = Object.getOwnPropertyDescriptor, r = (t, e, o, n) => {
  for (var s = n > 1 ? void 0 : n ? b(e, o) : e, l = t.length - 1, p; l >= 0; l--)
    (p = t[l]) && (s = (n ? p(e, o, s) : p(s)) || s);
  return n && s && N(e, o, s), s;
};
let i = class extends h {
  constructor() {
    super(...arguments), this.nodeId = Number.NaN, this.modelNodeId = Number.NaN, this.nodeName = "", this.modelNodes = [], this.visibility = "Shown", this.onNodeClicked = (t, e) => {
      e.stopPropagation(), this.dispatchEvent(
        new CustomEvent(
          "hoops-types-tree-node-click",
          {
            bubbles: !0,
            composed: !0,
            detail: {
              nodeId: t,
              source: this,
              ...c(e)
            }
          }
        )
      );
    }, this.onTypeNodeClicked = (t, e) => {
      e.stopPropagation(), this.dispatchEvent(
        new CustomEvent("hoops-types-tree-type-node-click", {
          bubbles: !0,
          composed: !0,
          detail: {
            nodeIds: t,
            source: this,
            isTypeNode: !0,
            ...c(e)
          }
        })
      );
    }, this.onVisibilityClicked = (t) => {
      t.stopPropagation();
      const e = this.isTypeNode() ? this.modelNodes : [this.modelNodeId], o = this.visibility !== "Shown";
      this.dispatchEvent(
        new CustomEvent("hoops-types-tree-node-visibility-change", {
          bubbles: !0,
          composed: !0,
          detail: {
            nodeIds: e,
            source: this,
            visible: o,
            isTypeNode: this.isTypeNode(),
            treeNodeId: this.nodeId,
            ...c(t)
          }
        })
      );
    };
  }
  /** @internal */
  render() {
    const t = (o) => {
      Number.isNaN(this.modelNodeId) ? this.isTypeNode() && this.modelNodes.length > 0 && this.onTypeNodeClicked(this.modelNodes, o) : this.onNodeClicked(this.modelNodeId, o);
    }, e = (o) => {
      this.onVisibilityClicked(o);
    };
    return a`
      <div class="types-tree-node">
        <div class="content" @click=${t} @auxclick=${t}>
          <div class="title">${this.nodeName}</div>
        </div>
        <div class="visible-icon" @click=${e}>
          ${v(this.visibility)}
        </div>
      </div>
    `;
  }
  isTypeNode() {
    return !(typeof this.modelNodeId == "number" && !isNaN(this.modelNodeId));
  }
};
i.styles = [
  y,
  m`
      :host {
        display: block;
        width: 100%;
        user-select: none;
      }
      .types-tree-node {
        display: flex;
        align-items: center;
        flex-direction: row;
        width: 100%;
        user-select: none;
      }

      .expand-icon {
        flex-shrink: 0;
        margin-right: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .content {
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .title {
        flex: 1 1 auto;
        min-width: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: 0;
        cursor: pointer;
        user-select: none;
      }

      .visible-icon {
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
        margin-left: 0.4rem;
      }

      .types-tree-node.selected {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .content:hover {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        fill: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }
    `
];
r([
  d({ type: Number })
], i.prototype, "nodeId", 2);
r([
  d({ type: Number })
], i.prototype, "modelNodeId", 2);
r([
  d({ type: String })
], i.prototype, "nodeName", 2);
r([
  d({ type: Array })
], i.prototype, "modelNodes", 2);
r([
  d({ type: String })
], i.prototype, "visibility", 2);
i = r([
  u("hoops-types-tree-node")
], i);
export {
  i as TypeTreeNodeElement
};
