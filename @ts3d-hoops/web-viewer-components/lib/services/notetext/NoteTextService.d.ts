import { Operators, Uuid } from '@ts3d-hoops/web-viewer';
import { INoteTextService, NoteTextItemData } from './types';
export default class NoteTextService extends EventTarget implements INoteTextService {
    readonly serviceName: "NoteTextService";
    private _noteTextManager?;
    private callbackMap;
    constructor(noteTextManager?: Operators.NoteTextManager);
    getNoteTexts(): NoteTextItemData[];
    getNoteText(uniqueId: Uuid): NoteTextItemData | undefined;
    getNoteTextKeys(): Uuid[];
    /**
     * Returns the unique IDs of all note text annotations that are currently visible in the model.
     * A note is considered visible if either its sphere or stem instance node is visible.
     * @throws {Error} If the NoteTextManager is not initialized.
     */
    getVisibleNoteTextKeys(): Uuid[];
    /**
     * Sets the visibility of the note text annotations identified by the given unique IDs.
     * When hiding a note, if it is the currently active note, its UI is also hidden.
     * @param uniqueIds - The unique IDs of the note texts to show or hide.
     * @param visible - Whether to make the note texts visible (`true`) or hidden (`false`).
     * @throws {Error} If the NoteTextManager is not initialized.
     */
    setNoteTextsVisibility(uniqueIds: Uuid[], visible: boolean): Promise<void>;
    setActiveNoteText(id: Uuid): Promise<boolean>;
    getActiveNoteTextKey(): Uuid | undefined;
    getActiveNoteText(): NoteTextItemData | undefined;
    removeNoteText(item: NoteTextItemData): Promise<void>;
    private noteTextCreated;
    private noteTextDeleted;
    private noteTextUpdated;
    private noteTextHidden;
    private noteTextShown;
    private bind;
    private unbind;
    get noteTextManager(): Operators.NoteTextManager | undefined;
    set noteTextManager(value: Operators.NoteTextManager | undefined);
    reset(): void;
}
