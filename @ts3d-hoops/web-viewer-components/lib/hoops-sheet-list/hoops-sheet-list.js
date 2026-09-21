import { LitElement as h, html as m, css as d } from "lit";
import { customElement as c } from "lit/decorators.js";
import { createRef as p, ref as a } from "lit/directives/ref.js";
import { SheetAdapter as f } from "./SheetAdapter.js";
import { componentBaseStyle as E } from "@ts3d-hoops/ui-kit";
var u = Object.defineProperty, w = Object.getOwnPropertyDescriptor, S = (e, t, s, l) => {
  for (var o = l > 1 ? void 0 : l ? w(t, s) : t, i = e.length - 1, n; i >= 0; i--)
    (n = e[i]) && (o = (l ? n(t, s, o) : n(o)) || o);
  return l && o && u(t, s, o), o;
};
let r = class extends h {
  constructor() {
    super(...arguments), this.listRef = p();
  }
  /**
   * Gets the internal list component element.
   *
   * @returns {List | undefined} The list element instance or undefined if not initialised
   */
  get listElement() {
    return this.listRef.value;
  }
  /**
   * Gets the currently selected sheet nodes.
   *
   * @returns {number[]} Array of selected node IDs
   */
  get selected() {
    var e;
    return ((e = this.listElement) == null ? void 0 : e.selected) ?? [];
  }
  /**
   * Sets the currently selected sheet nodes.
   *
   * @param value - Array of node IDs to select
   * @returns {void}
   * @throws {Error} When setting selected nodes before list initialisation
   */
  set selected(e) {
    if (!this.listElement)
      throw new Error("HoopsSheetList.selected [set]: List element is not set.");
    this.listElement.selected = e;
  }
  /**
   * Convenience accessor for the model on the underlying adapter.
   *
   * @returns {IModel | undefined} The current model instance or undefined
   */
  get model() {
    var e;
    return (e = this.sheetAdapter) == null ? void 0 : e.model;
  }
  /**
   * Sets the model instance for sheet data. Setting a new model refreshes the list.
   *
   * @param model - The model instance to set
   * @returns {void}
   * @throws {Error} When setting model before adapter initialisation
   */
  set model(e) {
    const t = this.sheetAdapter;
    if (!t)
      throw new Error("HoopsSheetList.model [set]: SheetAdapter is not set.");
    t.model = e, this.sheetAdapter = t;
  }
  /**
   * Gets the sheet adapter managing list data.
   *
   * @returns {SheetAdapter | undefined} The current sheet adapter or undefined
   */
  get sheetAdapter() {
    var e;
    return (e = this.listElement) == null ? void 0 : e.list.context;
  }
  /**
   * Sets the sheet adapter managing list data.
   * Populates `elementsData` from the adapter's model before assigning.
   *
   * @param value - The sheet adapter to set
   * @returns {void}
   * @throws {Error} When setting adapter before list initialisation
   */
  set sheetAdapter(e) {
    var l;
    if (!this.listElement)
      throw new Error("HoopsSheetList.sheetAdapter [set]: List element is not set.");
    const t = ((l = e.model) == null ? void 0 : l.getSheetIds()) ?? [], s = /* @__PURE__ */ new Map();
    t.forEach((o) => {
      var i;
      s.set(o, ((i = e.model) == null ? void 0 : i.getNodeName(o)) ?? "Unnamed sheet");
    }), this.listElement.list = { context: e }, this.listElement.list.context.elementsData = s;
  }
  /**
   * Selects or deselects sheet nodes.
   *
   * @param nodeIds - Array of node IDs to select or deselect
   * @param selected - Whether to select (true) or deselect (false) the nodes
   * @returns {void}
   * @throws {Error} When list element is not initialised
   */
  selectNodes(e, t) {
    if (!this.listElement)
      throw new Error("HoopsSheetList.selectNodes: List element is not set.");
    let s = this.listElement.selected;
    t ? s = e : s = s.filter((l) => !e.includes(l)), this.listElement.selected = s;
  }
  /**
   * Handles list element click events and re-dispatches them as
   * `hoops-sheet-list-node-click`.
   *
   * @internal
   * @param event - The list element click event
   * @returns {void}
   */
  onSheetNodeClicked(e) {
    e.stopPropagation();
    const { key: t, ...s } = e.detail;
    this.dispatchEvent(
      new CustomEvent("hoops-sheet-list-node-click", {
        bubbles: !0,
        composed: !0,
        detail: {
          nodeId: t,
          ...s
        }
      })
    );
  }
  /** @internal */
  render() {
    return m`<hoops-list
      class="sheetlist"
      .list=${{ context: new f() }}
      @hoops-list-element-click=${this.onSheetNodeClicked}
      ${a(this.listRef)}
    ></hoops-list>`;
  }
};
r.styles = [
  E,
  d`
      .sheetlist {
        height: 100%;
        overflow: auto;
      }
    `
];
r = S([
  c("hoops-sheet-list")
], r);
const x = r;
export {
  r as HoopsSheetListElement,
  x as default
};
