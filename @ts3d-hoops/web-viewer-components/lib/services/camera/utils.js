import { Projection as t, OrbitFallbackMode as r } from "@ts3d-hoops/web-viewer";
function a(e) {
  switch (e) {
    case t.Perspective:
      return "Perspective";
    case t.Orthographic:
      return "Orthographic";
    default:
      throw new Error(`Unknown projection mode: ${e}`);
  }
}
function n(e) {
  switch (e) {
    case "Perspective":
      return t.Perspective;
    case "Orthographic":
      return t.Orthographic;
    default:
      throw new Error(`Unknown projection mode: ${e}`);
  }
}
function c(e) {
  switch (e) {
    case r.CameraTarget:
      return "Camera Target";
    case r.ModelCenter:
      return "Model Center";
    case r.OrbitTarget:
      return "Orbit Target";
    default:
      throw new Error(`Unknown orbit fallback mode: ${e}`);
  }
}
function i(e) {
  switch (e) {
    case "Camera Target":
      return r.CameraTarget;
    case "Model Center":
      return r.ModelCenter;
    case "Orbit Target":
      return r.OrbitTarget;
    default:
      throw new Error(`Unknown orbit fallback mode: ${e}`);
  }
}
export {
  c as toServiceOrbitFallbackMode,
  a as toServiceProjectionMode,
  i as toWebViewerOrbitFallbackMode,
  n as toWebViewerProjectionMode
};
