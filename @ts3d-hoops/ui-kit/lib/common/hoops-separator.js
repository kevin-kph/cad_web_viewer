import { css as n, LitElement as f, html as c } from "lit";
import { property as h, customElement as d } from "lit/decorators.js";
var m = Object.defineProperty, v = Object.getOwnPropertyDescriptor, l = (i, e, s, o) => {
  for (var r = o > 1 ? void 0 : o ? v(e, s) : e, a = i.length - 1, p; a >= 0; a--)
    (p = i[a]) && (r = (o ? p(e, s, r) : p(r)) || r);
  return o && r && m(e, s, r), r;
};
let t = class extends f {
  constructor() {
    super(...arguments), this.direction = "vertical";
  }
  /**
   * Renders the separator component template.
   *
   * Creates a simple `<hr>` element with CSS classes that determine the separator's
   * appearance based on the direction property. The element uses CSS custom properties
   * for theming and applies appropriate styling for either horizontal or vertical orientation.
   *
   * The rendered element:
   * - Uses semantic `<hr>` element for accessibility
   * - Applies base "separator" class for common styling
   * - Adds direction-specific class ("separator-horizontal" or "separator-vertical")
   * - Respects --hoops-separator-color CSS custom property for theming
   *
   * @returns TemplateResult containing an `<hr>` element with appropriate CSS classes
   *
   * @example
   * ```html
   * <!-- Rendered vertical separator -->
   * <hr class="separator separator-vertical" />
   *
   * <!-- Rendered horizontal separator -->
   * <hr class="separator separator-horizontal" />
   * ```
   *
   * @override
   */
  render() {
    return c`<hr class="separator separator-${this.direction}" />`;
  }
};
t.styles = [
  n`
      :host {
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-content: center;
      }
      .separator {
        border: none;
        border-left: 1px solid var(--hoops-separator-color, #f0f0f0);
      }
      .separator.separator-vertical {
        height: 80%;
        margin: 0px 4px;
        border-left: 1px solid var(--hoops-separator-color, #f0f0f0);
      }
      .separator.separator-horizontal {
        width: 80%;
        margin: 4px 0px;
        border-top: 1px solid var(--hoops-separator-color, #f0f0f0);
      }
    `
];
l([
  h()
], t.prototype, "direction", 2);
t = l([
  d("hoops-separator")
], t);
export {
  t as Separator
};
