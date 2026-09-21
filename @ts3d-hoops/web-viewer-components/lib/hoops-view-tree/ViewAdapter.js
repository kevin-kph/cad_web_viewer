import { html as r, nothing as m } from "lit";
import { downIcon as h, rightIcon as c } from "@ts3d-hoops/ui-kit/icons";
import "./hoops-view-tree-node.js";
function N(o, n, t, s, e) {
  let i = !0;
  "getNodeVisibility" in n && (i = n.getNodeVisibility(t));
  const a = o, d = e ?? {
    visible: i
  };
  return e || (a.nodesData[t] = d), r`<hoops-view-tree-node
    nodeId=${t}
    nodeName=${a.getNodeName(t) ?? "N/A"}
    ?selected=${s}
  >
  </hoops-view-tree-node>`;
}
class p {
  constructor() {
    this.nodeFactory = N, this.nodesData = {}, this.expandedIcon = r`${h}`, this.collapsedIcon = r`${c}`, this.rootNodeName = "Views", this.combineStateViewsNodeName = "Combine state views", this.annotationViewsNodeName = "Annotation views", this.standardViewsNodeName = "Standard views";
  }
  /**
   * This function will be used by the tree to render the root node.
   * @returns The id of the root node.
   */
  getRoot() {
    return 0;
  }
  /**
   * This function will be used by the tree to get the children of each node.
   *
   * @param {number} nodeId The id of the parent node.
   * @returns {number[]} An array containing the children's ids.
   */
  getChildren(n) {
    var s;
    const t = (s = this.model) == null ? void 0 : s.getCadViewMap();
    switch (n) {
      case 0:
        return [
          1,
          2,
          3
          /* StandardViewsNode */
        ];
      case 1:
        return Array.from((t == null ? void 0 : t.keys()) || []).filter(
          (e) => {
            var i, a;
            return ((i = this.model) == null ? void 0 : i.isCombineStateView(e)) && !((a = this.model) != null && a.isAnnotationView(e));
          }
        );
      case 2:
        return Array.from((t == null ? void 0 : t.keys()) || []).filter(
          (e) => {
            var i;
            return (i = this.model) == null ? void 0 : i.isAnnotationView(e);
          }
        );
      case 3:
        return Array.from((t == null ? void 0 : t.keys()) || []).filter(
          (e) => {
            var i, a;
            return !((i = this.model) != null && i.isAnnotationView(e)) && !((a = this.model) != null && a.isCombineStateView(e));
          }
        );
      default:
        return [];
    }
  }
  /**
   * Returns the name of a node in the view tree
   * @param nodeId The view tree-specific node id
   */
  getNodeName(n) {
    switch (n) {
      case 0:
        return this.rootNodeName;
      case 1:
        return this.combineStateViewsNodeName;
      case 2:
        return this.annotationViewsNodeName;
      case 3:
        return this.standardViewsNodeName;
      default:
        return this.getViewName(n);
    }
  }
  /**
   * Return the CAD view name for a given CAD view id
   * @param cadViewId
   * @returns
   */
  getViewName(n) {
    var s, e;
    const t = (e = (s = this.model) == null ? void 0 : s.getCadViewMap()) == null ? void 0 : e.get(n);
    return (t == null ? void 0 : t.replace(/ # Annotation View$/, "")) ?? "Unnamed view";
  }
  /**
   * Return the HTML Fragment for a node.
   * @param id The id of the node to render.
   * @param selected Whether the node is selected or not.
   * @returns The HTML fragment to render for the node.
   */
  getContent(n, t, s, e) {
    return this.model ? this.nodeFactory(this, this.model, t, s, e) : m;
  }
}
var u = /* @__PURE__ */ ((o) => (o[o.RootNode = 0] = "RootNode", o[o.CombineStateViewsNode = 1] = "CombineStateViewsNode", o[o.AnnotationViewsNode = 2] = "AnnotationViewsNode", o[o.StandardViewsNode = 3] = "StandardViewsNode", o))(u || {});
export {
  p as ViewAdapter,
  u as ViewTreeNodeId,
  N as defaultNodeFactory
};
