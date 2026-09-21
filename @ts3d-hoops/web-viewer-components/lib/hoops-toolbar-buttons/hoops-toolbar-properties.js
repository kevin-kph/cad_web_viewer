import { icons as i } from "@ts3d-hoops/ui-kit";
import { LitElement as u, html as m } from "lit";
import { property as f, customElement as a } from "lit/decorators.js";
var h = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, c = (n, t, s, e) => {
  for (var o = e > 1 ? void 0 : e ? _(t, s) : t, p = n.length - 1, l; p >= 0; p--)
    (l = n[p]) && (o = (e ? l(t, s, o) : l(o)) || o);
  return e && o && h(t, s, o), o;
};
let r = class extends u {
  constructor() {
    super(...arguments), this.color = "default";
  }
  /** @internal */
  render() {
    return m`<hoops-icon-button title="Toggle properties" .color=${this.color}
      >${i.search}</hoops-icon-button
    >`;
  }
};
c([
  f()
], r.prototype, "color", 2);
r = c([
  a("hoops-toolbar-properties")
], r);
const E = r;
export {
  r as HoopsPropertiesButtonElement,
  E as default
};
