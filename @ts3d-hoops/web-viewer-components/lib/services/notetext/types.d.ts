import { Uuid } from '@ts3d-hoops/web-viewer';
import { MarkupItemData } from '../markup';
import { IService } from '../types';
declare const NoteTextItemTypes: readonly ["Communicator.Markup.Note.NoteText"];
export type NoteTextItemType = (typeof NoteTextItemTypes)[number];
export interface NoteTextItemData extends MarkupItemData {
    type: NoteTextItemType | (string & {});
    text: string;
}
export interface INoteTextService extends IService {
    getNoteTexts(): NoteTextItemData[];
    getNoteText(uniqueId: Uuid): NoteTextItemData | undefined;
    getNoteTextKeys(): Uuid[];
    getVisibleNoteTextKeys(): Uuid[];
    setNoteTextsVisibility(uniqueIds: Uuid[], visible: boolean): Promise<void>;
    getActiveNoteTextKey(): Uuid | undefined;
    setActiveNoteText(uniqueId: Uuid): Promise<boolean>;
    getActiveNoteText(): NoteTextItemData | undefined;
    removeNoteText(item: NoteTextItemData): Promise<void>;
    reset(): void;
}
export {};
