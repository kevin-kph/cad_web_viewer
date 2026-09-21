import { OpaqueError, StateFailure } from './types';
export declare const UnspecifiedMeasurementUnit = 0;
export declare function isError(x: unknown): x is OpaqueError;
export declare function getStateFailure(error: OpaqueError): StateFailure | null;
