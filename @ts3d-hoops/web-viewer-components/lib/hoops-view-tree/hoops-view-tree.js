import { LitElement as w, html as p, css as d } from "lit";
import { customElement as m } from "lit/decorators.js";
import { createRef as h, ref as c } from "lit/directives/ref.js";
import { ViewTreeNodeId as i, ViewAdapter as f } from "./ViewAdapter.js";
import { componentBaseStyle as E } from "@ts3d-hoops/ui-kit";
var v = Object.defineProperty, u = Object.getOwnPropertyDescriptor, A = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? u(t, r) : t, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (o = (s ? l(t, r, o) : l(o)) || o);
  return s && o && v(t, r, o), o;
};
let n = class extends w {
  constructor() {
    super(...arguments), this.treeRef = h();
  }
  /**
   * Gets the internal tree component element.
   * Provides access to the underlying tree functionality.
   * @returns {Tree | undefined} The tree element instance or undefined if not initialized
   */
  get treeElement() {
    return this.treeRef.value;
  }
  /**
   * Gets the currently selected view nodes.
   * @returns {number[]} Array of selected node IDs
   */
  get selected() {
    var e;
    return ((e = this.treeElement) == null ? void 0 : e.selected) ?? [];
  }
  /**
   * Sets the currently selected view nodes.
   * @param value - Array of node IDs to select
   * @returns {void}
   * @throws {Error} When setting selected nodes before tree initialization
   */
  set selected(e) {
    if (!this.treeElement)
      throw new Error("HoopsViewTree.selected [set]: Tree element is not set.");
    this.treeElement.selected = e;
  }
  /**
   * The IModel interface that represents the Model.
   *
   * This is a syntactic sugar to access HoopsViewTree.viewAdapter.model.
   * If the ViewAdapter is not set it returns an undefined.
   *
   * Reassigning the model will trigger an update.
   *
   * Trying to set the model while the viewAdapter is not set would result in
   * an error being thrown.
   *
   * This should not happen in a normal use case since the viewAdapter is added
   * to the view tree at initialization.
   *
   * @return {(IModel | undefined)} The current model instance or undefined
   */
  get model() {
    var e;
    return (e = this.viewAdapter) == null ? void 0 : e.model;
  }
  /**
   * Sets the model instance for view data.
   * Setting a new model will refresh the tree view.
   * @param model - The model instance to set
   * @returns {void}
   * @throws {Error} When setting model before view adapter initialization
   */
  set model(e) {
    const t = this.viewAdapter;
    if (!t)
      throw new Error("HoopsViewTree.model [set]: ViewAdapter is not set.");
    t.model = e, this.viewAdapter = t, this.resetTree();
  }
  /**
   * Gets the view adapter that manages tree data and operations.
   * @returns {ViewAdapter | undefined} The current view adapter or undefined
   */
  get viewAdapter() {
    var e;
    return (e = this.treeElement) == null ? void 0 : e.tree.context;
  }
  /**
   * Sets the view adapter that manages tree data and operations.
   * The adapter handles communication between the tree component and the model.
   * @param value - The view adapter to set
   * @returns {void}
   * @throws {Error} When setting adapter before tree initialization
   */
  set viewAdapter(e) {
    if (!this.treeElement)
      throw new Error("HoopsViewTree.viewAdapter [set]: Tree element is not set.");
    this.treeElement.tree = { context: e };
  }
  /**
   * Selects or deselects view nodes in the tree.
   * @param nodeIds - Array of node IDs to select or deselect
   * @param selected - Whether to select (true) or deselect (false) the nodes
   * @returns {void}
   * @throws {Error} When tree element is not initialized
   */
  selectNodes(e, t) {
    if (!this.treeElement)
      throw new Error("HoopsViewTree.selectNodes: Tree element is not set.");
    let r = this.treeElement.selected;
    t ? r = e : r = r.filter((s) => !e.includes(s)), this.treeElement.selected = r;
  }
  /**
   * Retrieves custom data associated with a view node.
   * @param nodeId - The ID of the node to get data from
   * @returns {T} The custom data stored for the node
   * @throws {Error} When view adapter is not initialized
   */
  getNodeData(e) {
    const t = this.viewAdapter;
    if (!t)
      throw new Error("HoopsViewTree.setNodeData [set]: ViewAdapter is not set.");
    return t.nodesData[e];
  }
  /**
   * Sets custom data for a view node, replacing any existing data.
   * @param nodeId - The ID of the node to store data for
   * @param data - The data to store with the node
   * @returns {void}
   * @throws {Error} When view adapter or tree element is not initialized
   */
  setNodeData(e, t) {
    const r = this.viewAdapter;
    if (!r)
      throw new Error("HoopsViewTree.setNodeData [set]: ViewAdapter is not set.");
    const s = this.treeElement;
    if (!s)
      throw new Error(`HoopsViewTree.setNodeData [set]: Tree element i
      s not set.`);
    r.nodesData[e] = t, s.tree = { ...s.tree };
  }
  /**
   * Merges custom data into a view node's existing data.
   * Arrays are concatenated, objects are merged, other types replace existing data.
   * @param nodeId - The ID of the node to update data for
   * @param data - The data to merge with existing node data
   * @returns {void}
   * @throws {Error} When view adapter or tree element is not initialized
   */
  updateNodeData(e, t) {
    const r = this.viewAdapter;
    if (!r)
      throw new Error("HoopsViewTree.setNodeData [set]: ViewAdapter is not set.");
    const s = this.treeElement;
    if (!s)
      throw new Error("HoopsViewTree.setNodeData [set]: Tree element is not set.");
    Array.isArray(t) && Array.isArray(r.nodesData[e]) ? r.nodesData[e] = [...r.nodesData[e], ...t] : typeof t == "object" && (!r.nodesData[e] || typeof r.nodesData[e] == "object") ? r.nodesData[e] = Object.assign(r.nodesData[e] ?? {}, t) : r.nodesData[e] = t, r.nodesData[e] = Object.assign(r.nodesData[e] ?? {}, t), s.tree = { ...s.tree };
  }
  /**
   * Resets the tree to its initial state and expands the root node.
   * @internal
   * @returns {void}
   */
  resetTree() {
    var e, t;
    (e = this.treeRef.value) == null || e.resetTree(), (t = this.treeRef.value) == null || t.expandPath([i.RootNode]);
  }
  /** @internal */
  render() {
    return p`<hoops-tree
      class="viewtree"
      .tree=${{ context: new f() }}
      @hoops-tree-node-click=${(e) => {
      e.stopPropagation();
      const { key: t, ...r } = e.detail;
      [
        i.RootNode,
        i.AnnotationViewsNode,
        i.CombineStateViewsNode,
        i.StandardViewsNode
      ].includes(t) || this.dispatchEvent(
        new CustomEvent("hoops-view-tree-node-click", {
          bubbles: !0,
          composed: !0,
          detail: {
            nodeId: t,
            ...r
          }
        })
      );
    }}
      ${c(this.treeRef)}
    ></hoops-tree>`;
  }
};
n.styles = [
  E,
  d`
      .viewtree {
        height: 100%;
        overflow: auto;
      }
    `
];
n = A([
  m("hoops-view-tree")
], n);
const b = n;
export {
  n as HoopsViewTreeElement,
  b as default
};
