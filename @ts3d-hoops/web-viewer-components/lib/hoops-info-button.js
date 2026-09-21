import { LitElement as f, html as c } from "lit";
import { property as n, customElement as h } from "lit/decorators.js";
import { icons as m } from "@ts3d-hoops/ui-kit";
var a = Object.defineProperty, b = Object.getOwnPropertyDescriptor, e = (u, r, i, s) => {
  for (var t = s > 1 ? void 0 : s ? b(r, i) : r, p = u.length - 1, l; p >= 0; p--)
    (l = u[p]) && (t = (s ? l(r, i, t) : l(t)) || t);
  return s && t && a(r, i, t), t;
};
let o = class extends f {
  constructor() {
    super(...arguments), this.tabindex = "0", this.role = "button", this.size = "md", this.color = "default";
  }
  /** @internal */
  render() {
    return c`<hoops-icon-button
      tabindex=${this.tabIndex}
      color=${this.color}
      role=${this.role}
      size=${this.size}
    >
      ${m.info}
    </hoops-icon-button>`;
  }
};
e([
  n({ reflect: !0 })
], o.prototype, "tabindex", 2);
e([
  n({ reflect: !0 })
], o.prototype, "role", 2);
e([
  n()
], o.prototype, "size", 2);
e([
  n()
], o.prototype, "color", 2);
o = e([
  h("hoops-info-button")
], o);
const x = o;
export {
  o as InfoButton,
  x as default
};
