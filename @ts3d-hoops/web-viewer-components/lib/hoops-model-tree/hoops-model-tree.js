import { LitElement as a, html as i, css as h } from "lit";
import { customElement as m } from "lit/decorators.js";
import { createRef as c, ref as p } from "lit/directives/ref.js";
import f from "./ModelAdapter.js";
import { componentBaseStyle as u } from "@ts3d-hoops/ui-kit";
var E = Object.defineProperty, D = Object.getOwnPropertyDescriptor, w = (e, t, r, o) => {
  for (var s = o > 1 ? void 0 : o ? D(t, r) : t, l = e.length - 1, d; l >= 0; l--)
    (d = e[l]) && (s = (o ? d(t, r, s) : d(s)) || s);
  return o && s && E(t, r, s), s;
};
let n = class extends a {
  constructor() {
    super(...arguments), this.treeRef = c();
  }
  /**
   * Gets the internal tree component instance.
   * Provides access to the underlying tree API when needed.
   * @returns {Tree | undefined} The tree element instance or undefined if not initialized
   */
  get treeElement() {
    return this.treeRef.value;
  }
  /**
   * Gets the currently selected model node IDs.
   * @returns {number[]} Array of selected node IDs
   */
  get selected() {
    var e;
    return ((e = this.treeElement) == null ? void 0 : e.selected) ?? [];
  }
  /**
   * Sets the currently selected model node IDs.
   * @param value - Array of node IDs to select
   * @returns {void}
   * @throws {Error} When the tree element is not initialized
   */
  set selected(e) {
    if (!this.treeElement)
      throw new Error("ModelTree.selected [set]: Tree element is not set.");
    this.treeElement.selected = e;
  }
  /**
   * Gets the model instance used to populate the tree.
   * @returns {IModel | undefined} The current model instance or undefined
   */
  get model() {
    var e;
    return (e = this.modelAdapter) == null ? void 0 : e.model;
  }
  /**
   * Sets the model instance used to populate the tree.
   * Setting the model refreshes the displayed tree structure.
   * @param model - The model instance to set
   * @returns {void}
   * @throws {Error} When the model adapter is not initialized
   */
  set model(e) {
    const t = this.modelAdapter;
    if (!t)
      throw new Error("ModelTree.model [set]: ModelAdapter is not set.");
    t.model = e, this.modelAdapter = t, this.resetTree();
  }
  /**
   * Gets the model adapter that supplies data to the tree.
   * @returns {ModelAdapter | undefined} The current model adapter or undefined
   */
  get modelAdapter() {
    var e;
    return (e = this.treeElement) == null ? void 0 : e.tree.context;
  }
  /**
   * Sets the model adapter that supplies data to the tree.
   * @param value - The model adapter to set
   * @returns {void}
   * @throws {Error} When the tree element is not initialized
   */
  set modelAdapter(e) {
    if (!this.treeElement)
      throw new Error("ModelTree.modelAdapter [set]: Tree element is not set.");
    this.treeElement.tree = { context: e };
  }
  /**
   * Selects or deselects nodes in the tree.
   *
   * Reassigning the selected nodes will trigger an update.
   *
   * @param nodeIds - Array of node IDs to update
   * @param selected - Whether to select (true) or deselect (false) the nodes
   * @returns {void}
   * @throws {Error} When the tree element is not initialized
   */
  selectNodes(e, t) {
    if (!this.treeElement)
      throw new Error("ModelTree.selectNodes: Tree element is not set.");
    let r = this.treeElement.selected;
    t ? r = e : r = r.filter((o) => !e.includes(o)), this.treeElement.selected = r;
  }
  /**
   * Retrieves custom data associated with a node.
   *
   * This is a shorthand to allow users to attach reactive data to nodes.
   *
   * @param nodeId - The ID of the node that owns the data
   * @returns {T} The stored custom data
   * @throws {Error} When the model adapter is not initialized
   */
  getNodeData(e) {
    const t = this.modelAdapter;
    if (!t)
      throw new Error("ModelTree.setNodeData [set]: ModelAdapter is not set.");
    return t.nodesData[e];
  }
  /**
   * Stores custom data for a node, replacing any existing value.
   *
   * If the node had already a value it is erased.
   * Setting node data will trigger an update.
   *
   * @param nodeId - The ID of the node that owns the data
   * @param data - The data to store
   * @returns {void}
   * @throws {Error} When the model adapter or tree element is not initialized
   */
  setNodeData(e, t) {
    const r = this.modelAdapter;
    if (!r)
      throw new Error("ModelTree.setNodeData [set]: ModelAdapter is not set.");
    const o = this.treeElement;
    if (!o)
      throw new Error("ModelTree.setNodeData [set]: Tree element is not set.");
    r.nodesData[e] = t, o.tree = { ...o.tree };
  }
  /**
   * Merges custom data into an existing node entry.
   *
   * If the node did not have data, it is added to the context.
   * If the given data is an array and the context node data is an array, the data passed as argument are appended to the context data.
   * If both are objects, then the objects are merged using Object.assign, with the data argument being the last object of the merge.
   * Otherwise it is equivalent to setNodeData.
   *
   * Updating node data will trigger an update.
   *
   * @param nodeId - The ID of the node that owns the data
   * @param data - The data to merge into the node entry
   * @returns {void}
   * @throws {Error} When the model adapter or tree element is not initialized
   */
  updateNodeData(e, t) {
    const r = this.modelAdapter;
    if (!r)
      throw new Error("ModelTree.setNodeData [set]: ModelAdapter is not set.");
    const o = this.treeElement;
    if (!o)
      throw new Error("ModelTree.setNodeData [set]: Tree element is not set.");
    Array.isArray(t) && Array.isArray(r.nodesData[e]) ? r.nodesData[e] = [...r.nodesData[e], ...t] : typeof t == "object" && (!r.nodesData[e] || typeof r.nodesData[e] == "object") ? r.nodesData[e] = Object.assign(r.nodesData[e] ?? {}, t) : r.nodesData[e] = t, r.nodesData[e] = Object.assign(r.nodesData[e] ?? {}, t), o.tree = { ...o.tree };
  }
  /**
   * Refreshes the data for a specific node.
   *
   * Useful if data provided by the model has changed (child nodes added or removed).
   * If node is not loaded, it does nothing since data will be properly loaded when expanded.
   *
   * @param nodeId - The ID of the node to refresh
   * @returns {void}
   */
  refreshNodeData(e) {
    var t;
    (t = this.treeRef.value) == null || t.refreshNodeData(e);
  }
  /**
   * Removes a node and its descendants from the displayed tree.
   *
   * This notifies the tree that a node has been removed from the model.
   * If the node is not loaded yet, it does nothing.
   *
   * @param nodeId - The ID of the removed node
   * @returns {void}
   */
  removeNode(e) {
    var t;
    (t = this.treeRef.value) == null || t.removeNode(e);
  }
  /**
   * Resets the tree and expands default nodes for user visibility.
   * @internal
   * @returns {void}
   */
  resetTree() {
    var l, d;
    (l = this.treeRef.value) == null || l.resetTree();
    const e = this.model;
    if (!e)
      return;
    const t = [];
    let r = e.getAbsoluteRootNode(), o = e.getNodeChildren(r), s = e.getNodeChildren(r).length === 1;
    for (; s; )
      t.push(r), o = e.getNodeChildren(r), s = o.length === 1, s && (r = o[0]);
    o.length > 1 && t.push(r), (d = this.treeRef.value) == null || d.expandPath(t);
  }
  /**
   * Handles low-level tree click events and re-emits them as model tree events.
   * @internal
   * @param event - The original tree click event
   * @returns {void}
   */
  handleNodeClick(e) {
    e.stopPropagation();
    const { key: t, ...r } = e.detail;
    this.dispatchEvent(
      new CustomEvent("hoops-model-tree-node-click", {
        bubbles: !0,
        composed: !0,
        detail: {
          nodeId: t,
          ...r
        }
      })
    );
  }
  /** @internal */
  render() {
    return i`<hoops-tree
      data-html2canvas-ignore
      class="modeltree"
      .tree=${{ context: new f() }}
      @hoops-tree-node-click=${(e) => {
      this.handleNodeClick(e);
    }}
      @hoops-tree-node-aux-click=${(e) => {
      this.handleNodeClick(e);
    }}
      ${p(this.treeRef)}
    ></hoops-tree>`;
  }
};
n.styles = [
  u,
  h`
      .modeltree {
        height: 100%;
        overflow: auto;
      }
    `
];
n = w([
  m("hoops-model-tree")
], n);
const M = n;
export {
  n as HoopsModelTreeElement,
  M as default
};
