import { LitElement as a, nothing as v, html as p, css as h } from "lit";
import { property as l, customElement as u } from "lit/decorators.js";
import { componentBaseStyle as f } from "@ts3d-hoops/ui-kit";
var m = Object.defineProperty, w = Object.getOwnPropertyDescriptor, d = (c, r, n, t) => {
  for (var e = t > 1 ? void 0 : t ? w(r, n) : r, s = c.length - 1, i; s >= 0; s--)
    (i = c[s]) && (e = (t ? i(r, n, e) : i(e)) || e);
  return t && e && m(r, n, e), e;
};
let o = class extends a {
  constructor() {
    super(...arguments), this.nodeId = Number.NaN, this.nodeName = "";
  }
  /** @internal */
  render() {
    return Number.isNaN(this.nodeId) ? v : p`<div class="view-tree-node">
      <div class="content">
        <div class="title">${this.nodeName}</div>
      </div>
    </div>`;
  }
};
o.styles = [
  f,
  h`
      .view-tree-node,
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row nowrap;
      }

      .view-tree-node.selected {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .content,
      .type-icon svg {
        width: 100%;
        height: 100%;
      }

      .content .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .content:hover {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        fill: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .title {
        width: 100%;
        padding-left: calc(0.4rem);
        cursor: pointer;
      }
    `
];
d([
  l({ type: Number })
], o.prototype, "nodeId", 2);
d([
  l({ type: String })
], o.prototype, "nodeName", 2);
o = d([
  u("hoops-view-tree-node")
], o);
export {
  o as ViewTreeNode
};
