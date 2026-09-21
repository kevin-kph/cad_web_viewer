import { N as NodeValuesFlags, P as Point3, C as Color, S as Sampler, I as InternalLogicError, a as InterpolationType, Q as Quaternion, O as OperatorId } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
var KeyType = /* @__PURE__ */ ((KeyType2) => {
  KeyType2[KeyType2["Scalar"] = 1] = "Scalar";
  KeyType2[KeyType2["Vec3"] = 3] = "Vec3";
  KeyType2[KeyType2["Quat"] = 4] = "Quat";
  return KeyType2;
})(KeyType || {});
class KeyframeBuffer {
  /**
   * Creates a new buffer for storing keyframe data.
   * @param keyType The type of keyframes that will be stored in the buffer.
   */
  constructor(keyType) {
    this.keyType = keyType;
    this.times = [];
    this.values = [];
    this.tangents = [];
    this._hasTangents = null;
    this.keyOffset = keyType;
  }
  _validateKey(type) {
    if (this.keyType !== type)
      throw new Error(
        `Cannot add keyframe of type: ${KeyType[type]} to buffer of type: ${KeyType[this.keyType]}`
      );
  }
  _validateTangents(hasTangents) {
    if (this._hasTangents === null) {
      this._hasTangents = hasTangents;
    } else if (this._hasTangents !== hasTangents) {
      throw new Error(
        `Cannot add keyframe with${hasTangents ? "" : "out"} tangents to buffer with${hasTangents ? "out" : ""} tangents`
      );
    }
  }
  _findIndexFromTime(t) {
    for (let i = 0; i < this.times.length; i++) {
      if (this.times[i] >= t) return i;
    }
    return this.times.length;
  }
  /** Returns the index of the keyframe at the specified time. */
  getKeyframeIndex(t) {
    return this.times.indexOf(t);
  }
  /** Deletes a keyframe at the specified index. */
  deleteKeyframe(index) {
    this.times.splice(index, 1);
    this.tangents.splice(index * this.keyOffset * 2, this.keyOffset * 2);
    this.values.splice(index * this.keyOffset, this.keyOffset);
  }
  /**
   * Inserts a Scalar keyframe with the specified time. The type of this buffer should be [[KeyType.Scalar]]
   * @returns Index at which keyframe was inserted
   */
  insertScalarKeyframe(t, val, inTan, outTan) {
    this._validateKey(
      1
      /* Scalar */
    );
    const index = this._findIndexFromTime(t);
    this.times.splice(index, 0, t);
    this.values.splice(index, 0, val);
    if (inTan !== void 0 && outTan !== void 0) {
      this._validateTangents(true);
      this.tangents.splice(index * 2, 0, inTan, outTan);
    } else {
      this._validateTangents(false);
    }
    return index;
  }
  /** Updates a Scalar keyframe at the specified index. The type of this buffer should be [[KeyType.Scalar]] */
  updateScalarKeyframe(index, t, val, inTan, outTan) {
    this.values[index] = val;
    this.times[index] = t;
    if (inTan !== void 0 && outTan !== void 0) {
      this.tangents[index * 2] = inTan;
      this.tangents[index * 2 + 1] = outTan;
    }
  }
  /**
   * Inserts a Vec3 keyframe with the specified time. The type of this buffer should be [[KeyType.Vec3]]
   * @returns Index at which keyframe was inserted
   */
  insertVec3Keyframe(t, x, y, z, inTanX, inTanY, inTanZ, outTanX, outTanY, outTanZ) {
    this._validateKey(
      3
      /* Vec3 */
    );
    const index = this._findIndexFromTime(t);
    this.times.splice(index, 0, t);
    this.values.splice(index * this.keyOffset, 0, x, y, z);
    if (inTanX !== void 0 && inTanY !== void 0 && inTanZ !== void 0 && outTanX !== void 0 && outTanY !== void 0 && outTanZ !== void 0) {
      this._validateTangents(true);
      this.tangents.splice(
        index * this.keyOffset * 2,
        0,
        inTanX,
        inTanY,
        inTanZ,
        outTanX,
        outTanY,
        outTanZ
      );
    } else {
      this._validateTangents(false);
    }
    return index;
  }
  /** Updates a Vec3 keyframe at the specified index. The type of this buffer should be [[KeyType.Vec3]] */
  updateVec3Keyframe(index, t, x, y, z, inTanX, inTanY, inTanZ, outTanX, outTanY, outTanZ) {
    this.times[index] = t;
    this.values[index * this.keyOffset] = x;
    this.values[index * this.keyOffset + 1] = y;
    this.values[index * this.keyOffset + 2] = z;
    if (inTanX !== void 0 && inTanY !== void 0 && inTanZ !== void 0 && outTanX !== void 0 && outTanY !== void 0 && outTanZ !== void 0) {
      this._validateTangents(true);
      this.tangents.splice(
        index * this.keyOffset * 2,
        0,
        inTanX,
        inTanY,
        inTanZ,
        outTanX,
        outTanY,
        outTanZ
      );
      this.tangents[index * this.keyOffset * 2] = inTanX;
      this.tangents[index * this.keyOffset * 2 + 1] = inTanY;
      this.tangents[index * this.keyOffset * 2 + 2] = inTanZ;
      this.tangents[index * this.keyOffset * 2 + 3] = outTanX;
      this.tangents[index * this.keyOffset * 2 + 4] = outTanY;
      this.tangents[index * this.keyOffset * 2 + 5] = outTanZ;
    } else {
      this._validateTangents(false);
    }
    return index;
  }
  /**
   * Inserts a Quat keyframe with the specified time. The type of this buffer should be [[KeyType.Quat]]
   * @returns Index at which keyframe was inserted
   */
  insertQuatKeyframe(t, x, y, z, w, inTanX, inTanY, inTanZ, inTanW, outTanX, outTanY, outTanZ, outTanW) {
    this._validateKey(
      4
      /* Quat */
    );
    const index = this._findIndexFromTime(t);
    this.times.splice(index, 0, t);
    this.values.splice(index * this.keyOffset, 0, x, y, z, w);
    if (inTanX !== void 0 && inTanY !== void 0 && inTanZ !== void 0 && inTanW !== void 0 && outTanX !== void 0 && outTanY !== void 0 && outTanZ !== void 0 && outTanW !== void 0) {
      this._validateTangents(true);
      this.tangents.splice(
        index * this.keyOffset * 2,
        0,
        inTanX,
        inTanY,
        inTanZ,
        inTanW,
        outTanX,
        outTanY,
        outTanZ,
        outTanW
      );
    } else {
      this._validateTangents(false);
    }
  }
  /** Updates a Quat keyframe at the specified index. The type of this buffer should be [[KeyType.Quat]] */
  updateQuatKeyframe(index, t, x, y, z, w, inTanX, inTanY, inTanZ, inTanW, outTanX, outTanY, outTanZ, outTanW) {
    this.times[index] = t;
    this.values[index * this.keyOffset] = x;
    this.values[index * this.keyOffset + 1] = y;
    this.values[index * this.keyOffset + 2] = z;
    this.values[index * this.keyOffset + 3] = w;
    if (inTanX !== void 0 && inTanY !== void 0 && inTanZ !== void 0 && inTanW !== void 0 && outTanX !== void 0 && outTanY !== void 0 && outTanZ !== void 0 && outTanW !== void 0) {
      this._validateTangents(true);
      this.tangents.splice(
        index * this.keyOffset * 2,
        0,
        inTanX,
        inTanY,
        inTanZ,
        outTanX,
        outTanY,
        outTanZ
      );
      this.tangents[index * this.keyOffset * 2] = inTanX;
      this.tangents[index * this.keyOffset * 2 + 1] = inTanY;
      this.tangents[index * this.keyOffset * 2 + 2] = inTanZ;
      this.tangents[index * this.keyOffset * 2 + 3] = outTanW;
      this.tangents[index * this.keyOffset * 2 + 4] = outTanX;
      this.tangents[index * this.keyOffset * 2 + 5] = outTanY;
      this.tangents[index * this.keyOffset * 2 + 6] = outTanZ;
      this.tangents[index * this.keyOffset * 2 + 7] = outTanW;
    } else {
      this._validateTangents(false);
    }
  }
  /** @hidden */
  _export() {
    const optional = {};
    if (this.tangents.length !== 0) {
      optional.tangents = this.tangents.slice();
    }
    return {
      keyType: KeyType[this.keyType],
      times: this.times.slice(),
      values: this.values.slice(),
      ...optional
    };
  }
  /** @hidden */
  static _import(data) {
    const out = new KeyframeBuffer(KeyType[data.keyType]);
    out.times = data.times.slice();
    out.values = data.values.slice();
    if (data.tangents !== void 0) {
      out.tangents = data.tangents.slice();
    }
    return out;
  }
}
var NodeProperty = /* @__PURE__ */ ((NodeProperty2) => {
  NodeProperty2[NodeProperty2["Translation"] = 0] = "Translation";
  NodeProperty2[NodeProperty2["Rotation"] = 1] = "Rotation";
  NodeProperty2[NodeProperty2["Scale"] = 2] = "Scale";
  NodeProperty2[NodeProperty2["Opacity"] = 3] = "Opacity";
  NodeProperty2[NodeProperty2["Visibility"] = 4] = "Visibility";
  NodeProperty2[NodeProperty2["Color"] = 5] = "Color";
  NodeProperty2[NodeProperty2["ColorMap"] = 6] = "ColorMap";
  return NodeProperty2;
})(NodeProperty || {});
class NodeChannel {
  constructor(name, nodeId, property, sampler) {
    this.name = name;
    this.nodeId = nodeId;
    this.property = property;
    this.sampler = sampler;
    switch (this.property) {
      case 0:
      case 2:
      case 5:
        if (sampler.buffer.keyType !== KeyType.Vec3)
          throw new Error("Key type mismatch. Expected Vec3");
        break;
      case 1:
        if (sampler.buffer.keyType !== KeyType.Quat)
          throw new Error("Key type mismatch. Expected Quat");
        break;
      case 3:
      case 4:
      case 6:
        if (sampler.buffer.keyType !== KeyType.Scalar)
          throw new Error("Key type mismatch. Expected Scalar");
        break;
    }
  }
  /** @hidden */
  _getValue(t, values) {
    switch (this.property) {
      case 0:
        this.sampler.interpolateVec3(t, values.translate);
        values.flags |= NodeValuesFlags.Transform;
        break;
      case 1:
        this.sampler.interpolateQuat(t, values.rotation);
        values.flags |= NodeValuesFlags.Transform;
        break;
      case 2:
        this.sampler.interpolateVec3(t, values.scale);
        values.flags |= NodeValuesFlags.Transform;
        break;
      case 3:
        values.opacity = this.sampler.interpolateScalar(t);
        values.flags |= NodeValuesFlags.Opacity;
        break;
      case 4:
        values.visibility = this.sampler.interpolateScalar(t);
        values.flags |= NodeValuesFlags.Visibility;
        break;
      case 5:
        this.sampler.interpolateVec3(t, values.color);
        values.flags |= NodeValuesFlags.Color;
        break;
      case 6:
        {
          const mapIndex = this.sampler.interpolateScalar(t);
          const color = this._getColorFromMap(mapIndex);
          if (color !== null) {
            values.color.set(color.r, color.g, color.b);
            values.flags |= NodeValuesFlags.Color;
          }
        }
        break;
    }
  }
  _getColorFromMap(mapIndex) {
    const interpolateColor = (value, pos1, pos2, color1, color2) => {
      const ratio = (value - pos1) / (pos2 - pos1);
      return new Color(
        (1 - ratio) * color1.r + ratio * color2.r,
        (1 - ratio) * color1.g + ratio * color2.g,
        (1 - ratio) * color1.b + ratio * color2.b
      );
    };
    if (this.colorMap === void 0) {
      return null;
    }
    if (mapIndex < 0) mapIndex = 0;
    if (mapIndex > 1) mapIndex = 1;
    let i = 0;
    while (i < this.colorMap.length - 1) {
      const pos1 = this.colorMap[i].position;
      const color1 = this.colorMap[i].color;
      const pos2 = this.colorMap[i + 1].position;
      const color2 = this.colorMap[i + 1].color;
      if (mapIndex <= pos1) {
        return color1;
      } else if (mapIndex <= pos2) {
        return interpolateColor(mapIndex, pos1, pos2, color1, color2);
      } else if (mapIndex >= pos2 && i === this.colorMap.length - 2) {
        return color2;
      }
      ++i;
    }
    return null;
  }
  /** @hidden */
  _gatherForExport(context) {
    if (this.colorMap !== void 0) {
      context.colorMaps.add(this.colorMap);
    }
    context.samplers.add(this.sampler);
    this.sampler._gatherForExport(context);
  }
  /** @hidden */
  _export(context) {
    const optional = {};
    if (this.name !== "") {
      optional.name = this.name;
    }
    if (this.colorMap !== void 0) {
      optional.colorMap = context.colorMaps.getIndex(this.colorMap);
    }
    return {
      nodeId: this.nodeId,
      property: NodeProperty[this.property],
      sampler: context.samplers.getIndex(this.sampler),
      ...optional
    };
  }
  /** @hidden */
  static _import(context, data) {
    const out = new NodeChannel(
      data.name || "",
      data.nodeId,
      NodeProperty[data.property],
      context.samplers[data.sampler]
    );
    if (data.colorMap !== void 0) {
      out.colorMap = context.colorMaps[data.colorMap];
    }
    return out;
  }
}
var CameraProperty = /* @__PURE__ */ ((CameraProperty2) => {
  CameraProperty2[CameraProperty2["Position"] = 0] = "Position";
  CameraProperty2[CameraProperty2["Target"] = 1] = "Target";
  CameraProperty2[CameraProperty2["Up"] = 2] = "Up";
  CameraProperty2[CameraProperty2["Width"] = 3] = "Width";
  CameraProperty2[CameraProperty2["Height"] = 4] = "Height";
  return CameraProperty2;
})(CameraProperty || {});
class CameraChannel {
  /**
   * Do not use directly.  Create via Animation class API.
   * @hidden
   * */
  constructor(name, property, sampler) {
    this.name = name;
    this.property = property;
    this.sampler = sampler;
    switch (this.property) {
      case 0:
      case 1:
      case 2:
        if (sampler.buffer.keyType !== KeyType.Vec3)
          throw new Error("Key type mismatch. Expected Vec3");
        break;
      case 3:
      case 4:
        if (sampler.buffer.keyType !== KeyType.Scalar)
          throw new Error("Key type mismatch. Expected Scalar");
        break;
    }
  }
  /** @hidden */
  _getValue(t, values) {
    switch (this.property) {
      case 0:
        if (values.position === null) {
          values.position = new Point3(0, 0, 0);
        }
        this.sampler.interpolateVec3(t, values.position);
        break;
      case 1:
        if (values.target === null) {
          values.target = new Point3(0, 0, -1);
        }
        this.sampler.interpolateVec3(t, values.target);
        break;
      case 2:
        if (values.up === null) {
          values.up = new Point3(0, 1, 0);
        }
        this.sampler.interpolateVec3(t, values.up);
        break;
      case 3:
        values.width = this.sampler.interpolateScalar(t);
        break;
      case 4:
        values.height = this.sampler.interpolateScalar(t);
    }
  }
  /** @hidden */
  _gatherForExport(context) {
    context.samplers.add(this.sampler);
    this.sampler._gatherForExport(context);
  }
  /** @hidden */
  _export(context) {
    const optional = {};
    if (this.name !== "") {
      optional.name = this.name;
    }
    return {
      property: CameraProperty[this.property],
      sampler: context.samplers.getIndex(this.sampler),
      ...optional
    };
  }
  /** @hidden */
  static _import(context, data) {
    return new CameraChannel(
      data.name || "",
      CameraProperty[data.property],
      context.samplers[data.sampler]
    );
  }
}
class Animation {
  /**
   * Creates a new, empty Animation
   * @param name friendly name for the animation
   */
  constructor(name) {
    this.name = name;
    this.nodeChannels = [];
    this.cameraChannels = [];
    this.pivotPoints = /* @__PURE__ */ new Map();
  }
  /**
   * Creates a new node animation channel.
   * @param name friendly name for the channel.
   * @param target id of node that will receive interpolated values.
   * @param property the node property that will be animated.
   * @param sampler sampler describing the buffer and interpolation type.
   */
  createNodeChannel(name, target, property, sampler) {
    const channel = new NodeChannel(name, target, property, sampler);
    this._registerNodeChannel(channel);
    return channel;
  }
  _registerNodeChannel(channel) {
    this.nodeChannels.push(channel);
  }
  /**
   * Creates a new camera animation channel.
   * @param name friendly name for the channel.
   * @param property the property that will be animated by this channel.
   * @param sampler sampler describing the buffer and interpolation type used.
   */
  createCameraChannel(name, property, sampler) {
    const channel = new CameraChannel(name, property, sampler);
    this._registerCameraChannel(channel);
    return channel;
  }
  _registerCameraChannel(channel) {
    this.cameraChannels.push(channel);
  }
  /**
   * Removes a channel from this animation.
   *
   * Call [[Player.reload]] on any players that are referencing this animation.
   */
  deleteChannel(channel) {
    for (let i = 0; i < this.nodeChannels.length; i++) {
      if (this.nodeChannels[i] === channel) {
        this.nodeChannels.splice(i, 1);
        return;
      }
    }
    for (let i = 0; i < this.cameraChannels.length; i++) {
      if (this.cameraChannels[i] === channel) {
        this.cameraChannels.splice(i, 1);
        return;
      }
    }
  }
  /** @hidden */
  _gatherForExport(context) {
    for (const channel of this.nodeChannels) {
      channel._gatherForExport(context);
    }
    for (const channel of this.cameraChannels) {
      channel._gatherForExport(context);
    }
  }
  /** @hidden */
  _export(context) {
    const pivotPoints = [];
    const optional = {};
    if (this.name !== "") {
      optional.name = this.name;
    }
    const optionalChannels = {};
    const exportChannels = (arrayName) => {
      if (this[arrayName].length === 0) {
        return;
      }
      const out = [];
      for (const channel of this[arrayName]) {
        out.push(channel._export(context));
      }
      optionalChannels[arrayName] = out;
    };
    this.pivotPoints.forEach((value, key) => {
      pivotPoints.push({ node: key, point: value });
    });
    if (pivotPoints.length !== 0) {
      optional.pivotPoints = pivotPoints;
    }
    exportChannels("nodeChannels");
    exportChannels("cameraChannels");
    return {
      ...optional,
      ...optionalChannels
    };
  }
  /** @hidden */
  static _import(context, data) {
    const out = new Animation(data.name || "");
    if (data.nodeChannels !== void 0) {
      for (const channelData of data.nodeChannels) {
        out._registerNodeChannel(NodeChannel._import(context, channelData));
      }
    }
    if (data.cameraChannels !== void 0) {
      for (const channelData of data.cameraChannels) {
        out._registerCameraChannel(CameraChannel._import(context, channelData));
      }
    }
    if (data.pivotPoints !== void 0) {
      for (const pivotPointJson of data.pivotPoints) {
        const point = Point3.fromJson(pivotPointJson.point);
        out.pivotPoints.set(pivotPointJson.node, point);
      }
    }
    return out;
  }
}
function exportAnimations(animations) {
  return exportAnimationsImpl(animations);
}
function exportAnimationsImpl(animations) {
  const context = new ExportContext();
  for (const animation of animations) {
    animation._gatherForExport(context);
  }
  const optional = {};
  if (!context.buffers.isEmpty()) {
    optional.buffers = [];
    for (const buffer of context.buffers.toArray()) {
      optional.buffers.push(buffer._export());
    }
  }
  if (!context.samplers.isEmpty()) {
    optional.samplers = [];
    for (const sampler of context.samplers.toArray()) {
      optional.samplers.push(sampler._export(context));
    }
  }
  if (!context.colorMaps.isEmpty()) {
    optional.colorMaps = [];
    for (const colorMap of context.colorMaps.toArray()) {
      optional.colorMaps.push(exportColorMap(colorMap));
    }
  }
  if (animations.length !== 0) {
    optional.animations = [];
    for (const animation of animations) {
      optional.animations.push(animation._export(context));
    }
  }
  return {
    ...optional
  };
}
function importAnimations(exportedObj) {
  const data = exportedObj;
  const context = new ImportContext();
  if (data.buffers !== void 0) {
    for (const bufferData of data.buffers) {
      context.buffers.push(KeyframeBuffer._import(bufferData));
    }
  }
  if (data.samplers !== void 0) {
    for (const samplerData of data.samplers) {
      context.samplers.push(Sampler._import(context, samplerData));
    }
  }
  if (data.colorMaps !== void 0) {
    for (const colorMapData of data.colorMaps) {
      context.colorMaps.push(importColorMap(colorMapData));
    }
  }
  const out = [];
  if (data.animations !== void 0) {
    for (const animationData of data.animations) {
      out.push(Animation._import(context, animationData));
    }
  }
  return out;
}
function exportColorMap(colorMap) {
  const out = [];
  for (const entry of colorMap) {
    out.push([entry.position, entry.color.r, entry.color.g, entry.color.b]);
  }
  return out;
}
function importColorMap(colorMapData) {
  const out = [];
  for (const entry of colorMapData) {
    out.push({
      position: entry[0],
      color: new Color(entry[1], entry[2], entry[3])
    });
  }
  return out;
}
class ExportContext {
  constructor() {
    this.buffers = new IndexedSet();
    this.samplers = new IndexedSet();
    this.colorMaps = new IndexedSet();
  }
}
class ImportContext {
  constructor() {
    this.buffers = [];
    this.samplers = [];
    this.colorMaps = [];
  }
}
class IndexedSet {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(value) {
    if (!this.map.has(value)) {
      this.map.set(value, this.map.size);
    }
  }
  getIndex(value) {
    const index = this.map.get(value);
    if (index === void 0) {
      throw new InternalLogicError();
    }
    return index;
  }
  /**
   * Returns an array containing each element of the set placed at its
   * assigned index.
   */
  toArray() {
    const out = [];
    this.map.forEach((index, value) => {
      out[index] = value;
    });
    return out;
  }
  isEmpty() {
    return this.map.size === 0;
  }
}
function _createCameraChannel(animation, name, channelType, interpolationType) {
  const keyType = channelType === CameraProperty.Width || channelType === CameraProperty.Height ? KeyType.Scalar : KeyType.Vec3;
  const buffer = new KeyframeBuffer(keyType);
  const sampler = new Sampler(buffer, interpolationType);
  const channel = animation.createCameraChannel(name, channelType, sampler);
  return channel;
}
function createCameraChannels(animation, namePrefix, interpolationType) {
  const channels = [];
  channels.push(
    _createCameraChannel(
      animation,
      `${namePrefix}-Position`,
      CameraProperty.Position,
      interpolationType
    )
  );
  channels.push(
    _createCameraChannel(
      animation,
      `${namePrefix}-Target`,
      CameraProperty.Target,
      interpolationType
    )
  );
  channels.push(
    _createCameraChannel(animation, `${namePrefix}-Up`, CameraProperty.Up, interpolationType)
  );
  channels.push(
    _createCameraChannel(animation, `${namePrefix}-Width`, CameraProperty.Width, interpolationType)
  );
  channels.push(
    _createCameraChannel(
      animation,
      `${namePrefix}-Height`,
      CameraProperty.Height,
      interpolationType
    )
  );
  return channels;
}
function keyframeCamera(t, camera, animation) {
  const position = camera.getPosition();
  animation.cameraChannels[0].sampler.buffer.insertVec3Keyframe(
    t,
    position.x,
    position.y,
    position.z
  );
  const target = camera.getTarget();
  animation.cameraChannels[1].sampler.buffer.insertVec3Keyframe(t, target.x, target.y, target.z);
  const up = camera.getUp();
  animation.cameraChannels[2].sampler.buffer.insertVec3Keyframe(t, up.x, up.y, up.z);
  animation.cameraChannels[3].sampler.buffer.insertScalarKeyframe(t, camera.getWidth());
  animation.cameraChannels[4].sampler.buffer.insertScalarKeyframe(t, camera.getHeight());
}
class ChannelData {
  constructor(buffer, sampler, channel) {
    this.buffer = buffer;
    this.sampler = sampler;
    this.channel = channel;
  }
}
class AnimationData {
  constructor(_viewer) {
    this._viewer = _viewer;
    this._channelMap = /* @__PURE__ */ new Map();
    this._frame = 0;
    this._isPlaying = false;
    this._interval = 0;
    this._keyframeTypes = 1 | 2;
    this._viewer.selectionManager.setSelectParentIfSelected(false);
    this._animation = new Animation("Test");
    this._player = this._viewer.animationManager.createPlayer(this._animation);
    this._player.loop = -1;
    this._player.onComplete = () => {
      this.stopUpdating();
    };
    const timeLineSlider = document.querySelector("#timeline-slider");
    this._timelineSlider = timeLineSlider;
    const frameBox = document.querySelector("#frame-box");
    this._frameBox = frameBox;
    const channelBox = document.querySelector("#channel-box");
    this._channelBox = channelBox;
    this._initUi();
  }
  _onFrameChange() {
    this._viewer.selectionManager.clear();
  }
  _getKeyframeTime() {
    return this._frame;
  }
  async keyframeNodes(nodeIds) {
    for (const nodeId of nodeIds) {
      await this.createKeyframes(nodeId);
    }
  }
  keyframeCamera() {
    const camera = this._viewer.view.getCamera();
    if (!this._channelMap.has("Camera-Position")) {
      const channels = createCameraChannels(
        this._animation,
        "Camera",
        InterpolationType.Linear
      );
      for (const channel of channels) {
        const data = new ChannelData(channel.sampler.buffer, channel.sampler, channel);
        this.createChannelEntry(data);
      }
    }
    keyframeCamera(this._frame, camera, this._animation);
    for (const channel of this._animation.cameraChannels) {
      const channelData = this._channelMap.get(channel.name);
      if (channelData === void 0) {
        continue;
      }
      this.createKeyframeEntry(channelData);
    }
    this._player.reload();
  }
  async createKeyframes(nodeId) {
    if ((this._keyframeTypes & 1) === 1) {
      this._keyframeTranslation(nodeId);
    }
    if ((this._keyframeTypes & 2) === 2) {
      this._keyframeRotation(nodeId);
    }
    if ((this._keyframeTypes & 4) === 4) {
      await this._keyframeOpacity(nodeId);
    }
    if ((this._keyframeTypes & 8) === 8) {
      this._keyframeVisibility(nodeId);
    }
    if ((this._keyframeTypes & 16) === 16) {
      await this._keyframeColor(nodeId);
    }
    this._player.reload();
  }
  async _keyframeOpacity(nodeId) {
    const channelName = `Opacity-${nodeId}`;
    let data = this._channelMap.get(channelName);
    if (!data) {
      const opacityBuffer = new KeyframeBuffer(KeyType.Scalar);
      const opacitySampler = new Sampler(
        opacityBuffer,
        InterpolationType.Linear
      );
      const opacityChannel = this._animation.createNodeChannel(
        channelName,
        nodeId,
        NodeProperty.Opacity,
        opacitySampler
      );
      data = new ChannelData(opacityBuffer, opacitySampler, opacityChannel);
      this.createChannelEntry(data);
    }
    const opacity = (await this._viewer.model.getNodesOpacity([nodeId]))[0];
    if (opacity == null) {
      data.buffer.insertScalarKeyframe(this._getKeyframeTime(), 1);
    } else {
      data.buffer.insertScalarKeyframe(this._getKeyframeTime(), opacity);
    }
    this.createKeyframeEntry(data);
  }
  _keyframeVisibility(nodeId) {
    const channelName = `Visibility-${nodeId}`;
    let data = this._channelMap.get(channelName);
    if (!data) {
      const visibilityBuffer = new KeyframeBuffer(KeyType.Scalar);
      const visibilitySampler = new Sampler(
        visibilityBuffer,
        InterpolationType.Linear
      );
      const visibilityChannel = this._animation.createNodeChannel(
        channelName,
        nodeId,
        NodeProperty.Visibility,
        visibilitySampler
      );
      data = new ChannelData(visibilityBuffer, visibilitySampler, visibilityChannel);
      this.createChannelEntry(data);
    }
    const visibility = this._viewer.model.getNodeVisibility(nodeId);
    data.buffer.insertScalarKeyframe(this._getKeyframeTime(), visibility ? 1 : 0);
    this.createKeyframeEntry(data);
  }
  _keyframeTranslation(nodeId) {
    const channelName = `Translate-${nodeId}`;
    let data = this._channelMap.get(channelName);
    if (!data) {
      const translateBuffer = new KeyframeBuffer(KeyType.Vec3);
      const translateSampler = new Sampler(
        translateBuffer,
        InterpolationType.Linear
      );
      const translateChannel = this._animation.createNodeChannel(
        channelName,
        nodeId,
        NodeProperty.Translation,
        translateSampler
      );
      data = new ChannelData(translateBuffer, translateSampler, translateChannel);
      this.createChannelEntry(data);
    }
    const matrix = this._viewer.model.getNodeMatrix(nodeId);
    data.buffer.insertVec3Keyframe(
      this._getKeyframeTime(),
      matrix.m[12],
      matrix.m[13],
      matrix.m[14]
    );
    this.createKeyframeEntry(data);
  }
  _keyframeRotation(nodeId) {
    const channelName = `Rotate-${nodeId}`;
    let data = this._channelMap.get(channelName);
    if (!data) {
      const rotateBuffer = new KeyframeBuffer(KeyType.Quat);
      const rotateSampler = new Sampler(rotateBuffer, InterpolationType.Linear);
      const rotateChannel = this._animation.createNodeChannel(
        channelName,
        nodeId,
        NodeProperty.Rotation,
        rotateSampler
      );
      data = new ChannelData(rotateBuffer, rotateSampler, rotateChannel);
      this.createChannelEntry(data);
    }
    const matrix = this._viewer.model.getNodeMatrix(nodeId);
    const rotation = Quaternion.createFromMatrix(matrix);
    data.buffer.insertQuatKeyframe(
      this._getKeyframeTime(),
      rotation.x,
      rotation.y,
      rotation.z,
      rotation.w
    );
    this.createKeyframeEntry(data);
  }
  async _keyframeColor(nodeId) {
    const channelName = `Color-${nodeId}`;
    let data = this._channelMap.get(channelName);
    if (!data) {
      const colorBuffer = new KeyframeBuffer(KeyType.Vec3);
      const colorSampler = new Sampler(colorBuffer, InterpolationType.Linear);
      const colorChannel = this._animation.createNodeChannel(
        channelName,
        nodeId,
        NodeProperty.Color,
        colorSampler
      );
      data = new ChannelData(colorBuffer, colorSampler, colorChannel);
      this.createChannelEntry(data);
    }
    const color = await this._viewer.model.getNodesEffectiveFaceColor([nodeId]);
    data.buffer.insertVec3Keyframe(this._getKeyframeTime(), color[0].r, color[0].g, color[0].b);
    this.createKeyframeEntry(data);
  }
  createChannelEntry(channelData) {
    const channelDiv = document.createElement("div");
    channelDiv.id = channelData.channel.name;
    channelDiv.classList.add("channel-entry");
    const html = `
        <button>D</button>
        <span class="channel-name">${channelData.channel.name}</span>
        <select>
        <option>Constant</option>
		<option>Cubic Spline</option>
        <option selected="selected">Linear</option>`;
    channelDiv.innerHTML = html;
    const select = channelDiv.querySelector("select");
    select.onchange = () => {
      this._setChannelInterpolationType(channelData.channel, select.value);
    };
    if (channelData.sampler.interpolationType === InterpolationType.Constant) {
      select.value = "Constant";
    } else if (channelData.sampler.interpolationType === InterpolationType.CubicSpline) {
      select.value = "Cubic Spline";
    }
    const delButton = channelDiv.querySelector("button");
    delButton.onclick = () => {
      this._deleteChannel(channelData);
    };
    if (channelData.channel instanceof NodeChannel) {
      const channel = channelData.channel;
      const span = channelDiv.querySelector("span");
      span.onclick = () => {
        this._viewer.selectionManager.selectNode(channel.nodeId);
      };
    }
    this._channelBox.appendChild(channelDiv);
    this._channelMap.set(channelData.channel.name, channelData);
  }
  static _getKeyframeValueStr(buffer, index) {
    let str = "";
    for (let i = 0; i < buffer.keyOffset - 1; i++) {
      if (i > 0) str += ", ";
      str += buffer.values[index + i];
    }
    return str;
  }
  createKeyframeEntry(channelData) {
    const channelItem = this._channelBox.querySelector(`#${channelData.channel.name}`);
    const span = document.createElement("span");
    span.title = AnimationData._getKeyframeValueStr(
      channelData.buffer,
      channelData.buffer.times.length
    );
    span.classList.add("keyframe");
    span.innerHTML = this._getKeyframeTime().toFixed(2);
    channelItem.appendChild(span);
  }
  createAllKeyframeEntries(channelData) {
    const channelItem = this._channelBox.querySelector(`#${channelData.channel.name}`);
    const times = channelData.buffer.times;
    for (let i = 0; i < times.length; i++) {
      const time = times[i];
      const span = document.createElement("span");
      span.title = AnimationData._getKeyframeValueStr(channelData.buffer, i);
      span.classList.add("keyframe");
      span.innerHTML = time.toFixed(2);
      channelItem.appendChild(span);
    }
  }
  _deleteChannel(channelData) {
    this._stopAnimation();
    const channelItem = this._channelBox.querySelector(`#${channelData.channel.name}`);
    if (channelItem && channelItem.parentElement) {
      channelItem.parentElement.removeChild(channelItem);
    }
    this._animation.deleteChannel(channelData.channel);
    this._channelMap.delete(channelData.channel.name);
    this._player.reload();
  }
  _setChannelInterpolationType(channel, type) {
    if (type === "Constant")
      channel.sampler.interpolationType = InterpolationType.Constant;
    else if (type === "Linear")
      channel.sampler.interpolationType = InterpolationType.Linear;
    else if (type === "Cubic Spline")
      channel.sampler.interpolationType = InterpolationType.CubicSpline;
  }
  _initUi() {
    this._frameBox.onchange = () => {
      if (this._isPlaying) return;
      this._timelineSlider.value = this._frameBox.value;
      this._frame = parseFloat(this._frameBox.value);
      this._player.setTime(this._frame);
      this._onFrameChange();
    };
    const playButton = document.querySelector("#play-button");
    playButton.onclick = () => {
      this._playAnimation();
      this._onFrameChange();
    };
    const pauseButton = document.querySelector("#pause-button");
    pauseButton.onclick = () => {
      this._pauseAnimation();
    };
    const stopButton = document.querySelector("#stop-button");
    stopButton.onclick = () => {
      this._stopAnimation();
      this._onFrameChange();
    };
    this._timelineSlider.onchange = () => {
      if (this._isPlaying) return;
      this._frameBox.value = this._timelineSlider.value;
      this._frame = parseFloat(this._timelineSlider.value);
      this._player.setTime(this._frame);
      this._onFrameChange();
    };
    const frameCount = document.querySelector("#frame-count-box");
    frameCount.onchange = () => {
      this._timelineSlider.max = frameCount.value;
    };
    const keyframeTypesBox = document.querySelector("#keyframe-types");
    const keyframeTypes = keyframeTypesBox.querySelectorAll("input");
    for (let i = 0; i < keyframeTypes.length; i++) {
      const element = keyframeTypes[i];
      element.onchange = () => {
        this._enableKeyframeType(element.name, element.checked);
      };
    }
    const loopBox = document.querySelector("#loop-box");
    loopBox.onchange = () => {
      this._player.loop = parseInt(loopBox.value, 10);
    };
    const timeScale = document.querySelector("#animation-time-scale");
    timeScale.onchange = () => {
      this._player.speed = parseFloat(timeScale.value);
    };
    const tickTime = document.querySelector("#tick-time");
    tickTime.onchange = () => {
      const freq = parseInt(tickTime.value, 10);
      this._viewer.animationManager.setTickInterval(freq);
    };
    const setNodeColorButton = document.querySelector("#set-color-button");
    setNodeColorButton.onclick = () => {
      const colorInputElement = document.querySelector("#color-input");
      const colorInputText = colorInputElement.value;
      const colorInputNumber = parseInt(colorInputText.substr(1), 16);
      const color = Color.createFromFloat(
        (colorInputNumber >> 16) / 255,
        (colorInputNumber >> 8 & 255) / 255,
        (colorInputNumber & 255) / 255
      );
      const nodeIds = [];
      const selectedNodes = this._viewer.selectionManager.getResults();
      for (const node of selectedNodes) {
        nodeIds.push(node.getNodeId());
      }
      this._viewer.model.setNodesFaceColor(nodeIds, color);
    };
    const setNodeOpacityButton = document.querySelector("#set-opacity-button");
    setNodeOpacityButton.onclick = () => {
      const opacityInputElement = document.querySelector("#opacity-input");
      const opacity = opacityInputElement.valueAsNumber;
      const nodeIds = [];
      const selectedNodes = this._viewer.selectionManager.getResults();
      for (const node of selectedNodes) {
        nodeIds.push(node.getNodeId());
      }
      this._viewer.model.setNodesOpacity(nodeIds, opacity);
    };
    const toggleNodeVisibilityButton = document.querySelector(
      "#toggle-visibility-button"
    );
    toggleNodeVisibilityButton.onclick = () => {
      const nodeVisibilityMap = /* @__PURE__ */ new Map();
      const selectedNodes = this._viewer.selectionManager.getResults();
      for (const node of selectedNodes) {
        const nodeId = node.getNodeId();
        const newVisibility = !this._viewer.model.getNodeVisibility(nodeId);
        nodeVisibilityMap.set(nodeId, newVisibility);
      }
      this._viewer.model.setNodesVisibilities(nodeVisibilityMap);
    };
    const resetVisibilitiesButton = document.querySelector(
      "#reset-visibilities-button"
    );
    resetVisibilitiesButton.onclick = () => {
      this._viewer.model.resetNodesVisibility();
    };
    const keyframeNodeButton = document.querySelector("#keyframe-node-button");
    keyframeNodeButton.onclick = () => {
      this.keyframeNodes(this._getSelectedItems());
    };
    const keyframeCameraButton = document.querySelector("#keyframe-camera-button");
    keyframeCameraButton.onclick = () => {
      this.keyframeCamera();
    };
    const exportJsonButton = document.querySelector("#export-button");
    exportJsonButton.onclick = () => {
      this.exportAnimation();
    };
    const importJsonButton = document.querySelector("#import-button");
    importJsonButton.onclick = () => {
      this.importAnimation();
    };
  }
  _enableKeyframeType(name, enabled) {
    let type;
    if (name === "Translation") type = 1;
    else if (name === "Rotation") type = 2;
    else if (name === "Opacity") type = 4;
    else if (name === "Visibility") type = 8;
    else if (name === "Color") type = 16;
    else return;
    if (enabled) this._keyframeTypes |= type;
    else this._keyframeTypes &= ~type;
  }
  _pauseAnimation() {
    this._player.pause();
    this.stopUpdating();
  }
  _stopAnimation() {
    this._player.stop();
    this._frame = 0;
    this.stopUpdating();
    this._setCurrentValues();
  }
  _playAnimation() {
    if (this._isPlaying) return;
    this._timelineSlider.disabled = true;
    this._frameBox.disabled = true;
    this._player.play();
    this._interval = window.setInterval(() => {
      this._setCurrentValues();
    }, 64);
    const handleOperator = this._viewer.operatorManager.getOperator(OperatorId.Handle);
    handleOperator.removeHandles();
  }
  exportAnimation() {
    const animationJson = exportAnimations([this._animation]);
    const animationJsonString = JSON.stringify(animationJson, null, 4);
    const exportTextBox = document.querySelector("#export-textarea");
    if (exportTextBox === null) {
      return;
    }
    exportTextBox.innerHTML = animationJsonString;
  }
  importAnimation() {
    const importTextbox = document.querySelector("#import-textarea");
    if (importTextbox === null) {
      return;
    }
    const animationJson = JSON.parse(importTextbox.value);
    const animations = importAnimations(animationJson);
    if (animations.length === 0) {
      return;
    }
    const animation = animations[0];
    this._animation = animation;
    const importChannel = (channel) => {
      const channelSampler = channel.sampler;
      const channelBuffer = channelSampler.buffer;
      const channelData = new ChannelData(channelBuffer, channelSampler, channel);
      this.createChannelEntry(channelData);
      this.createAllKeyframeEntries(channelData);
    };
    for (const cameraChannel of animation.cameraChannels) {
      importChannel(cameraChannel);
    }
    for (const nodeChannel of animation.nodeChannels) {
      importChannel(nodeChannel);
    }
    this._player = this._viewer.animationManager.createPlayer(this._animation);
    const loopBox = document.querySelector("#loop-box");
    this._player.loop = parseInt(loopBox.value, 10);
    const timeScale = document.querySelector("#animation-time-scale");
    this._player.speed = parseFloat(timeScale.value);
  }
  stopUpdating() {
    this._timelineSlider.disabled = false;
    this._frameBox.disabled = false;
    this._isPlaying = false;
    window.clearInterval(this._interval);
  }
  _setCurrentValues() {
    const currentFrame = this._player.getCurrentTime().toString();
    this._timelineSlider.value = currentFrame;
    this._frameBox.value = currentFrame;
  }
  _getSelectedItems() {
    const selectedItems = this._viewer.selectionManager.getResults();
    const ids = selectedItems.map((selectionItem) => {
      return selectionItem.getNodeId();
    });
    return ids;
  }
}
class KeyframeOperator {
  constructor(_viewer, _animationData) {
    this._viewer = _viewer;
    this._animationData = _animationData;
    this._viewer.setCallbacks({
      selectionArray: async (selectionEvents, removed) => {
        await this.onSelection(selectionEvents, removed);
      }
    });
  }
  async onKeyUp(event) {
    const keyCode = event.getKeyCode();
    if (keyCode === 75) await this._animationData.keyframeNodes(this._getSelectedItems());
    else if (keyCode === 67) this._animationData.keyframeCamera();
  }
  _getSelectedItems() {
    const selectedItems = this._viewer.selectionManager.getResults();
    const ids = selectedItems.map((selectionItem) => {
      return selectionItem.getNodeId();
    });
    return ids;
  }
  async onSelection(_selectionEvents, _removed) {
    const handleOperator = this._viewer.operatorManager.getOperator(OperatorId.Handle);
    const selectedItems = this._getSelectedItems();
    if (selectedItems.length === 0) {
      await handleOperator.removeHandles();
    } else {
      await handleOperator.addHandles(selectedItems);
    }
  }
}
class AnimationExample {
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._animationData = new AnimationData(viewer);
      const keyframeOperator = new KeyframeOperator(viewer, this._animationData);
      const operatorId = this._viewer.operatorManager.registerCustomOperator(keyframeOperator);
      this._viewer.operatorManager.push(operatorId);
      this._viewer.start();
    });
  }
}
window.onload = function() {
  const animationExample = new AnimationExample();
  animationExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
