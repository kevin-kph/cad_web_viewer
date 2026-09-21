import { LitElement as u, html as c } from "lit";
import { property as a, customElement as f } from "lit/decorators.js";
import { icons as m } from "@ts3d-hoops/ui-kit";
var g = Object.defineProperty, d = Object.getOwnPropertyDescriptor, p = (l, t, n, r) => {
  for (var o = r > 1 ? void 0 : r ? d(t, n) : t, s = l.length - 1, i; s >= 0; s--)
    (i = l[s]) && (o = (r ? i(t, n, o) : i(o)) || o);
  return r && o && g(t, n, o), o;
};
let e = class extends u {
  constructor() {
    super(...arguments), this.color = "default";
  }
  /** @internal */
  render() {
    return c`<hoops-icon-button size="sm" title="Toggle CAD configurations" .color=${this.color}
      >${m.cadConfiguration}</hoops-icon-button
    >`;
  }
};
p([
  a()
], e.prototype, "color", 2);
e = p([
  f("hoops-toolbar-cad-configuration")
], e);
const v = e;
export {
  e as HoopsCadConfigurationButtonElement,
  v as default
};
