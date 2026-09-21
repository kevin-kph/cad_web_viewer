import { consume as c } from "@lit/context";
import { LitElement as a, html as l } from "lit";
import { customElement as f } from "lit/decorators.js";
import { icons as u } from "@ts3d-hoops/ui-kit";
import "../context-manager/index.js";
import { contextManagerContext as h } from "../context-manager/context-manager.js";
var x = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, p = (i, o, n, e) => {
  for (var t = e > 1 ? void 0 : e ? _(o, n) : o, m = i.length - 1, s; m >= 0; m--)
    (s = i[m]) && (t = (e ? s(o, n, t) : s(t)) || t);
  return e && t && x(o, n, t), t;
};
let r = class extends a {
  action() {
    this.contextManager && this.contextManager.reset();
  }
  /** @internal */
  render() {
    return l`<hoops-icon-button size="sm" title="Home" @click=${this.action}
      >${u.home}</hoops-icon-button
    >`;
  }
};
p([
  c({ context: h })
], r.prototype, "contextManager", 2);
r = p([
  f("hoops-toolbar-home")
], r);
const O = r;
export {
  r as HoopsHomeButtonElement,
  O as default
};
