import { Point2 } from '@ts3d-hoops/common';
import { KeyModifiers, MouseInputType, Button, Buttons } from '../types';
import { InputEvent } from './InputEvent';
import { ViewKey } from '@ts3d-hoops/streamcache';
export declare class MouseInputEventBase extends InputEvent {
    private _modifiers;
    private _position;
    private _inputType;
    /** @hidden */
    constructor(positionX: number, positionY: number, modifiers: KeyModifiers, inputType: MouseInputType, viewKey: ViewKey);
    /**
     * gets the window position of the mouse pointer for this event
     * @returns the mouse position for this event
     */
    getPosition(): Point2;
    /**
     * gets the state of the shift key
     * @returns whether the shift key was down when this event was generated
     */
    shiftDown(): boolean;
    /**
     * gets the state of the alt key
     * @returns whether the alt key was down when this event was generated
     */
    altDown(): boolean;
    /**
     * gets the state of the control key
     * @returns whether the control key was down when this event was generated
     */
    controlDown(): boolean;
    /**
     * gets the state of the command key
     * @returns whether the command key was down when this event was generated
     */
    commandDown(): boolean;
    /**
     * gets the event type
     * @returns the type of mouse event
     */
    getEventType(): MouseInputType;
    /**
     * gets the event modifiers
     * @returns bitwise combination of KeyModifiers
     */
    getModifiers(): KeyModifiers;
}
export declare class MouseInputEvent extends MouseInputEventBase {
    private _button;
    private _buttons;
    /**
     * Mouse Event class
     * @param positionX X window position of the mouse
     * @param positionY Y window position of the mouse
     * @param button mouse button associated with this event
     * @param buttons mouse buttons currently pressed with this event
     * @param modifiers bitwise collection of values from KeyModifiers enum
     * @param inputType the type of the event
     */
    constructor(positionX: number, positionY: number, button: Button, buttons: Buttons, modifiers: KeyModifiers, inputType: MouseInputType, viewKey: ViewKey);
    /**
     * gets the mouse button associated with this event
     * @returns the mouse button for this event
     */
    getButton(): Button;
    /**
     * gets the mouse buttons currently pressed with this event
     * @returns the mouse buttons currently pressed for this event
     */
    getButtons(): Buttons;
}
export declare class MouseWheelInputEvent extends MouseInputEventBase {
    private _wheelDelta;
    private _buttons;
    /**
     * Mousewheel Event class
     * @param positionX X window position of the mouse
     * @param positionY Y window position of the mouse
     * @param wheelDelta the direction the mouse wheel moved
     * @param buttons mouse buttons currently pressed with this event
     * @param modifiers bitwise collection of values from KeyModifiers enum
     * @param inputType the type of the event
     * @hidden
     */
    constructor(positionX: number, positionY: number, wheelDelta: number, buttons: Buttons, modifiers: KeyModifiers, inputType: MouseInputType, viewKey: ViewKey);
    /**
     * Gets the wheel delta for this event. A positive value indicates that the wheel was scrolled Up, while a negative value indicated the wheel was scrolled down.
     * @returns Wheel dela value
     */
    getWheelDelta(): number;
    /**
     * gets the mouse buttons currently pressed with this event
     * @returns the mouse buttons currently pressed for this event
     */
    getButtons(): Buttons;
}
