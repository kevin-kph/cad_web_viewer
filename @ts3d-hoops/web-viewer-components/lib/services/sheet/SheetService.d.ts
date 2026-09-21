import { SheetManager } from '@ts3d-hoops/web-viewer';
import { ISheetService, SheetServiceConfiguration } from './types';
export default class SheetService extends EventTarget implements ISheetService {
    readonly serviceName: "SheetService";
    private _sheetManager?;
    static readonly DefaultConfiguration: SheetServiceConfiguration;
    get sheetManager(): SheetManager | undefined;
    set sheetManager(sheetManager: SheetManager | undefined);
    getSheetBackgroundColor(): string;
    getSheetColor(): string;
    getSheetShadowColor(): string;
    setSheetColors(backgroundColor: string, sheetColor: string, sheetShadowColor: string): Promise<void>;
    getBackgroundSheetEnabled(): boolean;
    setBackgroundSheetEnabled(enabled: boolean): Promise<void>;
    resetConfiguration(obj?: object): Promise<void>;
}
