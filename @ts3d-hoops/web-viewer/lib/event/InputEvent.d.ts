import { ViewKey } from '@ts3d-hoops/streamcache';
export declare class InputEvent {
    private _date;
    private _handled;
    private _viewKey;
    /**
     * @param viewKey key for the View the event is occurring in
     */
    constructor(viewKey?: ViewKey);
    /**
     * Get the ViewKey this event is associated with.
     */
    get viewKey(): ViewKey;
    /**
     * Gets the handled state of the event
     * @returns whether the event has been handled
     */
    getHandled(): boolean;
    /**
     * Sets the handled state of the event. When an event has been handled it will not propagate any further
     * @param handled Indicates whether this event has been handled.
     */
    setHandled(handled: boolean): void;
    /**
     * Gets the Date this event occurred
     * @returns the event Date
     */
    getDate(): Date;
}
