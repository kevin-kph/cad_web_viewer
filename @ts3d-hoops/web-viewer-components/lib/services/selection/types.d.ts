import { IResettableConfigurationService, IService } from '../types';
export type SelectionServiceConfiguration = {
    faceLineSelectionEnabled: boolean;
    honorsSceneVisibility: boolean;
    bodyColor: string;
    faceAndLineColor: string;
};
export declare function isSelectionServiceConfiguration(obj: unknown): obj is SelectionServiceConfiguration;
/**
 * @interface ISelectionService
 * @extends IService
 *
 * Service interface for managing selection feature of the web viewer.
 *
 * Provides methods to interface the selection manager.
 */
export interface ISelectionService extends IService, IResettableConfigurationService {
    getEnableFaceLineSelection(): boolean;
    setEnableFaceLineSelection(enableFaceLineSelection: boolean): Promise<void>;
    getHonorsSceneVisibility(): boolean;
    setHonorsSceneVisibility(honorsSceneVisibility: boolean): void;
    getBodyColor(): string;
    setBodyColor(color: string): Promise<void>;
    getFaceAndLineColor(): string;
    setFaceAndLineColor(color: string): Promise<void>;
    resetConfiguration(obj?: object): Promise<void>;
}
