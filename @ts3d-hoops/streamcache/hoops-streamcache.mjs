import { ScModule as D } from "@ts3d-hoops/sc-engine";
function J(e, r) {
  for (var t = 0; t < r.length; t++) {
    const o = r[t];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const a in o)
        if (a !== "default" && !(a in e)) {
          const l = Object.getOwnPropertyDescriptor(o, a);
          l && Object.defineProperty(e, a, l.get ? l : {
            enumerable: !0,
            get: () => o[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var Z = /* @__PURE__ */ ((e) => (e[e.Rgba32 = 0] = "Rgba32", e[e.Rgb24 = 1] = "Rgb24", e[e.Gray8 = 2] = "Gray8", e[e.GrayAlpha16 = 3] = "GrayAlpha16", e[e.Jpeg = 4] = "Jpeg", e[e.Png = 5] = "Png", e))(Z || {}), Y = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e))(Y || {}), k = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e[e.Local = 0] = "Local", e))(k || {}), T = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e))(T || {}), Q = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e))(Q || {}), K = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e))(K || {}), M = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e))(M || {}), ee = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e[e.Local = 0] = "Local", e))(ee || {}), re = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e))(re || {}), ne = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e))(ne || {}), te = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e))(te || {}), oe = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e))(oe || {}), se = /* @__PURE__ */ ((e) => (e[e.Invalid = 4294967295] = "Invalid", e[e.Empty = 4294967294] = "Empty", e[e.Local = 0] = "Local", e))(se || {}), ie = /* @__PURE__ */ ((e) => (e[e.World = 0] = "World", e[e.Camera = 1] = "Camera", e))(ie || {}), ae = /* @__PURE__ */ ((e) => (e[e.Directional = 0] = "Directional", e[e.Point = 1] = "Point", e))(ae || {}), ce = /* @__PURE__ */ ((e) => (e[e.OfInitialEmptyModel = 0] = "OfInitialEmptyModel", e))(ce || {}), le = /* @__PURE__ */ ((e) => (e[e.None = 0] = "None", e[e.SMAA = 1] = "SMAA", e))(le || {}), fe = /* @__PURE__ */ ((e) => (e[e.Floor = 0] = "Floor", e[e.Wall = 1] = "Wall", e[e.Door = 2] = "Door", e))(fe || {}), ve = /* @__PURE__ */ ((e) => (e[e.Pixels = 0] = "Pixels", e[e.ProportionOfWidth = 1] = "ProportionOfWidth", e[e.ProportionOfHeight = 2] = "ProportionOfHeight", e))(ve || {}), de = /* @__PURE__ */ ((e) => (e[e.Object = 0] = "Object", e[e.World = 1] = "World", e))(de || {}), ue = /* @__PURE__ */ ((e) => (e[e.Default = 0] = "Default", e[e.Highlight = 1] = "Highlight", e[e.HiddenLine = 2] = "HiddenLine", e[e.XRay = 3] = "XRay", e[e.Gooch = 4] = "Gooch", e[e.Toon = 5] = "Toon", e))(ue || {}), me = /* @__PURE__ */ ((e) => (e[e.FixedFramerate = 0] = "FixedFramerate", e))(me || {}), pe = /* @__PURE__ */ ((e) => (e[e.Faces = 0] = "Faces", e[e.Lines = 1] = "Lines", e[e.Points = 2] = "Points", e))(pe || {}), we = /* @__PURE__ */ ((e) => (e[e.None = 0] = "None", e[e.Faces = 1] = "Faces", e[e.Lines = 2] = "Lines", e[e.Points = 4] = "Points", e[e.All = 7] = "All", e))(we || {}), be = /* @__PURE__ */ ((e) => (e[e.Base = 0] = "Base", e[e.Specular = 1] = "Specular", e[e.Emissive = 2] = "Emissive", e[e.Ambient = 3] = "Ambient", e))(be || {}), he = /* @__PURE__ */ ((e) => (e[e.None = 0] = "None", e[e.Modulate = 1] = "Modulate", e[e.Desaturate = 2] = "Desaturate", e[e.Colorize = 3] = "Colorize", e))(he || {}), ge = /* @__PURE__ */ ((e) => (e[e.Visible = 0] = "Visible", e[e.VisibleWithFullOutline = 1] = "VisibleWithFullOutline", e))(ge || {}), Ce = /* @__PURE__ */ ((e) => (e[e.Object = 0] = "Object", e[e.World = 1] = "World", e[e.ProportionOfScreenWidth = 2] = "ProportionOfScreenWidth", e[e.ProportionOfScreenHeight = 3] = "ProportionOfScreenHeight", e))(Ce || {}), xe = /* @__PURE__ */ ((e) => (e[e.Square = 0] = "Square", e[e.Disk = 1] = "Disk", e[e.Sphere = 2] = "Sphere", e))(xe || {}), Pe = /* @__PURE__ */ ((e) => (e[e.ScreenPixels = 0] = "ScreenPixels", e[e.CSSPixels = 1] = "CSSPixels", e[e.World = 2] = "World", e[e.ProportionOfScreenWidth = 3] = "ProportionOfScreenWidth", e[e.ProportionOfScreenHeight = 4] = "ProportionOfScreenHeight", e[e.ProportionOfBoundingDiagonal = 5] = "ProportionOfBoundingDiagonal", e))(Pe || {}), Oe = /* @__PURE__ */ ((e) => (e[e.Perspective = 0] = "Perspective", e[e.Orthographic = 1] = "Orthographic", e[e.Stretched = 2] = "Stretched", e))(Oe || {}), Ee = /* @__PURE__ */ ((e) => (e[e.Uninitialized = 0] = "Uninitialized", e[e.Network = 1] = "Network", e[e.Scs = 2] = "Scs", e))(Ee || {}), Ne = /* @__PURE__ */ ((e) => (e[e.Hide = 0] = "Hide", e[e.Show = 1] = "Show", e[e.Initial = 2] = "Initial", e))(Ne || {}), We = /* @__PURE__ */ ((e) => (e[e.World = 0] = "World", e[e.ProportionOfBoundingHeight = 1] = "ProportionOfBoundingHeight", e))(We || {}), Re = /* @__PURE__ */ ((e) => (e[e.Low = 0] = "Low", e[e.Medium = 1] = "Medium", e[e.High = 2] = "High", e[e.Ultra = 3] = "Ultra", e))(Re || {}), Ae = /* @__PURE__ */ ((e) => (e[e.SessionNotStarted = 0] = "SessionNotStarted", e[e.Cancelled = 1] = "Cancelled", e[e.CorruptRpcMessage = 2] = "CorruptRpcMessage", e))(Ae || {}), Se = /* @__PURE__ */ ((e) => (e[e.On = 0] = "On", e[e.Off = 1] = "Off", e))(Se || {}), Ie = /* @__PURE__ */ ((e) => (e[e.On = 0] = "On", e[e.Off = 1] = "Off", e))(Ie || {}), ye = /* @__PURE__ */ ((e) => (e[e.None = 0] = "None", e[e.Decal = 1] = "Decal", e))(ye || {}), Be = /* @__PURE__ */ ((e) => (e[e.UV = 0] = "UV", e))(Be || {}), Le = /* @__PURE__ */ ((e) => (e[e.Repeat = 0] = "Repeat", e[e.Clamp = 1] = "Clamp", e[e.Trim = 2] = "Trim", e))(Le || {}), De = /* @__PURE__ */ ((e) => (e[e.Unsorted = 0] = "Unsorted", e[e.SingleLayer = 1] = "SingleLayer", e))(De || {}), $e = /* @__PURE__ */ ((e) => (e[e.Selected = 0] = "Selected", e[e.Unselected = 1] = "Unselected", e))($e || {}), ze = /* @__PURE__ */ ((e) => (e[e.None = 0] = "None", e[e.IsPbr = 1] = "IsPbr", e[e.FaceColor = 2] = "FaceColor", e[e.LineColor = 4] = "LineColor", e[e.PointColor = 8] = "PointColor", e[e.SpecularColor = 16] = "SpecularColor", e[e.AmbientColor = 32] = "AmbientColor", e[e.EmissiveColor = 64] = "EmissiveColor", e[e.Metallic = 128] = "Metallic", e[e.Roughness = 256] = "Roughness", e[e.Opacity = 512] = "Opacity", e[e.SpecularIntensity = 1024] = "SpecularIntensity", e[e.TextureFlags = 2048] = "TextureFlags", e[e.TextureMatrix = 4096] = "TextureMatrix", e[e.ColorMap = 8192] = "ColorMap", e[e.NormalMap = 16384] = "NormalMap", e[e.EmissiveMap = 32768] = "EmissiveMap", e[e.MetallicRoughnessMap = 65536] = "MetallicRoughnessMap", e[e.OcclusionMap = 131072] = "OcclusionMap", e[e.LinePattern = 262144] = "LinePattern", e))(ze || {}), je = /* @__PURE__ */ ((e) => (e[e.None = 0] = "None", e[e.Floor = 1] = "Floor", e[e.Wall = 2] = "Wall", e[e.Door = 4] = "Door", e))(je || {}), P = /* @__PURE__ */ ((e) => (e[e.Invalid = -1] = "Invalid", e[e.Default = 0] = "Default", e))(P || {}), Fe = /* @__PURE__ */ ((e) => (e[e.UpperLeftCorner = 0] = "UpperLeftCorner", e[e.LowerLeftCorner = 1] = "LowerLeftCorner", e[e.LowerRightCorner = 2] = "LowerRightCorner", e[e.UpperRightCorner = 3] = "UpperRightCorner", e[e.TopCenter = 4] = "TopCenter", e[e.LeftCenter = 5] = "LeftCenter", e[e.RightCenter = 6] = "RightCenter", e[e.BottomCenter = 7] = "BottomCenter", e[e.Center = 8] = "Center", e))(Fe || {}), _e = /* @__PURE__ */ ((e) => (e[e.Pixels = 0] = "Pixels", e[e.ProportionOfScreen = 1] = "ProportionOfScreen", e[e.MinimumProportionOfScreen = 2] = "MinimumProportionOfScreen", e[e.ProportionOfOtherDimension = 3] = "ProportionOfOtherDimension", e))(_e || {});
const Qe = 0;
function Ke(e) {
  return e !== null && typeof e == "object" && "scFunction" in e && typeof e.scFunction == "string";
}
function Me(e) {
  const r = e.data;
  return r !== null && typeof r == "object" && "scStateFailure" in r ? r.scStateFailure : null;
}
const er = [
  "bool",
  "int",
  "uint",
  "float",
  "bvec2",
  "bvec3",
  "bvec4",
  "ivec2",
  "ivec3",
  "ivec4",
  "uvec2",
  "uvec3",
  "uvec4",
  "vec2",
  "vec3",
  "vec4",
  "mat2",
  "mat3",
  "mat4",
  "texture2D"
], rr = ["REPEAT", "MIRRORED_REPEAT", "CLAMP_TO_EDGE"], nr = [
  "NEAREST",
  "LINEAR",
  "NEAREST_MIPMAP_NEAREST",
  "LINEAR_MIPMAP_NEAREST",
  "NEAREST_MIPMAP_LINEAR",
  "LINEAR_MIPMAP_LINEAR"
];
function He(e) {
  return Array.isArray(e.values) ? e.values.length : 1;
}
function qe(e, r) {
  let t = 0;
  t += 4 + e.length, t += 4 + r.type.length, t += 4;
  const o = He(r);
  return r.type.startsWith("bool") ? t += Math.ceil(o / 8) : r.type === "texture2D" ? (t += o * 4 * 2, t += 4 + r.values.wrapS.length, t += 4 + r.values.wrapT.length, t += 4 + r.values.minFilter.length, t += 4 + r.values.magFilter.length) : t += o * 4, t;
}
function Ue(e) {
  let r = 4;
  for (const [t, o] of Object.entries(e))
    r += qe(t, o);
  return r;
}
function tr(e) {
  const r = Ue(e), t = new ArrayBuffer(r), o = new DataView(t), a = Object.entries(e);
  o.setUint32(0, a.length, !0);
  let l = 4;
  for (const [c, f] of a)
    l += Ge(c, f, t, l);
  return t;
}
function $(e, r, t) {
  const o = Math.ceil(e.length / 8);
  if (r.byteLength - t < o)
    throw new Error("Provided buffer is too small to serialize the booleans.");
  const a = new Uint8Array(r, t, o);
  let l = 0, c = 0;
  for (let f = 0; f < e.length; f++)
    a[l] |= (e[f] ? 1 : 0) << c, c++, c === 8 && (c = 0, l++);
  return o;
}
function g(e, r, t) {
  const o = e.length, l = new TextEncoder().encode(e), c = 4 + o;
  if (r.byteLength - t < c)
    throw new Error("Provided buffer is too small to serialize the text.");
  const f = new DataView(r, t, c);
  return f.setUint32(0, o, !0), new Uint8Array(f.buffer, f.byteOffset + 4, o).set(l), c;
}
function Ve(e) {
  if (!e.isArray)
    return 0;
  if (!Array.isArray(e.values))
    return 1;
  let r = 0;
  switch (e.type) {
    case "bool":
    case "int":
    case "uint":
    case "float":
      r = e.values.length;
      break;
    case "bvec2":
    case "ivec2":
    case "uvec2":
    case "vec2":
      r = e.values.length / 2;
      break;
    case "bvec3":
    case "ivec3":
    case "uvec3":
    case "vec3":
      r = e.values.length / 3;
      break;
    case "bvec4":
    case "ivec4":
    case "uvec4":
    case "vec4":
    case "mat2":
      r = e.values.length / 4;
      break;
    case "mat3":
      r = e.values.length / 9;
      break;
    case "mat4":
      r = e.values.length / 16;
      break;
  }
  if (Number.isInteger(r) === !1)
    throw new Error(`Uniform array length does not match expected size for ${e.type}`);
  return r;
}
function Ge(e, r, t, o) {
  let a = g(e, t, o);
  a += g(r.type, t, o + a);
  const l = new DataView(t, o + a);
  l.setUint32(0, Ve(r), !0);
  let c = 4;
  switch (r.type) {
    case "bool":
    case "bvec2":
    case "bvec3":
    case "bvec4":
      r.isArray ? c += $(
        r.values,
        t,
        o + a + c
      ) : c += $(
        [r.values],
        t,
        o + a + c
      );
      break;
    case "int":
    case "ivec2":
    case "ivec3":
    case "ivec4": {
      const f = Array.isArray(r.values) ? r.values : [r.values];
      for (let b = 0; b < f.length; b++)
        l.setInt32(c, f[b], !0), c += 4;
      break;
    }
    case "uint":
    case "uvec2":
    case "uvec3":
    case "uvec4": {
      const f = Array.isArray(r.values) ? r.values : [r.values];
      for (let b = 0; b < f.length; b++)
        l.setUint32(c, f[b], !0), c += 4;
      break;
    }
    case "float":
    case "vec2":
    case "vec3":
    case "vec4":
    case "mat2":
    case "mat3":
    case "mat4": {
      const f = Array.isArray(r.values) ? r.values : [r.values];
      for (let b = 0; b < f.length; b++)
        l.setFloat32(c, f[b], !0), c += 4;
      break;
    }
    case "texture2D": {
      l.setUint32(c, r.values.imageId[0], !0), c += 4, l.setUint32(c, r.values.imageId[1], !0), c += 4, c += g(
        r.values.wrapS,
        t,
        o + a + c
      ), c += g(
        r.values.wrapT,
        t,
        o + a + c
      ), c += g(
        r.values.minFilter,
        t,
        o + a + c
      ), c += g(
        r.values.magFilter,
        t,
        o + a + c
      );
      break;
    }
  }
  return a += c, a;
}
function Xe(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var O = { exports: {} };
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */
var Je = O.exports, z;
function Ze() {
  return z || (z = 1, (function(e) {
    (function(r, t, o) {
      e.exports ? e.exports = o() : r[t] = o();
    })(Je, "bowser", function() {
      var r = !0;
      function t(s) {
        function i(x) {
          var h = s.match(x);
          return h && h.length > 1 && h[1] || "";
        }
        function u(x) {
          var h = s.match(x);
          return h && h.length > 1 && h[2] || "";
        }
        var v = i(/(ipod|iphone|ipad)/i).toLowerCase(), C = /like android/i.test(s), w = !C && /android/i.test(s), N = /nexus\s*[0-6]\s*/i.test(s), _ = !N && /nexus\s*[0-9]+/i.test(s), H = /CrOS/.test(s), W = /silk/i.test(s), R = /sailfish/i.test(s), A = /tizen/i.test(s), S = /(web|hpw)(o|0)s/i.test(s), I = /windows phone/i.test(s), q = !I && /windows/i.test(s), U = !v && !W && /macintosh/i.test(s), V = !w && !R && !A && !S && /linux/i.test(s), E = u(/edg([ea]|ios)\/(\d+(\.\d+)?)/i), m = i(/version\/(\d+(\.\d+)?)/i), y = /tablet/i.test(s) && !/tablet pc/i.test(s), B = !y && /[^-]mobi/i.test(s), G = /xbox/i.test(s), n;
        /opera/i.test(s) ? n = {
          name: "Opera",
          opera: r,
          version: m || i(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
        } : /opr\/|opios/i.test(s) ? n = {
          name: "Opera",
          opera: r,
          version: i(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || m
        } : /SamsungBrowser/i.test(s) ? n = {
          name: "Samsung Internet for Android",
          samsungBrowser: r,
          version: m || i(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
        } : /Whale/i.test(s) ? n = {
          name: "NAVER Whale browser",
          whale: r,
          version: i(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
        } : /MZBrowser/i.test(s) ? n = {
          name: "MZ Browser",
          mzbrowser: r,
          version: i(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
        } : /coast/i.test(s) ? n = {
          name: "Opera Coast",
          coast: r,
          version: m || i(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
        } : /focus/i.test(s) ? n = {
          name: "Focus",
          focus: r,
          version: i(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
        } : /yabrowser/i.test(s) ? n = {
          name: "Yandex Browser",
          yandexbrowser: r,
          version: m || i(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
        } : /ucbrowser/i.test(s) ? n = {
          name: "UC Browser",
          ucbrowser: r,
          version: i(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
        } : /mxios/i.test(s) ? n = {
          name: "Maxthon",
          maxthon: r,
          version: i(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
        } : /epiphany/i.test(s) ? n = {
          name: "Epiphany",
          epiphany: r,
          version: i(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
        } : /puffin/i.test(s) ? n = {
          name: "Puffin",
          puffin: r,
          version: i(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
        } : /sleipnir/i.test(s) ? n = {
          name: "Sleipnir",
          sleipnir: r,
          version: i(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
        } : /k-meleon/i.test(s) ? n = {
          name: "K-Meleon",
          kMeleon: r,
          version: i(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
        } : I ? (n = {
          name: "Windows Phone",
          osname: "Windows Phone",
          windowsphone: r
        }, E ? (n.msedge = r, n.version = E) : (n.msie = r, n.version = i(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(s) ? n = {
          name: "Internet Explorer",
          msie: r,
          version: i(/(?:msie |rv:)(\d+(\.\d+)?)/i)
        } : H ? n = {
          name: "Chrome",
          osname: "Chrome OS",
          chromeos: r,
          chromeBook: r,
          chrome: r,
          version: i(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        } : /edg([ea]|ios)/i.test(s) ? n = {
          name: "Microsoft Edge",
          msedge: r,
          version: E
        } : /vivaldi/i.test(s) ? n = {
          name: "Vivaldi",
          vivaldi: r,
          version: i(/vivaldi\/(\d+(\.\d+)?)/i) || m
        } : R ? n = {
          name: "Sailfish",
          osname: "Sailfish OS",
          sailfish: r,
          version: i(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
        } : /seamonkey\//i.test(s) ? n = {
          name: "SeaMonkey",
          seamonkey: r,
          version: i(/seamonkey\/(\d+(\.\d+)?)/i)
        } : /firefox|iceweasel|fxios/i.test(s) ? (n = {
          name: "Firefox",
          firefox: r,
          version: i(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
        }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(s) && (n.firefoxos = r, n.osname = "Firefox OS")) : W ? n = {
          name: "Amazon Silk",
          silk: r,
          version: i(/silk\/(\d+(\.\d+)?)/i)
        } : /phantom/i.test(s) ? n = {
          name: "PhantomJS",
          phantom: r,
          version: i(/phantomjs\/(\d+(\.\d+)?)/i)
        } : /slimerjs/i.test(s) ? n = {
          name: "SlimerJS",
          slimer: r,
          version: i(/slimerjs\/(\d+(\.\d+)?)/i)
        } : /blackberry|\bbb\d+/i.test(s) || /rim\stablet/i.test(s) ? n = {
          name: "BlackBerry",
          osname: "BlackBerry OS",
          blackberry: r,
          version: m || i(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
        } : S ? (n = {
          name: "WebOS",
          osname: "WebOS",
          webos: r,
          version: m || i(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
        }, /touchpad\//i.test(s) && (n.touchpad = r)) : /bada/i.test(s) ? n = {
          name: "Bada",
          osname: "Bada",
          bada: r,
          version: i(/dolfin\/(\d+(\.\d+)?)/i)
        } : A ? n = {
          name: "Tizen",
          osname: "Tizen",
          tizen: r,
          version: i(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || m
        } : /qupzilla/i.test(s) ? n = {
          name: "QupZilla",
          qupzilla: r,
          version: i(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || m
        } : /chromium/i.test(s) ? n = {
          name: "Chromium",
          chromium: r,
          version: i(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || m
        } : /chrome|crios|crmo/i.test(s) ? n = {
          name: "Chrome",
          chrome: r,
          version: i(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        } : w ? n = {
          name: "Android",
          version: m
        } : /safari|applewebkit/i.test(s) ? (n = {
          name: "Safari",
          safari: r
        }, m && (n.version = m)) : v ? (n = {
          name: v == "iphone" ? "iPhone" : v == "ipad" ? "iPad" : "iPod"
        }, m && (n.version = m)) : /googlebot/i.test(s) ? n = {
          name: "Googlebot",
          googlebot: r,
          version: i(/googlebot\/(\d+(\.\d+))/i) || m
        } : n = {
          name: i(/^(.*)\/(.*) /),
          version: u(/^(.*)\/(.*) /)
        }, !n.msedge && /(apple)?webkit/i.test(s) ? (/(apple)?webkit\/537\.36/i.test(s) ? (n.name = n.name || "Blink", n.blink = r) : (n.name = n.name || "Webkit", n.webkit = r), !n.version && m && (n.version = m)) : !n.opera && /gecko\//i.test(s) && (n.name = n.name || "Gecko", n.gecko = r, n.version = n.version || i(/gecko\/(\d+(\.\d+)?)/i)), !n.windowsphone && (w || n.silk) ? (n.android = r, n.osname = "Android") : !n.windowsphone && v ? (n[v] = r, n.ios = r, n.osname = "iOS") : U ? (n.mac = r, n.osname = "macOS") : G ? (n.xbox = r, n.osname = "Xbox") : q ? (n.windows = r, n.osname = "Windows") : V && (n.linux = r, n.osname = "Linux");
        function X(x) {
          switch (x) {
            case "NT":
              return "NT";
            case "XP":
              return "XP";
            case "NT 5.0":
              return "2000";
            case "NT 5.1":
              return "XP";
            case "NT 5.2":
              return "2003";
            case "NT 6.0":
              return "Vista";
            case "NT 6.1":
              return "7";
            case "NT 6.2":
              return "8";
            case "NT 6.3":
              return "8.1";
            case "NT 10.0":
              return "10";
            default:
              return;
          }
        }
        var p = "";
        n.windows ? p = X(i(/Windows ((NT|XP)( \d\d?.\d)?)/i)) : n.windowsphone ? p = i(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : n.mac ? (p = i(/Mac OS X (\d+([_\.\s]\d+)*)/i), p = p.replace(/[_\s]/g, ".")) : v ? (p = i(/os (\d+([_\s]\d+)*) like mac os x/i), p = p.replace(/[_\s]/g, ".")) : w ? p = i(/android[ \/-](\d+(\.\d+)*)/i) : n.webos ? p = i(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : n.blackberry ? p = i(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : n.bada ? p = i(/bada\/(\d+(\.\d+)*)/i) : n.tizen && (p = i(/tizen[\/\s](\d+(\.\d+)*)/i)), p && (n.osversion = p);
        var L = !n.windows && p.split(".")[0];
        return y || _ || v == "ipad" || w && (L == 3 || L >= 4 && !B) || n.silk ? n.tablet = r : (B || v == "iphone" || v == "ipod" || w || N || n.blackberry || n.webos || n.bada) && (n.mobile = r), n.msedge || n.msie && n.version >= 10 || n.yandexbrowser && n.version >= 15 || n.vivaldi && n.version >= 1 || n.chrome && n.version >= 20 || n.samsungBrowser && n.version >= 4 || n.whale && c([n.version, "1.0"]) === 1 || n.mzbrowser && c([n.version, "6.0"]) === 1 || n.focus && c([n.version, "1.0"]) === 1 || n.firefox && n.version >= 20 || n.safari && n.version >= 6 || n.opera && n.version >= 10 || n.ios && n.osversion && n.osversion.split(".")[0] >= 6 || n.blackberry && n.version >= 10.1 || n.chromium && n.version >= 20 ? n.a = r : n.msie && n.version < 10 || n.chrome && n.version < 20 || n.firefox && n.version < 20 || n.safari && n.version < 6 || n.opera && n.version < 10 || n.ios && n.osversion && n.osversion.split(".")[0] < 6 || n.chromium && n.version < 20 ? n.c = r : n.x = r, n;
      }
      var o = t(typeof navigator < "u" && navigator.userAgent || "");
      o.test = function(s) {
        for (var i = 0; i < s.length; ++i) {
          var u = s[i];
          if (typeof u == "string" && u in o)
            return !0;
        }
        return !1;
      };
      function a(s) {
        return s.split(".").length;
      }
      function l(s, i) {
        var u = [], v;
        if (Array.prototype.map)
          return Array.prototype.map.call(s, i);
        for (v = 0; v < s.length; v++)
          u.push(i(s[v]));
        return u;
      }
      function c(s) {
        for (var i = Math.max(a(s[0]), a(s[1])), u = l(s, function(v) {
          var C = i - a(v);
          return v = v + new Array(C + 1).join(".0"), l(v.split("."), function(w) {
            return new Array(20 - w.length).join("0") + w;
          }).reverse();
        }); --i >= 0; ) {
          if (u[0][i] > u[1][i])
            return 1;
          if (u[0][i] === u[1][i]) {
            if (i === 0)
              return 0;
          } else
            return -1;
        }
      }
      function f(s, i, u) {
        var v = o;
        typeof i == "string" && (u = i, i = void 0), i === void 0 && (i = !1), u && (v = t(u));
        var C = "" + v.version;
        for (var w in s)
          if (s.hasOwnProperty(w) && v[w]) {
            if (typeof s[w] != "string")
              throw new Error("Browser version in the minVersion map should be a string: " + w + ": " + String(s));
            return c([C, s[w]]) < 0;
          }
        return i;
      }
      function b(s, i, u) {
        return !f(s, i, u);
      }
      return o.isUnsupportedBrowser = f, o.compareVersions = c, o.check = b, o._detect = t, o.detect = t, o;
    });
  })(O)), O.exports;
}
var F = Ze();
const Ye = /* @__PURE__ */ Xe(F), ke = /* @__PURE__ */ J({
  __proto__: null,
  default: Ye
}, [F]);
window.bowser = ke;
const d = class d {
  // store instance arguments and return empty base object that will
  // be populated asynchronously
  static async createInstance(r) {
    const t = {
      isWrapper: !0,
      base: {},
      args: r,
      enginePath: r.enginePath ?? d.defaultEnginePath
    };
    return await d.createScInstance(t), t.base;
  }
  static catchExceptions(r, t) {
    return function(...o) {
      try {
        t.apply(this, o);
      } catch (a) {
        console.log("Unhandled exception in " + r + "():"), console.log(a);
      }
    };
  }
  static getElement(r) {
    return typeof r != "string" ? r : document.getElementById(r);
  }
  static getAvailableCore() {
    for (const r of d.core_pool)
      if (r.$$available)
        return r;
    return null;
  }
  static async getWasmBinary(r) {
    if (d.defaultBinary)
      return d.defaultBinary;
    const t = new URL((r || "") + "/engine.esm.wasm", window.location.toString()), o = await fetch(t);
    if (!o.ok)
      return;
    const a = await o.arrayBuffer();
    return new Uint8Array(a);
  }
  static createRenderCanvas(r) {
    const t = r.containers.get(P.Default);
    let o = new OffscreenCanvas(
      t.clientWidth,
      t.clientHeight
    );
    return o.getContext("webgl2") || (console.debug(
      "WebGL2 context not supported with OffscreenCanvas, fallback with HTMLCanvasElement"
    ), o = document.createElement("canvas"), o.width = t.clientWidth, o.height = t.clientHeight), o;
  }
  static createCore(r, t) {
    console.assert(r.canvas !== void 0);
    const o = {
      $$available: !1,
      $$facade: r,
      callAfterMap: { index: 0, indexedWrappers: {} },
      canvas: r.canvas,
      wasmBinary: t
    };
    return d.core_pool.push(o), o;
  }
  static async getCore(r, t) {
    let o = d.getAvailableCore();
    const a = !o;
    if (a ? r.canvas = d.createRenderCanvas(r) : r.canvas = o == null ? void 0 : o.canvas, o === null) {
      const l = await d.getWasmBinary(t.enginePath);
      if (l === void 0)
        throw typeof t.onError == "function" && t.onError("Unable to load engine binary"), "Unable to load engine binary";
      o = d.createCore(r, l);
    }
    return o.$$available = !1, o.$$facade = r, o.$$onReady = d.catchExceptions("onReady", function() {
      const l = t.onReady;
      typeof l == "function" && l(r);
    }), typeof t.onError == "function" && (o.onAbort = d.catchExceptions("onError", function(l) {
      t.onError("fatal error: see console " + l);
    })), typeof t.enginePath == "string" && (o.locateFile = (l) => `${t.enginePath}/${l}`), { core: o, isNew: a };
  }
  static getFacade(r) {
    let t, o;
    t = r.base, o = r.args;
    const a = d.getElement(o.container);
    if (!a) throw new TypeError("'container' argument is missing or invalid");
    t.containers = /* @__PURE__ */ new Map(), t.containers.set(P.Default, a);
    const l = this.createWrapper();
    return t.wrappers = /* @__PURE__ */ new Map(), t.wrappers.set(P.Default, l), { facade: t, args: o };
  }
  static setupNewView(r, t, o) {
    const a = d.getElement(o), l = this.createWrapper();
    if (r.wrappers.set(t, l), !a)
      throw new TypeError("'container' argument is missing or invalid");
    r.containers.set(t, a), this.createSubContainer(r, t);
  }
  static createWrapper() {
    const r = document.createElement("div");
    return r.setAttribute(
      "style",
      "position: absolute; overflow: hidden; width: 100%; height: 100%; padding: 0; margin: 0; border: 0;"
    ), r;
  }
  static createSubContainer(r, t) {
    const o = document.createElement("div");
    o.setAttribute(
      "style",
      "position: relative; overflow: hidden; width: 100%; height: 100%; padding: 0; margin: 0; border: 0;"
    );
    const a = document.createElement("div");
    a.setAttribute(
      "style",
      "position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 0; margin: 0; border: 0;"
    ), a.onmousedown = function(f) {
      f.preventDefault();
    }, a.oncontextmenu = function(f) {
      f.preventDefault();
    };
    const l = r.wrappers.get(t);
    o.appendChild(l), o.appendChild(a);
    const c = r.containers.get(t);
    return c.innerHTML = "", c.appendChild(o), o;
  }
  static async createScInstance(r) {
    const { facade: t, args: o } = d.getFacade(r), { core: a, isNew: l } = await d.getCore(t, o);
    return d.createSubContainer(t, P.Default), l ? D(a) : setTimeout(function() {
      a.$$setReady && a.$$setReady();
    }), t;
  }
  static get glContext() {
    return D.ctx;
  }
};
d.core_pool = [];
let j = d;
export {
  le as AntiAliasingMode,
  ce as AttachScope,
  je as BimMask,
  fe as BimType,
  ve as BlurIntervalUnit,
  be as ColorType,
  de as CullingVectorSpace,
  T as CuttingSectionKey,
  Q as DataKey,
  ue as DrawMode,
  me as DrawStrategy,
  we as ElementMask,
  pe as ElementType,
  K as GroupKey,
  he as HighlightFilter,
  ge as HighlightMode,
  Z as ImageFormat,
  M as ImageKey,
  ee as InclusionKey,
  re as InstanceKey,
  Y as Key,
  ne as LightKey,
  ie as LightSpace,
  ae as LightType,
  Ce as LinePatternLengthUnit,
  k as MasterModelKey,
  ze as MaterialMask,
  te as MatrixKey,
  oe as MeshKey,
  se as ModelKey,
  Fe as OverlayAnchor,
  _e as OverlayUnit,
  xe as PointShape,
  Pe as PointSizeUnit,
  Oe as Projection,
  Ee as SessionType,
  Ne as SetVisibility,
  We as SimpleReflectionAttenuationUnit,
  Re as SmaaQuality,
  Ae as StateFailure,
  j as StreamcacheModule,
  nr as TextureFilterModeNames,
  Se as TextureInterpolation,
  Ie as TextureMipMapping,
  ye as TextureModifier,
  Be as TextureParameterization,
  Le as TextureTiling,
  rr as TextureWrapModeNames,
  De as TransparencyMode,
  er as UniformTypeNames,
  Qe as UnspecifiedMeasurementUnit,
  P as ViewKey,
  $e as XRayGroup,
  Me as getStateFailure,
  Ve as getUniformArrayLength,
  qe as getUniformBufferSize,
  Ue as getUniformsBufferSize,
  Ke as isError,
  $ as serializeBooleans,
  g as serializeText,
  Ge as serializeUniform,
  tr as serializeUniforms
};
