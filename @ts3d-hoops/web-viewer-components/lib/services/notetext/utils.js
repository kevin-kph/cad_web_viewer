function e(t) {
  return {
    id: t.uniqueId,
    type: t.getClassName(),
    text: t.getText()
  };
}
function n(t) {
  switch (t) {
    case "Communicator.Markup.Note.NoteText":
      return "note";
    default:
      return console.warn(`Unknown note text class name: ${t}`), "undefined";
  }
}
export {
  n as formatNoteTextIcon,
  e as formatNoteTextItem
};
