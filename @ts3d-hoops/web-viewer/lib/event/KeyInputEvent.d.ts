import { ViewKey } from '@ts3d-hoops/streamcache';
import { KeyInputType } from '../types';
import { InputEvent } from './InputEvent';
export declare class KeyInputEvent extends InputEvent {
    private _keyCode;
    private _eventType;
    /** @hidden */
    constructor(keyCode: number, _modifiers: number, eventType: KeyInputType, viewKey: ViewKey);
    /**
     * gets the key code
     * @returns the key code of the event
     */
    getKeyCode(): number;
    /**
     * gets the event type
     * @returns the type of key event
     */
    getEventType(): KeyInputType;
}
