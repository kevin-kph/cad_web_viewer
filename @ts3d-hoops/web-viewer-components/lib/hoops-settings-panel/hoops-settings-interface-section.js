import { LitElement as d, html as c, css as h } from "lit";
import { customElement as g } from "lit/decorators.js";
import { classMap as v } from "lit-html/directives/class-map.js";
import "@ts3d-hoops/ui-kit";
import "../services/index.js";
import "../services/floorplan/index.js";
import { panelStyles as u } from "./panel-styles.js";
import { getService as p } from "../services/serviceRegistry.js";
import { OrientationNames as f, AutoActivationModeNames as b } from "../services/floorplan/types.js";
var y = Object.defineProperty, m = Object.getOwnPropertyDescriptor, S = (t, i, s, r) => {
  for (var l = r > 1 ? void 0 : r ? m(i, s) : i, e = t.length - 1, a; e >= 0; e--)
    (a = t[e]) && (l = (r ? a(i, s, l) : a(l)) || l);
  return r && l && y(i, s, l), l;
};
let n = class extends d {
  constructor() {
    super(...arguments), this.updateCallback = () => this.requestUpdate();
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback(), this.viewService = p("ViewService"), this.floorplanService = p("FloorplanService"), [
      "hoops-view-axis-triad-visibility-changed",
      "hoops-view-nav-cube-visibility-changed",
      "hoops-view-reset"
    ].map((t) => this.viewService.addEventListener(t, this.updateCallback)), [
      "hoops-floorplan-activation-changed",
      "hoops-floorplan-track-camera-changed",
      "hoops-floorplan-orientation-changed",
      "hoops-floorplan-auto-activation-changed",
      "hoops-floorplan-overlay-feet-per-pixel-changed",
      "hoops-floorplan-overlay-zoom-level-changed",
      "hoops-floorplan-overlay-background-opacity-changed",
      "hoops-floorplan-overlay-border-opacity-changed",
      "hoops-floorplan-overlay-avatar-opacity-changed",
      "hoops-floorplan-background-color-changed",
      "hoops-floorplan-border-color-changed",
      "hoops-floorplan-avatar-color-changed",
      "hoops-floorplan-avatar-outline-color-changed",
      "hoops-floorplan-manager-reset"
    ].map((t) => this.floorplanService.addEventListener(t, this.updateCallback));
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.viewService && [
      "hoops-view-axis-triad-visibility-changed",
      "hoops-view-nav-cube-visibility-changed",
      "hoops-view-reset"
    ].map((t) => {
      this.viewService.removeEventListener(t, this.updateCallback);
    }), this.floorplanService && [
      "hoops-floorplan-activation-changed",
      "hoops-floorplan-track-camera-changed",
      "hoops-floorplan-orientation-changed",
      "hoops-floorplan-auto-activation-changed",
      "hoops-floorplan-overlay-feet-per-pixel-changed",
      "hoops-floorplan-overlay-zoom-level-changed",
      "hoops-floorplan-overlay-background-opacity-changed",
      "hoops-floorplan-overlay-border-opacity-changed",
      "hoops-floorplan-overlay-avatar-opacity-changed",
      "hoops-floorplan-background-color-changed",
      "hoops-floorplan-border-color-changed",
      "hoops-floorplan-avatar-color-changed",
      "hoops-floorplan-avatar-outline-color-changed",
      "hoops-floorplan-manager-reset"
    ].map((t) => {
      this.floorplanService.removeEventListener(t, this.updateCallback);
    });
  }
  /** @internal */
  render() {
    const t = this.floorplanService.isActive(), i = this.floorplanService.getOrientation(), s = this.floorplanService.getAutoActivationMode(), r = this.floorplanService.isTrackCameraEnabled(), l = { disabled: !r };
    return c`<div class="settings-root">
      <fieldset>
        <legend>Axis</legend>
        <div class="settings-group">
          <div class="setting-row">
            <div class="setting-label">Show Axis Triad:</div>
            <hoops-switch
              id="show-axis-triad"
              label="Show Axis Triad"
              ?checked=${this.viewService.isAxisTriadVisible()}
              @change=${(e) => {
      const a = e.target;
      this.viewService.setAxisTriadVisible(a.checked);
    }}
            ></hoops-switch>
          </div>
          <div class="setting-row">
            <div class="setting-label">Show Nav Cube:</div>
            <hoops-switch
              id="show-nav-cube"
              label="Show Nav Cube"
              ?checked=${this.viewService.isNavCubeVisible()}
              @change=${(e) => {
      const a = e.target;
      this.viewService.setNavCubeVisible(a.checked);
    }}
            ></hoops-switch>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Floorplan</legend>
        <div class="settings-group">
          <div class="setting-row">
            <div class="setting-label">Activate FloorPlan:</div>
            <hoops-switch
              id="activate-floorplan"
              label="Activate Floorplan"
              ?checked=${t}
              @change=${(e) => {
      const a = e.target;
      this.floorplanService.setActive(a.checked);
    }}
            ></hoops-switch>
          </div>
          <div class="setting-row">
            <div class="setting-label">Track Camera:</div>
            <hoops-switch
              id="track-camera"
              label="Track Camera"
              ?checked=${r}
              @change=${(e) => {
      const a = e.target;
      this.floorplanService.setTrackCameraEnabled(a.checked);
    }}
            ></hoops-switch>
          </div>
          <div class="setting-row">
            <div class="setting-label">Orientation:</div>
            <select
              name="orientation"
              id="orientation"
              .value=${i}
              @change=${(e) => {
      const o = e.target.value;
      this.floorplanService.setOrientation(o);
    }}
            >
              ${f.map((e) => c`<option value=${e} ?selected=${i === e}>
                  ${e}
                </option>`)}
            </select>
          </div>
          <div class="setting-row">
            <div class="setting-label">Auto Activation:</div>
            <select
              name="auto-activation"
              id="auto-activation"
              .value=${s}
              @change=${(e) => {
      const o = e.target.value;
      this.floorplanService.setAutoActivationMode(o);
    }}
            >
              ${b.map((e) => c`<option value=${e} ?selected=${s === e}>
                  ${e}
                </option>`)}
            </select>
          </div>
          <div class="setting-row">
            <div class="setting-label ${v(l)}">
              Overlay Feet per Pixel:
            </div>
            <input
              type="number"
              id="overlay-feet-per-pixel"
              .value=${this.floorplanService.getOverlayFeetPerPixel()}
              step="0.1"
              ?disabled=${!r}
              @input=${(e) => {
      const a = e.target;
      let o = parseFloat(a.value);
      isNaN(o) ? console.warn("Invalid input for Overlay Feet per Pixel") : (o = Math.trunc(o * 10) / 10, this.floorplanService.setOverlayFeetPerPixel(o));
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label ${v(l)}">
              Overlay Zoom Level:
            </div>
            <input
              type="number"
              id="overlay-zoom-level"
              .value=${this.floorplanService.getOverlayZoomLevel()}
              step="1"
              ?disabled=${!r}
              @input=${(e) => {
      const a = e.target, o = parseInt(a.value, 10);
      isNaN(o) ? console.warn("Invalid input for Overlay Zoom Level") : this.floorplanService.setOverlayZoomLevel(o);
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label">Overlay Background Opacity:</div>
            <input
              type="number"
              id="overlay-background-opacity"
              .value=${this.floorplanService.getOverlayBackgroundOpacity()}
              step="0.01"
              min="0"
              max="1"
              @input=${(e) => {
      const a = e.target;
      let o = parseFloat(a.value);
      isNaN(o) ? console.warn("Invalid input for Overlay Background Opacity") : (o = Math.trunc(o * 100) / 100, this.floorplanService.setOverlayBackgroundOpacity(o));
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label">Overlay Border Opacity:</div>
            <input
              type="number"
              id="overlay-border-opacity"
              .value=${this.floorplanService.getOverlayBorderOpacity()}
              step="0.01"
              min="0"
              max="1"
              @input=${(e) => {
      const a = e.target;
      let o = parseFloat(a.value);
      isNaN(o) ? console.warn("Invalid input for Overlay Border Opacity") : (o = Math.trunc(o * 100) / 100, this.floorplanService.setOverlayBorderOpacity(o));
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label">Overlay Avatar Opacity:</div>
            <input
              type="number"
              id="overlay-avatar-opacity"
              .value=${this.floorplanService.getOverlayAvatarOpacity()}
              step="0.01"
              min="0"
              max="1"
              @input=${(e) => {
      const a = e.target;
      let o = parseFloat(a.value);
      isNaN(o) ? console.warn("Invalid input for Overlay Avatar Opacity") : (o = Math.trunc(o * 100) / 100, this.floorplanService.setOverlayAvatarOpacity(o));
    }}
            />
          </div>
          <div class="setting-row">
            <div class="setting-label">Background Color:</div>
            <label>
              ${this.floorplanService.getFloorplanBackgroundColor()}
              <input
                type="color"
                id="floorplan-background-color"
                .value=${this.floorplanService.getFloorplanBackgroundColor()}
                @change=${(e) => {
      const o = e.target.value;
      this.floorplanService.setFloorplanBackgroundColor(o);
    }}
              />
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-label">Border Color:</div>
            <label>
              ${this.floorplanService.getFloorplanBorderColor()}
              <input
                type="color"
                id="floorplan-border-color"
                .value=${this.floorplanService.getFloorplanBorderColor()}
                @change=${(e) => {
      const o = e.target.value;
      this.floorplanService.setFloorplanBorderColor(o);
    }}
              />
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-label">Avatar Color:</div>
            <label>
              ${this.floorplanService.getFloorplanAvatarColor()}
              <input
                type="color"
                id="floorplan-avatar-color"
                .value=${this.floorplanService.getFloorplanAvatarColor()}
                @change=${(e) => {
      const o = e.target.value;
      this.floorplanService.setFloorplanAvatarColor(o);
    }}
              />
            </label>
          </div>
          <div class="setting-row">
            <div class="setting-label">Avatar Outline Color:</div>
            <label>
              ${this.floorplanService.getFloorplanAvatarOutlineColor()}
              <input
                type="color"
                id="floorplan-avatar-outline-color"
                .value=${this.floorplanService.getFloorplanAvatarOutlineColor()}
                @change=${(e) => {
      const o = e.target.value;
      this.floorplanService.setFloorplanAvatarOutlineColor(o);
    }}
              />
            </label>
          </div>
        </div>
      </fieldset>
    </div>`;
  }
};
n.styles = [
  u,
  h`
      :host {
        display: block;
      }
    `
];
n = S([
  g("hoops-settings-interface-section")
], n);
const N = n;
export {
  n as HoopsSettingsInterfaceSectionElement,
  N as default
};
