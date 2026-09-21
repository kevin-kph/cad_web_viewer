import { isRenderOptionsServiceConfiguration as w } from "./types.js";
import { AntiAliasingMode as n, PointSizeUnit as d, Color as a } from "@ts3d-hoops/web-viewer";
import { toWebViewerPointSizeUnit as s } from "./utils.js";
const i = class i extends EventTarget {
  constructor() {
    super(), this.serviceName = "RenderOptionsService", this._webViewerReady = !1, this._splatRenderingEnabled = !1, this._splatRenderingSize = 3e-3, this._splatRenderingPointSizeUnit = "Screen Pixels", this.sceneReady = this.sceneReady.bind(this), this._callbackMap = {
      sceneReady: this.sceneReady,
      firstModelLoaded: () => {
        this.updateSplatRenderingEnabled(), this.dispatchEvent(
          new CustomEvent("hoops-render-options-service-reset", { bubbles: !0, composed: !0 })
        );
      },
      modelSwitched: () => {
        this.updateSplatRenderingEnabled(), this.dispatchEvent(
          new CustomEvent("hoops-render-options-service-reset", { bubbles: !0, composed: !0 })
        );
      }
    };
  }
  bind() {
    if (!this._webviewer)
      throw new Error("MarkupManager is not set");
    this._webviewer.setCallbacks(this._callbackMap);
  }
  unbind() {
    if (!this._webviewer)
      throw new Error("WebViewer not set");
    this._webviewer.unsetCallbacks(this._callbackMap);
  }
  get webViewer() {
    return this._webviewer;
  }
  set webViewer(e) {
    this._webviewer !== e && (this._webviewer && this.unbind(), this._webviewer = e, this._webViewerReady = !1, this._webviewer && (this.bind(), this._webviewer.getSceneReady() && this.sceneReady()));
  }
  sceneReady() {
    this._webViewerReady = !0, this.dispatchEvent(
      new CustomEvent("hoops-render-options-service-reset", { bubbles: !0, composed: !0 })
    );
  }
  // --- Minimum Framerate ---
  getMinimumFramerate() {
    return this._webViewerReady ? this._webviewer.getMinimumFramerate() : Promise.resolve(0);
  }
  async setMinimumFramerate(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    await this._webviewer.setMinimumFramerate(e), this.dispatchEvent(
      new CustomEvent("hoops-minimum-framerate-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Hidden Line Opacity ---
  getHiddenLineOpacity() {
    return this._webViewerReady ? this._webviewer.view.getHiddenLineSettings().getObscuredLineOpacity() : 0;
  }
  setHiddenLineOpacity(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    const t = this._webviewer.view;
    t.getHiddenLineSettings().setObscuredLineOpacity(e), t.getDrawModeName() === "HiddenLine" && t.setDrawMode("HiddenLine"), this.dispatchEvent(
      new CustomEvent("hoops-hidden-line-opacity-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Show Backfaces ---
  getShowBackfaces() {
    return this._webViewerReady ? this._webviewer.view.getBackfacesVisible() : !1;
  }
  async setShowBackfaces(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    await this._webviewer.view.setBackfacesVisible(e), this.dispatchEvent(
      new CustomEvent("hoops-show-backfaces-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Ambient Occlusion Enabled ---
  getAmbientOcclusionEnabled() {
    return this._webViewerReady ? this._webviewer.view.getAmbientOcclusionEnabled() : !1;
  }
  async setAmbientOcclusionEnabled(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    await this._webviewer.view.setAmbientOcclusionEnabled(e), this.dispatchEvent(
      new CustomEvent("hoops-ambient-occlusion-enabled-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Ambient Occlusion Radius ---
  getAmbientOcclusionRadius() {
    return this._webViewerReady ? this._webviewer.view.getAmbientOcclusionRadius() : 0;
  }
  async setAmbientOcclusionRadius(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    await this._webviewer.view.setAmbientOcclusionRadius(e), this.dispatchEvent(
      new CustomEvent("hoops-ambient-occlusion-radius-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Anti Aliasing Enabled ---
  getAntiAliasingEnabled() {
    return this._webViewerReady ? this._webviewer.view.getAntiAliasingMode() === n.SMAA : !1;
  }
  async setAntiAliasingEnabled(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    await this._webviewer.view.setAntiAliasingMode(
      e ? n.SMAA : n.None
    ), this.dispatchEvent(
      new CustomEvent("hoops-anti-aliasing-enabled-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Bloom Enabled ---
  getBloomEnabled() {
    return this._webViewerReady ? this._webviewer.view.getBloomEnabled() : !1;
  }
  setBloomEnabled(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    this._webviewer.view.setBloomEnabled(e), this.dispatchEvent(
      new CustomEvent("hoops-bloom-enabled-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Bloom Intensity ---
  getBloomIntensity() {
    return this._webViewerReady ? this._webviewer.view.getBloomIntensityScale() : 0;
  }
  setBloomIntensity(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    this._webviewer.view.setBloomIntensityScale(e), this.dispatchEvent(
      new CustomEvent("hoops-bloom-intensity-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Bloom Threshold ---
  getBloomThreshold() {
    return this._webViewerReady ? this._webviewer.view.getBloomThreshold() : 0;
  }
  setBloomThreshold(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    this._webviewer.view.setBloomThreshold(e), this.dispatchEvent(
      new CustomEvent("hoops-bloom-threshold-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Silhouette Enabled ---
  getSilhouetteEnabled() {
    return this._webViewerReady ? this._webviewer.view.getSilhouetteEnabled() : !1;
  }
  setSilhouetteEnabled(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    this._webviewer.view.setSilhouetteEnabled(e), this.dispatchEvent(
      new CustomEvent("hoops-silhouette-enabled-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Reflection Enabled ---
  getReflectionEnabled() {
    return this._webViewerReady ? this._webviewer.view.getSimpleReflectionEnabled() : !1;
  }
  setReflectionEnabled(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    this._webviewer.view.setSimpleReflectionEnabled(e), this.dispatchEvent(
      new CustomEvent("hoops-reflection-enabled-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Shadow Enabled ---
  getShadowEnabled() {
    return this._webViewerReady ? this._webviewer.view.getSimpleShadowEnabled() : !1;
  }
  async setShadowEnabled(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    this._webviewer.view.setSimpleShadowEnabled(e), this.dispatchEvent(
      new CustomEvent("hoops-shadow-enabled-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Shadow Interactive ---
  getShadowInteractive() {
    return this._webViewerReady ? this._webviewer.view.getSimpleShadowInteractiveUpdateEnabled() : !1;
  }
  setShadowInteractive(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    this._webviewer.view.setSimpleShadowInteractiveUpdateEnabled(e), this.dispatchEvent(
      new CustomEvent("hoops-shadow-interactive-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Shadow Blur Samples ---
  getShadowBlurSamples() {
    return this._webViewerReady ? this._webviewer.view.getSimpleShadowBlurSamples() : 0;
  }
  setShadowBlurSamples(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    this._webviewer.view.setSimpleShadowBlurSamples(e), this.dispatchEvent(
      new CustomEvent("hoops-shadow-blur-samples-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  /*
    Splat rendering is a specific setup for point size.
    When splat rendering is disabled the default values of (1, ScreenPixels) are used for point size.
    When splat rendering is turned on, we will use a default of splatRenderingSize and splatRenderingPointSizeUnit
    (default at .003 and ProportionOfBoundingDiagonal).
  */
  getSplatRenderingEnabled() {
    return this._splatRenderingEnabled;
  }
  async setSplatRenderingEnabled(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    this._splatRenderingEnabled = e, e ? await this._webviewer.view.setPointSize(
      this._splatRenderingSize,
      s(this._splatRenderingPointSizeUnit)
    ) : await this._webviewer.view.setPointSize(1, d.ScreenPixels), this.dispatchEvent(
      new CustomEvent("hoops-splat-rendering-enabled-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  getSplatRenderingSize() {
    return this._splatRenderingSize;
  }
  async setSplatRenderingSize(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    this._splatRenderingSize = e, this._splatRenderingEnabled && await this._webviewer.view.setPointSize(
      this._splatRenderingSize,
      s(this._splatRenderingPointSizeUnit)
    ), this.dispatchEvent(
      new CustomEvent("hoops-splat-rendering-size-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  getSplatRenderingPointSizeUnit() {
    return this._splatRenderingPointSizeUnit;
  }
  async setSplatRenderingPointSizeUnit(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    this._splatRenderingPointSizeUnit = e, this._splatRenderingEnabled && await this._webviewer.view.setPointSize(
      this._splatRenderingSize,
      s(this._splatRenderingPointSizeUnit)
    ), this.dispatchEvent(
      new CustomEvent("hoops-splat-rendering-point-size-unit-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  updateSplatRenderingEnabled() {
    this._webViewerReady && (this._splatRenderingEnabled = this.getSplatRenderingSize() !== 1 || this.getSplatRenderingPointSizeUnit() !== "Screen Pixels");
  }
  // --- Eye Dome Lighting Enabled ---
  async getEyeDomeLightingEnabled() {
    return this._webViewerReady ? this._webviewer.view.getEyeDomeLightingEnabled() : !1;
  }
  async setEyeDomeLightingEnabled(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    await this._webviewer.view.setEyeDomeLightingEnabled(e), this.dispatchEvent(
      new CustomEvent("hoops-eye-dome-lighting-enabled-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  // --- Background Color ---
  getBackgroundColor() {
    var t, r;
    if (!this._webViewerReady)
      return {};
    const e = this._webviewer.view.getBackgroundColor();
    return {
      top: (t = e.top) == null ? void 0 : t.toHexString(),
      bottom: (r = e.bottom) == null ? void 0 : r.toHexString()
    };
  }
  async setBackgroundColor(e) {
    if (!this._webViewerReady)
      throw new Error("WebViewer not ready");
    await this._webviewer.view.setBackgroundColor(
      e.top ? a.fromHexString(e.top) : null,
      e.bottom ? a.fromHexString(e.bottom) : null
    ), this.dispatchEvent(
      new CustomEvent("hoops-background-color-changed", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
  async resetConfiguration(e) {
    const t = e ?? { ...i.DefaultConfig };
    if (!w(t))
      throw new Error("Invalid configuration object");
    await this.setMinimumFramerate(t.minimumFramerate), this.setHiddenLineOpacity(t.hiddenLineOpacity), await this.setShowBackfaces(t.showBackfaces), await this.setAmbientOcclusionEnabled(t.ambientOcclusionEnabled), await this.setAmbientOcclusionRadius(t.ambientOcclusionRadius), await this.setAntiAliasingEnabled(t.antiAliasingEnabled), this.setBloomEnabled(t.bloomEnabled), this.setBloomIntensity(t.bloomIntensity), this.setBloomThreshold(t.bloomThreshold), this.setSilhouetteEnabled(t.silhouetteEnabled), this.setReflectionEnabled(t.reflectionEnabled), await this.setShadowEnabled(t.shadowEnabled), this.setShadowInteractive(t.shadowInteractive), this.setShadowBlurSamples(t.shadowBlurSamples), await this.setSplatRenderingSize(t.splatRenderingSize), await this.setSplatRenderingPointSizeUnit(t.splatRenderingPointSizeUnit), await this.setSplatRenderingEnabled(t.splatRenderingEnabled), await this.setEyeDomeLightingEnabled(t.eyeDomeLightingEnabled), await this.setBackgroundColor(t.backgroundColor);
  }
};
i.DefaultConfig = {
  minimumFramerate: 13,
  hiddenLineOpacity: 0.2,
  showBackfaces: !1,
  ambientOcclusionEnabled: !1,
  ambientOcclusionRadius: 0.03,
  antiAliasingEnabled: !0,
  bloomEnabled: !1,
  bloomIntensity: 1,
  bloomThreshold: 0.65,
  silhouetteEnabled: !1,
  reflectionEnabled: !1,
  shadowEnabled: !1,
  shadowInteractive: !0,
  shadowBlurSamples: 5,
  splatRenderingEnabled: !0,
  splatRenderingSize: 3e-3,
  splatRenderingPointSizeUnit: "Screen Pixels",
  eyeDomeLightingEnabled: !1,
  backgroundColor: {}
};
let o = i;
export {
  o as default
};
