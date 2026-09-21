import { core, IMaterial } from '@ts3d-hoops/web-viewer';
import { MeshDescription, IMaterialService } from './types';
import { SetShaderOptions } from '../../../../../streamcache/src/index.ts';
export declare class MaterialService extends EventTarget implements IMaterialService {
    readonly serviceName: "MaterialService";
    private _viewer?;
    private selectedNodeIds;
    /** Callback map for HOOPS Web Viewer events. */
    private callbackMap;
    constructor(viewer?: core.IWebViewer);
    private bind;
    private unbind;
    get viewer(): core.IWebViewer | undefined;
    set viewer(viewer: core.IWebViewer | undefined);
    getSelectedNodeIds(): number[];
    getMeshDescription(nodeId: number): Promise<MeshDescription | undefined>;
    getMaterialDescription(nodeId: number): Promise<IMaterial | undefined>;
    setNodesShader(nodeIds: number[], vertexShader: string, fragmentShader: string, options?: SetShaderOptions): Promise<void>;
}
export default MaterialService;
