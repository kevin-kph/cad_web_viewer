import { LitElement as c, html as m } from "lit";
import { property as u, customElement as f } from "lit/decorators.js";
import { icons as v } from "@ts3d-hoops/ui-kit";
var a = Object.defineProperty, h = Object.getOwnPropertyDescriptor, i = (p, t, s, e) => {
  for (var o = e > 1 ? void 0 : e ? h(t, s) : t, l = p.length - 1, n; l >= 0; l--)
    (n = p[l]) && (o = (e ? n(t, s, o) : n(o)) || o);
  return e && o && a(t, s, o), o;
};
let r = class extends c {
  constructor() {
    super(...arguments), this.color = "default";
  }
  /** @internal */
  render() {
    return m`<hoops-icon-button size="sm" title="Toggle views" .color=${this.color}
      >${v.viewIcon}</hoops-icon-button
    >`;
  }
};
i([
  u()
], r.prototype, "color", 2);
r = i([
  f("hoops-toolbar-views")
], r);
const E = r;
export {
  r as HoopsViewsButtonElement,
  E as default
};
