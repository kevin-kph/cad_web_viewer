import { Instance } from './Instance';
export * from './Camera';
export * from './entities';
export * from './images';
export * from './Instance';
export * from './keys';
export * from './lights';
export * from './LoadConfig';
export * from './maths';
export * from './meshdata';
export * from './MeshInstanceInterface';
export * from './misc';
export * from './overlays';
export * from './selections';
export * from './SsrQualityConfig';
export * from './SvgConfig';
export interface StartArgs {
    container: string | HTMLElement;
    onReady: (sc: Partial<Instance>) => void;
    onError: (message: string) => void;
    enginePath?: string;
}
