import { aj as EndcapShape, E as EndcapType, M as MarkupItem, L as Line, h as Polyline, T as TextBox } from "../WebViewer.js";
/* empty css        */
import { c as createViewer, O as OperatorInfo } from "../index.js";
import { h as hexToRgb } from "../utils.js";
class ArrowOperator {
  constructor(viewer) {
    this._currentArrow = null;
    this._arrowIds = [];
    this._arrowLineType = 0;
    this._itemStyle = new EndcapShape();
    this._viewer = viewer;
    this._itemStyle.setEndEndcapType(EndcapType.Arrowhead);
  }
  onMouseDown(event) {
    if (event.shiftDown()) {
      let markupItem;
      if (this._arrowLineType === 0) {
        const arrowLineMarkupItem = new ArrowLineMarkupItem(this._viewer, event.getPosition());
        this._currentArrow = arrowLineMarkupItem;
        markupItem = arrowLineMarkupItem;
      } else {
        const arrowPolylineMarkupItem = new ArrowPolylineMarkupItem(
          this._viewer,
          event.getPosition()
        );
        this._currentArrow = arrowPolylineMarkupItem;
        markupItem = arrowPolylineMarkupItem;
      }
      this._currentArrow.getItem()._assign(this._itemStyle);
      const markupId = this._viewer.markupManager.registerMarkup(markupItem, this._viewer.view);
      this._arrowIds.push(markupId);
      event.setHandled(true);
    }
  }
  onMouseMove(event) {
    if (this._currentArrow) {
      this._currentArrow.update(event.getPosition());
      this._viewer.markupManager.refreshMarkup(this._viewer.view);
    }
  }
  onMouseUp(_event) {
    this._currentArrow = null;
  }
  onDeactivate() {
    const markup = this._viewer.markupManager;
    for (let i = 0; i < this._arrowIds.length; i++) {
      markup.unregisterMarkup(this._arrowIds[i], this._viewer.view);
    }
    this._arrowIds = [];
  }
  onMousewheel(_event) {
  }
  onTouchStart(_event) {
  }
  onTouchMove(_event) {
  }
  onTouchEnd(_event) {
  }
  onKeyDown(_event) {
  }
  onKeyUp(_event) {
  }
  onActivate() {
  }
  onViewOrientationChange() {
  }
  stopInteraction() {
  }
  setArrowType(arrowType) {
    this._arrowLineType = arrowType;
  }
  getArrowStyle() {
    return this._itemStyle;
  }
}
class ArrowPolylineMarkupItem extends MarkupItem {
  constructor(viewer, point) {
    super();
    this._viewer = viewer;
    this._lineShape = new Polyline();
    this._lineShape.pushPoint(point);
  }
  draw() {
    this._viewer.markupManager.getRenderer().drawPolyline(this._lineShape);
  }
  getItem() {
    return this._lineShape;
  }
  update(point) {
    const points = this._lineShape.getPoints();
    if (!points[points.length - 1].equals(point)) this._lineShape.pushPoint(point);
  }
}
class ArrowLineMarkupItem extends MarkupItem {
  constructor(viewer, point) {
    super();
    this._viewer = viewer;
    this._lineShape = new Line(point, point);
  }
  draw() {
    this._viewer.markupManager.getRenderer().drawLine(this._lineShape);
  }
  getItem() {
    return this._lineShape;
  }
  update(point) {
    this._lineShape.setP2(point);
  }
}
function bindArrowOperatorEvents(arrowOperator) {
  const arrowLineType = document.getElementById("arrowLineType");
  arrowLineType.onchange = () => {
    if (arrowLineType.value === "Line") arrowOperator.setArrowType(
      0
      /* Line */
    );
    else arrowOperator.setArrowType(
      1
      /* Polyline */
    );
  };
  const arrowStartEndcap = document.getElementById("arrowStartEndcap");
  arrowStartEndcap.onchange = () => {
    const style = arrowOperator.getArrowStyle();
    switch (arrowStartEndcap.value) {
      case "Arrowhead":
        style.setStartEndcapType(EndcapType.Arrowhead);
        break;
      case "Circle":
        style.setStartEndcapType(EndcapType.Circle);
        break;
      default:
        style.setStartEndcapType(EndcapType.None);
    }
  };
  const arrowStartEndcapColor = document.getElementById(
    "arrowStartEndcapColor"
  );
  arrowStartEndcapColor.onchange = () => {
    const style = arrowOperator.getArrowStyle();
    style.setStartEndcapColor(hexToRgb(arrowStartEndcapColor.value));
  };
  const arrowEndEndcap = document.getElementById("arrowEndEndcap");
  arrowEndEndcap.onchange = () => {
    const style = arrowOperator.getArrowStyle();
    switch (arrowEndEndcap.value) {
      case "Arrowhead":
        style.setEndEndcapType(EndcapType.Arrowhead);
        break;
      case "Circle":
        style.setEndEndcapType(EndcapType.Circle);
        break;
      default:
        style.setEndEndcapType(EndcapType.None);
    }
  };
  const arrowEndEndcapColor = document.getElementById("arrowEndEndcapColor");
  arrowEndEndcapColor.onchange = () => {
    const style = arrowOperator.getArrowStyle();
    style.setEndEndcapColor(hexToRgb(arrowEndEndcapColor.value));
  };
  const arrowStartEndcapSize = document.getElementById("arrowStartEndcapSize");
  arrowStartEndcapSize.onchange = () => {
    const style = arrowOperator.getArrowStyle();
    style.setStartEndcapSize(parseInt(arrowStartEndcapSize.value, 10));
  };
  const arrowEndEndcapSize = document.getElementById("arrowEndEndcapSize");
  arrowEndEndcapSize.onchange = () => {
    const style = arrowOperator.getArrowStyle();
    style.setEndEndcapSize(parseInt(arrowEndEndcapSize.value, 10));
  };
  const arrowStrokeWidth = document.getElementById("arrowStrokeWidth");
  arrowStrokeWidth.onchange = () => {
    const style = arrowOperator.getArrowStyle();
    style.setStrokeWidth(parseInt(arrowStrokeWidth.value, 10));
  };
  const arrowStrokeColor = document.getElementById("arrowStrokeColor");
  arrowStrokeColor.onchange = () => {
    const style = arrowOperator.getArrowStyle();
    style.setStrokeColor(hexToRgb(arrowStrokeColor.value));
  };
  const arrowEndcapsInverted = document.getElementById("arrowEndcapsInverted");
  arrowEndcapsInverted.onchange = () => {
    const style = arrowOperator.getArrowStyle();
    style.setEndcapsInverted(arrowEndcapsInverted.checked);
  };
}
class TextBoxOperator {
  constructor(viewer) {
    this._textBoxIds = [];
    this._textBoxStyle = new TextBox();
    this._currentTextBox = null;
    this._defaultText = "HOOPS Visualize Web";
    this._viewer = viewer;
  }
  onMouseDown(event) {
    if (event.shiftDown()) {
      this._currentTextBox = new TextBoxMarkupItem(
        this._viewer,
        this._textBoxStyle,
        this._defaultText,
        event.getPosition()
      );
      const markupId = this._viewer.markupManager.registerMarkup(
        this._currentTextBox,
        this._viewer.view
      );
      this._textBoxIds.push(markupId);
      event.setHandled(true);
    }
  }
  onMouseMove(event) {
    if (this._currentTextBox) {
      this._currentTextBox.update(event.getPosition());
      this._viewer.markupManager.refreshMarkup(this._viewer.view);
    }
  }
  onMouseUp(_event) {
    this._currentTextBox = null;
  }
  onDeactivate() {
    const markup = this._viewer.markupManager;
    for (let i = 0; i < this._textBoxIds.length; i++) {
      markup.unregisterMarkup(this._textBoxIds[i], this._viewer.view);
    }
    this._textBoxIds = [];
  }
  onMousewheel(_event) {
  }
  onTouchStart(_event) {
  }
  onTouchMove(_event) {
  }
  onTouchEnd(_event) {
  }
  onKeyDown(_event) {
  }
  onKeyUp(_event) {
  }
  onActivate() {
  }
  onViewOrientationChange() {
  }
  stopInteraction() {
  }
  setDefaultText(defaultText) {
    this._defaultText = defaultText;
  }
  getStyle() {
    return this._textBoxStyle;
  }
}
class TextBoxMarkupItem extends MarkupItem {
  constructor(viewer, style, text, position) {
    super();
    this._textBox = new TextBox();
    this._viewer = viewer;
    this._textBox._assign(style);
    this._textBox.setTextString(text);
    this._textBox.setPosition(position);
  }
  draw() {
    this._viewer.markupManager.getRenderer().drawTextBox(this._textBox);
  }
  update(point) {
    this._textBox.setPosition(point);
  }
}
function bindTextBoxOperatorEvents(operator) {
  const textBoxDefaultText = document.getElementById("textBoxDefaultText");
  textBoxDefaultText.onchange = () => {
    operator.setDefaultText(textBoxDefaultText.value);
  };
  const textBoxTextColor = document.getElementById("textBoxTextColor");
  textBoxTextColor.onchange = () => {
    operator.getStyle().getTextPortion().setFillColor(hexToRgb(textBoxTextColor.value));
  };
  const textBoxTextSize = document.getElementById("textBoxTextSize");
  textBoxTextSize.onchange = () => {
    operator.getStyle().getTextPortion().setFontSize(parseInt(textBoxTextSize.value, 10));
  };
  const textBoxBackgroundOpacity = document.getElementById(
    "textBoxBackgroundOpacity"
  );
  textBoxBackgroundOpacity.onchange = () => {
    operator.getStyle().getBoxPortion().setFillOpacity(parseFloat(textBoxBackgroundOpacity.value));
  };
  const textBoxBackgroundColor = document.getElementById(
    "textBoxBackgroundColor"
  );
  textBoxBackgroundColor.onchange = () => {
    operator.getStyle().getBoxPortion().setFillColor(hexToRgb(textBoxBackgroundColor.value));
  };
  const textBoxBorderWidth = document.getElementById("textBoxBorderWidth");
  textBoxBorderWidth.onchange = () => {
    operator.getStyle().getBoxPortion().setStrokeWidth(parseInt(textBoxBorderWidth.value, 10));
  };
  const textBoxPadding = document.getElementById("textBoxPadding");
  textBoxPadding.onchange = () => {
    operator.getStyle().setPadding(parseInt(textBoxPadding.value, 10));
  };
  const textBoxBorderRadius = document.getElementById("textBoxBorderRadius");
  textBoxBorderRadius.onchange = () => {
    operator.getStyle().getBoxPortion().setBorderRadius(parseInt(textBoxBorderRadius.value, 10));
  };
}
class MarkupShapesExample {
  constructor() {
    this._operators = {};
  }
  start(viewerOptions) {
    createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._initEvents();
      this._initOperators();
      this._viewer.operatorManager.set(this._currentOperator.id, 1);
      this._viewer.start();
    });
  }
  _initOperators() {
    const arrowOperator = new ArrowOperator(this._viewer);
    let operatorName = "ArrowOperator";
    let operatorId = this._viewer.registerCustomOperator(arrowOperator);
    bindArrowOperatorEvents(arrowOperator);
    this._operators[operatorName] = new OperatorInfo(operatorName, operatorId, arrowOperator);
    this._currentOperator = this._operators[operatorName];
    const textBoxOperator = new TextBoxOperator(this._viewer);
    operatorName = "TextBoxOperator";
    operatorId = this._viewer.registerCustomOperator(textBoxOperator);
    bindTextBoxOperatorEvents(textBoxOperator);
    this._operators[operatorName] = new OperatorInfo(operatorName, operatorId, textBoxOperator);
  }
  _initEvents() {
    const customOperatorSelect = document.getElementById(
      "customOperatorSelect"
    );
    customOperatorSelect.onclick = () => {
      this._onOperatorSelectChange();
    };
  }
  _onOperatorSelectChange() {
    let operatorOptionsId = `${this._currentOperator.name}Options`;
    document.getElementById(operatorOptionsId).style.display = "none";
    const customOperatorSelect = document.getElementById(
      "customOperatorSelect"
    );
    const newOperatorName = customOperatorSelect.value;
    this._currentOperator = this._operators[newOperatorName];
    this._viewer.operatorManager.set(this._currentOperator.id, 1);
    operatorOptionsId = `${this._currentOperator.name}Options`;
    document.getElementById(operatorOptionsId).style.display = "block";
  }
}
window.onload = function() {
  const markupShapesExample = new MarkupShapesExample();
  markupShapesExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
