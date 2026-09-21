const mt = "¹", ot = "²", ut = "³", yt = "⁻", xt = "Ω";
var b = /* @__PURE__ */ ((e) => (e[e.unitUnknown = 0] = "unitUnknown", e[e.unitLength = 1] = "unitLength", e[e.unitMass = 2] = "unitMass", e[e.unitTime = 3] = "unitTime", e[e.unitElectricCurrent = 4] = "unitElectricCurrent", e[e.unitThermoTemperature = 5] = "unitThermoTemperature", e[e.unitSubstanceAmount = 6] = "unitSubstanceAmount", e[e.unitLuminosityIntensity = 7] = "unitLuminosityIntensity", e[e.unitPlaneAngle = 8] = "unitPlaneAngle", e[e.unitSolidAngle = 9] = "unitSolidAngle", e[e.unitFrequency = 10] = "unitFrequency", e[e.unitForce = 11] = "unitForce", e[e.unitPressure = 12] = "unitPressure", e[e.unitEnergy = 13] = "unitEnergy", e[e.unitPower = 14] = "unitPower", e[e.unitElectricCharge = 15] = "unitElectricCharge", e[e.unitElectromotiveForce = 16] = "unitElectromotiveForce", e[e.unitCapacitance = 17] = "unitCapacitance", e[e.unitElectricResistance = 18] = "unitElectricResistance", e[e.unitElectricConductance = 19] = "unitElectricConductance", e[e.unitMagneticFlux = 20] = "unitMagneticFlux", e[e.unitMagneticFluxDensity = 21] = "unitMagneticFluxDensity", e[e.unitInductance = 22] = "unitInductance", e[e.unitLuminousFlux = 23] = "unitLuminousFlux", e[e.unitIlluminance = 24] = "unitIlluminance", e[e.unitActivityRadionuclide = 25] = "unitActivityRadionuclide", e[e.unitKerma = 26] = "unitKerma", e[e.unitDoseEquivalent = 27] = "unitDoseEquivalent", e[e.unitCatalyticActivity = 28] = "unitCatalyticActivity", e))(b || {});
function H(e) {
  return e !== null && typeof e == "object" && "x" in e && typeof e.x == "number" && "y" in e && typeof e.y == "number";
}
function K(e) {
  return e !== null && typeof e == "object" && "z" in e && typeof e.z == "number" && H(e);
}
function zt(e) {
  return e !== null && typeof e == "object" && "w" in e && typeof e.w == "number" && K(e);
}
class i {
  /**
   * Creates a new point object.
   * @param x X value
   * @param y Y value
   * @param z Z value
   */
  constructor(t, s, r) {
    this.x = t, this.y = s, this.z = r;
  }
  /**
   * Sets this point equal to another point.
   * @param point The point to assign.
   * @returns This point object.
   */
  assign(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  /**
   * Sets the values of this point.
   * @param x X value to set.
   * @param y Y value to set.
   * @param z Z value to set.
   * @returns This point object.
   */
  set(t, s, r) {
    return this.x = t, this.y = s, this.z = r, this;
  }
  /**
   * Sets an array from this point.
   * @param arr Array to assign.
   */
  toArray(t = [0, 0, 0]) {
    return t[0] = this.x, t[1] = this.y, t[2] = this.z, t;
  }
  /**
   * Sets this point from an array.
   * @param arr Array to assign from.
   * @returns This point object.
   */
  fromArray(t) {
    return this.x = t[0], this.y = t[1], this.z = t[2], this;
  }
  /**
   * Adds another point to this point.
   * @param pt Point to add.
   * @returns This point object.
   */
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  /**
   * Subtracts another point from this point.
   * @param pt Point to subtract.
   * @returns This point object.
   */
  subtract(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  /**
   * Creates a copy of this point.
   * @returns Copy of this point object.
   */
  copy() {
    return new i(this.x, this.y, this.z);
  }
  /**
   * Creates a new [[Point3]] from an object given by [[toJson]].
   * @param objData An object given by [[toJson]].
   * @returns The prepared object.
   */
  static fromJson(t) {
    if (K(t))
      return new i(t.x, t.y, t.z);
    throw new TypeError("Point3.fromJson: data does not satisfy type IPoint3 constraints");
  }
  /**
   * Creates an object ready for JSON serialization.
   * @returns The prepared object.
   */
  toJson() {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    };
  }
  /**
   * Strictly compares this point with another.
   * @param other Point to compare with.
   * @returns True if the values of this point equal those of the other.
   */
  equals(t) {
    return this.x === t.x && this.y === t.y && this.z === t.z;
  }
  /**
   * Compares this point with another using a tolerance.
   * @param other Point to compare with.
   * @param tolerance Tolerance to be used in the comparison.
   * @returns True if the values of this point equal those of the other.
   */
  equalsWithTolerance(t, s) {
    return Math.abs(this.x - t.x) < s && Math.abs(this.y - t.y) < s && Math.abs(this.z - t.z) < s;
  }
  /**
   * Returns a boolean value indicating if this vector lies on a major axis.
   */
  isAxis() {
    return Math.abs(this.x) === 1 && this.y === 0 && this.z === 0 || this.x === 0 && Math.abs(this.y) === 1 && this.z === 0 || this.x === 0 && this.y === 0 && Math.abs(this.z) === 1;
  }
  /**
   * Returns the length of this vector.
   * @returns Vector length.
   */
  length() {
    return i.magnitude(this);
  }
  /**
   * Returns the squared length of this vector.
   * @returns Vector squared length.
   */
  squaredLength() {
    return i.squaredLength(this);
  }
  /**
   * Scale the point by constant value.
   * @param k Constant value to scale by.
   * @returns Point object.
   */
  scale(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  /**
   * Normalizes the vector.
   * @returns This object.
   */
  normalize() {
    const t = this.length();
    return t === 0 ? this : this.scale(1 / t);
  }
  /**
   * Negates the point.
   * @returns This object.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  /**
   * Creates a new Point initialized to (0,0,0).
   * @returns New point with all elements set to 0.
   */
  static zero() {
    return new i(0, 0, 0);
  }
  /**
   * Adds two points.
   * @param p1 First point.
   * @param p2 Second point.
   * @returns Sum of p1 and p2.
   */
  static add(t, s) {
    return new i(t.x + s.x, t.y + s.y, t.z + s.z);
  }
  /**
   * Subtract two points.
   * @param p1 First point.
   * @param p2 Second point.
   * @returns Difference of p1 and p2.
   */
  static subtract(t, s) {
    return new i(t.x - s.x, t.y - s.y, t.z - s.z);
  }
  /**
   * Calculate dot product.
   * @param p1 First point.
   * @param p2 Second point.
   * @returns Dot product of p1 and p2.
   */
  static dot(t, s) {
    return t.x * s.x + t.y * s.y + t.z * s.z;
  }
  /**
   * Calculate cross product.
   * @param p1 First point.
   * @param p2 Second point.
   * @returns Cross product of p1 and p2.
   */
  static cross(t, s) {
    return new i(
      t.y * s.z - t.z * s.y,
      t.z * s.x - t.x * s.z,
      t.x * s.y - t.y * s.x
    );
  }
  /**
   * Returns the length of a vector.
   * @returns Vector length.
   */
  static magnitude(t) {
    return Math.sqrt(i.squaredLength(t));
  }
  /**
   * Returns the squared length of a vector.
   * @returns Vector squared length.
   */
  static squaredLength(t) {
    return t.x * t.x + t.y * t.y + t.z * t.z;
  }
  /**
   * Normalize a vector.
   * @param v First point.
   * @returns A vector that is colinear to v with a length of 1.
   */
  static normalize(t) {
    return new i(t.x, t.y, t.z).normalize();
  }
  /**
   * Calculate distance between two points
   * @param p1 First point
   * @param p2 Second point
   * @returns Distance between p1 and p2
   */
  static distance(t, s) {
    return i.subtract(s, t).length();
  }
  /**
   * Multiply all scalars of a given point by a same value
   * @param p Point to scale
   * @param k Constant value used to scale p
   * @returns p * k
   */
  static scale(t, s) {
    return new i(t.x * s, t.y * s, t.z * s);
  }
  /**
   * Creates a point from an array of numbers
   * @param arr to assign from
   * @returns new point set from array elements
   */
  static createFromArray(t) {
    return new i(t[0], t[1], t[2]);
  }
}
class D {
  constructor(t, s, r, n) {
    this.x = t, this.y = s, this.z = r, this.w = n;
  }
  scale(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  set(t, s, r, n) {
    this.x = t, this.y = s, this.z = r, this.w = n;
  }
  assign(t) {
    this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w;
  }
  static zero() {
    return new D(0, 0, 0, 0);
  }
  /**
   * Strictly compares this point with another.
   * @param other Point to compare with.
   * @returns True if the values of this point equal those of the other.
   */
  equals(t) {
    return this.x === t.x && this.y === t.y && this.z === t.z;
  }
  /**
   * Compares this point with another using a tolerance.
   * @param other Point to compare with.
   * @param tolerance Tolerance to be used in the comparison.
   * @returns True if the values of this point equal those of the other.
   */
  equalsWithTolerance(t, s) {
    return Math.abs(this.x - t.x) < s && Math.abs(this.y - t.y) < s && Math.abs(this.z - t.z) < s;
  }
}
class S {
  /**
   * Creates a new matrix set to the identity matrix.
   */
  constructor() {
    this.loadIdentity();
  }
  /**
   * Sets the matrix to the identity matrix.
   * @returns This matrix object.
   */
  loadIdentity() {
    return this.m = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], this;
  }
  isIdentity() {
    const t = this.m;
    return t[0] === 1 && t[1] === 0 && t[2] === 0 && t[3] === 0 && t[4] === 0 && t[5] === 1 && t[6] === 0 && t[7] === 0 && t[8] === 0 && t[9] === 0 && t[10] === 1 && t[11] === 0 && t[12] === 0 && t[13] === 0 && t[14] === 0 && t[15] === 1;
  }
  /**
   * Strictly compares this matrix with another.
   * @param other Matrix to compare with.
   * @returns True if the values of this matrix equal those of the other.
   */
  equals(t) {
    for (let s = 0; s < 16; ++s) {
      const r = this.m[s], n = t.m[s];
      if (r !== n)
        return !1;
    }
    return !0;
  }
  /**
   * Compares this matrix with another using a tolerance.
   * @param other Matrix to compare with.
   * @param tolerance Tolerance to be used in the comparison.
   * @returns True if the values of this matrix equal those of the other.
   */
  equalsWithTolerance(t, s) {
    s = Math.abs(s);
    for (let r = 0; r < 16; ++r)
      if (Math.abs(this.m[r] - t.m[r]) > s)
        return !1;
    return !0;
  }
  /**
   * Sets the scale components of this matrix.
   * @param x X scale value.
   * @param y Y scale value.
   * @param z Z scale value.
   * @returns This matrix object.
   */
  setScaleComponent(t, s, r) {
    return this.m[0] = t, this.m[5] = s, this.m[10] = r, this;
  }
  /**
   * Sets the translation components of this matrix.
   * @param x X translation value.
   * @param y Y translation value.
   * @param z Z translation value.
   * @returns This matrix object.
   */
  setTranslationComponent(t, s, r) {
    return this.m[12] = t, this.m[13] = s, this.m[14] = r, this;
  }
  /**
   * Creates a copy of this matrix.
   * @returns Copy of this matrix.
   */
  copy() {
    const t = new S();
    return t.m = this.m.slice(), t;
  }
  /**
   * Sets the value of this matrix to another.
   * @param matrix the matrix whose values will be set.
   * @returns This matrix object.
   */
  assign(t) {
    for (let s = 0; s < t.m.length; s++)
      this.m[s] = t.m[s];
    return this;
  }
  /**
   * Multiply the matrix by given scalar.
   * @param scalar Scalar to multiply the matrix with.
   * @return This matrix object.
   */
  multiplyByScalar(t) {
    for (let s = 0; s < 16; s++)
      this.m[s] *= t;
    return this;
  }
  /**
   * Transforms a point according to this matrix. The source and destination points are allowed to be the same object.
   * @param point The point to be transformed.
   * @param result A Point3 which can hold the result of the transformation.
   * @returns A new point if result is undefined, result otherwise.
   */
  transform(t, s) {
    return s = s ?? i.zero(), s.set(
      t.x * this.m[0] + t.y * this.m[4] + t.z * this.m[8] + this.m[12],
      t.x * this.m[1] + t.y * this.m[5] + t.z * this.m[9] + this.m[13],
      t.x * this.m[2] + t.y * this.m[6] + t.z * this.m[10] + this.m[14]
    ), s;
  }
  /**
   * Transforms a point according to this matrix. The source and destination points are allowed to be the same object.
   * @param point The point to be transformed.
   * @param result A Point3 which can hold the result of the transformation.
   * @returns A new point if result is undefined, result otherwise.
   */
  transform4(t, s) {
    return s = s ?? D.zero(), s.set(
      t.x * this.m[0] + t.y * this.m[4] + t.z * this.m[8] + this.m[12] * t.w,
      t.x * this.m[1] + t.y * this.m[5] + t.z * this.m[9] + this.m[13] * t.w,
      t.x * this.m[2] + t.y * this.m[6] + t.z * this.m[10] + this.m[14] * t.w,
      t.x * this.m[3] + t.y * this.m[7] + t.z * this.m[11] + this.m[15] * t.w
    ), s;
  }
  /**
   * Transforms an array of points according to this matrix.
   * @param inPoints an array of points to be transformed.
   * @param outPoints an array that will be populated with transformed points. Note that the results will be pushed onto the end of the array.
   */
  transformArray(t, s) {
    for (let r = 0; r < t.length; r++) {
      const n = t[r], a = new i(
        n.x * this.m[0] + n.y * this.m[4] + n.z * this.m[8] + this.m[12],
        n.x * this.m[1] + n.y * this.m[5] + n.z * this.m[9] + this.m[13],
        n.x * this.m[2] + n.y * this.m[6] + n.z * this.m[10] + this.m[14]
      );
      s[r] = a;
    }
  }
  transformBox(t) {
    if (t.isDegenerate())
      return J.invalid();
    const s = t.getCorners();
    for (const n of s)
      this.transform(n, n);
    const r = new J(s[0], s[0]);
    for (let n = 1; n < s.length; ++n) {
      const a = s[n];
      r.addPoint(a);
    }
    return r;
  }
  /**
   * Sets this matrix equal to its transpose.
   * @returns This matrix object.
   */
  // prettier-ignore
  transpose() {
    let t;
    return t = this.m[1], this.m[1] = this.m[4], this.m[4] = t, t = this.m[2], this.m[2] = this.m[8], this.m[8] = t, t = this.m[3], this.m[3] = this.m[12], this.m[12] = t, t = this.m[6], this.m[6] = this.m[9], this.m[9] = t, t = this.m[7], this.m[7] = this.m[13], this.m[13] = t, t = this.m[11], this.m[11] = this.m[14], this.m[14] = t, this;
  }
  /**
   * Creates a matrix from an array of numbers.
   * @param arr 16 element array of numbers.
   * @returns New matrix with elements set to the values of the array parameter. Array elements will be in column-major order.
   */
  static createFromArray(t) {
    const s = new S();
    return s.m = t.slice(), s;
  }
  /**
   * Creates a rotation matrix from an arbitrary axis.
   * @param axis Axis to rotate about.
   * @param degrees Amount of degrees to rotate about the provided axis.
   * @returns Rotation matrix which represents the rotation about the supplied axis.
   */
  static createFromOffAxisRotation(t, s) {
    const r = s * (Math.PI / 180), n = Math.sin(r), a = Math.cos(r), h = new S(), o = t.copy().normalize(), c = 1 - a, m = c * o.x * o.y, u = c * o.x * o.z, y = c * o.y * o.z;
    return h.m[0] = c * o.x * o.x + a, h.m[1] = n * o.z + m, h.m[2] = u - n * o.y, h.m[3] = 0, h.m[4] = m - n * o.z, h.m[5] = c * o.y * o.y + a, h.m[6] = n * o.x + y, h.m[7] = 0, h.m[8] = n * o.y + u, h.m[9] = y - n * o.x, h.m[10] = c * o.z * o.z + a, h.m[11] = 0, h.m[12] = 0, h.m[13] = 0, h.m[14] = 0, h.m[15] = 1, h;
  }
  /**
   * Creates a matrix from three [[Point3]]s, which will be used as the
   * columns of the matrix.
   *
   * @param xAxis The first column.
   * @param yAxis The second column.
   * @param zAxis The third column.
   */
  static createFromBasis(t, s, r) {
    const n = new S();
    return n.m[0] = t.x, n.m[1] = t.y, n.m[2] = t.z, n.m[4] = s.x, n.m[5] = s.y, n.m[6] = s.z, n.m[8] = r.x, n.m[9] = r.y, n.m[10] = r.z, n;
  }
  /**
   * Multiplies two matrices.
   *
   * (p' = ABp <=> p' = multiply(B, A).transform(p))
   *
   * @param m1 The first matrix.
   * @param m2 The second matrix.
   * @returns Matrix which is the result of the multiplication.
   */
  static multiply(t, s) {
    const r = new S();
    return r.m[0] = t.m[0] * s.m[0] + t.m[1] * s.m[4] + t.m[2] * s.m[8] + t.m[3] * s.m[12], r.m[1] = t.m[0] * s.m[1] + t.m[1] * s.m[5] + t.m[2] * s.m[9] + t.m[3] * s.m[13], r.m[2] = t.m[0] * s.m[2] + t.m[1] * s.m[6] + t.m[2] * s.m[10] + t.m[3] * s.m[14], r.m[3] = t.m[0] * s.m[3] + t.m[1] * s.m[7] + t.m[2] * s.m[11] + t.m[3] * s.m[15], r.m[4] = t.m[4] * s.m[0] + t.m[5] * s.m[4] + t.m[6] * s.m[8] + t.m[7] * s.m[12], r.m[5] = t.m[4] * s.m[1] + t.m[5] * s.m[5] + t.m[6] * s.m[9] + t.m[7] * s.m[13], r.m[6] = t.m[4] * s.m[2] + t.m[5] * s.m[6] + t.m[6] * s.m[10] + t.m[7] * s.m[14], r.m[7] = t.m[4] * s.m[3] + t.m[5] * s.m[7] + t.m[6] * s.m[11] + t.m[7] * s.m[15], r.m[8] = t.m[8] * s.m[0] + t.m[9] * s.m[4] + t.m[10] * s.m[8] + t.m[11] * s.m[12], r.m[9] = t.m[8] * s.m[1] + t.m[9] * s.m[5] + t.m[10] * s.m[9] + t.m[11] * s.m[13], r.m[10] = t.m[8] * s.m[2] + t.m[9] * s.m[6] + t.m[10] * s.m[10] + t.m[11] * s.m[14], r.m[11] = t.m[8] * s.m[3] + t.m[9] * s.m[7] + t.m[10] * s.m[11] + t.m[11] * s.m[15], r.m[12] = t.m[12] * s.m[0] + t.m[13] * s.m[4] + t.m[14] * s.m[8] + t.m[15] * s.m[12], r.m[13] = t.m[12] * s.m[1] + t.m[13] * s.m[5] + t.m[14] * s.m[9] + t.m[15] * s.m[13], r.m[14] = t.m[12] * s.m[2] + t.m[13] * s.m[6] + t.m[14] * s.m[10] + t.m[15] * s.m[14], r.m[15] = t.m[12] * s.m[3] + t.m[13] * s.m[7] + t.m[14] * s.m[11] + t.m[15] * s.m[15], r;
  }
  /**
   * Computes the determinant and inverse of a matrix, if possible.
   * @returns An array containing the inverse (or null if not invertible) followed by the determinant
   */
  inverseAndDeterminant() {
    const t = this.m[4] * this.m[9] - this.m[5] * this.m[8], s = this.m[4] * this.m[10] - this.m[6] * this.m[8], r = this.m[4] * this.m[11] - this.m[7] * this.m[8], n = this.m[4] * this.m[13] - this.m[5] * this.m[12], a = this.m[4] * this.m[14] - this.m[6] * this.m[12], h = this.m[4] * this.m[15] - this.m[7] * this.m[12], o = this.m[5] * this.m[10] - this.m[6] * this.m[9], c = this.m[5] * this.m[11] - this.m[7] * this.m[9], m = this.m[5] * this.m[14] - this.m[6] * this.m[13], u = this.m[5] * this.m[15] - this.m[7] * this.m[13], y = this.m[6] * this.m[11] - this.m[7] * this.m[10], x = this.m[6] * this.m[15] - this.m[7] * this.m[14], z = this.m[8] * this.m[13] - this.m[9] * this.m[12], f = this.m[8] * this.m[14] - this.m[10] * this.m[12], l = this.m[8] * this.m[15] - this.m[11] * this.m[12], F = this.m[9] * this.m[14] - this.m[10] * this.m[13], k = this.m[9] * this.m[15] - this.m[11] * this.m[13], I = this.m[10] * this.m[15] - this.m[11] * this.m[14], d = new S();
    d.m[0] = this.m[5] * I - this.m[6] * k + this.m[7] * F, d.m[1] = this.m[2] * k - this.m[3] * F - this.m[1] * I, d.m[2] = this.m[1] * x - this.m[2] * u + this.m[3] * m, d.m[3] = this.m[2] * c - this.m[3] * o - this.m[1] * y, d.m[4] = this.m[6] * l - this.m[7] * f - this.m[4] * I, d.m[5] = this.m[0] * I - this.m[2] * l + this.m[3] * f, d.m[6] = this.m[2] * h - this.m[3] * a - this.m[0] * x, d.m[7] = this.m[0] * y - this.m[2] * r + this.m[3] * s, d.m[8] = this.m[4] * k - this.m[5] * l + this.m[7] * z, d.m[9] = this.m[1] * l - this.m[3] * z - this.m[0] * k, d.m[10] = this.m[0] * u - this.m[1] * h + this.m[3] * n, d.m[11] = this.m[1] * r - this.m[3] * t - this.m[0] * c, d.m[12] = this.m[5] * f - this.m[6] * z - this.m[4] * F, d.m[13] = this.m[0] * F - this.m[1] * f + this.m[2] * z, d.m[14] = this.m[1] * a - this.m[2] * n - this.m[0] * m, d.m[15] = this.m[0] * o - this.m[1] * s + this.m[2] * t;
    const C = d.m[0], R = -d.m[4], X = d.m[8], Y = -d.m[12], O = this.m[0] * C - this.m[1] * R + this.m[2] * X - this.m[3] * Y;
    if (O === 0) return [null, 0];
    const G = 1 / O;
    return d.multiplyByScalar(G), [d, O];
  }
  /**
   * Computes the inverse of a matrix if possible.
   * @param matrix Matrix whose inverse will be computed.
   * @returns Matrix set to the inverse of the supplied matrix.
   */
  static inverse(t) {
    return t.inverseAndDeterminant()[0];
  }
  /**
   * Computes the determinant of the upper-left 3x3 subsection of this matrix.
   */
  upperLeft3x3Determinant() {
    return this.m[0] * (this.m[5] * this.m[10] - this.m[9] * this.m[6]) - this.m[4] * (this.m[1] * this.m[10] - this.m[9] * this.m[2]) + this.m[8] * (this.m[1] * this.m[6] - this.m[5] * this.m[2]);
  }
  /**
   * @returns the version of this matrix suitable for applying to normals,
   * i.e. the inverse transpose of the upper-left 3x3 submatrix.
   */
  normalMatrix() {
    const t = this.copy().setTranslationComponent(0, 0, 0).inverseAndDeterminant()[0];
    return t ? t.transpose() : null;
  }
  /**
   * Creates an object ready for JSON serialization.
   * @returns The prepared object.
   */
  toJson() {
    return this.m.slice();
  }
  /**
   * Creates a new [[Matrix]] from an object given by [[toJson]].
   * @param obj An object given by [[toJson]].
   * @returns The prepared object.
   */
  static fromJson(t) {
    return S.createFromArray(t);
  }
  /** @hidden */
  static toMatrix12(t) {
    return [t[0], t[1], t[2], t[4], t[5], t[6], t[8], t[9], t[10], t[12], t[13], t[14]];
  }
  /**
   * Returns the matrix for a clockwise rotation around the X-axis.
   * @param degrees The degrees of the rotation.
   * @returns The rotation matrix.
   */
  static xAxisRotation(t) {
    const s = new S(), r = W(t), n = Math.cos(r), a = Math.sin(r);
    return s.m[5] = n, s.m[6] = -a, s.m[9] = a, s.m[10] = n, s;
  }
  /**
   * Returns the matrix for a clockwise rotation around the Y-axis.
   * @param degrees The degrees of the rotation.
   * @returns The rotation matrix.
   */
  static yAxisRotation(t) {
    const s = new S(), r = W(t), n = Math.cos(r), a = Math.sin(r);
    return s.m[0] = n, s.m[2] = a, s.m[8] = -a, s.m[10] = n, s;
  }
  /**
   * Returns the matrix for a clockwise rotation around the Z-axis.
   * @param degrees The degrees of the rotation.
   * @returns The rotation matrix.
   */
  static zAxisRotation(t) {
    const s = new S(), r = W(t), n = Math.cos(r), a = Math.sin(r);
    return s.m[0] = n, s.m[1] = -a, s.m[4] = a, s.m[5] = n, s;
  }
}
class L {
  constructor() {
    this.normal = i.zero(), this.d = 0;
  }
  setFromPointAndNormal(t, s) {
    return this.normal.assign(s), this.d = -i.dot(s, t), this;
  }
  /**
   * Update the plane to pass through the three points
   */
  setFromPoints(t, s, r) {
    this.normal = i.cross(i.subtract(s, t), i.subtract(r, t)).normalize(), this.d = -i.dot(t, this.normal);
  }
  setFromCoefficients(t, s, r, n) {
    this.normal.set(t, s, r), this.d = n;
  }
  getCoefficients() {
    const t = this.normal;
    return [t.x, t.y, t.z, this.d];
  }
  distanceToPoint(t) {
    return i.dot(this.normal, t) + this.d;
  }
  rayIntersection(t) {
    const s = i.zero();
    return this.intersectsRay(t, s) ? s : null;
  }
  intersectsRay(t, s) {
    const r = this.distanceToPoint(t.origin);
    if (Math.abs(r) <= 1e-6)
      return s && s.assign(t.origin), !0;
    const n = i.dot(this.normal, t.direction);
    if (Math.abs(n) <= 1e-6)
      return !1;
    const a = -r / n;
    if (a < 0)
      return !1;
    if (s) {
      const h = t.direction.copy().scale(a);
      s.set(t.origin.x + h.x, t.origin.y + h.y, t.origin.z + h.z);
    }
    return !0;
  }
  /**
   * Returns true if the point is on the side of the plane that the plane's normal is directed. Returns false otherwise.
   * @param p The point to test.
   */
  determineSide(t) {
    return this.normal.x * t.x + this.normal.y * t.y + this.normal.z * t.z + this.d > 0;
  }
  /**
   * Creates a copy of this plane
   * @returns a copy of this plane object
   */
  copy() {
    const t = new L();
    return t.normal.assign(this.normal), t.d = this.d, t;
  }
  /**
   * Sets this plane equal to another plane
   * @param plane the plane to assign
   */
  assign(t) {
    this.normal.assign(t.normal), this.d = t.d;
  }
  /**
   * Returns true if the normal and d value are the same.
   * @param plane
   */
  equals(t) {
    return this.normal.equals(t.normal) && this.d === t.d;
  }
  static createFromPointAndNormal(t, s) {
    return new L().setFromPointAndNormal(t, s);
  }
  static createFromPoints(t, s, r) {
    const n = new L();
    return n.setFromPoints(t, s, r), n;
  }
  static createFromCoefficients(t, s, r, n) {
    const a = new L();
    return a.setFromCoefficients(t, s, r, n), a;
  }
}
class E {
  /**
   * Creates a new point
   * @param {number} x value to set for x
   * @param {number} y value to set for y
   */
  constructor(t, s) {
    this.x = t, this.y = s;
  }
  /**
   * Sets this point equal to another point
   * @param {Point2} pt the point whose values will be used to set this object
   * @returns {Point2} the point object
   */
  assign(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  /**
   * Adds a point to this one
   * @param {Point2} pt the point whose values will be added
   * @returns {Point2} the point object
   */
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  /**
   * Subtracts a point from this one
   * @param {Point2} pt the point whose values will be subtracted
   * @returns {Point2} the point object
   */
  subtract(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  /**
   * Scales the point by a constant value
   * @param {number} k the value to scale by
   * @returns {Point2} the point object
   */
  scale(t) {
    return this.x *= t, this.y *= t, this;
  }
  /**
   * Compares this point with another point
   * @param {Point2} pt the point to compare with
   * @returns {Boolean} True if the values of this point equal the other. False otherwise.
   */
  equals(t) {
    return this.x === t.x && this.y === t.y;
  }
  /**
   * Sets the values of this point
   * @param {number} x value to set for x
   * @param {number} y value to set for y
   * @returns {Point2} the point object
   */
  set(t, s) {
    return this.x = t, this.y = s, this;
  }
  /**
   * Creates a copy of this point
   * @returns {Point} Copy of this point
   */
  copy() {
    return new E(this.x, this.y);
  }
  /**
   * Returns the length of this point
   * @returns {number} the point length
   */
  length() {
    return Math.sqrt(this.squaredLength());
  }
  /**
   * Returns the squared length of this vector.
   * @returns Vector squared length.
   */
  squaredLength() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Creates an object ready for JSON serialization.
   * @returns The prepared object.
   */
  toJson() {
    return {
      x: this.x,
      y: this.y
    };
  }
  /**
   * Creates a new [[Point2]] from an object given by [[toJson]].
   * @param objData An object given by [[toJson]].
   * @returns The prepared object.
   */
  static fromJson(t) {
    if (H(t))
      return new E(t.x, t.y);
    throw new TypeError("Point2.fromJson: data does not satisfy type IPoint2 constraints");
  }
  /**
   * Subtracts a point from another
   * @param {Point2} pt1 initial point
   * @param {Point2} pt2 the point to subtract
   * @returns {Point2} new point set to pt1 - pt2
   */
  static subtract(t, s) {
    return new E(t.x - s.x, t.y - s.y);
  }
  /**
   * Adds two points
   * @param {Point2} pt1 initial point
   * @param {Point2} pt2 the point to add
   * @returns {Point2} new point set to pt1 + pt2
   */
  static add(t, s) {
    return new E(t.x + s.x, t.y + s.y);
  }
  /**
   * Scale a point by a constant factor
   * @param {Point2} pt Point to be scaled
   * @param {number} k Amount to scale by
   * @returns {Point2} The scaled point
   */
  static scale(t, s) {
    return new E(t.x * s, t.y * s);
  }
  /**
   * Calculate distance between two points
   * @param {Point2} p1 first point
   * @param {Point2} p2 second point
   * @returns {number} the distance between p1 and p2
   */
  static distance(t, s) {
    return E.subtract(s, t).length();
  }
  /**
   * Creates a point initialized to (0,0)
   * @returns {Point} The new point
   */
  static zero() {
    return new E(0, 0);
  }
  static fromPoint3(t) {
    return new E(t.x, t.y);
  }
}
function j(e) {
  const t = Math.abs(e.x), s = Math.abs(e.y), r = Math.abs(e.z);
  return t <= s && t <= r ? new i(1, 0, 0) : s <= t && s <= r ? new i(0, 1, 0) : new i(0, 0, 1);
}
function U(e, t) {
  const s = j(e), r = i.cross(s, e);
  return t ? (t.assign(r), t) : r;
}
function p(e, t, s, r) {
  const n = s.normal.x * (t.x - e.x) + s.normal.y * (t.y - e.y) + s.normal.z * (t.z - e.z);
  if (Math.abs(n) < 1e-5)
    return !1;
  const a = -(s.d + s.normal.x * e.x + s.normal.y * e.y + s.normal.z * e.z) / n;
  return r.x = e.x + a * (t.x - e.x), r.y = e.y + a * (t.y - e.y), r.z = e.z + a * (t.z - e.z), !(a < 0 || a > 1);
}
function ft(e, t, s, r) {
  const n = i.subtract(s, t), a = n.squaredLength();
  let h = 0;
  a > 0 && (h = ((e.x - t.x) * (s.x - t.x) + (e.y - t.y) * (s.y - t.y) + (e.z - t.z) * (s.z - t.z)) / a), n.set(n.x * h, n.y * h, n.z * h), r.set(t.x + n.x, t.y + n.y, t.z + n.z);
  let o = new i(0, 0, 0);
  return o = i.subtract(e, r), o.length();
}
function B(e) {
  return Math.abs(e - 25.4 / 72) < 0.01 ? "points" : Math.abs(e - 25.4) < 0.01 ? "inch" : Math.abs(e - 1) < 0.01 ? "mm" : Math.abs(e - 10) < 0.01 ? "cm" : Math.abs(e - 25.4 / 6) < 0.01 ? "picas" : Math.abs(e - 12 * 25.4) < 0.01 ? "ft" : Math.abs(e - 36 * 25.4) < 0.01 ? "yd" : Math.abs(e - 1e3) < 0.01 ? "m" : Math.abs(e - 1e6) < 0.01 ? "km" : Math.abs(e - 1760 * 3 * 12 * 25.4) < 0.01 ? "mi" : (console.log(`warning: unit multiplier doesn't map to known type: unit=${e}`), "");
}
function lt(e, t) {
  const s = B(t);
  let r = "";
  for (let n = 2; n < 9 && (r = e.toFixed(n), parseFloat(r) === 0); n++)
    ;
  return parseFloat(r) === 0 && (r = "0"), r + s;
}
function W(e) {
  return e * (Math.PI / 180);
}
function tt(e) {
  return e * (180 / Math.PI);
}
function st(e, t, s) {
  const r = e.copy().normalize(), n = W(t), a = Math.cos(n), h = Math.sin(n), o = 1 - a, c = o * r.x * r.y, m = o * r.x * r.z, u = o * r.y * r.z;
  return s === void 0 && (s = new S()), s.m[0] = o * r.x * r.x + a, s.m[1] = h * r.z + c, s.m[2] = m - h * r.y, s.m[3] = 0, s.m[4] = c - h * r.z, s.m[5] = o * r.y * r.y + a, s.m[6] = h * r.x + u, s.m[7] = 0, s.m[8] = h * r.y + m, s.m[9] = u - h * r.x, s.m[10] = o * r.z * r.z + a, s.m[11] = 0, s.m[12] = 0, s.m[13] = 0, s.m[14] = 0, s.m[15] = 1, s;
}
function dt(e, t, s, r, n, a) {
  const h = i.cross(e.normal, s.normal), o = Math.abs(h.x), c = Math.abs(h.y), m = Math.abs(h.z);
  if (o + c + m < 1e-7) {
    const f = i.subtract(r, t);
    return i.dot(e.normal, f) === 0 ? 1 : 0;
  }
  let u;
  o > c ? o > m ? u = 1 : u = 3 : c > m ? u = 2 : u = 3;
  const y = i.zero(), x = -i.dot(e.normal, t), z = -i.dot(s.normal, r);
  switch (u) {
    // intersect with x=0
    case 1:
      y.x = 0, y.y = (z * e.normal.z - x * s.normal.z) / h.x, y.z = (x * s.normal.y - z * e.normal.y) / h.x;
      break;
    // intersect with y=0
    case 2:
      y.x = (x * s.normal.z - z * e.normal.z) / h.y, y.y = 0, y.z = (z * e.normal.x - x * s.normal.x) / h.y;
      break;
    // intersect with z=0
    case 3:
      y.x = (z * e.normal.y - x * s.normal.y) / h.z, y.y = (x * s.normal.x - z * e.normal.x) / h.z, y.z = 0;
  }
  return n.assign(y), a.set(y.x + h.x, y.y + h.y, y.z + h.z), 2;
}
function et(e, t, s) {
  const r = new L();
  return r.normal.x = (t.y - e.y) * (s.z - e.z) - (t.z - e.z) * (s.y - e.y), r.normal.y = (t.z - e.z) * (s.x - e.x) - (t.x - e.x) * (s.z - e.z), r.normal.z = (t.x - e.x) * (s.y - e.y) - (t.y - e.y) * (s.x - e.x), r.normal.normalize(), r.d = -r.normal.x * e.x - r.normal.y * e.y - r.normal.z * e.z, r;
}
function bt(e, t, s, r, n, a) {
  const h = et(s, r, n);
  return p(e, t, h, a);
}
function wt(e, t) {
  const s = e.copy().normalize(), r = t.copy().normalize(), a = i.cross(s, r).length(), h = i.dot(s, r), o = Math.atan2(a, h);
  return tt(o);
}
function gt(e, t, s, r, n) {
  const a = 2 * Math.PI / r;
  for (let u = 0; u < r; u++) {
    const x = s * Math.cos(a * u), z = s * Math.sin(a * u);
    e[u] = new i(0, x, z);
  }
  e[r] = e[0].copy();
  const h = U(n);
  h.normalize();
  const o = i.cross(h, n);
  o.normalize();
  const c = new S(), m = c.m;
  m[0] = n.x, m[1] = n.y, m[2] = n.z, m[3] = 0, m[4] = h.x, m[5] = h.y, m[6] = h.z, m[7] = 0, m[8] = o.x, m[9] = o.y, m[10] = o.z, m[11] = 0, m[12] = 0, m[13] = 0, m[14] = 0, m[15] = 1, c.transformArray(e, e);
  for (let u = 0; u <= r; u++)
    e[u].set(
      e[u].x + t.x,
      e[u].y + t.y,
      e[u].z + t.z
    );
}
function Mt(e, t, s, r, n, a) {
  const h = e, o = t, c = s, m = r;
  let u = 0, y = 0;
  const x = i.subtract(o, h), z = i.subtract(m, c), f = i.dot(x, h), l = i.dot(x, z), F = i.dot(x, x), k = i.dot(x, c), I = i.dot(z, z), d = i.dot(z, c), C = i.dot(z, h), R = i.dot(x, m), X = i.dot(z, o), Y = F * I - l * l;
  if (Y === 0) {
    let N, v, g, M;
    F !== 0 ? (N = (k - f) / F, N < 0 ? N = 0 : N > 1 && (N = 1), g = (R - f) / F, g < 0 ? g = 0 : g > 1 && (g = 1)) : (N = 0, g = 0), I !== 0 ? (v = (C - d) / I, v < 0 ? v = 0 : v > 1 && (v = 1), M = (X - d) / I, M < 0 ? M = 0 : M > 1 && (M = 1)) : (v = 0, M = 0), u = (N + g) / 2, y = (v + M) / 2;
  } else {
    const N = l * C - l * d - I * f + I * k, v = F * C - F * d + l * k - l * f, g = N / Y, M = v / Y, $ = (k - f) / F, Z = (C - d) / I, P = (R - f) / F, q = (X - d) / I;
    0 <= g && g <= 1 && 0 <= M && M <= 1 ? (u = g, y = M) : g < 0 && 0 <= M && M <= 1 ? (u = g, y = Z) : 1 < g && 0 <= M && M <= 1 ? (u = g, y = q) : 0 <= g && g <= 1 && M < 0 ? (u = $, y = M) : 0 <= g && g <= 1 && 1 < M ? (u = P, y = M) : g < 0 && M < 0 ? (u = $, y = Z) : g < 0 && 1 < M ? (u = P, y = Z) : 1 < g && M < 0 ? (u = $, y = q) : 1 < g && 1 < M && (u = P, y = q), u < 0 ? u = 0 : u > 1 && (u = 1), y < 0 ? y = 0 : y > 1 && (y = 1);
  }
  return n.x = u * x.x + h.x, n.y = u * x.y + h.y, n.z = u * x.z + h.z, a.x = y * z.x + c.x, a.y = y * z.y + c.y, a.z = y * z.z + c.z, i.subtract(a, n).length();
}
function Ft(e, t, s, r) {
  const a = i.zero(), h = i.zero(), o = i.zero(), c = i.zero(), m = i.zero();
  if (o.x = e.x - s.x, o.y = e.y - s.y, o.z = e.z - s.z, c.x = r.x - s.x, c.y = r.y - s.y, c.z = r.z - s.z, Math.abs(c.x) < 1e-12 && Math.abs(c.y) < 1e-12 && Math.abs(c.z) < 1e-12 || (m.x = t.x - e.x, m.y = t.y - e.y, m.z = t.z - e.z, Math.abs(m.x) < 1e-12 && Math.abs(m.y) < 1e-12 && Math.abs(m.z) < 1e-12))
    return null;
  const u = o.x * c.x + o.y * c.y + o.z * c.z, y = c.x * m.x + c.y * m.y + c.z * m.z, x = o.x * m.x + o.y * m.y + o.z * m.z, z = c.x * c.x + c.y * c.y + c.z * c.z, l = (m.x * m.x + m.y * m.y + m.z * m.z) * z - y * y;
  if (Math.abs(l) < 1e-12)
    return null;
  const k = (u * y - x * z) / l, I = (u + y * k) / z;
  return a.x = e.x + k * m.x, a.y = e.y + k * m.y, a.z = e.z + k * m.z, h.x = s.x + I * c.x, h.y = s.y + I * c.y, h.z = s.z + I * c.z, a;
}
function Q(e, t, s) {
  const r = i.subtract(t, e), n = i.subtract(s, e), h = i.dot(n, r) / r.squaredLength();
  return Math.max(0, Math.min(1, h));
}
function kt(e, t, s) {
  const r = Q(e, t, s), n = i.subtract(t, e).scale(r);
  return i.add(e, n);
}
function It(e, t, s, r) {
  const n = Q(e, t, s);
  if (n < 0 || n > 1)
    return !1;
  const a = i.subtract(t, e).scale(n), h = i.add(e, a);
  return i.subtract(h, s).squaredLength() <= r * r;
}
function rt(e, t, s) {
  const r = E.subtract(s, t), n = r.length();
  let a = (e.x - t.x) * (s.x - t.x) + (e.y - t.y) * (s.y - t.y);
  return a /= n * n, r.scale(a), E.add(t, r);
}
function St(e, t, s, r) {
  const n = rt(e, t, s);
  if (E.distance(e, n) <= r) {
    const h = Math.min(t.x, s.x), o = Math.max(t.x, s.x), c = Math.min(t.y, s.y), m = Math.max(t.y, s.y);
    return !(n.x < h || n.x > o || n.y < c || n.y > m);
  } else return !1;
}
function At(e, t, s, r = 0) {
  return !(e.x + r < t.x || e.x > t.x + s.x + r || e.y + r < t.y || e.y > t.y + s.y + r);
}
function Tt(e, t, s, r, n) {
  const a = [], h = i.zero(), o = new S(), c = t / n;
  for (let m = 0, u = 0; m <= n; ++m, u += c)
    st(e, u, o), o.transform(r, h), a.push(i.add(s, h));
  return a;
}
function Et(e) {
  const t = e.sort((n, a) => n.exponent < a.exponent ? 1 : -1);
  let s = "";
  const r = ".";
  for (let n = 0; n < t.length; n++) {
    switch (t[n].basicUnit) {
      case b.unitLength:
        s += w(t[n].factor, "m");
        break;
      case b.unitMass:
        s += nt(t[n].factor, "g");
        break;
      case b.unitTime:
        s += w(t[n].factor, "s");
        break;
      case b.unitElectricCurrent:
        s += w(t[n].factor, "A");
        break;
      case b.unitThermoTemperature:
        s += w(t[n].factor, "K");
        break;
      case b.unitSubstanceAmount:
        s += w(t[n].factor, "mol");
        break;
      case b.unitLuminosityIntensity:
        s += w(t[n].factor, "cd");
        break;
      case b.unitPlaneAngle:
        s += w(t[n].factor, "rad");
        break;
      case b.unitSolidAngle:
        s += w(t[n].factor, "sr");
        break;
      case b.unitFrequency:
        s += w(t[n].factor, "Hz");
        break;
      case b.unitForce:
        s += w(t[n].factor, "N");
        break;
      case b.unitPressure:
        s += w(t[n].factor, "Pa");
        break;
      case b.unitEnergy:
        s += w(t[n].factor, "J");
        break;
      case b.unitPower:
        s += w(t[n].factor, "W");
        break;
      case b.unitElectricCharge:
        s += w(t[n].factor, "C");
        break;
      case b.unitElectromotiveForce:
        s += w(t[n].factor, "V");
        break;
      case b.unitCapacitance:
        s += w(t[n].factor, "F");
        break;
      case b.unitElectricResistance:
        s += w(t[n].factor, "Ω");
        break;
      case b.unitElectricConductance:
        s += w(t[n].factor, "S");
        break;
      case b.unitMagneticFlux:
        s += w(t[n].factor, "Wb");
        break;
      case b.unitMagneticFluxDensity:
        s += w(t[n].factor, "T");
        break;
      case b.unitInductance:
        s += w(t[n].factor, "H");
        break;
      case b.unitLuminousFlux:
        s += w(t[n].factor, "lm");
        break;
      case b.unitIlluminance:
        s += w(t[n].factor, "lx");
        break;
      case b.unitActivityRadionuclide:
        s += w(t[n].factor, "Bq");
        break;
      case b.unitKerma:
        s += w(t[n].factor, "Gy");
        break;
      case b.unitDoseEquivalent:
        s += w(t[n].factor, "Sv");
        break;
      case b.unitCatalyticActivity:
        s += w(t[n].factor, "kat");
        break;
    }
    switch (t[n].exponent) {
      case 2:
        s += "²";
        break;
      case 3:
        s += "³";
        break;
      case -1:
        s += "⁻", s += "¹";
        break;
      case -2:
        s += "⁻", s += "²";
        break;
      case -3:
        s += "⁻", s += "³";
        break;
    }
    n + 1 < t.length && (s += r);
  }
  return s;
}
function w(e, t) {
  let s = "";
  switch (e) {
    case 0.3048:
      s = "ft";
      break;
    case 0.0254:
      s = "inch";
      break;
    case 1e-3:
      s = `m${t}`;
      break;
    case 0.01:
      s = `c${t}`;
      break;
    case 0.1:
      s = `d${t}`;
      break;
    case 1:
      s = t;
      break;
    case 10:
      s = `da${t}`;
      break;
    case 100:
      s = `h${t}`;
      break;
    case 1e3:
      s = `k${t}`;
      break;
    case 60:
      s = "min";
      break;
    case 3600:
      s = "h";
      break;
    case 86400:
      s = "d";
      break;
    case 274.15:
      s = "°C";
      break;
    case 255.927778:
      s = "°F";
      break;
    case 0.555556:
      s = "°R";
      break;
  }
  return s;
}
function nt(e, t) {
  let s = "";
  switch (e) {
    case 1e-6:
      s = `m${t}`;
      break;
    case 1e-5:
      s = `d${t}`;
      break;
    case 1e-4:
      s = `c${t}`;
      break;
    case 1e-3:
      s = t;
      break;
    case 0.01:
      s = `da${t}`;
      break;
    case 0.1:
      s = `h${t}`;
      break;
    case 1:
      s = `k${t}`;
      break;
    case 100:
      s = "q";
      break;
    case 1e3:
      s = "t";
      break;
  }
  return s;
}
function it(e) {
  const t = Math.abs(e.x), s = Math.abs(e.y), r = Math.abs(e.z), n = 1e-4, a = Math.sign(e.x), h = Math.sign(e.y), o = Math.sign(e.z);
  switch (!0) {
    case (t < n && s < n && r < n):
      throw new Error("Zero vector cannot have an orthogonal vector");
    case (t < n && s < n):
      return { x: 1 * o, y: 0, z: 0 };
    case (t < n && r < n):
      return { x: 0, y: 0, z: 1 * h };
    case (s < n && r < n):
      return { x: 0, y: 1 * a, z: 0 };
    case t < n:
      return { x: 1 * h * o, y: 0, z: 0 };
    case s < n:
      return { x: 0, y: 1 * a * o, z: 0 };
    case r < n:
      return { x: 0, y: 0, z: 1 * a * h };
    default:
      return { x: -e.y, y: e.x, z: 0 };
  }
}
function ht(e) {
  const t = i.normalize(e), s = it(t);
  return [t, s, i.cross(t, s)];
}
function ct(e, t) {
  const s = e.reduce((r, n) => i.add(r, n), new i(0, 0, 0)).scale(1 / e.length);
  return [...e].sort((r, n) => {
    const a = i.subtract(r, s), h = i.subtract(n, s), o = Math.atan2(i.dot(a, t[2]), i.dot(a, t[1])), c = Math.atan2(i.dot(h, t[2]), i.dot(h, t[1]));
    return o - c;
  });
}
function Nt(e, t) {
  const s = [];
  switch (e) {
    case "x":
      s.push(new i(0, t.max.y, t.min.z)), s.push(new i(0, t.max.y, t.max.z)), s.push(new i(0, t.min.y, t.max.z)), s.push(new i(0, t.min.y, t.min.z));
      break;
    case "y":
      s.push(new i(t.min.x, 0, t.min.z)), s.push(new i(t.max.x, 0, t.min.z)), s.push(new i(t.max.x, 0, t.max.z)), s.push(new i(t.min.x, 0, t.max.z));
      break;
    case "z":
      s.push(new i(t.min.x, t.max.y, 0)), s.push(new i(t.max.x, t.max.y, 0)), s.push(new i(t.max.x, t.min.y, 0)), s.push(new i(t.min.x, t.min.y, 0));
      break;
  }
  return s;
}
function vt(e, t, s) {
  const r = [], n = e.copy().normalize(), a = new L().setFromPointAndNormal(t, n).d, h = t.copy().add(i.scale(n, a)), o = s.center(), c = i.add(
    o,
    i.scale(n, i.dot(n, i.subtract(h, o)))
  ), m = ht(n), u = s.extents().length() / 2, y = i.fromJson(m[1]), x = i.fromJson(m[2]), z = i.fromJson(m[1]).negate(), f = i.fromJson(m[2]).negate(), l = ct(
    [
      i.add(x, z),
      i.add(y, x),
      i.add(z, f),
      i.add(f, y)
    ],
    m
  ).map((F) => {
    const k = new i(F.x, F.y, F.z).normalize();
    return k.x *= u, k.y *= u, k.z *= u, k.add(c), k;
  });
  return r.push(...l), r;
}
const T = class T {
  constructor(t, s, r, n) {
    this.x = t, this.y = s, this.z = r, this.w = n;
  }
  set(t, s, r, n) {
    this.x = t, this.y = s, this.z = r, this.w = n;
  }
  assign(t) {
    this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w;
  }
  copy() {
    return new T(this.x, this.y, this.z, this.w);
  }
  equals(t) {
    return this.x === t.x && this.y === t.y && this.z === t.z && this.w === t.w;
  }
  equalsWithTolerance(t, s) {
    return this.x - t.x < s && this.x - t.x > -s && this.y - t.y < s && this.y - t.y > -s && this.z - t.z < s && this.z - t.z > -s && this.w - t.w < s && this.w - t.w > -s;
  }
  fromArray(t) {
    return this.x = t[0], this.y = t[1], this.z = t[2], this.w = t[3], this;
  }
  toArray(t) {
    return t[0] = this.x, t[1] = this.y, t[2] = this.z, t[3] = this.w, this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  magnitudeSquared() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  normalize() {
    const t = this.magnitude();
    return t === 0 ? this : (this.x = this.x / t, this.y = this.y / t, this.z = this.z / t, this.w = this.w / t, this);
  }
  static add(t, s) {
    return new T(t.x + s.x, t.y + s.y, t.z + s.z, t.w + s.w);
  }
  static subtract(t, s) {
    return new T(t.x - s.x, t.y - s.y, t.z - s.z, t.w - s.w);
  }
  static identity() {
    return new T(0, 0, 0, 1);
  }
  static toMatrix(t) {
    let s = t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w;
    s = 2 / s;
    const r = t.x * s, n = t.y * s, a = t.z * s, h = t.w * r, o = t.w * n, c = t.w * a, m = t.x * r, u = t.x * n, y = t.x * a, x = t.y * n, z = t.y * a, f = t.z * a, l = new S();
    return l.m[0] = 1 - (x + f), l.m[1] = u + c, l.m[2] = y - o, l.m[3] = 0, l.m[4] = u - c, l.m[5] = 1 - (m + f), l.m[6] = z + h, l.m[7] = 0, l.m[8] = y + o, l.m[9] = z - h, l.m[10] = 1 - (m + x), l.m[11] = 0, l.m[12] = 0, l.m[13] = 0, l.m[14] = 0, l.m[15] = 1, l;
  }
  static createFromMatrix(t) {
    const h = [], o = t.m[0] + t.m[5] + t.m[10];
    if (o > 0) {
      let c = Math.sqrt(o + 1);
      h[3] = 0.5 * c, c = 0.5 / c, h[0] = c * (t.m[6] - t.m[9]), h[1] = c * (t.m[8] - t.m[2]), h[2] = c * (t.m[1] - t.m[4]);
    } else {
      let c = 0;
      t.m[5] > t.m[0] && (c = 1), t.m[10] > t.m[4 * c + c] && (c = 2);
      const m = [1, 2, 0], u = m[c], y = m[u];
      let x = Math.sqrt(t.m[4 * c + c] - (t.m[4 * u + u] + t.m[4 * y + y]) + 1);
      h[c] = 0.5 * x, x = 0.5 / x, h[3] = x * (t.m[4 * u + y] - t.m[4 * y + u]), h[u] = x * (t.m[4 * c + u] + t.m[4 * u + c]), h[y] = x * (t.m[4 * c + y] + t.m[4 * y + c]);
    }
    return T.identity().fromArray(h);
  }
  static interpolate(t, s, r) {
    const c = [], m = [], u = [];
    t.toArray(c), s.toArray(m);
    let y, x;
    const z = c[0] * m[0] + c[1] * m[1] + c[2] * m[2] + c[3] * m[3];
    if (1 + z > T._epsilon) {
      if (1 - z > T._epsilon) {
        const f = T._arccos(z), F = 1 / Math.sin(f);
        y = F * Math.sin((1 - r) * f), x = F * Math.sin(r * f);
      } else
        y = 1 - r, x = r;
      for (let f = 0; f < 4; ++f)
        u[f] = y * c[f] + x * m[f];
    } else {
      u[0] = -c[1], u[1] = c[0], u[2] = -c[3], u[3] = c[2], y = Math.sin(0.5 * Math.PI * (1 - r)), x = Math.sin(0.5 * Math.PI * r);
      for (let f = 0; f < 3; ++f)
        u[f] = y * c[f] + x * u[f];
    }
    return T.identity().fromArray(u);
  }
  static _arccos(t) {
    return t < -1 ? Math.PI : t > 1 ? 0 : Math.acos(t);
  }
};
T._epsilon = 1e-5;
let V = T;
class _ {
  constructor(t, s) {
    this.origin = i.zero(), this.direction = new i(0, 0, 1), t && this.origin.assign(t), s && this.direction.assign(s);
  }
  /**
   * Creates a copy of this ray
   * @returns {Ray} a copy of this ray object
   */
  copy() {
    return new _(this.origin, this.direction);
  }
  /**
   * Sets this ray equal to another ray
   * @param {Ray} ray the ray to assign
   */
  assign(t) {
    return this.origin.assign(t.origin), this.direction.assign(t.direction), this;
  }
  /**
   * Flips the ray's direction.
   */
  negate() {
    return this.direction.negate(), this;
  }
}
class J {
  /**
   * Creates a new box.
   * @param min The minimum extent of the box. Defaults to the origin.
   * @param max The maximum extent of the box. Defaults to the origin.
   */
  constructor(t = i.zero(), s = i.zero()) {
    this.min = t.copy(), this.max = s.copy();
  }
  /**
   * Creates a copy of the box.
   * @returns A copy of this box.
   */
  copy() {
    return new J(this.min, this.max);
  }
  /**
   * Strictly compares this box with another box.
   * @param box Box to compare with.
   * @returns True if the values of this box equals the other. False otherwise.
   */
  equals(t) {
    return this.min.equals(t.min) && this.max.equals(t.max);
  }
  /**
   * Gets the center point for the box.
   * @returns The center point of this box.
   */
  center() {
    const t = i.add(this.min, this.max);
    return t.scale(0.5), t;
  }
  /**
   * Gets the extents of the box.
   * @returns A point with members set to extent values for each corresponding axis.
   */
  extents() {
    return i.subtract(this.max, this.min);
  }
  /**
   * Expands the extents of the box so that it will contain another box.
   * @param box The box to add.
   */
  addBox(t) {
    t.isDegenerate() || (this.addPoint(t.min), this.addPoint(t.max));
  }
  /**
   * Expands the extents of the box so that it will contain a particular point.
   * @param point The point to add.
   */
  addPoint(t) {
    t.x < this.min.x && (this.min.x = t.x), t.y < this.min.y && (this.min.y = t.y), t.z < this.min.z && (this.min.z = t.z), t.x > this.max.x && (this.max.x = t.x), t.y > this.max.y && (this.max.y = t.y), t.z > this.max.z && (this.max.z = t.z);
  }
  /**
   * Creates an object ready for JSON serialization.
   * @returns The prepared object.
   */
  toJson() {
    return this._toJson();
  }
  _toJson() {
    return {
      min: this.min.toJson(),
      max: this.max.toJson()
    };
  }
  /**
   * Creates a new [[Box]] from an object given by [[toJson]].
   * @param objData An object given by [[toJson]].
   * @returns The prepared object.
   */
  static fromJson(t) {
    const s = t, r = i.fromJson(s.min), n = i.fromJson(s.max);
    return new J(r, n);
  }
  /**
   * Gets all eight corner points for the box.
   * @returns The corner points of this box.
   */
  getCorners() {
    const t = [];
    return t[0] = this.min.copy(), t[1] = this.min.copy(), t[2] = this.min.copy(), t[1].x = this.max.x, t[2].y = this.max.y, t[3] = t[2].copy(), t[3].x = this.max.x, t[4] = t[0].copy(), t[5] = t[1].copy(), t[6] = t[2].copy(), t[7] = t[3].copy(), t[4].z = this.max.z, t[5].z = this.max.z, t[6].z = this.max.z, t[7].z = this.max.z, t;
  }
  /**
   * Returns whether a point is contained within the box
   * @returns whether a point is contained within the box
   */
  containsPoint(t) {
    return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z;
  }
  /**
   * Creates and returns an invalid bounding box.
   * @returns an invalid bounding box.
   */
  static invalid() {
    return new J(
      new i(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
      new i(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)
    );
  }
  /**
   * Returns whether or not the box is degenerate.
   * @returns whether or not the box is degenerate.
   */
  isDegenerate() {
    return this.min.x > this.max.x || this.min.y > this.max.y || this.min.z > this.max.z;
  }
}
function at(e) {
  return e !== null && typeof e == "object" && "r" in e && typeof e.r == "number" && "g" in e && typeof e.g == "number" && "b" in e && typeof e.b == "number";
}
class A {
  /**
   * Creates a new color object. Values are specified in the 0-255 range.
   * @param r red color component
   * @param g green color component
   * @param b blue color component
   */
  constructor(t, s, r) {
    this.r = t, this.g = s, this.b = r;
  }
  /**
   * Sets this color equal to another color
   * @param color the point whose values will be used to set this color
   * @returns the color object
   */
  assign(t) {
    return this.set(t.r, t.g, t.b), this;
  }
  /**
   * Creates a copy of this color
   * @returns Copy of this color
   */
  copy() {
    return new A(this.r, this.g, this.b);
  }
  /**
   * Compares this color with another color
   * @param color the color to compare with
   * @returns True if the values of this color equal the other. False otherwise.
   */
  equals(t) {
    return this.r === t.r && this.g === t.g && this.b === t.b;
  }
  /**
   * Sets the color object. Values are specified in the 0-255 range.
   * @param r red color component
   * @param g green color component
   * @param b blue color component
   */
  set(t, s, r) {
    this.r = t, this.g = s, this.b = r;
  }
  /**
   * Sets the color object from floating point values. Values are specified in the 0.0-1.0 range.
   * @param r red color component
   * @param g green color component
   * @param b blue color component
   */
  setFromFloat(t, s, r) {
    this.r = Math.round(255 * t), this.g = Math.round(255 * s), this.b = Math.round(255 * r);
  }
  /**
   * Sets this color from an array of normalized floating point values
   * @param arr the array to assign from
   */
  fromFloatArray(t) {
    return this.setFromFloat(t[0], t[1], t[2]);
  }
  /**
   * Gets an array of floating point values representing this color. Values are clamped in the 0.0 - 1.0 range.
   * @returns array of floating point values for this color.
   */
  getFloatArray() {
    return [this.r / 255, this.g / 255, this.b / 255];
  }
  /**
   * Populates an array with floating point values for this color. Values are clamped in the 0.0 - 1.0 range.
   * @param arr array whose first three elements will be populated with the r,g, and b values of this color respectively.
   */
  toFloatArray(t = [0, 0, 0]) {
    return t[0] = this.r / 255, t[1] = this.g / 255, t[2] = this.b / 255, t;
  }
  /**
   * Creates a new [[Color]] from an object given by [[toJson]].
   * @param objData An object given by [[toJson]].
   * @returns The prepared object.
   */
  static fromJson(t) {
    if (at(t))
      return new A(t.r, t.g, t.b);
    throw new TypeError("Color.fromJson: data does not satisfy type IColor constraints");
  }
  /**
   * Creates an object ready for JSON serialization.
   * @returns The prepared object.
   */
  toJson() {
    return {
      r: this.r,
      g: this.g,
      b: this.b
    };
  }
  /**
   * Converts the color to a hexadecimal string.
   * @returns Hexadecimal string representation of the color.
   */
  toHexString() {
    const t = this.r.toString(16).padStart(2, "0"), s = this.g.toString(16).padStart(2, "0"), r = this.b.toString(16).padStart(2, "0");
    return `#${t}${s}${r}`;
  }
  /**
   * Creates a color object from a hexadecimal string.
   * @param hexString Hexadecimal string representation of the color.
   * @returns new color object
   */
  static fromHexString(t) {
    if (t.startsWith("#") && (t = t.slice(1)), t.length !== 6)
      throw new Error("Invalid hex color string");
    const s = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), n = parseInt(t.slice(4, 6), 16);
    return new A(s, r, n);
  }
  /**
   * Creates a color object from floating point values. Values are specified in the 0.0-1.0 range.
   * @param r red color component
   * @param g green color component
   * @param b blue color component
   * @returns new color object
   */
  static createFromFloat(t, s, r) {
    const n = A.black();
    return n.setFromFloat(t, s, r), n;
  }
  /**
   * Creates a color object from an array of floating point values.
   * Values are specified in the 0.0-1.0 range.
   */
  static createFromFloatArray(t) {
    const s = A.black();
    return s.fromFloatArray(t), s;
  }
  /**
   * Creates a new color object initialized to red.
   * @returns new color object
   */
  static red() {
    return new A(255, 0, 0);
  }
  /**
   * Creates a new color object initialized to green.
   * @returns new color object
   */
  static green() {
    return new A(0, 255, 0);
  }
  /**
   * Creates a new color object initialized to blue.
   * @returns new color object
   */
  static blue() {
    return new A(0, 0, 255);
  }
  /**
   * Creates a new color object initialized to yellow.
   * @returns new color object
   */
  static yellow() {
    return new A(255, 255, 0);
  }
  /**
   * Creates a new color object initialized to white.
   * @returns new color object
   */
  static white() {
    return new A(255, 255, 255);
  }
  /**
   * Creates a new color object initialized to black.
   * @returns new color object
   */
  static black() {
    return new A(0, 0, 0);
  }
}
export {
  b as BasicUnit,
  J as Box,
  A as Color,
  S as Matrix,
  xt as Ohm,
  L as Plane,
  E as Point2,
  i as Point3,
  D as Point4,
  V as Quaternion,
  _ as Ray,
  mt as Subscript1,
  ot as Subscript2,
  ut as Subscript3,
  yt as SubscriptNeg,
  kt as closestPointFromPointToSegment,
  Q as closestPointScalarFromPointToSegment,
  wt as computeAngleBetweenVector,
  st as computeOffaxisRotation,
  ft as computePointToLineDistance,
  Nt as createReferenceGeometryFromAxis,
  vt as createReferenceGeometryFromFaceNormal,
  W as degreesToRadians,
  Mt as distanceLineLine,
  lt as formatWithUnit,
  Tt as generateArcPoints,
  gt as generatePointsOnCircle,
  ht as get3dBaseFromVector,
  Et as getLongUnitString,
  it as getOrthogonalVector,
  dt as intersect3d2Planes,
  bt as intersectionPlaneLine,
  p as intersectionPlaneLine2,
  at as isIColor,
  H as isIPoint2,
  K as isIPoint3,
  zt as isIPoint4,
  At as isPointInRect2d,
  It as isPointOnLineSegment,
  St as isPointOnLineSegment2d,
  Ft as lineLineIntersect,
  U as oneVectorCross,
  tt as radiansToDegrees,
  ct as sortVerticesCounterClockwise
};
