import { IResettableConfigurationService, IService } from '../types';
export type ViewServiceConfiguration = {
    axisTriadVisible: boolean;
    navCubeVisible: boolean;
};
export declare function isViewServiceConfiguration(obj: unknown): obj is ViewServiceConfiguration;
export interface IViewService extends IService, IResettableConfigurationService {
    isAxisTriadVisible(): boolean;
    setAxisTriadVisible(visible: boolean): void;
    isNavCubeVisible(): boolean;
    setNavCubeVisible(visible: boolean): void;
    reset(): void;
}
