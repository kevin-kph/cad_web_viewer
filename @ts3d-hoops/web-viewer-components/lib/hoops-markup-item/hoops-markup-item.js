import { LitElement as d, html as u, css as i } from "lit";
import { property as p, customElement as m } from "lit/decorators.js";
var v = Object.defineProperty, f = Object.getOwnPropertyDescriptor, c = (n, r, a, t) => {
  for (var e = t > 1 ? void 0 : t ? f(r, a) : r, s = n.length - 1, l; s >= 0; s--)
    (l = n[s]) && (e = (t ? l(r, a, e) : l(e)) || e);
  return t && e && v(r, a, e), e;
};
let o = class extends d {
  constructor() {
    super(...arguments), this.markupId = "", this.selected = !1;
  }
  /** @internal */
  render() {
    return u`<div
      class=${`markup ${this.selected ? "selected" : ""}`}
      @click=${() => this.dispatchEvent(
      new CustomEvent("hoops-select-markup", {
        detail: this.markupId,
        bubbles: !0,
        composed: !0
      })
    )}
    >
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <div class="label"><slot></slot></div>
      <div class="toolbar">
        <slot name="toolbar"></slot>
      </div>
    </div>`;
  }
};
o.styles = i`
    :host {
      display: block;
    }

    .markup {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
      border-bottom: 1px dashed var(--hoops-foreground, #303030);
    }

    .icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .label {
      flex-grow: 1;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .markup:hover,
    .markup:hover .icon {
      color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
      fill: var(--hoops-accent-foreground, var(--blue, #0078d4));
      background-color: color-mix(
        in srgb,
        var(--hoops-neutral-background-20, #fafafa),
        var(--hoops-foreground, #303030) 5%
      );
    }

    .markup.selected {
      background-color: color-mix(
        in srgb,
        var(--hoops-neutral-background-20, #fafafa),
        var(--hoops-accent-foreground-active, var(--blue, #0078d4)) 10%
      );
    }

    .markup.selected,
    .markup.selected .icon,
    .markup.selected .toolbar {
      color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      stroke: var(--hoops-accent-foreground, var(--blue, #0078d4));
      fill: var(--hoops-accent-foreground, var(--blue, #0078d4));
    }
  `;
c([
  p({ type: String })
], o.prototype, "markupId", 2);
c([
  p({ type: Boolean })
], o.prototype, "selected", 2);
o = c([
  m("hoops-markup-item")
], o);
const g = o;
export {
  o as HoopsMarkupItemElement,
  g as default
};
