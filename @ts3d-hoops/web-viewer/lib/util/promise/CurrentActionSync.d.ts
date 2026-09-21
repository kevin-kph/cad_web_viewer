import { ActionLike } from './CurrentAction';
/**
 * This is like `CurrentAction`, but the `set()` function returns a promise.
 * The returned promise is designed to reject if the set action is
 * pended and another set is called before the action becomes live.
 */
export declare class CurrentActionSync {
    private readonly _action;
    private _latestPromise;
    private _timestamp;
    isIdle(): boolean;
    /**
     * Returned promise can reject if future calls are made. This is by design.
     */
    set(action: ActionLike): Promise<void>;
    private _advance;
}
