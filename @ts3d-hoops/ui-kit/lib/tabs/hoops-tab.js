import { css as b, LitElement as y, html as c } from "lit";
import { property as s, customElement as h } from "lit/decorators.js";
var m = Object.defineProperty, v = Object.getOwnPropertyDescriptor, o = (i, r, l, p) => {
  for (var e = p > 1 ? void 0 : p ? v(r, l) : r, n = i.length - 1, a; n >= 0; n--)
    (a = i[n]) && (e = (p ? a(r, l, e) : a(e)) || e);
  return p && e && m(r, l, e), e;
};
let t = class extends y {
  constructor() {
    super(...arguments), this.label = "", this.disabled = !1;
  }
  /** @internal */
  render() {
    return c`
      <div class="panel" role="tabpanel">
        <slot></slot>
      </div>
    `;
  }
};
t.styles = [
  b`
      :host {
        display: block;
        height: 100%;
      }

      .panel {
        height: 100%;
        box-sizing: border-box;
      }
    `
];
o([
  s({ type: String })
], t.prototype, "label", 2);
o([
  s({ type: String })
], t.prototype, "value", 2);
o([
  s({ type: String })
], t.prototype, "icon", 2);
o([
  s({ type: Boolean })
], t.prototype, "disabled", 2);
t = o([
  h("hoops-tab")
], t);
export {
  t as HoopsTabElement
};
