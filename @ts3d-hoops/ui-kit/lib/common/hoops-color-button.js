import { css as h, LitElement as c, html as u } from "lit";
import { property as i, customElement as d } from "lit/decorators.js";
import { styleMap as b } from "lit-html/directives/style-map.js";
import "../button/hoops-button.js";
import "../icons/hoops-icon.js";
import "../icons/icons.js";
var f = Object.defineProperty, y = Object.getOwnPropertyDescriptor, o = (s, l, p, r) => {
  for (var e = r > 1 ? void 0 : r ? y(l, p) : l, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (e = (r ? a(l, p, e) : a(e)) || e);
  return r && e && f(l, p, e), e;
};
let t = class extends c {
  /**
   * Constructs a new HoopsColorButtonElement with default values.
   *
   * Initializes the component with:
   * - Empty title
   * - White color value ("#ffffff")
   * - Disabled state set to false
   */
  constructor() {
    super(), this.tabindex = "0", this.role = "button", this.iconSize = "md", this.color = "default", this.disabled = !1, this.title = "", this.value = "#ffffff", this.disabled = !1;
  }
  /** @internal */
  render() {
    return u`
      <label>
        <hoops-button
          title=${this.title}
          tabindex=${this.tabindex}
          role=${this.role}
          iconSize=${this.iconSize}
          color=${this.color}
          ?disabled=${this.disabled}
          style=${b({
      "--hoops-svg-stroke-color": this.value
    })}
        >
          <slot name="icon" slot="icon"></slot>
          <slot></slot>
          <input
            type="color"
            value=${this.value}
            ?disabled=${this.disabled}
            @change=${(s) => this.onChange(s.target.value)}
          />
        </hoops-button>
      </label>
    `;
  }
  /**
   * Handles value changes from the color input element.
   *
   * When the user selects a new color through the color picker, this method
   * updates the component's value property and dispatches a standard 'change'
   * event to notify parent components of the color selection.
   *
   * @param value - The new color value in hexadecimal format from the color input
   *
   * @fires change - Standard change event indicating the color value has been updated
   *
   * @internal
   */
  onChange(s) {
    this.value = s, this.dispatchEvent(new Event("change"));
  }
};
t.styles = [
  h`
      :host {
        display: block;
      }

      hoops-button {
        position: 'relative';
        cursor: 'pointer';
      }

      hoops-button[disabled] {
        cursor: not-allowed;
      }

      input[type='color'] {
        display: 'inline-block';
        width: 0;
        height: 0;
        opacity: 0;
        position: 'absolute';
      }
    `
];
o([
  i({ type: String })
], t.prototype, "title", 2);
o([
  i({ type: String })
], t.prototype, "value", 2);
o([
  i({ reflect: !0 })
], t.prototype, "tabindex", 2);
o([
  i({ reflect: !0 })
], t.prototype, "role", 2);
o([
  i()
], t.prototype, "iconSize", 2);
o([
  i()
], t.prototype, "color", 2);
o([
  i({ type: Boolean })
], t.prototype, "disabled", 2);
t = o([
  d("hoops-color-button")
], t);
export {
  t as HoopsColorButtonElement
};
