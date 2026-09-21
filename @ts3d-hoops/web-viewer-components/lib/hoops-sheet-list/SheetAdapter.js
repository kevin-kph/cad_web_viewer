import { nothing as n, html as s } from "lit";
import "./hoops-sheet-list-node.js";
class a {
  constructor() {
    this.elementsData = /* @__PURE__ */ new Map(), this.sortedByValue = !0;
  }
  /**
   * Returns the HTML fragment for a given sheet entry.
   *
   * @param _context - The list context (unused)
   * @param id - The sheet node id
   * @param selected - Whether the node is currently selected
   * @returns The HTML fragment to render for the node
   */
  getContent(h, e, t) {
    if (!this.model)
      return n;
    const o = this.model.getNodeName(e) ?? "Unnamed sheet";
    return s`<hoops-sheet-list-node
      nodeId=${e}
      nodeName=${o}
      ?selected=${t}
    ></hoops-sheet-list-node>`;
  }
}
export {
  a as SheetAdapter
};
