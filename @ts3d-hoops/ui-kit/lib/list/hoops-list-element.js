import { consume as p } from "@lit/context";
import { css as m, LitElement as d, html as h } from "lit";
import { property as a, customElement as u } from "lit/decorators.js";
import { listContext as f } from "./context.js";
import { toBaseMouseEvent as v } from "./utils.js";
var y = Object.defineProperty, b = Object.getOwnPropertyDescriptor, l = (e, t, r, i) => {
  for (var o = i > 1 ? void 0 : i ? b(t, r) : t, n = e.length - 1, c; n >= 0; n--)
    (c = e[n]) && (o = (i ? c(t, r, o) : c(o)) || o);
  return i && o && y(t, r, o), o;
};
let s = class extends d {
  constructor() {
    super(...arguments), this.key = Number.NaN, this.name = "", this.selected = !1;
  }
  /** @internal */
  render() {
    var t;
    const e = ["element"];
    return this.selected && e.push("selected"), h`<div class=${e.join(" ")} @click=${this.handleElementClick}>
      <div class="header" elementId=${this.key}>
        ${(t = this.list) == null ? void 0 : t.context.getContent(this.list.context, this.key, this.selected)}
        <slot></slot>
      </div>
    </div>`;
  }
  /**
   * Handles click on the element.
   *
   * This will stop the propagation of the click and propagate a
   * hoops-list-element-click with information about the clicked element.
   *
   * @fires hoops-list-element-click - Emitted with click metadata for the selected element
   *
   * @param {MouseEvent} event The event that triggered the listener.
   * @returns {void}
   */
  handleElementClick(e) {
    e.stopPropagation();
    const t = e.target, r = {
      key: this.key,
      ...v(e),
      source: t
    };
    this.dispatchEvent(
      new CustomEvent(
        "hoops-list-element-click",
        {
          bubbles: !0,
          composed: !0,
          detail: r
        }
      )
    );
  }
};
s.styles = [
  m`
      :host {
        display: block;
      }

      .header {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
      }

      hoops-model-list-element {
        width: 100%;
      }

      .element {
        color: var(--hoops-neutral-foreground-rest, color-mix(in srgb, #303030, #000000 20%));
        stroke: var(--hoops-neutral-foreground-rest, color-mix(in srgb, #303030, #000000 20%));
      }

      .element.selected {
        color: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
        stroke: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
      }
    `
];
l([
  p({ context: f, subscribe: !0 })
], s.prototype, "list", 2);
l([
  a({ type: Number })
], s.prototype, "key", 2);
l([
  a({ type: String })
], s.prototype, "name", 2);
l([
  a({ type: Boolean })
], s.prototype, "selected", 2);
s = l([
  u("hoops-list-element")
], s);
export {
  s as default
};
