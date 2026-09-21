import { Operators } from '@ts3d-hoops/web-viewer';
import { IResettableConfigurationService, IService } from '../types';
type MeasureMarkup = Operators.Markup.Measure.MeasureMarkup;
export type MeasurementServiceConfiguration = {
    color: string;
};
export declare function isMeasurementServiceConfiguration(obj: unknown): obj is MeasurementServiceConfiguration;
export interface IMeasurementService extends IService, IResettableConfigurationService {
    measurements: MeasureMarkup[];
    removeMeasurement(measurement: MeasureMarkup): void;
    getMeasurementColor(): string;
    setMeasurementColor(color: string): void;
    resetConfiguration(obj?: object): Promise<void>;
}
export {};
