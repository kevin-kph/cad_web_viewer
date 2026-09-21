import { LitElement as m, html as u } from "lit";
import { property as a, customElement as f } from "lit/decorators.js";
import { icons as i } from "@ts3d-hoops/ui-kit";
var h = Object.defineProperty, y = Object.getOwnPropertyDescriptor, c = (p, t, s, e) => {
  for (var o = e > 1 ? void 0 : e ? y(t, s) : t, l = p.length - 1, n; l >= 0; l--)
    (n = p[l]) && (o = (e ? n(t, s, o) : n(o)) || o);
  return e && o && h(t, s, o), o;
};
let r = class extends m {
  constructor() {
    super(...arguments), this.color = "default";
  }
  /** @internal */
  render() {
    return u`<hoops-icon-button size="sm" title="Toggle layers" .color=${this.color}
      >${i.layers}</hoops-icon-button
    >`;
  }
};
c([
  a()
], r.prototype, "color", 2);
r = c([
  f("hoops-toolbar-layers")
], r);
const E = r;
export {
  r as HoopsLayersButtonElement,
  E as default
};
