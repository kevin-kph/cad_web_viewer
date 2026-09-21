import { NodeType as p } from "@ts3d-hoops/web-viewer";
import { LitElement as a, nothing as h, html as v, css as m } from "lit";
import { property as s, customElement as u } from "lit/decorators.js";
import { componentBaseStyle as y } from "@ts3d-hoops/ui-kit";
import { formatNodeType as f, formatNodeTypeIcon as b, formatNodeVisibilityIcon as g } from "./utils.js";
import { toBaseMouseEvent as N } from "@ts3d-hoops/ui-kit/tree";
var w = Object.defineProperty, x = Object.getOwnPropertyDescriptor, r = (t, e, l, n) => {
  for (var i = n > 1 ? void 0 : n ? x(e, l) : e, d = t.length - 1, c; d >= 0; d--)
    (c = t[d]) && (i = (n ? c(e, l, i) : c(i)) || i);
  return n && i && w(e, l, i), i;
};
let o = class extends a {
  constructor() {
    super(...arguments), this.nodeId = Number.NaN, this.nodeName = "", this.nodeType = p.Unknown, this.isRoot = !1, this.visibility = "Shown", this.selected = !1;
  }
  /** @internal */
  render() {
    if (Number.isNaN(this.nodeId))
      return h;
    const t = ["model-tree-node"];
    return this.selected && t.push("selected"), v`<div class=${t.join(" ")}>
      <div class="content">
        <div class="type-icon" title=${f(this.nodeType)}>
          ${b(this.isRoot, this.nodeType)}
        </div>
        <div class="title" title=${this.nodeName}>${this.nodeName}</div>
      </div>
      <div class="visible-icon" @click=${this.onVisibilityClicked}>
        ${g(this.visibility)}
      </div>
    </div>`;
  }
  /**
   * Handles a click on the visibility icon.
   * It stops the propagation of the click event and emit a
   * 'hoops-model-tree-node-visibility-change' that provides the nodeId, the new
   * visibility and `this` element itself along with some mouse event
   * properties.
   * @param {MouseEvent} event The mouse event from the click on the node
   */
  onVisibilityClicked(t) {
    t.stopPropagation();
    let e = !0;
    switch (this.visibility) {
      case "Shown":
        e = !1;
        break;
      case "Hidden":
        e = !0;
        break;
      // Show everything if some children are hidden
      case "Mixed":
        e = !0;
        break;
    }
    this.dispatchEvent(
      new CustomEvent("hoops-model-tree-node-visibility-change", {
        bubbles: !0,
        composed: !0,
        detail: {
          ...N(t),
          nodeId: this.nodeId,
          visibility: e,
          source: this
        }
      })
    );
  }
};
o.styles = [
  y,
  m`
      .model-tree-node,
      .content {
        display: flex;
        align-items: center;
        flex-flow: row nowrap;
      }

      .model-tree-node.selected {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .type-icon,
      .visible-icon {
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
      }

      .content {
        width: calc(100% - 1.8rem);
      }

      .type-icon svg,
      .visible-icon svg {
        width: 100%;
        height: 100%;
      }

      .content .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .content:hover,
      .visible-icon:hover {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        fill: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .title {
        padding-left: calc(0.4rem);
        cursor: pointer;
      }
    `
];
r([
  s({ type: Number })
], o.prototype, "nodeId", 2);
r([
  s({ type: String })
], o.prototype, "nodeName", 2);
r([
  s({ type: Number })
], o.prototype, "nodeType", 2);
r([
  s({ type: Boolean })
], o.prototype, "isRoot", 2);
r([
  s({ type: String })
], o.prototype, "visibility", 2);
r([
  s({ type: Boolean })
], o.prototype, "selected", 2);
o = r([
  u("hoops-model-tree-node")
], o);
export {
  o as ModelTreeNode
};
