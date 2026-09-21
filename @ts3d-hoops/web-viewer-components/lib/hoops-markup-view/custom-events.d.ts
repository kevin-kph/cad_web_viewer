import { Uuid } from '@ts3d-hoops/web-viewer';
import { RedlineItemData } from '../services';
export type DeleteMarkupViewEvent = CustomEvent<{
  markupViewId: Uuid;
  markupItem: RedlineItemData;
}>;

declare global {
  interface CustomEventMap {
    'hoops-delete-markup': DeleteMarkupViewEvent;
  }
}

export {};
