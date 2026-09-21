function i(n) {
  if (typeof n != "object" || n === null)
    return !1;
  const e = n;
  return typeof e.cappingGeometryVisibility == "boolean" && (typeof e.cappingFaceColor == "string" || typeof e.cappingFaceColor > "u") && (typeof e.cappingLineColor == "string" || typeof e.cappingLineColor > "u");
}
export {
  i as isCuttingServiceConfiguration
};
