import { nothing as f, html as h } from "lit";
import { downIcon as T, rightIcon as D } from "@ts3d-hoops/ui-kit/icons";
import "./hoops-layer-tree-element.js";
import { FileType as F, NodeType as M } from "@ts3d-hoops/web-viewer";
function S(o, e, n, s, i) {
  var y, p, g;
  const t = document.createElement("hoops-layer-tree-element");
  if (t.layerId = n, t.layerName = ((y = o.elementsData) == null ? void 0 : y.get(n)) ?? `Unnamed layer ${n}`, t.layerName === "No layer")
    return f;
  t.selected = s ?? !1, t.selectedNodes = i ?? [];
  const m = /* @__PURE__ */ new Set();
  for (const [a, d] of e.getLayers()) {
    const l = ((p = e.getLayerAuthoredId) == null ? void 0 : p.call(e, a)) ?? null;
    $(d, a, l) === t.layerName && ((g = e.getNodesFromLayer(a)) == null || g.forEach((L) => m.add(L)));
  }
  const r = Array.from(m), c = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map();
  if (!r || (r == null ? void 0 : r.length) <= 0)
    return f;
  const u = o;
  if (r == null || r.forEach((a) => {
    u.alwaysShowLeafNodes || (a = A(e, a)), c.set(a, e.getNodeName(a) ?? "Unknown node");
  }), t.layerNodes = c, !u.alwaysShowLeafNodes)
    for (const a of t.layerNodes.keys()) {
      const d = e.getNodeChildren(a);
      if (d && d.length > 0) {
        const l = d.filter(
          (w) => c.has(w)
        );
        l.length > 0 && N.set(a, l);
      }
    }
  return t.nodesChildren = N, h` ${t} `;
}
function $(o, e, n) {
  return o || (n != null ? `Unnamed layer (${n})` : `Unnamed layer ${e}`);
}
function A(o, e) {
  const n = o.getModelFileTypeFromNode(e), s = o.getNodeType(e);
  if (!o.isDrawing() && n !== F.Dwg && s === M.BodyInstance) {
    const t = o.getNodeParent(e);
    t !== null && (e = t);
  }
  return e;
}
class B {
  constructor() {
    this.alwaysShowLeafNodes = !1, this.nodeIdsToNodeNames = /* @__PURE__ */ new Map(), this.layerNamesToNodeIds = /* @__PURE__ */ new Map(), this.layerFactory = S, this.layersData = {}, this.elementsData = /* @__PURE__ */ new Map(), this.expandedIcon = h`${T}`, this.collapsedIcon = h`${D}`, this.sortedByValue = !1;
  }
  /**
   * Return the HTML Fragment for a node.
   * @param id The id of the node to render.
   * @param selected Whether the node is selected or not.
   * @returns The HTML fragment to render for the node.
   */
  getContent(e, n, s, i) {
    return this.layersContainer ? this.layerFactory(
      this,
      this.layersContainer,
      n,
      s ?? !1,
      i ?? []
    ) : f;
  }
}
export {
  B as default,
  S as defaultLayerElementFactory,
  A as getAdjustedNodeId,
  $ as getSanitizedLayerName
};
