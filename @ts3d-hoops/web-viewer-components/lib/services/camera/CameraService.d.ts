import { core } from '@ts3d-hoops/web-viewer';
import { CameraServiceConfiguration, ICameraService, OrbitFallbackMode, Projection } from './types';
export default class CameraService extends EventTarget implements ICameraService {
    readonly serviceName: "CameraService";
    private _webViewer?;
    static readonly DefaultConfig: CameraServiceConfiguration;
    get webViewer(): core.IWebViewer | undefined;
    set webViewer(webViewer: core.IWebViewer | undefined);
    getProjectionMode(): Projection;
    setProjectionMode(projectionMode: Projection): void;
    getOrbitFallbackMode(): OrbitFallbackMode;
    setOrbitFallbackMode(fallbackMode: OrbitFallbackMode): void;
    resetConfiguration(obj?: object): Promise<void>;
    reset(): Promise<void>;
}
