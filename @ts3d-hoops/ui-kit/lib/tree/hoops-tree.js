import { provide as p } from "@lit/context";
import { css as u, LitElement as f, nothing as l, html as o } from "lit";
import { state as x, property as c, customElement as m } from "lit/decorators.js";
import "../icons/hoops-icon.js";
import { rightIcon as N, downIcon as g } from "../icons/icons.js";
import { treeContext as y } from "./context.js";
import "./hoops-tree-node.js";
var C = Object.defineProperty, b = Object.getOwnPropertyDescriptor, d = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? b(t, i) : t, h = e.length - 1, a; h >= 0; h--)
    (a = e[h]) && (s = (r ? a(t, i, s) : a(s)) || s);
  return r && s && C(t, i, s), s;
};
let n = class extends f {
  constructor() {
    super(...arguments), this.entries = {}, this.selected = [], this.tree = {
      context: {
        // default implementation to have the tree mounting
        expandedIcon: o`${g}`,
        collapsedIcon: o`${N}`,
        getRoot: () => Number.NaN,
        getChildren: () => [],
        getContent: () => l,
        isSelected: () => !1
      }
    };
  }
  /**
   * Triggers a re-render by reassigning entries.
   *
   * @returns void
   */
  updateEntries() {
    this.entries = { ...this.entries };
  }
  /**
   * Triggers a re-render by reassigning tree context.
   *
   * @returns void
   */
  updateContext() {
    this.tree = { ...this.tree };
  }
  /**
   * Triggers a re-render by reassigning selected entries.
   *
   * @returns void
   */
  updateSelected() {
    this.selected = [...this.selected];
  }
  /**
   * Loads and registers child nodes for a parent node.
   *
   * @param parent - The parent node entry
   * @returns void
   */
  loadChildrenData(e) {
    const t = e.children.map(
      (i) => ({
        key: i,
        parentKey: e.key,
        children: this.tree.context.getChildren(i),
        expanded: !1
      })
    );
    for (const i of t)
      this.entries[i.key] = this.entries[i.key] ?? i;
    this.updateEntries();
  }
  /**
   * Expands all nodes along the specified path.
   *
   * @param nodePath - Array of node keys representing the path to expand
   * @returns void
   * @throws Error when a node in the path is not found
   */
  expandPath(e) {
    var i;
    const t = ((i = this.tree) == null ? void 0 : i.context.getRoot()) ?? Number.NaN;
    if (!isNaN(t)) {
      this.getRootNodeData(t);
      for (const r of e) {
        if (!this.entries[r])
          throw new Error(
            `Unable to expand the path in the tree. Path ${e} is invalid. ${r} didn't found`
          );
        const s = this.entries[r];
        this.loadChildrenData(s), s.expanded = !0;
      }
      this.updateEntries();
    }
  }
  /**
   * Refreshes node data from context. No-op if node is not loaded.
   *
   * @param nodeKey - The key of the node to refresh
   * @returns void
   */
  refreshNodeData(e) {
    if (!this.entries[e])
      return;
    const t = this.entries[e];
    t.children = this.tree.context.getChildren(e), this.loadChildrenData(t);
  }
  /**
   * Removes a node and all its children from the tree. No-op if node is not loaded.
   *
   * @param nodeKey - The key of the node to remove
   * @returns void
   */
  removeNode(e) {
    const t = Object.entries(this.entries).find(([, r]) => r.children.includes(e));
    if (!t)
      return;
    const i = [e];
    for (; i.length > 0; ) {
      const r = i.pop();
      if (!r)
        continue;
      const s = this.entries[r];
      s && (i.push(...s.children), delete this.entries[r]);
    }
    t[1].children = t[1].children.filter((r) => r !== e), this.updateEntries();
  }
  /**
   * Resets the tree to its initial state, clearing all entries and selections.
   *
   * @returns void
   */
  resetTree() {
    this.entries = {}, this.selected = [];
  }
  /** @internal */
  render() {
    var i;
    const e = ((i = this.tree) == null ? void 0 : i.context.getRoot()) ?? Number.NaN;
    if (Number.isNaN(e))
      return o`<div class="tree"></div>`;
    const t = this.getRootNodeData(e);
    return o`<div class="tree" @hoops-tree-node-expand=${this.handleNodeExpanded}>
      ${this.getNode(t)}
    </div>`;
  }
  /**
   * Handles node expansion events and loads children on demand.
   *
   * @internal
   * @param event - The tree node expand event
   */
  handleNodeExpanded(e) {
    this.entries[e.detail.key].expanded = e.detail.expanded, e.detail.expanded ? this.loadChildrenData(this.entries[e.detail.key]) : this.updateEntries();
  }
  /**
   * Recursively generates HTML template for a node and its loaded children.
   *
   * @internal
   * @param nodeData - Optional node entry data
   * @returns HTML template for the node or nothing if node is not loaded
   */
  getNode(e) {
    return e ? o`<hoops-tree-node
      class="node"
      key=${e.key}
      ?expanded=${e.expanded}
      ?selected=${this.selected.includes(e.key)}
      ?leaf=${!e.children.length}
    >
      ${e.children.map((t) => this.getNode(this.entries[t]))}
    </hoops-tree-node>` : l;
  }
  /**
   * Gets or creates the root node entry data.
   *
   * @internal
   * @param rootKey - The key for the root node
   * @returns The root node entry data
   */
  getRootNodeData(e) {
    return this.entries[e] || (this.entries[e] = {
      key: e,
      expanded: !1,
      children: this.tree.context.getChildren(e)
    }), this.entries[e];
  }
};
n.styles = [
  u`
      :host {
        display: block;
      }

      .tree {
        width: 100%;
        height: 100%;
      }
    `
];
d([
  x()
], n.prototype, "entries", 2);
d([
  c({ attribute: !1 })
], n.prototype, "selected", 2);
d([
  p({ context: y }),
  c({ attribute: !1 })
], n.prototype, "tree", 2);
n = d([
  m("hoops-tree")
], n);
export {
  n as default
};
