import { css as u, LitElement as x, nothing as l, html as p } from "lit";
import { property as a, customElement as f } from "lit/decorators.js";
import { consume as m } from "@lit/context";
import { treeContext as v } from "./context.js";
import { toBaseMouseEvent as h } from "./utils.js";
var y = Object.defineProperty, b = Object.getOwnPropertyDescriptor, n = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? b(t, s) : t, d = e.length - 1, c; d >= 0; d--)
    (c = e[d]) && (r = (i ? c(t, s, r) : c(r)) || r);
  return i && r && y(t, s, r), r;
};
let o = class extends x {
  constructor() {
    super(...arguments), this.key = Number.NaN, this.expanded = !1, this.selected = !1, this.leaf = !1;
  }
  /** @internal */
  render() {
    if (Number.isNaN(this.key) || !this.tree)
      return l;
    const e = ["node"];
    return this.selected && e.push("selected"), p`<div
      class=${e.join(" ")}
      @click=${this.handleNodeClick}
      @auxclick=${this.handleNodeAuxClick}
    >
      <div class="header">
        ${this.getExpandIcon()}
        <div class="header-caption">
          ${this.tree.context.getContent(
      this.tree.context,
      this.key,
      this.selected,
      this.tree.context.nodesData ? this.tree.context.nodesData[this.key] : void 0
    )}
        </div>
      </div>
      <div class=${`children ${this.expanded ? "expanded" : ""}`}>
        <slot></slot>
      </div>
    </div>`;
  }
  /**
   * Handles click on the expand icon.
   *
   * This will stop the propagation of the click and propagate a
   * hoops-tree-node-expand with information about the clicked node.
   *
   * @fires TreeNode#hoops-tree-node-expand
   *
   * @param {MouseEvent} event The event that triggered the listener.
   */
  handleExpandClick(e) {
    e.stopPropagation(), this.dispatchEvent(
      new CustomEvent(
        "hoops-tree-node-expand",
        {
          bubbles: !0,
          composed: !0,
          detail: {
            key: this.key,
            expanded: !this.expanded,
            ...h(e),
            source: this
          }
        }
      )
    );
  }
  /**
   * Handles click on the node.
   *
   * This will stop the propagation of the click and propagate a
   * hoops-tree-node-click with information about the clicked node.
   *
   * @fires TreeNode#hoops-tree-node-click
   *
   * @param {MouseEvent} event The event that triggered the listener.
   */
  handleNodeClick(e) {
    e.stopPropagation();
    const t = e.target, s = {
      key: this.key,
      ...h(e),
      source: t
    };
    this.dispatchEvent(
      new CustomEvent(
        "hoops-tree-node-click",
        {
          bubbles: !0,
          composed: !0,
          detail: s
        }
      )
    );
  }
  /**
   * Handles right click on the node.
   *
   * This will stop the propagation of the aux click and propagate a
   * hoops-tree-node-aux-click with information about the clicked node.
   *
   * @fires TreeNode#hoops-tree-node-aux-click
   *
   * @param {MouseEvent} event The event that triggered the listener.
   */
  handleNodeAuxClick(e) {
    e.stopPropagation();
    const t = e.target, s = {
      key: this.key,
      ...h(e),
      source: t
    };
    this.dispatchEvent(
      new CustomEvent(
        "hoops-tree-node-aux-click",
        {
          bubbles: !0,
          composed: !0,
          detail: s
        }
      )
    );
  }
  /**
   * Get the expand/collapse icon for a node. If a node is a leaf, it does not
   * make sense to have an expand/collapse icon but you may want to provide an
   * icon for the leafs which is supported by TreeContext
   *
   * @returns {(HTMLTemplateResult | typeof nothing)}
   */
  getExpandIcon() {
    if (!this.tree)
      return l;
    if (this.leaf)
      return p`<div class="leaf-icon">${this.tree.context.leafIcon ?? l}</div>`;
    let e = this.tree.context.collapsedIcon;
    return this.expanded && (e = this.tree.context.expandedIcon), p`<div class="expand-icon" @click=${this.handleExpandClick}>${e}</div>`;
  }
};
o.styles = [
  u`
      :host {
        display: block;
      }

      .header {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
      }

      .expand-icon,
      .leaf-icon {
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .leaf-icon {
        stroke: black;
        fill: black;
      }

      .expand-icon {
        cursor: pointer;
      }

      .expand-icon svg {
        width: 100%;
        height: 100%;
      }

      .expand-icon:hover {
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .children {
        display: none;
        padding-left: 0.5rem;
      }

      .children.expanded {
        display: block;
      }

      hoops-model-tree-node {
        width: 100%;
      }

      .node {
        color: var(--hoops-neutral-foreground-rest, color-mix(in srgb, #303030, #000000 20%));
        stroke: var(--hoops-neutral-foreground-rest, color-mix(in srgb, #303030, #000000 20%));
      }

      .node.selected {
        color: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
      }

      .header-caption {
        width: calc(100% - 1.2rem);
      }
    `
];
n([
  m({ context: v, subscribe: !0 })
], o.prototype, "tree", 2);
n([
  a({ type: Number })
], o.prototype, "key", 2);
n([
  a({ type: Boolean })
], o.prototype, "expanded", 2);
n([
  a({ type: Boolean })
], o.prototype, "selected", 2);
n([
  a({ type: Boolean })
], o.prototype, "leaf", 2);
o = n([
  f("hoops-tree-node")
], o);
export {
  o as default
};
