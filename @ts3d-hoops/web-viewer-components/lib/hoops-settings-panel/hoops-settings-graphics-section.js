import { LitElement as p, html as d, css as v } from "lit";
import { property as g, customElement as b } from "lit/decorators.js";
import "@ts3d-hoops/ui-kit";
import "../services/index.js";
import { panelStyles as m } from "./panel-styles.js";
import { classMap as o } from "lit-html/directives/class-map.js";
import { getService as n } from "../services/serviceRegistry.js";
import { ProjectionValues as u } from "../services/camera/types.js";
import { PointSizeUnitValues as S } from "../services/render-options/types.js";
var w = Object.defineProperty, f = Object.getOwnPropertyDescriptor, h = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? f(t, i) : t, l = e.length - 1, c; l >= 0; l--)
    (c = e[l]) && (a = (s ? c(t, i, a) : c(a)) || a);
  return s && a && w(t, i, a), a;
};
let r = class extends p {
  constructor() {
    super(...arguments), this.minimumFramerate = 0, this.eyeDomeLightingEnabled = !1, this.updateCallback = async () => {
      await this.updatePromisedData(), this.requestUpdate();
    }, this.cameraServiceEvents = [
      "hoops-camera-service-reset",
      "hoops-projection-mode-changed",
      "hoops-orbit-fallback-mode-changed"
    ], this.renderOptionsServiceEvents = [
      "hoops-render-options-service-reset",
      "hoops-minimum-framerate-changed",
      "hoops-hidden-line-opacity-changed",
      "hoops-show-backfaces-changed",
      "hoops-ambient-occlusion-enabled-changed",
      "hoops-ambient-occlusion-radius-changed",
      "hoops-anti-aliasing-enabled-changed",
      "hoops-bloom-enabled-changed",
      "hoops-bloom-intensity-changed",
      "hoops-bloom-threshold-changed",
      "hoops-silhouette-enabled-changed",
      "hoops-reflection-enabled-changed",
      "hoops-shadow-enabled-changed",
      "hoops-shadow-interactive-changed",
      "hoops-shadow-blur-samples-changed",
      "hoops-splat-rendering-enabled-changed",
      "hoops-splat-rendering-size-changed",
      "hoops-splat-rendering-point-size-unit-changed",
      "hoops-eye-dome-lighting-enabled-changed",
      "hoops-background-color-changed"
    ], this.cuttingServiceEvents = [
      "hoops-cutting-service-reset",
      "hoops-capping-geometry-visibility-changed",
      "hoops-capping-face-color-changed",
      "hoops-capping-line-color-changed"
    ], this.selectionServiceEvents = [
      "hoops-selection-service-reset",
      "hoops-enable-face-line-selection-changed",
      "hoops-honors-scene-visibility-changed",
      "hoops-body-color-changed",
      "hoops-face-and-line-color-changed"
    ], this.measurementsServiceEvents = ["hoops-measurement-color-changed"], this.pmiServiceEvents = [
      "hoops-pmi-service-reset",
      "hoops-pmi-color-changed",
      "hoops-pmi-color-override-changed"
    ], this.sheetServiceEvents = [
      "hoops-sheet-service-reset",
      "hoops-sheet-colors-changed",
      "hoops-background-sheet-enabled-changed"
    ];
  }
  async updatePromisedData() {
    this.minimumFramerate = await this.renderOptionsService.getMinimumFramerate(), this.eyeDomeLightingEnabled = await this.renderOptionsService.getEyeDomeLightingEnabled();
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback(), this.cameraService = n("CameraService"), this.cameraServiceEvents.map(
      (e) => this.cameraService.addEventListener(e, this.updateCallback)
    ), this.renderOptionsService = n("RenderOptionsService"), this.renderOptionsServiceEvents.map(
      (e) => this.renderOptionsService.addEventListener(e, this.updateCallback)
    ), this.cuttingService = n("CuttingService"), this.cuttingServiceEvents.map(
      (e) => this.cuttingService.addEventListener(e, this.updateCallback)
    ), this.selectionService = n("SelectionService"), this.selectionServiceEvents.map(
      (e) => this.selectionService.addEventListener(e, this.updateCallback)
    ), this.measurementsService = n("MeasurementService"), this.measurementsServiceEvents.map(
      (e) => this.measurementsService.addEventListener(e, this.updateCallback)
    ), this.pmiService = n("PmiService"), this.pmiServiceEvents.map(
      (e) => this.pmiService.addEventListener(e, this.updateCallback)
    ), this.sheetService = n("SheetService"), this.sheetServiceEvents.map(
      (e) => this.sheetService.addEventListener(e, this.updateCallback)
    ), this.updateCallback();
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.cameraService && this.cameraServiceEvents.map((e) => {
      this.cameraService.removeEventListener(e, this.updateCallback);
    }), this.renderOptionsService && this.renderOptionsServiceEvents.map((e) => {
      this.renderOptionsService.removeEventListener(e, this.updateCallback);
    }), this.cuttingService && this.cuttingServiceEvents.map(
      (e) => this.cuttingService.removeEventListener(e, this.updateCallback)
    ), this.selectionService && this.selectionServiceEvents.map(
      (e) => this.selectionService.removeEventListener(e, this.updateCallback)
    ), this.measurementsService && this.measurementsServiceEvents.map(
      (e) => this.measurementsService.removeEventListener(e, this.updateCallback)
    ), this.pmiService && this.pmiServiceEvents.map(
      (e) => this.pmiService.removeEventListener(e, this.updateCallback)
    ), this.sheetService && this.sheetServiceEvents.map(
      (e) => this.sheetService.removeEventListener(e, this.updateCallback)
    );
  }
  /** @internal */
  render() {
    return d`
      <div class="settings-root">
        <fieldset>
          <legend>General</legend>
          <div class="settings-group">
            <div class="setting-row">
              <label for="projection-mode" class="setting-label" title="Projection Mode"
                >Projection Mode:</label
              >
              <select
                id="projection-mode"
                name="projection-mode"
                .value=${this.cameraService.getProjectionMode()}
                @change=${(e) => {
      const t = e.target;
      this.cameraService.setProjectionMode(t.value);
    }}
              >
                ${u.map((e) => d`<option
                    value=${e}
                    ?selected=${e === this.cameraService.getProjectionMode()}
                  >
                    ${e}
                  </option>`)}
              </select>
            </div>
            <div class="setting-row">
              <label for="framerate" class="setting-label" title="Framerate (fps)"
                >Framerate (fps):</label
              >
              <input
                id="framerate"
                name="framerate"
                type="number"
                min="0"
                step="1"
                .value=${this.minimumFramerate}
                @input=${(e) => {
      const t = e.target, i = parseInt(t.value);
      isNaN(i) || this.renderOptionsService.setMinimumFramerate(i);
    }}
              />
            </div>
            <div class="setting-row">
              <label
                for="hidden-line-opacity"
                class="setting-label"
                title="Hidden Line Opacity (0-1)"
              >
                Hidden Line Opacity (0-1):
              </label>
              <input
                id="hidden-line-opacity"
                name="hidden-line-opacity"
                type="number"
                min="0"
                max="1"
                step="0.1"
                .value=${this.renderOptionsService.getHiddenLineOpacity()}
                @input=${(e) => {
      const t = e.target, i = parseFloat(t.value);
      isNaN(i) || this.renderOptionsService.setHiddenLineOpacity(i);
    }}
              />
            </div>
            <div class="setting-row">
              <label for="show-backfaces" class="setting-label" title="Show Backfaces"
                >Show Backfaces:</label
              >
              <hoops-switch
                id="show-backfaces"
                name="show-backfaces"
                ?checked=${this.renderOptionsService.getShowBackfaces()}
                @change=${(e) => {
      const t = e.target;
      this.renderOptionsService.setShowBackfaces(t.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label
                for="show-capping-geometry"
                class="setting-label"
                title="Show Capping Geometry"
              >
                Show Capping Geometry:
              </label>
              <hoops-switch
                id="show-capping-geometry"
                name="show-capping-geometry"
                ?checked=${this.cuttingService.getCappingGeometryVisibility()}
                @change=${(e) => {
      const t = e.target;
      this.cuttingService.setCappingGeometryVisibility(t.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label
                for="enable-face-line-selection"
                class="setting-label"
                title="Enable Face / Line Selection"
              >
                Enable Face / Line Selection:
              </label>
              <hoops-switch
                id="enable-face-line-selection"
                name="enable-face-line-selection"
                ?checked=${this.selectionService.getEnableFaceLineSelection()}
                @change=${(e) => {
      const t = e.target;
      this.selectionService.setEnableFaceLineSelection(t.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label
                for="selection-honors-scene-visibility"
                class="setting-label"
                title="Selection Honors Scene Visibility"
              >
                Selection Honors Scene Visibility:
              </label>
              <hoops-switch
                id="selection-honors-scene-visibility"
                name="selection-honors-scene-visibility"
                ?checked=${this.selectionService.getHonorsSceneVisibility()}
                @change=${(e) => {
      const t = e.target;
      this.selectionService.setHonorsSceneVisibility(t.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label
                for="rotate-around-camera-center"
                class="setting-label"
                title="Rotate Around Camera Center"
              >
                Rotate Around Camera Center:
              </label>
              <hoops-switch
                id="rotate-around-camera-center"
                name="rotate-around-camera-center"
                ?checked=${this.cameraService.getOrbitFallbackMode() === "Camera Target"}
                @change=${(e) => {
      const t = e.target;
      this.cameraService.setOrbitFallbackMode(
        t.checked ? "Camera Target" : "Model Center"
      );
    }}
              ></hoops-switch>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Effects</legend>
          <div class="settings-group">
            <div class="setting-row">
              <label
                for="enable-ambient-occlusion"
                class="setting-label"
                title="Enable Ambient Occlusion"
              >
                Enable Ambient Occlusion:
              </label>
              <hoops-switch
                id="enable-ambient-occlusion"
                name="enable-ambient-occlusion"
                ?checked=${this.renderOptionsService.getAmbientOcclusionEnabled()}
                @change=${(e) => {
      const t = e.target;
      this.renderOptionsService.setAmbientOcclusionEnabled(t.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label
                  for="ao-radius"
                  class=${o({
      "setting-label": !0,
      disabled: !this.renderOptionsService.getAmbientOcclusionEnabled()
    })}
                  title="Radius"
                >
                  Radius:
                </label>
                <input
                  id="ao-radius"
                  name="ao-radius"
                  type="number"
                  step="0.01"
                  ?disabled=${!this.renderOptionsService.getAmbientOcclusionEnabled()}
                  .value=${this.renderOptionsService.getAmbientOcclusionRadius()}
                  @input=${(e) => {
      const t = e.target, i = parseFloat(t.value);
      isNaN(i) || this.renderOptionsService.setAmbientOcclusionRadius(i);
    }}
                />
              </div>
            </div>
            <div class="setting-row">
              <label for="enable-antialiasing" class="setting-label" title="Enable Anti-Aliasing">
                Enable Anti-Aliasing:
              </label>
              <hoops-switch
                id="enable-antialiasing"
                name="enable-antialiasing"
                ?checked=${this.renderOptionsService.getAntiAliasingEnabled()}
                @change=${(e) => {
      const t = e.target;
      this.renderOptionsService.setAntiAliasingEnabled(t.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label for="enable-bloom" class="setting-label" title="Enable Bloom">
                Enable Bloom:
              </label>
              <hoops-switch
                id="enable-bloom"
                name="enable-bloom"
                ?checked=${this.renderOptionsService.getBloomEnabled()}
                @change=${(e) => {
      const t = e.target;
      this.renderOptionsService.setBloomEnabled(t.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label
                  for="intensity-scale"
                  class=${o({
      "setting-label": !0,
      disabled: !this.renderOptionsService.getBloomEnabled()
    })}
                  title="Intensity Scale"
                >
                  Intensity Scale:
                </label>
                <input
                  id="intensity-scale"
                  ?disabled="${!this.renderOptionsService.getBloomEnabled()}"
                  name="intensity-scale"
                  type="number"
                  step="1"
                  .value=${this.renderOptionsService.getBloomIntensity()}
                  @input=${(e) => {
      const t = e.target, i = parseInt(t.value);
      isNaN(i) || this.renderOptionsService.setBloomIntensity(i);
    }}
                />
              </div>
              <div class="setting-row">
                <label
                  for="threshold"
                  class=${o({
      "setting-label": !0,
      disabled: !this.renderOptionsService.getBloomEnabled()
    })}
                  title="Threshold"
                >
                  Threshold:
                </label>
                <input
                  id="threshold"
                  ?disabled="${!this.renderOptionsService.getBloomEnabled()}"
                  name="threshold"
                  type="number"
                  step="0.1"
                  .value=${this.renderOptionsService.getBloomThreshold()}
                  @input=${(e) => {
      const t = e.target, i = parseFloat(t.value);
      isNaN(i) || this.renderOptionsService.setBloomThreshold(i);
    }}
                />
              </div>
            </div>
            <div class="setting-row">
              <label for="silhouette-edges" class="setting-label" title="Silhouette Edges">
                Silhouette Edges:
              </label>
              <hoops-switch
                id="silhouette-edges"
                name="silhouette-edges"
                ?checked=${this.renderOptionsService.getSilhouetteEnabled()}
                @change=${(e) => {
      const t = e.target;
      this.renderOptionsService.setSilhouetteEnabled(t.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label for="reflection-planes" class="setting-label" title="Reflection Planes">
                Reflection Planes:
              </label>
              <hoops-switch
                id="reflection-planes"
                name="reflection-planes"
                ?checked=${this.renderOptionsService.getReflectionEnabled()}
                @change=${(e) => {
      const t = e.target;
      this.renderOptionsService.setReflectionEnabled(t.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="setting-row">
              <label for="enable-shadows" class="setting-label" title="Enable Shadows">
                Enable Shadows:
              </label>
              <hoops-switch
                id="enable-shadows"
                name="enable-shadows"
                ?checked=${this.renderOptionsService.getShadowEnabled()}
                @change=${(e) => {
      const t = e.target;
      this.renderOptionsService.setShadowEnabled(t.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label
                  for="interactive"
                  class=${o({
      "setting-label": !0,
      disabled: !this.renderOptionsService.getShadowEnabled()
    })}
                  title="Interactive"
                >
                  Interactive:
                </label>
                <hoops-switch
                  id="interactive"
                  name="interactive"
                  ?disabled="${!this.renderOptionsService.getShadowEnabled()}"
                  ?checked=${this.renderOptionsService.getShadowInteractive()}
                  @change=${(e) => {
      const t = e.target;
      this.renderOptionsService.setShadowInteractive(t.checked);
    }}
                ></hoops-switch>
              </div>
              <div class="setting-row">
                <label
                  for="blur-samples"
                  class=${o({
      "setting-label": !0,
      disabled: !this.renderOptionsService.getShadowEnabled()
    })}
                  title="Blur Samples"
                >
                  Blur Samples:
                </label>
                <input
                  id="blur-samples"
                  name="blur-samples"
                  type="number"
                  step="1"
                  ?disabled="${!this.renderOptionsService.getShadowEnabled()}"
                  .value=${this.renderOptionsService.getShadowBlurSamples()}
                  @input=${(e) => {
      const t = e.target, i = parseInt(t.value);
      isNaN(i) || this.renderOptionsService.setShadowBlurSamples(i);
    }}
                />
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Point Cloud</legend>
          <div class="settings-group">
            <div class="setting-row">
              <label for="enable-splats" class="setting-label" title="Enable Splats">
                Enable Splats:
              </label>
              <hoops-switch
                id="enable-splats"
                name="enable-splats"
                ?checked=${this.renderOptionsService.getSplatRenderingEnabled()}
                @change=${(e) => {
      const t = e.target;
      this.renderOptionsService.setSplatRenderingEnabled(t.checked);
    }}
              ></hoops-switch>
            </div>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label
                  for="splats-size"
                  class=${o({
      "setting-label": !0,
      disabled: !this.renderOptionsService.getSplatRenderingEnabled()
    })}
                  title="Size"
                >
                  Size:
                </label>
                <input
                  id="splats-size"
                  name="splats-size"
                  type="number"
                  step="0.001"
                  ?disabled="${!this.renderOptionsService.getSplatRenderingEnabled()}"
                  .value=${this.renderOptionsService.getSplatRenderingSize()}
                  @input=${(e) => {
      const t = e.target, i = parseFloat(t.value);
      isNaN(i) || this.renderOptionsService.setSplatRenderingSize(i);
    }}
                />
              </div>
              <div
                class="setting-row"
                style="flex-direction: column; height: fit-content; align-items: start;"
              >
                <label
                  for="splats-mode"
                  class=${o({
      "setting-label": !0,
      disabled: !this.renderOptionsService.getSplatRenderingEnabled()
    })}
                  title="Mode"
                >
                  Mode:
                </label>
                <select
                  id="splats-mode"
                  name="splats-mode"
                  style="align-self: end;"
                  ?disabled="${!this.renderOptionsService.getSplatRenderingEnabled()}"
                  .value=${this.renderOptionsService.getSplatRenderingPointSizeUnit()}
                  @change=${(e) => {
      const i = e.target.value;
      this.renderOptionsService.setSplatRenderingPointSizeUnit(i);
    }}
                >
                  ${S.map((e) => d`<option
                      value=${e}
                      ?sselected=${e === this.renderOptionsService.getSplatRenderingPointSizeUnit()}
                    >
                      ${e}
                    </option>`)}
                </select>
              </div>
            </div>
            <div class="setting-row">
              <label
                for="enable-eye-dome-lighting"
                class="setting-label"
                title="Enable Eye-Dome Lighting"
              >
                Enable Eye-Dome Lighting:
              </label>
              <hoops-switch
                id="enable-eye-dome-lighting"
                name="enable-eye-dome-lighting"
                ?checked=${this.eyeDomeLightingEnabled}
                @change=${(e) => {
      const t = e.target;
      this.renderOptionsService.setEyeDomeLightingEnabled(t.checked);
    }}
              ></hoops-switch>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Color</legend>
          <div class="settings-group">
            <label>Background</label>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label for="background-color-top" class="setting-label" title="Top"> Top: </label>
                <div class="setting-row-group">
                  <span class="color"
                    >${this.renderOptionsService.getBackgroundColor().top ?? "#transparent"}</span
                  >
                  <input
                    id="background-color-top"
                    name="background-color-top"
                    type="color"
                    .value=${this.renderOptionsService.getBackgroundColor().top ?? "#000000"}
                    @change=${(e) => {
      const i = e.target.value, s = this.renderOptionsService.getBackgroundColor();
      this.renderOptionsService.setBackgroundColor({
        top: i,
        bottom: s.bottom
      });
    }}
                  />
                </div>
              </div>
              <div class="setting-row">
                <label for="background-color-bottom" class="setting-label" title="Bottom">
                  Bottom:
                </label>
                <div class="setting-row-group">
                  <span class="color"
                    >${this.renderOptionsService.getBackgroundColor().bottom ?? "#transparent"}</span
                  >
                  <input
                    id="background-color-bottom"
                    name="background-color-bottom"
                    type="color"
                    .value=${this.renderOptionsService.getBackgroundColor().bottom ?? "#000000"}
                    @change=${(e) => {
      const i = e.target.value, s = this.renderOptionsService.getBackgroundColor();
      this.renderOptionsService.setBackgroundColor({
        top: s.top,
        bottom: i
      });
    }}
                  />
                </div>
              </div>
            </div>
            <label>Capping Geometry</label>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label for="capping-geometry-face" class="setting-label" title="Face">Face:</label>
                <div class="setting-row-group">
                  <span class="color"
                    >${this.cuttingService.getCappingFaceColor() ?? "#no-color"}</span
                  >
                  <input
                    id="capping-geometry-face"
                    name="capping-geometry-face"
                    type="color"
                    .value=${this.cuttingService.getCappingFaceColor() ?? "#000000"}
                    @change=${(e) => {
      const i = e.target.value;
      this.cuttingService.setCappingFaceColor(i);
    }}
                  />
                </div>
              </div>
              <div class="setting-row">
                <label for="capping-geometry-line" class="setting-label" title="Line">Line:</label>
                <div class="setting-row-group">
                  <span class="color"
                    >${this.cuttingService.getCappingLineColor() ?? "#no-color"}</span
                  >
                  <input
                    id="capping-geometry-line"
                    name="capping-geometry-line"
                    type="color"
                    .value=${this.cuttingService.getCappingLineColor() ?? "#000000"}
                    @change=${(e) => {
      const i = e.target.value;
      this.cuttingService.setCappingLineColor(i);
    }}
                  />
                </div>
              </div>
            </div>
            <label>Selection</label>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label for="selection-color-body" class="setting-label" title="Body">Body:</label>
                <div class="setting-row-group">
                  <span class="color">${this.selectionService.getBodyColor()}</span>
                  <input
                    id="selection-color-body"
                    name="selection-color-body"
                    type="color"
                    .value=${this.selectionService.getBodyColor()}
                    @change=${(e) => {
      const i = e.target.value;
      this.selectionService.setBodyColor(i);
    }}
                  />
                </div>
              </div>
              <div class="setting-row">
                <label
                  for="selection-color-faces-lines"
                  class="setting-label"
                  title="Faces and Lines"
                >
                  Faces and Lines:
                </label>
                <div class="setting-row-group">
                  <span class="color">${this.selectionService.getFaceAndLineColor()}</span>
                  <input
                    id="selection-color-faces-lines"
                    name="selection-color-faces-lines"
                    type="color"
                    .value=${this.selectionService.getFaceAndLineColor()}
                    @change=${(e) => {
      const i = e.target.value;
      this.selectionService.setFaceAndLineColor(i);
    }}
                  />
                </div>
              </div>
            </div>
            <div class="setting-row">
              <label for="measurement-color" class="setting-label" title="Measurement">
                Measurement:
              </label>
              <div class="setting-row-group">
                <span class="color">${this.measurementsService.getMeasurementColor()}</span>
                <input
                  id="measurement-color"
                  name="measurement-color"
                  type="color"
                  .value=${this.measurementsService.getMeasurementColor()}
                  @change=${(e) => {
      const i = e.target.value;
      this.measurementsService.setMeasurementColor(i);
    }}
                />
              </div>
            </div>
            <div class="setting-row">
              <label for="pmi-override-color" class="setting-label" title="PMI Override">
                PMI Override:
              </label>
              <div class="setting-row-group">
                <hoops-switch
                  id="pmi-override-enable"
                  name="pmi-override-enable"
                  ?checked=${this.pmiService.getPmiColorOverride()}
                  @change=${(e) => {
      const t = e.target;
      this.pmiService.setPmiColorOverride(t.checked);
    }}
                ></hoops-switch>
                <span class=${this.pmiService.getPmiColorOverride() ? "color" : "color disabled"}
                  >${this.pmiService.getPmiColor()}</span
                >
                <input
                  id="pmi-override-color"
                  name="pmi-override-color"
                  type="color"
                  ?disabled=${!this.pmiService.getPmiColorOverride()}
                  .value=${this.pmiService.getPmiColor()}
                  @change=${(e) => {
      const i = e.target.value;
      this.pmiService.setPmiColor(i), this.pmiService.getPmiColorOverride() && this.pmiService.setPmiColorOverride(!0);
    }}
                />
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Drawing</legend>
          <div class="settings-group">
            <label>Drawing Colors</label>
            <div class="settings-subgroup">
              <div class="setting-row">
                <label for="drawing-background-color" class="setting-label" title="Background">
                  Background:
                </label>
                <div class="setting-row-group">
                  <span class="color">${this.sheetService.getSheetBackgroundColor()}</span>
                  <input
                    id="drawing-background-color"
                    name="drawing-background-color"
                    type="color"
                    .value=${this.sheetService.getSheetBackgroundColor()}
                    @change=${(e) => {
      const i = e.target.value;
      this.sheetService.setSheetColors(
        i,
        this.sheetService.getSheetColor(),
        this.sheetService.getSheetShadowColor()
      );
    }}
                  />
                </div>
              </div>
              <div class="setting-row">
                <label for="drawing-sheet-color" class="setting-label" title="Sheet">
                  Sheet:
                </label>
                <div class="setting-row-group">
                  <span class="color">${this.sheetService.getSheetColor()}</span>
                  <input
                    id="drawing-sheet-color"
                    name="drawing-sheet-color"
                    type="color"
                    .value=${this.sheetService.getSheetColor()}
                    @change=${(e) => {
      const i = e.target.value;
      this.sheetService.setSheetColors(
        this.sheetService.getSheetBackgroundColor(),
        i,
        this.sheetService.getSheetShadowColor()
      );
    }}
                  />
                </div>
              </div>
              <div class="setting-row">
                <label for="drawing-sheet-shadow-color" class="setting-label" title="Sheet Shadow">
                  Sheet Shadow:
                </label>
                <div class="setting-row-group">
                  <span class="color">${this.sheetService.getSheetShadowColor()}</span>
                  <input
                    id="drawing-sheet-shadow-color"
                    name="drawing-sheet-shadow-color"
                    type="color"
                    .value=${this.sheetService.getSheetShadowColor()}
                    @change=${(e) => {
      const i = e.target.value;
      this.sheetService.setSheetColors(
        this.sheetService.getSheetBackgroundColor(),
        this.sheetService.getSheetColor(),
        i
      );
    }}
                  />
                </div>
              </div>
            </div>
            <div class="setting-row">
              <label
                for="show-sheet-background"
                class="setting-label"
                title="Show Sheet Background"
              >
                Show Sheet Background:
              </label>
              <hoops-switch
                id="show-sheet-background"
                name="show-sheet-background"
                ?checked=${this.sheetService.getBackgroundSheetEnabled()}
                @change=${(e) => {
      const t = e.target;
      this.sheetService.setBackgroundSheetEnabled(t.checked);
    }}
              ></hoops-switch>
            </div>
          </div>
        </fieldset>
      </div>
    `;
  }
};
r.styles = [
  m,
  v`
      :host {
        display: block;
      }
    `
];
h([
  g({ type: Number })
], r.prototype, "minimumFramerate", 2);
h([
  g({ type: Boolean })
], r.prototype, "eyeDomeLightingEnabled", 2);
r = h([
  b("hoops-settings-graphics-section")
], r);
const F = r;
export {
  r as HoopsSettingsGraphicsSectionElement,
  F as default
};
