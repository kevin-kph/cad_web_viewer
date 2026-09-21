import { MeasureManager, Operators } from '@ts3d-hoops/web-viewer';
import { IMeasurementService } from './types';
type MeasureMarkup = Operators.Markup.Measure.MeasureMarkup;
export default class MeasurementService extends EventTarget implements IMeasurementService {
    readonly serviceName: "MeasurementService";
    private _measureManager?;
    private callbackMap;
    static readonly DefaultConfig: {
        color: string;
    };
    constructor(measureManager?: MeasureManager);
    private callbackToEvent;
    private unbind;
    private bind;
    removeMeasurement(measurement: MeasureMarkup): void;
    get measurements(): MeasureMarkup[];
    get measureManager(): MeasureManager | undefined;
    set measureManager(value: MeasureManager);
    getMeasurementColor(): string;
    setMeasurementColor(color: string): void;
    resetConfiguration(obj?: object): Promise<void>;
}
export {};
