import { MarkupManager, Uuid } from '@ts3d-hoops/web-viewer';
import { IRedlineService, RedlineItemData, RedlineViewData } from './types';
export default class RedlineService extends EventTarget implements IRedlineService {
    readonly serviceName: "RedlineService";
    private _markupManager?;
    private callbackMap;
    constructor(markupManager?: MarkupManager);
    private redlineCreated;
    private redlineDeleted;
    private viewDeleted;
    private bind;
    private unbind;
    get markupManager(): MarkupManager | undefined;
    set markupManager(value: MarkupManager | undefined);
    reset(): void;
    getRedlineViewKeys(): Uuid[];
    getRedlineViews(): RedlineViewData[];
    getRedlineView(uniqueId: Uuid): RedlineViewData | undefined;
    getActiveViewKey(): Uuid | undefined;
    setActiveView(uniqueId: Uuid): Promise<boolean>;
    getActiveView(): RedlineViewData | undefined;
    removeRedlineItem(viewId: Uuid, item: RedlineItemData): Promise<void>;
    removeRedlineView(uniqueId: Uuid): void;
}
