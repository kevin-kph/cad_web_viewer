import { LitElement as u, nothing as p, html as a, css as m } from "lit";
import { property as n, customElement as N } from "lit/decorators.js";
import { componentBaseStyle as f } from "@ts3d-hoops/ui-kit";
import { formatLayersIcon as v, formatNodeIcon as g, rightArrowIcon as b, downArrowIcon as E } from "./utils.js";
import { toBaseMouseEvent as c } from "@ts3d-hoops/ui-kit/tree";
import { visibleIcon as y, halfVisibleIcon as C, hiddenIcon as $ } from "@ts3d-hoops/ui-kit/icons";
var k = Object.defineProperty, w = Object.getOwnPropertyDescriptor, l = (e, s, o, i) => {
  for (var t = i > 1 ? void 0 : i ? w(s, o) : s, r = e.length - 1, h; r >= 0; r--)
    (h = e[r]) && (t = (i ? h(s, o, t) : h(t)) || t);
  return i && t && k(s, o, t), t;
};
let d = class extends u {
  constructor() {
    super(...arguments), this.layerId = Number.NaN, this.layerName = "", this.hiddenNodes = [], this.selected = !1, this.selectedNodes = [], this.layerNodes = /* @__PURE__ */ new Map(), this.expanded = !1, this.nodesChildren = /* @__PURE__ */ new Map();
  }
  /** @internal */
  render() {
    if (Number.isNaN(this.layerId))
      return p;
    const e = ["layer-tree-element"];
    this.selected && e.push("selected");
    const s = [], o = /* @__PURE__ */ new Set();
    this.nodesChildren.forEach((t) => {
      t.forEach((r) => o.add(r));
    }), this.layerNodes.forEach((t, r) => {
      o.has(r) || s.push(this.getNodeHtml(r, t));
    });
    const i = ["layer-node-list"];
    return this.expanded || i.push("collapsed"), a` <div class=${e.join(" ")}>
      <div class="header">
        ${this.getExpandIcon()}
        <div class="layer-icon">${v()}</div>
        <div class="content" @click=${this.onLayerClicked} @auxclick=${this.onLayerClicked}>
          <div class="title">${this.layerName}</div>
        </div>
        <div class="visible-icon" @click=${this.onVisibilityClicked}>
          ${this.formatLayerVisibilityIcon()}
        </div>
      </div>
      <div class=${i.join(" ")}>${s}</div>
    </div>`;
  }
  formatLayerVisibilityIcon() {
    if (this.hiddenNodes.length <= 0)
      return a`${y}`;
    const e = Array.from(this.layerNodes.keys());
    if (e.length !== this.hiddenNodes.length)
      return this.hiddenNodes.some((i) => e.includes(i)) ? a`${C}` : a`${y}`;
    const s = [...e].sort(), o = [...this.hiddenNodes].sort();
    return s.every((i, t) => i === o[t]) ? a`${$}` : p;
  }
  toggleSelection() {
    this.select(!this.selected);
  }
  select(e) {
    this.selectNodes([...this.layerNodes.keys()], e), this.selected = e;
  }
  clearSelection() {
    this.selectedNodes = [], this.updateLayerElementSelection();
  }
  updateVisibility(e, s) {
    this.hiddenNodes = Array.from(/* @__PURE__ */ new Set([...this.hiddenNodes, ...s])), this.layerNodes.forEach((o, i) => {
      e.includes(i) && (this.hiddenNodes = this.hiddenNodes.filter((t) => t !== i));
    });
  }
  selectNodes(e, s) {
    if (this.getLayerNodeIds().some((i) => e.includes(i))) {
      if (s) {
        const i = new Array();
        e.forEach((t) => {
          this.nodesChildren.has(t) && i.push(...this.nodesChildren.get(t) ?? []);
        }), this.selectedNodes = [...e, ...i];
      } else
        this.selectedNodes = this.selectedNodes.filter((i) => !e.includes(i));
      this.updateLayerElementSelection();
    }
  }
  toggleNodeSelection(e) {
    this.selectedNodes.includes(e) ? this.selectedNodes = this.selectedNodes.filter((s) => s !== e) : this.selectedNodes.push(e), this.updateLayerElementSelection();
  }
  toggleVisibility() {
    this.hiddenNodes.length > 0 ? this.hiddenNodes = [] : this.hiddenNodes = [...this.layerNodes.keys()];
  }
  updateLayerElementSelection() {
    this.selected = this.selectedNodes.length > 0;
  }
  getLayerNodeIds() {
    return Array.from(this.layerNodes.keys());
  }
  getNodeHtml(e, s) {
    const o = ["layer-node-element"];
    this.selectedNodes.includes(e) && o.push("selected");
    const i = this.hiddenNodes.includes(e);
    return a`<div
      class="${o.join(" ")}"
      nodeId=${e}
      @click=${(t) => this.onLayerNodeClicked(t, e)}
      @auxclick=${(t) => this.onLayerNodeClicked(t, e)}
    >
      <div class="layer-node-icon">${g()}</div>
      <div class="layer-node-title">${s}</div>
      <hoops-icon
        class="visible-icon"
        icon="${i ? "hiddenIcon" : "visibleIcon"}"
        @click=${(t) => this.onNodeVisibilityClicked(t, e)}
      >
      </hoops-icon>
    </div>`;
  }
  /**
   * Get the expand/collapse icon for a layer node.
   *
   * @returns {(HTMLTemplateResult | typeof nothing)}
   */
  getExpandIcon() {
    let e = b();
    return this.expanded && (e = E()), a`<div class="expand-icon" @click=${this.handleExpandClick}>${e}</div>`;
  }
  /**
   * Handles click on the expand icon.
   *
   * This will stop the propagation of the click and update
   * its expanded status
   *
   * @param {MouseEvent} event The event that triggered the listener.
   */
  handleExpandClick(e) {
    e.stopPropagation(), this.expanded = !this.expanded;
  }
  /**
   * Handles a click on the visibility icon.
   * It stops the propagation of the click event and emit a
   * 'hoops-layer-visibility-change' that provides the layerId, the new
   * visibility and `this` element itself along with some mouse event
   * properties.
   * @param {MouseEvent} event The mouse event from the click on the layer
   */
  onVisibilityClicked(e) {
    e.stopPropagation();
    const s = this.hiddenNodes.length > 0;
    this.dispatchEvent(
      new CustomEvent("hoops-layer-visibility-change", {
        bubbles: !0,
        composed: !0,
        detail: {
          ...c(e),
          layerId: this.layerId,
          visibility: !s,
          source: this
        }
      })
    );
  }
  /**
   * Handles a click on the node visibility icon.
   * It stops the propagation of the click event and emit a
   * 'hoops-layer-node-visibility-change' that provides the nodeId, the new
   * visibility and `this` element itself along with some mouse event
   * properties.
   * @param {MouseEvent} event The mouse event from the click on the layer
   */
  onNodeVisibilityClicked(e, s) {
    e.stopPropagation(), this.hiddenNodes.includes(s) ? this.hiddenNodes = this.hiddenNodes.filter((o) => o != s) : (this.hiddenNodes.push(s), this.hiddenNodes = [...this.hiddenNodes]), this.dispatchEvent(
      new CustomEvent(
        "hoops-layer-node-visibility-change",
        {
          bubbles: !0,
          composed: !0,
          detail: {
            ...c(e),
            nodeIds: this.hiddenNodes,
            source: this
          }
        }
      )
    );
  }
  /**
   * Handles a click on a node in the list.
   * It stops the propagation of the click event and emit a
   * 'hoops-layer-tree-node-clicked' that provides the nodeId
   * and `this` element itself along with some mouse event
   * properties.
   * @param {MouseEvent} event The mouse event from the click on the layer
   */
  onLayerNodeClicked(e, s) {
    e.stopPropagation(), this.dispatchEvent(
      new CustomEvent(
        "hoops-layer-tree-node-clicked",
        {
          bubbles: !0,
          composed: !0,
          detail: {
            ...c(e),
            layerId: this.layerId,
            nodeId: s,
            source: this
          }
        }
      )
    );
  }
  /**
   * Handles a click on a single layer list element
   * It stops the propagation of the click event and emit a
   * 'hoops-layer-clicked' that provides the nodeId
   * and `this` element itself along with some mouse event
   * properties.
   * @param {MouseEvent} event The mouse event from the click on the layer
   */
  onLayerClicked(e) {
    e.stopPropagation(), this.dispatchEvent(
      new CustomEvent(
        "hoops-layer-clicked",
        {
          bubbles: !0,
          composed: !0,
          detail: {
            ...c(e),
            layerId: this.layerId,
            source: this
          }
        }
      )
    );
  }
};
d.styles = [
  f,
  m`
      :host {
        width: 100%;
      }

      .layer-tree-element {
        width: 100%;
        user-select: none;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row nowrap;
      }

      .type-icon,
      .visible-icon,
      .layer-icon,
      .layer-node-icon,
      .expand-icon {
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
      }

      .content {
        flex: 1;
      }

      .type-icon svg,
      .visible-icon svg,
      .layer-icon svg,
      .layer-node-icon svg,
      .expand-icon svg {
        width: 100%;
        height: 100%;
      }

      .layer-node-list {
        margin-left: 1rem;
      }

      .layer-node-list.collapsed {
        display: none;
      }

      .layer-node-element {
        display: flex;
        align-items: center;
      }

      .layer-tree-element.selected,
      .layer-node-element.selected {
        color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
      }

      .layer-node-element:not(.selected) {
        color: var(--hoops-neutral-foreground, #303030);
        stroke: var(--hoops-neutral-foreground, #303030);
      }

      .title,
      .layer-node-title {
        width: 100%;
        padding-left: calc(0.4rem);
        cursor: pointer;
      }
    `
];
l([
  n({ type: Number })
], d.prototype, "layerId", 2);
l([
  n({ type: String })
], d.prototype, "layerName", 2);
l([
  n({ type: Array })
], d.prototype, "hiddenNodes", 2);
l([
  n({ type: Boolean })
], d.prototype, "selected", 2);
l([
  n({ type: Array })
], d.prototype, "selectedNodes", 2);
l([
  n({ type: Object })
], d.prototype, "layerNodes", 2);
l([
  n({ type: Boolean })
], d.prototype, "expanded", 2);
l([
  n({ type: Map })
], d.prototype, "nodesChildren", 2);
d = l([
  N("hoops-layer-tree-element")
], d);
export {
  d as LayerTreeElement
};
