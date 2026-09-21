const t = ["Perspective", "Orthographic"], n = ["Camera Target", "Model Center", "Orbit Target"];
function o(e) {
  return t.includes(e);
}
function i(e) {
  return n.includes(e);
}
function a(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const r = e;
  return o(r.projectionMode) && i(r.orbitFallbackMode);
}
export {
  n as OrbitFallbackModeValues,
  t as ProjectionValues,
  a as isCameraServiceConfiguration,
  i as isOrbitFallbackMode,
  o as isProjection
};
