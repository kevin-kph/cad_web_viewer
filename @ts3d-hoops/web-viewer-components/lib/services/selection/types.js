function n(o) {
  if (typeof o != "object" || o === null)
    return !1;
  const e = o;
  return typeof e.faceLineSelectionEnabled == "boolean" && typeof e.honorsSceneVisibility == "boolean" && typeof e.bodyColor == "string" && typeof e.faceAndLineColor == "string";
}
export {
  n as isSelectionServiceConfiguration
};
