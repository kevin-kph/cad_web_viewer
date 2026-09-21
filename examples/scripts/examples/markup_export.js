import { ai as MarkupTypeManager, U as createUuid } from "../WebViewer.js";
/* empty css        */
import { c as createViewer } from "../index.js";
class CustomNote {
  constructor(text, nodeId) {
    this._text = "";
    this._date = /* @__PURE__ */ new Date();
    this._uniqueId = createUuid();
    this._text = text;
    this._nodeId = nodeId;
  }
  getText() {
    return this._text;
  }
  getDate() {
    return this._date;
  }
  setDate(date) {
    this._date = date;
  }
  getNodeId() {
    return this._nodeId;
  }
  getUniqueId() {
    return this._uniqueId;
  }
  setUniqueId(uniqueId) {
    this._uniqueId = uniqueId;
  }
  static construct(text, nodeId, date, uniqueId) {
    const customNote = new CustomNote(text, nodeId);
    customNote.setDate(date);
    customNote.setUniqueId(uniqueId);
    return customNote;
  }
}
class CustomMarkupManager extends MarkupTypeManager {
  constructor() {
    super(...arguments);
    this._customNotes = /* @__PURE__ */ new Map();
  }
  createNote(text, nodeId) {
    const customNote = new CustomNote(text, nodeId);
    const id = customNote.getUniqueId();
    this._customNotes.set(id, customNote);
    return id;
  }
  getNote(uuid) {
    return this._customNotes.get(uuid) || null;
  }
  getNotes() {
    return this._customNotes;
  }
  exportMarkup() {
    const markup = [];
    this._customNotes.forEach((note) => {
      markup.push({
        text: note.getText(),
        date: note.getDate().toJSON(),
        nodeId: note.getNodeId(),
        uniqueId: note.getUniqueId()
      });
    });
    return markup;
  }
  loadData(jsonData) {
    const ps = [];
    jsonData.forEach((jsonNote) => {
      const date = jsonNote["date"] ? new Date(jsonNote.date) : null;
      const nodeId = jsonNote["nodeId"] ? parseInt(jsonNote.nodeId, 10) : null;
      const text = jsonNote["text"] ? jsonNote.text : null;
      const uniqueId = jsonNote["uniqueId"] ? jsonNote.uniqueId : null;
      if (date && nodeId && text && uniqueId && this._customNotes.get(uniqueId) === void 0) {
        const customNote = CustomNote.construct(text, nodeId, date, uniqueId);
        this._customNotes.set(uniqueId, customNote);
        ps.push(Promise.resolve(true));
      } else {
        ps.push(Promise.resolve(false));
      }
    });
    return Promise.all(ps);
  }
}
class MarkupExportExample {
  start(viewerOptions) {
    return createViewer(viewerOptions).then((viewer) => {
      this._viewer = viewer;
      this._viewer.start();
      this._customMarkupManager = new CustomMarkupManager();
      this._initEvents();
    });
  }
  _initEvents() {
    this._viewer.markupManager.registerMarkupTypeManager("customNote", this._customMarkupManager);
    let element = document.getElementById("importButton");
    element.onclick = () => {
      const markupData = document.getElementById("importData").value;
      this._viewer.markupManager.loadMarkupData(markupData).then(() => {
        this._clearNotes();
        this._customMarkupManager.getNotes().forEach((note, guid) => {
          this._addNote(note, guid);
        });
      });
    };
    element = document.getElementById("exportButton");
    element.onclick = () => {
      const markupData = JSON.stringify(this._viewer.markupManager.exportMarkup());
      document.getElementById("exportData").textContent = markupData;
    };
    element = document.getElementById("addNoteButton");
    element.onclick = () => {
      const noteText = document.getElementById("noteText");
      const selectionItem = this._viewer.selectionManager.getResult(0);
      if (selectionItem !== null && noteText.value !== "") {
        const noteGuid = this._customMarkupManager.createNote(
          noteText.value,
          selectionItem.getNodeId()
        );
        this._addNoteById(noteGuid);
        noteText.value = "";
      }
    };
    element = document.getElementById("clearNotes");
    element.onclick = () => {
      this._customMarkupManager.getNotes().clear();
      this._clearNotes();
    };
  }
  _addNoteById(uuid) {
    const note = this._customMarkupManager.getNote(uuid);
    if (note === null) {
      return;
    }
    this._addNote(note, uuid);
  }
  _addNote(note, uuid) {
    const dateElement = document.createElement("div");
    dateElement.innerHTML = `<b>Date: </b>${note.getDate().toLocaleString()}`;
    const textElement = document.createElement("div");
    textElement.innerHTML = `<b>Text: </b>${note.getText()}`;
    const nodeIdElement = document.createElement("div");
    nodeIdElement.innerHTML = `<b>NodeId: </b>${note.getNodeId()}`;
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.id = uuid;
    noteElement.appendChild(dateElement);
    noteElement.appendChild(nodeIdElement);
    noteElement.appendChild(textElement);
    noteElement.onclick = () => {
      this._viewer.selectionManager.selectNode(note.getNodeId());
      const notes = document.getElementsByClassName("note");
      for (let i = 0; i < notes.length; ++i) {
        notes[i].classList.remove("selected");
      }
      noteElement.classList.add("selected");
    };
    document.getElementById("notes").appendChild(noteElement);
  }
  _clearNotes() {
    document.getElementById("notes").innerHTML = "";
  }
}
window.onload = function() {
  const markupExportExample = new MarkupExportExample();
  markupExportExample.start({
    containerId: "viewerContainer",
    model: "microengine"
  });
};
