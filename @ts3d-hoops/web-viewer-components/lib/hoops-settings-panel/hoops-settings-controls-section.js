import { LitElement as p, html as c, css as v } from "lit";
import { customElement as h } from "lit/decorators.js";
import { classMap as r } from "lit/directives/class-map.js";
import { ifDefined as g } from "lit-html/directives/if-defined.js";
import "@ts3d-hoops/ui-kit";
import "../services/index.js";
import { panelStyles as k } from "./panel-styles.js";
import { calculateWalkSpeedUnitFactor as u, getWalkSpeedUnitName as w } from "../services/walk-operator/utils.js";
import { getService as d } from "../services/serviceRegistry.js";
var b = Object.defineProperty, S = Object.getOwnPropertyDescriptor, m = (o, s, i, t) => {
  for (var e = t > 1 ? void 0 : t ? S(s, i) : s, a = o.length - 1, l; a >= 0; a--)
    (l = o[a]) && (e = (t ? l(s, i, e) : l(e)) || e);
  return t && e && b(s, i, e), e;
};
let n = class extends p {
  constructor() {
    super(...arguments), this.updateCallback = () => this.requestUpdate(), this.walkSpeedUnitFactor = -1, this.updateUnitFactor = () => {
      const o = this.walkOperatorService.getWalkSpeed();
      this.walkSpeedUnitFactor = u(o);
    };
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback(), this.walkOperatorService = d("WalkOperatorService"), [
      "hoops-walk-mode-operator-reset",
      "hoops-mouse-walk-operator-reset",
      "hoops-keyboard-walk-operator-reset",
      "hoops-operators-walk-mode-changed",
      "hoops-operators-walk-rotation-speed-changed",
      "hoops-operators-walk-speed-changed",
      "hoops-operators-elevation-speed-changed",
      "hoops-operators-field-of-view-changed",
      "hoops-operators-mouse-look-enabled-changed",
      "hoops-operators-collision-detection-changed"
    ].map((o) => this.walkOperatorService.addEventListener(o, this.updateCallback)), this.updateUnitFactor(), this.spaceMouseService = d("SpaceMouseService");
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.walkOperatorService && [
      "hoops-walk-mode-operator-reset",
      "hoops-mouse-walk-operator-reset",
      "hoops-keyboard-walk-operator-reset",
      "hoops-operators-walk-mode-changed",
      "hoops-operators-walk-rotation-speed-changed",
      "hoops-operators-walk-speed-changed",
      "hoops-operators-elevation-speed-changed",
      "hoops-operators-field-of-view-changed",
      "hoops-operators-mouse-look-enabled-changed",
      "hoops-operators-collision-detection-changed"
    ].map((o) => {
      this.walkOperatorService.removeEventListener(o, this.updateCallback);
    });
  }
  /** @internal */
  render() {
    const o = this.walkOperatorService.getWalkMode(), s = o === "Keyboard";
    this.walkSpeedUnitFactor < 1 && this.updateUnitFactor();
    const i = w(this.walkSpeedUnitFactor);
    return c`<div class="settings-root">
      <fieldset>
        <legend>Walk Mode</legend>
        <div class="settings-group">
          <div class="setting-row">
            <div class="setting-label" title="Walk Mode">Walk Mode:</div>
            <select
              class="hoops-select"
              id="walk-move-select"
              .value=${o}
              @change=${(t) => {
      const e = t.target;
      this.walkOperatorService.setWalkMode(e.value);
    }}
            >
              <option value="Mouse" ?selected=${o === "Mouse"}>Mouse</option>
              <option value="Keyboard" ?selected=${o === "Keyboard"}>Keyboard</option>
            </select>
          </div>
          <div
            class=${r({ "navigation-group": !0, disabled: !s })}
            title=${g(s ? void 0 : "Keyboard mode is not enabled")}
            ?hidden=${!s}
          >
            <h3>Navigation Keys</h3>
            <div class="settings-group">
              <div class="setting-row">
                <div class="setting-label">Move:</div>
                <div>W / A / S / D</div>
              </div>
              <div class="setting-row">
                <div class="setting-label">Rotate:</div>
                <div>Q / E</div>
              </div>
              <div class="setting-row">
                <div class="setting-label">Up / Down:</div>
                <div>X / C</div>
              </div>
              <div class="setting-row">
                <div class="setting-label">Tilt:</div>
                <div>R / F</div>
              </div>
              <div class="setting-row">
                <div class="setting-label">Toggle Collision Detection:</div>
                <div>V</div>
              </div>
            </div>
            <hoops-separator direction="horizontal"></hoops-separator>
          </div>
          <div class="setting-row">
            <div class="setting-label" title="Rotation (Deg/s)">Rotation (Deg/s):</div>
            <input
              type="number"
              min="0"
              step="1"
              .value=${this.walkOperatorService.getRotationSpeed()}
              @change=${(t) => {
      const e = t.target;
      this.walkOperatorService.setRotationSpeed(parseInt(e.value, 10));
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label" title=${`Walk Speed (${i}/s)`}>
              Walk Speed (${i}/s):
            </div>
            <input
              type="number"
              min="0.1"
              step="0.1"
              .value=${(this.walkOperatorService.getWalkSpeed() / this.walkSpeedUnitFactor).toFixed(
      1
    )}
              @change=${(t) => {
      const e = t.target;
      this.walkOperatorService.setWalkSpeed(
        Math.trunc(parseFloat(e.value) * 10) / 10 * this.walkSpeedUnitFactor
      );
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label" title=${`Elevation Speed (${i}/s)`}>
              Elevation Speed (${i}/s):
            </div>
            <input
              type="number"
              min="0.01"
              step="0.01"
              .value=${(this.walkOperatorService.getElevationSpeed() / this.walkSpeedUnitFactor).toFixed(1)}
              @change=${(t) => {
      const e = t.target;
      this.walkOperatorService.setElevationSpeed(
        Math.trunc(parseFloat(e.value) * 10) / 10 * this.walkSpeedUnitFactor
      );
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label" title="Field of View (Deg)">Field of View (Deg):</div>
            <input
              type="number"
              min="1"
              step="1"
              .value=${this.walkOperatorService.getFieldOfView()}
              @change=${(t) => {
      const e = t.target;
      this.walkOperatorService.setFieldOfView(parseInt(e.value, 10));
    }}
            />
          </div>
          <div class="setting-row">
            <div
              class=${r({ "setting-label": !0, disabled: !s })}
              data-testid="enable-mouse-look-row"
              style="display: flex; align-items: center; gap: 0.75rem"
            >
              <span class="setting-label" title="Enable Mouse Look">Enable Mouse Look:</span>
              <hoops-switch
                label="Enable Mouse Look"
                ?checked=${this.walkOperatorService.isMouseLookEnabled()}
                @change=${(t) => {
      const e = t.target;
      this.walkOperatorService.setMouseLookEnabled(e.checked);
    }}
                ?disabled=${!s}
              ></hoops-switch>
            </div>
            <div
              class=${r({ "setting-label": !0, disabled: !s })}
              data-testid="speed-row"
              style="display: flex; align-items: center; gap: 0.75rem"
            >
              <span class="setting-label" title="Speed">Speed:</span>
              <input
                ?disabled=${!s || !this.walkOperatorService.isMouseLookEnabled()}
                type="number"
                min="1"
                step="1"
                .value=${this.walkOperatorService.getMouseLookSpeed()}
                @change=${(t) => {
      const e = t.target;
      this.walkOperatorService.setMouseLookSpeed(parseInt(e.value, 10));
    }}
              />
            </div>
          </div>
          <div class="setting-row">
            <div class="setting-label" title="Enable Collision Detection">
              Enable Collision Detection:
            </div>
            <hoops-switch
              label="Enable Collision Detection"
              ?checked=${this.walkOperatorService.isCollisionDetectionEnabled()}
              @change=${(t) => {
      const e = t.target;
      this.walkOperatorService.setCollisionDetectionEnabled(e.checked);
    }}
            ></hoops-switch>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Space Mouse</legend>
        <div class="setting-row" style="height: 2rem;">
          <div class="setting-label">Connect space mouse:</div>
          <hoops-button
            title="Connect space mouse"
            @click=${() => {
      this.spaceMouseService.connect();
    }}
          >
            Connect
          </hoops-button>
        </div>
      </fieldset>
    </div>`;
  }
};
n.styles = [
  k,
  v`
      :host {
        display: block;
      }

      h3 {
        margin-top: 0;
      }
    `
];
n = m([
  h("hoops-settings-controls-section")
], n);
export {
  n as HoopsSettingsControlsSectionElement
};
