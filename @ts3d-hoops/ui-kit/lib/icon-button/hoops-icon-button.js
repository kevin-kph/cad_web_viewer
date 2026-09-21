import { css as h, LitElement as d, html as p } from "lit";
import { property as s, customElement as u } from "lit/decorators.js";
var v = Object.defineProperty, b = Object.getOwnPropertyDescriptor, r = (e, n, c, i) => {
  for (var t = i > 1 ? void 0 : i ? b(n, c) : n, a = e.length - 1, l; a >= 0; a--)
    (l = e[a]) && (t = (i ? l(n, c, t) : l(t)) || t);
  return i && t && v(n, c, t), t;
};
let o = class extends d {
  constructor() {
    super(), this.tabindex = "0", this.role = "button", this.size = "md", this.color = "default", this.disabled = !1, this.addEventListener("keypress", this.handleKeypress);
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
        size=${this.size}
        color="${this.color}"
        ?hoopsdisabled=${this.disabled}
      >
        <slot></slot>
      </div>
    `;
  }
};
o.styles = [
  h`
      :host {
        display: inline-block;
        user-select: none;
      }
      .container {
        border: none;
        display: flex;
        align-items: center;
        background-color: transparent;
        color: var(--hoops-neutral-foreground, #303030);
        transition: background-color linear 0.2s;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        overflow: hidden;
      }
      .container[color='default'] {
        color: var(--hoops-neutral-foreground, #303030);
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
        color: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
        background-color: var(--hoops-neutral-background-hover, #303030cc);
      }
      .container[size='xl'] {
        height: var(--hoops-xl-icon-button-size, 2.8rem);
        width: var(--hoops-xl-icon-button-size, 2.8rem);
      }
      [size='xl'] ::slotted(*) {
        width: var(--hoops-xl-icon-button-content-size, 2.6rem);
        height: var(--hoops-xl-icon-button-content-size, 2.6rem);
      }
      .container[size='md'] {
        height: var(--hoops-md-icon-button-size, 2rem);
        width: var(--hoops-md-icon-button-size, 2rem);
      }
      [size='md'] ::slotted(*) {
        width: var(--hoops-md-icon-button-content-size, 1.6rem);
        height: var(--hoops-md-icon-button-content-size, 1.6rem);
      }
      .container[size='sm'] {
        height: var(--hoops-sm-icon-button-size, 1.8rem);
        width: var(--hoops-sm-icon-button-size, 1.8rem);
      }
      [size='sm'] ::slotted(*) {
        width: var(--hoops-sm-icon-button-content-size, 1.2rem);
        height: var(--hoops-sm-icon-button-content-size, 1.2rem);
      }
      .container[hoopsdisabled] {
        cursor: auto;
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
], o.prototype, "size", 2);
r([
  s()
], o.prototype, "color", 2);
r([
  s({ type: Boolean })
], o.prototype, "disabled", 2);
o = r([
  u("hoops-icon-button")
], o);
export {
  o as default
};
