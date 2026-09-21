import { MarkupTypeManager } from '../../../MarkupTypeManager';
import { NoteTextElement } from './NoteTextElement';
import { NoteText } from './NoteText';
import { MeshId, NodeId, Uuid } from '../../../types';
import { SelectionItem } from '../../../selection/SelectionItem';
import { IWebViewer } from '../../../core/IWebViewer';
export declare class NoteTextManager extends MarkupTypeManager {
    private static _globalPinSphereMeshData;
    private static _globalPinStemMeshData;
    private _pinSphereMeshId;
    private _pinStemMeshId;
    private _viewer;
    private _noteTextElement;
    private _noteTextList;
    private _activeItemHandle;
    private _activeItem;
    private _explodeActive;
    private _isolateActive;
    private _stemLength;
    private _sphereIterations;
    constructor(viewer: IWebViewer);
    get viewer(): IWebViewer;
    private _init;
    private _createPinStemMeshData;
    private _createPinSphereMeshData;
    /**
     * Retrieves the mesh id of the stem of the note pin, if there is one
     * @returns MeshId of the note pin stem, or null if there is none
     */
    getPinStemMeshId(): MeshId | null;
    /**
     * Retrieves the mesh id of the spherical head of the note pin, if there is one
     * @returns MeshId of the note pin sphere, or null if there is none
     */
    getPinSphereMeshId(): MeshId | null;
    /**
     * Retrieves the note text element
     * @returns note text element
     */
    getNoteTextElement(): NoteTextElement;
    /**
     * Sets the note text element
     * @param noteTextElement
     */
    setNoteTextElement(noteTextElement: NoteTextElement): void;
    /**
     * Gets an array of all NoteText items that have been added to the manager
     * @returns array of all NoteText items
     */
    getNoteTextList(): NoteText[];
    /**
     * Adds a note and makes it active
     * @param note NoteText to be added to the manager
     */
    addNote(note: NoteText): void;
    /**
     * Removes a note from the manager
     * @param note NoteText to be removed from the manager
     */
    removeNote(note: NoteText): void;
    /**
     * Updates note pin visibility based on manager state (namely the current explode state)
     */
    updatePinVisibility(): Promise<void>;
    /**
     * Sets manager explode state based on explosion magnitude. Active explosion hides note pins
     * @param magnitude Explosion magnitude
     */
    explode(magnitude: number): Promise<void>;
    /**
     * Gets managers explosion state. Active explosion hides note pins
     */
    getExplodeActive(): boolean;
    /**
     * Sets whether an isolate is currently active or not
     * @param isolateActive
     */
    setIsolateActive(isolateActive: boolean): void;
    /**
     * Gets whether an isolate is currently active or not
     * @returns isolate status
     */
    getIsolateActive(): boolean;
    /**
     * Get the currently active note text
     * @returns Currently active note text
     */
    getActiveItem(): NoteText | null;
    /**
     * Sets a new currently active note text
     * @param activeItem note text to be marked as currently active
     */
    setActiveItem(activeItem: NoteText | null): void;
    /**
     * Get the active handle string, such as the one returned by [[MarkupManager.registerMarkup]]
     * @returns Active handle string
     */
    getActiveItemHandle(): string | null;
    /**
     * Set the active handle string, should be provided by [[MarkupManager.registerMarkup]]
     * @param activeItemHandle Active handle string
     */
    setActiveItemHandle(activeItemHandle: string | null): void;
    /**
     * Attempts to set the active note to the one associated with the
     * pins elected by the provided [[SelectionItem]]
     * @param selection SelectionItem to attempt to find note from
     */
    selectPin(selection: SelectionItem): boolean;
    /**
     * Checks if a nodeId is part of a note pin
     * @param nodeId NodeId to be checked
     */
    checkPinInstance(nodeId: NodeId): boolean;
    private _getNoteTextFromNodeId;
    /**
     * Checks if a UUID is associated with any existing notes
     * @param id UUID to check
     */
    findById(id: Uuid): boolean;
    /**
     * Loads notes from an iterable of JSON data like that returned by [[exportMarkup]]
     * @param notes JSON note data iterable
     */
    loadData(notes: any): Promise<boolean[]>;
    /**
     * Exports note texts to an array of JSON Objects that can be restored via [[loadData]]
     * @returns Array of JSON objects representing notes
     */
    exportMarkup(): object[];
}
