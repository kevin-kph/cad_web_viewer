import { ICallbackManager } from '../core/ICallbackManager';
export declare class TimeoutMonitor {
    private readonly _callbackManager;
    private _timeoutDurationMinutes;
    private _timeoutWarningMinutes;
    private _timer;
    private _enabled;
    constructor(callbackManager: ICallbackManager);
    setTimeoutDurations(duration: number, warning: number): boolean;
    shutdown(): void;
    resetTimeout(): void;
    private _warn;
    private _timeout;
}
