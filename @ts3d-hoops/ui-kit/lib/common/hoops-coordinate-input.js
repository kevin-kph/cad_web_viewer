import { css as u, LitElement as m, html as h } from "lit";
import { property as l, queryAll as d, customElement as v } from "lit/decorators.js";
var c = Object.defineProperty, y = Object.getOwnPropertyDescriptor, i = (t, e, n, p) => {
  for (var r = p > 1 ? void 0 : p ? y(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (p ? s(e, n, r) : s(r)) || r);
  return p && r && c(e, n, r), r;
};
let a = class extends m {
  /**
   * Constructs a new HoopsCoordinateInputElement with default values.
   *
   * Initializes the component with:
   * - Empty label
   * - Value of 0
   * - Min value of 0
   * - Max value of 100
   */
  constructor() {
    super(), this.label = "", this.value = 0, this.min = 0, this.max = 100;
  }
  /**
   * Lifecycle method called when the element's properties change.
   *
   * This override ensures that both input controls (numeric and range)
   * stay synchronized with the current value property. This is necessary
   * because external updates to the value property may not trigger a
   * re-render of the input elements if they already contain the same value.
   *
   * @param changedProperties - Map of changed properties and their previous values
   *
   * @example
   * ```typescript
   * // When value is updated externally, both inputs will reflect the new value
   * element.value = 42.5; // Both numeric input and slider will show 42.50
   * ```
   */
  update(t) {
    super.update(t), this._inputs.forEach((e) => {
      e.value = this.formattedValue;
    });
  }
  /**
   * Gets the current value formatted as a string with 2 decimal places.
   *
   * This formatter ensures consistent display across both input controls
   * and provides a standardized precision for coordinate values.
   *
   * @returns The formatted value string (e.g., "10.50", "0.00", "-5.25")
   *
   * @example
   * ```typescript
   * element.value = 10.5;
   * console.log(element.formattedValue); // "10.50"
   *
   * element.value = 0;
   * console.log(element.formattedValue); // "0.00"
   * ```
   */
  get formattedValue() {
    return this.value.toFixed(2);
  }
  /** @internal */
  render() {
    const t = this.formattedValue;
    return h`<div>
      <label>${this.label}:</label>
      <input
        type="number"
        .value=${t}
        min=${this.min}
        max=${this.max}
        step="0.01"
        @change=${(e) => this.onChange(parseFloat(e.target.value))}
      />
      <input
        type="range"
        .value=${t}
        min=${this.min}
        max=${this.max}
        step="0.01"
        @change=${(e) => this.onChange(parseFloat(e.target.value))}
      />
    </div>`;
  }
  /**
   * Handles value changes from either the numeric input or range slider.
   *
   * When either input control changes, this method dispatches a custom
   * 'hoops-coordinate-changed' event with the new value and the coordinate
   * label in the event detail.
   *
   * @param value - The new numeric value from the input control
   *
   * @fires hoops-coordinate-changed - Custom event containing the label and new value
   *
   * @internal
   */
  onChange(t) {
    this.dispatchEvent(
      new CustomEvent("hoops-coordinate-changed", {
        detail: { label: this.label, value: t }
      })
    );
  }
};
a.styles = [
  u`
      :host {
        display: block;
      }

      div {
        display: grid;
        grid-template-columns: 1rem 4rem auto;
        align-items: center;
        gap: 0.5rem;
      }

      label {
        text-align: center;
      }

      input[type='number'] {
        width: 4rem;
      }
    `
];
i([
  l({ type: String })
], a.prototype, "label", 2);
i([
  l({ type: Number })
], a.prototype, "value", 2);
i([
  l({ type: Number })
], a.prototype, "min", 2);
i([
  l({ type: Number })
], a.prototype, "max", 2);
i([
  d("input")
], a.prototype, "_inputs", 2);
a = i([
  v("hoops-coordinate-input")
], a);
export {
  a as HoopsCoordinateInputElement
};
