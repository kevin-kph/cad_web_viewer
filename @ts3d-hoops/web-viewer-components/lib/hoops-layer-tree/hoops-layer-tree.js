import { LitElement as f, html as p, css as u } from "lit";
import { customElement as E } from "lit/decorators.js";
import { createRef as L, ref as T } from "lit/directives/ref.js";
import g, { getSanitizedLayerName as D, getAdjustedNodeId as w } from "./LayerAdapter.js";
import { componentBaseStyle as b } from "@ts3d-hoops/ui-kit";
var N = Object.defineProperty, A = Object.getOwnPropertyDescriptor, C = (e, t, r, s) => {
  for (var a = s > 1 ? void 0 : s ? A(t, r) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (a = (s ? o(t, r, a) : o(a)) || a);
  return s && a && N(t, r, a), a;
};
let d = class extends f {
  constructor() {
    super(...arguments), this.listRef = L();
  }
  /**
   * Gets the internal list component instance.
   *
   * This is a syntactic sugar to simplify getting the list element and expose it externally.
   *
   * @returns {List | undefined} The list element instance or undefined if not initialized
   */
  get layerTreeDomElement() {
    return this.listRef.value;
  }
  /**
   * Gets or sets the layers container that represents the available layers in the model.
   *
   * This is a syntactic sugar to access LayerTree.layerAdapter.layersContainer.
   * If the LayerAdapter is not set it returns undefined.
   *
   * Reassigning the layersContainer will trigger an update.
   *
   * @throws {Error} When setting layersContainer without an initialized layer adapter. This should not happen in normal use since the layerAdapter is added to the layer list at initialization.
   */
  get layersContainer() {
    var e;
    return (e = this.layerAdapter) == null ? void 0 : e.layersContainer;
  }
  set layersContainer(e) {
    const t = this.layerAdapter;
    if (!t)
      throw new Error("LayerTree.layersContainer [set]: LayerAdapter is not set.");
    t.layersContainer = e, this.layerAdapter = t;
  }
  /**
   * Gets or sets the layer adapter that supplies data to the list.
   *
   * This is a syntactic sugar to access list.context.
   * If the List is not set it returns undefined.
   *
   * Reassigning the layerAdapter will trigger an update.
   *
   * @throws {Error} When setting layerAdapater without an initialized list element. This should not happen in normal use since the list is added to the layer list at initialization.
   */
  get layerAdapter() {
    var e;
    return (e = this.layerTreeDomElement) == null ? void 0 : e.list.context;
  }
  set layerAdapter(e) {
    var a;
    if (!this.layerTreeDomElement)
      throw new Error("LayerTree.layerAdapter [set]: List element is not set.");
    const t = (a = e.layersContainer) == null ? void 0 : a.getLayers();
    t == null || t.forEach((i, o) => {
      var y, c, h;
      const n = ((c = (y = e.layersContainer) == null ? void 0 : y.getLayerAuthoredId) == null ? void 0 : c.call(y, o)) ?? null;
      i = D(i, o, n);
      const l = new Set(((h = e.layersContainer) == null ? void 0 : h.getNodesFromLayer(o, !1)) ?? []);
      if (e.layerNamesToNodeIds.has(i)) {
        const m = e.layerNamesToNodeIds.get(i) ?? /* @__PURE__ */ new Set();
        e.layerNamesToNodeIds.set(
          i,
          /* @__PURE__ */ new Set([...m, ...l])
        );
      } else
        e.layerNamesToNodeIds.set(i, l);
    });
    const r = /* @__PURE__ */ new Map();
    let s = 0;
    e.layerNamesToNodeIds.forEach((i, o) => {
      r.set(s++, o);
    }), this.layerTreeDomElement.list = { context: e }, this.layerTreeDomElement.list.context.elementsData = r, this.layerTreeDomElement.list.context.sortedByValue = !1;
  }
  /**
   * Selects or deselects layers in the list.
   *
   * Reassigning the selected layers will trigger an update.
   *
   * @param layerIds - Array of layer IDs to update
   * @param selected - Whether to select (true) or deselect (false) the layers
   * @returns {void}
   * @throws {Error} When the layer tree element is not initialized
   */
  selectElements(e, t) {
    if (!this.layerTreeDomElement)
      throw new Error("LayerTree.selectElements: layer tree element is not set.");
    let r = this.layerTreeDomElement.selected;
    t ? r = e : r = r.filter((s) => !e.includes(s)), this.layerTreeDomElement.selected = r;
  }
  /**
   * Selects or deselects nodes in the layer sublists.
   *
   * Clears existing selection and applies the new selection to all layer tree elements.
   *
   * @param nodeIds - Array of node IDs to update
   * @param selected - Whether to select (true) or deselect (false) the nodes
   * @returns {void}
   * @throws {Error} When the tree dom element is not initialized
   */
  selectNodes(e, t) {
    if (!this.layerTreeDomElement)
      throw new Error("LayerTree.selectElements: tree dom element is not set.");
    this.getLayerTreeElements().forEach((s) => {
      s.clearSelection(), s.selectNodes(e, t);
    });
  }
  /**
   * Retrieves custom data associated with a layer.
   *
   * This is a shorthand to allow users to attach reactive data to layers.
   *
   * @param layerId - The ID of the layer that owns the data
   * @returns {T} The stored custom data or undefined if no data exists
   * @throws {Error} When the layer adapter is not initialized
   */
  getElementData(e) {
    const t = this.layerAdapter;
    if (!t)
      throw new Error("LayerTree.setLayerData [set]: LayerAdapter is not set.");
    return t.layersData[e];
  }
  /**
   * Stores custom data for a layer, replacing any existing value.
   *
   * If the layer had already a value it is erased.
   * Setting layer data will trigger an update.
   *
   * @param layerId - The ID of the layer that owns the data
   * @param data - The data to store
   * @returns {void}
   * @throws {Error} When the layer adapter or tree element is not initialized
   */
  setLayerData(e, t) {
    const r = this.layerAdapter;
    if (!r)
      throw new Error("LayerTree.setLayerData [set]: LayerAdapter is not set.");
    const s = this.layerTreeDomElement;
    if (!s)
      throw new Error("LayerTree.setLayerData [set]: tree element is not set.");
    r.layersData[e] = t, s.list = { ...s.list };
  }
  /**
   * Merges custom data into an existing layer entry.
   *
   * If the layer did not have data, it is added to the context.
   * If the given data is an array and the context layer data is an array, the data passed as argument are appended to the context data.
   * If both are objects, then the objects are merged using Object.assign, with the data argument being the last object of the merge.
   * Otherwise it is equivalent to setLayerData.
   *
   * Updating layer data will trigger an update.
   *
   * @param layerId - The ID of the layer that owns the data
   * @param data - The data to merge into the layer entry
   * @returns {void}
   * @throws {Error} When the layer adapter or tree element is not initialized
   */
  updateLayerData(e, t) {
    const r = this.layerAdapter;
    if (!r)
      throw new Error("LayerTree.setLayerData [set]: LayerAdapter is not set.");
    const s = this.layerTreeDomElement;
    if (!s)
      throw new Error("LayerTree.setLayerData [set]: Tree element is not set.");
    Array.isArray(t) && Array.isArray(r.layersData[e]) ? r.layersData[e] = [...r.layersData[e], ...t] : typeof t == "object" && (!r.layersData[e] || typeof r.layersData[e] == "object") ? r.layersData[e] = Object.assign(
      r.layersData[e] ?? {},
      t
    ) : r.layersData[e] = t, r.layersData[e] = Object.assign(r.layersData[e] ?? {}, t), s.list = { ...s.list };
  }
  /**
   * Updates visibility icons for layers based on shown and hidden body IDs.
   *
   * This method propagates visibility changes to affected layer tree elements.
   *
   * @param shownBodyIds - Array of body IDs that are now visible
   * @param hiddenBodyIds - Array of body IDs that are now hidden
   * @returns {void}
   */
  updateVisibility(e, t) {
    if (!this.layerAdapter || !this.layerAdapter.layersContainer) {
      console.error(
        "Cannot update layer tree visibility icons: LayerAdapter and/or LayersContainer is not set."
      );
      return;
    }
    const r = this.getLayerTreeElements(), s = (o) => {
      var n;
      return (n = this.layerAdapter) != null && n.layersContainer ? w(this.layerAdapter.layersContainer, o) : o;
    }, a = new Set(e.map(s)), i = new Set(t.map(s));
    r.forEach((o) => {
      Array.from(o.layerNodes.keys()).some(
        (l) => a.has(l) || i.has(l)
      ) && o.updateVisibility(
        Array.from(a).filter((l) => o.layerNodes.has(l)),
        Array.from(i).filter((l) => o.layerNodes.has(l))
      );
    });
  }
  /** @internal */
  render() {
    return p`<div class="layertree-container">
      <hoops-list
        class="layertree"
        .list=${{ context: new g() }}
        ${T(this.listRef)}
        @hoops-layer-clicked=${this.onLayerClicked}
        @hoops-layer-tree-node-clicked=${this.onLayerNodeClicked}
        @hoops-layer-visibility-change=${this.onLayerVisibilityClicked}
        @hoops-layer-node-visibility-change=${this.onLayerNodeVisibilityClicked}
      ></hoops-list>
    </div>`;
  }
  /**
   * Handles layer click events and manages layer selection.
   * @internal
   * @param event - The layer clicked event
   * @returns {void}
   */
  onLayerClicked(e) {
    const t = e.detail.source;
    (e.detail.button === 0 || e.detail.button === 2 && !t.selected) && t.toggleSelection();
    const r = this.getLayerTreeElements();
    r == null || r.forEach((s) => {
      s.layerId !== e.detail.layerId && s.select(!1);
    }), this.notifyNodeSelection(e.detail);
  }
  /**
   * Retrieves all layer tree element instances from the shadow DOM.
   * @internal
   * @returns {LayerTreeElement[]} Array of layer tree elements
   */
  getLayerTreeElements() {
    var a, i;
    const e = (a = this.shadowRoot) == null ? void 0 : a.querySelector(".layertree"), t = (i = e == null ? void 0 : e.shadowRoot) == null ? void 0 : i.querySelector("div.list"), r = t == null ? void 0 : t.querySelectorAll("hoops-list-element"), s = new Array();
    return r == null || r.forEach((o) => {
      var l;
      const n = (l = o.shadowRoot) == null ? void 0 : l.querySelector(
        "div.element > div.header > hoops-layer-tree-element"
      );
      n && s.push(n);
    }), s;
  }
  /**
   * Handles layer node click events and manages node selection.
   * @internal
   * @param event - The layer tree node clicked event
   * @returns {void}
   */
  onLayerNodeClicked(e) {
    const t = e.detail.source;
    (e.detail.button === 0 || e.detail.button === 2 && !t.selectedNodes.includes(e.detail.nodeId)) && t.toggleNodeSelection(e.detail.nodeId);
    let r = !1;
    t.selectedNodes.includes(e.detail.nodeId) && (r = !0);
    const s = this.getLayerTreeElements();
    s == null || s.forEach((a) => {
      a.selectedNodes = [];
    }), r && t.selectedNodes.push(e.detail.nodeId), this.notifyNodeSelection(e.detail);
  }
  /**
   * Handles layer visibility toggle events.
   * @internal
   * @param event - The layer visibility click event
   * @returns {void}
   */
  onLayerVisibilityClicked(e) {
    e.detail.source.toggleVisibility(), this.notifyLayerVisibility(e.detail);
  }
  /**
   * Handles layer node visibility toggle events.
   * @internal
   * @param event - The layer node visibility click event
   * @returns {void}
   */
  onLayerNodeVisibilityClicked(e) {
    this.notifyLayerVisibility(e.detail);
  }
  /**
   * Dispatches a custom event to notify about node selection changes.
   * @internal
   * @param event - The base mouse event details
   * @returns {void}
   */
  notifyNodeSelection(e) {
    const t = [], r = this.getLayerTreeElements();
    r == null || r.forEach((s) => {
      t.push(...s.selectedNodes);
    }), this.dispatchEvent(
      new CustomEvent(
        "hoops-layer-tree-node-selected",
        {
          bubbles: !0,
          composed: !0,
          detail: {
            ...e,
            nodeIds: t,
            source: this
          }
        }
      )
    );
  }
  /**
   * Dispatches a custom event to notify about layer visibility changes.
   * @internal
   * @param event - The base mouse event details
   * @returns {void}
   */
  notifyLayerVisibility(e) {
    const t = this.getLayerTreeElements(), r = [];
    t.forEach((s) => {
      r.push(...s.hiddenNodes);
    }), this.dispatchEvent(
      new CustomEvent(
        "hoops-layer-tree-visibility-changed",
        {
          bubbles: !0,
          composed: !0,
          detail: {
            ...e,
            nodeIds: r,
            source: this
          }
        }
      )
    );
  }
};
d.styles = [
  b,
  u`
      .layertree-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      .layertree-options {
        display: flex;
        align-items: center;
        padding: 0.4rem 0.6rem;
        gap: 0.4rem;
        font-size: 0.85rem;
        border-bottom: 1px solid var(--hoops-neutral-stroke, #e0e0e0);
        user-select: none;
      }

      .layertree-options label {
        cursor: pointer;
      }

      .layertree {
        height: 100%;
        overflow: auto;
        width: 100%;
        flex: 1;
      }

      hoops-layer-tree-element {
        width: 100%;
      }
    `
];
d = C([
  E("hoops-layer-tree")
], d);
const j = d;
export {
  d as HoopsLayerTreeElement,
  j as default
};
