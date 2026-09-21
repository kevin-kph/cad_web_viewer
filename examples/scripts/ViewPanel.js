class ViewPanel {
  constructor(elementId, viewer) {
    this._elementId = elementId;
    this._viewer = viewer;
    const containerElement = document.getElementById(this._elementId);
    const heading = document.createElement("div");
    heading.classList.add("example-div-block");
    heading.innerHTML = "Markup Views:";
    containerElement.appendChild(heading);
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("example-div-block");
    const activateButton = document.createElement("button");
    activateButton.innerHTML = "Activate Selected";
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete Selected";
    containerElement.appendChild(buttonDiv);
    buttonDiv.appendChild(activateButton);
    buttonDiv.appendChild(deleteButton);
    activateButton.onclick = () => {
      this._activateSelectedView();
    };
    deleteButton.onclick = () => {
      this._deleteSelectedView();
    };
    this._viewSelect = document.createElement("select");
    this._viewSelect.size = 7;
    this._viewSelect.classList.add("example-panel-select-box");
    containerElement.appendChild(this._viewSelect);
    this._viewer.setCallbacks({
      viewCreated: (view) => {
        this._onViewAdded(view);
      },
      viewLoaded: (view) => {
        this._onViewAdded(view);
      },
      viewDeleted: (view) => {
        this._onViewDeleted(view);
      }
    });
  }
  _activateSelectedView() {
    const selectedView = this.getSelectedViewUniqueId();
    if (selectedView)
      this._viewer.markupManager.activateMarkupViewWithPromise(selectedView, this._viewer.view);
  }
  _deleteSelectedView() {
    let currentChild = this._viewSelect.firstChild;
    while (currentChild) {
      if (currentChild.selected) {
        this._viewer.markupManager.deleteMarkupView(currentChild.value);
        return;
      }
      currentChild = currentChild.nextSibling;
    }
  }
  _onViewAdded(view) {
    const option = document.createElement("option");
    option.text = view.getName();
    option.value = view.getUniqueId();
    this._viewSelect.add(option);
  }
  _onViewDeleted(view) {
    let currentChild = this._viewSelect.firstChild;
    const uniqueId = view.getUniqueId();
    while (currentChild) {
      if (currentChild.value === uniqueId) {
        this._viewSelect.removeChild(currentChild);
        return;
      }
      currentChild = currentChild.nextSibling;
    }
  }
  getSelectedViewUniqueId() {
    let currentChild = this._viewSelect.firstChild;
    while (currentChild) {
      if (currentChild.selected) {
        return currentChild.value;
      }
      currentChild = currentChild.nextSibling;
    }
    return null;
  }
}
export {
  ViewPanel as V
};
