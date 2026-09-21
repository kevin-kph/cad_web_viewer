import { LitElement as c, html as i, css as m } from "lit";
import { property as d, customElement as u } from "lit/decorators.js";
import "@ts3d-hoops/ui-kit";
var v = Object.defineProperty, b = Object.getOwnPropertyDescriptor, n = (a, s, l, e) => {
  for (var o = e > 1 ? void 0 : e ? b(s, l) : s, r = a.length - 1, p; r >= 0; r--)
    (p = a[r]) && (o = (e ? p(s, l, o) : p(o)) || o);
  return e && o && v(s, l, o), o;
};
let t = class extends c {
  constructor() {
    super(...arguments), this.label = "";
  }
  /** @internal */
  render() {
    return i`
      <hoops-accordion>
        <div class="label" slot="header">${this.label}</div>
        <div class="toolbar" slot="toolbar">
          <slot name="toolbar"></slot>
        </div>
        <div class="content" slot="content">
          <slot></slot>
        </div>
      </hoops-accordion>
    `;
  }
};
t.styles = m`
    :host {
      display: block;
    }
  `;
n([
  d({ type: String })
], t.prototype, "label", 2);
t = n([
  u("hoops-tools-group")
], t);
const y = t;
export {
  t as HoopsToolsGroupElement,
  y as default
};
