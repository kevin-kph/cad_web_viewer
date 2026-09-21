import { LitElement as d, html as h, css as y } from "lit";
import { customElement as c } from "lit/decorators.js";
import { createRef as T, ref as m } from "lit/directives/ref.js";
import { TypesTreeNodeId as f, TypesTreeAdapter as u } from "./TypesAdapter.js";
import { componentBaseStyle as E } from "@ts3d-hoops/ui-kit";
import { branchVisibilityFromComBranchVisibility as w } from "../hoops-model-tree/types.js";
var b = Object.defineProperty, A = Object.getOwnPropertyDescriptor, N = (e, s, t, r) => {
  for (var o = r > 1 ? void 0 : r ? A(s, t) : s, i = e.length - 1, p; i >= 0; i--)
    (p = e[i]) && (o = (r ? p(s, t, o) : p(o)) || o);
  return r && o && b(s, t, o), o;
};
let a = class extends d {
  constructor() {
    super(...arguments), this.treeRef = T(), this.handleNodeClick = (e) => {
      e.stopPropagation(), this.dispatchEvent(
        new CustomEvent("hoops-types-tree-node-click", {
          bubbles: !0,
          composed: !0,
          detail: {
            ...e.detail
          }
        })
      );
    }, this.handleTypeNodeClick = (e) => {
      e.stopPropagation(), this.dispatchEvent(
        new CustomEvent("hoops-types-tree-type-node-click", {
          bubbles: !0,
          composed: !0,
          detail: {
            ...e.detail
          }
        })
      );
    }, this.handleVisibilityChange = (e) => {
      e.stopPropagation(), e.detail.isTypeNode && e.detail.treeNodeId !== void 0 && this.updateNodeData(e.detail.treeNodeId, {
        visibility: e.detail.visible ? "Shown" : "Hidden"
      }), this.dispatchEvent(
        new CustomEvent("hoops-types-tree-node-visibility-change", {
          bubbles: !0,
          composed: !0,
          detail: {
            ...e.detail
          }
        })
      );
    };
  }
  /**
   * Gets the underlying Tree element.
   *
   * @returns {Tree | undefined} The tree element instance or undefined if not available
   */
  get treeElement() {
    return this.treeRef.value;
  }
  /**
   * Gets or sets the selected nodes in the tree.
   *
   * This is a syntactic sugar to access the underlying Tree's selected property.
   * If the Tree element is not set, getter returns an empty array.
   * Reassigning the selected array will trigger a reactive update.
   *
   * Note: Trying to set selected nodes while the tree element is not available will throw an error.
   * This should not happen in normal use cases since the tree is added at initialization.
   *
   * @returns {number[]} Array of selected node IDs
   * @defaultValue []
   * @throws Error - Thrown when attempting to set while tree element is not available
   */
  get selected() {
    var e;
    return ((e = this.treeElement) == null ? void 0 : e.selected) ?? [];
  }
  set selected(e) {
    if (!this.treeElement)
      throw new Error("HoopsTypesTree.selected [set]: Tree element is not set.");
    this.treeElement.selected = e;
  }
  /**
   * Gets or sets the IModel interface that represents the Model being displayed.
   *
   * This is syntactic sugar to access the TypesTreeAdapter's model property.
   * If the TypesTreeAdapter is not set, getter returns undefined.
   * Reassigning the model will trigger a tree reset and update automatically.
   *
   * Note: Trying to set the model while the TypesTreeAdapter is not available will throw an error.
   * This should not happen in normal use cases since the TypesTreeAdapter is added at initialization.
   *
   * @returns {IModel | undefined} The model instance or undefined if not available
   * @throws Error - Thrown when attempting to set while TypesTreeAdapter is not available
   */
  get model() {
    var e;
    return (e = this.typesTreeAdapter) == null ? void 0 : e.model;
  }
  set model(e) {
    const s = this.typesTreeAdapter;
    if (!s)
      throw new Error("HoopsTypesTree.model [set]: TypesTreeAdapter is not set.");
    s.model = e, this.typesTreeAdapter = s, this.resetTree();
  }
  /**
   * Gets or sets the TypesTreeAdapter that manages tree data and operations.
   *
   * This provides syntactic sugar to access the underlying tree's context adapter.
   * If the Tree element is not set, getter returns undefined.
   * Reassigning the TypesTreeAdapter will trigger a reactive update.
   *
   * Note: Trying to set the TypesTreeAdapter while the tree element is not available will throw an error.
   * This should not happen in normal use cases since the tree is added at initialization.
   *
   * @returns {TypesTreeAdapter | undefined} The TypesTreeAdapter instance or undefined if not available
   * @throws Error - Thrown when attempting to set while tree element is not available
   */
  get typesTreeAdapter() {
    var e;
    return (e = this.treeElement) == null ? void 0 : e.tree.context;
  }
  set typesTreeAdapter(e) {
    if (!this.treeElement)
      throw new Error("HoopsTypesTree.typesTreeAdapter [set]: Tree element is not set.");
    this.treeElement.tree = { context: e };
  }
  /**
   * Selects or deselects nodes in the tree.
   *
   * @param nodeIds - Array of node IDs to select or deselect
   * @param selected - Whether to select (true) or deselect (false) the nodes
   * @returns {void}
   * @throws Error - Thrown when tree element is not available
   */
  selectNodes(e, s) {
    if (!this.treeElement)
      throw new Error("HoopsTypesTree.selectNodes: Tree element is not set.");
    let t = this.treeElement.selected;
    s ? t = e : t = t.filter((r) => !e.includes(r)), this.treeElement.selected = t;
  }
  /**
   * Retrieves custom data attached to a specific node.
   *
   * This allows users to attach reactive data to tree nodes. If the TypesTreeAdapter
   * does not exist, it will throw an Error. Otherwise it will return the stored data
   * for the specified node, if any.
   *
   * @param nodeId - The ID of the node to get data for
   * @returns {T} The custom data stored for the node
   * @throws Error - Thrown when TypesTreeAdapter is not available
   */
  getNodeData(e) {
    const s = this.typesTreeAdapter;
    if (!s)
      throw new Error("HoopsTypesTree.getNodeData: TypesTreeAdapter is not set.");
    return s.nodesData[e];
  }
  /**
   * Sets custom data for a specific node, replacing any existing data.
   *
   * If the node already has a value, it will be erased and replaced with the new data.
   * Setting node data will trigger a reactive update of the tree component.
   *
   * @param nodeId - The ID of the node to set data for
   * @param data - The data to store for the node
   * @returns {void}
   * @throws Error - Thrown when TypesTreeAdapter or tree element is not available
   */
  setNodeData(e, s) {
    const t = this.typesTreeAdapter;
    if (!t)
      throw new Error("HoopsTypesTree.setNodeData [set]: TypesTreeAdapter is not set.");
    const r = this.treeElement;
    if (!r)
      throw new Error("HoopsTypesTree.setNodeData [set]: Tree element is not set.");
    t.nodesData[e] = s, r.tree = { ...r.tree };
  }
  /**
   * Merges custom data into a node's existing data instead of replacing it.
   *
   * If the node does not have existing data, the new data is added to the context.
   * The merge behavior depends on data types:
   * - If both existing and new data are arrays: new data is appended to the existing array
   * - If both are objects: objects are merged using Object.assign, with new data taking precedence
   * - Otherwise: equivalent to calling setNodeData (replaces existing data)
   *
   * Updating node data will trigger a reactive update of the tree component.
   *
   * @param nodeId - The ID of the node to update data for
   * @param data - The data to merge with existing node data
   * @returns {void}
   * @throws Error - Thrown when TypesTreeAdapter or tree element is not available
   */
  updateNodeData(e, s) {
    const t = this.typesTreeAdapter;
    if (!t)
      throw new Error("HoopsTypesTree.updateNodeData: TypesTreeAdapter is not set.");
    const r = this.treeElement;
    if (!r)
      throw new Error("HoopsTypesTree.updateNodeData: Tree element is not set.");
    Array.isArray(s) && Array.isArray(t.nodesData[e]) ? t.nodesData[e] = [
      ...t.nodesData[e],
      ...s
    ] : typeof s == "object" && (!t.nodesData[e] || typeof t.nodesData[e] == "object") ? t.nodesData[e] = Object.assign(
      t.nodesData[e] ?? {},
      s
    ) : t.nodesData[e] = s, t.nodesData[e] = Object.assign(
      t.nodesData[e] ?? {},
      s
    ), r.tree = { ...r.tree };
  }
  /**
   * Retrieves all type tree node elements from the shadow DOM.
   *
   * @internal
   * @returns {TypeTreeNodeElement[]} Array of TypeTreeNodeElement instances found in the tree
   */
  getNodeElements() {
    var o, i;
    const e = (o = this.shadowRoot) == null ? void 0 : o.querySelector(".typestree"), s = (i = e == null ? void 0 : e.shadowRoot) == null ? void 0 : i.querySelector("div.tree"), t = s == null ? void 0 : s.querySelectorAll("hoops-tree-node"), r = new Array();
    return t == null || t.forEach((p) => {
      var l;
      const n = (l = p.shadowRoot) == null ? void 0 : l.querySelector(
        "div.node div.header hoops-types-tree-node"
      );
      n && r.push(n);
    }), r;
  }
  /**
   * Updates the visibility state of all nodes in the tree.
   *
   * This method refreshes the visibility for all node elements by:
   * - For individual model nodes: retrieving visibility from the model's getBranchVisibility method
   * - For type nodes: using stored visibility data from nodesData or defaulting to 'Shown'
   *
   * Note: The parameters are currently unused in the implementation but maintained for API compatibility.
   *
   * @param _shownBodyIds - Array of node IDs to mark as visible (currently unused)
   * @param _hiddenBodyIds - Array of node IDs to mark as hidden (currently unused)
   * @returns {void}
   * @throws Error - Thrown when TypesTreeAdapter is not available
   */
  updateVisibility(e, s) {
    const t = this.typesTreeAdapter;
    if (!t)
      throw new Error("HoopsTypesTree.updateVisibility: TypesTreeAdapter is not set.");
    this.getNodeElements().forEach((r) => {
      var o;
      if (r.isTypeNode()) {
        const i = t.nodesData[r.nodeId];
        r.visibility = (i == null ? void 0 : i.visibility) || "Shown";
      } else {
        const i = (o = t.model) == null ? void 0 : o.getBranchVisibility(r.modelNodeId);
        i !== void 0 && (r.visibility = w(i));
      }
    });
  }
  /**
   * Resets the tree to its initial state and expands the root node.
   *
   * @internal
   * @returns {void}
   */
  resetTree() {
    var e, s;
    (e = this.treeRef.value) == null || e.resetTree(), (s = this.treeRef.value) == null || s.expandPath([f.RootNode]);
  }
  /** @internal */
  render() {
    return h`<hoops-tree
      class="typestree"
      .tree=${{ context: new u() }}
      @hoops-types-tree-node-click=${this.handleNodeClick}
      @hoops-types-tree-type-node-click=${this.handleTypeNodeClick}
      @hoops-types-tree-node-visibility-change=${this.handleVisibilityChange}
      ${m(this.treeRef)}
    ></hoops-tree>`;
  }
};
a.styles = [
  E,
  y`
      .typestree {
        height: 100%;
        overflow: auto;
      }
    `
];
a = N([
  c("hoops-types-tree")
], a);
const _ = a;
export {
  a as HoopsTypesTreeElement,
  _ as default
};
