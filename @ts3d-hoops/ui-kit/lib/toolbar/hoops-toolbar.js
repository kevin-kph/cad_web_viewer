import { css as m, LitElement as p, html as n } from "lit";
import { customElement as d } from "lit/decorators.js";
var c = Object.getOwnPropertyDescriptor, v = (t, l, i, s) => {
  for (var e = s > 1 ? void 0 : s ? c(l, i) : l, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (e = a(e) || e);
  return e;
};
let r = class extends p {
  /** @internal */
  render() {
    return n`<div class="toolbar">
      <slot></slot>
    </div>`;
  }
};
r.styles = [
  m`
      .toolbar {
        display: flex;
        flex-direction: column;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        gap: 0.1rem;
        align-items: center;
        width: 48px;
        height: calc(100% - 1rem);
        overflow: visible;
        --hoops-dropdown-gap: 0.8rem;
      }
    `
];
r = v([
  d("hoops-toolbar")
], r);
export {
  r as Toolbar
};
