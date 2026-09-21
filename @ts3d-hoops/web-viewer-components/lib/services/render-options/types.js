const n = [
  "Screen Pixels",
  "CSS Pixels",
  "World",
  "Proportion Of Screen Width",
  "Proportion Of Screen Height",
  "Proportion Of Bounding Diagonal"
];
function t(o) {
  return n.includes(o);
}
//! rgb colors as hexadecimal strings
//! undefined if transparent
function i(o) {
  return !!o && typeof o == "object" && (typeof o.top == "string" || o.top === void 0) && (typeof o.bottom == "string" || o.bottom === void 0);
}
function a(o) {
  if (typeof o != "object" || o === null)
    return !1;
  const e = o;
  return typeof e.minimumFramerate == "number" && typeof e.hiddenLineOpacity == "number" && typeof e.showBackfaces == "boolean" && typeof e.ambientOcclusionEnabled == "boolean" && typeof e.ambientOcclusionRadius == "number" && typeof e.antiAliasingEnabled == "boolean" && typeof e.bloomEnabled == "boolean" && typeof e.bloomIntensity == "number" && typeof e.bloomThreshold == "number" && typeof e.silhouetteEnabled == "boolean" && typeof e.reflectionEnabled == "boolean" && typeof e.shadowEnabled == "boolean" && typeof e.shadowInteractive == "boolean" && typeof e.shadowBlurSamples == "number" && typeof e.splatRenderingEnabled == "boolean" && typeof e.splatRenderingSize == "number" && t(e.splatRenderingPointSizeUnit) && typeof e.eyeDomeLightingEnabled == "boolean" && i(e.backgroundColor);
}
export {
  n as PointSizeUnitValues,
  t as isPointSizeUnit,
  a as isRenderOptionsServiceConfiguration,
  i as isVerticalGradient
};
