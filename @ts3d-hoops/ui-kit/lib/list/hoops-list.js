import { css as m, LitElement as p, html as o } from "lit";
import { property as d, customElement as h } from "lit/decorators.js";
import { provide as u } from "@lit/context";
import { listContext as v } from "./context.js";
import "./hoops-list-element.js";
var f = Object.defineProperty, x = Object.getOwnPropertyDescriptor, c = (s, t, i, e) => {
  for (var l = e > 1 ? void 0 : e ? x(t, i) : t, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (l = (e ? a(t, i, l) : a(l)) || l);
  return e && l && f(t, i, l), l;
};
let r = class extends p {
  constructor() {
    super(...arguments), this.selected = [], this.list = {
      context: {
        elementsData: void 0,
        sortedByValue: !1,
        getContent(s, t, i) {
          var e;
          return o`id: ${t}, value: ${(e = this.elementsData) == null ? void 0 : e.get(t)}`;
        }
      }
    };
  }
  /**
   * Triggers a re-render by reassigning list context.
   *
   * @returns void
   */
  updateContext() {
    this.list = { ...this.list };
  }
  /**
   * Triggers a re-render by reassigning selected elements.
   *
   * @returns void
   */
  updateSelected() {
    this.selected = [...this.selected];
  }
  /** @internal */
  render() {
    if (this.list === void 0)
      return o`<div class="list"></div>`;
    let s = this.list.context.elementsData;
    if (s === void 0)
      return o`<div class="list"></div>`;
    this.list.context.sortedByValue === !0 && (s = new Map([...s].sort((i, e) => i[1].localeCompare(e[1]))));
    const t = [];
    return s.forEach((i, e) => {
      const l = this.selected.includes(e);
      t.push(this.getElementHtml(e, l));
    }), o`<div class="list">${t}</div>`;
  }
  /**
   * Generates HTML template for a list element.
   *
   * @internal
   * @param elementKey - The element's unique key
   * @param selected - Whether the element is selected
   * @returns HTML template for the element
   */
  getElementHtml(s, t) {
    return o`<hoops-list-element class="element" key=${s} ?selected=${t}>
    </hoops-list-element>`;
  }
};
r.styles = [
  m`
      :host {
        display: block;
      }

      .list {
        width: 100%;
        height: 100%;
      }
    `
];
c([
  d({ attribute: !1 })
], r.prototype, "selected", 2);
c([
  u({ context: v }),
  d({ attribute: !1 })
], r.prototype, "list", 2);
r = c([
  h("hoops-list")
], r);
export {
  r as default
};
