import { formatNoteTextItem as i } from "./utils.js";
class T extends EventTarget {
  constructor(e) {
    super(), this.serviceName = "NoteTextService", this._noteTextManager = e, this.noteTextCreated = this.noteTextCreated.bind(this), this.noteTextDeleted = this.noteTextDeleted.bind(this), this.noteTextUpdated = this.noteTextUpdated.bind(this), this.noteTextHidden = this.noteTextHidden.bind(this), this.noteTextShown = this.noteTextShown.bind(this), this.callbackMap = {
      noteTextCreated: this.noteTextCreated,
      noteTextDeleted: this.noteTextDeleted,
      noteTextUpdated: this.noteTextUpdated,
      noteTextHidden: this.noteTextHidden,
      noteTextShown: this.noteTextShown
    }, this._noteTextManager && this.bind();
  }
  getNoteTexts() {
    if (!this._noteTextManager)
      throw new Error("Cannot get note texts: NoteTextManager not initialized");
    return this._noteTextManager.getNoteTextList().map(i);
  }
  getNoteText(e) {
    if (!this._noteTextManager)
      throw new Error("Cannot get note text: NoteTextManager not initialized");
    const t = this._noteTextManager.getNoteTextList().find((n) => n.uniqueId === e);
    return t ? i(t) : void 0;
  }
  getNoteTextKeys() {
    if (!this._noteTextManager)
      throw new Error("Cannot get note text keys: NoteTextManager not initialized");
    return this._noteTextManager.getNoteTextList().map((e) => e.uniqueId);
  }
  /**
   * Returns the unique IDs of all note text annotations that are currently visible in the model.
   * A note is considered visible if either its sphere or stem instance node is visible.
   * @throws {Error} If the NoteTextManager is not initialized.
   */
  getVisibleNoteTextKeys() {
    if (!this._noteTextManager)
      throw new Error("Cannot get visible note text keys: NoteTextManager not initialized");
    const e = this._noteTextManager.viewer.model;
    return this._noteTextManager.getNoteTextList().filter((t) => {
      const n = t.getSphereInstanceId(), o = t.getStemInstanceId(), r = n !== void 0 && e.getNodeVisibility(n), s = o !== void 0 && e.getNodeVisibility(o);
      return r || s;
    }).map((t) => t.uniqueId);
  }
  /**
   * Sets the visibility of the note text annotations identified by the given unique IDs.
   * When hiding a note, if it is the currently active note, its UI is also hidden.
   * @param uniqueIds - The unique IDs of the note texts to show or hide.
   * @param visible - Whether to make the note texts visible (`true`) or hidden (`false`).
   * @throws {Error} If the NoteTextManager is not initialized.
   */
  async setNoteTextsVisibility(e, t) {
    var r;
    if (!this._noteTextManager)
      throw new Error("Cannot set note text visibility: NoteTextManager not initialized");
    const n = new Set(e), o = [];
    for (const s of this._noteTextManager.getNoteTextList().filter((a) => n.has(a.uniqueId))) {
      const a = s.getSphereInstanceId(), d = s.getStemInstanceId();
      a !== void 0 && o.push(a), d !== void 0 && o.push(d), !t && ((r = this._noteTextManager.getActiveItem()) == null ? void 0 : r.uniqueId) === s.uniqueId && s.hide();
    }
    o.length !== 0 && await this._noteTextManager.viewer.model.setNodesVisibility([...new Set(o)], t);
  }
  async setActiveNoteText(e) {
    if (!this._noteTextManager)
      throw new Error("Cannot select note text: NoteTextManager not initialized");
    const t = this._noteTextManager.getNoteTextList().find((n) => n.uniqueId === e);
    return t ? (await t.restore(), this._noteTextManager.viewer.markupManager.selectMarkup(t, this._noteTextManager.viewer.view), !0) : (console.error(`Note text with id ${e} not found`), !1);
  }
  getActiveNoteTextKey() {
    var e;
    if (!this._noteTextManager) {
      console.error("Cannot get selected note text: NoteTextManager not initialized");
      return;
    }
    return (e = this._noteTextManager.getActiveItem()) == null ? void 0 : e.uniqueId;
  }
  getActiveNoteText() {
    if (!this._noteTextManager) {
      console.error("Cannot get selected note text: NoteTextManager not initialized");
      return;
    }
    const e = this._noteTextManager.getActiveItem();
    return e ? i(e) : void 0;
  }
  async removeNoteText(e) {
    var n;
    if (!this._noteTextManager)
      throw new Error("Cannot remove note text: NoteTextManager not initialized");
    const t = this._noteTextManager.getNoteTextList().find((o) => o.uniqueId === e.id);
    if (!t) {
      console.error(`Note text with id ${e.id} not found`);
      return;
    }
    return t.remove(((n = this.noteTextManager) == null ? void 0 : n.viewer.view) ?? null);
  }
  noteTextCreated(e) {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-created", {
        detail: i(e),
        bubbles: !0,
        composed: !0
      })
    );
  }
  noteTextDeleted(e) {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-deleted", {
        detail: i(e),
        bubbles: !0,
        composed: !0
      })
    );
  }
  noteTextUpdated(e) {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-updated", {
        detail: i(e),
        bubbles: !0,
        composed: !0
      })
    );
  }
  noteTextHidden(e) {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-hidden", {
        detail: i(e),
        bubbles: !0,
        composed: !0
      })
    );
  }
  noteTextShown(e) {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-shown", {
        detail: i(e),
        bubbles: !0,
        composed: !0
      })
    );
  }
  bind() {
    if (!this._noteTextManager)
      throw new Error("NoteTextManager is not set");
    this._noteTextManager.viewer.setCallbacks(this.callbackMap);
  }
  unbind() {
    if (!this._noteTextManager)
      throw new Error("NoteTextManager is not set");
    this._noteTextManager.viewer.unsetCallbacks(this.callbackMap);
  }
  get noteTextManager() {
    return this._noteTextManager;
  }
  set noteTextManager(e) {
    this._noteTextManager !== e && (this._noteTextManager && this.unbind(), this._noteTextManager = e, this.bind(), this.dispatchEvent(
      new CustomEvent("hoops-note-text-manager-reset", { bubbles: !0, composed: !0 })
    ));
  }
  reset() {
    this.dispatchEvent(
      new CustomEvent("hoops-note-text-manager-reset", { bubbles: !0, composed: !0 })
    );
  }
}
export {
  T as default
};
