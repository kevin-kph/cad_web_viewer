import { core } from '@ts3d-hoops/web-viewer';
import { ISelectionService } from './types';
export default class SelectionService extends EventTarget implements ISelectionService {
    readonly serviceName: "SelectionService";
    static readonly DefaultConfiguration: {
        faceLineSelectionEnabled: boolean;
        honorsSceneVisibility: boolean;
        bodyColor: string;
        faceAndLineColor: string;
    };
    private _webviewer?;
    get webViewer(): core.IWebViewer | undefined;
    set webViewer(value: core.IWebViewer | undefined);
    getEnableFaceLineSelection(): boolean;
    setEnableFaceLineSelection(enableFaceLineSelection: boolean): Promise<void>;
    getHonorsSceneVisibility(): boolean;
    setHonorsSceneVisibility(honorsSceneVisibility: boolean): void;
    getBodyColor(): string;
    setBodyColor(color: string): Promise<void>;
    getFaceAndLineColor(): string;
    setFaceAndLineColor(color: string): Promise<void>;
    resetConfiguration(obj?: object): Promise<void>;
}
