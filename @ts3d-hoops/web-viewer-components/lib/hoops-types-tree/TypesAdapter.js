import { html as h, nothing as p } from "lit";
import { downIcon as N, rightIcon as m } from "@ts3d-hoops/ui-kit/icons";
import "./hoops-types-tree-node.js";
import { branchVisibilityFromComBranchVisibility as y } from "../hoops-model-tree/types.js";
function u(n, t, e, s, i) {
  let a = "Shown";
  const r = n, d = r.nodesData[e], o = i ?? d ?? {
    visibility: "Shown"
  };
  !i && !d && (r.nodesData[e] = o);
  const l = () => Object.prototype.hasOwnProperty.call(o, "modelNodeId") ? o.modelNodeId : Number.NaN, c = () => Number.isNaN(l()) && typeof o.nodeName == "string" && t.getGenericTypeIdMap().has(o.nodeName) ? Array.from(t.getGenericTypeIdMap().get(o.nodeName) ?? /* @__PURE__ */ new Set()) : [];
  return "getBranchVisibility" in t && Object.prototype.hasOwnProperty.call(o, "modelNodeId") ? a = y(
    t.getBranchVisibility(o.modelNodeId)
  ) : Object.prototype.hasOwnProperty.call(o, "visibility") && (a = o.visibility), h`<hoops-types-tree-node
    nodeId=${e}
    visibility=${a}
    modelNodeId=${l()}
    .modelNodes=${c()}
    nodeName=${r.getNodeName(e) ?? "N/A"}
    ?selected=${s}
  >
  </hoops-types-tree-node>`;
}
class x {
  constructor() {
    this.nodeFactory = u, this.nodesData = {}, this.expandedIcon = h`${N}`, this.collapsedIcon = h`${m}`, this.rootNodeName = "Types", this.allTypes = void 0, this.treeNodes = /* @__PURE__ */ new Map(), this.indexCounter = 0;
  }
  /**
   * This function will be used by the tree to render the root node.
   * @returns The id of the root node.
   */
  getRoot() {
    return -1;
  }
  /**
   * This function will be used by the tree to get the children of each node.
   *
   * @param {number} nodeId The id of the parent node.
   * @returns {number[]} An array containing the children's ids.
   */
  getChildren(t) {
    var e;
    switch (t) {
      case -1:
        return this.allTypes || (this.allTypes = (e = this.model) == null ? void 0 : e.getGenericTypeIdMap()), this.allTypes ? (this.indexCounter = 0, this.treeNodes.clear(), this.allTypes.forEach((s, i) => {
          this.treeNodes.set(this.indexCounter, []), this.nodesData[this.indexCounter] = {
            nodeName: i
          }, this.indexCounter++;
        }), Array.from(this.treeNodes.keys())) : [];
      default:
        if (this.treeNodes.has(t)) {
          const s = this.treeNodes.get(t);
          if (s && s.length > 0) return s;
          const i = this.getNodeName(t);
          if (i && this.allTypes) {
            const a = this.allTypes.get(i);
            if (a) {
              const r = [];
              return a.forEach((d) => {
                var o;
                r.push(this.indexCounter), this.nodesData[this.indexCounter] = {
                  nodeName: ((o = this.model) == null ? void 0 : o.getNodeName(d)) ?? "Unnamed Node",
                  modelNodeId: d
                }, this.indexCounter++;
              }), this.treeNodes.set(t, r), r;
            }
          }
          return [];
        }
        return [];
    }
  }
  /**
   * Returns the name of a node in the types tree
   * @param nodeId The types tree-specific node id
   */
  getNodeName(t) {
    switch (t) {
      case -1:
        return this.rootNodeName;
      default: {
        const e = this.nodesData[t];
        return (e == null ? void 0 : e.nodeName) ?? "unnamed";
      }
    }
  }
  /**
   * Return the CAD type name for a given CAD type id
   * @param cadViewId
   * @returns
   */
  getTypeName(t) {
    var s, i;
    const e = (i = (s = this.model) == null ? void 0 : s.getCadViewMap()) == null ? void 0 : i.get(t);
    return (e == null ? void 0 : e.replace(/ # Annotation View$/, "")) ?? "Unnamed type";
  }
  /**
   * Return the HTML Fragment for a node.
   * @param id The id of the node to render.
   * @param selected Whether the node is selected or not.
   * @returns The HTML fragment to render for the node.
   */
  getContent(t, e, s, i) {
    return this.model ? this.nodeFactory(this, this.model, e, s, i) : p;
  }
}
var f = /* @__PURE__ */ ((n) => (n[n.RootNode = -1] = "RootNode", n))(f || {});
export {
  x as TypesTreeAdapter,
  f as TypesTreeNodeId,
  u as defaultNodeFactory
};
