import { css as d, LitElement as h, html as p } from "lit";
import { property as s, customElement as u } from "lit/decorators.js";
var f = Object.defineProperty, v = Object.getOwnPropertyDescriptor, r = (e, n, c, i) => {
  for (var t = i > 1 ? void 0 : i ? v(n, c) : n, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (t = (i ? l(n, c, t) : l(t)) || t);
  return i && t && f(n, c, t), t;
};
let o = class extends h {
  constructor() {
    super(), this.tabindex = "0", this.role = "button", this.iconSize = "md", this.color = "default", this.disabled = !1, this.addEventListener("keypress", this.handleKeypress);
  }
  /**
   * Handles keyboard interactions for the button.
   *
   * @param keypressEvent - The keyboard event to handle
   * @returns void
   *
   * @internal
   */
  handleKeypress(e) {
    (e.key === "Space" || e.key === "Enter") && (e.preventDefault(), e.stopPropagation(), this.disabled || this.click());
  }
  /** @internal */
  render() {
    return p`
      <div
        class="container"
        size=${this.iconSize}
        color=${this.color}
        ?aria-disabled=${this.disabled}
      >
        <slot name="icon"></slot>
        <span>
          <slot></slot>
        </span>
      </div>
    `;
  }
};
o.styles = [
  d`
      :host {
        align-self: stretch;
      }
      .container {
        border: none;
        display: flex;
        box-sizing: border-box;
        background-color: transparent;
        color: var(--hoops-neutral-foreground, var(--hoops-foreground, #303030));
        width: 100%;
        padding: 0.4rem 0.6rem;
        transition: background-color linear 0.2s;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        overflow: hidden;
      }
      .container[color='default'] {
        color: var(--hoops-neutral-foreground, var(--hoops-foreground, #303030));
      }
      .container[color='accent'] {
        color: var(--hoops-accent-foreground, var(--blue, #0078d4));
        --hoops-svg-stroke-color: var(--hoops-accent-foreground, var(--blue, #0078d4));
      }

      :host(:is(:hover, :active, :focus))
        .container[color='default']:not([hoopsdisabled]):is(:hover, :active, :focus) {
        color: var(--hoops-neutral-foreground-active, #f0f0f0);
        background-color: var(--hoops-neutral-background-hover, #303030cc);
      }
      :host(:is(:hover, :active, :focus))
        .container[color='accent']:not([hoopsdisabled]):is(:hover, :active, :focus) {
        color: var(--hoops-accent-foreground-active, #f0f0f0);
        background-color: var(--hoops-neutral-background-hover, #303030cc);
      }

      ::slotted([slot='icon']) {
        margin-right: 0.2rem;
      }

      [size='xl'] ::slotted([slot='icon']) {
        width: var(--hoops-xl-icon-button-content-size, 2.6rem);
        height: var(--hoops-xl-icon-button-content-size, 2.6rem);
      }
      [size='md'] ::slotted([slot='icon']) {
        width: var(--hoops-md-icon-button-content-size, 1.6rem);
        height: var(--hoops-md-icon-button-content-size, 1.6rem);
      }
      [size='sm'] ::slotted([slot='icon']) {
        width: var(--hoops-sm-icon-button-content-size, 1.2rem);
        height: var(--hoops-sm-icon-button-content-size, 1.2rem);
      }

      .container[aria-disabled] {
        cursor: default;
        opacity: 0.25;
      }
    `
];
r([
  s({ reflect: !0 })
], o.prototype, "tabindex", 2);
r([
  s({ reflect: !0 })
], o.prototype, "role", 2);
r([
  s()
], o.prototype, "iconSize", 2);
r([
  s()
], o.prototype, "color", 2);
r([
  s({ type: Boolean })
], o.prototype, "disabled", 2);
o = r([
  u("hoops-button")
], o);
export {
  o as default
};
