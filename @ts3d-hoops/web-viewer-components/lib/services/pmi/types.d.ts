import { NodeId } from '@ts3d-hoops/web-viewer';
import { IResettableConfigurationService, IService } from '../types';
export type PmiServiceConfiguration = {
    color: string;
    isColorOverride: boolean;
};
export declare function isPmiServiceConfiguration(obj: unknown): obj is PmiServiceConfiguration;
export interface IPmiService extends IService, IResettableConfigurationService {
    getPmiColor(): string;
    setPmiColor(color: string): void;
    getPmiColorOverride(): boolean;
    setPmiColorOverride(enableOverride: boolean, rootId?: NodeId): Promise<void>;
    resetConfiguration(obj?: object): Promise<void>;
}
