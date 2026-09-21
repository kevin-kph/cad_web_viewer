import { LitElement as m, html as u } from "lit";
import { property as f, customElement as i } from "lit/decorators.js";
import { icons as a } from "@ts3d-hoops/ui-kit";
var h = Object.defineProperty, y = Object.getOwnPropertyDescriptor, c = (n, t, s, e) => {
  for (var o = e > 1 ? void 0 : e ? y(t, s) : t, p = n.length - 1, l; p >= 0; p--)
    (l = n[p]) && (o = (e ? l(t, s, o) : l(o)) || o);
  return e && o && h(t, s, o), o;
};
let r = class extends m {
  constructor() {
    super(...arguments), this.color = "default";
  }
  /** @internal */
  render() {
    return u`<hoops-icon-button size="sm" title="Toggle types" .color=${this.color}
      >${a.typesIcon}</hoops-icon-button
    >`;
  }
};
c([
  f()
], r.prototype, "color", 2);
r = c([
  i("hoops-toolbar-types")
], r);
const E = r;
export {
  r as HoopsTypesButtonElement,
  E as default
};
