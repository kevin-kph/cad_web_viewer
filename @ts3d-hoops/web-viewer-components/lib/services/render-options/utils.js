import { PointSizeUnit as e } from "@ts3d-hoops/web-viewer";
function o(r) {
  switch (r) {
    case "Screen Pixels":
      return e.ScreenPixels;
    case "CSS Pixels":
      return e.CSSPixels;
    case "World":
      return e.World;
    case "Proportion Of Screen Width":
      return e.ProportionOfScreenWidth;
    case "Proportion Of Screen Height":
      return e.ProportionOfScreenHeight;
    case "Proportion Of Bounding Diagonal":
      return e.ProportionOfBoundingDiagonal;
    default:
      throw new Error(`Unknown service point size unit: ${r}`);
  }
}
export {
  o as toWebViewerPointSizeUnit
};
