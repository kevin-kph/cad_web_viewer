import { al as NodeDrawModeNames } from "../WebViewer.js";
/* empty css        */
import { M as MultiViewExample } from "../multiView.js";
class MultiViewDrawModeOverrideExample extends MultiViewExample {
  constructor() {
    super(...arguments);
    this._cycleView0Button = void 0;
    this._cycleView1Button = void 0;
    this._currentDrawModes = /* @__PURE__ */ new Map([
      [0, NodeDrawModeNames[0]],
      [1, NodeDrawModeNames[0]]
    ]);
  }
  async start() {
    this._bindEvents();
    this._viewer.setCallbacks({
      selectionArray: () => this._onSelectionChanged(),
      modelStructureReady: async () => {
        await this._createSecondView();
      }
    });
    this._viewer.start();
  }
  async _createSecondView() {
    const viewElem = document.getElementById("view-1");
    if (viewElem) {
      await this._viewer.addView({ container: viewElem });
    }
  }
  _bindEvents() {
    this._cycleView0Button = document.getElementById("cycle-draw-mode-view-0");
    this._cycleView1Button = document.getElementById("cycle-draw-mode-view-1");
    if (this._cycleView0Button) {
      this._cycleView0Button.onclick = () => this._cycleDrawMode(0);
      this._cycleView0Button.disabled = true;
    }
    if (this._cycleView1Button) {
      this._cycleView1Button.onclick = () => this._cycleDrawMode(1);
      this._cycleView1Button.disabled = true;
    }
  }
  _onSelectionChanged() {
    const hasSelection = this._viewer.selectionManager.getResults().length > 0;
    if (this._cycleView0Button) {
      this._cycleView0Button.disabled = !hasSelection;
    }
    if (this._cycleView1Button) {
      this._cycleView1Button.disabled = !hasSelection;
    }
  }
  _cycleDrawMode(viewId) {
    const currentMode = this._currentDrawModes.get(viewId) ?? NodeDrawModeNames[0];
    const currentIndex = NodeDrawModeNames.indexOf(currentMode);
    const nextMode = NodeDrawModeNames[(currentIndex + 1) % NodeDrawModeNames.length];
    this._currentDrawModes.set(viewId, nextMode);
    const selectionResults = this._viewer.selectionManager.getResults();
    const nodesDrawModes = {};
    for (const result of selectionResults) {
      nodesDrawModes[result.getNodeId()] = nextMode;
    }
    if (Object.keys(nodesDrawModes).length > 0) {
      this._viewer.model.setNodesDrawModes(nodesDrawModes, [viewId]);
    }
  }
}
const multiViewDrawModeOverrideExample = new MultiViewDrawModeOverrideExample();
window.onload = function() {
  multiViewDrawModeOverrideExample.start();
};
