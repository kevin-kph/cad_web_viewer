import { css as n, LitElement as h, html as p } from "lit-element";
import { property as d, customElement as b } from "lit/decorators.js";
var u = Object.defineProperty, g = Object.getOwnPropertyDescriptor, i = (e, r, l, s) => {
  for (var t = s > 1 ? void 0 : s ? g(r, l) : r, a = e.length - 1, c; a >= 0; a--)
    (c = e[a]) && (t = (s ? c(r, l, t) : c(t)) || t);
  return s && t && u(r, l, t), t;
};
let o = class extends h {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "";
  }
  /** @internal */
  render() {
    return p`
      <label
        class="switch"
        role="switch"
        title=${this.label}
        aria-label=${this.label}
        aria-checked=${this.checked}
        @click=${(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          .checked="${this.checked}"
          ?disabled=${this.disabled}
          @change="${this._toggle}"
        />
        <span class=${["slider", this.disabled ? "disabled" : ""].join(" ")}></span>
      </label>
    `;
  }
  _toggle(e) {
    this.disabled || (e.stopPropagation(), this.checked = e.target.checked, this.dispatchEvent(new Event("change")));
  }
};
o.styles = n`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      --slider-color: color-mix(
        in srgb,
        var(--hoops-background, blue),
        var(--hoops-foreground, red) 30%
      );
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 1.825rem;
      height: 1rem;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      background-color: var(--slider-color);
      box-shadow: 0 0 1px var(--slider-color);
      transition: 0.4s;
      border-radius: 1rem;
    }

    .slider.disabled {
      cursor: not-allowed;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 1rem;
      width: 1rem;
      left: 0;
      bottom: calc(50% - 0.5rem);
      background-color: var(--hoops-background, #fafafa);
      transition: 0.4s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
    }

    input:checked + .slider.disabled {
      background-color: var(--hoops-accent-foreground-active, var(--blue, #0078d4));
      filter: grayscale(1);
    }

    input:checked + .slider:before {
      transform: translateX(0.825rem);
    }
  `;
i([
  d({ type: Boolean })
], o.prototype, "checked", 2);
i([
  d({ type: Boolean })
], o.prototype, "disabled", 2);
i([
  d({ type: String })
], o.prototype, "label", 2);
o = i([
  b("hoops-switch")
], o);
const v = o;
export {
  o as HoopsSwitchElement,
  v as default
};
