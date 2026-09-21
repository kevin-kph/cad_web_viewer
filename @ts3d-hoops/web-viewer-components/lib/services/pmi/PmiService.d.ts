import { core, NodeId } from '@ts3d-hoops/web-viewer';
import { IPmiService } from './types';
export default class PmiService extends EventTarget implements IPmiService {
    readonly serviceName: "PmiService";
    private _viewer?;
    private callbackMap;
    static readonly DefaultConfig: {
        color: string;
        isColorOverride: boolean;
    };
    private unbind;
    private bind;
    resetConfiguration(obj?: object): Promise<void>;
    private reset;
    constructor();
    get viewer(): core.IWebViewer | undefined;
    set viewer(viewer: core.IWebViewer | undefined);
    getPmiColor(): string;
    setPmiColor(color: string): void;
    getPmiColorOverride(): boolean;
    setPmiColorOverride(enableOverride: boolean, rootId?: NodeId): Promise<void>;
}
