const t = ["North Up", "Avatar Up"];
function r(e) {
  return t.includes(e);
}
const n = ["Bim", "Bim + Walk", "Never"];
function a(e) {
  return n.includes(e);
}
function i(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const o = e;
  return !!e && typeof e == "object" && typeof o.floorplanActive == "boolean" && typeof o.trackCamera == "boolean" && r(o.orientation) && a(o.autoActivationMode) && typeof o.overlayFeetPerPixel == "number" && typeof o.overlayZoomLevel == "number" && typeof o.overlayBackgroundOpacity == "number" && typeof o.overlayBorderOpacity == "number" && typeof o.overlayAvatarOpacity == "number" && typeof o.floorplanBackgroundColor == "string" && typeof o.floorplanBorderColor == "string" && typeof o.floorplanAvatarColor == "string" && typeof o.floorplanAvatarOutlineColor == "string";
}
export {
  n as AutoActivationModeNames,
  t as OrientationNames,
  a as isAutoActivationModeName,
  i as isFloorplanServiceConfiguration,
  r as isOrientationName
};
