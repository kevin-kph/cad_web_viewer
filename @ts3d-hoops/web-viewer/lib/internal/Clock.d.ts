import { Milliseconds } from '../types';
export declare class Clock {
    stop(): void;
    isTicking(): boolean;
    tickFor(duration: Milliseconds): void;
    private _remainingDuration;
    private _refreshCurrentTime;
    private _currentTime;
    private _stopTime;
}
