import { C as Color, c as Point2, P as Point3, b as Plane } from "./WebViewer.js";
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result !== null) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return new Color(r, g, b);
  }
  return Color.black();
}
function pointInTriangle2d(p, p0, p1, p2) {
  const A = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
  const sign = A < 0 ? -1 : 1;
  const s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
  const t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;
  return s > 0 && t > 0 && s + t < 2 * A * sign;
}
function pointOnLineSegment2d(point, p1, p2, tolerance) {
  const closestPoint = closestPointOnLine2d(point, p1, p2);
  const distance = Point2.distance(point, closestPoint);
  if (distance <= tolerance) {
    const lo_x = Math.min(p1.x, p2.x);
    const hi_x = Math.max(p1.x, p2.x);
    const lo_y = Math.min(p1.y, p2.y);
    const hi_y = Math.max(p1.y, p2.y);
    if (closestPoint.x < lo_x) return false;
    if (closestPoint.x > hi_x) return false;
    if (closestPoint.y < lo_y) return false;
    if (closestPoint.y > hi_y) return false;
    return true;
  } else return false;
}
function closestPointOnLine2d(point, p1, p2) {
  const v1 = Point2.subtract(p2, p1);
  const v1length = v1.length();
  let U = (point.x - p1.x) * (p2.x - p1.x) + (point.y - p1.y) * (p2.y - p1.y);
  U /= v1length * v1length;
  v1.scale(U);
  return Point2.add(p1, v1);
}
function getCameraPlaneIntersectionPoint(camera, point, view) {
  const target = camera.getTarget();
  const normal = Point3.subtract(camera.getPosition(), target).normalize();
  const plane = Plane.createFromPointAndNormal(target, normal);
  const ray = view.raycastFromPoint(point);
  if (ray === null) {
    return null;
  }
  const intersectionPoint = Point3.zero();
  if (plane.intersectsRay(ray, intersectionPoint)) return intersectionPoint;
  else return null;
}
export {
  pointOnLineSegment2d as a,
  getCameraPlaneIntersectionPoint as g,
  hexToRgb as h,
  pointInTriangle2d as p
};
