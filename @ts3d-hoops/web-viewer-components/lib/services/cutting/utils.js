import { get3dBaseFromVector as s, sortVerticesCounterClockwise as a, Point3 as n } from "@ts3d-hoops/common";
function u(e) {
  return {
    plane: e.plane,
    referenceGeometry: e.referenceGeometry ?? void 0,
    color: e.color,
    lineColor: e.lineColor,
    opacity: e.opacity,
    hideReferenceGeometry: !e.referenceGeometry
  };
}
function l(e, o) {
  return {
    cuttingPlanes: e.getCuttingPlanes().map(u),
    active: e.isActive(),
    hideReferenceGeometry: !!o
  };
}
function f(e, o) {
  return [...Array(e.getCuttingSectionCount())].map((i, t) => {
    const r = e.getCuttingSection(t);
    if (!r)
      throw new Error(`Cutting section at index ${t} not found`);
    return l(
      r,
      o && o.length > t ? o[t] : !1
    );
  });
}
function g(e, o, i) {
  const t = s(e.normal.copy().normalize()), r = i.extents().scale(0.5);
  return a(
    [
      n.subtract(t[1], t[2]),
      n.add(t[1], t[2]),
      n.subtract(t[2], t[1]),
      n.subtract(n.scale(t[2], -1), t[1])
    ].map(
      (c) => n.add(
        new n(c.x * r.x, c.y * r.y, c.z * r.z),
        o
      )
    ),
    t
  ).map((c) => new n(c.x, c.y, c.z));
}
function y(e, o) {
  const i = o.center(), t = e.normal.copy().normalize(), r = n.scale(t, -e.d / e.normal.length());
  return n.add(r, i);
}
export {
  f as convertCuttingSections,
  u as convertHwvCuttingPlaneToCuttingPlane,
  l as convertHwvSectionToSection,
  y as getPlaneCenter,
  g as getReferenceGeometry
};
