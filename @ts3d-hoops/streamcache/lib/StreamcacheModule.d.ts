import { Instance, StartArgs, ViewKey } from './types.js';
type Facade = Partial<Instance> & Pick<Instance, 'containers' | 'wrappers'>;
export declare class StreamcacheModule {
    private static core_pool;
    static defaultEnginePath?: string;
    static defaultBinary: unknown;
    static createInstance(instanceArgs: StartArgs): Promise<Partial<Facade>>;
    private static catchExceptions;
    private static getElement;
    private static getAvailableCore;
    private static getWasmBinary;
    private static createRenderCanvas;
    private static createCore;
    private static getCore;
    private static getFacade;
    static setupNewView(facade: Facade, view_key: ViewKey, container: string | HTMLElement): void;
    private static createWrapper;
    private static createSubContainer;
    private static createScInstance;
    static get glContext(): WebGL2RenderingContext | null;
}
export {};
