import { core } from '@ts3d-hoops/web-viewer';
import { IViewService } from './types';
export declare class ViewService extends EventTarget implements IViewService {
    readonly serviceName: "ViewService";
    private _view?;
    static readonly DefaultConfiguration: {
        axisTriadVisible: boolean;
        navCubeVisible: boolean;
    };
    constructor(view?: core.IView);
    get view(): core.IView | undefined;
    set view(view: core.IView | undefined);
    isAxisTriadVisible(): boolean;
    setAxisTriadVisible(visible: boolean): void;
    isNavCubeVisible(): boolean;
    setNavCubeVisible(visible: boolean): void;
    reset(): void;
    resetConfiguration(obj?: object): Promise<void>;
}
export default ViewService;
