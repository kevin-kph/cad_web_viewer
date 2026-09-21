import { ActionLike } from './CurrentAction';
/**
 * A queue of [Action]s to be evaluated. Some number of actions are allowed to be active at once
 * Settable via the constructor.
 */
export declare class ActionQueue {
    /**
     * Creates a new [ActionQueue]
     * @param maxActivePromises Max number of promises to leave open before they begin getting deferred
     * @param suppressFailures Whether or not rejected promises and actions that throw cause the queue to fail
     */
    constructor(maxActivePromises: number, suppressFailures: boolean);
    /**
     * Returns `true` if there are no actions waiting to be evaluated
     * @returns Boolean indicating idle status
     */
    isIdle(): boolean;
    /**
     * Returns a `Promise<void>` that resolves when all actions have been completed or rejects if there
     * was a failure
     *
     * It should be noted that if the queue is configured not to suppress failures and an action throws an error,
     * any deferred actions (actions that were queued but not active at the time of the failure) will be
     * cleared from the queue and will not be evaluated
     * @returns A promise that resolves/rejects when all actions have been completed
     */
    waitForIdle(): Promise<void>;
    /**
     * Pushes a new [ActionLike] to be evaluated onto the queue
     * @param action
     */
    push(action: ActionLike): void;
    private _immediateAction;
    private _finalizePromise;
    private _tryActivateIdlePromise;
    private readonly _deferredActions;
    private _failed;
    private _failureError;
    private readonly _maxActivePromises;
    private _activePromiseCount;
    private _idlePromise;
    private readonly _suppressFailures;
}
