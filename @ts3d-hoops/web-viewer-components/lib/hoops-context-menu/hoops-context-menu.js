import { LitElement as S, html as V, css as N } from "lit";
import { property as d, customElement as E } from "lit/decorators.js";
import { ElementType as x, OperatorId as b, Color as g, Selection as m } from "@ts3d-hoops/web-viewer";
import { IsolateZoomHelper as w } from "./IsolateZoomHelper.js";
import "../services/index.js";
import { getService as F } from "../services/serviceRegistry.js";
var k = Object.defineProperty, M = Object.getOwnPropertyDescriptor, c = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? M(t, i) : t, r = e.length - 1, n; r >= 0; r--)
    (n = e[r]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && k(t, i, o), o;
};
let l = class extends S {
  constructor() {
    super(...arguments), this.x = 0, this.y = 0, this.activeItemId = null, this.activeLayerName = null, this.activeType = null, this.position = null, this.color = "#ff0000", this.isUnsettingColor = !1, this.handleServiceUpdate = () => this.requestUpdate();
  }
  /** @internal */
  render() {
    const e = this.isMenuItemExecutable() ? "context-menu-item" : "context-menu-item disabled", t = this.isHandleExecutable() ? "context-menu-item" : "context-menu-item disabled", i = this.isMenuItemVisible() ? "Hide" : "Show", s = this.isUnsettingColor ? "Unset Color" : "Set Color";
    return V`
      <div class="context-menu">
        <div class="${e}" @click=${this.isolateFunc}>Isolate</div>
        <div class="${e}" @click=${this.zoomFunc}>Zoom</div>
        <div class="${e}" @click=${this.visibilityFunc}>${i}</div>
        <hr />
        <div class="${e}" @click=${this.transparentFunc}>Transparent</div>
        <hr />
        <div class="color-picker-container">
          <div class="${e}" @click=${this.setColorFunc}>${s}</div>
          <input
            type="color"
            id="favcolor"
            name="favcolor"
            value="${this.color}"
            @input="${this.handleColorChange}"
          />
        </div>
        <hr />
        <div class="${t}" @click=${this.handlesFunc}>Show Handles</div>
        <div class="context-menu-item" @click=${this.resetFunc}>Reset Model</div>
        <hr />
        <div class="context-menu-item" @click=${this.showAllFunc}>Show All</div>
        <slot></slot>
      </div>
    `;
  }
  /**
   * Handles color picker input change events.
   *
   * Updates the component's color property when the user selects a new color
   * from the color picker input element.
   *
   * @internal
   * @param event - The input change event from the color picker
   * @returns {void}
   */
  handleColorChange(e) {
    const t = e.target;
    this.color = t.value;
  }
  /**
   * Handles component updates and positions the menu within viewport bounds.
   *
   * Automatically repositions the menu if it would extend beyond window boundaries
   * and updates the color state based on current context.
   *
   * @param _changedProperties - Map of changed properties (unused)
   * @returns {void}
   */
  updated(e) {
    var i;
    if (!this.webViewer || !this.model)
      return;
    this.style.left = `${this.x}px`, this.style.top = `${this.y}px`;
    const t = (i = this.shadowRoot) == null ? void 0 : i.querySelector(".context-menu");
    if (t) {
      const s = t.getBoundingClientRect();
      s.right > window.innerWidth ? this.style.left = `${this.x - s.width}px` : this.style.left = `${this.x}px`, s.bottom > window.innerHeight ? this.style.top = `${this.y - s.height}px` : this.style.top = `${this.y}px`, this.updateIsUnsettingColor();
    } else
      console.error("menu not found");
  }
  /**
   * Updates the color operation state based on current context items.
   *
   * Determines whether the color action should be "Set Color" or "Unset Color"
   * based on whether the selected items already have the current color applied.
   *
   * @returns {Promise<void>}
   */
  async updateIsUnsettingColor() {
    const e = this.getContextItemIds(!0, !0, !1);
    e.length > 0 ? await this._isColorSet(e) ? this.isUnsettingColor = !0 : this.isUnsettingColor = !1 : this.isUnsettingColor = !1;
  }
  /**
   * Gets or sets the context menu model interface.
   *
   * The model provides access to 3D model operations like visibility, color, and node queries.
   * Setting a new model triggers helper recreation and component updates.
   *
   * @returns {IContextMenuModel | undefined} The current model instance or undefined
   */
  get contextMenuModel() {
    return this.model;
  }
  /**
   * Sets the context menu model interface.
   *
   * @param model - The model instance to use for 3D operations
   * @returns {void}
   */
  set contextMenuModel(e) {
    const t = this.model;
    this.model = e, this.requestUpdate("model", t), this.createIsolateZoomHelper();
  }
  /**
   * Gets or sets the web viewer interface for context menu operations.
   *
   * The web viewer provides access to selection management, operators, and view controls.
   * Setting a new web viewer triggers helper recreation and component updates.
   *
   * @returns {IContextMenuWebViewer | undefined} The current web viewer instance or undefined
   */
  get contextMenuWebViewer() {
    return this.webViewer;
  }
  /**
   * Sets the web viewer interface for context menu operations.
   *
   * @param webViewer - The web viewer instance to use for operations
   * @returns {void}
   */
  set contextMenuWebViewer(e) {
    const t = this.webViewer;
    this.webViewer = e, this.requestUpdate("webViewer", t), this.createIsolateZoomHelper();
  }
  /**
   * Notifies parent components that a context menu item was clicked.
   *
   * Dispatches a custom event to inform listeners that any context menu action
   * was executed, allowing parent components to respond appropriately (e.g., hide menu).
   *
   * @internal
   * @returns {void}
   */
  notifyItemClicked() {
    this.dispatchEvent(
      new CustomEvent("context-menu-item-clicked", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Determines if the context menu items should show as visible/hidden.
   *
   * Checks the visibility state of active items, layers, and types to determine
   * whether the visibility toggle should show "Hide" or "Show" text.
   *
   * @internal
   * @returns {boolean} True if any active context items are currently visible
   */
  isMenuItemVisible() {
    const e = this.isItemVisible(this.activeItemId), t = this.isLayerVisibile(this.activeLayerName), i = this.isTypeVisible(this.activeType);
    return e || t || i;
  }
  /**
   * Creates a new IsolateZoomHelper instance when both webViewer and model are available.
   *
   * Initializes the helper class that provides isolate and zoom functionality
   * for context menu operations. Called when model or webViewer properties change.
   *
   * @internal
   * @returns {void}
   */
  createIsolateZoomHelper() {
    this.webViewer && this.model && (this.isolateZoomHelper = new w(this.webViewer, this.model));
  }
  /**
   * Lifecycle callback when component is added to the DOM.
   *
   * Sets up event listeners for context menu prevention and explode service events.
   *
   * @returns {void}
   */
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("contextmenu", this._handleContextMenu), this.explodeService = F("ExplodeService"), this.explodeService.addEventListener("hoops-explode-service-reset", this.handleServiceUpdate), this.explodeService.addEventListener("hoops-explode-started", this.handleServiceUpdate), this.explodeService.addEventListener("hoops-explode-stopped", this.handleServiceUpdate);
  }
  /**
   * Lifecycle callback when component is removed from the DOM.
   *
   * Cleans up event listeners for context menu prevention and explode service events.
   *
   * @returns {void}
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("contextmenu", this._handleContextMenu), this.explodeService && (this.explodeService.removeEventListener(
      "hoops-explode-service-reset",
      this.handleServiceUpdate
    ), this.explodeService.removeEventListener("hoops-explode-started", this.handleServiceUpdate), this.explodeService.removeEventListener("hoops-explode-stopped", this.handleServiceUpdate));
  }
  /**
   * Prevents the browser's default context menu from appearing.
   *
   * Intercepts right-click context menu events to ensure only the custom
   * hoops context menu is shown, preventing conflicts with browser menus.
   *
   * @internal
   * @param event - The right-click mouse event to prevent
   * @returns {void}
   */
  _handleContextMenu(e) {
    e.preventDefault();
  }
  /**
   * Checks if all provided nodes are IFC space elements.
   *
   * Determines whether the given node IDs all represent IFCSPACE elements,
   * which may require special handling in certain operations.
   *
   * @internal
   * @param nodeIds - Array of node IDs to check
   * @returns {boolean} True if all nodes are IFC space elements
   */
  isAllIfcSpace(e) {
    return e.every((t) => {
      var i;
      return (i = this.model) == null ? void 0 : i.hasEffectiveGenericType(t, "IFCSPACE");
    });
  }
  /**
   * Determines if context menu items should be executable/enabled.
   *
   * Checks if there are any active context items (selected nodes, active layer,
   * active type, or current selections) that would make menu operations valid.
   *
   * @internal
   * @returns {boolean} True if menu items can be executed based on current context
   */
  isMenuItemExecutable() {
    return this.webViewer ? this.activeItemId !== null || this.activeLayerName !== null || this.activeType !== null || this.webViewer.selectionManager.size() > 0 : !1;
  }
  /**
   * Determines if handle operations should be executable/enabled.
   *
   * Checks if menu items are executable and explode mode is not currently active,
   * as handles cannot be used during model explosion.
   *
   * @internal
   * @returns {boolean} True if handle operations can be executed
   */
  isHandleExecutable() {
    return this.isMenuItemExecutable() && !this.explodeService.getActive();
  }
  /**
   * Executes the isolate operation on context items.
   *
   * Hides all model elements except the currently active context items,
   * providing a focused view. Special handling for IFC space elements.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async isolateFunc() {
    var e;
    if (this.isMenuItemExecutable()) {
      this.notifyItemClicked();
      const t = this.getContextItemIds(!0, !0);
      await ((e = this.isolateZoomHelper) == null ? void 0 : e.isolateNodes(
        t,
        this.isAllIfcSpace(t) ? !1 : null
      ));
    }
  }
  /**
   * Executes the zoom-to-fit operation on context items.
   *
   * Adjusts the camera view to fit all currently active context items
   * within the viewport bounds for optimal viewing.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async zoomFunc() {
    var e;
    this.isMenuItemExecutable() && (this.notifyItemClicked(), await ((e = this.isolateZoomHelper) == null ? void 0 : e.fitNodes(this.getContextItemIds(!0, !0))));
  }
  /**
   * Traverses the model hierarchy to find the first leaf node.
   *
   * Recursively drills down through the node hierarchy to find a leaf node
   * (a node with no children), used for opacity and property queries.
   *
   * @internal
   * @param nodeId - The starting node ID to drill down from
   * @returns {NodeId} The ID of the first encountered leaf node
   */
  drillNodes(e) {
    const t = this.model.getNodeChildren(e);
    return t.length === 0 ? e : this.drillNodes(t[0]);
  }
  /**
   * Toggles the visibility of context items.
   *
   * Shows or hides the currently active context items based on their current
   * visibility state. Special handling for IFC space elements.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async visibilityFunc() {
    var e;
    if (this.isMenuItemExecutable()) {
      const t = !this.isMenuItemVisible(), i = this.getContextItemIds(!0, !0);
      this.notifyItemClicked(), await ((e = this.model) == null ? void 0 : e.setNodesVisibility(
        i,
        t,
        this.isAllIfcSpace(i) ? !1 : null
      )), this.requestUpdate();
    }
  }
  /**
   * Toggles transparency on context items.
   *
   * Sets context items to 50% opacity if they are currently opaque (opacity = 1 or null),
   * or resets them to full opacity if they are currently transparent.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async transparentFunc() {
    var e, t;
    if (this.isMenuItemExecutable()) {
      const i = this.getContextItemIds(!0, !0), s = this.drillNodes(i[0]), o = (await this.model.getNodesEffectiveOpacity([s], x.Faces))[0];
      o === null || o === 1 ? (e = this.model) == null || e.setNodesOpacity(i, 0.5) : (t = this.model) == null || t.resetNodesOpacity(i), this.notifyItemClicked();
    }
  }
  /**
   * Adds interactive handles to context items for manipulation.
   *
   * Creates 3D manipulation handles on the currently selected context items,
   * allowing users to interactively move, rotate, or scale objects. Only works
   * when explode mode is not active.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async handlesFunc() {
    var e;
    if (this.isHandleExecutable()) {
      const t = (e = this.webViewer) == null ? void 0 : e.view.operatorManager.getOperator(b.Handle), i = this.getContextItemIds(!0, !0, !1);
      i.length > 0 && (this.notifyItemClicked(), await (t == null ? void 0 : t.addHandles(i, this.position)));
    }
  }
  /**
   * Resets the entire model to its initial state.
   *
   * Performs a comprehensive reset including:
   * - Removes all manipulation handles
   * - Resets model visibility, colors, and transformations
   * - Clears face color overrides
   * - Resets PMI color override settings
   *
   * @internal
   * @returns {Promise<void>}
   */
  async resetFunc() {
    var t, i, s, o;
    this.notifyItemClicked();
    const e = (t = this.webViewer) == null ? void 0 : t.view.operatorManager.getOperator(b.Handle);
    await (e == null ? void 0 : e.removeHandles()), await ((i = this.model) == null ? void 0 : i.reset()), (s = this.model) == null || s.unsetNodesFaceColor([this.model.getAbsoluteRootNode()]), (o = this.model) == null || o.setPmiColorOverride(this.model.getPmiColorOverride());
  }
  /**
   * Sets the mesh level for context items.
   *
   * Updates the level of detail for mesh rendering on the currently selected
   * or context items if menu operations are executable.
   *
   * @param meshLevel - The mesh level to apply (higher = more detailed)
   * @returns {void}
   */
  meshLevelFunc(e) {
    var t;
    this.isMenuItemExecutable() && ((t = this.model) == null || t.setMeshLevel(this.getContextItemIds(!0, !0), e));
  }
  /**
   * Shows all model elements and fits them in the view.
   *
   * Restores visibility to all previously hidden elements and adjusts
   * the camera view to fit the entire model within the viewport.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async showAllFunc() {
    var e;
    this.notifyItemClicked(), await ((e = this.isolateZoomHelper) == null ? void 0 : e.showAll());
  }
  /**
   * Sets or unsets the face color for context items.
   *
   * Applies the current color picker value to context items if setting color,
   * or removes color overrides if unsetting color. The operation mode is
   * determined by the isUnsettingColor state.
   *
   * @internal
   * @returns {Promise<void>}
   */
  async setColorFunc() {
    var e, t;
    if (this.isMenuItemExecutable()) {
      const i = this.getContextItemIds(!0, !0, !1);
      this.isUnsettingColor ? (e = this.model) == null || e.unsetNodesFaceColor(i) : (t = this.model) == null || t.setNodesFaceColor(i, g.fromHexString(this.color)), this.notifyItemClicked();
    }
  }
  /**
   * Checks if the current color is already set on the provided context items.
   *
   * Determines whether all the given node IDs already have the current color
   * applied to their faces, which affects whether the color action should be
   * "Set Color" or "Unset Color".
   *
   * @internal
   * @param contextItemIds - Array of node IDs to check for color state
   * @returns {Promise<boolean>} True if the current color is set on all items
   */
  async _isColorSet(e) {
    var i;
    let t = !0;
    for (let s = 0; s < e.length; ++s) {
      const o = await ((i = this.model) == null ? void 0 : i.getNodeColorMap(e[s], x.Faces)) ?? /* @__PURE__ */ new Map();
      if (o.size === 0)
        return !1;
      o.forEach((r) => {
        r.equals(g.fromHexString(this.color)) || (t = !1);
      });
    }
    return t;
  }
  /**
   * Checks the visibility state of a specific node item.
   *
   * Determines if the given node ID is currently visible in the model.
   * If nodeId is null, checks the first selected item instead.
   *
   * @internal
   * @param nodeId - The node ID to check visibility for, or null to check first selection
   * @returns {boolean} True if the item is visible, false otherwise
   */
  isItemVisible(e) {
    var t, i, s;
    if (e === null) {
      const o = (t = this.webViewer) == null ? void 0 : t.selectionManager.getResults();
      if ((o == null ? void 0 : o.length) === 0)
        return !1;
      e = ((i = o == null ? void 0 : o.at(0)) == null ? void 0 : i.getNodeId()) ?? null;
    }
    return e ? ((s = this.model) == null ? void 0 : s.getNodeVisibility(e)) ?? !1 : !1;
  }
  /**
   * Checks if any nodes in the specified layer are visible.
   *
   * Iterates through all layer IDs matching the layer name and checks
   * if any nodes within those layers are currently visible.
   *
   * @internal
   * @param layerName - The name of the layer to check visibility for
   * @returns {boolean} True if any nodes in the layer are visible
   */
  isLayerVisibile(e) {
    var t, i, s;
    if (e) {
      const o = (t = this.model) == null ? void 0 : t.getLayerIdsFromName(e);
      if (o)
        for (const r of o) {
          const n = (i = this.model) == null ? void 0 : i.getNodesFromLayer(r);
          if (n) {
            for (const p of n)
              if ((s = this.model) != null && s.getNodeVisibility(p))
                return !0;
          }
        }
    }
    return !1;
  }
  /**
   * Checks if any nodes of the specified generic type are visible.
   *
   * Iterates through all nodes matching the generic type and checks
   * if any of them are currently visible in the model.
   *
   * @internal
   * @param genericType - The generic type to check visibility for
   * @returns {boolean} True if any nodes of the type are visible
   */
  isTypeVisible(e) {
    var i;
    let t = !1;
    if (e !== null) {
      const s = (i = this.model) == null ? void 0 : i.getNodesByGenericType(e);
      s && s.forEach((o) => {
        var r;
        t = ((r = this.model) == null ? void 0 : r.getNodeVisibility(o)) ?? !1;
      });
    }
    return t;
  }
  /**
   * Retrieves the node IDs that are currently in context for operations.
   *
   * Collects node IDs from various sources based on the provided parameters:
   * selected items, clicked items, active layer, and active type. This method
   * determines which nodes should be affected by context menu operations.
   *
   * @param includeSelected - Whether to include currently selected nodes
   * @param includeClicked - Whether to include the clicked/active node
   * @param includeRoot - Whether to include root nodes in the results
   * @returns {NodeId[]} Array of node IDs that are in context for operations
   */
  getContextItemIds(e, t, i = !0) {
    var p, f, v, y;
    const s = (p = this.webViewer) == null ? void 0 : p.selectionManager, o = this.model, r = o == null ? void 0 : o.getAbsoluteRootNode(), n = [];
    if (e) {
      const a = s == null ? void 0 : s.getResults();
      for (const u of (a == null ? void 0 : a.values()) ?? []) {
        const h = u.getNodeId();
        o && (i || !i && h !== r) && n.push(h);
      }
    }
    if (this.activeLayerName !== null) {
      const a = (f = this.model) == null ? void 0 : f.getLayerIdsFromName(this.activeLayerName);
      if (a)
        for (const u of a) {
          const h = (v = this.model) == null ? void 0 : v.getNodesFromLayer(u);
          if (h)
            for (const I of h) {
              const C = m.SelectionItem.create(I);
              s != null && s.contains(C) || n.push(I);
            }
        }
    }
    if (this.activeType !== null) {
      const a = (y = this.model) == null ? void 0 : y.getNodesByGenericType(this.activeType);
      a && a.forEach((u) => {
        const h = m.SelectionItem.create(u);
        s != null && s.contains(h) || n.push(u);
      });
    }
    if (this.activeItemId !== null) {
      const a = m.SelectionItem.create(this.activeItemId), u = (s == null ? void 0 : s.containsParent(a)) !== null, h = n.indexOf(this.activeItemId) !== -1;
      t && (i || !i && this.activeItemId !== r && (n.length === 0 || !h && !u)) && n.push(this.activeItemId);
    }
    return n;
  }
};
l.styles = N`
    :host {
      background-color: var(--hoops-neutral-background-20, #fafafa);
      position: fixed;
      z-index: 1000;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
      padding: 0.3rem;
    }

    .context-menu-item {
      display: block;
      white-space: nowrap;
      user-select: none;
    }

    .context-menu-item:not(.disabled) {
      cursor: pointer;
    }

    .context-menu-item:not(.disabled):hover {
      color: var(--hoops-accent-foreground-hover, var(--blue, #0078d4));
    }

    .context-menu-item.disabled {
      color: var(
        --hoops-accent-foreground-disabled,
        color-mix(in srgb, var(--hoops-neutral-background, #fafafa), #0078d4 50%)
      );
      cursor: default;
    }

    .color-picker-container {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .color-picker-container > .context-menu-item {
      display: inline-flex;
      justify-content: space-between;
      vertical-align: middle;
      padding-right: 0.3rem;
    }

    input[type='color'] {
      padding: 0;
      height: 1.2rem;
      width: 1.2rem;
      cursor: pointer;
      border-radius: 50%;
      border: none;
      box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5);
      margin-left: auto;
    }

    input[type='color']::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    input[type='color']::-webkit-color-swatch {
      border: none;
    }
  `;
c([
  d({ type: Number })
], l.prototype, "x", 2);
c([
  d({ type: Number })
], l.prototype, "y", 2);
c([
  d({ type: w })
], l.prototype, "isolateZoomHelper", 2);
c([
  d({ type: String })
], l.prototype, "activeItemId", 2);
c([
  d({ type: String })
], l.prototype, "activeLayerName", 2);
c([
  d({ type: String })
], l.prototype, "activeType", 2);
c([
  d({ type: Object })
], l.prototype, "position", 2);
c([
  d({ type: String })
], l.prototype, "color", 2);
c([
  d({ type: Object })
], l.prototype, "model", 2);
c([
  d({ type: Object })
], l.prototype, "webViewer", 2);
c([
  d({ type: Boolean })
], l.prototype, "isUnsettingColor", 2);
l = c([
  E("hoops-context-menu")
], l);
export {
  l as HoopsContextMenuElement
};
