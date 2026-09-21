import { LitElement as c, html as u } from "lit";
import { property as f, customElement as i } from "lit/decorators.js";
import { icons as a } from "@ts3d-hoops/ui-kit";
var d = Object.defineProperty, h = Object.getOwnPropertyDescriptor, m = (p, e, l, t) => {
  for (var o = t > 1 ? void 0 : t ? h(e, l) : e, s = p.length - 1, n; s >= 0; s--)
    (n = p[s]) && (o = (t ? n(e, l, o) : n(o)) || o);
  return t && o && d(e, l, o), o;
};
let r = class extends c {
  constructor() {
    super(...arguments), this.color = "default";
  }
  /** @internal */
  render() {
    return u`<hoops-icon-button size="sm" title="Toggle model tree" .color=${this.color}
      >${a.modelTree}</hoops-icon-button
    >`;
  }
};
m([
  f()
], r.prototype, "color", 2);
r = m([
  i("hoops-toolbar-model-tree")
], r);
const E = r;
export {
  r as HoopsModelTreeButtonElement,
  E as default
};
