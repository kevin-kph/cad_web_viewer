import { AttachScope } from '@ts3d-hoops/streamcache';
export interface InitOptions {
    enginePath?: string;
    engineReady: (sessionStartedPromise: Promise<void>) => void;
    priorityMetaDataSent: (attachScope: AttachScope, prototypeInstanceCount: number) => void;
    renderComplete: () => void;
    sceneReady: () => void;
    streamingActivated: () => void;
    streamingDeactivated: () => void;
}
