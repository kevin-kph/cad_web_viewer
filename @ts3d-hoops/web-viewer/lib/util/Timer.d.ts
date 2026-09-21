import { TimerIdleType } from '.';
/**
 * This class represents a single time-delayed action.
 */
export declare class Timer {
    private _timerId;
    private _action;
    private _beforeActionIdlePromise;
    private _afterActionIdlePromise;
    /**
     * Returns true if no pending action exists and false otherwise.
     */
    isIdle(type: TimerIdleType): boolean;
    /**
     * Returns a promise that resolves when the timer becomes (or already is) idle.
     */
    waitForIdle(type: TimerIdleType): Promise<void>;
    private _triggerIdlePromise;
    private _clearTimeout;
    /**
     * Clears the pending action if it exists.
     */
    clear(): void;
    /**
     * Sets a new delayed action. If one is already pending before this call is made, it gets cleared.
     * @param delay The delay in milliseconds to pend the action.
     * @param action The action to pend.
     */
    set(delay: number, action: () => void): void;
}
export declare function _timerStressTest(): void;
