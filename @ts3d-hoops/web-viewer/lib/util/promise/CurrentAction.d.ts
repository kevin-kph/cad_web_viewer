import { Lazy, LazyLike } from '../Lazy';
export type ActionResult = Promise<void> | void;
export type Action = Lazy<ActionResult>;
export type ActionLike = LazyLike<ActionResult>;
/**
 * This class encapsulates execution of a single action at a time.
 * You set the action to execute, which waits on the currently executing
 * action and kills any pending ones.
 *
 * This class can be thought of as an `Action` queue  that limits to 1 action
 * running at a time, and if any new actions are pushed into it, the queue's
 * pending actions are cleared. (The actively running action will not get
 * cancelled.)
 */
export declare class CurrentAction {
    private _active;
    private _pending;
    private _idlePromise;
    private readonly _suppressFailures;
    /**
     * Creates a new `CurrentAction`.
     * @param suppressFailures Controls whether or not thrown action errors cause `waitForIdle` to throw.
     */
    constructor(suppressFailures: boolean);
    /**
     * Queries the idle state of this object.
     * @return `true` if there are no executing actions and `false` otherwise.
     */
    isIdle(): boolean;
    /**
     * Creates `Promise` that can be used to wait for this object to become idle.
     *
     * If this object was created with `suppressFailures`, then the returned `Promise`
     * never throws. Otherwise action failures (from `this.set`) propagate to the returned `Promise`.
     *
     * @return The idle `Promise`.
     */
    waitForIdle(): Promise<void>;
    /**
     * Sets the action to execute to the one supplied.
     *
     * If this object is idle, then the action is immediately executed,
     * and this object is no longer as long as the action is running.
     *
     * Otherwise if the object is not idle, then action becomes pended
     * and will execute after the current one finishes. If an action is
     * already pended, then the prior pending action is replaced by the
     * newly supplied action and is discarded.
     *
     * @param action
     */
    set(action: ActionLike): void;
    private _advance;
    /**
     * Clears and discards any pending actions. If an action is
     * currently being executed, it remains unaffected by this.
     */
    clear(): void;
}
