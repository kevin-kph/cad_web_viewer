import { Point2 } from '@ts3d-hoops/common';
import { TouchInputType, Buttons } from '../types';
import { InputEvent } from './InputEvent';
import { ViewKey } from '@ts3d-hoops/streamcache';
export declare class TouchInputEvent extends InputEvent {
    private _id;
    private _position;
    private _inputType;
    private _buttons;
    /**
     * Touch Event class
     * @param id unique identifier for this touch
     * @param positionX X window position of the touch
     * @param positionY Y window position of the touch
     * @hidden
     */
    constructor(id: number, positionX: number, positionY: number, buttons: Buttons, inputType: TouchInputType, viewKey: ViewKey);
    /**
     * gets the id this event
     * @returns the unique identifier for this touch
     */
    getId(): number;
    /**
     * gets the window position of the mouse pointer for this event
     * @returns the mouse position for this event
     */
    getPosition(): Point2;
    /**
     * gets the event type
     * @returns the type of touch event
     */
    getEventType(): TouchInputType;
    /**
     * gets the mouse buttons currently pressed with this event
     * @returns the mouse buttons currently pressed for this event
     */
    getButtons(): Buttons;
}
