import { IResettableConfigurationService, IService } from '../types';
export type SheetServiceConfiguration = {
    backgroundColor: string;
    sheetColor: string;
    sheetShadowColor: string;
    backgroundSheetEnabled: boolean;
};
export declare function isSheetServiceConfiguration(obj: unknown): obj is SheetServiceConfiguration;
export interface ISheetService extends IService, IResettableConfigurationService {
    getSheetBackgroundColor(): string;
    getSheetColor(): string;
    getSheetShadowColor(): string;
    setSheetColors(backgroundColor: string, sheetColor: string, sheetShadowColor: string): Promise<void>;
    getBackgroundSheetEnabled(): boolean;
    setBackgroundSheetEnabled(enabled: boolean): Promise<void>;
    resetConfiguration(obj?: object): Promise<void>;
}
