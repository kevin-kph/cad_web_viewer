import { html as s, nothing as d } from "lit";
import { downIcon as h, rightIcon as c } from "@ts3d-hoops/ui-kit/icons";
import "./hoops-model-tree-node.js";
import { branchVisibilityFromComBranchVisibility as m } from "./types.js";
function b(n, o, t, e, i) {
  const l = m(
    o.getBranchVisibility(t)
  ), a = n, r = i ?? {
    visibility: l
  };
  return r.visibility = l, i || (a.nodesData[t] = r), s`<hoops-model-tree-node
    nodeId=${t}
    nodeName=${o.getNodeName(t) ?? "N/A"}
    nodeType=${o.getNodeType(t)}
    ?isRoot=${o.getAbsoluteRootNode() === t}
    visibility=${r.visibility}
    ?selected=${e}
  >
  </hoops-model-tree-node>`;
}
class g {
  constructor() {
    this.nodeFactory = b, this.nodesData = {}, this.expandedIcon = s`${h}`, this.collapsedIcon = s`${c}`;
  }
  /**
   * This function will be used by the tree to render the root node.
   * @returns The id of the root node.
   */
  getRoot() {
    var o;
    return ((o = this.model) == null ? void 0 : o.getAbsoluteRootNode()) ?? Number.NaN;
  }
  /**
   * This function will be used by the tree to get the children of each node.
   *
   * @param {number} nodeId The id of the parent node.
   * @returns {number[]} An array containing the children's ids.
   */
  getChildren(o) {
    var t;
    return ((t = this.model) == null ? void 0 : t.getNodeChildren(o)) ?? [];
  }
  /**
   * Return the HTML Fragment for a node.
   * @param id The id of the node to render.
   * @param selected Whether the node is selected or not.
   * @returns The HTML fragment to render for the node.
   */
  getContent(o, t, e, i) {
    return this.model ? this.nodeFactory(this, this.model, t, e, i) : d;
  }
}
export {
  g as default,
  b as defaultNodeFactory
};
