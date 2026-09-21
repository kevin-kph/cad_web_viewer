import { LitElement as a, nothing as p, html as h, css as v } from "lit";
import { property as i, customElement as f } from "lit/decorators.js";
import { componentBaseStyle as u } from "@ts3d-hoops/ui-kit";
var m = Object.defineProperty, g = Object.getOwnPropertyDescriptor, s = (c, o, n, r) => {
  for (var e = r > 1 ? void 0 : r ? g(o, n) : o, l = c.length - 1, d; l >= 0; l--)
    (d = c[l]) && (e = (r ? d(o, n, e) : d(e)) || e);
  return r && e && m(o, n, e), e;
};
let t = class extends a {
  constructor() {
    super(...arguments), this.nodeId = Number.NaN, this.nodeName = "", this.selected = !1;
  }
  /** @internal */
  render() {
    return Number.isNaN(this.nodeId) ? p : h`<div class="sheet-list-node ${this.selected ? "selected" : ""}">
      <div class="content">
        <div class="title">${this.nodeName}</div>
      </div>
    </div>`;
  }
};
t.styles = [
  u,
  v`
      .sheet-list-node,
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row nowrap;
      }

      .sheet-list-node.selected {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .content,
      .type-icon svg {
        width: 100%;
        height: 100%;
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
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `
];
s([
  i({ type: Number })
], t.prototype, "nodeId", 2);
s([
  i({ type: String })
], t.prototype, "nodeName", 2);
s([
  i({ type: Boolean })
], t.prototype, "selected", 2);
t = s([
  f("hoops-sheet-list-node")
], t);
export {
  t as SheetListNode
};
